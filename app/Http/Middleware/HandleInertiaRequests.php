<?php

namespace App\Http\Middleware;

use App\Models\Brand;
use App\Models\GalleryItem;
use App\Models\HeroSlide;
use App\Models\SiteContent;
use App\Models\SiteSetting;
use App\Models\SiteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => app()->getLocale(),
            'siteConfig' => fn (): array => Schema::hasTable('site_settings')
                ? SiteSetting::query()
                    ->get(['key', 'value'])
                    ->mapWithKeys(fn (SiteSetting $row): array => [
                        $row->key => $row->value,
                    ])
                    ->all()
                : [],
            'cms' => fn (): array => Schema::hasTable('site_contents')
                ? SiteContent::query()
                    ->get(['key', 'value_ar', 'value_en'])
                    ->mapWithKeys(fn (SiteContent $item): array => [
                        $item->key => [
                            'ar' => $item->value_ar,
                            'en' => $item->value_en,
                        ],
                    ])
                    ->all()
                : [],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],
            'heroSlides' => fn (): array => Schema::hasTable('hero_slides')
                ? HeroSlide::query()
                    ->where('is_active', true)
                    ->orderBy('sort_order')
                    ->orderBy('id')
                    ->get(['image', 'title_ar', 'title_en', 'subtitle_ar', 'subtitle_en'])
                    ->toArray()
                : [],
            'brands' => fn (): array => Schema::hasTable('brands')
                ? Brand::query()
                    ->where('is_active', true)
                    ->orderBy('sort_order')
                    ->orderBy('id')
                    ->get(['name', 'logo', 'hint'])
                    ->toArray()
                : [],
            'marketingServices' => fn (): array => Schema::hasTable('site_services')
                ? SiteService::query()
                    ->where('is_active', true)
                    ->orderBy('sort_order')
                    ->orderBy('id')
                    ->get()
                    ->map(fn (SiteService $s): array => [
                        'id' => $s->id,
                        'ar' => $s->title_ar,
                        'en' => $s->title_en,
                        'descAr' => $s->desc_ar ?? '',
                        'descEn' => $s->desc_en ?? '',
                        'image' => $s->image,
                        'imageAlt' => $s->image_alt ?? '',
                    ])
                    ->values()
                    ->all()
                : [],
            'galleryItems' => fn (): array => Schema::hasTable('gallery_items')
                ? GalleryItem::query()
                    ->where('is_active', true)
                    ->orderBy('sort_order')
                    ->orderBy('id')
                    ->get()
                    ->map(fn (GalleryItem $g): array => [
                        'id' => $g->id,
                        'image' => $g->image,
                        'labelAr' => $g->label_ar,
                        'labelEn' => $g->label_en,
                        'taglineAr' => $g->tagline_ar,
                        'taglineEn' => $g->tagline_en,
                        'homePosition' => $g->home_position,
                        'engineerHomePosition' => $g->engineer_home_position,
                    ])
                    ->values()
                    ->all()
                : [],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
