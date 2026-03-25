import type { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

export default function MarketingLayout({
    children,
}: {
    children: ReactNode;
}) {
    const nav = [
        { href: '/', ar: 'الرئيسية', en: 'Home' },
        { href: '/services', ar: 'الخدمات', en: 'Services' },
        { href: '/gallery', ar: 'المعرض', en: 'Gallery' },
        { href: '/process', ar: 'طريقة العمل', en: 'Process' },
        { href: '/engineers', ar: 'للمهندسين', en: 'Engineers' },
        { href: '/contact', ar: 'تواصل', en: 'Contact' },
    ];

    return (
        <div dir="rtl" className="min-h-screen bg-[#F5F5F5] text-[#1B1B18]">
            <header className="sticky top-0 z-50 bg-[#F5F5F5]/80 backdrop-blur border-b border-[#D9D9D9]">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-[#553B1E] grid place-items-center text-[#F5F5F5] font-bold shadow-[0_16px_40px_rgba(85,59,30,0.25)]">
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

                    <nav className="hidden md:flex items-center gap-6 text-[13px] font-semibold text-[#553B1E]">
                        {nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="hover:text-[#A67C52] transition-colors"
                            >
                                <span className="block">{item.ar}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="md:hidden">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-[#A67C52] text-[#1B1B18] hover:brightness-[1.03] transition-all"
                        >
                            تواصل
                        </Link>
                    </div>
                </div>
            </header>

            <main>{children}</main>

            <footer className="pb-10">
                <div className="mx-auto max-w-6xl px-4 text-[12px] text-[#2B1702]/70 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                    <div>
                        © {new Date().getFullYear()}{' '}
                        {String(import.meta.env.VITE_COMPANY_NAME || 'Ahmed Sophe')}. All rights
                        reserved.
                    </div>
                    <div dir="ltr">Premium kitchens • Built to assemble</div>
                </div>
            </footer>
        </div>
    );
}

