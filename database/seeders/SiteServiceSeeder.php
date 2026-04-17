<?php

namespace Database\Seeders;

use App\Models\SiteService;
use Illuminate\Database\Seeder;

class SiteServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rows = [
            [
                'title_ar' => 'مطابخ مودرن فخم',
                'title_en' => 'Luxury Modern Kitchens',
                'desc_ar' => 'خطوط نظيفة + خامات مختارة + تشطيب راقي.',
                'desc_en' => 'Clean lines with curated materials and premium finishing.',
                'image' => '/images/projects/kitchen-01.png',
                'image_alt' => 'مطبخ مودرن فخم',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title_ar' => 'خشب فخم وتشطيبات دافية',
                'title_en' => 'Warm Wood Finishes',
                'desc_ar' => 'ألوان خشب ودهانات بتطلع “طبقة راقية”.',
                'desc_en' => 'Wood tones & luxury coatings with a premium look.',
                'image' => '/images/projects/kitchen-03.png',
                'image_alt' => 'مطبخ بخشب وتشطيب دافي',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title_ar' => 'لاكيه مات أو فلات',
                'title_en' => 'Matte Lacquer / Flat',
                'desc_ar' => 'شكل ناعم وراقي مع ثبات أعلى.',
                'desc_en' => 'Smooth premium look with long-term durability.',
                'image' => '/images/projects/kitchen-05.png',
                'image_alt' => 'واجهات لاكيه مات',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title_ar' => 'تصميم على المقاس',
                'title_en' => 'Made-to-Size',
                'desc_ar' => 'تفصيل دقيق بناءً على المقاسات والمخططات.',
                'desc_en' => 'Exact build based on measurements & drawings.',
                'image' => '/images/projects/kitchen-07.png',
                'image_alt' => 'تصميم مطبخ على المقاس',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'title_ar' => 'تشطيب وتسليم منظم',
                'title_en' => 'Organized Delivery',
                'desc_ar' => 'متابعة للتركيب لحد التسليم النهائي.',
                'desc_en' => 'On-site follow-up until final handover.',
                'image' => '/images/projects/kitchen-09.png',
                'image_alt' => 'تركيب وتسليم مطبخ',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'title_ar' => 'للمقاولين والمهندسين',
                'title_en' => 'For Engineers',
                'desc_ar' => 'تنسيق قبل التصنيع + تنفيذ مطابق.',
                'desc_en' => 'Coordination before manufacturing and matching execution.',
                'image' => '/images/projects/kitchen-11.png',
                'image_alt' => 'تنسيق مع المهندسين',
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($rows as $row) {
            SiteService::query()->updateOrCreate(
                ['sort_order' => $row['sort_order'], 'title_en' => $row['title_en']],
                $row
            );
        }
    }
}
