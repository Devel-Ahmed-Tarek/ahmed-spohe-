<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('site_contents')) {
            return;
        }

        $ar = 'تنسيق • مواصفات دقيقة • تسليم موثوق في الموقع.';
        $legacy = 'Coordination • specs • on-site delivery you can trust.';

        DB::table('site_contents')
            ->where('key', 'home.engineers.subtitleEn')
            ->where(function ($q) use ($legacy) {
                $q->where('value_ar', $legacy)
                    ->orWhere('value_ar', 'LIKE', '%Coordination • specs%');
            })
            ->update(['value_ar' => $ar]);
    }

    public function down(): void
    {
        //
    }
};
