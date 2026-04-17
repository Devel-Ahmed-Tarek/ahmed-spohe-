<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Fix Arabic copy for home contact subline when DB still had English in value_ar (legacy defaults).
     */
    public function up(): void
    {
        if (! Schema::hasTable('site_contents')) {
            return;
        }

        $ar = 'تواصل سريع — نفس خطوات صفحة التواصل الكاملة.';
        $legacyEnglish = 'Quick contact — same flow as the full contact page.';

        DB::table('site_contents')
            ->where('key', 'home.contact.subtitleEn')
            ->where(function ($q) use ($legacyEnglish) {
                $q->where('value_ar', $legacyEnglish)
                    ->orWhere('value_ar', 'LIKE', '%Quick contact%');
            })
            ->update(['value_ar' => $ar]);
    }

    public function down(): void
    {
        // Intentionally empty: do not revert translated text.
    }
};
