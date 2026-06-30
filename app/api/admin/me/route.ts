import { NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/adminSupabaseAuth';

export async function GET(request: Request) {
  const auth = await verifyAdminRequest(request);

  if (!auth.ok) {
    return NextResponse.json({ authenticated: false, error: auth.error }, { status: auth.status });
  }

  return NextResponse.json({ authenticated: true, user: auth.user });
}
