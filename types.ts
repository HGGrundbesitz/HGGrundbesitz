import { LucideIcon } from 'lucide-react';

export interface Milestone {
    year: string;
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface CarouselItem {
    title: string;
    category: string;
    img: string;
    location?: string;
    year?: string;
    description?: string;
}

export interface StatItem {
    label: string;
    subLabel: string;
    value?: string;
    icon: LucideIcon;
}
