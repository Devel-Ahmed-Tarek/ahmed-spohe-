import { Head } from '@inertiajs/react';
import MarketingLayout from '@/components/marketing/marketing-layout';

export default function Gallery() {
    return (
        <>
            <Head title="Gallery" />
            <MarketingLayout>
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-black text-[#2B1702]">
                            المعرض
                        </h1>
                        <p className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">
                            استايلات وتشطيبات تناسب الشقق والفلل… هنعرض هنا نماذج أعمالكم
                            <span className="text-[#A67C52] font-semibold"> قريبًا </span>
                            مع صور قبل/بعد.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {new Array(9).fill(null).map((_, idx) => (
                            <div
                                key={idx}
                                className="rounded-3xl bg-white/80 border border-[#D9D9D9] overflow-hidden"
                            >
                                <div className="h-52 bg-gradient-to-br from-[#F5F5F5] to-[#D9D9D9] flex items-center justify-center">
                                    <div className="text-[12px] font-semibold text-[#553B1E]/80">
                                        Kitchen #{idx + 1}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="font-black text-[#2B1702]">Premium Finish</div>
                                    <div className="mt-1 text-[12px] text-[#2B1702]/70" dir="ltr">
                                        Gallery placeholder
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </MarketingLayout>
        </>
    );
}

