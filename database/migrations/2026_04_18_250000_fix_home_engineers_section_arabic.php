<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ensure Arabic copy for engineers strip on home (badge/title) when DB still had English in value_ar.
     */
    public function up(): void
    {
        if (! Schema::hasTable('site_contents')) {
            return;
        }

        DB::table('site_contents')
            ->where('key', 'home.engineers.badge')
            ->where(function ($q) {
                $q->where('value_ar', 'Engineers & contractors')
                    ->orWhere('value_ar', 'LIKE', '%Engineers &%');
            })
            ->update(['value_ar' => 'مهندسون ومقاولون']);

        DB::table('site_contents')
            ->where('key', 'home.engineers.title')
            ->where('value_ar', 'For engineers')
            ->update(['value_ar' => 'للمهندسين عندنا']);
    }

    public function down(): void
    {
        //
    }
};
