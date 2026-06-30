'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2, LockKeyhole, ShieldCheck } from 'lucide-react';
import { getAuthErrorMessage } from '@/lib/admin-auth';
import { getAdminSupabaseBrowserClient } from '@/lib/supabaseBrowser';

export default function AdminResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let mounted = true;
    const supabase = getAdminSupabaseBrowserClient();

    async function resolveRecoverySession() {
      if (!supabase) {
        if (mounted) {
          setError('Supabase Auth ist nicht konfiguriert.');
          setIsChecking(false);
        }
        return;
      }

      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const errorDescription = hashParams.get('error_description');

      if (errorDescription && mounted) {
        setError(getAuthErrorMessage(decodeURIComponent(errorDescription)));
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setHasRecoverySession(Boolean(session));
        setIsChecking(false);
      }
    }

    resolveRecoverySession();

    const { data } =
      supabase?.auth.onAuthStateChange((event, session) => {
        if (!mounted) {
          return;
        }

        if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
          setHasRecoverySession(Boolean(session));
          setIsChecking(false);
        }
      }) || {};

    return () => {
      mounted = false;
      data?.subscription.unsubscribe();
    };
  }, []);

  async function handleUpdatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 10) {
      setError('Bitte wählen Sie ein Passwort mit mindestens 10 Zeichen.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Die beiden Passwörter stimmen nicht überein.');
      return;
    }

    const supabase = getAdminSupabaseBrowserClient();

    if (!supabase) {
      setError('Supabase Auth ist nicht konfiguriert.');
      return;
    }

    setIsSubmitting(true);

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(getAuthErrorMessage(updateError.message));
      setIsSubmitting(false);
      return;
    }

    setSuccess('Ihr Passwort wurde aktualisiert. Sie werden jetzt zum Adminbereich weitergeleitet.');
    window.history.replaceState({}, document.title, '/admin/reset-password');

    window.setTimeout(() => {
      router.replace('/admin');
    }, 1200);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(126,180,221,0.24),transparent_32%),radial-gradient(circle_at_84%_72%,rgba(28,106,168,0.12),transparent_34%)]" />
      <form
        onSubmit={handleUpdatePassword}
        className="surface-card-strong relative w-full max-w-[460px] rounded-[2.25rem] p-7 shadow-[var(--surface-shadow-soft)] sm:p-9"
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#1C6AA8]">Passwort Reset</p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-stone-950">Neues Passwort</h1>
            <p className="mt-3 text-sm leading-6 text-stone-500">Vergeben Sie ein neues Passwort für Ihren Adminzugang.</p>
          </div>
          <div className="surface-chip flex h-16 w-16 items-center justify-center rounded-[1.4rem] text-[#1C6AA8]">
            <ShieldCheck size={30} />
          </div>
        </div>

        {isChecking ? (
          <div className="surface-card mb-5 flex items-center justify-center gap-3 rounded-[1.35rem] px-4 py-4 text-sm font-semibold text-stone-500">
            <Loader2 size={18} className="animate-spin text-[#1C6AA8]" />
            Recovery-Session wird geprüft
          </div>
        ) : !hasRecoverySession ? (
          <div className="space-y-5">
            <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-700">
              {error || 'Der Reset-Link ist nicht mehr gültig. Fordern Sie bitte einen neuen Passwort-Link über den Admin-Login an.'}
            </div>
            <Link
              href="/admin"
              className="surface-card inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold text-stone-700 transition hover:-translate-y-0.5"
            >
              <ArrowLeft size={18} />
              Zurück zum Login
            </Link>
          </div>
        ) : (
          <>
            <label htmlFor="new-password" className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
              Neues Passwort
            </label>
            <div className="surface-card mb-5 flex items-center gap-3 rounded-[1.35rem] px-4 py-3">
              <LockKeyhole size={18} className="shrink-0 text-[#1C6AA8]" />
              <input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Mindestens 10 Zeichen"
                className="min-h-0 flex-1 border-0 bg-transparent p-0 text-base font-medium outline-none placeholder:text-stone-400"
                autoComplete="new-password"
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

            <label htmlFor="confirm-password" className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
              Passwort bestätigen
            </label>
            <div className="surface-card mb-5 flex items-center gap-3 rounded-[1.35rem] px-4 py-3">
              <LockKeyhole size={18} className="shrink-0 text-[#1C6AA8]" />
              <input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Passwort wiederholen"
                className="min-h-0 flex-1 border-0 bg-transparent p-0 text-base font-medium outline-none placeholder:text-stone-400"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((current) => !current)}
                className="surface-chip flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-500 transition hover:text-stone-950"
                aria-label={showConfirmPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

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
                  Passwort wird gespeichert
                </>
              ) : (
                <>
                  Passwort aktualisieren
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </>
        )}
      </form>
    </main>
  );
}
