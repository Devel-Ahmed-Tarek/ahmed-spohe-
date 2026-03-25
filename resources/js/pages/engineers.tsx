import { Head } from '@inertiajs/react';
import MarketingLayout from '@/components/marketing/marketing-layout';

export default function Engineers() {
    return (
        <>
            <Head title="Engineers" />
            <MarketingLayout>
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
                    <div className="rounded-[32px] bg-[#2B1702] text-[#F5F5F5] p-8 sm:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-black leading-tight">
                                    للمهندسين
                                </h1>
                                <p className="mt-3 text-[14px] leading-7 text-[#F5F5F5]/85">
                                    تنفيذ مطابق للمخططات بمستوى تشطيب فخم—وبتنسيق واضح قبل ما تبدأ التصنيع.
                                </p>

                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        'تنسيق قبل التصنيع',
                                        'دقة المقاسات والتفاصيل',
                                        'تنفيذ مطابق للستايل',
                                        'تسليم منظم وبمواعيد',
                                    ].map((t) => (
                                        <div
                                            key={t}
                                            className="rounded-2xl bg-white/5 border border-white/10 p-4 text-[13px] font-semibold"
                                        >
                                            {t}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="text-left">
                                <h2 className="text-2xl sm:text-3xl font-black text-[#F8B803]">
                                    Engineer-friendly delivery
                                </h2>
                                <div className="mt-5 space-y-3">
                                    {[
                                        'Built to spec (drawings & details).',
                                        'Precise measurement control.',
                                        'Clear schedule & organized installation.',
                                        'Material coordination before manufacturing.',
                                    ].map((t) => (
                                        <div
                                            key={t}
                                            className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-4"
                                        >
                                            <span className="mt-1 h-2 w-2 rounded-full bg-[#A67C52]" />
                                            <span className="text-[13px] font-semibold">{t}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8">
                                    <a
                                        href="/contact"
                                        className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200"
                                    >
                                        اطلب تنسيق مع فريق التنفيذ
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </MarketingLayout>
        </>
    );
}

