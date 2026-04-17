<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use Illuminate\Database\Seeder;

class HeroSlideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $slides = [
            [
                'image' => '/images/projects/kitchen-09.png',
                'title_ar' => 'خلّي مطبخك قطعة فنية في بيتك',
                'title_en' => 'Turn your kitchen into art',
                'subtitle_ar' => 'تصميمات مودرن فخمة، خامات مختارة، وتنفيذ دقيق للشقق والفلل والمهندسين.',
                'subtitle_en' => 'Premium modern designs with curated materials and precise execution.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'image' => '/images/projects/kitchen-05.png',
                'title_ar' => 'مساحات واسعة… تشطيب يليق بالذوق',
                'title_en' => 'Spacious feel, elegant finish',
                'subtitle_ar' => 'جزيرة رخام، إضاءة مدروسة، وتفاصيل تخلّي المطبخ قلب البيت.',
                'subtitle_en' => 'Marble islands, thoughtful lighting, and premium details.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'image' => '/images/projects/kitchen-11.png',
                'title_ar' => 'ستايلات مختلفة لنفس الجودة',
                'title_en' => 'Different styles, same quality',
                'subtitle_ar' => 'من الداكن للفاتح—نفس مستوى التشطيب والالتزام بالمقاسات.',
                'subtitle_en' => 'From dark to light themes with consistent quality and fit.',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($slides as $slide) {
            HeroSlide::query()->updateOrCreate(
                [
                    'sort_order' => $slide['sort_order'],
                    'title_ar' => $slide['title_ar'],
                ],
                $slide
            );
        }
    }
}
