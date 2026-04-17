import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useDeferredValue, useMemo, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import type { BreadcrumbItem } from '@/types';

type SiteContentItem = {
    id: number;
    group: string;
    key: string;
    value_ar: string | null;
    value_en: string | null;
};

type PageProps = {
    contents: SiteContentItem[];
    stats: {
        total: number;
        translated: number;
    };
    flash?: {
        success?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Site Content', href: '/dashboard/site-content' },
];

function ContentItemRow({ item }: { item: SiteContentItem }) {
    const form = useForm({
        group: item.group,
        key: item.key,
        value_ar: item.value_ar ?? '',
        value_en: item.value_en ?? '',
    });
    const deleteForm = useForm({});

    return (
        <form
            id={`site-content-${item.id}`}
            className="scroll-mt-28 rounded-xl border border-sidebar-border/70 bg-background p-4"
            onSubmit={(e) => {
                e.preventDefault();
                form.put(`/dashboard/site-content/${item.id}`, {
                    preserveScroll: true,
                });
            }}
        >
            <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="font-mono font-medium text-foreground">{item.key}</span>
                <span className="rounded-md bg-muted px-2 py-0.5">{item.group}</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
                <input
                    value={form.data.group}
                    onChange={(e) => form.setData('group', e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    aria-label="Group"
                />
                <input
                    value={form.data.key}
                    onChange={(e) => form.setData('key', e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    aria-label="Key"
                />
                <textarea
                    value={form.data.value_ar}
                    onChange={(e) => form.setData('value_ar', e.target.value)}
                    className="min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <textarea
                    value={form.data.value_en}
                    onChange={(e) => form.setData('value_en', e.target.value)}
                    className="min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
            </div>
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
                        deleteForm.delete(`/dashboard/site-content/${item.id}`, {
                            preserveScroll: true,
                        })
                    }
                    className="rounded-md border border-destructive/30 px-3 py-1.5 text-sm text-destructive"
                >
                    Delete
                </button>
            </div>
        </form>
    );
}

export default function SiteContentIndex({ contents }: PageProps) {
    const { props } = usePage<PageProps>();
    const [search, setSearch] = useState('');
    const [groupFilter, setGroupFilter] = useState<string>('all');
    const deferredSearch = useDeferredValue(search);
    const createForm = useForm({
        group: 'general',
        key: '',
        value_ar: '',
        value_en: '',
    });
    const seedForm = useForm({});

    const groups = useMemo(() => {
        const set = new Set(contents.map((c) => c.group).filter(Boolean));
        return [...set].sort((a, b) => a.localeCompare(b));
    }, [contents]);

    const filteredContents = useMemo(() => {
        let rows = contents;
        if (groupFilter !== 'all') {
            rows = rows.filter((item) => item.group === groupFilter);
        }
        const term = deferredSearch.trim().toLowerCase();
        if (!term) return rows;

        return rows.filter((item) =>
            [item.group, item.key, item.value_ar ?? '', item.value_en ?? '']
                .join('\n')
                .toLowerCase()
                .includes(term),
        );
    }, [contents, deferredSearch, groupFilter]);

    const total = contents.length;
    const shown = filteredContents.length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site Content" />
            <div className="space-y-6 rounded-xl p-4">
                <div>
                    <h1 className="text-xl font-semibold">Site Content</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Search and filter keys to edit Arabic and English copy used across the site.
                    </p>
                </div>

                <div className="sticky top-0 z-10 -mx-4 border-b border-sidebar-border/60 bg-background/95 px-4 pb-4 pt-1 backdrop-blur supports-[backdrop-filter]:bg-background/85">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="relative min-w-0 flex-1">
                            <Search
                                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                                aria-hidden
                            />
                            <Input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by group, key, or any Arabic / English text…"
                                className="h-10 pl-9 pr-10"
                                autoComplete="off"
                                aria-label="Search content"
                            />
                            {search ? (
                                <button
                                    type="button"
                                    onClick={() => setSearch('')}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                                    aria-label="Clear search"
                                >
                                    <X className="size-4" />
                                </button>
                            ) : null}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <label className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="whitespace-nowrap">Group</span>
                                <select
                                    value={groupFilter}
                                    onChange={(e) => setGroupFilter(e.target.value)}
                                    className="h-10 min-w-[10rem] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                >
                                    <option value="all">All groups</option>
                                    {groups.map((g) => (
                                        <option key={g} value={g}>
                                            {g}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <span className="text-sm tabular-nums text-muted-foreground">
                                {shown === total ? (
                                    <span>{total} keys</span>
                                ) : (
                                    <span>
                                        Showing <span className="font-medium text-foreground">{shown}</span> of{' '}
                                        {total}
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-sidebar-border/70 bg-background p-4">
                        <p className="text-xs text-muted-foreground">Total keys</p>
                        <p className="mt-2 text-2xl font-bold">{props.stats?.total ?? 0}</p>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 bg-background p-4">
                        <p className="text-xs text-muted-foreground">Translated (AR + EN)</p>
                        <p className="mt-2 text-2xl font-bold">{props.stats?.translated ?? 0}</p>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 bg-background p-4">
                        <p className="text-xs text-muted-foreground">Quick actions</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <button
                                type="button"
                                disabled={seedForm.processing}
                                onClick={() =>
                                    seedForm.post('/dashboard/site-content/seed-defaults', {
                                        preserveScroll: true,
                                    })
                                }
                                className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                            >
                                Seed default keys
                            </button>
                            <Link
                                href="/"
                                className="rounded-md border border-input px-3 py-1.5 text-sm"
                            >
                                Open website
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 bg-background p-4">
                    <h2 className="text-lg font-semibold">Add New Content Key</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Add Arabic and English values that can be used across pages.
                    </p>
                    <form
                        className="mt-4 grid gap-3 md:grid-cols-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            createForm.post('/dashboard/site-content', {
                                preserveScroll: true,
                                onSuccess: () => createForm.reset('key', 'value_ar', 'value_en'),
                            });
                        }}
                    >
                        <input
                            placeholder="Group (example: nav, home, footer)"
                            value={createForm.data.group}
                            onChange={(e) => createForm.setData('group', e.target.value)}
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <input
                            placeholder="Unique key (example: nav.home)"
                            value={createForm.data.key}
                            onChange={(e) => createForm.setData('key', e.target.value)}
                            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <textarea
                            placeholder="Arabic value"
                            value={createForm.data.value_ar}
                            onChange={(e) => createForm.setData('value_ar', e.target.value)}
                            className="min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <textarea
                            placeholder="English value"
                            value={createForm.data.value_en}
                            onChange={(e) => createForm.setData('value_en', e.target.value)}
                            className="min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <button
                            type="submit"
                            disabled={createForm.processing}
                            className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        >
                            Save
                        </button>
                    </form>
                </div>

                {props.flash?.success ? (
                    <div className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                        {props.flash.success}
                    </div>
                ) : null}

                <div className="space-y-3">
                    {filteredContents.map((item) => <ContentItemRow key={item.id} item={item} />)}
                    {filteredContents.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-sidebar-border/70 bg-background p-8 text-center text-sm text-muted-foreground">
                            {total === 0
                                ? 'No content keys yet. Use “Seed default keys” above to load defaults.'
                                : 'No keys match your search or group filter. Try another term or choose “All groups”.'}
                        </div>
                    ) : null}
                </div>
            </div>
        </AppLayout>
    );
}
