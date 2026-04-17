<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryItemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/gallery-items-index', [
            'items' => GalleryItem::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->merge([
            'home_position' => $this->normalizeNullableHomePosition($request->input('home_position')),
            'engineer_home_position' => $this->normalizeNullableEngineerHomePosition($request->input('engineer_home_position')),
        ]);

        $validated = $request->validate([
            'image' => ['required', 'file', 'max:8192', 'mimes:jpeg,jpg,png,webp,gif'],
            'label_ar' => ['nullable', 'string', 'max:255'],
            'label_en' => ['nullable', 'string', 'max:255'],
            'tagline_ar' => ['nullable', 'string', 'max:255'],
            'tagline_en' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:1'],
            'home_position' => ['nullable', 'integer', 'min:1', 'max:6'],
            'engineer_home_position' => ['nullable', 'integer', 'min:1', 'max:4'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $homePosition = $validated['home_position'] ?? null;
        if ($homePosition !== null) {
            $this->releaseHomeSpotlightSlot($homePosition, null);
        }

        $engineerHomePosition = $validated['engineer_home_position'] ?? null;
        if ($engineerHomePosition !== null) {
            $this->releaseEngineerSpotlightSlot($engineerHomePosition, null);
        }

        $stored = $request->file('image')->store('gallery', 'public');

        GalleryItem::query()->create([
            'image' => '/storage/'.$stored,
            'label_ar' => $validated['label_ar'] ?? null,
            'label_en' => $validated['label_en'] ?? null,
            'tagline_ar' => $validated['tagline_ar'] ?? null,
            'tagline_en' => $validated['tagline_en'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 1,
            'home_position' => $homePosition,
            'engineer_home_position' => $engineerHomePosition,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return back()->with('success', 'Gallery image added.');
    }

    public function update(Request $request, GalleryItem $galleryItem): RedirectResponse
    {
        $request->merge([
            'home_position' => $this->normalizeNullableHomePosition($request->input('home_position')),
            'engineer_home_position' => $this->normalizeNullableEngineerHomePosition($request->input('engineer_home_position')),
        ]);

        $validated = $request->validate([
            'image' => ['nullable', 'file', 'max:8192', 'mimes:jpeg,jpg,png,webp,gif'],
            'image_current' => ['nullable', 'string', 'max:500'],
            'label_ar' => ['nullable', 'string', 'max:255'],
            'label_en' => ['nullable', 'string', 'max:255'],
            'tagline_ar' => ['nullable', 'string', 'max:255'],
            'tagline_en' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['required', 'integer', 'min:1'],
            'home_position' => ['nullable', 'integer', 'min:1', 'max:6'],
            'engineer_home_position' => ['nullable', 'integer', 'min:1', 'max:4'],
            'is_active' => ['required', 'boolean'],
        ]);

        $homePosition = $validated['home_position'] ?? null;
        if ($homePosition !== null) {
            $this->releaseHomeSpotlightSlot($homePosition, $galleryItem->id);
        }

        $engineerHomePosition = $validated['engineer_home_position'] ?? null;
        if ($engineerHomePosition !== null) {
            $this->releaseEngineerSpotlightSlot($engineerHomePosition, $galleryItem->id);
        }

        $image = $galleryItem->image;

        if ($request->hasFile('image')) {
            $this->deleteStoredGalleryImageIfManaged($galleryItem->image);
            $stored = $request->file('image')->store('gallery', 'public');
            $image = '/storage/'.$stored;
        } elseif (filled($validated['image_current'] ?? null)) {
            $image = $validated['image_current'];
        }

        $galleryItem->update([
            'image' => $image,
            'label_ar' => $validated['label_ar'] ?? null,
            'label_en' => $validated['label_en'] ?? null,
            'tagline_ar' => $validated['tagline_ar'] ?? null,
            'tagline_en' => $validated['tagline_en'] ?? null,
            'sort_order' => $validated['sort_order'],
            'home_position' => $homePosition,
            'engineer_home_position' => $engineerHomePosition,
            'is_active' => $validated['is_active'],
        ]);

        return back()->with('success', 'Gallery image updated.');
    }

    public function destroy(GalleryItem $galleryItem): RedirectResponse
    {
        $this->deleteStoredGalleryImageIfManaged($galleryItem->image);
        $galleryItem->delete();

        return back()->with('success', 'Gallery image removed.');
    }

    private function deleteStoredGalleryImageIfManaged(?string $imagePath): void
    {
        if (! $imagePath || ! str_starts_with($imagePath, '/storage/')) {
            return;
        }

        $relative = substr($imagePath, strlen('/storage/'));
        if ($relative !== '') {
            Storage::disk('public')->delete($relative);
        }
    }

    /**
     * Clear the same home spotlight slot (1–6) on other rows before assigning.
     */
    private function releaseHomeSpotlightSlot(int $position, ?int $exceptId): void
    {
        GalleryItem::query()
            ->where('home_position', $position)
            ->when($exceptId !== null, fn ($q) => $q->where('id', '!=', $exceptId))
            ->update(['home_position' => null]);
    }

    private function releaseEngineerSpotlightSlot(int $position, ?int $exceptId): void
    {
        GalleryItem::query()
            ->where('engineer_home_position', $position)
            ->when($exceptId !== null, fn ($q) => $q->where('id', '!=', $exceptId))
            ->update(['engineer_home_position' => null]);
    }

    private function normalizeNullableHomePosition(mixed $value): ?int
    {
        if ($value === null || $value === '' || $value === false) {
            return null;
        }

        $int = (int) $value;

        return ($int >= 1 && $int <= 6) ? $int : null;
    }

    private function normalizeNullableEngineerHomePosition(mixed $value): ?int
    {
        if ($value === null || $value === '' || $value === false) {
            return null;
        }

        $int = (int) $value;

        return ($int >= 1 && $int <= 4) ? $int : null;
    }
}
