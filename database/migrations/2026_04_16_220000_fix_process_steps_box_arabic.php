<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ensure process page sidebar / bottom badge Arabic copy is not English in value_ar.
     */
    public function up(): void
    {
        if (! Schema::hasTable('site_contents')) {
            return;
        }

        $fixes = [
            'process.steps.boxTitle' => [
                'ar' => 'تنفيذ خطوة بخطوة',
                'en' => 'Step-by-step build',
            ],
            'process.steps.boxSubline' => [
                'ar' => 'قياس • تصميم • تصنيع',
                'en' => 'Measure • Design • Build',
            ],
            'process.bottom.badge' => [
                'ar' => 'من الفكرة إلى التسليم',
                'en' => 'Concept to Delivery',
            ],
        ];

        foreach ($fixes as $key => $v) {
            DB::table('site_contents')->updateOrInsert(
                ['key' => $key],
                [
                    'group' => 'process',
                    'value_ar' => $v['ar'],
                    'value_en' => $v['en'],
                ],
            );
        }
    }

    public function down(): void
    {
        //
    }
};
