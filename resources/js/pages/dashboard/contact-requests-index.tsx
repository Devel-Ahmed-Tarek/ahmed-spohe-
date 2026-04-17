import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type ContactRequestRow = {
    id: number;
    name: string | null;
    phone: string;
    email: string | null;
    property_kind: string;
    area: string | null;
    message: string | null;
    source: string;
    created_at: string;
};

type PageProps = {
    requests: ContactRequestRow[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Contact requests', href: '/dashboard/contact-requests' },
];

export default function ContactRequestsIndex({ requests }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact requests" />
            <div className="space-y-6 rounded-xl p-4">
                <div>
                    <h1 className="text-xl font-semibold">Contact requests</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Submissions from the home and contact forms. Mobile is required; email is optional.
                    </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 bg-background">
                    <table className="w-full min-w-[720px] text-left text-sm">
                        <thead className="border-b border-sidebar-border/70 bg-muted/40">
                            <tr>
                                <th className="px-3 py-2 font-medium">Date</th>
                                <th className="px-3 py-2 font-medium">Source</th>
                                <th className="px-3 py-2 font-medium">Name</th>
                                <th className="px-3 py-2 font-medium">Phone</th>
                                <th className="px-3 py-2 font-medium">Email</th>
                                <th className="px-3 py-2 font-medium">Property</th>
                                <th className="px-3 py-2 font-medium">Area</th>
                                <th className="px-3 py-2 font-medium">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-3 py-8 text-center text-muted-foreground">
                                        No requests yet.
                                    </td>
                                </tr>
                            ) : (
                                requests.map((row) => (
                                    <tr key={row.id} className="border-b border-sidebar-border/40 align-top">
                                        <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">
                                            {row.created_at
                                                ? new Date(row.created_at).toLocaleString()
                                                : '—'}
                                        </td>
                                        <td className="px-3 py-2">{row.source}</td>
                                        <td className="px-3 py-2">{row.name || '—'}</td>
                                        <td className="px-3 py-2 font-mono text-xs">{row.phone}</td>
                                        <td className="px-3 py-2 break-all">{row.email || '—'}</td>
                                        <td className="px-3 py-2">{row.property_kind}</td>
                                        <td className="px-3 py-2 max-w-[140px] truncate" title={row.area ?? ''}>
                                            {row.area || '—'}
                                        </td>
                                        <td className="px-3 py-2 max-w-[240px] text-xs" title={row.message ?? ''}>
                                            {row.message || '—'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
