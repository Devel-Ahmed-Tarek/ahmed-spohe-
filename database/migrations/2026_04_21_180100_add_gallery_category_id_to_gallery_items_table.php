<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('gallery_items', function (Blueprint $table): void {
            $table->foreignId('gallery_category_id')
                ->nullable()
                ->after('id')
                ->constrained('gallery_categories')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('gallery_items', function (Blueprint $table): void {
            $table->dropConstrainedForeignId('gallery_category_id');
        });
    }
};
