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

        $ar = 'تصميم • تصنيع • تركيب — خامات مختارة وتشطيب فاخر.';
        $legacy = 'Design • Build • Install — curated materials & premium finish.';

        DB::table('site_contents')
            ->where('key', 'home.services.lineEn')
            ->where(function ($q) use ($legacy) {
                $q->where('value_ar', $legacy)
                    ->orWhere('value_ar', 'LIKE', '%Design • Build%');
            })
            ->update(['value_ar' => $ar]);
    }

    public function down(): void
    {
        //
    }
};
