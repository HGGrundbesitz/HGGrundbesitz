'use client';

import React, { FormEvent, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BadgeCheck,
  Briefcase,
  Building,
  Building2,
  Check,
  Clock3,
  DoorOpen,
  Flame,
  Hammer,
  House,
  KeyRound,
  LayoutGrid,
  MapPin,
  Minus,
  Plus,
  Ruler,
  ShieldCheck,
  Sparkles,
  Store,
  UserRound,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

type SupportedLocale = 'de' | 'en' | 'ar';
type SalutationCode = 'mr' | 'ms' | 'diverse';
type PropertyTypeCode = 'condo' | 'singleFamily' | 'multiFamily' | 'mixedUse' | 'commercial';
type AgeCode =
  | 'under10'
  | 'tenTo15'
  | 'over15'
  | 'tenTo20'
  | 'over20'
  | 'under5'
  | 'fiveTo10'
  | 'under15'
  | 'fifteenTo20';
type FloorPlanCode = '1950' | '2000' | '2025';

type ChoiceStepId =
  | 'propertyType'
  | 'heatingAge'
  | 'roofInsulationAge'
  | 'facadeInsulationAge'
  | 'windowsAge'
  | 'bathroomsAge'
  | 'surfacesAge'
  | 'systemsAge'
  | 'floorPlan';

type NumberStepId = 'yearBuilt' | 'area' | 'units';
type TextStepId = 'address';
type StepId = ChoiceStepId | NumberStepId | TextStepId | 'contact';

type Answers = {
  propertyType: PropertyTypeCode | '';
  heatingAge: AgeCode | '';
  roofInsulationAge: AgeCode | '';
  facadeInsulationAge: AgeCode | '';
  windowsAge: AgeCode | '';
  bathroomsAge: AgeCode | '';
  surfacesAge: AgeCode | '';
  systemsAge: AgeCode | '';
  floorPlan: FloorPlanCode | '';
  address: string;
  yearBuilt: number;
  area: number;
  units: number;
  salutation: SalutationCode;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  marketingOptIn: boolean;
  consent: boolean;
};

type ChoiceOption = {
  value: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
};

type ChoiceStep = {
  id: ChoiceStepId;
  kind: 'choice';
  title: string;
  subtitle?: string;
  options: ChoiceOption[];
  layout: 'cards' | 'pills';
  icon?: LucideIcon;
};

type NumberStep = {
  id: NumberStepId;
  kind: 'number';
  title: string;
  subtitle?: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
  icon: LucideIcon;
  cta: string;
};

type TextStep = {
  id: TextStepId;
  kind: 'text';
  title: string;
  subtitle?: string;
  helper: string;
  formatHint: string;
  placeholder: string;
  icon: LucideIcon;
  optional: boolean;
  skipLabel: string;
  cta: string;
};

type ContactStep = {
  id: 'contact';
  kind: 'contact';
  title: string;
  subtitle?: string;
  cta: string;
};

type StepDefinition = ChoiceStep | NumberStep | TextStep | ContactStep;

type LocaleCopy = {
  sectionEyebrow: string;
  sectionTitle: string;
  sectionDescription: string;
  progressLabel: string;
  progressCount: string;
  backLabel: string;
  optionalLabel: string;
  autoAdvanceHint: string;
  benefits: string[];
  trustBadges: string[];
  ratingLabel: string;
  ratingValue: string;
  ratingStars: string;
  contact: {
    title: string;
    subtitle: string;
    salutation: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    marketing: string;
    consent: string;
    privacy: string;
    requiredHint: string;
  };
  salutationOptions: Record<SalutationCode, string>;
  validation: {
    required: string;
    invalidEmail: string;
    consent: string;
  };
  submitError: string;
  successTitle: string;
  successDescription: string;
  successBadge: string;
  successSummaryTitle: string;
  successCta: string;
  summaryIntro: string;
  summaryEmptyAddress: string;
  summaryYes: string;
  summaryNo: string;
  steps: {
    propertyType: {
      title: string;
      options: Record<PropertyTypeCode, string>;
    };
    heatingAge: {
      title: string;
      options: Record<'under10' | 'tenTo15' | 'over15', string>;
    };
    roofInsulationAge: {
      title: string;
      options: Record<'under10' | 'tenTo20' | 'over20', string>;
    };
    facadeInsulationAge: {
      title: string;
      subtitle: string;
      options: Record<'under10' | 'tenTo20' | 'over20', string>;
    };
    windowsAge: {
      title: string;
      subtitle: string;
      options: Record<'under10' | 'tenTo15' | 'over15', string>;
    };
    bathroomsAge: {
      title: string;
      subtitle: string;
      options: Record<'under5' | 'fiveTo10' | 'over10', string>;
    };
    surfacesAge: {
      title: string;
      subtitle: string;
      options: Record<'under15' | 'fifteenTo20' | 'over20', string>;
    };
    systemsAge: {
      title: string;
      options: Record<'under15' | 'fifteenTo20' | 'over20', string>;
    };
    floorPlan: {
      title: string;
      subtitle: string;
      options: Record<FloorPlanCode, string>;
    };
    address: {
      title: string;
      subtitle: string;
      helper: string;
      formatHint: string;
      placeholder: string;
      skipLabel: string;
      cta: string;
    };
    yearBuilt: {
      title: string;
      cta: string;
    };
    area: {
      title: string;
      cta: string;
    };
    units: {
      title: string;
      cta: string;
    };
    contact: {
      title: string;
      subtitle: string;
      cta: string;
    };
  };
};

const INITIAL_ANSWERS: Answers = {
  propertyType: '',
  heatingAge: '',
  roofInsulationAge: '',
  facadeInsulationAge: '',
  windowsAge: '',
  bathroomsAge: '',
  surfacesAge: '',
  systemsAge: '',
  floorPlan: '',
  address: '',
  yearBuilt: 1978,
  area: 225,
  units: 1,
  salutation: 'mr',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  marketingOptIn: false,
  consent: false,
};

const QUESTION_ICONS: Record<Exclude<StepId, 'contact' | 'propertyType'>, LucideIcon> = {
  heatingAge: Flame,
  roofInsulationAge: House,
  facadeInsulationAge: Building2,
  windowsAge: DoorOpen,
  bathroomsAge: Bath,
  surfacesAge: Sparkles,
  systemsAge: Wrench,
  floorPlan: LayoutGrid,
  address: MapPin,
  yearBuilt: Hammer,
  area: Ruler,
  units: KeyRound,
};

const PROPERTY_TYPE_ICONS: Record<PropertyTypeCode, LucideIcon> = {
  condo: Building2,
  singleFamily: House,
  multiFamily: Building,
  mixedUse: Store,
  commercial: Briefcase,
};

const COPY: Record<SupportedLocale, LocaleCopy> = {
  de: {
    sectionEyebrow: 'Schnelle Ersteinschätzung',
    sectionTitle: 'Restnutzungsdauer digital vorsortieren',
    sectionDescription:
      'Wir führen Interessenten in wenigen Schritten durch die wichtigsten Objektfragen. Gleicher Inhalt wie im klassischen Schnellcheck, aber in einer ruhigeren Oberfläche, passend zum Look der Seite.',
    progressLabel: 'Fortschritt',
    progressCount: 'Schritt',
    backLabel: 'Zurück',
    optionalLabel: 'Optional',
    autoAdvanceHint: 'Ein Klick bringt Sie direkt zum nächsten Schritt.',
    benefits: [
      '100% kostenlos & unverbindlich',
      'In rund 2 Minuten ausgefüllt',
      'Ersteinschätzung direkt digital vorbereitet',
    ],
    trustBadges: ['TÜV-orientierte Prüfung', 'Diskrete Vorqualifizierung', 'Für Eigentümer & Investoren'],
    ratingLabel: 'Google Bewertungen',
    ratingValue: '4.9 Sterne',
    ratingStars: '★★★★★',
    contact: {
      title: 'Wohin dürfen wir das Ergebnis senden?',
      subtitle:
        'Zum Abschluss brauchen wir nur Ihre Kontaktdaten. So können wir die Ersteinschätzung passend aufbereiten und uns bei Rückfragen direkt melden.',
      salutation: 'Anrede',
      firstName: 'Vorname',
      lastName: 'Nachname',
      phone: 'Telefonnummer',
      email: 'E-Mail',
      marketing:
        'Ich möchte gelegentlich exklusive Hinweise zu Investmentchancen und Marktupdates erhalten.',
      consent:
        'Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.',
      privacy: 'Pflichtfeld',
      requiredHint: 'Bitte füllen Sie alle Pflichtfelder aus.',
    },
    salutationOptions: {
      mr: 'Herr',
      ms: 'Frau',
      diverse: 'Divers',
    },
    validation: {
      required: 'Bitte füllen Sie die markierten Felder aus.',
      invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      consent: 'Bitte bestätigen Sie die Datenschutzhinweise.',
    },
    submitError: 'Die Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es in einem Moment erneut.',
    successTitle: 'Vielen Dank. Ihre Ersteinschätzung ist unterwegs.',
    successDescription:
      'Wir haben den Schnellcheck erhalten und melden uns mit einer fundierten ersten Einschätzung direkt an die angegebene E-Mail-Adresse.',
    successBadge: 'Anfrage gesendet',
    successSummaryTitle: 'Übermittelte Angaben',
    successCta: 'Weitere Immobilie prüfen',
    summaryIntro: 'Anfrage aus dem digitalen Restnutzungsdauer-Schnellcheck.',
    summaryEmptyAddress: 'Nicht angegeben',
    summaryYes: 'Ja',
    summaryNo: 'Nein',
    steps: {
      propertyType: {
        title: 'Um welche Immobilienart handelt es sich?',
        options: {
          condo: 'Eigentumswohnung',
          singleFamily: 'Einfamilienhaus',
          multiFamily: 'Mehrfamilienhaus',
          mixedUse: 'Wohn- & Geschäftshaus',
          commercial: 'Gewerbeobjekt',
        },
      },
      heatingAge: {
        title: 'Wie alt ist die Heizungsanlage?',
        options: {
          under10: 'Neuer als 10 Jahre',
          tenTo15: '10-15 Jahre',
          over15: 'Älter als 15 Jahre',
        },
      },
      roofInsulationAge: {
        title: 'Wie alt ist die Dämmung des Daches?',
        options: {
          under10: 'Neuer als 10 Jahre',
          tenTo20: '10-20 Jahre',
          over20: 'Älter als 20 Jahre',
        },
      },
      facadeInsulationAge: {
        title: 'Wie alt ist die Dämmung der Fassade?',
        subtitle: '(Nur vollständige Wärmedämmung der Außenwände, keine Teilmodernisierung)',
        options: {
          under10: 'Neuer als 10 Jahre',
          tenTo20: '10-20 Jahre',
          over20: 'Älter als 20 Jahre',
        },
      },
      windowsAge: {
        title: 'Wie alt sind die Fenster und Türen?',
        subtitle: '(Im Durchschnitt)',
        options: {
          under10: 'Neuer als 10 Jahre',
          tenTo15: '10-15 Jahre',
          over15: 'Älter als 15 Jahre',
        },
      },
      bathroomsAge: {
        title: 'Wie alt sind die Bäder?',
        subtitle: '(Im Durchschnitt)',
        options: {
          under5: 'Neuer als 5 Jahre',
          fiveTo10: '5-10 Jahre',
          over10: 'Älter als 10 Jahre',
        },
      },
      surfacesAge: {
        title: 'Wie alt sind Wände, Decken und Fußböden?',
        subtitle: '(Im Durchschnitt)',
        options: {
          under15: 'Neuer als 15 Jahre',
          fifteenTo20: '15-20 Jahre',
          over20: 'Älter als 20 Jahre',
        },
      },
      systemsAge: {
        title: 'Hat eine Modernisierung der Leitungssysteme stattgefunden?',
        options: {
          under15: 'Neuer als 15 Jahre',
          fifteenTo20: '15-20 Jahre',
          over20: 'Älter als 20 Jahre',
        },
      },
      floorPlan: {
        title: 'Wann wurde der Grundriss zuletzt wesentlich verändert?',
        subtitle:
          'Moderne Grundrisse berücksichtigen offene Küchen, größere Bäder und eine gute Anpassung an den lokalen Mietmarkt. Wählen Sie das nächstliegende Jahr.',
        options: {
          '1950': '1950',
          '2000': '2000',
          '2025': '2025',
        },
      },
      address: {
        title: 'Wie lautet die Adresse Ihrer vermieteten Immobilie?',
        subtitle:
          'Mit der Adresse können wir öffentliche Datenquellen besser einordnen und die Ersteinschätzung schärfen.',
        helper:
          'Bitte geben Sie die Adresse im Format Straßenname Hausnummer, Postleitzahl Ort ein.',
        formatHint: 'Optional, aber hilfreich für eine präzisere Einordnung.',
        placeholder: 'z. B. Weinbergstraße 45, 50667 Köln',
        skipLabel: 'Weiter ohne Adresse',
        cta: 'Weiter',
      },
      yearBuilt: {
        title: 'Wie lautet das Baujahr des Objekts?',
        cta: 'Weiter',
      },
      area: {
        title: 'Welche Wohn- und Nutzfläche hat das Objekt?',
        cta: 'Weiter',
      },
      units: {
        title: 'Wieviele Nutzungseinheiten hat die Immobilie?',
        cta: 'Weiter',
      },
      contact: {
        title: 'An welche E-Mail-Adresse dürfen wir das Ergebnis schicken?',
        subtitle:
          'Ihre Angaben bleiben diskret. Wir nutzen die Daten ausschließlich für die Bearbeitung Ihrer Anfrage.',
        cta: 'Ersteinschätzung anfragen',
      },
    },
  },
  en: {
    sectionEyebrow: 'Quick first assessment',
    sectionTitle: 'Pre-qualify remaining useful life digitally',
    sectionDescription:
      'We guide interested owners through the key property questions in a few calm steps. Same core questions as the classic checker, redesigned to match this site.',
    progressLabel: 'Progress',
    progressCount: 'Step',
    backLabel: 'Back',
    optionalLabel: 'Optional',
    autoAdvanceHint: 'One click takes you straight to the next step.',
    benefits: [
      '100% free and without obligation',
      'Takes around 2 minutes',
      'Prepared digitally for a first assessment',
    ],
    trustBadges: ['TÜV-oriented review', 'Discreet pre-qualification', 'For owners & investors'],
    ratingLabel: 'Google reviews',
    ratingValue: '4.9 stars',
    ratingStars: '★★★★★',
    contact: {
      title: 'Where should we send the result?',
      subtitle:
        'For the last step we only need your contact details so we can prepare the assessment and reach out if we have any follow-up questions.',
      salutation: 'Salutation',
      firstName: 'First name',
      lastName: 'Last name',
      phone: 'Phone number',
      email: 'Email',
      marketing:
        'I would like to occasionally receive selected market updates and investment insights.',
      consent:
        'I have read the privacy notice and agree to the processing of my information for this inquiry.',
      privacy: 'Required',
      requiredHint: 'Please complete all required fields.',
    },
    salutationOptions: {
      mr: 'Mr',
      ms: 'Ms',
      diverse: 'Diverse',
    },
    validation: {
      required: 'Please complete the required fields.',
      invalidEmail: 'Please enter a valid email address.',
      consent: 'Please confirm the privacy notice.',
    },
    submitError: 'We could not send your request right now. Please try again in a moment.',
    successTitle: 'Thank you. Your first assessment is on the way.',
    successDescription:
      'We received your quick check and will follow up with a considered first assessment via the email address you provided.',
    successBadge: 'Request sent',
    successSummaryTitle: 'Submitted information',
    successCta: 'Check another property',
    summaryIntro: 'Request submitted from the digital remaining useful life quick check.',
    summaryEmptyAddress: 'Not provided',
    summaryYes: 'Yes',
    summaryNo: 'No',
    steps: {
      propertyType: {
        title: 'What type of property is it?',
        options: {
          condo: 'Condominium',
          singleFamily: 'Single-family house',
          multiFamily: 'Multi-family house',
          mixedUse: 'Mixed-use building',
          commercial: 'Commercial property',
        },
      },
      heatingAge: {
        title: 'How old is the heating system?',
        options: {
          under10: 'Less than 10 years',
          tenTo15: '10-15 years',
          over15: 'More than 15 years',
        },
      },
      roofInsulationAge: {
        title: 'How old is the roof insulation?',
        options: {
          under10: 'Less than 10 years',
          tenTo20: '10-20 years',
          over20: 'More than 20 years',
        },
      },
      facadeInsulationAge: {
        title: 'How old is the facade insulation?',
        subtitle: '(Only full insulation of the exterior walls, no partial modernization)',
        options: {
          under10: 'Less than 10 years',
          tenTo20: '10-20 years',
          over20: 'More than 20 years',
        },
      },
      windowsAge: {
        title: 'How old are the windows and doors?',
        subtitle: '(On average)',
        options: {
          under10: 'Less than 10 years',
          tenTo15: '10-15 years',
          over15: 'More than 15 years',
        },
      },
      bathroomsAge: {
        title: 'How old are the bathrooms?',
        subtitle: '(On average)',
        options: {
          under5: 'Less than 5 years',
          fiveTo10: '5-10 years',
          over10: 'More than 10 years',
        },
      },
      surfacesAge: {
        title: 'How old are the walls, ceilings and floors?',
        subtitle: '(On average)',
        options: {
          under15: 'Less than 15 years',
          fifteenTo20: '15-20 years',
          over20: 'More than 20 years',
        },
      },
      systemsAge: {
        title: 'Have the utility systems been modernized?',
        options: {
          under15: 'Less than 15 years',
          fifteenTo20: '15-20 years',
          over20: 'More than 20 years',
        },
      },
      floorPlan: {
        title: 'When was the floor plan last substantially modernized?',
        subtitle:
          'Modern layouts usually include larger bathrooms, open kitchens and a stronger fit with current tenant expectations. Choose the closest year.',
        options: {
          '1950': '1950',
          '2000': '2000',
          '2025': '2025',
        },
      },
      address: {
        title: 'What is the address of the rented property?',
        subtitle:
          'The address helps us interpret public data more accurately and sharpen the first assessment.',
        helper: 'Please use the format street, house number, postal code, city.',
        formatHint: 'Optional, but useful for a more precise assessment.',
        placeholder: 'e.g. Weinbergstrasse 45, 50667 Cologne',
        skipLabel: 'Continue without address',
        cta: 'Continue',
      },
      yearBuilt: {
        title: 'What is the construction year of the property?',
        cta: 'Continue',
      },
      area: {
        title: 'What is the living and usable area of the property?',
        cta: 'Continue',
      },
      units: {
        title: 'How many usage units does the property have?',
        cta: 'Continue',
      },
      contact: {
        title: 'Which email address should receive the result?',
        subtitle:
          'Your data stays private. We only use it to process your request and follow up with the initial assessment.',
        cta: 'Request assessment',
      },
    },
  },
  ar: {
    sectionEyebrow: 'تقييم أولي سريع',
    sectionTitle: 'ترتيب العمر الاقتصادي المتبقي رقمياً',
    sectionDescription:
      'نقود المالك خلال أهم أسئلة العقار في خطوات هادئة وسريعة. نفس الفكرة الأساسية، لكن بتصميم أنعم ويلائم شكل الموقع الحالي.',
    progressLabel: 'التقدم',
    progressCount: 'الخطوة',
    backLabel: 'رجوع',
    optionalLabel: 'اختياري',
    autoAdvanceHint: 'اختيار واحد ينقلك مباشرة إلى الخطوة التالية.',
    benefits: [
      'مجاني بالكامل وبدون التزام',
      'يستغرق حوالي دقيقتين',
      'تجهيز رقمي للتقييم الأولي',
    ],
    trustBadges: ['مراجعة مهنية دقيقة', 'تأهيل أولي سري', 'مناسب للملاك والمستثمرين'],
    ratingLabel: 'تقييمات Google',
    ratingValue: '4.9 نجوم',
    ratingStars: '★★★★★',
    contact: {
      title: 'إلى أي بريد إلكتروني نرسل النتيجة؟',
      subtitle:
        'في الخطوة الأخيرة نحتاج فقط إلى بيانات التواصل حتى نرسل التقييم الأولي ونتواصل معك عند الحاجة.',
      salutation: 'اللقب',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      phone: 'رقم الهاتف',
      email: 'البريد الإلكتروني',
      marketing: 'أرغب في تلقي تحديثات مختارة حول السوق والفرص الاستثمارية من حين لآخر.',
      consent: 'لقد قرأت إشعار الخصوصية وأوافق على معالجة بياناتي من أجل هذه الاستفسار.',
      privacy: 'حقل مطلوب',
      requiredHint: 'يرجى تعبئة جميع الحقول المطلوبة.',
    },
    salutationOptions: {
      mr: 'السيد',
      ms: 'السيدة',
      diverse: 'أخرى',
    },
    validation: {
      required: 'يرجى تعبئة الحقول المطلوبة.',
      invalidEmail: 'يرجى إدخال بريد إلكتروني صالح.',
      consent: 'يرجى تأكيد إشعار الخصوصية.',
    },
    submitError: 'تعذر إرسال الطلب حالياً. يرجى المحاولة مرة أخرى بعد قليل.',
    successTitle: 'شكراً لك. التقييم الأولي في الطريق.',
    successDescription:
      'لقد استلمنا بيانات الفحص السريع وسنرسل لك تقييماً أولياً مدروساً إلى البريد الإلكتروني الذي أدخلته.',
    successBadge: 'تم إرسال الطلب',
    successSummaryTitle: 'البيانات المرسلة',
    successCta: 'فحص عقار آخر',
    summaryIntro: 'طلب وارد من الفحص الرقمي السريع للعمر الاقتصادي المتبقي.',
    summaryEmptyAddress: 'غير مذكور',
    summaryYes: 'نعم',
    summaryNo: 'لا',
    steps: {
      propertyType: {
        title: 'ما نوع العقار؟',
        options: {
          condo: 'شقة تمليك',
          singleFamily: 'منزل لعائلة واحدة',
          multiFamily: 'مبنى متعدد الوحدات',
          mixedUse: 'سكني وتجاري',
          commercial: 'عقار تجاري',
        },
      },
      heatingAge: {
        title: 'كم عمر نظام التدفئة؟',
        options: {
          under10: 'أقل من 10 سنوات',
          tenTo15: '10-15 سنة',
          over15: 'أكثر من 15 سنة',
        },
      },
      roofInsulationAge: {
        title: 'كم عمر عزل السقف؟',
        options: {
          under10: 'أقل من 10 سنوات',
          tenTo20: '10-20 سنة',
          over20: 'أكثر من 20 سنة',
        },
      },
      facadeInsulationAge: {
        title: 'كم عمر عزل الواجهة؟',
        subtitle: '(فقط العزل الكامل للجدران الخارجية وليس التحديث الجزئي)',
        options: {
          under10: 'أقل من 10 سنوات',
          tenTo20: '10-20 سنة',
          over20: 'أكثر من 20 سنة',
        },
      },
      windowsAge: {
        title: 'كم عمر النوافذ والأبواب؟',
        subtitle: '(بشكل متوسط)',
        options: {
          under10: 'أقل من 10 سنوات',
          tenTo15: '10-15 سنة',
          over15: 'أكثر من 15 سنة',
        },
      },
      bathroomsAge: {
        title: 'كم عمر الحمامات؟',
        subtitle: '(بشكل متوسط)',
        options: {
          under5: 'أقل من 5 سنوات',
          fiveTo10: '5-10 سنوات',
          over10: 'أكثر من 10 سنوات',
        },
      },
      surfacesAge: {
        title: 'كم عمر الجدران والأسقف والأرضيات؟',
        subtitle: '(بشكل متوسط)',
        options: {
          under15: 'أقل من 15 سنة',
          fifteenTo20: '15-20 سنة',
          over20: 'أكثر من 20 سنة',
        },
      },
      systemsAge: {
        title: 'هل تم تحديث أنظمة التمديدات والخدمات؟',
        options: {
          under15: 'أقل من 15 سنة',
          fifteenTo20: '15-20 سنة',
          over20: 'أكثر من 20 سنة',
        },
      },
      floorPlan: {
        title: 'متى تم تعديل مخطط العقار بشكل جوهري آخر مرة؟',
        subtitle:
          'المخططات الحديثة تراعي المطابخ المفتوحة والحمامات الأوسع واحتياجات سوق الإيجار الحالية. اختر أقرب سنة.',
        options: {
          '1950': '1950',
          '2000': '2000',
          '2025': '2025',
        },
      },
      address: {
        title: 'ما عنوان العقار المؤجر؟',
        subtitle:
          'يساعدنا العنوان على قراءة البيانات العامة بشكل أدق وتحسين التقييم الأولي.',
        helper: 'يرجى إدخال العنوان بصيغة الشارع، الرقم، الرمز البريدي، المدينة.',
        formatHint: 'اختياري لكنه مفيد لتقييم أدق.',
        placeholder: 'مثال: Weinbergstrasse 45, 50667 Cologne',
        skipLabel: 'المتابعة بدون عنوان',
        cta: 'متابعة',
      },
      yearBuilt: {
        title: 'ما سنة بناء العقار؟',
        cta: 'متابعة',
      },
      area: {
        title: 'ما مساحة السكن والاستخدام للعقار؟',
        cta: 'متابعة',
      },
      units: {
        title: 'كم عدد الوحدات في العقار؟',
        cta: 'متابعة',
      },
      contact: {
        title: 'إلى أي بريد إلكتروني نرسل النتيجة؟',
        subtitle: 'ستبقى بياناتك خاصة ونستخدمها فقط لمعالجة الطلب وإرسال التقييم الأولي.',
        cta: 'طلب التقييم الأولي',
      },
    },
  },
};

function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function buildSteps(copy: LocaleCopy): StepDefinition[] {
  return [
    {
      id: 'propertyType',
      kind: 'choice',
      title: copy.steps.propertyType.title,
      options: [
        { value: 'condo', label: copy.steps.propertyType.options.condo, icon: PROPERTY_TYPE_ICONS.condo },
        { value: 'singleFamily', label: copy.steps.propertyType.options.singleFamily, icon: PROPERTY_TYPE_ICONS.singleFamily },
        { value: 'multiFamily', label: copy.steps.propertyType.options.multiFamily, icon: PROPERTY_TYPE_ICONS.multiFamily },
        { value: 'mixedUse', label: copy.steps.propertyType.options.mixedUse, icon: PROPERTY_TYPE_ICONS.mixedUse },
        { value: 'commercial', label: copy.steps.propertyType.options.commercial, icon: PROPERTY_TYPE_ICONS.commercial },
      ],
      layout: 'cards',
    },
    {
      id: 'heatingAge',
      kind: 'choice',
      title: copy.steps.heatingAge.title,
      options: [
        { value: 'under10', label: copy.steps.heatingAge.options.under10 },
        { value: 'tenTo15', label: copy.steps.heatingAge.options.tenTo15 },
        { value: 'over15', label: copy.steps.heatingAge.options.over15 },
      ],
      layout: 'pills',
      icon: QUESTION_ICONS.heatingAge,
    },
    {
      id: 'roofInsulationAge',
      kind: 'choice',
      title: copy.steps.roofInsulationAge.title,
      options: [
        { value: 'under10', label: copy.steps.roofInsulationAge.options.under10 },
        { value: 'tenTo20', label: copy.steps.roofInsulationAge.options.tenTo20 },
        { value: 'over20', label: copy.steps.roofInsulationAge.options.over20 },
      ],
      layout: 'pills',
      icon: QUESTION_ICONS.roofInsulationAge,
    },
    {
      id: 'facadeInsulationAge',
      kind: 'choice',
      title: copy.steps.facadeInsulationAge.title,
      subtitle: copy.steps.facadeInsulationAge.subtitle,
      options: [
        { value: 'under10', label: copy.steps.facadeInsulationAge.options.under10 },
        { value: 'tenTo20', label: copy.steps.facadeInsulationAge.options.tenTo20 },
        { value: 'over20', label: copy.steps.facadeInsulationAge.options.over20 },
      ],
      layout: 'pills',
      icon: QUESTION_ICONS.facadeInsulationAge,
    },
    {
      id: 'windowsAge',
      kind: 'choice',
      title: copy.steps.windowsAge.title,
      subtitle: copy.steps.windowsAge.subtitle,
      options: [
        { value: 'under10', label: copy.steps.windowsAge.options.under10 },
        { value: 'tenTo15', label: copy.steps.windowsAge.options.tenTo15 },
        { value: 'over15', label: copy.steps.windowsAge.options.over15 },
      ],
      layout: 'pills',
      icon: QUESTION_ICONS.windowsAge,
    },
    {
      id: 'bathroomsAge',
      kind: 'choice',
      title: copy.steps.bathroomsAge.title,
      subtitle: copy.steps.bathroomsAge.subtitle,
      options: [
        { value: 'under5', label: copy.steps.bathroomsAge.options.under5 },
        { value: 'fiveTo10', label: copy.steps.bathroomsAge.options.fiveTo10 },
        { value: 'over10', label: copy.steps.bathroomsAge.options.over10 },
      ],
      layout: 'pills',
      icon: QUESTION_ICONS.bathroomsAge,
    },
    {
      id: 'surfacesAge',
      kind: 'choice',
      title: copy.steps.surfacesAge.title,
      subtitle: copy.steps.surfacesAge.subtitle,
      options: [
        { value: 'under15', label: copy.steps.surfacesAge.options.under15 },
        { value: 'fifteenTo20', label: copy.steps.surfacesAge.options.fifteenTo20 },
        { value: 'over20', label: copy.steps.surfacesAge.options.over20 },
      ],
      layout: 'pills',
      icon: QUESTION_ICONS.surfacesAge,
    },
    {
      id: 'systemsAge',
      kind: 'choice',
      title: copy.steps.systemsAge.title,
      options: [
        { value: 'under15', label: copy.steps.systemsAge.options.under15 },
        { value: 'fifteenTo20', label: copy.steps.systemsAge.options.fifteenTo20 },
        { value: 'over20', label: copy.steps.systemsAge.options.over20 },
      ],
      layout: 'pills',
      icon: QUESTION_ICONS.systemsAge,
    },
    {
      id: 'floorPlan',
      kind: 'choice',
      title: copy.steps.floorPlan.title,
      subtitle: copy.steps.floorPlan.subtitle,
      options: [
        { value: '1950', label: copy.steps.floorPlan.options['1950'] },
        { value: '2000', label: copy.steps.floorPlan.options['2000'] },
        { value: '2025', label: copy.steps.floorPlan.options['2025'] },
      ],
      layout: 'pills',
      icon: QUESTION_ICONS.floorPlan,
    },
    {
      id: 'address',
      kind: 'text',
      title: copy.steps.address.title,
      subtitle: copy.steps.address.subtitle,
      helper: copy.steps.address.helper,
      formatHint: copy.steps.address.formatHint,
      placeholder: copy.steps.address.placeholder,
      icon: QUESTION_ICONS.address,
      optional: true,
      skipLabel: copy.steps.address.skipLabel,
      cta: copy.steps.address.cta,
    },
    {
      id: 'yearBuilt',
      kind: 'number',
      title: copy.steps.yearBuilt.title,
      min: 1850,
      max: new Date().getFullYear(),
      step: 1,
      icon: QUESTION_ICONS.yearBuilt,
      cta: copy.steps.yearBuilt.cta,
    },
    {
      id: 'area',
      kind: 'number',
      title: copy.steps.area.title,
      min: 25,
      max: 5000,
      step: 5,
      unit: 'm²',
      icon: QUESTION_ICONS.area,
      cta: copy.steps.area.cta,
    },
    {
      id: 'units',
      kind: 'number',
      title: copy.steps.units.title,
      min: 1,
      max: 250,
      step: 1,
      icon: QUESTION_ICONS.units,
      cta: copy.steps.units.cta,
    },
    {
      id: 'contact',
      kind: 'contact',
      title: copy.steps.contact.title,
      subtitle: copy.steps.contact.subtitle,
      cta: copy.steps.contact.cta,
    },
  ];
}

const QuickCheck: React.FC = () => {
  const currentLocale = useLocale();
  const locale: SupportedLocale = currentLocale === 'en' || currentLocale === 'ar' ? currentLocale : 'de';
  const isRtl = locale === 'ar';
  const copy = COPY[locale];
  const steps = buildSteps(copy);

  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const currentStep = steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const findChoiceLabel = (stepId: ChoiceStepId, value: string) => {
    const step = steps.find((item) => item.id === stepId);
    if (!step || step.kind !== 'choice') {
      return value;
    }
    return step.options.find((option) => option.value === value)?.label ?? value;
  };

  const buildSummaryMessage = () => {
    const details = [
      [copy.steps.propertyType.title, answers.propertyType ? findChoiceLabel('propertyType', answers.propertyType) : ''],
      [copy.steps.heatingAge.title, answers.heatingAge ? findChoiceLabel('heatingAge', answers.heatingAge) : ''],
      [copy.steps.roofInsulationAge.title, answers.roofInsulationAge ? findChoiceLabel('roofInsulationAge', answers.roofInsulationAge) : ''],
      [copy.steps.facadeInsulationAge.title, answers.facadeInsulationAge ? findChoiceLabel('facadeInsulationAge', answers.facadeInsulationAge) : ''],
      [copy.steps.windowsAge.title, answers.windowsAge ? findChoiceLabel('windowsAge', answers.windowsAge) : ''],
      [copy.steps.bathroomsAge.title, answers.bathroomsAge ? findChoiceLabel('bathroomsAge', answers.bathroomsAge) : ''],
      [copy.steps.surfacesAge.title, answers.surfacesAge ? findChoiceLabel('surfacesAge', answers.surfacesAge) : ''],
      [copy.steps.systemsAge.title, answers.systemsAge ? findChoiceLabel('systemsAge', answers.systemsAge) : ''],
      [copy.steps.floorPlan.title, answers.floorPlan ? findChoiceLabel('floorPlan', answers.floorPlan) : ''],
      [copy.steps.address.title, answers.address.trim() || copy.summaryEmptyAddress],
      [copy.steps.yearBuilt.title, String(answers.yearBuilt)],
      [copy.steps.area.title, `${answers.area} m²`],
      [copy.steps.units.title, String(answers.units)],
      [copy.contact.marketing, answers.marketingOptIn ? copy.summaryYes : copy.summaryNo],
      [copy.contact.consent, answers.consent ? copy.summaryYes : copy.summaryNo],
    ];

    return [copy.summaryIntro, '', ...details.map(([label, value]) => `${label}: ${value}`)].join('\n');
  };

  const goNext = () => {
    setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1));
  };

  const goBack = () => {
    setError('');
    setCurrentStepIndex((index) => Math.max(index - 1, 0));
  };

  const handleChoiceSelect = (stepId: ChoiceStepId, value: string) => {
    setAnswers((current) => ({ ...current, [stepId]: value }));
    setError('');
    window.setTimeout(() => {
      setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1));
    }, 180);
  };

  const handleNumberChange = (stepId: NumberStepId, nextValue: number, min: number, max: number) => {
    const safeValue = clampNumber(Number.isFinite(nextValue) ? nextValue : min, min, max);
    setAnswers((current) => ({ ...current, [stepId]: safeValue }));
    setError('');
  };

  const handleNumberAdjust = (stepId: NumberStepId, min: number, max: number, delta: number) => {
    setAnswers((current) => ({
      ...current,
      [stepId]: clampNumber(current[stepId] + delta, min, max),
    }));
    setError('');
  };

  const handleContinue = () => {
    if (currentStep.kind === 'number') {
      goNext();
      return;
    }

    if (currentStep.kind === 'text') {
      goNext();
    }
  };

  const validateContactStep = () => {
    if (!answers.firstName.trim() || !answers.lastName.trim() || !answers.phone.trim() || !answers.email.trim()) {
      setError(copy.validation.required);
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(answers.email.trim())) {
      setError(copy.validation.invalidEmail);
      return false;
    }

    if (!answers.consent) {
      setError(copy.validation.consent);
      return false;
    }

    return true;
  };

  const resetWizard = () => {
    setAnswers(INITIAL_ANSWERS);
    setCurrentStepIndex(0);
    setSubmitted(false);
    setSubmitting(false);
    setError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateContactStep()) {
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${answers.firstName.trim()} ${answers.lastName.trim()}`.trim(),
          email: answers.email.trim(),
          phone: answers.phone.trim(),
          message: buildSummaryMessage(),
          honeypot: '',
        }),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(data?.error || copy.submitError);
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      setSubmitting(false);
    } catch {
      setError(copy.submitError);
      setSubmitting(false);
    }
  };

  const renderChoiceStep = (step: ChoiceStep) => {
    if (step.layout === 'cards') {
      return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {step.options.map((option) => {
            const Icon = option.icon;
            const isActive = answers[step.id] === option.value;

            return (
              <motion.button
                key={option.value}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoiceSelect(step.id, option.value)}
                className={cn(
                  'group relative overflow-hidden rounded-[1.75rem] p-[1px] text-left transition-all duration-300',
                  isActive
                    ? 'bg-gradient-to-br from-[#1C6AA8] via-[#7EB4DD] to-[#d8e8f7] shadow-[0_18px_44px_rgba(28,106,168,0.18)]'
                    : 'bg-[linear-gradient(180deg,rgba(28,106,168,0.08),rgba(255,255,255,0.76))] hover:shadow-[0_18px_40px_rgba(148,163,184,0.12)]'
                )}
              >
                <div
                  className={cn(
                    'surface-card-strong flex h-full min-h-[12.5rem] flex-col items-start justify-between rounded-[calc(1.75rem-1px)] px-5 py-6 transition-all duration-300',
                    isActive ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,248,255,0.96))]' : 'bg-white/94'
                  )}
                >
                  <div
                    className={cn(
                      'surface-chip flex h-14 w-14 items-center justify-center rounded-[1.1rem] transition-all duration-300',
                      isActive ? 'border-[#7EB4DD]/50 bg-[#edf5fb] text-[#1C6AA8]' : 'bg-white text-stone-500 group-hover:text-[#1C6AA8]'
                    )}
                  >
                    {Icon ? <Icon className="h-7 w-7" /> : null}
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-semibold leading-snug text-stone-900">{option.label}</p>
                    {option.description ? (
                      <p className="text-sm leading-relaxed text-stone-500">{option.description}</p>
                    ) : null}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      );
    }

    const StepIcon = step.icon;

    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        {StepIcon ? (
          <div className="surface-chip mb-8 flex h-20 w-20 items-center justify-center rounded-[1.8rem] bg-white text-[#1C6AA8] shadow-[0_18px_38px_rgba(15,23,42,0.05)]">
            <StepIcon className="h-10 w-10" />
          </div>
        ) : null}
        <div className="grid w-full gap-3 sm:grid-cols-3">
          {step.options.map((option) => {
            const isActive = answers[step.id] === option.value;

            return (
              <motion.button
                key={option.value}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoiceSelect(step.id, option.value)}
                className={cn(
                  'surface-chip rounded-full px-5 py-4 text-center text-base font-semibold tracking-[-0.02em] text-stone-600 transition-all duration-300 hover:border-[#1C6AA8]/30 hover:bg-[#f7fbff] hover:text-stone-950',
                  isActive && 'surface-chip-active border-[#1C6AA8]/25 bg-[#edf5fb] text-[#0B4E84]'
                )}
              >
                {option.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderNumberStep = (step: NumberStep) => {
    const value = answers[step.id];
    const StepIcon = step.icon;

    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <div className="surface-chip mb-8 flex h-20 w-20 items-center justify-center rounded-[1.8rem] bg-white text-[#1C6AA8] shadow-[0_18px_38px_rgba(15,23,42,0.05)]">
          <StepIcon className="h-10 w-10" />
        </div>

        <div className="surface-card-strong mb-8 flex w-full max-w-[31rem] items-center gap-2 rounded-[1.6rem] p-2 shadow-[0_20px_46px_rgba(15,23,42,0.06)]">
          <button
            type="button"
            onClick={() => handleNumberAdjust(step.id, step.min, step.max, -step.step)}
            className="surface-chip flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] text-stone-500 transition-colors hover:text-stone-950"
          >
            <Minus className="h-5 w-5" />
          </button>

          <label className="flex min-w-0 flex-1 items-center justify-center gap-3 rounded-[1.2rem] border border-[var(--surface-stroke)] bg-white/92 px-5 py-4">
            <input
              type="number"
              value={value}
              min={step.min}
              max={step.max}
              step={step.step}
              onChange={(event) => handleNumberChange(step.id, Number(event.target.value), step.min, step.max)}
              className="w-full bg-transparent text-center text-[1.65rem] font-semibold tracking-[-0.04em] text-stone-950 outline-none"
            />
            {step.unit ? <span className="text-lg font-medium text-stone-500">{step.unit}</span> : null}
          </label>

          <button
            type="button"
            onClick={() => handleNumberAdjust(step.id, step.min, step.max, step.step)}
            className="surface-chip flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] text-stone-500 transition-colors hover:text-stone-950"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="btn-beam-blue inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white"
        >
          <span>{step.cta}</span>
          <ArrowRight className={cn('h-4 w-4', isRtl && 'rotate-180')} />
        </motion.button>
      </div>
    );
  };

  const renderTextStep = (step: TextStep) => {
    const StepIcon = step.icon;

    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <div className="surface-chip mb-8 flex h-20 w-20 items-center justify-center rounded-[1.8rem] bg-white text-[#1C6AA8] shadow-[0_18px_38px_rgba(15,23,42,0.05)]">
          <StepIcon className="h-10 w-10" />
        </div>

        <div className="mb-6 w-full rounded-[1.7rem] border border-dashed border-[#cfe0ee] bg-white/76 px-5 py-4 text-sm leading-relaxed text-stone-500 sm:px-6 sm:py-5">
          <p>{step.helper}</p>
          <p className="mt-2 font-medium text-stone-600">{step.formatHint}</p>
        </div>

        <input
          type="text"
          value={answers.address}
          onChange={(event) => {
            setAnswers((current) => ({ ...current, address: event.target.value }));
            setError('');
          }}
          placeholder={step.placeholder}
          className="surface-card-strong mb-6 w-full rounded-[1.35rem] px-5 py-4 text-base text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-[#7EB4DD] sm:px-6 sm:py-5"
        />

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={goNext}
            className="surface-chip inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#1C6AA8] transition-colors hover:text-[#0B4E84]"
          >
            <span>{step.skipLabel}</span>
            <ArrowRight className={cn('h-4 w-4', isRtl && 'rotate-180')} />
          </button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="btn-beam-blue inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white"
          >
            <span>{step.cta}</span>
            <ArrowRight className={cn('h-4 w-4', isRtl && 'rotate-180')} />
          </motion.button>
        </div>
      </div>
    );
  };

  const renderContactStep = (step: ContactStep) => {
    return (
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-4xl">
        <div className="mb-8 flex justify-center">
          <div className="surface-chip flex h-20 w-20 items-center justify-center rounded-[1.8rem] bg-white text-[#1C6AA8] shadow-[0_18px_38px_rgba(15,23,42,0.05)]">
            <UserRound className="h-10 w-10" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-stone-600">{copy.contact.salutation}</span>
            <select
              value={answers.salutation}
              onChange={(event) => {
                setAnswers((current) => ({
                  ...current,
                  salutation: event.target.value as SalutationCode,
                }));
              }}
              className="surface-card-strong w-full rounded-[1.2rem] px-4 py-4 text-base text-stone-900 outline-none"
            >
              {Object.entries(copy.salutationOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-stone-600">{copy.contact.firstName}</span>
            <input
              type="text"
              value={answers.firstName}
              onChange={(event) => {
                setAnswers((current) => ({ ...current, firstName: event.target.value }));
                setError('');
              }}
              className="surface-card-strong w-full rounded-[1.2rem] px-4 py-4 text-base text-stone-900 outline-none"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-stone-600">{copy.contact.lastName}</span>
            <input
              type="text"
              value={answers.lastName}
              onChange={(event) => {
                setAnswers((current) => ({ ...current, lastName: event.target.value }));
                setError('');
              }}
              className="surface-card-strong w-full rounded-[1.2rem] px-4 py-4 text-base text-stone-900 outline-none"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-stone-600">{copy.contact.phone}</span>
            <input
              type="tel"
              value={answers.phone}
              onChange={(event) => {
                setAnswers((current) => ({ ...current, phone: event.target.value }));
                setError('');
              }}
              className="surface-card-strong w-full rounded-[1.2rem] px-4 py-4 text-base text-stone-900 outline-none"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold text-stone-600">{copy.contact.email}</span>
            <input
              type="email"
              value={answers.email}
              onChange={(event) => {
                setAnswers((current) => ({ ...current, email: event.target.value }));
                setError('');
              }}
              className="surface-card-strong w-full rounded-[1.2rem] px-4 py-4 text-base text-stone-900 outline-none"
            />
          </label>
        </div>

        <div className="mt-6 space-y-4 rounded-[1.6rem] border border-[var(--surface-stroke)] bg-white/76 p-5 sm:p-6">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-stone-600">
            <input
              type="checkbox"
              checked={answers.marketingOptIn}
              onChange={(event) => {
                setAnswers((current) => ({ ...current, marketingOptIn: event.target.checked }));
              }}
              className="mt-1 h-5 w-5 rounded border-[var(--surface-stroke-strong)] text-[#1C6AA8]"
            />
            <span>{copy.contact.marketing}</span>
          </label>

          <label className="flex items-start gap-3 text-sm leading-relaxed text-stone-600">
            <input
              type="checkbox"
              checked={answers.consent}
              onChange={(event) => {
                setAnswers((current) => ({ ...current, consent: event.target.checked }));
                setError('');
              }}
              className="mt-1 h-5 w-5 rounded border-[var(--surface-stroke-strong)] text-[#1C6AA8]"
            />
            <span>
              {copy.contact.consent} <span className="font-medium text-stone-400">({copy.contact.privacy})</span>
            </span>
          </label>
        </div>

        {error ? (
          <p className="mt-4 rounded-[1rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600" aria-live="polite">
            {error}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col items-center gap-4">
          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            disabled={submitting}
            className="btn-beam-blue inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span>{submitting ? '...' : step.cta}</span>
            <ArrowRight className={cn('h-4 w-4', isRtl && 'rotate-180')} />
          </motion.button>

          <p className="text-sm text-stone-500">{copy.contact.requiredHint}</p>
        </div>
      </form>
    );
  };

  const renderStep = () => {
    if (submitted) {
      return (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="surface-chip mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1C6AA8]">
            <BadgeCheck className="h-4 w-4" />
            {copy.successBadge}
          </div>
          <div className="surface-card-strong overflow-hidden rounded-[2rem] p-8 sm:p-10">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[1.8rem] bg-[#edf5fb] text-[#1C6AA8] shadow-[0_18px_38px_rgba(15,23,42,0.05)]">
              <BadgeCheck className="h-10 w-10" />
            </div>
            <h3 className="mb-4 text-3xl font-serif font-medium tracking-[-0.04em] text-stone-950 sm:text-4xl">
              {copy.successTitle}
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
              {copy.successDescription}
            </p>

            <div className="mx-auto mb-8 max-w-2xl rounded-[1.6rem] border border-[var(--surface-stroke)] bg-white/78 p-5 text-left">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                {copy.successSummaryTitle}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="surface-chip rounded-[1.1rem] px-4 py-3 text-sm text-stone-700">
                  {copy.steps.propertyType.title}: {answers.propertyType ? findChoiceLabel('propertyType', answers.propertyType) : '-'}
                </div>
                <div className="surface-chip rounded-[1.1rem] px-4 py-3 text-sm text-stone-700">
                  {copy.steps.yearBuilt.title}: {answers.yearBuilt}
                </div>
                <div className="surface-chip rounded-[1.1rem] px-4 py-3 text-sm text-stone-700">
                  {copy.steps.area.title}: {answers.area} m²
                </div>
                <div className="surface-chip rounded-[1.1rem] px-4 py-3 text-sm text-stone-700">
                  {copy.steps.units.title}: {answers.units}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={resetWizard}
              className="surface-chip inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#1C6AA8] transition-colors hover:text-[#0B4E84]"
            >
              <span>{copy.successCta}</span>
              <ArrowRight className={cn('h-4 w-4', isRtl && 'rotate-180')} />
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={currentStep.id}
        initial={{ opacity: 0, x: isRtl ? -24 : 24, y: 14 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: isRtl ? 24 : -24, y: -14 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 h-2 w-full max-w-[24rem] overflow-hidden rounded-full bg-[#e8eef5]">
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,#7EB4DD_0%,#1C6AA8_100%)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <h3 className="mx-auto max-w-4xl text-[2.15rem] font-serif font-medium leading-tight tracking-[-0.04em] text-stone-950 sm:text-[2.7rem]">
            {currentStep.title}
          </h3>
          {currentStep.subtitle ? (
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-stone-500 sm:text-lg">
              {currentStep.subtitle}
            </p>
          ) : null}
        </div>

        {currentStep.kind === 'choice' ? renderChoiceStep(currentStep) : null}
        {currentStep.kind === 'number' ? renderNumberStep(currentStep) : null}
        {currentStep.kind === 'text' ? renderTextStep(currentStep) : null}
        {currentStep.kind === 'contact' ? renderContactStep(currentStep) : null}
      </motion.div>
    );
  };

  return (
    <section
      id="quick-check"
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative overflow-hidden py-20 text-stone-900 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(126,180,221,0.16),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(28,106,168,0.08),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(215,232,246,0.28),transparent_34%)]" />
      </div>

      <div className="container-wide relative z-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="surface-chip mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1C6AA8]">
              <span className="h-2 w-2 rounded-full bg-[#1C6AA8]" />
              {copy.sectionEyebrow}
            </span>
            <h2 className="mb-4 text-4xl font-serif font-medium tracking-[-0.05em] text-stone-950 sm:text-5xl lg:text-6xl">
              {copy.sectionTitle}
            </h2>
            <p className="text-base leading-relaxed text-stone-600 sm:text-lg">
              {copy.sectionDescription}
            </p>
          </div>

          <div className="surface-card-strong relative overflow-hidden rounded-[2.2rem] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,250,255,0.96)_38%,rgba(245,249,255,0.94)_100%)]" />
            <div className="absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-[#1C6AA8]/22 to-transparent" />
            <div className="absolute -left-12 top-20 h-44 w-44 rounded-full bg-[#1C6AA8]/8 blur-[92px]" />
            <div className="absolute -right-10 bottom-6 h-40 w-40 rounded-full bg-[#7EB4DD]/12 blur-[84px]" />

            <div className="relative z-10">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={currentStepIndex === 0 || submitted}
                  className="surface-chip inline-flex w-fit items-center gap-2 rounded-full px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1C6AA8] transition-all hover:text-[#0B4E84] disabled:pointer-events-none disabled:opacity-35"
                >
                  <ArrowLeft className={cn('h-4 w-4', isRtl && 'rotate-180')} />
                  {copy.backLabel}
                </button>

                {!submitted ? (
                  <div className="surface-chip inline-flex w-fit items-center gap-2 rounded-full px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
                    <span className="text-[#1C6AA8]">{copy.progressCount}</span>
                    <span>
                      {currentStepIndex + 1} / {steps.length}
                    </span>
                  </div>
                ) : null}
              </div>

              {!submitted ? (
                <div className="mb-8 flex justify-center">
                  <p className="text-sm text-stone-500">{copy.autoAdvanceHint}</p>
                </div>
              ) : null}

              <div className="min-h-[34rem] sm:min-h-[36rem]">
                <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
              </div>

              <div className="surface-divider mt-10 border-t pt-8">
                <div className="grid gap-4 md:grid-cols-3">
                  {copy.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="surface-chip flex items-center gap-3 rounded-[1.2rem] px-4 py-4 text-sm font-medium text-stone-700"
                    >
                      <Check className="h-4 w-4 shrink-0 text-[#1C6AA8]" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="surface-chip inline-flex items-center gap-4 rounded-[1.4rem] px-4 py-3 sm:px-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1C6AA8] shadow-[0_12px_24px_rgba(15,23,42,0.05)]">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{copy.ratingLabel}</p>
                      <p className="text-sm text-stone-500">
                        <span className="mr-2 text-[#1C6AA8]">{copy.ratingStars}</span>
                        {copy.ratingValue}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="surface-chip inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm text-stone-600">
                      <ShieldCheck className="h-4 w-4 text-[#1C6AA8]" />
                      {copy.trustBadges[0]}
                    </div>
                    <div className="surface-chip inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm text-stone-600">
                      <Clock3 className="h-4 w-4 text-[#1C6AA8]" />
                      {copy.trustBadges[1]}
                    </div>
                    <div className="surface-chip inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm text-stone-600">
                      <Sparkles className="h-4 w-4 text-[#1C6AA8]" />
                      {copy.trustBadges[2]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickCheck;
