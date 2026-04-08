import { Head } from '@inertiajs/react';
import MarketingLayout from '@/components/marketing/marketing-layout';

const galleryImages = [
    '/images/projects/kitchen-01.png',
    '/images/projects/kitchen-02.png',
    '/images/projects/kitchen-03.png',
    '/images/projects/kitchen-04.png',
    '/images/projects/kitchen-05.png',
    '/images/projects/kitchen-06.png',
    '/images/projects/kitchen-07.png',
    '/images/projects/kitchen-08.png',
    '/images/projects/kitchen-09.png',
    '/images/projects/kitchen-10.png',
    '/images/projects/kitchen-11.png',
];

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
                            استايلات وتشطيبات تناسب الشقق والفلل، ودي مجموعة صور من نماذج مطابخ
                            متنوعة.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {galleryImages.map((img, idx) => (
                            <div
                                key={img}
                                className="rounded-3xl bg-white/80 border border-[#D9D9D9] overflow-hidden"
                            >
                                <img
                                    src={img}
                                    alt={`Kitchen ${idx + 1}`}
                                    className="h-52 w-full object-cover"
                                />
                                <div className="p-5">
                                    <div className="font-black text-[#2B1702]">
                                        Kitchen Project {String(idx + 1).padStart(2, '0')}
                                    </div>
                                    <div className="mt-1 text-[12px] text-[#2B1702]/70" dir="ltr">
                                        Modern / Premium finish
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

