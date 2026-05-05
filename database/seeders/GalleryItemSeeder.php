<?php

namespace Database\Seeders;

use App\Models\GalleryCategory;
use App\Models\GalleryItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class GalleryItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $images = [
            '/images/projects/kitchen-01.png',
            '/images/projects/kitchen-02.png',
            '/images/projects/kitchen-03.png',
            '/images/projects/kitchen-04.png',
            '/images/projects/kitchen-05.png',
            '/images/projects/kitchen-06.png',
            '/images/projects/kitchen-07.png',
            '/images/projects/kitchen-08.png',
            '/images/projects/kitchen-09.png',
            '/images/projects/kitchen-10.png',
            '/images/projects/kitchen-11.png',
        ];

        foreach ($images as $i => $image) {
            $n = $i + 1;
            GalleryItem::query()->updateOrCreate(
                ['sort_order' => $n],
                [
                    'image' => $image,
                    'label_ar' => null,
                    'label_en' => null,
                    'tagline_ar' => null,
                    'tagline_en' => null,
                    'is_active' => true,
                ]
            );
        }

        if (Schema::hasTable('gallery_categories') && Schema::hasColumn('gallery_items', 'gallery_category_id')) {
            $catIds = GalleryCategory::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->pluck('id')
                ->all();
            if ($catIds !== []) {
                GalleryItem::query()
                    ->orderBy('sort_order')
                    ->orderBy('id')
                    ->get()
                    ->each(function (GalleryItem $item, int $idx) use ($catIds): void {
                        $item->update([
                            'gallery_category_id' => $catIds[$idx % count($catIds)],
                        ]);
                    });
            }
        }
    }
}
