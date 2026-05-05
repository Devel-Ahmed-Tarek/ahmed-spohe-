<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class GalleryCategory extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'name_ar',
        'name_en',
        'slug',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::saving(function (GalleryCategory $category): void {
            $slug = trim((string) $category->slug);
            if ($slug === '') {
                $base = Str::slug($category->name_en ?: $category->name_ar ?: 'category');
                $slug = $base !== '' ? $base : 'category';
            }
            $category->slug = static::ensureUniqueSlug($slug, $category->id);
        });
    }

    public function galleryItems(): HasMany
    {
        return $this->hasMany(GalleryItem::class, 'gallery_category_id');
    }

    private static function ensureUniqueSlug(string $base, ?int $exceptId): string
    {
        $slug = $base;
        $n = 2;
        while (
            static::query()
                ->where('slug', $slug)
                ->when($exceptId !== null, fn ($q) => $q->where('id', '!=', $exceptId))
                ->exists()
        ) {
            $slug = $base.'-'.$n;
            $n++;
        }

        return $slug;
    }
}
