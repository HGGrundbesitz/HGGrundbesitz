import { NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/adminSupabaseAuth';
import {
  deleteQuickCheckRequest,
  isQuickCheckSupabaseConfigured,
  listQuickCheckRequests,
  updateQuickCheckStatus,
  type QuickCheckStatus,
} from '@/lib/quickCheckSupabase';

const allowedStatuses: QuickCheckStatus[] = ['pending', 'reviewing', 'completed'];

function getDebugSuffix(error: unknown) {
  if (process.env.NODE_ENV === 'production' || !(error instanceof Error)) {
    return '';
  }

  return ` (${error.message})`;
}

async function requireAdmin(request: Request) {
  const auth = await verifyAdminRequest(request);

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (!isQuickCheckSupabaseConfigured()) {
    return NextResponse.json({ error: 'Supabase ist für das Admin-Dashboard nicht konfiguriert.' }, { status: 500 });
  }

  return null;
}

export async function GET(request: Request) {
  const guard = await requireAdmin(request);

  if (guard) {
    return guard;
  }

  try {
    const requests = await listQuickCheckRequests();
    return NextResponse.json({ requests });
  } catch (error) {
    console.error('Admin quick-check load failed:', error);
    return NextResponse.json(
      {
        error: `QuickCheck-Daten konnten nicht geladen werden. Bitte Supabase-Tabelle, Bucket und Service-Key prüfen.${getDebugSuffix(error)}`,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const guard = await requireAdmin(request);

  if (guard) {
    return guard;
  }

  const body = (await request.json().catch(() => null)) as { id?: string; status?: QuickCheckStatus } | null;

  if (!body?.id || !body.status || !allowedStatuses.includes(body.status)) {
    return NextResponse.json({ error: 'Ungültige Status-Anfrage.' }, { status: 400 });
  }

  try {
    const updated = await updateQuickCheckStatus(body.id, body.status);
    return NextResponse.json({ request: updated });
  } catch (error) {
    console.error('Admin quick-check status update failed:', error);
    return NextResponse.json(
      {
        error: `Status konnte nicht aktualisiert werden.${getDebugSuffix(error)}`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const guard = await requireAdmin(request);

  if (guard) {
    return guard;
  }

  const body = (await request.json().catch(() => null)) as { id?: string } | null;

  if (!body?.id) {
    return NextResponse.json({ error: 'Ungültige Lösch-Anfrage.' }, { status: 400 });
  }

  try {
    await deleteQuickCheckRequest(body.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Admin quick-check delete failed:', error);
    return NextResponse.json(
      {
        error: `Anfrage konnte nicht gelöscht werden.${getDebugSuffix(error)}`,
      },
      { status: 500 }
    );
  }
}
