export type EngineerShowcaseItem = {
    src: string;
    labelAr: string;
    labelEn: string;
};

/** عرض في الرئيسية وبداية معرض المهندسين */
export const engineerShowcaseHome: EngineerShowcaseItem[] = [
    {
        src: '/images/projects/kitchen-02.png',
        labelAr: 'تنسيق قبل التصنيع',
        labelEn: 'Pre-build coordination',
    },
    {
        src: '/images/projects/kitchen-04.png',
        labelAr: 'دقة المقاسات والتفاصيل',
        labelEn: 'Precise measurements',
    },
    {
        src: '/images/projects/kitchen-06.png',
        labelAr: 'تنفيذ مطابق للمخطط',
        labelEn: 'Drawing-accurate execution',
    },
    {
        src: '/images/projects/kitchen-08.png',
        labelAr: 'تركيب وتسليم منظم',
        labelEn: 'Organized installation',
    },
];

/** صفحة المهندسين — شبكة + شريط متحرك */
export const engineerGalleryExtended: EngineerShowcaseItem[] = [
    ...engineerShowcaseHome,
    {
        src: '/images/projects/kitchen-10.png',
        labelAr: 'خامات معتمدة',
        labelEn: 'Approved materials',
    },
    {
        src: '/images/projects/kitchen-11.png',
        labelAr: 'متابعة حتى التسليم',
        labelEn: 'Follow-up to handover',
    },
];
