'use client';

import { FormEvent, useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { getAdminResetRedirectUrl, getAuthErrorMessage } from '@/lib/admin-auth';
import { getAdminSupabaseBrowserClient } from '@/lib/supabaseBrowser';

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [mode, setMode] = useState<'login' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const supabase = getAdminSupabaseBrowserClient();

      if (!supabase) {
        throw new Error('Supabase Auth ist nicht konfiguriert.');
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        throw new Error(getAuthErrorMessage(signInError.message));
      }

      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if (!token) {
        throw new Error('Supabase Session konnte nicht erstellt werden.');
      }

      const adminResponse = await fetch('/api/admin/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      });

      if (!adminResponse.ok) {
        const adminData = (await adminResponse.json().catch(() => null)) as { error?: string } | null;
        await supabase.auth.signOut();
        throw new Error(adminData?.error || 'Dieser Account ist nicht als Admin freigegeben.');
      }

      onSuccess();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Login fehlgeschlagen.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const supabase = getAdminSupabaseBrowserClient();

      if (!supabase) {
        throw new Error('Supabase Auth ist nicht konfiguriert.');
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: getAdminResetRedirectUrl(),
      });

      if (resetError) {
        throw new Error(getAuthErrorMessage(resetError.message));
      }

      setSuccess('Der Reset-Link wurde versendet. Bitte prüfen Sie Ihr Postfach.');
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : 'Reset-Link konnte nicht gesendet werden.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(126,180,221,0.24),transparent_32%),radial-gradient(circle_at_84%_72%,rgba(28,106,168,0.12),transparent_34%)]" />
      <form
        onSubmit={mode === 'login' ? handleLogin : handleResetPassword}
        className="surface-card-strong relative w-full max-w-[460px] rounded-[2.25rem] p-7 shadow-[var(--surface-shadow-soft)] sm:p-9"
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#1C6AA8]">
              {mode === 'login' ? 'Adminbereich' : 'Passwort Reset'}
            </p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-stone-950">
              {mode === 'login' ? 'HG Grundbesitz' : 'Passwort zurücksetzen'}
            </h1>
            <p className="mt-3 text-sm leading-6 text-stone-500">
              {mode === 'login'
                ? 'Melden Sie sich mit Ihrem Supabase-Auth-Account an.'
                : 'Wir senden den Reset-Link direkt an Ihr Postfach.'}
            </p>
          </div>
          <div className="surface-chip flex h-16 w-16 items-center justify-center rounded-[1.4rem] text-[#1C6AA8]">
            <ShieldCheck size={30} />
          </div>
        </div>

        <label htmlFor="admin-email" className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
          E-Mail
        </label>
        <div className="surface-card mb-5 flex items-center gap-3 rounded-[1.35rem] px-4 py-3">
          <Mail size={18} className="shrink-0 text-[#1C6AA8]" />
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@hg-grundbesitz.de"
            className="min-h-0 flex-1 border-0 bg-transparent p-0 text-base font-medium outline-none placeholder:text-stone-400"
            autoComplete="email"
            required
          />
        </div>

        {mode === 'login' ? (
          <>
            <div className="mb-3 flex items-center justify-between gap-3">
              <label htmlFor="admin-password" className="block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
                Passwort
              </label>
              <button
                type="button"
                onClick={() => {
                  setMode('reset');
                  setError('');
                  setSuccess('');
                }}
                className="text-xs font-bold text-[#1C6AA8] transition-opacity hover:opacity-75"
              >
                Passwort vergessen?
              </button>
            </div>
            <div className="surface-card mb-5 flex items-center gap-3 rounded-[1.35rem] px-4 py-3">
              <LockKeyhole size={18} className="shrink-0 text-[#1C6AA8]" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Passwort eingeben"
                className="min-h-0 flex-1 border-0 bg-transparent p-0 text-base font-medium outline-none placeholder:text-stone-400"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="surface-chip flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-500 transition hover:text-stone-950"
                aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </>
        ) : (
          <div className="surface-card mb-5 rounded-[1.35rem] px-4 py-3 text-sm leading-6 text-stone-500">
            Der Link wird über Supabase Auth erstellt. Danach können Sie ein neues Admin-Passwort setzen.
          </div>
        )}

        {error ? <div className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</div> : null}
        {success ? <div className="mb-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{success}</div> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-beam-blue inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              <span>{mode === 'login' ? 'Prüfe...' : 'Sende...'}</span>
            </>
          ) : (
            <>
              <span>{mode === 'login' ? 'Einloggen' : 'Reset-Link senden'}</span>
              <ArrowRight size={18} className="ml-2" />
            </>
          )}
        </button>

        {mode === 'reset' ? (
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
              setSuccess('');
            }}
            className="surface-card mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold text-stone-700 transition hover:-translate-y-0.5"
          >
            <ArrowLeft size={18} />
            Zurück zum Login
          </button>
        ) : null}
      </form>
    </main>
  );
}
