import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MarketingLayout from '@/components/marketing/marketing-layout';

function normalizeWhatsappNumber(raw: string): string {
    return raw.replace(/[^\d]/g, '');
}

export default function Contact() {
    const companyName = String(import.meta.env.VITE_COMPANY_NAME || 'Ahmed Sophe');
    const whatsappNumber = String(import.meta.env.VITE_WHATSAPP_NUMBER || '');
    const normalized = normalizeWhatsappNumber(whatsappNumber);
    const waCanUse = Boolean(normalized);

    const [propertyType, setPropertyType] = useState<'شقة' | 'فيلا' | 'أي مشروع'>(
        'شقة',
    );
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [message, setMessage] = useState('');

    const whatsappHref = useMemo(() => {
        if (!waCanUse) return '';
        const safeName = name?.trim() ? name.trim() : 'عميل';
        const safeArea = area?.trim() ? area.trim() : 'حسب المساحة';
        const extra = message?.trim() ? `\nتفاصيل: ${message.trim()}` : '';
        const text = encodeURIComponent(
            `مرحبًا، أنا ${safeName}.\nنوع المشروع: ${propertyType}.\nالمقاس/المساحة: ${safeArea}.${extra}\nأريد تصميم وتنفيذ مطبخ مودرن فخم.`,
        );
        return `https://wa.me/${normalized}?text=${text}`;
    }, [area, message, name, propertyType, normalized, waCanUse]);

    return (
        <>
            <Head title="Contact" />
            <MarketingLayout>
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
                    <div className="rounded-[32px] bg-[#FFFFFF] border border-[#D9D9D9] p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.05)]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-black text-[#2B1702]">
                                    تواصل مع {companyName}
                                </h1>
                                <p className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">
                                    اكتب بياناتك، وسيفتح واتساب برسالة جاهزة.
                                    <span className="text-[#A67C52] font-semibold"> أسرع تواصل </span>
                                    للطبقة الرقية والمهندسين.
                                </p>

                                <div className="mt-7 space-y-3">
                                    <div className="rounded-2xl border border-[#D9D9D9] bg-[#F5F5F5] p-4">
                                        <div className="font-bold text-[#553B1E] text-[13px]">Premium coordination</div>
                                        <div className="text-[12px] text-[#2B1702]/70 mt-1" dir="ltr">
                                            Clear steps + premium finish.
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-[#D9D9D9] bg-[#F5F5F5] p-4">
                                        <div className="font-bold text-[#553B1E] text-[13px]">Engineer-friendly</div>
                                        <div className="text-[12px] text-[#2B1702]/70 mt-1" dir="ltr">
                                            Matching execution to design intent.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!waCanUse) return;
                                    window.open(whatsappHref, '_blank', 'noopener,noreferrer');
                                }}
                                className="w-full"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className="block">
                                        <div className="text-[12px] font-semibold text-[#553B1E] mb-2">اسمك</div>
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                            placeholder="اكتب اسمك"
                                        />
                                    </label>
                                    <label className="block">
                                        <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                            نوع العقار
                                        </div>
                                        <select
                                            value={propertyType}
                                            onChange={(e) =>
                                                setPropertyType(e.target.value as 'شقة' | 'فيلا' | 'أي مشروع')
                                            }
                                            className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                        >
                                            <option value="شقة">شقة</option>
                                            <option value="فيلا">فيلا</option>
                                            <option value="أي مشروع">أي مشروع</option>
                                        </select>
                                    </label>
                                </div>

                                <div className="mt-4">
                                    <label className="block">
                                        <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                            المقاس/المساحة (اختياري)
                                        </div>
                                        <input
                                            value={area}
                                            onChange={(e) => setArea(e.target.value)}
                                            className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                            placeholder="مثال: 4x3 / عدد قطع / مساحة"
                                        />
                                    </label>
                                </div>

                                <div className="mt-4">
                                    <label className="block">
                                        <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                            تفاصيل سريعة (اختياري)
                                        </div>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="min-h-[92px] w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                            placeholder="ذوقك؟ خامة مفضلة؟ توقيت التنفيذ؟"
                                        />
                                    </label>
                                </div>

                                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                                    <button
                                        type="submit"
                                        disabled={!waCanUse}
                                        className={[
                                            'rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200',
                                            waCanUse
                                                ? 'bg-[#A67C52] text-[#1B1B18] hover:-translate-y-[1px]'
                                                : 'bg-[#D9D9D9] text-[#5c5c5c] cursor-not-allowed',
                                        ].join(' ')}
                                    >
                                        {waCanUse ? 'ارسل على واتساب' : 'حدّد رقم واتساب'}
                                    </button>

                                    <div className="text-[12px] text-[#2B1702]/70 leading-5">
                                        <span dir="ltr">No backend needed.</span>
                                        <br />
                                        <span>Message is prefilled.</span>
                                    </div>
                                </div>

                                {!waCanUse && (
                                    <div className="mt-4 rounded-2xl border border-[#D9D9D9] bg-[#F5F5F5] p-4 text-[12px] text-[#2B1702]/80">
                                        حدّث <span className="font-semibold">VITE_WHATSAPP_NUMBER</span> في
                                        <span className="font-semibold"> .env</span>.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </section>
            </MarketingLayout>
        </>
    );
}

