'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let adminSupabaseClient: SupabaseClient | null = null;

export function getAdminSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_HG_ADMIN_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_HG_ADMIN_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  if (!adminSupabaseClient) {
    adminSupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return adminSupabaseClient;
}
