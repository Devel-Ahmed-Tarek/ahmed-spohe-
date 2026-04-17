<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SiteContentController extends Controller
{
    public function index(): Response
    {
        $contents = SiteContent::query()
            ->orderBy('group')
            ->orderBy('key')
            ->get(['id', 'group', 'key', 'value_ar', 'value_en']);

        return Inertia::render('dashboard/site-content-index', [
            'contents' => $contents,
            'stats' => [
                'total' => $contents->count(),
                'translated' => $contents->filter(
                    fn (SiteContent $item): bool => filled($item->value_ar) && filled($item->value_en)
                )->count(),
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'group' => ['required', 'string', 'max:100'],
            'key' => ['required', 'string', 'max:150', 'unique:site_contents,key'],
            'value_ar' => ['nullable', 'string'],
            'value_en' => ['nullable', 'string'],
        ]);

        SiteContent::query()->create($validated);

        return back()->with('success', 'Content item created.');
    }

    public function update(Request $request, SiteContent $siteContent): RedirectResponse
    {
        $validated = $request->validate([
            'group' => ['required', 'string', 'max:100'],
            'key' => ['required', 'string', 'max:150', 'unique:site_contents,key,'.$siteContent->id],
            'value_ar' => ['nullable', 'string'],
            'value_en' => ['nullable', 'string'],
        ]);

        $siteContent->update($validated);

        return back()->with('success', 'Content item updated.');
    }

    public function destroy(SiteContent $siteContent): RedirectResponse
    {
        $siteContent->delete();

        return back()->with('success', 'Content item deleted.');
    }

    public function seedDefaults(): RedirectResponse
    {
        foreach ($this->defaultContent() as $item) {
            SiteContent::query()->updateOrCreate(
                ['key' => $item['key']],
                [
                    'group' => $item['group'],
                    'value_ar' => $item['value_ar'],
                    'value_en' => $item['value_en'],
                ],
            );
        }

        return back()->with('success', 'Default content keys were synced.');
    }

    /**
     * @return list<array{group:string,key:string,value_ar:string,value_en:string}>
     */
    private function defaultContent(): array
    {
        return config('site_content_defaults');
    }
}
