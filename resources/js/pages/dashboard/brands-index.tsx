import { Head, useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type BrandRow = {
    id: number;
    name: string;
    logo: string;
    hint: string | null;
    sort_order: number;
    is_active: boolean;
};

type PageProps = {
    brands: BrandRow[];
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Brands', href: '/dashboard/brands' },
];

function BrandRowForm({ brand }: { brand: BrandRow }) {
    const fileRef = useRef<HTMLInputElement>(null);
    const form = useForm({
        name: brand.name,
        logo: null as File | null,
        logo_current: brand.logo,
        hint: brand.hint ?? '',
        sort_order: brand.sort_order,
        is_active: brand.is_active,
    });
    const deleteForm = useForm({});

    return (
        <form
            className="rounded-xl border border-sidebar-border/70 bg-background p-4"
            onSubmit={(e) => {
                e.preventDefault();
                form.post(`/dashboard/brands/${brand.id}`, {
                    preserveScroll: true,
                    forceFormData: true,
                    onSuccess: () => {
                        form.setData('logo', null);
                        if (fileRef.current) fileRef.current.value = '';
                    },
                });
            }}
        >
            <div className="grid gap-3 md:grid-cols-2">
                <input
                    value={form.data.name}
                    onChange={(e) => form.setData('name', e.target.value)}
                    placeholder="Brand name"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <img
                            src={brand.logo}
                            alt=""
                            className="h-12 w-24 shrink-0 rounded-md border border-input bg-muted object-contain p-1"
                        />
                        <label className="text-sm">
                            <span className="mb-1 block text-muted-foreground">Logo file</span>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.svg"
                                className="max-w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-primary file:px-2 file:py-1 file:text-xs file:font-medium file:text-primary-foreground"
                                onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    form.setData('logo', f ?? null);
                                }}
                            />
                        </label>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                        Leave empty to keep current logo. Max ~4MB. JPG, PNG, WebP, SVG, GIF.
                    </p>
                </div>
                <input
                    value={form.data.hint}
                    onChange={(e) => form.setData('hint', e.target.value)}
                    placeholder="Hint (e.g. Hardware)"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                    value={form.data.sort_order}
                    onChange={(e) => form.setData('sort_order', Number(e.target.value))}
                    type="number"
                    min={1}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                        deleteForm.delete(`/dashboard/brands/${brand.id}`, { preserveScroll: true })
                    }
                    className="rounded-md border border-destructive/30 px-3 py-1.5 text-sm text-destructive"
                >
                    Delete
                </button>
            </div>
        </form>
    );
}

export default function BrandsIndex({ brands }: PageProps) {
    const { props } = usePage<PageProps>();
    const createFileRef = useRef<HTMLInputElement>(null);
    const createForm = useForm({
        name: '',
        logo: null as File | null,
        hint: '',
        sort_order: 1,
        is_active: true,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brands" />
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
                        createForm.post('/dashboard/brands', {
                            preserveScroll: true,
                            forceFormData: true,
                            onSuccess: () => {
                                createForm.reset();
                                if (createFileRef.current) createFileRef.current.value = '';
                            },
                        });
                    }}
                >
                    <h2 className="text-lg font-semibold">Add New Brand</h2>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <input
                            value={createForm.data.name}
                            onChange={(e) => createForm.setData('name', e.target.value)}
                            placeholder="Brand name"
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <div>
                            <label className="text-sm">
                                <span className="mb-1 block text-muted-foreground">Logo file (required)</span>
                                <input
                                    ref={createFileRef}
                                    type="file"
                                    required
                                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.svg"
                                    className="w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-primary file:px-2 file:py-1 file:text-xs file:font-medium file:text-primary-foreground"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0];
                                        createForm.setData('logo', f ?? null);
                                    }}
                                />
                            </label>
                        </div>
                        <input
                            value={createForm.data.hint}
                            onChange={(e) => createForm.setData('hint', e.target.value)}
                            placeholder="Hint (optional)"
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <input
                            value={createForm.data.sort_order}
                            onChange={(e) => createForm.setData('sort_order', Number(e.target.value))}
                            type="number"
                            min={1}
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                            Save Brand
                        </button>
                    </div>
                </form>

                <div className="space-y-3">
                    {brands.map((brand) => (
                        <BrandRowForm key={brand.id} brand={brand} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
