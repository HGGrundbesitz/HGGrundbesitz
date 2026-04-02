import Link from 'next/link';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

type LegalPageShellProps = {
  badge: string;
  title: string;
  lead: string;
  locale: string;
  updatedAt: string;
  children: React.ReactNode;
};

type LegalCardProps = {
  title: string;
  children: React.ReactNode;
};

export function LegalCard({ title, children }: LegalCardProps) {
  return (
    <section className="rounded-[2rem] border border-[#dbe8f4] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:p-8 dark:border-[#272b33] dark:bg-[#101317] dark:shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
      <h2 className="mb-5 text-2xl font-serif text-stone-900 dark:text-white">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-stone-600 sm:text-[15px] dark:text-stone-300">
        {children}
      </div>
    </section>
  );
}

export default function LegalPageShell({
  badge,
  title,
  lead,
  locale,
  updatedAt,
  children,
}: LegalPageShellProps) {
  const homeHref = `/${locale}`;

  return (
    <main className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-gold/20 selection:text-stone-950 dark:bg-[#050505] dark:text-stone-100 dark:selection:text-white">
      <Navbar />

      <section className="relative overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-[520px] w-[520px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[#dbe8f4] blur-[120px] dark:bg-[#0b2340]/50" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/4 translate-y-1/4 rounded-full bg-gold/8 blur-[120px] dark:bg-gold/10" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500 shadow-[0_14px_35px_rgba(15,23,42,0.06)] sm:text-xs dark:border-[#272b33] dark:bg-[#15181d]/82 dark:text-stone-300 dark:shadow-[0_14px_35px_rgba(0,0,0,0.22)]">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {badge}
            </span>

            <h1 className="max-w-4xl text-4xl font-serif leading-[0.95] text-stone-900 sm:text-5xl lg:text-6xl dark:text-white">
              {title}
            </h1>

            <p className="mt-6 max-w-2xl text-base font-light leading-8 text-stone-600 sm:text-lg dark:text-stone-300">
              {lead}
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-500 dark:text-stone-400">
              Die folgenden Angaben gelten sprachübergreifend für alle Versionen dieser Website und wurden so formuliert,
              dass sie in Ton und Erscheinung zur Website passen.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-6 lg:col-span-8">
              {children}
            </div>

            <aside className="lg:col-span-4">
              <div className="space-y-6 lg:sticky lg:top-32">
                <div className="rounded-[2rem] border border-[#dbe8f4] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:p-8 dark:border-[#272b33] dark:bg-[#101317] dark:shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                    Ansprechpartner
                  </span>
                  <h2 className="mt-4 text-2xl font-serif text-stone-900 dark:text-white">HG Grundbesitz GmbH</h2>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-stone-600 dark:text-stone-300">
                    <p>
                      Bremer Platz 9-11
                      <br />
                      48155 Münster
                      <br />
                      Deutschland
                    </p>
                    <a
                      href="mailto:info@hg-grundbesitz.de"
                      className="flex items-center gap-3 transition-colors hover:text-gold"
                    >
                      <Mail className="h-4 w-4" />
                      <span>info@hg-grundbesitz.de</span>
                    </a>
                    <a
                      href="tel:+4925139479064"
                      className="flex items-center gap-3 transition-colors hover:text-gold"
                    >
                      <Phone className="h-4 w-4" />
                      <span>+49 251 39479064</span>
                    </a>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-[#dbe8f4] bg-[linear-gradient(180deg,#f8fbff_0%,#eef5fb_100%)] p-6 sm:p-8 dark:border-[#272b33] dark:bg-[linear-gradient(180deg,#11151b_0%,#0b0f14_100%)]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                    Website
                  </span>
                  <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-300">
                    Stand dieser Fassung: {updatedAt}
                  </p>
                  <Link
                    href={homeHref}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#0B4E84]"
                  >
                    Zur Startseite
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </main>
  );
}
