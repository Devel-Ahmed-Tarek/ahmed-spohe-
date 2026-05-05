<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class GalleryCategoryController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name_ar' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        GalleryCategory::query()->create([
            'name_ar' => $validated['name_ar'],
            'name_en' => $validated['name_en'],
            'slug' => isset($validated['slug']) ? trim((string) $validated['slug']) : '',
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return back()->with('success', 'Category added.');
    }

    public function update(Request $request, GalleryCategory $galleryCategory): RedirectResponse
    {
        $validated = $request->validate([
            'name_ar' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);

        $galleryCategory->update([
            'name_ar' => $validated['name_ar'],
            'name_en' => $validated['name_en'],
            'slug' => isset($validated['slug']) ? trim((string) $validated['slug']) : $galleryCategory->slug,
            'sort_order' => $validated['sort_order'],
            'is_active' => $validated['is_active'],
        ]);

        return back()->with('success', 'Category updated.');
    }

    public function destroy(GalleryCategory $galleryCategory): RedirectResponse
    {
        $galleryCategory->delete();

        return back()->with('success', 'Category deleted.');
    }
}
