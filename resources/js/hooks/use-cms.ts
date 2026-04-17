import { usePage } from '@inertiajs/react';

type CmsEntry = {
    ar: string | null;
    en: string | null;
};

type SharedProps = {
    locale?: 'ar' | 'en';
    cms?: Record<string, CmsEntry>;
};

export function useCms() {
    const { props } = usePage<SharedProps>();
    const locale = props.locale === 'en' ? 'en' : 'ar';
    const dictionary = props.cms ?? {};

    const t = (key: string, fallbackAr: string, fallbackEn?: string): string => {
        const entry = dictionary[key];
        const enFallback = fallbackEn ?? fallbackAr;

        if (!entry) {
            return locale === 'en' ? enFallback : fallbackAr;
        }

        if (locale === 'en') {
            return entry.en?.trim() || enFallback;
        }

        const ar = entry.ar?.trim();
        if (!ar) {
            return fallbackAr;
        }
        const en = entry.en?.trim();
        // If both columns were saved with the same English copy, prefer the Arabic fallback from code.
        if (en && ar === en) {
            return fallbackAr;
        }
        // If Arabic column was mistakenly filled with English (common when value_en is empty), prefer code fallback.
        const hasArabicScript = /[\u0600-\u06FF]/.test(ar);
        const fallbackHasArabic = /[\u0600-\u06FF]/.test(fallbackAr);
        if (!hasArabicScript && fallbackHasArabic && ar.length >= 10) {
            return fallbackAr;
        }
        return ar;
    };

    return { locale, t };
}
