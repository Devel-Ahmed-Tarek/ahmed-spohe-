import { Head, useForm, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import MarketingLayout from '@/components/marketing/marketing-layout';
import { useCms } from '@/hooks/use-cms';
import { useSiteConfig } from '@/hooks/use-site-config';

function normalizeWhatsappNumber(raw: string): string {
    return raw.replace(/[^\d]/g, '');
}

type PropertyKind = 'apt' | 'villa' | 'any';

export default function Contact() {
    const { t, locale } = useCms();
    const { flash } = usePage<{ flash?: { success?: string } }>().props;
    const { companyName, whatsappNumber, waCanUse } = useSiteConfig();
    const normalized = normalizeWhatsappNumber(whatsappNumber);

    const form = useForm({
        name: '',
        phone: '',
        email: '',
        property_kind: 'apt' as PropertyKind,
        area: '',
        message: '',
        source: 'contact' as const,
    });

    const whatsappHref = useMemo(() => {
        if (!waCanUse) return '';
        const propertyLabel =
            form.data.property_kind === 'apt'
                ? t('home.contact.property.apt', 'شقة', 'Apartment')
                : form.data.property_kind === 'villa'
                  ? t('home.contact.property.villa', 'فيلا', 'Villa')
                  : t('home.contact.property.any', 'أي مشروع', 'Any project');
        const safeName = form.data.name?.trim()
            ? form.data.name.trim()
            : t('home.contact.waNameFallback', 'عميل', 'Client');
        const safeArea = form.data.area?.trim()
            ? form.data.area.trim()
            : t('home.contact.waAreaFallback', 'حسب المساحة', 'Per area');
        const extra = form.data.message?.trim()
            ? `\n${t('home.contact.waDetailsPrefix', 'تفاصيل', 'Details')}: ${form.data.message.trim()}`
            : '';
        const phoneLine = form.data.phone.trim()
            ? `\n${t('home.contact.waPhoneLine', 'جوال', 'Mobile')}: ${form.data.phone.trim()}`
            : '';
        const emailLine = form.data.email.trim()
            ? `\n${t('home.contact.waEmailLine', 'البريد', 'Email')}: ${form.data.email.trim()}`
            : '';
        const hi = t('home.contact.waHi', 'مرحبًا، أنا', 'Hi, I am');
        const proj = t('home.contact.waProject', 'نوع المشروع', 'Project type');
        const areaLine = t('home.contact.waArea', 'المقاس/المساحة', 'Size / area');
        const closing = t(
            'home.contact.waClosing',
            'أريد تصميم وتنفيذ مطبخ مودرن فخم.',
            'I want a modern luxury kitchen design & build.',
        );
        const text = encodeURIComponent(
            `${hi} ${safeName}.${phoneLine}${emailLine}\n${proj}: ${propertyLabel}.\n${areaLine}: ${safeArea}.${extra}\n${closing}`,
        );
        return `https://wa.me/${normalized}?text=${text}`;
    }, [
        form.data.name,
        form.data.phone,
        form.data.email,
        form.data.property_kind,
        form.data.area,
        form.data.message,
        normalized,
        waCanUse,
        t,
    ]);

    const canSubmit = Boolean(form.data.phone.trim());

    return (
        <>
            <Head title={t('contact.meta.title', 'تواصل', 'Contact')} />
            <MarketingLayout>
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
                    <div className="rounded-[32px] bg-[#FFFFFF] border border-[#D9D9D9] p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.05)]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-black text-[#2B1702]">
                                    {t('contact.hero.titleWith', 'تواصل مع', 'Contact')} {companyName}
                                </h1>
                                <p className="mt-3 text-[14px] leading-7 text-[#2B1702]/80">
                                    {t(
                                        'contact.hero.lead',
                                        'اكتب بياناتك، وسيفتح واتساب برسالة جاهزة.',
                                        'Enter your details and WhatsApp opens with a prefilled message.',
                                    )}
                                    <span className="text-[#A67C52] font-semibold">
                                        {' '}
                                        {t('contact.hero.leadHighlight', 'أسرع تواصل', 'Faster contact')}
                                        {' '}
                                    </span>
                                    {t(
                                        'contact.hero.leadEnd',
                                        'للطبقة الراقية والمهندسين.',
                                        'for discerning clients and engineers.',
                                    )}
                                </p>

                                <div className="mt-7 space-y-3">
                                    <div className="rounded-2xl border border-[#D9D9D9] bg-[#F5F5F5] p-4">
                                        <div className="font-bold text-[#553B1E] text-[13px]">
                                            {t(
                                                'contact.card1.title',
                                                'تنسيق راقٍ للمشروع',
                                                'Premium coordination',
                                            )}
                                        </div>
                                        <div
                                            className="text-[12px] text-[#2B1702]/70 mt-1"
                                            dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                        >
                                            {t(
                                                'contact.card1.line',
                                                'خطوات واضحة وتشطيب فاخر.',
                                                'Clear steps + premium finish.',
                                            )}
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-[#D9D9D9] bg-[#F5F5F5] p-4">
                                        <div className="font-bold text-[#553B1E] text-[13px]">
                                            {t(
                                                'contact.card2.title',
                                                'مناسب للمهندسين',
                                                'Engineer-friendly',
                                            )}
                                        </div>
                                        <div
                                            className="text-[12px] text-[#2B1702]/70 mt-1"
                                            dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                        >
                                            {t(
                                                'contact.card2.line',
                                                'تنفيذ يطابق الرسوم ونية التصميم.',
                                                'Matching execution to design intent.',
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!canSubmit) return;
                                    const waUrl = whatsappHref;
                                    form.post('/contact-requests', {
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            if (waCanUse && waUrl) {
                                                window.open(waUrl, '_blank', 'noopener,noreferrer');
                                            }
                                            form.reset();
                                        },
                                    });
                                }}
                                className="w-full"
                            >
                                {flash?.success ? (
                                    <div className="mb-4 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                                        {flash.success}
                                    </div>
                                ) : null}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className="block">
                                        <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                            {t('home.contact.form.nameLabel', 'اسمك', 'Your name')}
                                        </div>
                                        <input
                                            value={form.data.name}
                                            onChange={(e) => form.setData('name', e.target.value)}
                                            className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                            placeholder={t(
                                                'home.contact.form.namePlaceholder',
                                                'اكتب اسمك',
                                                'Your name',
                                            )}
                                        />
                                    </label>
                                    <label className="block">
                                        <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                            {t(
                                                'home.contact.form.propertyLabel',
                                                'نوع العقار',
                                                'Property type',
                                            )}
                                        </div>
                                        <select
                                            value={form.data.property_kind}
                                            onChange={(e) =>
                                                form.setData(
                                                    'property_kind',
                                                    e.target.value as PropertyKind,
                                                )
                                            }
                                            className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                        >
                                            <option value="apt">
                                                {t('home.contact.property.apt', 'شقة', 'Apartment')}
                                            </option>
                                            <option value="villa">
                                                {t('home.contact.property.villa', 'فيلا', 'Villa')}
                                            </option>
                                            <option value="any">
                                                {t(
                                                    'home.contact.property.any',
                                                    'أي مشروع',
                                                    'Any project',
                                                )}
                                            </option>
                                        </select>
                                    </label>
                                </div>

                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className="block">
                                        <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                            {t(
                                                'home.contact.form.phoneLabel',
                                                'رقم الموبايل',
                                                'Mobile number',
                                            )}
                                            <span className="text-destructive"> *</span>
                                        </div>
                                        <input
                                            type="tel"
                                            required
                                            value={form.data.phone}
                                            onChange={(e) => form.setData('phone', e.target.value)}
                                            className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                            placeholder={t(
                                                'home.contact.form.phonePlaceholder',
                                                '01xxxxxxxxx',
                                                '01xxxxxxxxx',
                                            )}
                                        />
                                        {form.errors.phone ? (
                                            <p className="mt-1 text-xs text-destructive">{form.errors.phone}</p>
                                        ) : null}
                                    </label>
                                    <label className="block">
                                        <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                            {t(
                                                'home.contact.form.emailLabel',
                                                'البريد الإلكتروني (اختياري)',
                                                'Email (optional)',
                                            )}
                                        </div>
                                        <input
                                            type="email"
                                            value={form.data.email}
                                            onChange={(e) => form.setData('email', e.target.value)}
                                            className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                            placeholder={t(
                                                'home.contact.form.emailPlaceholder',
                                                'name@example.com',
                                                'name@example.com',
                                            )}
                                        />
                                        {form.errors.email ? (
                                            <p className="mt-1 text-xs text-destructive">{form.errors.email}</p>
                                        ) : null}
                                    </label>
                                </div>

                                <div className="mt-4">
                                    <label className="block">
                                        <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                            {t(
                                                'home.contact.form.areaLabel',
                                                'المقاس/المساحة (اختياري)',
                                                'Size / area (optional)',
                                            )}
                                        </div>
                                        <input
                                            value={form.data.area}
                                            onChange={(e) => form.setData('area', e.target.value)}
                                            className="w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                            placeholder={t(
                                                'contact.form.areaPlaceholder',
                                                'مثال: 4x3 / عدد قطع / مساحة',
                                                'e.g. 4x3 m / units / area',
                                            )}
                                        />
                                    </label>
                                </div>

                                <div className="mt-4">
                                    <label className="block">
                                        <div className="text-[12px] font-semibold text-[#553B1E] mb-2">
                                            {t(
                                                'home.contact.form.detailsLabel',
                                                'تفاصيل سريعة (اختياري)',
                                                'Quick details (optional)',
                                            )}
                                        </div>
                                        <textarea
                                            value={form.data.message}
                                            onChange={(e) => form.setData('message', e.target.value)}
                                            className="min-h-[92px] w-full rounded-2xl border border-[#D9D9D9] bg-[#FDFDFC] px-4 py-3 outline-none focus:border-[#A67C52]/60"
                                            placeholder={t(
                                                'contact.form.detailsPlaceholder',
                                                'ذوقك؟ خامة مفضلة؟ توقيت التنفيذ؟',
                                                'Style? Preferred materials? Timeline?',
                                            )}
                                        />
                                    </label>
                                </div>

                                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                                    <button
                                        type="submit"
                                        disabled={!canSubmit || form.processing}
                                        className={[
                                            'rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200',
                                            canSubmit && !form.processing
                                                ? 'bg-[#A67C52] text-[#1B1B18] hover:-translate-y-[1px]'
                                                : 'bg-[#D9D9D9] text-[#5c5c5c] cursor-not-allowed',
                                        ].join(' ')}
                                    >
                                        {form.processing
                                            ? '…'
                                            : t(
                                                  'home.contact.submitRequest',
                                                  'إرسال الطلب',
                                                  'Send request',
                                              )}
                                    </button>

                                    <div className="text-[12px] text-[#2B1702]/70 leading-5" dir="ltr">
                                        <span>
                                            {t(
                                                'contact.form.hintLine1',
                                                'No backend needed.',
                                                'No backend needed.',
                                            )}
                                        </span>
                                        <br />
                                        <span>
                                            {t(
                                                'contact.form.hintLine2',
                                                'Message is prefilled.',
                                                'Message is prefilled.',
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {!waCanUse ? (
                                    <div className="mt-4 rounded-2xl border border-[#D9D9D9] bg-[#F5F5F5] p-4 text-[12px] text-[#2B1702]/80">
                                        {t(
                                            'contact.waConfigHint',
                                            'أضف رقم واتساب من لوحة التحكم: إعدادات الموقع.',
                                            'Add a WhatsApp number in the dashboard under Site configuration.',
                                        )}
                                    </div>
                                ) : null}
                            </form>
                        </div>
                    </div>
                </section>
            </MarketingLayout>
        </>
    );
}
