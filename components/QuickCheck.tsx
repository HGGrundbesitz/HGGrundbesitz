'use client';

import {
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building,
  Building2,
  CheckCircle2,
  Euro,
  FileText,
  House,
  MapPin,
  Ruler,
  Store,
  UploadCloud,
  UserRound,
  X,
} from 'lucide-react';
import {
  isQuickCheckDocumentAllowed,
  QUICK_CHECK_MAX_DOCUMENTS,
  QUICK_CHECK_MAX_DOCUMENT_SIZE,
  QUICK_CHECK_MAX_DOCUMENT_TOTAL_SIZE,
} from '@/lib/quick-check-upload';

type PropertyType =
  | 'wohnung'
  | 'einfamilienhaus'
  | 'mehrfamilienhaus'
  | 'wohnGeschaeftshaus'
  | 'gewerbe'
  | 'grundstueck';

type StepId = 'propertyType' | 'address' | 'units' | 'area' | 'rent' | 'documents';

type Answers = {
  propertyType: PropertyType | '';
  street: string;
  postalCode: string;
  city: string;
  units: number;
  area: number;
  annualRent: number;
};

type ContactData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
};

type DocumentUpload = {
  id: string;
  file: File;
};

type DocumentToast = {
  id: string;
  count: number;
};

const INITIAL_ANSWERS: Answers = {
  propertyType: '',
  street: '',
  postalCode: '',
  city: '',
  units: 1,
  area: 0,
  annualRent: 0,
};

const INITIAL_CONTACT: ContactData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  consent: false,
};

const propertyOptions = [
  {value: 'wohnung', labelKey: 'propertyTypes.apartment', icon: Building2},
  {value: 'einfamilienhaus', labelKey: 'propertyTypes.singleFamily', icon: House},
  {value: 'mehrfamilienhaus', labelKey: 'propertyTypes.multiFamily', icon: Building},
  {value: 'wohnGeschaeftshaus', labelKey: 'propertyTypes.mixedUse', icon: Store},
  {value: 'gewerbe', labelKey: 'propertyTypes.commercial', icon: Briefcase},
  {value: 'grundstueck', labelKey: 'propertyTypes.land', icon: MapPin},
] as const;

const propertyLabelKeys = {
  wohnung: 'propertyTypes.apartment',
  einfamilienhaus: 'propertyTypes.singleFamily',
  mehrfamilienhaus: 'propertyTypes.multiFamily',
  wohnGeschaeftshaus: 'propertyTypes.mixedUse',
  gewerbe: 'propertyTypes.commercial',
  grundstueck: 'propertyTypes.land',
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function createDocumentId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `document-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1).replace('.', ',')} MB`;
}

function buildSteps(propertyType: PropertyType | ''): StepId[] {
  const needsUnits = propertyType === 'mehrfamilienhaus' || propertyType === 'gewerbe';
  const needsRent = propertyType !== 'grundstueck';

  return [
    'propertyType',
    'address',
    ...(needsUnits ? (['units'] as const) : []),
    'area',
    ...(needsRent ? (['rent'] as const) : []),
    'documents',
  ];
}

function getAreaTitleKey(propertyType: PropertyType | '') {
  if (propertyType === 'gewerbe') {
    return 'steps.area.commercialTitle';
  }

  if (propertyType === 'grundstueck') {
    return 'steps.area.landTitle';
  }

  return 'steps.area.residentialTitle';
}

export default function QuickCheck() {
  const locale = useLocale();
  const t = useTranslations('QuickCheck');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [contact, setContact] = useState<ContactData>(INITIAL_CONTACT);
  const [documentUploads, setDocumentUploads] = useState<DocumentUpload[]>([]);
  const [documentError, setDocumentError] = useState<string | null>(null);
  const [documentToast, setDocumentToast] = useState<DocumentToast | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contactPanelRef = useRef<HTMLDivElement>(null);

  const steps = useMemo(() => buildSteps(answers.propertyType), [answers.propertyType]);
  const currentStep = steps[Math.min(stepIndex, steps.length - 1)] ?? 'propertyType';
  const progress = ((Math.min(stepIndex, steps.length - 1) + 1) / steps.length) * 100;

  const addressLine = [answers.street, `${answers.postalCode} ${answers.city}`.trim()].filter(Boolean).join(', ');

  useEffect(() => {
    if (!documentToast) {
      return;
    }

    const timeoutId = window.setTimeout(() => setDocumentToast(null), 3800);
    return () => window.clearTimeout(timeoutId);
  }, [documentToast]);

  const summary = useMemo(() => {
    const rows: Array<{label: string; value: string}> = [
      {
        label: t('summary.propertyType'),
        value: answers.propertyType ? t(propertyLabelKeys[answers.propertyType]) : t('summary.notProvided'),
      },
      {label: t('summary.address'), value: addressLine || t('summary.notProvided')},
    ];

    if (answers.propertyType === 'mehrfamilienhaus' || answers.propertyType === 'gewerbe') {
      rows.push({label: t('summary.units'), value: `${answers.units}`});
    }

    rows.push({label: t('summary.area'), value: answers.area > 0 ? `${answers.area} m²` : t('summary.notProvided')});

    if (answers.propertyType !== 'grundstueck') {
      rows.push({
        label: t('summary.rent'),
        value: answers.annualRent > 0
          ? t('summary.rentValue', {value: answers.annualRent.toLocaleString(locale)})
          : t('summary.notProvided'),
      });
    }

    rows.push({
      label: t('summary.documents'),
      value: documentUploads.length > 0
        ? t('summary.fileCount', {count: documentUploads.length})
        : t('summary.withoutDocuments'),
    });

    return rows;
  }, [addressLine, answers, documentUploads.length, locale, t]);

  const goBack = () => {
    setError(null);
    setStepIndex((current) => Math.max(0, current - 1));
  };

  const validateStep = (step: StepId) => {
    if (step === 'propertyType' && !answers.propertyType) {
      return t('errors.propertyType');
    }

    if (step === 'address' && (!answers.street.trim() || !answers.postalCode.trim() || !answers.city.trim())) {
      return t('errors.address');
    }

    if (step === 'units' && (!Number.isInteger(answers.units) || answers.units < 1)) {
      return t('errors.units');
    }

    if (step === 'area' && answers.area <= 0) {
      return t('errors.area');
    }

    if (step === 'rent' && answers.annualRent < 0) {
      return t('errors.rent');
    }

    return null;
  };

  const goNext = () => {
    const validationError = validateStep(currentStep);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  };

  const handleDocumentFiles = (files: FileList | File[]) => {
    const incomingFiles = Array.from(files);

    if (incomingFiles.length === 0) {
      return;
    }

    const accepted: DocumentUpload[] = [];
    const warnings: string[] = [];
    const remainingSlots = QUICK_CHECK_MAX_DOCUMENTS - documentUploads.length;
    let acceptedTotalSize = documentUploads.reduce((total, document) => total + document.file.size, 0);

    for (const file of incomingFiles) {
      if (!isQuickCheckDocumentAllowed(file)) {
        warnings.push(t('errors.fileType', {file: file.name}));
        continue;
      }

      if (file.size > QUICK_CHECK_MAX_DOCUMENT_SIZE) {
        warnings.push(t('errors.fileSize', {file: file.name, size: formatFileSize(QUICK_CHECK_MAX_DOCUMENT_SIZE)}));
        continue;
      }

      if (acceptedTotalSize + file.size > QUICK_CHECK_MAX_DOCUMENT_TOTAL_SIZE) {
        warnings.push(t('errors.totalFileSize', {size: formatFileSize(QUICK_CHECK_MAX_DOCUMENT_TOTAL_SIZE)}));
        continue;
      }

      accepted.push({id: createDocumentId(), file});
      acceptedTotalSize += file.size;
    }

    if (accepted.length > remainingSlots) {
      warnings.push(t('errors.fileCount', {count: QUICK_CHECK_MAX_DOCUMENTS}));
    }

    const addedDocuments = accepted.slice(0, Math.max(0, remainingSlots));

    setDocumentUploads((current) => [...current, ...addedDocuments]);
    setDocumentError(warnings[0] ?? null);
    setError(null);

    if (addedDocuments.length > 0) {
      setDocumentToast({id: createDocumentId(), count: addedDocuments.length});
    }
  };

  const handleDocumentInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleDocumentFiles(event.target.files);
      event.target.value = '';
    }
  };

  const handleDocumentDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    handleDocumentFiles(event.dataTransfer.files);
  };

  const removeDocument = (documentId: string) => {
    setDocumentUploads((current) => current.filter((document) => document.id !== documentId));
    setDocumentError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const fullName = `${contact.firstName.trim()} ${contact.lastName.trim()}`.trim();
    const email = contact.email.trim();
    const phone = contact.phone.trim();

    if (!answers.propertyType || !answers.street.trim() || !answers.postalCode.trim() || !answers.city.trim()) {
      setError(t('errors.required'));
      return;
    }

    if (!fullName || !email || !phone) {
      setError(t('errors.contact'));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('errors.email'));
      return;
    }

    if (!contact.consent) {
      setError(t('errors.consent'));
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      const payload = {
        locale,
        contact: {
          firstName: contact.firstName.trim(),
          lastName: contact.lastName.trim(),
          name: fullName,
          email,
          phone,
          consent: contact.consent,
        },
        answers: {
          ...answers,
          propertyTypeLabel: t(propertyLabelKeys[answers.propertyType as PropertyType]),
          address: addressLine,
        },
        summary,
      };

      formData.append('payload', JSON.stringify(payload));
      documentUploads.forEach((document) => formData.append('documents', document.file));

      const response = await fetch('/api/quick-check', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {error?: string} | null;
        throw new Error(result?.error || 'quick_check_failed');
      }

      setIsSubmitted(true);
    } catch (submissionError) {
      console.error('Quick check submission failed:', submissionError);
      setError(t('errors.submit'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="schnellcheck" className="relative z-10 mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:py-20">
        <div className="glass-panel rounded-[2rem] p-8 text-center shadow-[var(--shadow-lift)] md:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
            <BadgeCheck size={34} />
          </div>
          <h2 className="mx-auto max-w-3xl font-heading text-4xl font-semibold tracking-tight text-[var(--color-ink)] md:text-5xl">
             {t('success.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-8 text-[var(--color-text-muted)]">
             {t('success.text')}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setStepIndex(0);
              setAnswers(INITIAL_ANSWERS);
              setContact(INITIAL_CONTACT);
              setDocumentUploads([]);
              setDocumentError(null);
              setError(null);
            }}
            className="btn-beam-blue mx-auto mt-8"
          >
             <span>{t('success.restart')}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="schnellcheck" className="relative z-10 mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-20">
      <motion.div
        initial={{opacity: 0, y: 18}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: '-120px'}}
        transition={{duration: 0.7}}
        className="mb-9 text-center sm:mb-12"
      >
        <div className="section-eyebrow mb-5">
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_6px_var(--color-accent-soft)]" />
           {t('badge')}
        </div>
        <h2 className="mx-auto max-w-4xl font-heading text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl">
           {t('title')}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base font-light leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
           {t('description')}
        </p>
      </motion.div>

      <div className="glass-panel rounded-[2rem] p-4 shadow-[var(--shadow-lift)] sm:p-6 lg:p-8">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={stepIndex === 0}
            className="theme-panel inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowLeft size={16} />
             {t('back')}
          </button>

          <div className="min-w-0 flex-1 md:max-w-[520px]">
            <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
               <span>{t('stepCounter', {current: Math.min(stepIndex, steps.length - 1) + 1, total: steps.length})}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[rgba(28,106,168,0.12)]">
              <motion.div
                animate={{width: `${progress}%`}}
                transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
                className="h-full rounded-full bg-[linear-gradient(90deg,#1c6aa8,#79b7e5)]"
              />
            </div>
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-[1.2rem] border border-red-100 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
            {error}
          </div>
        ) : null}

        <div className="min-h-[340px] sm:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -18}}
              transition={{duration: 0.28, ease: [0.16, 1, 0.3, 1]}}
            >
              {currentStep === 'propertyType' ? (
                 <StepShell title={t('steps.propertyType.title')} icon={<Building2 size={30} />}>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {propertyOptions.map((option) => {
                      const Icon = option.icon;
                      const isActive = answers.propertyType === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setAnswers((current) => ({...current, propertyType: option.value}));
                            setError(null);
                            window.setTimeout(() => setStepIndex(1), 120);
                          }}
                          className={cn(
                            'group surface-card min-h-[120px] rounded-[1.4rem] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] sm:min-h-[135px]',
                            isActive && 'ring-2 ring-[rgba(28,106,168,0.2)]',
                          )}
                        >
                          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform group-hover:-translate-y-1 sm:h-14 sm:w-14">
                            <Icon size={27} strokeWidth={1.8} />
                          </div>
                          <div className="font-heading text-xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-2xl">
                             {t(option.labelKey)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </StepShell>
              ) : null}

              {currentStep === 'address' ? (
                 <StepShell title={t('steps.address.title')} icon={<MapPin size={30} />}>
                  <div className="grid gap-4 md:grid-cols-[1.4fr_0.7fr_1fr]">
                    <TextField
                       label={t('steps.address.street')}
                      value={answers.street}
                      onChange={(value) => setAnswers((current) => ({...current, street: value}))}
                       placeholder={t('steps.address.streetPlaceholder')}
                    />
                    <TextField
                       label={t('steps.address.postalCode')}
                      value={answers.postalCode}
                      onChange={(value) => setAnswers((current) => ({...current, postalCode: value}))}
                       placeholder={t('steps.address.postalCodePlaceholder')}
                      inputMode="numeric"
                    />
                    <TextField
                       label={t('steps.address.city')}
                      value={answers.city}
                      onChange={(value) => setAnswers((current) => ({...current, city: value}))}
                       placeholder={t('steps.address.cityPlaceholder')}
                    />
                  </div>
                  <StepActions onNext={goNext} />
                </StepShell>
              ) : null}

              {currentStep === 'units' ? (
                 <StepShell title={t('steps.units.title')} icon={<Building size={30} />}>
                  <NumberField
                     label={t('steps.units.label')}
                    value={answers.units}
                    min={1}
                    step={1}
                    onChange={(value) => setAnswers((current) => ({...current, units: Math.max(1, Math.round(value || 1))}))}
                  />
                  <StepActions onNext={goNext} />
                </StepShell>
              ) : null}

              {currentStep === 'area' ? (
                 <StepShell title={t(getAreaTitleKey(answers.propertyType))} icon={<Ruler size={30} />}>
                  <NumberField
                     label={t('steps.area.label')}
                    value={answers.area}
                    min={0}
                    step={1}
                    suffix="m²"
                    onChange={(value) => setAnswers((current) => ({...current, area: Math.max(0, Math.round(value || 0))}))}
                  />
                  <StepActions onNext={goNext} />
                </StepShell>
              ) : null}

              {currentStep === 'rent' ? (
                 <StepShell title={t('steps.rent.title')} icon={<Euro size={30} />}>
                  <NumberField
                     label={t('steps.rent.label')}
                    value={answers.annualRent}
                    min={0}
                    step={100}
                    suffix="€"
                    onChange={(value) => setAnswers((current) => ({...current, annualRent: Math.max(0, Math.round(value || 0))}))}
                  />
                  <StepActions onNext={goNext} />
                </StepShell>
              ) : null}

              {currentStep === 'documents' ? (
                <form onSubmit={handleSubmit}>
                  <StepShell
                     title={t('steps.documents.title')}
                     subtitle={t('steps.documents.subtitle')}
                    icon={<UploadCloud size={30} />}
                  >
                    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                      <div
                        onDragEnter={(event) => {
                          event.preventDefault();
                          setIsDragActive(true);
                        }}
                        onDragOver={(event) => event.preventDefault()}
                        onDragLeave={() => setIsDragActive(false)}
                        onDrop={handleDocumentDrop}
                        className={cn(
                          'surface-card flex flex-col items-center justify-center border-dashed text-center transition-all',
                          documentUploads.length > 0
                            ? 'min-h-[190px] rounded-[1.3rem] p-4 sm:min-h-[210px]'
                            : 'min-h-[240px] rounded-[1.6rem] p-5 sm:min-h-[270px]',
                          isDragActive
                            ? 'bg-[rgba(28,106,168,0.08)] ring-2 ring-[rgba(28,106,168,0.18)]'
                            : documentUploads.length > 0 && 'bg-[var(--color-accent-soft)] ring-1 ring-[rgba(28,106,168,0.16)]',
                        )}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                           accept="application/pdf,image/png,image/jpeg,image/webp"
                          onChange={handleDocumentInputChange}
                          className="hidden"
                        />
                        <div className={cn(
                          'flex items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-accent)]',
                          documentUploads.length > 0
                            ? 'mb-3 h-12 w-12 rounded-[1rem] bg-white/75'
                            : 'mb-5 h-16 w-16 rounded-[1.25rem]',
                        )}>
                          {documentUploads.length > 0 ? <CheckCircle2 size={25} /> : <FileText size={28} />}
                        </div>
                        {documentUploads.length > 0 ? (
                          <div className="max-w-sm">
                            <p className="font-heading text-lg font-semibold text-[var(--color-ink)]">
                              {t('steps.documents.filesAdded', {count: documentUploads.length})}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                              {t('steps.documents.addMore')}
                            </p>
                          </div>
                        ) : (
                          <p className="max-w-sm text-sm leading-7 text-[var(--color-text-muted)]">
                            {t('steps.documents.dropHint')}
                          </p>
                        )}
                        <div className={cn('flex w-full flex-col gap-3 sm:w-auto sm:flex-row', documentUploads.length > 0 ? 'mt-4' : 'mt-6')}>
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-beam-blue">
                             <span>{t('steps.documents.selectFiles')}</span>
                            <UploadCloud size={17} />
                          </button>
                           <button
                             type="button"
                             onClick={() => {
                               setDocumentUploads([]);
                               setDocumentError(null);
                               contactPanelRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
                             }}
                             className="theme-panel min-h-[3.35rem] rounded-full px-6 py-3 text-sm font-semibold text-[var(--color-ink)]"
                           >
                             {t('steps.documents.skip')}
                          </button>
                        </div>
                        {documentError ? <div className="mt-4 text-sm font-medium text-red-600">{documentError}</div> : null}
                      </div>

                       <div ref={contactPanelRef} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                           <TextField label={t('contact.firstName')} value={contact.firstName} onChange={(value) => setContact((current) => ({...current, firstName: value}))} placeholder={t('contact.firstNamePlaceholder')} />
                           <TextField label={t('contact.lastName')} value={contact.lastName} onChange={(value) => setContact((current) => ({...current, lastName: value}))} placeholder={t('contact.lastNamePlaceholder')} />
                           <TextField label={t('contact.email')} value={contact.email} onChange={(value) => setContact((current) => ({...current, email: value}))} placeholder={t('contact.emailPlaceholder')} type="email" />
                           <TextField label={t('contact.phone')} value={contact.phone} onChange={(value) => setContact((current) => ({...current, phone: value}))} placeholder={t('contact.phonePlaceholder')} type="tel" />
                        </div>

                        <label className="surface-card flex items-start gap-3 rounded-[1.2rem] p-4 text-sm leading-6 text-[var(--color-text-muted)]">
                          <input
                            type="checkbox"
                            checked={contact.consent}
                            onChange={(event) => setContact((current) => ({...current, consent: event.target.checked}))}
                            className="mt-1 h-5 w-5 shrink-0"
                          />
                           <span>{t('contact.consent')}</span>
                        </label>

                        {documentUploads.length > 0 ? (
                          <div className="grid gap-2">
                            {documentUploads.map((document) => (
                              <div key={document.id} className="theme-panel-muted flex items-center justify-between gap-3 rounded-[1rem] px-4 py-3 text-sm">
                                <span className="min-w-0 truncate text-[var(--color-ink)]">{document.file.name}</span>
                                <div className="flex shrink-0 items-center gap-3">
                                  <span className="text-xs text-[var(--color-text-muted)]">{formatFileSize(document.file.size)}</span>
                                   <button type="button" onClick={() => removeDocument(document.id)} className="text-[var(--color-text-muted)] hover:text-red-600" aria-label={t('steps.documents.removeFile', {file: document.file.name})}>
                                    <X size={16} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}

                        <div className="surface-card rounded-[1.2rem] p-4">
                          <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                            <CheckCircle2 size={16} className="text-[var(--color-accent)]" />
                             {t('summary.title')}
                          </div>
                          <div className="grid gap-2">
                             {summary.map((item) => (
                               <div key={item.label} className="flex flex-col gap-1 rounded-[0.9rem] bg-white/70 px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                                 <span className="font-semibold text-[var(--color-text-muted)]">{item.label}</span>
                                 <span className="break-words font-semibold text-[var(--color-ink)] sm:text-right">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="btn-beam-blue w-full justify-center disabled:cursor-not-allowed disabled:opacity-70">
                           <span>{isSubmitting ? t('submitting') : t('submit')}</span>
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </StepShell>
                </form>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {documentToast ? (
          <motion.div
            key={documentToast.id}
            initial={{opacity: 0, y: 16, scale: 0.98}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 10, scale: 0.98}}
            transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
            role="status"
            aria-live="polite"
            className="fixed inset-x-4 bottom-4 z-50 flex items-center gap-3 rounded-[1.1rem] border border-[rgba(28,106,168,0.16)] bg-white/95 px-4 py-3 text-sm font-semibold text-[var(--color-ink)] shadow-[var(--shadow-lift)] backdrop-blur-md sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-full sm:max-w-sm"
          >
            <CheckCircle2 size={20} className="shrink-0 text-[var(--color-accent)]" />
            <span className="min-w-0 flex-1">{t('steps.documents.successToast', {count: documentToast.count})}</span>
            <button
              type="button"
              onClick={() => setDocumentToast(null)}
              aria-label={t('steps.documents.closeToast')}
              className="shrink-0 rounded-full p-1 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(28,106,168,0.3)]"
            >
              <X size={17} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function StepShell({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-7 text-center sm:mb-9">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[1.3rem] bg-[var(--color-accent-soft)] text-[var(--color-accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          {icon}
        </div>
        <h3 className="mx-auto max-w-4xl text-balance font-heading text-2xl font-semibold leading-tight tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-[2rem]">
          {title}
        </h3>
        {subtitle ? <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[var(--color-text-muted)]">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

function StepActions({onNext}: {onNext: () => void}) {
  const t = useTranslations('QuickCheck');

  return (
    <div className="mt-8 flex justify-center">
      <button type="button" onClick={onNext} className="btn-beam-blue">
        <span>{t('next')}</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">{label}</span>
      <input
        type={type}
        value={value}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[1.2rem] border border-[var(--color-border)] bg-white/82 px-5 py-4 text-base font-medium text-[var(--color-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.86)] outline-none transition-all placeholder:text-[rgba(20,20,20,0.34)] focus:border-[rgba(28,106,168,0.35)] focus:ring-4 focus:ring-[rgba(28,106,168,0.08)]"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  step,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  step: number;
  suffix?: string;
}) {
  return (
    <label className="mx-auto block max-w-md">
      <span className="mb-3 block text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">{label}</span>
      <div className="surface-card flex items-center rounded-[1.15rem] p-1.5 sm:p-2">
        <input
          type="number"
          min={min}
          step={step}
          value={value || ''}
          onChange={(event) => onChange(Number(event.target.value))}
          className="min-w-0 flex-1 appearance-none border-0 bg-transparent px-3 py-2.5 text-center font-heading text-2xl font-semibold tracking-tight text-[var(--color-ink)] outline-none sm:text-3xl [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix ? <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--color-accent)] sm:text-sm">{suffix}</span> : null}
      </div>
    </label>
  );
}
