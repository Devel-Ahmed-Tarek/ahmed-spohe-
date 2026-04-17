<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HeroSlideController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/hero-slides-index', [
            'slides' => HeroSlide::query()
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
            'title_en' => ['nullable', 'string', 'max:255'],
            'subtitle_ar' => ['nullable', 'string'],
            'subtitle_en' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:1'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $stored = $request->file('image')->store('hero-slides', 'public');

        HeroSlide::query()->create([
            'image' => '/storage/'.$stored,
            'title_ar' => $validated['title_ar'],
            'title_en' => $validated['title_en'] ?? null,
            'subtitle_ar' => $validated['subtitle_ar'] ?? null,
            'subtitle_en' => $validated['subtitle_en'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 1,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return back()->with('success', 'Hero slide added.');
    }

    public function update(Request $request, HeroSlide $heroSlide): RedirectResponse
    {
        $validated = $request->validate([
            'image' => ['nullable', 'file', 'max:8192', 'mimes:jpeg,jpg,png,webp,gif'],
            'image_current' => ['nullable', 'string', 'max:500'],
            'title_ar' => ['required', 'string', 'max:255'],
            'title_en' => ['nullable', 'string', 'max:255'],
            'subtitle_ar' => ['nullable', 'string'],
            'subtitle_en' => ['nullable', 'string'],
            'sort_order' => ['required', 'integer', 'min:1'],
            'is_active' => ['required', 'boolean'],
        ]);

        $image = $heroSlide->image;

        if ($request->hasFile('image')) {
            $this->deleteStoredHeroImageIfManaged($heroSlide->image);
            $stored = $request->file('image')->store('hero-slides', 'public');
            $image = '/storage/'.$stored;
        } elseif (filled($validated['image_current'] ?? null)) {
            $image = $validated['image_current'];
        }

        $heroSlide->update([
            'image' => $image,
            'title_ar' => $validated['title_ar'],
            'title_en' => $validated['title_en'] ?? null,
            'subtitle_ar' => $validated['subtitle_ar'] ?? null,
            'subtitle_en' => $validated['subtitle_en'] ?? null,
            'sort_order' => $validated['sort_order'],
            'is_active' => $validated['is_active'],
        ]);

        return back()->with('success', 'Hero slide updated.');
    }

    public function destroy(HeroSlide $heroSlide): RedirectResponse
    {
        $this->deleteStoredHeroImageIfManaged($heroSlide->image);
        $heroSlide->delete();

        return back()->with('success', 'Hero slide deleted.');
    }

    private function deleteStoredHeroImageIfManaged(?string $imagePath): void
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
