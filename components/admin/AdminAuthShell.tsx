'use client';

import {ReactNode} from 'react';
import {motion} from 'motion/react';
import {Building2, FileCheck2, ShieldCheck} from 'lucide-react';

type AdminAuthShellProps = {
  cardEyebrow: string;
  cardTitle: string;
  cardDescription: string;
  children: ReactNode;
};

export default function AdminAuthShell({
  cardEyebrow,
  cardTitle,
  cardDescription,
  children,
}: AdminAuthShellProps) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#eef5fb]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(28,106,168,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(28,106,168,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="pointer-events-none absolute left-[-8rem] top-[-6rem] h-[26rem] w-[26rem] rounded-full bg-[var(--color-accent-soft)] blur-[120px]" />

      <div className="section-shell relative z-10 flex w-full items-center justify-center py-6 sm:py-10">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.55}}
          className="grid w-full max-w-[1040px] overflow-hidden rounded-[2.25rem] border border-white/70 bg-white shadow-[0_36px_90px_-44px_rgba(15,23,42,0.42)] lg:grid-cols-[0.9fr_1.1fr]"
        >
          <aside className="relative hidden min-h-[660px] overflow-hidden bg-[#0f172a] p-10 text-white lg:flex lg:flex-col">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(126,180,221,0.24),transparent_30%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.025)_50%,transparent_50%)]" />
            <div aria-hidden="true" className="absolute -right-20 bottom-16 h-72 w-72 rounded-full border border-white/10" />
            <div aria-hidden="true" className="absolute -right-5 bottom-32 h-44 w-44 rounded-full border border-[#7eb4dd]/30" />

            <div className="relative flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#1c6aa8] shadow-[0_18px_30px_-18px_rgba(28,106,168,0.9)]">
                <ShieldCheck size={19} />
              </span>
              <div>
                <div className="font-heading text-xl font-semibold tracking-[-0.04em]">HG Grundbesitz</div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-400">Admin Workspace</div>
              </div>
            </div>

            <div className="relative mt-auto mb-auto py-16">
              <div className="mb-5 h-px w-14 bg-[#7eb4dd]" />
              <p className="max-w-sm font-heading text-[2.7rem] font-semibold leading-[1.03] tracking-[-0.055em]">
                Immobilienankauf, strukturiert geprüft.
              </p>
              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">{cardDescription}</p>
            </div>

            <div className="relative grid grid-cols-3 gap-2">
              {[
                {icon: Building2, label: 'Anfragen'},
                {icon: FileCheck2, label: 'Dokumente'},
                {icon: ShieldCheck, label: 'Status'},
              ].map(({icon: Icon, label}) => (
                <div key={label} className="rounded-[1.15rem] border border-white/10 bg-white/[0.045] p-3">
                  <Icon size={16} className="text-[#7eb4dd]" />
                  <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-300">{label}</div>
                </div>
              ))}
            </div>
          </aside>

          <section className="p-6 sm:p-9 lg:p-12">
            <div className="mb-8">
              <div className="mb-7 flex items-center gap-3 lg:hidden">
                <span className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] bg-[#0f172a] text-white">
                  <ShieldCheck size={17} />
                </span>
                <div>
                  <div className="text-sm font-semibold text-[var(--color-ink)]">HG Grundbesitz</div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Admin Workspace</div>
                </div>
              </div>

              <div className="mb-5 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                {cardEyebrow}
              </div>
              <h2 className="font-heading text-[2.15rem] font-semibold leading-tight tracking-[-0.055em] text-[var(--color-ink)] sm:text-[2.55rem]">{cardTitle}</h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-[var(--color-text-muted)]">{cardDescription}</p>
            </div>

            {children}
          </section>
        </motion.div>
      </div>
    </div>
  );
}
