import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
// Initialize Resend only if key is present to avoid build errors
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev'; // Default to resend testing email if not set
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@hendrikgrau.de'; // Placeholder

// Simple in-memory rate limiter 
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const LIMIT_WINDOW = 60 * 1000; 
const MAX_REQUESTS = 3; // 3 requests per IP per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record) {
    rateLimit.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (now - record.lastReset > LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

function sanitize(str: string): string {
  if (!str) return "";
  return str.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      case "'": return "&#39;";
      default: return m;
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, message, honeypot } = body;

    // 2. Honeypot Check (Security)
    if (honeypot) {
      // Silently fail for bots
      return NextResponse.json({ message: 'Nachricht gesendet.' }, { status: 200 });
    }

    // 3. Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name und E-Mail sind erforderlich.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse.' },
        { status: 400 }
      );
    }

    if (message && message.length > 2000) {
      return NextResponse.json(
        { error: 'Nachricht darf maximal 2000 Zeichen lang sein.' },
        { status: 400 }
      );
    }

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safePhone = sanitize(phone);
    const safeMessage = sanitize(message);

    // 4. Send Notification to Admin
    if (!resend) {
      console.error('Resend API key missing');
      return NextResponse.json(
        { error: 'Serverkonfiguration unvollständig.' },
        { status: 500 }
      );
    }

    const emailResult = await resend.emails.send({
      from: `Hendrik Grau Website <${SENDER_EMAIL}>`,
      to: [CONTACT_EMAIL],
      replyTo: safeEmail,
      subject: `Neue Immobilien-Anfrage von ${safeName}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #1c1917; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: #D4AF37; margin: 0; font-family: serif;">Hendrik Grau Investment</h2>
          </div>
          <div style="background: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5; border-top: none;">
            <h3 style="color: #333; margin-top: 0;">Neue Kontaktanfrage</h3>
            <p style="color: #666; font-size: 14px;">Ein Interessent hat das Kontaktformular auf der Website ausgefüllt.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; width: 30%; font-weight: bold; color: #555;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">E-Mail:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;"><a href="mailto:${safeEmail}" style="color: #D4AF37; text-decoration: none;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Telefon:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${safePhone || '-'}</td>
              </tr>
            </table>
            
            <div style="margin-top: 25px;">
              <p style="font-weight: bold; color: #555; margin-bottom: 10px;">Nachricht:</p>
              <div style="background-color: #f5f5f4; padding: 15px; border-radius: 4px; color: #333; line-height: 1.6; white-space: pre-wrap;">${safeMessage || '-'}</div>
            </div>
          </div>
          <div style="text-align: center; padding-top: 20px; color: #999; font-size: 12px;">
            <p>Gesendet über hendrikgrau.de</p>
          </div>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      return NextResponse.json(
        { error: 'Fehler beim Senden. Bitte versuchen Sie es später erneut.' },
        { status: 500 }
      );
    }

    // 5. Send Confirmation to User 
    await resend.emails.send({
      from: `Hendrik Grau Team <${SENDER_EMAIL}>`,
      to: [safeEmail],
      subject: 'Eingangsbestätigung: Ihre Anfrage an Hendrik Grau Investment',
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #1c1917; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #D4AF37; margin: 0; font-family: serif; font-size: 24px;">HG</h1>
          </div>
          
          <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5; border-top: none;">
            <p style="color: #333; font-size: 16px; margin-top: 0;">Sehr geehrte(r) ${safeName},</p>
            
            <p style="color: #555; line-height: 1.6;">
              vielen Dank für Ihre Kontaktaufnahme. Wir haben Ihre Nachricht erhalten.
            </p>
            
            <p style="color: #555; line-height: 1.6;">
              Wir prüfen Ihr Anliegen sorgfältig und diskret. Sie erhalten in der Regel innerhalb von 24 bis 48 Stunden eine persönliche Rückmeldung von uns.
            </p>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 3px solid #D4AF37;">
              <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 8px;">Ihre Nachricht</p>
              <p style="margin: 0; color: #333; font-style: italic;">"${safeMessage || '-'}"</p>
            </div>
            
            <p style="color: #555; line-height: 1.6; margin-top: 30px;">
              Mit freundlichen Grüßen,<br>
              <strong style="color: #333;">Ihr Hendrik Grau Team</strong>
            </p>
            
            <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #999; line-height: 1.5;">
              <p>Hendrik Grau Gesellschaften<br>Bremer Platz 9–11, 48155 Münster</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Nachricht erfolgreich gesendet.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler.' },
      { status: 500 }
    );
  }
}
