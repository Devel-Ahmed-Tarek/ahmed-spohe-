import type { Auth } from '@/types/auth';

type CmsEntry = {
    ar: string | null;
    en: string | null;
};

type HeroSlideEntry = {
    image: string;
    title_ar: string;
    title_en: string | null;
    subtitle_ar: string | null;
    subtitle_en: string | null;
};

type BrandEntry = {
    name: string;
    logo: string;
    hint: string | null;
};

type MarketingServiceEntry = {
    id: number;
    ar: string;
    en: string;
    descAr: string;
    descEn: string;
    image: string;
    imageAlt: string;
};

type GalleryItemEntry = {
    id: number;
    image: string;
    labelAr: string | null;
    labelEn: string | null;
    taglineAr: string | null;
    taglineEn: string | null;
    homePosition: number | null;
    engineerHomePosition: number | null;
};

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            locale: 'ar' | 'en';
            cms: Record<string, CmsEntry>;
            flash: {
                success?: string;
            };
            heroSlides: HeroSlideEntry[];
            brands: BrandEntry[];
            marketingServices: MarketingServiceEntry[];
            galleryItems: GalleryItemEntry[];
            siteConfig: Record<string, string | null>;
            [key: string]: unknown;
        };
    }
}
