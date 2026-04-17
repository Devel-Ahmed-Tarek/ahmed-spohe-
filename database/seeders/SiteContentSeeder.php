<?php

namespace Database\Seeders;

use App\Models\SiteContent;
use Illuminate\Database\Seeder;

class SiteContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (config('site_content_defaults') as $item) {
            SiteContent::query()->updateOrCreate(
                ['key' => $item['key']],
                [
                    'group' => $item['group'],
                    'value_ar' => $item['value_ar'],
                    'value_en' => $item['value_en'],
                ],
            );
        }
    }
}
