import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
const QUICK_CHECK_EMAIL = process.env.QUICK_CHECK_EMAIL || process.env.CONTACT_EMAIL || 'hg@hg-grundbesitz.de';

const LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 3;
const MAX_DOCUMENTS = 5;
const MAX_DOCUMENT_SIZE = 7 * 1024 * 1024;
const MAX_DOCUMENT_TOTAL_SIZE = 20 * 1024 * 1024;

const rateLimit = new Map<string, { count: number; lastReset: number }>();

type SummaryItem = {
  label: string;
  value: string;
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
  summary?: SummaryItem[];
};

function isRateLimited(ip: string) {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now - record.lastReset > LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

function sanitize(value: unknown) {
  return String(value || '').replace(/[&<>"']/g, (match) => {
    switch (match) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return match;
    }
  });
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1).replace('.', ',')} MB`;
}

function renderSummaryRows(summary: SummaryItem[]) {
  return summary
    .map(
      (item) => `
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #e8eef5;color:#64748b;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;width:38%;">${sanitize(item.label)}</td>
          <td style="padding:12px 14px;border-bottom:1px solid #e8eef5;color:#111827;font-size:15px;">${sanitize(item.value)}</td>
        </tr>
      `
    )
    .join('');
}

function renderDocumentList(files: File[]) {
  if (files.length === 0) {
    return '<p style="margin:0;color:#64748b;">Keine Dokumente angehängt.</p>';
  }

  return `
    <ul style="margin:0;padding-left:18px;color:#111827;line-height:1.7;">
      ${files.map((file) => `<li>${sanitize(file.name)} <span style="color:#64748b;">(${formatFileSize(file.size)})</span></li>`).join('')}
    </ul>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' }, { status: 429 });
    }

    if (!resend) {
      console.error('Resend API key missing');
      return NextResponse.json({ error: 'Serverkonfiguration unvollständig.' }, { status: 500 });
    }

    const formData = await request.formData();
    const payloadRaw = formData.get('payload');

    if (typeof payloadRaw !== 'string') {
      return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
    }

    const payload = JSON.parse(payloadRaw) as QuickCheckPayload;
    const contact = payload.contact || {};
    const firstName = String(contact.firstName || '').trim();
    const lastName = String(contact.lastName || '').trim();
    const email = String(contact.email || '').trim();
    const phone = String(contact.phone || '').trim();
    const fullName = `${firstName} ${lastName}`.trim();
    const summary = Array.isArray(payload.summary) ? payload.summary : [];

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
    }

    const files = formData.getAll('documents').filter((item): item is File => item instanceof File);
    const totalSize = files.reduce((total, file) => total + file.size, 0);

    if (files.length > MAX_DOCUMENTS) {
      return NextResponse.json({ error: 'Es können maximal 5 PDF-Dateien angehängt werden.' }, { status: 400 });
    }

    if (totalSize > MAX_DOCUMENT_TOTAL_SIZE) {
      return NextResponse.json({ error: 'Die gesamte Dokumentenmenge darf 20 MB nicht überschreiten.' }, { status: 400 });
    }

    for (const file of files) {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

      if (!isPdf) {
        return NextResponse.json({ error: 'Bitte nur PDF-Dateien hochladen.' }, { status: 400 });
      }

      if (file.size > MAX_DOCUMENT_SIZE) {
        return NextResponse.json({ error: 'Eine Datei ist zu groß. Erlaubt sind maximal 7 MB pro PDF.' }, { status: 400 });
      }
    }

    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()).toString('base64'),
      }))
    );

    const safeName = sanitize(fullName);
    const safeEmail = sanitize(email);
    const safePhone = sanitize(phone);

    const adminHtml = `
      <div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#f4f8fc;padding:28px;">
        <div style="max-width:760px;margin:0 auto;background:#fff;border:1px solid #e4edf6;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(15,23,42,.07);">
          <div style="padding:28px 32px;background:linear-gradient(180deg,#ffffff,#f1f7fd);border-bottom:1px solid #e4edf6;">
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:.18em;color:#1C6AA8;font-weight:800;">HG Grundbesitz Schnellcheck</div>
            <h1 style="margin:12px 0 0;color:#111827;font-size:28px;line-height:1.2;">Neue Ersteinschätzung von ${safeName}</h1>
          </div>
          <div style="padding:30px 32px;">
            <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
              <tr>
                <td style="padding:10px 0;color:#64748b;font-weight:700;width:140px;">Name</td>
                <td style="padding:10px 0;color:#111827;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#64748b;font-weight:700;">E-Mail</td>
                <td style="padding:10px 0;color:#111827;"><a href="mailto:${safeEmail}" style="color:#1C6AA8;text-decoration:none;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#64748b;font-weight:700;">Telefon</td>
                <td style="padding:10px 0;color:#111827;">${safePhone}</td>
              </tr>
            </table>

            <h2 style="margin:0 0 14px;color:#111827;font-size:20px;">Zusammenfassung</h2>
            <table style="width:100%;border-collapse:collapse;border:1px solid #e8eef5;border-radius:16px;overflow:hidden;margin-bottom:28px;">
              ${renderSummaryRows(summary)}
            </table>

            <h2 style="margin:0 0 14px;color:#111827;font-size:20px;">Dokumente</h2>
            ${renderDocumentList(files)}
          </div>
        </div>
      </div>
    `;

    const adminResult = await resend.emails.send({
      from: `HG Grundbesitz Website <${SENDER_EMAIL}>`,
      to: [QUICK_CHECK_EMAIL],
      replyTo: email,
      subject: `Neue Schnellcheck-Anfrage von ${fullName}`,
      html: adminHtml,
      attachments,
    });

    if (adminResult.error) {
      console.error('Resend quick-check admin error:', adminResult.error);
      return NextResponse.json({ error: 'Fehler beim Senden. Bitte versuchen Sie es später erneut.' }, { status: 500 });
    }

    await resend.emails.send({
      from: `HG Grundbesitz Team <${SENDER_EMAIL}>`,
      to: [email],
      subject: 'Eingangsbestätigung: Ihr Schnellcheck bei HG Grundbesitz',
      html: `
        <div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#f4f8fc;padding:28px;">
          <div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #e4edf6;border-radius:24px;overflow:hidden;">
            <div style="padding:28px 32px;background:linear-gradient(180deg,#ffffff,#f1f7fd);border-bottom:1px solid #e4edf6;">
              <div style="font-size:12px;text-transform:uppercase;letter-spacing:.18em;color:#1C6AA8;font-weight:800;">HG Grundbesitz GmbH</div>
              <h1 style="margin:12px 0 0;color:#111827;font-size:26px;line-height:1.2;">Vielen Dank, ${safeName}.</h1>
            </div>
            <div style="padding:30px 32px;color:#334155;line-height:1.7;font-size:15px;">
              <p style="margin-top:0;">Wir haben Ihren Schnellcheck erhalten und prüfen die Angaben diskret.</p>
              <p>Sie erhalten eine persönliche Rückmeldung mit einer ersten Einordnung und den nächsten sinnvollen Schritten.</p>
              <p style="margin-bottom:0;color:#64748b;font-size:13px;">HG Grundbesitz GmbH · Bremer Platz 9-11 · 48155 Münster</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Schnellcheck erfolgreich gesendet.' }, { status: 200 });
  } catch (error) {
    console.error('Quick-check API error:', error);
    return NextResponse.json({ error: 'Interner Serverfehler.' }, { status: 500 });
  }
}
