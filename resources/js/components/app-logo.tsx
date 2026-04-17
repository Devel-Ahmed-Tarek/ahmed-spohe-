import { usePage } from '@inertiajs/react';

/**
 * Dashboard brand mark: site logo from Site configuration, or INTERA wordmark in /images/intera.svg.
 */
export default function AppLogo() {
    const { props } = usePage<{ siteConfig?: Record<string, string | null> }>();
    const fromSettings = props.siteConfig?.logo?.trim() || '';
    const src = fromSettings || '/images/intera.svg';

    return (
        <img
            src={src}
            alt=""
            className="h-8 w-auto max-h-8 max-w-[min(100%,9rem)] shrink-0 object-contain object-left dark:brightness-110"
        />
    );
}
