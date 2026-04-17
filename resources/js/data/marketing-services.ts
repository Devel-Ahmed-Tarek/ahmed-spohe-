export type MarketingService = {
    /** موجود عند الجلب من لوحة التحكم */
    id?: number;
    ar: string;
    en: string;
    descAr: string;
    descEn: string;
    /** صورة توضيحية (مسارات تحت public/) */
    image: string;
    imageAlt: string;
};

/** نفس ترتيب صفحة الخدمات — صورة لكل خدمة من مشاريع المعرض */
export const marketingServices: MarketingService[] = [
    {
        ar: 'مطابخ مودرن فخم',
        en: 'Luxury Modern Kitchens',
        descAr: 'خطوط نظيفة + خامات مختارة + تشطيب راقي.',
        descEn: 'Clean lines with curated materials and premium finishing.',
        image: '/images/projects/kitchen-01.png',
        imageAlt: 'مطبخ مودرن فخم',
    },
    {
        ar: 'خشب فخم وتشطيبات دافية',
        en: 'Warm Wood Finishes',
        descAr: 'ألوان خشب ودهانات بتطلع “طبقة راقية”.',
        descEn: 'Wood tones & luxury coatings with a premium look.',
        image: '/images/projects/kitchen-03.png',
        imageAlt: 'مطبخ بخشب وتشطيب دافي',
    },
    {
        ar: 'لاكيه مات أو فلات',
        en: 'Matte Lacquer / Flat',
        descAr: 'شكل ناعم وراقي مع ثبات أعلى.',
        descEn: 'Smooth premium look with long-term durability.',
        image: '/images/projects/kitchen-05.png',
        imageAlt: 'واجهات لاكيه مات',
    },
    {
        ar: 'تصميم على المقاس',
        en: 'Made-to-Size',
        descAr: 'تفصيل دقيق بناءً على المقاسات والمخططات.',
        descEn: 'Exact build based on measurements & drawings.',
        image: '/images/projects/kitchen-07.png',
        imageAlt: 'تصميم مطبخ على المقاس',
    },
    {
        ar: 'تشطيب وتسليم منظم',
        en: 'Organized Delivery',
        descAr: 'متابعة للتركيب لحد التسليم النهائي.',
        descEn: 'On-site follow-up until final handover.',
        image: '/images/projects/kitchen-09.png',
        imageAlt: 'تركيب وتسليم مطبخ',
    },
    {
        ar: 'للمقاولين والمهندسين',
        en: 'For Engineers',
        descAr: 'تنسيق قبل التصنيع + تنفيذ مطابق.',
        descEn: 'Coordination before manufacturing and matching execution.',
        image: '/images/projects/kitchen-11.png',
        imageAlt: 'تنسيق مع المهندسين',
    },
];
