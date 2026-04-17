<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SiteConfigurationController extends Controller
{
    public function edit(): Response
    {
        $keys = [
            'company_name',
            'city_name',
            'whatsapp_number',
            'logo',
            'facebook_url',
            'instagram_url',
            'youtube_url',
            'tiktok_url',
            'linkedin_url',
        ];

        $values = SiteSetting::query()
            ->whereIn('key', $keys)
            ->pluck('value', 'key')
            ->all();

        $data = [];
        foreach ($keys as $key) {
            $data[$key] = $values[$key] ?? '';
        }

        return Inertia::render('dashboard/site-configuration', [
            'settings' => $data,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'company_name' => ['nullable', 'string', 'max:255'],
            'city_name' => ['nullable', 'string', 'max:255'],
            'whatsapp_number' => ['nullable', 'string', 'max:40'],
            'facebook_url' => ['nullable', 'string', 'max:500'],
            'instagram_url' => ['nullable', 'string', 'max:500'],
            'youtube_url' => ['nullable', 'string', 'max:500'],
            'tiktok_url' => ['nullable', 'string', 'max:500'],
            'linkedin_url' => ['nullable', 'string', 'max:500'],
            'logo' => ['nullable', 'file', 'max:4096', 'mimes:jpeg,jpg,png,webp,svg'],
            'logo_current' => ['nullable', 'string', 'max:500'],
        ]);

        foreach ([
            'company_name',
            'city_name',
            'whatsapp_number',
            'facebook_url',
            'instagram_url',
            'youtube_url',
            'tiktok_url',
            'linkedin_url',
        ] as $key) {
            $val = $validated[$key] ?? null;
            SiteSetting::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $val !== null && $val !== '' ? $val : null],
            );
        }

        $existingLogo = SiteSetting::query()->where('key', 'logo')->value('value');

        if ($request->hasFile('logo')) {
            $this->deleteStoredLogoIfManaged(is_string($existingLogo) ? $existingLogo : null);
            $stored = $request->file('logo')->store('site', 'public');
            $logo = '/storage/'.$stored;
        } else {
            $submitted = isset($validated['logo_current']) ? trim((string) $validated['logo_current']) : '';
            // If the client omits logo_current (e.g. multipart quirk) or sends empty, keep the stored logo.
            $logo = $submitted !== '' ? $submitted : $existingLogo;
        }

        SiteSetting::query()->updateOrCreate(
            ['key' => 'logo'],
            ['value' => $logo],
        );

        return back()->with('success', 'Site configuration saved.');
    }

    private function deleteStoredLogoIfManaged(?string $path): void
    {
        if (! $path || ! str_starts_with($path, '/storage/')) {
            return;
        }

        $relative = substr($path, strlen('/storage/'));
        if ($relative !== '') {
            Storage::disk('public')->delete($relative);
        }
    }
}
