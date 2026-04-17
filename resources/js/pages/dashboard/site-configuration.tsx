import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Settings = {
    company_name: string;
    city_name: string;
    whatsapp_number: string;
    logo: string;
    facebook_url: string;
    instagram_url: string;
    youtube_url: string;
    tiktok_url: string;
    linkedin_url: string;
};

type PageProps = {
    settings: Settings;
    flash?: { success?: string };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Site configuration', href: '/dashboard/site-configuration' },
];

export default function SiteConfiguration({ settings }: PageProps) {
    const { props } = usePage<PageProps>();
    const fileRef = useRef<HTMLInputElement>(null);
    const form = useForm({
        company_name: settings.company_name ?? '',
        city_name: settings.city_name ?? '',
        whatsapp_number: settings.whatsapp_number ?? '',
        logo: null as File | null,
        logo_current: settings.logo ?? '',
        facebook_url: settings.facebook_url ?? '',
        instagram_url: settings.instagram_url ?? '',
        youtube_url: settings.youtube_url ?? '',
        tiktok_url: settings.tiktok_url ?? '',
        linkedin_url: settings.linkedin_url ?? '',
    });

    useEffect(() => {
        form.setData('logo_current', settings.logo ?? '');
    }, [settings.logo]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site configuration" />
            <div className="mx-auto max-w-3xl space-y-6 rounded-xl p-4">
                <div>
                    <h1 className="text-xl font-semibold">Site configuration</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Company name, city, WhatsApp, logo, and social links used across the marketing site.
                    </p>
                </div>

                {props.flash?.success ? (
                    <div className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                        {props.flash.success}
                    </div>
                ) : null}

                <form
                    className="space-y-5 rounded-xl border border-sidebar-border/70 bg-background p-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.post('/dashboard/site-configuration', {
                            preserveScroll: true,
                            forceFormData: true,
                            onSuccess: () => {
                                form.setData('logo', null);
                                if (fileRef.current) fileRef.current.value = '';
                            },
                        });
                    }}
                >
                    <h2 className="text-lg font-semibold">Basics</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <label className="block text-sm">
                            <span className="mb-1 block text-muted-foreground">Company name</span>
                            <input
                                value={form.data.company_name}
                                onChange={(e) => form.setData('company_name', e.target.value)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                            />
                        </label>
                        <label className="block text-sm">
                            <span className="mb-1 block text-muted-foreground">City (optional)</span>
                            <input
                                value={form.data.city_name}
                                onChange={(e) => form.setData('city_name', e.target.value)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                            />
                        </label>
                        <label className="block text-sm sm:col-span-2">
                            <span className="mb-1 block text-muted-foreground">
                                WhatsApp number (digits; country code without +)
                            </span>
                            <input
                                value={form.data.whatsapp_number}
                                onChange={(e) => form.setData('whatsapp_number', e.target.value)}
                                placeholder="2010..."
                                className="w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm"
                                dir="ltr"
                            />
                        </label>
                    </div>

                    <div className="border-t border-sidebar-border/60 pt-5">
                        <h2 className="text-lg font-semibold">Logo</h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Shown in the site header. Square or wide PNG/WebP/SVG recommended.
                        </p>
                        <div className="mt-3 flex flex-wrap items-end gap-4">
                            {form.data.logo_current ? (
                                <img
                                    src={form.data.logo_current}
                                    alt=""
                                    className="h-16 w-16 rounded-xl border border-input object-contain bg-muted"
                                />
                            ) : null}
                            <div>
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/svg+xml"
                                    className="text-sm file:mr-2 file:rounded file:border-0 file:bg-primary file:px-2 file:py-1 file:text-xs file:font-medium file:text-primary-foreground"
                                    onChange={(e) => form.setData('logo', e.target.files?.[0] ?? null)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-sidebar-border/60 pt-5">
                        <h2 className="text-lg font-semibold">Social & links</h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Full URLs (https://…). Leave empty to hide an icon in the footer.
                        </p>
                        <div className="mt-3 grid gap-3">
                            {(
                                [
                                    ['facebook_url', 'Facebook'],
                                    ['instagram_url', 'Instagram'],
                                    ['youtube_url', 'YouTube'],
                                    ['tiktok_url', 'TikTok'],
                                    ['linkedin_url', 'LinkedIn'],
                                ] as const
                            ).map(([key, label]) => (
                                <label key={key} className="block text-sm">
                                    <span className="mb-1 block text-muted-foreground">{label}</span>
                                    <input
                                        value={form.data[key]}
                                        onChange={(e) => form.setData(key, e.target.value)}
                                        placeholder="https://"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                                        dir="ltr"
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={form.processing}
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    >
                        Save
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
