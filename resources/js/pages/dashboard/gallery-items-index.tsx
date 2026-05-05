import { Head, useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type GalleryCategoryRow = {
    id: number;
    name_ar: string;
    name_en: string;
    slug: string;
    sort_order: number;
    is_active: boolean;
    updated_at: string;
};

type GalleryRow = {
    id: number;
    gallery_category_id: number | null;
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
    categories: GalleryCategoryRow[];
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

function CategorySelect({
    categories,
    value,
    onChange,
    className,
}: {
    categories: GalleryCategoryRow[];
    value: string | number;
    onChange: (v: string) => void;
    className?: string;
}) {
    const v = value === '' || value === null || value === undefined ? '' : String(value);
    return (
        <label className={className}>
            <span className="mb-1 block text-muted-foreground">Gallery category (optional)</span>
            <select
                value={v}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
                <option value="">— No category —</option>
                {categories.map((c) => (
                    <option key={c.id} value={String(c.id)}>
                        {c.name_ar} / {c.name_en}
                    </option>
                ))}
            </select>
        </label>
    );
}

function CategoryRowForm({ item }: { item: GalleryCategoryRow }) {
    const form = useForm({
        name_ar: item.name_ar,
        name_en: item.name_en,
        slug: item.slug,
        sort_order: item.sort_order,
        is_active: item.is_active,
    });
    const deleteForm = useForm({});

    return (
        <form
            className="rounded-lg border border-sidebar-border/60 bg-muted/20 p-3"
            onSubmit={(e) => {
                e.preventDefault();
                form.post(`/dashboard/gallery/categories/${item.id}`, { preserveScroll: true });
            }}
        >
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                <input
                    value={form.data.name_ar}
                    onChange={(e) => form.setData('name_ar', e.target.value)}
                    placeholder="Arabic name"
                    required
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                    value={form.data.name_en}
                    onChange={(e) => form.setData('name_en', e.target.value)}
                    placeholder="English name"
                    required
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    dir="ltr"
                />
                <input
                    value={form.data.slug}
                    onChange={(e) => form.setData('slug', e.target.value)}
                    placeholder="slug (optional)"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm font-mono text-xs"
                    dir="ltr"
                />
                <input
                    value={form.data.sort_order}
                    onChange={(e) => form.setData('sort_order', Number(e.target.value))}
                    type="number"
                    min={0}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <label className="flex items-center gap-2 text-sm sm:col-span-2 lg:col-span-1">
                    <input
                        type="checkbox"
                        checked={form.data.is_active}
                        onChange={(e) => form.setData('is_active', e.target.checked)}
                    />
                    Active
                </label>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
                <button
                    type="submit"
                    disabled={form.processing}
                    className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground"
                >
                    Save
                </button>
                <button
                    type="button"
                    disabled={deleteForm.processing}
                    onClick={() =>
                        deleteForm.delete(`/dashboard/gallery/categories/${item.id}`, {
                            preserveScroll: true,
                        })
                    }
                    className="rounded-md border border-destructive/30 px-2.5 py-1 text-xs text-destructive"
                >
                    Delete
                </button>
            </div>
        </form>
    );
}

function AddCategoryForm() {
    const form = useForm({
        name_ar: '',
        name_en: '',
        slug: '',
        sort_order: 0,
        is_active: true,
    });

    return (
        <form
            className="rounded-xl border border-dashed border-sidebar-border/80 bg-muted/10 p-4"
            onSubmit={(e) => {
                e.preventDefault();
                form.post('/dashboard/gallery/categories', {
                    preserveScroll: true,
                    onSuccess: () => form.reset(),
                });
            }}
        >
            <h3 className="text-sm font-semibold">Add category</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
                <input
                    value={form.data.name_ar}
                    onChange={(e) => form.setData('name_ar', e.target.value)}
                    placeholder="Arabic name *"
                    required
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                    value={form.data.name_en}
                    onChange={(e) => form.setData('name_en', e.target.value)}
                    placeholder="English name *"
                    required
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    dir="ltr"
                />
                <input
                    value={form.data.slug}
                    onChange={(e) => form.setData('slug', e.target.value)}
                    placeholder="slug (auto if empty)"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm font-mono text-xs"
                    dir="ltr"
                />
                <input
                    value={form.data.sort_order}
                    onChange={(e) => form.setData('sort_order', Number(e.target.value))}
                    type="number"
                    min={0}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={form.data.is_active}
                        onChange={(e) => form.setData('is_active', e.target.checked)}
                    />
                    Active
                </label>
                <button
                    type="submit"
                    disabled={form.processing}
                    className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                >
                    Add category
                </button>
            </div>
        </form>
    );
}

function GalleryRowForm({
    item,
    categories,
}: {
    item: GalleryRow;
    categories: GalleryCategoryRow[];
}) {
    const fileRef = useRef<HTMLInputElement>(null);
    const form = useForm({
        image: null as File | null,
        image_current: item.image,
        gallery_category_id:
            item.gallery_category_id != null ? String(item.gallery_category_id) : '',
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
                <CategorySelect
                    categories={categories}
                    value={form.data.gallery_category_id}
                    onChange={(v) => form.setData('gallery_category_id', v)}
                    className="md:col-span-2"
                />
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

export default function GalleryItemsIndex({ items, categories }: PageProps) {
    const { props } = usePage<PageProps>();
    const createFileRef = useRef<HTMLInputElement>(null);
    const createForm = useForm({
        image: null as File | null,
        gallery_category_id: '',
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
                        <strong>Categories:</strong> create types (Modern, Classic, etc.). Each gallery image can
                        belong to one category. Visitors filter the public gallery by category.
                    </p>
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

                <section className="space-y-4 rounded-xl border border-sidebar-border/70 bg-background/50 p-4">
                    <h2 className="text-lg font-semibold">Gallery categories</h2>
                    <AddCategoryForm />
                    <div className="space-y-2">
                        {categories.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No categories yet — add one above, then assign images below.
                            </p>
                        ) : (
                            categories.map((c) => <CategoryRowForm key={c.id} item={c} />)
                        )}
                    </div>
                </section>

                <form
                    className="rounded-xl border border-sidebar-border/70 bg-background p-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        createForm.post('/dashboard/gallery', {
                            preserveScroll: true,
                            forceFormData: true,
                            onSuccess: () => {
                                createForm.reset();
                                createForm.setData('sort_order', 1);
                                createForm.setData('gallery_category_id', '');
                                createForm.setData('is_active', true);
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
                        <CategorySelect
                            categories={categories}
                            value={createForm.data.gallery_category_id}
                            onChange={(v) => createForm.setData('gallery_category_id', v)}
                            className="md:col-span-2"
                        />
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
                        <GalleryRowForm key={`${item.id}-${item.updated_at}`} item={item} categories={categories} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
