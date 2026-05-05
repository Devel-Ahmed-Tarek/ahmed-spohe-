<?php

namespace Database\Seeders;

use App\Models\GalleryCategory;
use Illuminate\Database\Seeder;

class GalleryCategorySeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            ['name_ar' => 'مودرن', 'name_en' => 'Modern', 'slug' => 'modern', 'sort_order' => 1],
            ['name_ar' => 'كلاسيك', 'name_en' => 'Classic', 'slug' => 'classic', 'sort_order' => 2],
            ['name_ar' => 'مطابخ مفتوحة', 'name_en' => 'Open plan', 'slug' => 'open-plan', 'sort_order' => 3],
            ['name_ar' => 'فلل', 'name_en' => 'Villas', 'slug' => 'villas', 'sort_order' => 4],
        ];

        foreach ($rows as $row) {
            GalleryCategory::query()->updateOrCreate(
                ['slug' => $row['slug']],
                [
                    'name_ar' => $row['name_ar'],
                    'name_en' => $row['name_en'],
                    'sort_order' => $row['sort_order'],
                    'is_active' => true,
                ]
            );
        }
    }
}
