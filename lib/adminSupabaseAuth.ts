type SupabaseUserResponse = {
  id?: string;
  email?: string;
};

type AdminAuthSuccess = {
  ok: true;
  user: {
    id: string;
    email: string;
  };
};

type AdminAuthFailure = {
  ok: false;
  status: number;
  error: string;
};

export type AdminAuthResult = AdminAuthSuccess | AdminAuthFailure;

function getAuthConfig() {
  const supabaseUrl =
    process.env.HG_ADMIN_SUPABASE_URL ||
    process.env.QUICK_CHECK_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_HG_ADMIN_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.HG_ADMIN_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_HG_ADMIN_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return {
    supabaseUrl: supabaseUrl.replace(/\/$/, ''),
    supabaseAnonKey,
  };
}

function getAllowedAdminEmails() {
  return (process.env.HG_ADMIN_EMAILS || process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get('authorization') || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return null;
  }

  return token;
}

export async function verifyAdminRequest(request: Request): Promise<AdminAuthResult> {
  const config = getAuthConfig();

  if (!config) {
    return {
      ok: false,
      status: 500,
      error: 'Supabase Auth ist für das Admin-Dashboard nicht konfiguriert.',
    };
  }

  const allowedAdminEmails = getAllowedAdminEmails();

  if (allowedAdminEmails.length === 0) {
    return {
      ok: false,
      status: 500,
      error: 'Admin-E-Mail-Allowlist ist nicht konfiguriert.',
    };
  }

  const token = getBearerToken(request);

  if (!token) {
    return {
      ok: false,
      status: 401,
      error: 'Nicht autorisiert.',
    };
  }

  const response = await fetch(`${config.supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: config.supabaseAnonKey,
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return {
      ok: false,
      status: 401,
      error: 'Session ist abgelaufen oder ungültig.',
    };
  }

  const user = (await response.json().catch(() => null)) as SupabaseUserResponse | null;
  const email = user?.email?.toLowerCase();

  if (!user?.id || !email || !allowedAdminEmails.includes(email)) {
    return {
      ok: false,
      status: 403,
      error: 'Dieser Supabase-Benutzer ist nicht als Admin freigegeben.',
    };
  }

  return {
    ok: true,
    user: {
      id: user.id,
      email,
    },
  };
}
