'use client';

import { useEffect, useState } from 'react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminLogin from '@/components/admin/AdminLogin';
import { getAdminSupabaseBrowserClient } from '@/lib/supabaseBrowser';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const supabase = getAdminSupabaseBrowserClient();

        if (!supabase) {
          throw new Error('Supabase Auth is not configured.');
        }

        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;

        if (!token) {
          throw new Error('No active session.');
        }

        const response = await fetch('/api/admin/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        });

        if (!response.ok) {
          await supabase.auth.signOut();
          throw new Error('Admin session is not allowed.');
        }

        if (mounted) {
          setIsAuthenticated(true);
        }
      } catch {
        if (mounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    checkSession();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <div className="surface-card rounded-[2rem] px-8 py-6 text-sm font-semibold tracking-[0.16em] text-[#1C6AA8]">
          ADMIN WIRD GELADEN
        </div>
      </main>
    );
  }

  return isAuthenticated ? <AdminDashboard onLogout={() => setIsAuthenticated(false)} /> : <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
}
