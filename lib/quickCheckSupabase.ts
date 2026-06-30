import 'server-only';

export type QuickCheckStatus = 'pending' | 'reviewing' | 'completed';

export type QuickCheckSummaryItem = {
  label: string;
  value: string;
};

export type QuickCheckDocument = {
  name: string;
  size: number;
  type: string;
  path?: string;
  signedUrl?: string;
  uploadError?: string;
};

export type QuickCheckRecord = {
  id: string;
  created_at: string;
  updated_at?: string | null;
  source?: string | null;
  status: QuickCheckStatus;
  name: string;
  first_name?: string | null;
  last_name?: string | null;
  email: string;
  phone?: string | null;
  locale?: string | null;
  address?: string | null;
  year?: number | null;
  answers?: Record<string, unknown> | null;
  summary?: QuickCheckSummaryItem[] | null;
  documents?: QuickCheckDocument[] | null;
};

type QuickCheckPayload = {
  locale?: string;
  contact?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  answers?: Record<string, unknown>;
  summary?: QuickCheckSummaryItem[];
};

type SupabaseConfig = {
  url: string;
  serviceRoleKey: string;
  table: string;
  bucket: string;
};

const DEFAULT_TABLE = 'quick_check_requests';
const DEFAULT_BUCKET = 'quick-check-documents';

function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.HG_ADMIN_SUPABASE_URL || process.env.QUICK_CHECK_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey =
    process.env.HG_ADMIN_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.QUICK_CHECK_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ''),
    serviceRoleKey,
    table: process.env.HG_ADMIN_SUPABASE_TABLE || process.env.QUICK_CHECK_SUPABASE_TABLE || DEFAULT_TABLE,
    bucket: process.env.HG_ADMIN_SUPABASE_BUCKET || process.env.QUICK_CHECK_SUPABASE_BUCKET || DEFAULT_BUCKET,
  };
}

function requireSupabaseConfig() {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error('QuickCheck Supabase project is not configured.');
  }

  return config;
}

export function isQuickCheckSupabaseConfigured() {
  return Boolean(getSupabaseConfig());
}

function getHeaders(config: SupabaseConfig, contentType = 'application/json') {
  const headers: Record<string, string> = {
    apikey: config.serviceRoleKey,
    'Content-Type': contentType,
  };

  // New Supabase `sb_secret_...` keys are sent as `apikey` only.
  // Legacy JWT service_role keys still need the Authorization bearer header.
  if (!config.serviceRoleKey.startsWith('sb_secret_')) {
    headers.Authorization = `Bearer ${config.serviceRoleKey}`;
  }

  return headers;
}

function getSafeErrorDetails(text: string) {
  if (process.env.NODE_ENV === 'production' || !text) {
    return '';
  }

  return ` Supabase: ${text}`;
}

function formatSupabaseError(status: number, text: string, target: string) {
  const details = getSafeErrorDetails(text);

  if (status === 401) {
    return `Supabase Service-Key wurde abgelehnt (401) bei ${target}. Bitte HG_ADMIN_SUPABASE_SERVICE_ROLE_KEY oder SUPABASE_SECRET_KEY aus dem gleichen HG-Projekt neu kopieren.${details}`;
  }

  if (status === 403) {
    return `Supabase Zugriff verweigert (403) bei ${target}. Bitte RLS/Policies und den verwendeten Server-Key prüfen.${details}`;
  }

  if (status === 404 || text.includes('PGRST205')) {
    return `Supabase Ziel nicht gefunden bei ${target}. Bitte prüfen, ob die Tabelle "${DEFAULT_TABLE}" und der Storage-Bucket "${DEFAULT_BUCKET}" im HG-Projekt angelegt sind.${details}`;
  }

  return `Supabase request failed (${status}) bei ${target}.${details}`;
}

async function supabaseJson<T>(path: string, init: RequestInit = {}) {
  const config = requireSupabaseConfig();
  const response = await fetch(`${config.url}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      ...getHeaders(config),
      ...(init.headers || {}),
    },
  });
  const text = await response.text();

  if (!response.ok) {
    throw new Error(formatSupabaseError(response.status, text, path));
  }

  return (text ? JSON.parse(text) : null) as T;
}

function sanitizeFileName(fileName: string) {
  return fileName
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

function safePathSegment(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-').toLowerCase();
}

function encodeStoragePath(path: string) {
  return path.split('/').map(encodeURIComponent).join('/');
}

async function uploadDocument(config: SupabaseConfig, file: File, folder: string, index: number): Promise<QuickCheckDocument> {
  const path = `${folder}/${index + 1}-${sanitizeFileName(file.name || `dokument-${index + 1}.pdf`)}`;
  const uploadHeaders: Record<string, string> = {
    apikey: config.serviceRoleKey,
    'Content-Type': file.type || 'application/pdf',
    'x-upsert': 'false',
  };

  if (!config.serviceRoleKey.startsWith('sb_secret_')) {
    uploadHeaders.Authorization = `Bearer ${config.serviceRoleKey}`;
  }

  const response = await fetch(`${config.url}/storage/v1/object/${config.bucket}/${encodeStoragePath(path)}`, {
    method: 'POST',
    cache: 'no-store',
    headers: uploadHeaders,
    body: Buffer.from(await file.arrayBuffer()),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(formatSupabaseError(response.status, errorText || `Storage upload failed for ${file.name}`, `Storage-Upload "${file.name}"`));
  }

  return {
    name: file.name,
    size: file.size,
    type: file.type || 'application/pdf',
    path,
  };
}

async function createSignedDocumentUrl(config: SupabaseConfig, path?: string) {
  if (!path) {
    return undefined;
  }

  const response = await fetch(`${config.url}/storage/v1/object/sign/${config.bucket}/${encodeStoragePath(path)}`, {
    method: 'POST',
    cache: 'no-store',
    headers: getHeaders(config),
    body: JSON.stringify({ expiresIn: 60 * 30 }),
  });

  if (!response.ok) {
    return undefined;
  }

  const data = (await response.json()) as { signedURL?: string; signedUrl?: string };
  const signedPath = data.signedURL || data.signedUrl;

  if (!signedPath) {
    return undefined;
  }

  return signedPath.startsWith('http') ? signedPath : `${config.url}/storage/v1${signedPath}`;
}

function normalizeRecord(record: QuickCheckRecord): QuickCheckRecord {
  return {
    ...record,
    status: record.status || 'pending',
    answers: record.answers || {},
    summary: Array.isArray(record.summary) ? record.summary : [],
    documents: Array.isArray(record.documents) ? record.documents : [],
  };
}

export async function createQuickCheckRequest({
  payload,
  files,
  ip,
}: {
  payload: QuickCheckPayload;
  files: File[];
  ip: string;
}) {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  const firstName = String(payload.contact?.firstName || '').trim();
  const lastName = String(payload.contact?.lastName || '').trim();
  const email = String(payload.contact?.email || '').trim();
  const phone = String(payload.contact?.phone || '').trim();
  const name = `${firstName} ${lastName}`.trim();
  const answers = payload.answers || {};
  const folder = `quick-check/${Date.now()}-${safePathSegment(email || 'unknown')}`;

  const documents: QuickCheckDocument[] = [];

  for (const [index, file] of files.entries()) {
    try {
      documents.push(await uploadDocument(config, file, folder, index));
    } catch (error) {
      console.error('QuickCheck document upload failed:', error);
      documents.push({
        name: file.name,
        size: file.size,
        type: file.type || 'application/pdf',
        uploadError: 'storage_upload_failed',
      });
    }
  }

  const body = {
    source: 'quick_check',
    status: 'pending',
    name,
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    locale: payload.locale || 'de',
    address: typeof answers.address === 'string' ? answers.address : null,
    year: typeof answers.yearBuilt === 'number' ? answers.yearBuilt : null,
    answers,
    summary: Array.isArray(payload.summary) ? payload.summary : [],
    documents,
    ip_address: ip === 'unknown' ? null : ip,
  };

  const inserted = await supabaseJson<QuickCheckRecord[]>(`/rest/v1/${encodeURIComponent(config.table)}`, {
    method: 'POST',
    headers: {
      Prefer: 'return=representation',
    },
    body: JSON.stringify(body),
  });

  return inserted?.[0] ? normalizeRecord(inserted[0]) : null;
}

export async function listQuickCheckRequests() {
  const config = requireSupabaseConfig();
  const params = new URLSearchParams({
    select: '*',
    order: 'created_at.desc',
  });
  const records = await supabaseJson<QuickCheckRecord[]>(`/rest/v1/${encodeURIComponent(config.table)}?${params.toString()}`);

  return Promise.all(
    records.map(async (record) => {
      const normalized = normalizeRecord(record);
      const documents = await Promise.all(
        (normalized.documents || []).map(async (document) => ({
          ...document,
          signedUrl: document.signedUrl || (await createSignedDocumentUrl(config, document.path)),
        })),
      );

      return {
        ...normalized,
        documents,
      };
    }),
  );
}

export async function updateQuickCheckStatus(id: string, status: QuickCheckStatus) {
  const config = requireSupabaseConfig();
  const params = new URLSearchParams({
    id: `eq.${id}`,
  });

  const updated = await supabaseJson<QuickCheckRecord[]>(`/rest/v1/${encodeURIComponent(config.table)}?${params.toString()}`, {
    method: 'PATCH',
    headers: {
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      status,
      updated_at: new Date().toISOString(),
    }),
  });

  return updated?.[0] ? normalizeRecord(updated[0]) : null;
}

export async function deleteQuickCheckRequest(id: string) {
  const config = requireSupabaseConfig();
  const params = new URLSearchParams({
    id: `eq.${id}`,
  });

  await supabaseJson<null>(`/rest/v1/${encodeURIComponent(config.table)}?${params.toString()}`, {
    method: 'DELETE',
  });
}
