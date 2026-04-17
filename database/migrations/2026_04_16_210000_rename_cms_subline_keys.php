<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Rename misleading *lineEn / *subtitleEn keys and ensure Arabic copy is not stored only in value_en.
     */
    public function up(): void
    {
        if (! Schema::hasTable('site_contents')) {
            return;
        }

        $renames = [
            [
                'old' => 'engineers.contact.lineEn',
                'new' => 'engineers.contact.subline',
                'group' => 'engineers',
                'value_ar' => 'تواصل معنا للتنسيق، مراجعة المخططات، وخطة التنفيذ.',
                'value_en' => 'Contact us for coordination, drawings review, and execution plan.',
            ],
            [
                'old' => 'engineers.gallery.lineEn',
                'new' => 'engineers.gallery.subline',
                'group' => 'engineers',
                'value_ar' => 'مشاريع حقيقية — تشطيب وتنسيق واضحين.',
                'value_en' => 'Real projects — finish & coordination you can see.',
            ],
            [
                'old' => 'home.services.lineEn',
                'new' => 'home.services.subline',
                'group' => 'home',
                'value_ar' => 'تصميم • تصنيع • تركيب — خامات مختارة وتشطيب فاخر.',
                'value_en' => 'Design • Build • Install — curated materials & premium finish.',
            ],
            [
                'old' => 'home.engineers.subtitleEn',
                'new' => 'home.engineers.subtitle',
                'group' => 'home',
                'value_ar' => 'تنسيق • مواصفات دقيقة • تسليم موثوق في الموقع.',
                'value_en' => 'Coordination • specs • on-site delivery you can trust.',
            ],
            [
                'old' => 'home.contact.subtitleEn',
                'new' => 'home.contact.subline',
                'group' => 'home',
                'value_ar' => 'تواصل سريع — نفس خطوات صفحة التواصل الكاملة.',
                'value_en' => 'Quick contact — same flow as the full contact page.',
            ],
        ];

        foreach ($renames as $row) {
            $hasNew = DB::table('site_contents')->where('key', $row['new'])->exists();
            $hasOld = DB::table('site_contents')->where('key', $row['old'])->exists();

            if ($hasNew && $hasOld) {
                DB::table('site_contents')->where('key', $row['old'])->delete();
            } elseif ($hasOld) {
                DB::table('site_contents')->where('key', $row['old'])->update([
                    'key' => $row['new'],
                    'group' => $row['group'],
                    'value_ar' => $row['value_ar'],
                    'value_en' => $row['value_en'],
                ]);
            } else {
                DB::table('site_contents')->updateOrInsert(
                    ['key' => $row['new']],
                    [
                        'group' => $row['group'],
                        'value_ar' => $row['value_ar'],
                        'value_en' => $row['value_en'],
                    ],
                );
            }
        }

        DB::table('site_contents')
            ->where('key', 'process.hero.subtitleEn')
            ->update([
                'value_ar' => 'عملية مبنية لنتائج فاخرة.',
                'value_en' => 'A process built for premium outcomes.',
            ]);
    }

    public function down(): void
    {
        // Intentionally empty: key renames are one-way for deployed DBs.
    }
};
