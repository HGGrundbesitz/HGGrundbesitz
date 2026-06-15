'use client';

import {
  type ChangeEvent,
  type ComponentType,
  type DragEvent,
  type FormEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BadgeCheck,
  Briefcase,
  Building,
  Building2,
  CheckCircle2,
  DoorOpen,
  FileText,
  Flame,
  Hammer,
  House,
  LayoutGrid,
  MapPin,
  Minus,
  Plus,
  Ruler,
  Sparkles,
  Store,
  UploadCloud,
  UserRound,
  Wrench,
  X,
} from 'lucide-react';
import { cn } from '../lib/utils';

type LocaleKey = 'de' | 'en' | 'ar';
type PropertyType = 'wohnung' | 'einfamilienhaus' | 'mehrfamilienhaus' | 'wohnGeschaeftshaus' | 'gewerbe';
type AgeBucket =
  | 'unter5'
  | 'unter10'
  | 'unter15'
  | 'fuenfBis10'
  | 'zehnBis15'
  | 'zehnBis20'
  | 'fuenfzehnBis20'
  | 'ueber10'
  | 'ueber15'
  | 'ueber20';
type FloorplanBucket = '1950' | '2000' | '2025';

type Answers = {
  propertyType: PropertyType | '';
  heatingAge: AgeBucket | '';
  roofAge: AgeBucket | '';
  facadeAge: AgeBucket | '';
  windowAge: AgeBucket | '';
  bathroomAge: AgeBucket | '';
  surfaceAge: AgeBucket | '';
  systemsAge: AgeBucket | '';
  floorplanAge: FloorplanBucket | '';
  address: string;
  yearBuilt: number;
  area: number;
  units: number;
};

type ContactData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  consent: boolean;
};

type IconType = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
type ChoiceStepId =
  | 'propertyType'
  | 'heatingAge'
  | 'roofAge'
  | 'facadeAge'
  | 'windowAge'
  | 'bathroomAge'
  | 'surfaceAge'
  | 'systemsAge'
  | 'floorplanAge';
type NumberStepId = 'yearBuilt' | 'area' | 'units';

type CardOption = {
  value: string;
  label: string;
  shortLabel?: string;
  icon?: IconType;
};

type Step =
  | {
      id: ChoiceStepId;
      kind: 'choice';
      title: string;
      subtitle?: string;
      icon?: IconType;
      layout: 'cards' | 'pills';
      options: CardOption[];
    }
  | {
      id: 'address';
      kind: 'text';
      title: string;
      subtitle: string;
      placeholder: string;
      skipLabel: string;
    }
  | {
      id: NumberStepId;
      kind: 'number';
      title: string;
      min: number;
      max: number;
      step: number;
      unit?: string;
      icon: IconType;
    }
  | {
      id: 'documents';
      kind: 'documents';
      title: string;
      subtitle: string;
      skipLabel: string;
    }
  | {
      id: 'contact';
      kind: 'contact';
      title: string;
      subtitle: string;
    };

type DocumentUpload = {
  id: string;
  file: File;
};

const MAX_DOCUMENTS = 5;
const MAX_DOCUMENT_SIZE = 7 * 1024 * 1024;
const MAX_DOCUMENT_TOTAL_SIZE = 20 * 1024 * 1024;

const INITIAL_ANSWERS: Answers = {
  propertyType: '',
  heatingAge: '',
  roofAge: '',
  facadeAge: '',
  windowAge: '',
  bathroomAge: '',
  surfaceAge: '',
  systemsAge: '',
  floorplanAge: '',
  address: '',
  yearBuilt: 1978,
  area: 225,
  units: 1,
};

const INITIAL_CONTACT: ContactData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  consent: false,
};

const copy = {
  de: {
    badge: 'Schnellcheck',
    title: 'In 2 Minuten prüfen, ob Ihre Immobilie in unser Profil passt',
    description:
      'Beantworten Sie die wichtigsten Fragen in einem klaren Ablauf. Danach erhalten Sie eine diskrete erste Einordnung per E-Mail.',
    back: 'Zurück',
    step: 'Schritt',
    of: 'von',
    next: 'Weiter',
    summaryTitle: 'Zusammenfassung Ihrer Angaben',
    successTitle: 'Danke, Ihr Schnellcheck ist eingegangen.',
    successText:
      'Wir haben Ihre Angaben erhalten und melden uns mit einer nachvollziehbaren ersten Einordnung bei Ihnen.',
    restart: 'Neuen Schnellcheck starten',
    toContact: 'Zum Kontakt',
    uploadTitle: 'Dokumente optional ergänzen',
    uploadHint:
      'Falls Sie Exposé, Grundrisse oder Unterlagen bereits als PDF haben, können Sie diese direkt anhängen. Der Upload ist freiwillig.',
    uploadTrigger: 'PDF auswählen',
    uploadEmpty: 'Noch keine Dokumente ausgewählt. Sie können auch ohne Upload weitermachen.',
    uploadSkip: 'Ohne Dokumente weiter',
    uploadMeta: 'Maximal 5 PDFs, je 7 MB, insgesamt bis 20 MB.',
    firstName: 'Vorname',
    lastName: 'Nachname',
    phone: 'Telefonnummer',
    email: 'E-Mail',
    consent:
      'Ich habe die Datenschutzhinweise gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung des Schnellchecks einverstanden.',
    submit: 'Ersteinschätzung anfragen',
    sending: 'Wird gesendet...',
    errors: {
      requiredContact: 'Bitte füllen Sie Vorname, Nachname, E-Mail und Telefonnummer aus.',
      invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      missingConsent: 'Bitte bestätigen Sie die Datenschutzhinweise.',
      general: 'Es gab ein Problem beim Senden. Bitte versuchen Sie es später erneut.',
      pdfOnly: 'Bitte nur PDF-Dateien hochladen.',
      maxSize: 'Eine Datei ist zu groß. Erlaubt sind maximal 7 MB pro PDF.',
      maxCount: 'Es können maximal 5 PDF-Dateien angehängt werden.',
      maxTotal: 'Die gesamte Dokumentenmenge darf 20 MB nicht überschreiten.',
    },
    labels: {
      propertyType: 'Immobilienart',
      heatingAge: 'Heizungsanlage',
      roofAge: 'Dachdämmung',
      facadeAge: 'Fassadendämmung',
      windowAge: 'Fenster und Türen',
      bathroomAge: 'Bäder',
      surfaceAge: 'Wände, Decken und Böden',
      systemsAge: 'Leitungssysteme',
      floorplanAge: 'Grundriss',
      address: 'Adresse',
      yearBuilt: 'Baujahr',
      area: 'Fläche',
      units: 'Nutzungseinheiten',
      documents: 'Dokumente',
    },
    defaults: {
      notProvided: 'Nicht angegeben',
      noDocuments: 'Ohne Dokumente',
    },
    steps: {
      propertyType: {
        title: 'Um welche Immobilienart handelt es sich?',
        options: [
          { value: 'wohnung', label: 'Eigentumswohnung' },
          { value: 'einfamilienhaus', label: 'Einfamilienhaus' },
          { value: 'mehrfamilienhaus', label: 'Mehrfamilienhaus' },
          { value: 'wohnGeschaeftshaus', label: 'Wohn- und Geschäftshaus', shortLabel: 'Wohn- & Geschäftshaus' },
          { value: 'gewerbe', label: 'Gewerbeobjekt' },
        ],
      },
      heatingAge: {
        title: 'Wie alt ist die Heizungsanlage?',
        options: [
          { value: 'unter10', label: 'Neuer als 10 Jahre' },
          { value: 'zehnBis15', label: '10-15 Jahre' },
          { value: 'ueber15', label: 'Älter als 15 Jahre' },
        ],
      },
      roofAge: {
        title: 'Wie alt ist die Dämmung des Daches?',
        options: [
          { value: 'unter10', label: 'Neuer als 10 Jahre' },
          { value: 'zehnBis20', label: '10-20 Jahre' },
          { value: 'ueber20', label: 'Älter als 20 Jahre' },
        ],
      },
      facadeAge: {
        title: 'Wie alt ist die Dämmung der Fassade?',
        subtitle: 'Nur vollständige Wärmedämmung der Außenwände, keine Teilmodernisierung.',
        options: [
          { value: 'unter10', label: 'Neuer als 10 Jahre' },
          { value: 'zehnBis20', label: '10-20 Jahre' },
          { value: 'ueber20', label: 'Älter als 20 Jahre' },
        ],
      },
      windowAge: {
        title: 'Wie alt sind die Fenster und Türen?',
        subtitle: 'Im Durchschnitt.',
        options: [
          { value: 'unter10', label: 'Neuer als 10 Jahre' },
          { value: 'zehnBis15', label: '10-15 Jahre' },
          { value: 'ueber15', label: 'Älter als 15 Jahre' },
        ],
      },
      bathroomAge: {
        title: 'Wie alt sind die Bäder?',
        subtitle: 'Im Durchschnitt.',
        options: [
          { value: 'unter5', label: 'Neuer als 5 Jahre' },
          { value: 'fuenfBis10', label: '5-10 Jahre' },
          { value: 'ueber10', label: 'Älter als 10 Jahre' },
        ],
      },
      surfaceAge: {
        title: 'Wie alt sind Wände, Decken und Fußböden?',
        subtitle: 'Im Durchschnitt.',
        options: [
          { value: 'unter15', label: 'Neuer als 15 Jahre' },
          { value: 'fuenfzehnBis20', label: '15-20 Jahre' },
          { value: 'ueber20', label: 'Älter als 20 Jahre' },
        ],
      },
      systemsAge: {
        title: 'Wann wurden Strom, Gas, Wasser und Abwasser zuletzt modernisiert?',
        options: [
          { value: 'unter15', label: 'Neuer als 15 Jahre' },
          { value: 'fuenfzehnBis20', label: '15-20 Jahre' },
          { value: 'ueber20', label: 'Älter als 20 Jahre' },
        ],
      },
      floorplanAge: {
        title: 'Wann wurde der Grundriss zuletzt wesentlich verändert?',
        subtitle: 'Gemeint sind moderne Anpassungen wie offene Küchen, bessere Bäder oder ein zeitgemäßer Zuschnitt.',
        options: [
          { value: '1950', label: '1950' },
          { value: '2000', label: '2000' },
          { value: '2025', label: '2025' },
        ],
      },
      address: {
        title: 'Wie lautet die Adresse der Immobilie?',
        subtitle: 'Optional, aber hilfreich für eine genauere erste Einordnung.',
        placeholder: 'z. B. Bremer Platz 9-11, 48155 Münster',
        skipLabel: 'Weiter ohne Adresse',
      },
      yearBuilt: 'Wie lautet das Baujahr des Objekts?',
      area: 'Welche Wohn- und Nutzfläche hat das Objekt?',
      units: 'Wie viele Nutzungseinheiten hat die Immobilie?',
      documents: 'Möchten Sie vorhandene Unterlagen hochladen?',
      contact: 'Wohin dürfen wir die Ersteinschätzung schicken?',
      contactSubtitle:
        'Zum Schluss brauchen wir nur Ihre Kontaktdaten. Wir melden uns diskret mit einer ersten Einordnung und den nächsten sinnvollen Schritten.',
    },
  },
  en: {
    badge: 'Quick check',
    title: 'Check in 2 minutes whether your property fits our acquisition profile',
    description:
      'Answer the key questions in a clear flow. Afterwards you will receive a discreet first assessment by email.',
    back: 'Back',
    step: 'Step',
    of: 'of',
    next: 'Continue',
    summaryTitle: 'Summary of your details',
    successTitle: 'Thank you, your quick check has been received.',
    successText: 'We have received your details and will get back to you with a clear first assessment.',
    restart: 'Start a new quick check',
    toContact: 'Go to contact',
    uploadTitle: 'Add documents optionally',
    uploadHint: 'If you already have PDFs such as an exposé, floor plans or supporting documents, you can attach them.',
    uploadTrigger: 'Choose PDF',
    uploadEmpty: 'No documents selected yet. You can continue without an upload.',
    uploadSkip: 'Continue without documents',
    uploadMeta: 'Maximum 5 PDFs, 7 MB each, 20 MB total.',
    firstName: 'First name',
    lastName: 'Last name',
    phone: 'Phone number',
    email: 'Email',
    consent: 'I have read the privacy notice and agree to the processing of my information for handling the quick check.',
    submit: 'Request initial assessment',
    sending: 'Sending...',
    errors: {
      requiredContact: 'Please complete first name, last name, email and phone number.',
      invalidEmail: 'Please enter a valid email address.',
      missingConsent: 'Please confirm the privacy notice.',
      general: 'There was a problem sending your request. Please try again later.',
      pdfOnly: 'Please upload PDF files only.',
      maxSize: 'One file is too large. A maximum of 7 MB per PDF is allowed.',
      maxCount: 'A maximum of 5 PDF files can be attached.',
      maxTotal: 'The total document size must not exceed 20 MB.',
    },
    labels: {
      propertyType: 'Property type',
      heatingAge: 'Heating system',
      roofAge: 'Roof insulation',
      facadeAge: 'Facade insulation',
      windowAge: 'Windows and doors',
      bathroomAge: 'Bathrooms',
      surfaceAge: 'Walls, ceilings and floors',
      systemsAge: 'Building systems',
      floorplanAge: 'Floor plan',
      address: 'Address',
      yearBuilt: 'Year built',
      area: 'Area',
      units: 'Units',
      documents: 'Documents',
    },
    defaults: {
      notProvided: 'Not provided',
      noDocuments: 'Without documents',
    },
    steps: {
      propertyType: {
        title: 'What type of property is it?',
        options: [
          { value: 'wohnung', label: 'Condominium' },
          { value: 'einfamilienhaus', label: 'Single-family house' },
          { value: 'mehrfamilienhaus', label: 'Apartment building' },
          { value: 'wohnGeschaeftshaus', label: 'Mixed-use building' },
          { value: 'gewerbe', label: 'Commercial property' },
        ],
      },
      heatingAge: {
        title: 'How old is the heating system?',
        options: [
          { value: 'unter10', label: 'Newer than 10 years' },
          { value: 'zehnBis15', label: '10-15 years' },
          { value: 'ueber15', label: 'Older than 15 years' },
        ],
      },
      roofAge: {
        title: 'How old is the roof insulation?',
        options: [
          { value: 'unter10', label: 'Newer than 10 years' },
          { value: 'zehnBis20', label: '10-20 years' },
          { value: 'ueber20', label: 'Older than 20 years' },
        ],
      },
      facadeAge: {
        title: 'How old is the facade insulation?',
        subtitle: 'Only complete thermal insulation of the outer walls, not partial modernization.',
        options: [
          { value: 'unter10', label: 'Newer than 10 years' },
          { value: 'zehnBis20', label: '10-20 years' },
          { value: 'ueber20', label: 'Older than 20 years' },
        ],
      },
      windowAge: {
        title: 'How old are the windows and doors?',
        subtitle: 'Average age.',
        options: [
          { value: 'unter10', label: 'Newer than 10 years' },
          { value: 'zehnBis15', label: '10-15 years' },
          { value: 'ueber15', label: 'Older than 15 years' },
        ],
      },
      bathroomAge: {
        title: 'How old are the bathrooms?',
        subtitle: 'Average age.',
        options: [
          { value: 'unter5', label: 'Newer than 5 years' },
          { value: 'fuenfBis10', label: '5-10 years' },
          { value: 'ueber10', label: 'Older than 10 years' },
        ],
      },
      surfaceAge: {
        title: 'How old are the walls, ceilings and floors?',
        subtitle: 'Average age.',
        options: [
          { value: 'unter15', label: 'Newer than 15 years' },
          { value: 'fuenfzehnBis20', label: '15-20 years' },
          { value: 'ueber20', label: 'Older than 20 years' },
        ],
      },
      systemsAge: {
        title: 'When were electricity, gas, water and wastewater systems last modernized?',
        options: [
          { value: 'unter15', label: 'Newer than 15 years' },
          { value: 'fuenfzehnBis20', label: '15-20 years' },
          { value: 'ueber20', label: 'Older than 20 years' },
        ],
      },
      floorplanAge: {
        title: 'When was the floor plan last substantially changed?',
        subtitle: 'Think of changes such as open kitchens, better bathrooms or a more modern layout.',
        options: [
          { value: '1950', label: '1950' },
          { value: '2000', label: '2000' },
          { value: '2025', label: '2025' },
        ],
      },
      address: {
        title: 'What is the address of the property?',
        subtitle: 'Optional, but helpful for a more precise initial assessment.',
        placeholder: 'e.g. Bremer Platz 9-11, 48155 Münster',
        skipLabel: 'Continue without address',
      },
      yearBuilt: 'What is the year of construction?',
      area: 'What is the residential and usable area?',
      units: 'How many units does the property have?',
      documents: 'Would you like to upload available documents?',
      contact: 'Where should we send the initial assessment?',
      contactSubtitle:
        'At the end, we only need your contact details. We will reply discreetly with a first assessment and the next sensible steps.',
    },
  },
  ar: {
    badge: 'فحص سريع',
    title: 'تحقق خلال دقيقتين إذا كان عقارك يناسب معايير الشراء لدينا',
    description:
      'جاوب على أهم الأسئلة بخطوات واضحة وسريعة. بعدها نرسل لك تقييمًا أوليًا بسرية عبر البريد الإلكتروني.',
    back: 'رجوع',
    step: 'الخطوة',
    of: 'من',
    next: 'متابعة',
    summaryTitle: 'ملخص بياناتك',
    successTitle: 'شكرًا، تم استلام الفحص السريع.',
    successText: 'وصلتنا بياناتك وسنعود إليك بتقييم أولي واضح وبكل خصوصية.',
    restart: 'ابدأ فحصًا جديدًا',
    toContact: 'إلى التواصل',
    uploadTitle: 'إضافة المستندات اختياريًا',
    uploadHint: 'إذا كانت لديك ملفات PDF مثل العرض أو المخططات أو المستندات الداعمة، يمكنك إرفاقها مباشرة.',
    uploadTrigger: 'اختر PDF',
    uploadEmpty: 'لم يتم اختيار أي مستندات بعد. يمكنك المتابعة بدون رفع ملفات.',
    uploadSkip: 'متابعة بدون مستندات',
    uploadMeta: 'حد أقصى 5 ملفات PDF، كل ملف 7 MB، وبإجمالي 20 MB.',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    phone: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    consent: 'قرأت سياسة الخصوصية وأوافق على معالجة بياناتي لغرض مراجعة الفحص السريع.',
    submit: 'طلب التقييم الأولي',
    sending: 'جارٍ الإرسال...',
    errors: {
      requiredContact: 'يرجى تعبئة الاسم الأول واسم العائلة والبريد الإلكتروني ورقم الهاتف.',
      invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح.',
      missingConsent: 'يرجى تأكيد سياسة الخصوصية.',
      general: 'حدثت مشكلة أثناء الإرسال. يرجى المحاولة مرة أخرى لاحقًا.',
      pdfOnly: 'يرجى رفع ملفات PDF فقط.',
      maxSize: 'أحد الملفات كبير جدًا. الحد الأقصى هو 7 MB لكل ملف PDF.',
      maxCount: 'يمكن إرفاق 5 ملفات PDF كحد أقصى.',
      maxTotal: 'يجب ألا يتجاوز الحجم الإجمالي للمستندات 20 MB.',
    },
    labels: {
      propertyType: 'نوع العقار',
      heatingAge: 'نظام التدفئة',
      roofAge: 'عزل السقف',
      facadeAge: 'عزل الواجهة',
      windowAge: 'النوافذ والأبواب',
      bathroomAge: 'الحمامات',
      surfaceAge: 'الجدران والأسقف والأرضيات',
      systemsAge: 'الأنظمة الفنية',
      floorplanAge: 'المخطط الداخلي',
      address: 'العنوان',
      yearBuilt: 'سنة البناء',
      area: 'المساحة',
      units: 'عدد الوحدات',
      documents: 'المستندات',
    },
    defaults: {
      notProvided: 'غير مذكور',
      noDocuments: 'بدون مستندات',
    },
    steps: {
      propertyType: {
        title: 'ما نوع العقار؟',
        options: [
          { value: 'wohnung', label: 'شقة تمليك' },
          { value: 'einfamilienhaus', label: 'منزل لعائلة واحدة' },
          { value: 'mehrfamilienhaus', label: 'عمارة سكنية' },
          { value: 'wohnGeschaeftshaus', label: 'مبنى سكني وتجاري' },
          { value: 'gewerbe', label: 'عقار تجاري' },
        ],
      },
      heatingAge: {
        title: 'كم عمر نظام التدفئة؟',
        options: [
          { value: 'unter10', label: 'أحدث من 10 سنوات' },
          { value: 'zehnBis15', label: '10-15 سنة' },
          { value: 'ueber15', label: 'أكثر من 15 سنة' },
        ],
      },
      roofAge: {
        title: 'كم عمر عزل السقف؟',
        options: [
          { value: 'unter10', label: 'أحدث من 10 سنوات' },
          { value: 'zehnBis20', label: '10-20 سنة' },
          { value: 'ueber20', label: 'أكثر من 20 سنة' },
        ],
      },
      facadeAge: {
        title: 'كم عمر عزل الواجهة؟',
        subtitle: 'المقصود هو العزل الكامل للواجهة الخارجية، وليس التحديث الجزئي.',
        options: [
          { value: 'unter10', label: 'أحدث من 10 سنوات' },
          { value: 'zehnBis20', label: '10-20 سنة' },
          { value: 'ueber20', label: 'أكثر من 20 سنة' },
        ],
      },
      windowAge: {
        title: 'كم عمر النوافذ والأبواب؟',
        subtitle: 'بشكل متوسط.',
        options: [
          { value: 'unter10', label: 'أحدث من 10 سنوات' },
          { value: 'zehnBis15', label: '10-15 سنة' },
          { value: 'ueber15', label: 'أكثر من 15 سنة' },
        ],
      },
      bathroomAge: {
        title: 'كم عمر الحمامات؟',
        subtitle: 'بشكل متوسط.',
        options: [
          { value: 'unter5', label: 'أحدث من 5 سنوات' },
          { value: 'fuenfBis10', label: '5-10 سنوات' },
          { value: 'ueber10', label: 'أكثر من 10 سنوات' },
        ],
      },
      surfaceAge: {
        title: 'كم عمر الجدران والأسقف والأرضيات؟',
        subtitle: 'بشكل متوسط.',
        options: [
          { value: 'unter15', label: 'أحدث من 15 سنة' },
          { value: 'fuenfzehnBis20', label: '15-20 سنة' },
          { value: 'ueber20', label: 'أكثر من 20 سنة' },
        ],
      },
      systemsAge: {
        title: 'متى تم تحديث الكهرباء والغاز والمياه والصرف آخر مرة؟',
        options: [
          { value: 'unter15', label: 'أحدث من 15 سنة' },
          { value: 'fuenfzehnBis20', label: '15-20 سنة' },
          { value: 'ueber20', label: 'أكثر من 20 سنة' },
        ],
      },
      floorplanAge: {
        title: 'متى تم تعديل المخطط الداخلي بشكل جوهري آخر مرة؟',
        subtitle: 'مثل المطابخ المفتوحة أو الحمامات الأحدث أو توزيع داخلي أكثر عصرية.',
        options: [
          { value: '1950', label: '1950' },
          { value: '2000', label: '2000' },
          { value: '2025', label: '2025' },
        ],
      },
      address: {
        title: 'ما عنوان العقار؟',
        subtitle: 'اختياري، لكنه يساعدنا على تقديم تقييم أولي أدق.',
        placeholder: 'مثال: Bremer Platz 9-11, 48155 Münster',
        skipLabel: 'متابعة بدون عنوان',
      },
      yearBuilt: 'ما سنة بناء العقار؟',
      area: 'ما هي المساحة السكنية والاستخدامية؟',
      units: 'كم عدد الوحدات في العقار؟',
      documents: 'هل تريد رفع المستندات المتوفرة؟',
      contact: 'إلى أين نرسل التقييم الأولي؟',
      contactSubtitle: 'في النهاية نحتاج فقط إلى بيانات التواصل. سنعود إليك بكل خصوصية مع تقييم أولي والخطوات التالية المناسبة.',
    },
  },
} satisfies Record<LocaleKey, Record<string, any>>;

const propertyIcons: Record<PropertyType, IconType> = {
  wohnung: Building2,
  einfamilienhaus: House,
  mehrfamilienhaus: Building,
  wohnGeschaeftshaus: Store,
  gewerbe: Briefcase,
};

const ageLabels: Record<AgeBucket | FloorplanBucket, string> = {
  unter5: 'Neuer als 5 Jahre',
  unter10: 'Neuer als 10 Jahre',
  unter15: 'Neuer als 15 Jahre',
  fuenfBis10: '5-10 Jahre',
  zehnBis15: '10-15 Jahre',
  zehnBis20: '10-20 Jahre',
  fuenfzehnBis20: '15-20 Jahre',
  ueber10: 'Älter als 10 Jahre',
  ueber15: 'Älter als 15 Jahre',
  ueber20: 'Älter als 20 Jahre',
  '1950': '1950',
  '2000': '2000',
  '2025': '2025',
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
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

function buildSteps(content: (typeof copy)[LocaleKey]): Step[] {
  return [
    {
      id: 'propertyType',
      kind: 'choice',
      title: content.steps.propertyType.title,
      layout: 'cards',
      options: content.steps.propertyType.options.map((option: CardOption) => ({
        ...option,
        icon: propertyIcons[option.value as PropertyType],
      })),
    },
    {
      id: 'heatingAge',
      kind: 'choice',
      title: content.steps.heatingAge.title,
      layout: 'pills',
      icon: Flame,
      options: content.steps.heatingAge.options,
    },
    {
      id: 'roofAge',
      kind: 'choice',
      title: content.steps.roofAge.title,
      layout: 'pills',
      icon: House,
      options: content.steps.roofAge.options,
    },
    {
      id: 'facadeAge',
      kind: 'choice',
      title: content.steps.facadeAge.title,
      subtitle: content.steps.facadeAge.subtitle,
      layout: 'pills',
      icon: Building2,
      options: content.steps.facadeAge.options,
    },
    {
      id: 'windowAge',
      kind: 'choice',
      title: content.steps.windowAge.title,
      subtitle: content.steps.windowAge.subtitle,
      layout: 'pills',
      icon: DoorOpen,
      options: content.steps.windowAge.options,
    },
    {
      id: 'bathroomAge',
      kind: 'choice',
      title: content.steps.bathroomAge.title,
      subtitle: content.steps.bathroomAge.subtitle,
      layout: 'pills',
      icon: Bath,
      options: content.steps.bathroomAge.options,
    },
    {
      id: 'surfaceAge',
      kind: 'choice',
      title: content.steps.surfaceAge.title,
      subtitle: content.steps.surfaceAge.subtitle,
      layout: 'pills',
      icon: Sparkles,
      options: content.steps.surfaceAge.options,
    },
    {
      id: 'systemsAge',
      kind: 'choice',
      title: content.steps.systemsAge.title,
      layout: 'pills',
      icon: Wrench,
      options: content.steps.systemsAge.options,
    },
    {
      id: 'floorplanAge',
      kind: 'choice',
      title: content.steps.floorplanAge.title,
      subtitle: content.steps.floorplanAge.subtitle,
      layout: 'pills',
      icon: LayoutGrid,
      options: content.steps.floorplanAge.options,
    },
    {
      id: 'address',
      kind: 'text',
      title: content.steps.address.title,
      subtitle: content.steps.address.subtitle,
      placeholder: content.steps.address.placeholder,
      skipLabel: content.steps.address.skipLabel,
    },
    {
      id: 'yearBuilt',
      kind: 'number',
      title: content.steps.yearBuilt,
      min: 1850,
      max: new Date().getFullYear(),
      step: 1,
      icon: Hammer,
    },
    {
      id: 'area',
      kind: 'number',
      title: content.steps.area,
      min: 20,
      max: 5000,
      step: 5,
      unit: 'm²',
      icon: Ruler,
    },
    {
      id: 'units',
      kind: 'number',
      title: content.steps.units,
      min: 1,
      max: 250,
      step: 1,
      icon: Building,
    },
    {
      id: 'documents',
      kind: 'documents',
      title: content.steps.documents,
      subtitle: content.uploadHint,
      skipLabel: content.uploadSkip,
    },
    {
      id: 'contact',
      kind: 'contact',
      title: content.steps.contact,
      subtitle: content.steps.contactSubtitle,
    },
  ];
}

export default function QuickCheck() {
  const locale = useLocale();
  const localeKey: LocaleKey = locale === 'ar' ? 'ar' : locale === 'en' ? 'en' : 'de';
  const isRtl = localeKey === 'ar';
  const content = copy[localeKey];
  const steps = useMemo(() => buildSteps(content), [content]);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [contact, setContact] = useState<ContactData>(INITIAL_CONTACT);
  const [documents, setDocuments] = useState<DocumentUpload[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentStep = steps[stepIndex];
  const progress = ((stepIndex + 1) / steps.length) * 100;

  const propertyLabels = useMemo(() => {
    return Object.fromEntries(
      content.steps.propertyType.options.map((option: CardOption) => [option.value, option.label])
    ) as Record<PropertyType, string>;
  }, [content]);

  const summary = useMemo(() => {
    const label = content.labels;
    const defaults = content.defaults;

    return [
      { label: label.propertyType, value: answers.propertyType ? propertyLabels[answers.propertyType] : defaults.notProvided },
      { label: label.heatingAge, value: answers.heatingAge ? ageLabels[answers.heatingAge] : defaults.notProvided },
      { label: label.roofAge, value: answers.roofAge ? ageLabels[answers.roofAge] : defaults.notProvided },
      { label: label.facadeAge, value: answers.facadeAge ? ageLabels[answers.facadeAge] : defaults.notProvided },
      { label: label.windowAge, value: answers.windowAge ? ageLabels[answers.windowAge] : defaults.notProvided },
      { label: label.bathroomAge, value: answers.bathroomAge ? ageLabels[answers.bathroomAge] : defaults.notProvided },
      { label: label.surfaceAge, value: answers.surfaceAge ? ageLabels[answers.surfaceAge] : defaults.notProvided },
      { label: label.systemsAge, value: answers.systemsAge ? ageLabels[answers.systemsAge] : defaults.notProvided },
      { label: label.floorplanAge, value: answers.floorplanAge ? ageLabels[answers.floorplanAge] : defaults.notProvided },
      { label: label.address, value: answers.address.trim() || defaults.notProvided },
      { label: label.yearBuilt, value: String(answers.yearBuilt) },
      { label: label.area, value: `${answers.area} m²` },
      { label: label.units, value: String(answers.units) },
      {
        label: label.documents,
        value: documents.length > 0 ? `${documents.length} PDF (${formatFileSize(documents.reduce((total, item) => total + item.file.size, 0))})` : defaults.noDocuments,
      },
    ];
  }, [answers, content, documents, propertyLabels]);

  const goNext = () => {
    setError(null);
    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  };

  const goBack = () => {
    setError(null);
    setStepIndex((current) => Math.max(current - 1, 0));
  };

  const handleChoice = (stepId: ChoiceStepId, value: string) => {
    setAnswers((current) => ({ ...current, [stepId]: value }));
    window.setTimeout(goNext, 140);
  };

  const handleNumberChange = (stepId: NumberStepId, value: number, min: number, max: number) => {
    setAnswers((current) => ({
      ...current,
      [stepId]: clamp(Number.isFinite(value) ? value : min, min, max),
    }));
  };

  const handleNumberAdjust = (stepId: NumberStepId, delta: number, min: number, max: number) => {
    setAnswers((current) => ({
      ...current,
      [stepId]: clamp(current[stepId] + delta, min, max),
    }));
  };

  const handleDocumentFiles = (files: FileList | File[]) => {
    const incomingFiles = Array.from(files);

    if (incomingFiles.length === 0) {
      return;
    }

    const validFiles: DocumentUpload[] = [];
    let nextError: string | null = null;

    for (const file of incomingFiles) {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

      if (!isPdf) {
        nextError = content.errors.pdfOnly;
        continue;
      }

      if (file.size > MAX_DOCUMENT_SIZE) {
        nextError = content.errors.maxSize;
        continue;
      }

      validFiles.push({ id: createDocumentId(), file });
    }

    const nextDocuments = [...documents, ...validFiles].slice(0, MAX_DOCUMENTS);
    const totalSize = nextDocuments.reduce((total, item) => total + item.file.size, 0);

    if (documents.length + validFiles.length > MAX_DOCUMENTS) {
      nextError = content.errors.maxCount;
    }

    if (totalSize > MAX_DOCUMENT_TOTAL_SIZE) {
      setError(content.errors.maxTotal);
      return;
    }

    setDocuments(nextDocuments);
    setError(nextError);
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const firstName = contact.firstName.trim();
    const lastName = contact.lastName.trim();
    const email = contact.email.trim();
    const phone = contact.phone.trim();

    if (!firstName || !lastName || !email || !phone) {
      setError(content.errors.requiredContact);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(content.errors.invalidEmail);
      return;
    }

    if (!contact.consent) {
      setError(content.errors.missingConsent);
      return;
    }

    const formData = new FormData();
    formData.append(
      'payload',
      JSON.stringify({
        locale: localeKey,
        contact: { firstName, lastName, email, phone },
        answers,
        summary,
      })
    );

    documents.forEach((document) => formData.append('documents', document.file));

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quick-check', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error || content.errors.general);
      }

      setIsSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : content.errors.general);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="quick-check" className="relative overflow-hidden bg-transparent py-24 text-stone-900 lg:py-36">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="surface-card-strong rounded-[2rem] px-6 py-12 text-center sm:px-10 lg:px-16"
          >
            <div className="surface-chip mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full text-gold">
              <BadgeCheck size={36} strokeWidth={1.8} />
            </div>
            <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-tight text-stone-950 sm:text-5xl">
              {content.successTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-8 text-stone-600">{content.successText}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#contact" className="btn-beam-blue rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white">
                {content.toContact}
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setStepIndex(0);
                  setAnswers(INITIAL_ANSWERS);
                  setContact(INITIAL_CONTACT);
                  setDocuments([]);
                  setError(null);
                }}
                className="surface-chip rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-stone-700 transition hover:-translate-y-0.5 hover:text-gold"
              >
                {content.restart}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quick-check" className="relative overflow-hidden bg-transparent py-24 text-stone-900 lg:py-36">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-12 max-w-4xl text-center"
        >
          <div className="surface-chip mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
            <span className="h-2 w-2 rounded-full bg-gold" />
            {content.badge}
          </div>
          <h2 className="font-serif text-4xl leading-[1.05] text-stone-950 sm:text-5xl lg:text-6xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-light leading-8 text-stone-600">{content.description}</p>
        </motion.div>

        <div className="surface-card-strong overflow-hidden rounded-[2rem] p-4 sm:p-6 lg:p-9">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIndex === 0}
              className="surface-chip inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-stone-700 transition hover:-translate-y-0.5 hover:text-gold disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {content.back}
            </button>
            <div className="surface-chip rounded-full px-5 py-3 text-center text-sm font-semibold text-stone-500">
              {content.step} {stepIndex + 1} {content.of} {steps.length}
            </div>
          </div>

          <div className="mb-11">
            <div className="mx-auto h-2 w-full max-w-[360px] overflow-hidden rounded-full bg-[#dbe8f4]">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gold"
              />
            </div>
          </div>

          <div className="min-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-6xl"
              >
                <div className="mb-9 text-center">
                  <h3 className="mx-auto max-w-4xl font-serif text-3xl leading-tight text-stone-950 sm:text-4xl lg:text-5xl">
                    {currentStep.title}
                  </h3>
                  {'subtitle' in currentStep && currentStep.subtitle ? (
                    <p className="mx-auto mt-4 max-w-3xl text-base font-light leading-7 text-stone-600">{currentStep.subtitle}</p>
                  ) : null}
                </div>

                {currentStep.kind === 'choice' && currentStep.layout === 'cards' ? (
                  <div className="grid grid-cols-1 gap-4 min-[460px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                    {currentStep.options.map((option) => {
                      const Icon = option.icon;
                      const isActive = answers[currentStep.id] === option.value;

                      return (
                        <motion.button
                          key={option.value}
                          type="button"
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleChoice(currentStep.id, option.value)}
                          className={cn(
                            'group surface-card min-h-[174px] rounded-[1.55rem] p-5 text-center transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(15,23,42,0.08)]',
                            isActive && 'bg-[#edf5fb] ring-1 ring-gold/30'
                          )}
                        >
                          <div className="surface-chip mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[1.25rem] text-gold transition group-hover:-translate-y-1">
                            {Icon ? <Icon size={30} strokeWidth={1.75} /> : null}
                          </div>
                          <span className="block text-balance text-base font-semibold leading-6 text-stone-950">
                            {option.shortLabel ?? option.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                ) : null}

                {currentStep.kind === 'choice' && currentStep.layout === 'pills' ? (
                  <div className="mx-auto max-w-4xl">
                    {currentStep.icon ? (
                      <div className="surface-chip mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[1.65rem] text-gold">
                        <currentStep.icon size={38} strokeWidth={1.75} />
                      </div>
                    ) : null}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {currentStep.options.map((option) => {
                        const isActive = answers[currentStep.id] === option.value;

                        return (
                          <motion.button
                            key={option.value}
                            type="button"
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleChoice(currentStep.id, option.value)}
                            className={cn(
                              'surface-chip min-h-[58px] rounded-full px-5 py-4 text-center text-base font-semibold text-stone-700 transition hover:-translate-y-0.5 hover:text-gold',
                              isActive && 'surface-chip-active text-gold'
                            )}
                          >
                            {option.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {currentStep.kind === 'text' ? (
                  <div className="mx-auto max-w-3xl">
                    <div className="surface-chip mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-[1.65rem] text-gold">
                      <MapPin size={38} strokeWidth={1.75} />
                    </div>
                    <input
                      type="text"
                      value={answers.address}
                      onChange={(event) => setAnswers((current) => ({ ...current, address: event.target.value }))}
                      placeholder={currentStep.placeholder}
                      className="surface-card-strong mb-5 w-full rounded-[1.35rem] px-5 py-4 text-base text-stone-900 outline-none transition focus:ring-2 focus:ring-gold/20"
                    />
                    <div className="flex flex-col justify-center gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={goNext}
                        className="surface-chip rounded-full px-7 py-4 text-sm font-bold uppercase tracking-[0.13em] text-stone-700 transition hover:text-gold"
                      >
                        {currentStep.skipLabel}
                      </button>
                      <button type="button" onClick={goNext} className="btn-beam-blue rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.13em] text-white">
                        {content.next}
                      </button>
                    </div>
                  </div>
                ) : null}

                {currentStep.kind === 'number' ? (
                  <div className="mx-auto max-w-2xl text-center">
                    <div className="surface-chip mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-[1.65rem] text-gold">
                      <currentStep.icon size={38} strokeWidth={1.75} />
                    </div>
                    <div className="surface-card mx-auto mb-7 flex max-w-[520px] items-center gap-2 rounded-[1.55rem] p-2">
                      <button
                        type="button"
                        onClick={() => handleNumberAdjust(currentStep.id, -currentStep.step, currentStep.min, currentStep.max)}
                        className="surface-chip flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] text-stone-500 transition hover:text-gold"
                        aria-label="Minus"
                      >
                        <Minus size={18} />
                      </button>
                      <label className="mb-0 flex flex-1 items-center justify-center gap-2 rounded-[1.2rem] bg-white px-3 py-3">
                        <input
                          type="number"
                          value={answers[currentStep.id]}
                          min={currentStep.min}
                          max={currentStep.max}
                          step={currentStep.step}
                          onChange={(event) =>
                            handleNumberChange(currentStep.id, Number(event.target.value), currentStep.min, currentStep.max)
                          }
                          className="w-full border-0 bg-transparent p-0 text-center font-serif text-4xl text-stone-950 outline-none"
                        />
                        {currentStep.unit ? <span className="text-lg font-medium text-stone-500">{currentStep.unit}</span> : null}
                      </label>
                      <button
                        type="button"
                        onClick={() => handleNumberAdjust(currentStep.id, currentStep.step, currentStep.min, currentStep.max)}
                        className="surface-chip flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] text-stone-500 transition hover:text-gold"
                        aria-label="Plus"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <button type="button" onClick={goNext} className="btn-beam-blue rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.13em] text-white">
                      {content.next}
                    </button>
                  </div>
                ) : null}

                {currentStep.kind === 'documents' ? (
                  <div className="mx-auto max-w-4xl">
                    <div
                      tabIndex={0}
                      onDragEnter={(event) => {
                        event.preventDefault();
                        setIsDragActive(true);
                      }}
                      onDragOver={(event) => event.preventDefault()}
                      onDragLeave={() => setIsDragActive(false)}
                      onDrop={handleDocumentDrop}
                      className={cn(
                        'surface-card-strong rounded-[1.75rem] p-6 text-center transition sm:p-8',
                        isDragActive && 'bg-[#edf5fb] ring-1 ring-gold/30'
                      )}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf,.pdf"
                        multiple
                        onChange={handleDocumentInputChange}
                        className="hidden"
                      />
                      <div className="surface-chip mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.65rem] text-gold">
                        <UploadCloud size={38} strokeWidth={1.75} />
                      </div>
                      <h4 className="font-serif text-3xl text-stone-950">{content.uploadTitle}</h4>
                      <p className="mx-auto mt-3 max-w-2xl text-base font-light leading-7 text-stone-600">{content.uploadHint}</p>
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.13em] text-stone-400">{content.uploadMeta}</p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="btn-beam-blue mt-7 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.13em] text-white"
                      >
                        {content.uploadTrigger}
                      </button>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {documents.length === 0 ? (
                        <div className="surface-card rounded-[1.2rem] px-5 py-4 text-center text-sm text-stone-500">{content.uploadEmpty}</div>
                      ) : (
                        documents.map((document) => (
                          <div key={document.id} className="surface-card flex items-center justify-between gap-3 rounded-[1.2rem] px-4 py-3">
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="surface-chip flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] text-gold">
                                <FileText size={18} />
                              </div>
                              <div className="min-w-0 text-left rtl:text-right">
                                <div className="truncate text-sm font-semibold text-stone-900" title={document.file.name}>
                                  {document.file.name}
                                </div>
                                <div className="text-xs text-stone-500">{formatFileSize(document.file.size)}</div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setDocuments((current) => current.filter((item) => item.id !== document.id))}
                              className="surface-chip flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-stone-500 transition hover:text-red-600"
                              aria-label={`${document.file.name} entfernen`}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => {
                          setDocuments([]);
                          goNext();
                        }}
                        className="surface-chip rounded-full px-7 py-4 text-sm font-bold uppercase tracking-[0.13em] text-stone-700 transition hover:text-gold"
                      >
                        {currentStep.skipLabel}
                      </button>
                      <button type="button" onClick={goNext} className="btn-beam-blue rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.13em] text-white">
                        {content.next}
                      </button>
                    </div>
                  </div>
                ) : null}

                {currentStep.kind === 'contact' ? (
                  <form onSubmit={handleSubmit} className="mx-auto max-w-6xl">
                    <div className="surface-chip mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-[1.65rem] text-gold">
                      <UserRound size={38} strokeWidth={1.75} />
                    </div>
                    <p className="mx-auto mb-8 max-w-3xl text-center text-base font-light leading-7 text-stone-600">
                      {currentStep.subtitle}
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        ['firstName', content.firstName, 'Max'],
                        ['lastName', content.lastName, 'Mustermann'],
                        ['phone', content.phone, '+49 ...'],
                        ['email', content.email, 'max@beispiel.de'],
                      ].map(([key, label, placeholder]) => (
                        <label key={key} className="block">
                          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-stone-500">{label}</span>
                          <input
                            type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                            value={contact[key as keyof Omit<ContactData, 'consent'>]}
                            onChange={(event) => setContact((current) => ({ ...current, [key]: event.target.value }))}
                            placeholder={placeholder}
                            required
                            className="surface-card-strong w-full rounded-[1.2rem] px-5 py-4 text-base text-stone-900 outline-none transition focus:ring-2 focus:ring-gold/20"
                          />
                        </label>
                      ))}
                    </div>

                    <label className="surface-card mt-5 flex items-start gap-3 rounded-[1.3rem] p-5 text-sm font-light leading-7 text-stone-600">
                      <input
                        type="checkbox"
                        checked={contact.consent}
                        onChange={(event) => setContact((current) => ({ ...current, consent: event.target.checked }))}
                        required
                        className="mt-1 h-5 w-5 shrink-0 accent-gold"
                      />
                      <span>{content.consent}</span>
                    </label>

                    <div className="surface-card mt-5 rounded-[1.3rem] p-5">
                      <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.13em] text-stone-600">
                        <CheckCircle2 size={18} className="text-gold" />
                        {content.summaryTitle}
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        {summary.map((item) => (
                          <div key={item.label} className="surface-chip rounded-[1rem] px-4 py-3 text-sm">
                            <div className="font-semibold text-stone-900">{item.label}</div>
                            <div className="mt-1 text-stone-500">{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {error ? <div className="mt-5 rounded-[1.1rem] border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div> : null}

                    <div className="mt-8 flex justify-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-beam-blue rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.13em] text-white disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSubmitting ? content.sending : content.submit}
                        <ArrowRight className={cn('ml-2 inline h-4 w-4', isRtl && 'rotate-180')} />
                      </button>
                    </div>
                  </form>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          {error && currentStep.kind !== 'contact' ? (
            <div className="mx-auto mt-6 max-w-3xl rounded-[1.1rem] border border-red-100 bg-red-50 px-5 py-4 text-center text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
