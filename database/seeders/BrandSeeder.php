<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            ['name' => 'Blum', 'hint' => 'Hardware', 'logo' => '/images/brands/blum.svg', 'sort_order' => 1,
                'is_active' => true],
            ['name' => 'Hettich', 'hint' => 'Systems', 'logo' => '/images/brands/hettich.svg', 'sort_order' => 2,
                'is_active' => true],
            ['name' => 'EGGER', 'hint' => 'Surfaces', 'logo' => '/images/brands/egger.svg', 'sort_order' => 3,
                'is_active' => true],
            ['name' => 'BLANCO', 'hint' => 'Sinks', 'logo' => '/images/brands/blanco.svg', 'sort_order' => 4,
                'is_active' => true],
            ['name' => 'Kessebohmer', 'hint' => 'Storage', 'logo' => '/images/brands/kessebohmer.svg', 'sort_order' => 5,
                'is_active' => true],
            ['name' => 'Hafele', 'hint' => 'Accessories', 'logo' => '/images/brands/hafele.svg', 'sort_order' => 6,
                'is_active' => true],
        ];

        foreach ($brands as $brand) {
            Brand::query()->updateOrCreate(
                ['name' => $brand['name']],
                $brand
            );
        }
    }
}
