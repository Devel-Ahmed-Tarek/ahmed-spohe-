<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'company_name' => env('VITE_COMPANY_NAME', 'Ahmed Sophe'),
            'city_name' => env('VITE_CITY_NAME', ''),
            'whatsapp_number' => env('VITE_WHATSAPP_NUMBER', ''),
            'logo' => '',
            'facebook_url' => '',
            'instagram_url' => '',
            'youtube_url' => '',
            'tiktok_url' => '',
            'linkedin_url' => '',
        ];

        foreach ($defaults as $key => $value) {
            SiteSetting::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $value !== '' ? $value : null],
            );
        }
    }
}
