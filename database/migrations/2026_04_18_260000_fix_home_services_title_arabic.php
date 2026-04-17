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

        DB::table('site_contents')
            ->where('key', 'home.services.title')
            ->where('value_ar', 'Our Services')
            ->update(['value_ar' => 'خدماتنا']);
    }

    public function down(): void
    {
        //
    }
};
