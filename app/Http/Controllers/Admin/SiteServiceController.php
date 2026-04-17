<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SiteServiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/site-services-index', [
            'services' => SiteService::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'image' => ['required', 'file', 'max:8192', 'mimes:jpeg,jpg,png,webp,gif'],
            'title_ar' => ['required', 'string', 'max:255'],
            'title_en' => ['required', 'string', 'max:255'],
            'desc_ar' => ['nullable', 'string'],
            'desc_en' => ['nullable', 'string'],
            'image_alt' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:1'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $stored = $request->file('image')->store('site-services', 'public');

        SiteService::query()->create([
            'title_ar' => $validated['title_ar'],
            'title_en' => $validated['title_en'],
            'desc_ar' => $validated['desc_ar'] ?? null,
            'desc_en' => $validated['desc_en'] ?? null,
            'image' => '/storage/'.$stored,
            'image_alt' => $validated['image_alt'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 1,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return back()->with('success', 'Service added.');
    }

    public function update(Request $request, SiteService $siteService): RedirectResponse
    {
        $validated = $request->validate([
            'image' => ['nullable', 'file', 'max:8192', 'mimes:jpeg,jpg,png,webp,gif'],
            'image_current' => ['nullable', 'string', 'max:500'],
            'title_ar' => ['required', 'string', 'max:255'],
            'title_en' => ['required', 'string', 'max:255'],
            'desc_ar' => ['nullable', 'string'],
            'desc_en' => ['nullable', 'string'],
            'image_alt' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['required', 'integer', 'min:1'],
            'is_active' => ['required', 'boolean'],
        ]);

        $image = $siteService->image;

        if ($request->hasFile('image')) {
            $this->deleteStoredServiceImageIfManaged($siteService->image);
            $stored = $request->file('image')->store('site-services', 'public');
            $image = '/storage/'.$stored;
        } elseif (filled($validated['image_current'] ?? null)) {
            $image = $validated['image_current'];
        }

        $siteService->update([
            'title_ar' => $validated['title_ar'],
            'title_en' => $validated['title_en'],
            'desc_ar' => $validated['desc_ar'] ?? null,
            'desc_en' => $validated['desc_en'] ?? null,
            'image' => $image,
            'image_alt' => $validated['image_alt'] ?? null,
            'sort_order' => $validated['sort_order'],
            'is_active' => $validated['is_active'],
        ]);

        return back()->with('success', 'Service updated.');
    }

    public function destroy(SiteService $siteService): RedirectResponse
    {
        $this->deleteStoredServiceImageIfManaged($siteService->image);
        $siteService->delete();

        return back()->with('success', 'Service deleted.');
    }

    private function deleteStoredServiceImageIfManaged(?string $imagePath): void
    {
        if (! $imagePath || ! str_starts_with($imagePath, '/storage/')) {
            return;
        }

        $relative = substr($imagePath, strlen('/storage/'));
        if ($relative !== '') {
            Storage::disk('public')->delete($relative);
        }
    }
}
