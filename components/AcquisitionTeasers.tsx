'use client';

import {useId, useState} from 'react';
import {ChevronDown, Mail} from 'lucide-react';
import {useTranslations} from 'next-intl';

export default function AcquisitionTeasers() {
  const t = useTranslations('AcquisitionTeasers');
  const directCopy = [1, 2, 3, 4, 5].map((item) => t(`direct.items.${item}`));
  const developerCopy = [1, 2, 3, 4].map((item) => t(`developer.items.${item}`));

  return (
    <section id="direktkauf" className="relative z-10 mx-auto max-w-[1280px] overflow-hidden px-4 py-10 sm:px-6 lg:py-14">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-14 -z-10 hidden h-56 w-[70%] -translate-x-1/2 rounded-full bg-[rgba(126,180,221,0.12)] blur-[90px] sm:block" />

      <div className="mx-auto grid w-full max-w-5xl items-start gap-4 sm:gap-5">
        <TeaserCard
          label={t('direct.label')}
          title={t('direct.title')}
          intro={t('direct.intro')}
          items={directCopy}
          closing={t('direct.closing')}
          moreLabel={t('buttons.more')}
          emailLabel={t('buttons.email')}
        />

        <TeaserCard
          label={t('developer.label')}
          title={t('developer.title')}
          intro={t('developer.intro')}
          items={developerCopy}
          closing={t('developer.closing')}
          moreLabel={t('buttons.more')}
          emailLabel={t('buttons.email')}
        />

        <div className="surface-card relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)]">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-[linear-gradient(180deg,#7eb4dd,#1c6aa8)]" />
          <div className="grid min-w-0 items-center gap-4 p-5 pl-7 sm:p-6 sm:pl-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-6">
            <div className="min-w-0">
              <div className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                {t('rnd.label')}
              </div>
              <h3 className="font-heading text-[1.375rem] font-semibold leading-tight tracking-[-0.035em] text-[var(--color-ink)] sm:text-[1.625rem]">
                {t('rnd.title')}
              </h3>
              <p className="mt-1.5 text-[0.9375rem] font-light leading-6 text-[var(--color-text-muted)] sm:text-base">
                {t('rnd.text')}
              </p>
            </div>
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="btn-beam-blue w-full cursor-not-allowed justify-center opacity-50 sm:w-fit"
            >
              <span>{t('buttons.rnd')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeaserCard({
  label,
  title,
  intro,
  items,
  closing,
  moreLabel,
  emailLabel,
}: {
  label: string;
  title: string;
  intro: string;
  items: string[];
  closing: string;
  moreLabel: string;
  emailLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <article className="surface-card group relative w-full min-w-0 overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)]">
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-[linear-gradient(180deg,#7eb4dd,#1c6aa8_62%,transparent)]" />

      <div className="relative flex min-h-full min-w-0 flex-col p-5 pl-7 sm:p-6 sm:pl-9">
        <div className="mb-5 inline-flex min-w-0 items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_6px_var(--color-accent-soft)]" />
          {label}
        </div>

        <h3 className="max-w-3xl font-heading text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.04em] text-[var(--color-ink)] sm:text-[2.125rem]">
          {title}
        </h3>
        <p className="mt-3 max-w-2xl text-[0.9375rem] font-light leading-6 text-[var(--color-text-muted)] sm:text-base sm:leading-7">{intro}</p>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls={contentId}
          className="mt-6 flex w-full items-center justify-between gap-4 border-y border-[var(--color-border)] py-3.5 text-left text-sm font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
        >
          <span className="inline-flex items-center gap-3">
            <span className="h-px w-6 bg-[var(--color-accent)]" />
            {moreLabel}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
            <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={17} />
          </span>
        </button>

        <div id={contentId} className={`grid transition-[grid-template-rows,opacity] duration-[250ms] sm:duration-500 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="mt-4 rounded-[1.4rem] bg-[rgba(28,106,168,0.075)] p-4 text-[var(--color-text-muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] sm:p-5">
              {items.map((item) => (
                <div key={item} className="grid grid-cols-[auto_1fr] gap-3 border-b border-white/70 py-3 first:pt-0 last:border-0">
                  <span className="mt-[0.65rem] h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  <p className="text-sm leading-6 sm:text-base sm:leading-7">{item}</p>
                </div>
              ))}
              <p className="mt-4 border-l-2 border-[var(--color-accent)] pl-4 text-sm font-semibold leading-6 text-[var(--color-ink)] sm:text-base">
                {closing}
              </p>
            </div>
          </div>
        </div>

        <a href="#contact-email" className="btn-beam-blue mt-5 w-full self-start sm:w-fit">
          <Mail size={18} />
          <span>{emailLabel}</span>
        </a>
      </div>
    </article>
  );
}
