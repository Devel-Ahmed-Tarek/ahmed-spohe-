import type { ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';

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
    const nav = [
        { href: '/', ar: 'الرئيسية', en: 'Home' },
        { href: '/about', ar: 'عن الشركة', en: 'About' },
        { href: '/services', ar: 'الخدمات', en: 'Services' },
        { href: '/gallery', ar: 'المعرض', en: 'Gallery' },
        { href: '/process', ar: 'طريقة العمل', en: 'Process' },
        { href: '/engineers', ar: 'للمهندسين', en: 'Engineers' },
        { href: '/contact', ar: 'تواصل', en: 'Contact' },
    ];

    return (
        <div
            dir="rtl"
            className="marketing-site flex min-h-screen min-h-[100dvh] flex-col text-[#1B1B18]"
        >
            <header className="marketing-header-bar sticky top-0 z-50 shrink-0 border-b border-[#D9D9D9]/70">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="marketing-brand-mark h-9 w-9 rounded-xl bg-[#553B1E] grid place-items-center text-[#F5F5F5] font-bold shadow-[0_16px_40px_rgba(85,59,30,0.25)]">
                            K
                        </div>
                        <div className="leading-tight">
                            <div className="font-extrabold text-[#553B1E] text-sm sm:text-base">
                                {String(
                                    import.meta.env.VITE_COMPANY_NAME || 'Ahmed Sophe',
                                )}
                            </div>
                            <div className="text-[11px] text-[#2B1702] opacity-80">
                                {String(import.meta.env.VITE_CITY_NAME || '')}
                            </div>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-7 text-[13px] font-semibold text-[#553B1E]">
                        {nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="marketing-nav-link hover:text-[#A67C52]"
                            >
                                <span className="block tracking-tight">{item.ar}</span>
                            </Link>
                        ))}
                    </nav>

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
                                                <span className="block">{item.ar}</span>
                                                <span
                                                    className="mt-0.5 block text-[11px] font-medium text-[#2B1702]/45"
                                                    dir="ltr"
                                                >
                                                    {item.en}
                                                </span>
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-gradient-to-br from-[#C4A484] via-[#A67C52] to-[#8f6844] text-[#1B1B18] shadow-[0_10px_28px_rgba(85,59,30,0.22)] hover:brightness-[1.04] active:scale-[0.98] transition-all duration-300"
                        >
                            تواصل
                        </Link>
                    </div>
                </div>
            </header>

            <main className="w-full flex-1 pb-[env(safe-area-inset-bottom,0px)]">
                {children}
            </main>

            {!hideDefaultFooter && (
                <footer className="shrink-0 pb-10 pt-2">
                    <div className="mx-auto max-w-6xl px-4 text-[12px] text-[#2B1702]/70 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                        <div>
                            © {new Date().getFullYear()}{' '}
                            {String(import.meta.env.VITE_COMPANY_NAME || 'Ahmed Sophe')}. All rights
                            reserved.
                        </div>
                        <div dir="ltr">Premium kitchens • Built to assemble</div>
                    </div>
                </footer>
            )}
        </div>
    );
}

