<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BrandController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/brands-index', [
            'brands' => Brand::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'logo' => ['required', 'file', 'max:4096', 'mimes:jpeg,jpg,png,webp,svg,gif'],
            'hint' => ['nullable', 'string', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:1'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $path = $request->file('logo')->store('brands', 'public');

        Brand::query()->create([
            'name' => $validated['name'],
            'logo' => '/storage/'.$path,
            'hint' => $validated['hint'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 1,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return back()->with('success', 'Brand added.');
    }

    public function update(Request $request, Brand $brand): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'logo' => ['nullable', 'file', 'max:4096', 'mimes:jpeg,jpg,png,webp,svg,gif'],
            'logo_current' => ['nullable', 'string', 'max:500'],
            'hint' => ['nullable', 'string', 'max:100'],
            'sort_order' => ['required', 'integer', 'min:1'],
            'is_active' => ['required', 'boolean'],
        ]);

        $logo = $brand->logo;

        if ($request->hasFile('logo')) {
            $this->deleteStoredLogoIfManaged($brand->logo);
            $stored = $request->file('logo')->store('brands', 'public');
            $logo = '/storage/'.$stored;
        } elseif (filled($validated['logo_current'] ?? null)) {
            $logo = $validated['logo_current'];
        }

        $brand->update([
            'name' => $validated['name'],
            'logo' => $logo,
            'hint' => $validated['hint'] ?? null,
            'sort_order' => $validated['sort_order'],
            'is_active' => $validated['is_active'],
        ]);

        return back()->with('success', 'Brand updated.');
    }

    public function destroy(Brand $brand): RedirectResponse
    {
        $this->deleteStoredLogoIfManaged($brand->logo);
        $brand->delete();

        return back()->with('success', 'Brand deleted.');
    }

    private function deleteStoredLogoIfManaged(?string $logoPath): void
    {
        if (! $logoPath || ! str_starts_with($logoPath, '/storage/')) {
            return;
        }

        $relative = substr($logoPath, strlen('/storage/'));
        if ($relative !== '') {
            Storage::disk('public')->delete($relative);
        }
    }
}
