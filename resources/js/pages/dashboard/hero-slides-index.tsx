import { Head, useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Slide = {
    id: number;
    image: string;
    title_ar: string;
    title_en: string | null;
    subtitle_ar: string | null;
    subtitle_en: string | null;
    sort_order: number;
    is_active: boolean;
    updated_at: string;
};

type PageProps = {
    slides: Slide[];
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Hero Slides', href: '/dashboard/hero-slides' },
];

function SlideRow({ slide }: { slide: Slide }) {
    const fileRef = useRef<HTMLInputElement>(null);
    const form = useForm({
        image: null as File | null,
        image_current: slide.image,
        title_ar: slide.title_ar,
        title_en: slide.title_en ?? '',
        subtitle_ar: slide.subtitle_ar ?? '',
        subtitle_en: slide.subtitle_en ?? '',
        sort_order: slide.sort_order,
        is_active: slide.is_active,
    });
    const deleteForm = useForm({});

    return (
        <form
            className="rounded-xl border border-sidebar-border/70 bg-background p-4"
            onSubmit={(e) => {
                e.preventDefault();
                form.post(`/dashboard/hero-slides/${slide.id}`, {
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
                            src={slide.image}
                            alt=""
                            className="h-24 w-40 shrink-0 rounded-md border border-input bg-muted object-cover"
                        />
                        <label className="text-sm">
                            <span className="mb-1 block text-muted-foreground">Background image</span>
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
                        Leave empty to keep current image. Max ~8MB. JPG, PNG, WebP, GIF.
                    </p>
                </div>
                <input
                    value={form.data.sort_order}
                    onChange={(e) => form.setData('sort_order', Number(e.target.value))}
                    type="number"
                    min={1}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                    value={form.data.title_ar}
                    onChange={(e) => form.setData('title_ar', e.target.value)}
                    placeholder="Arabic title"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                    value={form.data.title_en}
                    onChange={(e) => form.setData('title_en', e.target.value)}
                    placeholder="English title"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <textarea
                    value={form.data.subtitle_ar}
                    onChange={(e) => form.setData('subtitle_ar', e.target.value)}
                    placeholder="Arabic subtitle"
                    className="min-h-20 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <textarea
                    value={form.data.subtitle_en}
                    onChange={(e) => form.setData('subtitle_en', e.target.value)}
                    placeholder="English subtitle"
                    className="min-h-20 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
            </div>

            <label className="mt-3 inline-flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={form.data.is_active}
                    onChange={(e) => form.setData('is_active', e.target.checked)}
                />
                Active
            </label>

            <div className="mt-3 flex items-center gap-2">
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
                    onClick={() =>
                        deleteForm.delete(`/dashboard/hero-slides/${slide.id}`, { preserveScroll: true })
                    }
                    className="rounded-md border border-destructive/30 px-3 py-1.5 text-sm text-destructive"
                >
                    Delete
                </button>
            </div>
        </form>
    );
}

export default function HeroSlidesIndex({ slides }: PageProps) {
    const { props } = usePage<PageProps>();
    const createFileRef = useRef<HTMLInputElement>(null);
    const createForm = useForm({
        image: null as File | null,
        title_ar: '',
        title_en: '',
        subtitle_ar: '',
        subtitle_en: '',
        sort_order: 1,
        is_active: true,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hero Slides" />
            <div className="space-y-6 rounded-xl p-4">
                {props.flash?.success ? (
                    <div className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                        {props.flash.success}
                    </div>
                ) : null}

                <form
                    className="rounded-xl border border-sidebar-border/70 bg-background p-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        createForm.post('/dashboard/hero-slides', {
                            preserveScroll: true,
                            forceFormData: true,
                            onSuccess: () => {
                                createForm.reset();
                                if (createFileRef.current) createFileRef.current.value = '';
                            },
                        });
                    }}
                >
                    <h2 className="text-lg font-semibold">Add Hero Slide</h2>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="text-sm">
                                <span className="mb-1 block text-muted-foreground">Background image (required)</span>
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
                            <p className="mt-1 text-[11px] text-muted-foreground">
                                Stored under <code className="rounded bg-muted px-1">storage/app/public/hero-slides</code>{' '}
                                — max ~8MB. JPG, PNG, WebP, GIF.
                            </p>
                        </div>
                        <input
                            value={createForm.data.sort_order}
                            onChange={(e) => createForm.setData('sort_order', Number(e.target.value))}
                            type="number"
                            min={1}
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <input
                            value={createForm.data.title_ar}
                            onChange={(e) => createForm.setData('title_ar', e.target.value)}
                            placeholder="Arabic title"
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <input
                            value={createForm.data.title_en}
                            onChange={(e) => createForm.setData('title_en', e.target.value)}
                            placeholder="English title"
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <textarea
                            value={createForm.data.subtitle_ar}
                            onChange={(e) => createForm.setData('subtitle_ar', e.target.value)}
                            placeholder="Arabic subtitle"
                            className="min-h-20 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <textarea
                            value={createForm.data.subtitle_en}
                            onChange={(e) => createForm.setData('subtitle_en', e.target.value)}
                            placeholder="English subtitle"
                            className="min-h-20 rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                            Save Slide
                        </button>
                    </div>
                </form>

                <div className="space-y-3">
                    {slides.map((slide) => (
                        <SlideRow key={`${slide.id}-${slide.updated_at}`} slide={slide} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
