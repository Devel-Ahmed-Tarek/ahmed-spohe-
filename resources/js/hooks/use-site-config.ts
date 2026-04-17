import { usePage } from '@inertiajs/react';

type SiteConfigMap = Record<string, string | null | undefined>;

function fromDb(config: SiteConfigMap, key: string): string {
    const v = config[key];
    if (v != null && String(v).trim() !== '') {
        return String(v).trim();
    }
    return '';
}

/**
 * Branding & contact values from Dashboard → Site configuration (shared Inertia props),
 * with optional fallback to Vite env for local/dev.
 */
export function useSiteConfig() {
    const { props } = usePage<{ siteConfig?: SiteConfigMap }>();
    const c = props.siteConfig ?? {};
    const env = import.meta.env;

    const companyName =
        fromDb(c, 'company_name') || String(env.VITE_COMPANY_NAME ?? '').trim() || 'Ahmed Sophe';
    const cityName = fromDb(c, 'city_name') || String(env.VITE_CITY_NAME ?? '').trim();
    const whatsappNumber = fromDb(c, 'whatsapp_number') || String(env.VITE_WHATSAPP_NUMBER ?? '').trim();
    const logoUrl = fromDb(c, 'logo');
    const facebookUrl = fromDb(c, 'facebook_url');
    const instagramUrl = fromDb(c, 'instagram_url');
    const youtubeUrl = fromDb(c, 'youtube_url');
    const tiktokUrl = fromDb(c, 'tiktok_url');
    const linkedinUrl = fromDb(c, 'linkedin_url');

    return {
        companyName,
        cityName,
        whatsappNumber,
        logoUrl,
        facebookUrl,
        instagramUrl,
        youtubeUrl,
        tiktokUrl,
        linkedinUrl,
        waCanUse: Boolean(whatsappNumber.replace(/[^\d]/g, '')),
    };
}
