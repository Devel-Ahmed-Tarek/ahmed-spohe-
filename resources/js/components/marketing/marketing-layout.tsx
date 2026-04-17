import type { ReactNode } from 'react';
import { Link, router } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Menu, Youtube } from 'lucide-react';
import { useCms } from '@/hooks/use-cms';
import { useSiteConfig } from '@/hooks/use-site-config';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

export default function MarketingLayout({
    children,
    hideDefaultFooter = false,
}: {
    children: ReactNode;
    /** يُستخدم في الصفحة الرئيسية عند وجود فوتر مخصص كامل */
    hideDefaultFooter?: boolean;
}) {
    const { locale, t } = useCms();
    const isEn = locale === 'en';
    const { logoUrl, facebookUrl, instagramUrl, youtubeUrl, tiktokUrl, linkedinUrl } = useSiteConfig();

    const socialEntries = [
        { href: facebookUrl, label: 'Facebook', Icon: Facebook },
        { href: instagramUrl, label: 'Instagram', Icon: Instagram },
        { href: youtubeUrl, label: 'YouTube', Icon: Youtube },
        { href: linkedinUrl, label: 'LinkedIn', Icon: Linkedin },
    ].filter((e) => e.href.trim() !== '');

    const tiktokHref = tiktokUrl.trim();

    const nav = [
        { href: '/', label: t('nav.home', 'الرئيسية', 'Home') },
        { href: '/about', label: t('nav.about', 'عن الشركة', 'About') },
        { href: '/services', label: t('nav.services', 'الخدمات', 'Services') },
        { href: '/gallery', label: t('nav.gallery', 'المعرض', 'Gallery') },
        { href: '/process', label: t('nav.process', 'طريقة العمل', 'Process') },
        { href: '/engineers', label: t('nav.engineers', 'للمهندسين', 'Engineers') },
        { href: '/contact', label: t('nav.contact', 'تواصل', 'Contact') },
    ];

    return (
        <div
            dir={isEn ? 'ltr' : 'rtl'}
            className="marketing-site flex min-h-screen min-h-[100dvh] flex-col text-[#1B1B18]"
        >
            <header className="marketing-header-bar sticky top-0 z-50 shrink-0 border-b border-[#D9D9D9]/70">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
                    <Link
                        href="/"
                        className="flex min-w-0 shrink items-center"
                        aria-label={t('nav.home', 'الرئيسية', 'Home')}
                    >
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt=""
                                className="h-10 w-auto max-h-12 max-w-[min(100%,16rem)] object-contain object-start sm:h-11"
                            />
                        ) : (
                            <div className="marketing-brand-mark h-10 w-10 shrink-0 rounded-xl bg-[#553B1E] grid place-items-center text-[#F5F5F5] text-sm font-bold shadow-[0_16px_40px_rgba(85,59,30,0.25)] sm:h-11 sm:w-11">
                                K
                            </div>
                        )}
                    </Link>

                    <nav className="hidden md:flex items-center gap-7 text-[13px] font-semibold text-[#553B1E]">
                        {nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="marketing-nav-link hover:text-[#A67C52]"
                            >
                                <span className="block tracking-tight">{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                    <button
                        type="button"
                        onClick={() =>
                            router.post(`/locale/${isEn ? 'ar' : 'en'}`, {}, { preserveScroll: true })
                        }
                        className="hidden md:inline-flex items-center justify-center rounded-xl border border-[#D9D9D9] bg-white px-3 py-2 text-xs font-semibold text-[#553B1E]"
                    >
                        {isEn ? 'AR' : 'EN'}
                    </button>

                    <div className="flex items-center gap-2 md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button
                                    type="button"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9D9D9] bg-white/90 text-[#553B1E] shadow-[0_8px_24px_rgba(43,23,2,0.08)] transition hover:border-[#A67C52]/45 hover:bg-white active:scale-[0.97]"
                                    aria-label="فتح قائمة التنقل"
                                >
                                    <Menu className="size-[22px] shrink-0" strokeWidth={2.25} />
                                </button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="w-[min(100%,20rem)] border-[#D9D9D9] bg-[#F5F5F5] p-0 sm:max-w-[20rem]"
                            >
                                <SheetHeader className="border-b border-[#D9D9D9]/80 px-5 py-4 text-right">
                                    <SheetTitle className="text-[#2B1702] text-lg font-black">
                                        التنقل
                                    </SheetTitle>
                                    <p className="text-[11px] font-medium text-[#553B1E]/75" dir="ltr">
                                        Menu
                                    </p>
                                </SheetHeader>
                                <nav className="flex flex-col gap-0.5 px-3 py-4" aria-label="روابط الموقع">
                                    {nav.map((item) => (
                                        <SheetClose key={item.href} asChild>
                                            <Link
                                                href={item.href}
                                                className="rounded-xl px-3 py-3 text-[15px] font-semibold text-[#553B1E] transition hover:bg-white/90 hover:text-[#A67C52]"
                                            >
                                                <span className="block">{item.label}</span>
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <button
                            type="button"
                            onClick={() =>
                                router.post(`/locale/${isEn ? 'ar' : 'en'}`, {}, { preserveScroll: true })
                            }
                            className="inline-flex items-center justify-center rounded-xl border border-[#D9D9D9] bg-white px-3 py-2 text-xs font-semibold text-[#553B1E]"
                        >
                            {isEn ? 'AR' : 'EN'}
                        </button>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-gradient-to-br from-[#C4A484] via-[#A67C52] to-[#8f6844] text-[#1B1B18] shadow-[0_10px_28px_rgba(85,59,30,0.22)] hover:brightness-[1.04] active:scale-[0.98] transition-all duration-300"
                        >
                            {t('nav.contact', 'تواصل', 'Contact')}
                        </Link>
                    </div>
                </div>
            </header>

            <main className="w-full flex-1 pb-[env(safe-area-inset-bottom,0px)]">
                {children}
            </main>

            {!hideDefaultFooter && (
                <footer className="shrink-0 pb-10 pt-2">
                    <div className="mx-auto max-w-6xl px-4 flex flex-col gap-3 text-[12px] text-[#2B1702]/70">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                © {new Date().getFullYear()}{' '}
                                {t('home.footer.rights', 'جميع الحقوق محفوظة.', 'All rights reserved.')}
                            </div>
                            <div dir="ltr">
                                {t('footer.tagline', 'مطابخ فاخرة', 'Premium kitchens • Built to assemble')}
                            </div>
                        </div>
                        {(socialEntries.length > 0 || tiktokHref) && (
                            <div
                                className="flex flex-wrap items-center justify-center gap-4 sm:justify-end border-t border-[#D9D9D9]/60 pt-3"
                                dir="ltr"
                            >
                                {socialEntries.map(({ href, label, Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#553B1E] transition hover:text-[#A67C52]"
                                        aria-label={label}
                                    >
                                        <Icon className="size-5" strokeWidth={2} />
                                    </a>
                                ))}
                                {tiktokHref ? (
                                    <a
                                        href={tiktokHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[11px] font-bold uppercase tracking-wide text-[#553B1E] transition hover:text-[#A67C52]"
                                        aria-label="TikTok"
                                    >
                                        TikTok
                                    </a>
                                ) : null}
                            </div>
                        )}
                    </div>
                </footer>
            )}
        </div>
    );
}

