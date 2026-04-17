import { Head, useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type GalleryRow = {
    id: number;
    image: string;
    label_ar: string | null;
    label_en: string | null;
    tagline_ar: string | null;
    tagline_en: string | null;
    sort_order: number;
    home_position: number | null;
    engineer_home_position: number | null;
    is_active: boolean;
    updated_at: string;
};

type PageProps = {
    items: GalleryRow[];
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Gallery', href: '/dashboard/gallery' },
];

function HomeSpotlightSelect({
    value,
    onChange,
}: {
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <label className="block text-sm">
            <span className="mb-1 block text-muted-foreground">
                ظهور في الرئيسية — Explore designs (1–6)
            </span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
                <option value="">— لا يظهر في قسم الرئيسية —</option>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={String(n)}>
                        خانة {n} (ترتيب الظهور في &quot;Explore our kitchen designs&quot;)
                    </option>
                ))}
            </select>
        </label>
    );
}

function EngineerSpotlightSelect({
    value,
    onChange,
}: {
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <label className="block text-sm md:col-span-2">
            <span className="mb-1 block text-muted-foreground">
                ظهور في الرئيسية — قسم «للمهندسين عندنا» (1–4)
            </span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
                <option value="">— لا يظهر في قسم المهندسين —</option>
                {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={String(n)}>
                        خانة {n} (ترتيب البطاقات الأربع تحت «للمهندسين عندنا»)
                    </option>
                ))}
            </select>
        </label>
    );
}

function GalleryRowForm({ item }: { item: GalleryRow }) {
    const fileRef = useRef<HTMLInputElement>(null);
    const form = useForm({
        image: null as File | null,
        image_current: item.image,
        label_ar: item.label_ar ?? '',
        label_en: item.label_en ?? '',
        tagline_ar: item.tagline_ar ?? '',
        tagline_en: item.tagline_en ?? '',
        sort_order: item.sort_order,
        home_position: item.home_position != null ? String(item.home_position) : '',
        engineer_home_position:
            item.engineer_home_position != null ? String(item.engineer_home_position) : '',
        is_active: item.is_active,
    });
    const deleteForm = useForm({});

    return (
        <form
            className="rounded-xl border border-sidebar-border/70 bg-background p-4"
            onSubmit={(e) => {
                e.preventDefault();
                form.post(`/dashboard/gallery/${item.id}`, {
                    preserveScroll: true,
                    forceFormData: true,
                    onSuccess: () => {
                        form.setData('image', null);
                        if (fileRef.current) fileRef.current.value = '';
                    },
                });
            }}
        >
            <div className="grid gap-3 md:grid-cols-2">
                <div className="flex flex-col gap-2 md:col-span-2">
                    <div className="flex flex-wrap items-start gap-3">
                        <img
                            src={item.image}
                            alt=""
                            className="h-28 w-44 shrink-0 rounded-md border border-input bg-muted object-cover"
                        />
                        <label className="text-sm">
                            <span className="mb-1 block text-muted-foreground">Image file</span>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                className="max-w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-primary file:px-2 file:py-1 file:text-xs file:font-medium file:text-primary-foreground"
                                onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    form.setData('image', f ?? null);
                                }}
                            />
                        </label>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                        Leave empty to keep current file. Max ~8MB.
                    </p>
                </div>
                <input
                    value={form.data.label_ar}
                    onChange={(e) => form.setData('label_ar', e.target.value)}
                    placeholder="Arabic title (optional)"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                    value={form.data.label_en}
                    onChange={(e) => form.setData('label_en', e.target.value)}
                    placeholder="English title (optional, e.g. Kitchen Project 01)"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                    value={form.data.tagline_ar}
                    onChange={(e) => form.setData('tagline_ar', e.target.value)}
                    placeholder="Arabic tagline (optional)"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                    value={form.data.tagline_en}
                    onChange={(e) => form.setData('tagline_en', e.target.value)}
                    placeholder="English tagline (optional)"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    dir="ltr"
                />
                <input
                    value={form.data.sort_order}
                    onChange={(e) => form.setData('sort_order', Number(e.target.value))}
                    type="number"
                    min={1}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <HomeSpotlightSelect
                    value={form.data.home_position}
                    onChange={(v) => form.setData('home_position', v)}
                />
                <EngineerSpotlightSelect
                    value={form.data.engineer_home_position}
                    onChange={(v) => form.setData('engineer_home_position', v)}
                />
            </div>
            <label className="mt-3 inline-flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={form.data.is_active}
                    onChange={(e) => form.setData('is_active', e.target.checked)}
                />
                Active (shown on /gallery)
            </label>
            <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                    type="submit"
                    disabled={form.processing}
                    className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                >
                    Update
                </button>
                <button
                    type="button"
                    disabled={deleteForm.processing}
                    onClick={() => deleteForm.delete(`/dashboard/gallery/${item.id}`, { preserveScroll: true })}
                    className="rounded-md border border-destructive/30 px-3 py-1.5 text-sm text-destructive"
                >
                    Delete
                </button>
            </div>
        </form>
    );
}

export default function GalleryItemsIndex({ items }: PageProps) {
    const { props } = usePage<PageProps>();
    const createFileRef = useRef<HTMLInputElement>(null);
    const createForm = useForm({
        image: null as File | null,
        label_ar: '',
        label_en: '',
        tagline_ar: '',
        tagline_en: '',
        sort_order: 1,
        home_position: '',
        engineer_home_position: '',
        is_active: true,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery" />
            <div className="space-y-6 rounded-xl p-4">
                {props.flash?.success ? (
                    <div className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                        {props.flash.success}
                    </div>
                ) : null}

                <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                        صور المعرض العامة: تظهر في <strong>/gallery</strong> حسب ترتيب العرض. العناوين الفارغة ترجع
                        لنمط Kitchen Project 01.
                    </p>
                    <p>
                        قسم <strong>Explore our kitchen designs</strong> في الصفحة الرئيسية: اختر لكل صورة خانة من
                        1–6 (كل خانة = مكان واحد في الشبكة؛ لو اخترت نفس الرقم لصورتين الأقدم يُلغى تلقائيًا).
                    </p>
                    <p>
                        قسم <strong>للمهندسين عندنا</strong> في الرئيسية: خانة منفصلة 1–4 للبطاقات الأربع؛ العنوان
                        العربي/الإنجليزي من حقول العنوان (أو السطر الثاني من الوصف إن احتجت).
                    </p>
                </div>

                <form
                    className="rounded-xl border border-sidebar-border/70 bg-background p-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        createForm.post('/dashboard/gallery', {
                            preserveScroll: true,
                            forceFormData: true,
                            onSuccess: () => {
                                createForm.reset();
                                if (createFileRef.current) createFileRef.current.value = '';
                            },
                        });
                    }}
                >
                    <h2 className="text-lg font-semibold">Add gallery image</h2>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="text-sm">
                                <span className="mb-1 block text-muted-foreground">Image (required)</span>
                                <input
                                    ref={createFileRef}
                                    type="file"
                                    required
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    className="w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-primary file:px-2 file:py-1 file:text-xs file:font-medium file:text-primary-foreground"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0];
                                        createForm.setData('image', f ?? null);
                                    }}
                                />
                            </label>
                        </div>
                        <input
                            value={createForm.data.label_ar}
                            onChange={(e) => createForm.setData('label_ar', e.target.value)}
                            placeholder="Arabic title (optional)"
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <input
                            value={createForm.data.label_en}
                            onChange={(e) => createForm.setData('label_en', e.target.value)}
                            placeholder="English title (optional)"
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <input
                            value={createForm.data.tagline_ar}
                            onChange={(e) => createForm.setData('tagline_ar', e.target.value)}
                            placeholder="Arabic tagline (optional)"
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <input
                            value={createForm.data.tagline_en}
                            onChange={(e) => createForm.setData('tagline_en', e.target.value)}
                            placeholder="English tagline (optional)"
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                            dir="ltr"
                        />
                        <input
                            value={createForm.data.sort_order}
                            onChange={(e) => createForm.setData('sort_order', Number(e.target.value))}
                            type="number"
                            min={1}
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <HomeSpotlightSelect
                            value={createForm.data.home_position}
                            onChange={(v) => createForm.setData('home_position', v)}
                        />
                        <EngineerSpotlightSelect
                            value={createForm.data.engineer_home_position}
                            onChange={(v) => createForm.setData('engineer_home_position', v)}
                        />
                    </div>
                    <label className="mt-3 inline-flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={createForm.data.is_active}
                            onChange={(e) => createForm.setData('is_active', e.target.checked)}
                        />
                        Active
                    </label>
                    <div className="mt-3">
                        <button
                            type="submit"
                            disabled={createForm.processing}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        >
                            Save
                        </button>
                    </div>
                </form>

                <div className="space-y-3">
                    {items.map((item) => (
                        <GalleryRowForm key={`${item.id}-${item.updated_at}`} item={item} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
