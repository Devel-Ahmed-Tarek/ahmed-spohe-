import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border border-sidebar-border/70 bg-background p-5">
                    <h1 className="text-xl font-semibold">Content Dashboard</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Manage your website text in Arabic and English from one place.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-sidebar-border/70 bg-background p-5">
                        <h2 className="text-lg font-semibold">Site configuration</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Company name, city, WhatsApp, logo, and social links for the marketing site.
                        </p>
                        <Link
                            href="/dashboard/site-configuration"
                            className="mt-4 inline-flex rounded-md border border-input px-4 py-2 text-sm font-medium"
                        >
                            Open Site configuration
                        </Link>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-background p-5">
                        <h2 className="text-lg font-semibold">Site Content CMS</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Add, update, search, and delete content keys used across your website.
                        </p>
                        <Link
                            href="/dashboard/site-content"
                            className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        >
                            Open Content Manager
                        </Link>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-background p-5">
                        <h2 className="text-lg font-semibold">Hero Slides</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Manage the homepage hero carousel images and bilingual text.
                        </p>
                        <Link
                            href="/dashboard/hero-slides"
                            className="mt-4 inline-flex rounded-md border border-input px-4 py-2 text-sm font-medium"
                        >
                            Open Hero Slides
                        </Link>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-background p-5">
                        <h2 className="text-lg font-semibold">Brands</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Add or reorder partner logos shown in the brands strip on the home page.
                        </p>
                        <Link
                            href="/dashboard/brands"
                            className="mt-4 inline-flex rounded-md border border-input px-4 py-2 text-sm font-medium"
                        >
                            Open Brands
                        </Link>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-background p-5">
                        <h2 className="text-lg font-semibold">Gallery</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Manage photos on the public gallery page.
                        </p>
                        <Link
                            href="/dashboard/gallery"
                            className="mt-4 inline-flex rounded-md border border-input px-4 py-2 text-sm font-medium"
                        >
                            Open Gallery
                        </Link>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-background p-5">
                        <h2 className="text-lg font-semibold">Our Services</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Add, edit, or remove service cards on the home page and the services page.
                        </p>
                        <Link
                            href="/dashboard/site-services"
                            className="mt-4 inline-flex rounded-md border border-input px-4 py-2 text-sm font-medium"
                        >
                            Open Our Services
                        </Link>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-background p-5">
                        <h2 className="text-lg font-semibold">Contact requests</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            View form submissions from the home and contact pages (mobile, email, notes).
                        </p>
                        <Link
                            href="/dashboard/contact-requests"
                            className="mt-4 inline-flex rounded-md border border-input px-4 py-2 text-sm font-medium"
                        >
                            Open requests
                        </Link>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-background p-5">
                        <h2 className="text-lg font-semibold">Public Website</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Preview your live pages and switch language from the website header.
                        </p>
                        <Link
                            href="/"
                            className="mt-4 inline-flex rounded-md border border-input px-4 py-2 text-sm font-medium"
                        >
                            Open Website
                        </Link>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
