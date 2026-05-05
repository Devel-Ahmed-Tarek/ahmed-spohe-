<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GalleryItem extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'gallery_category_id',
        'image',
        'label_ar',
        'label_en',
        'tagline_ar',
        'tagline_en',
        'sort_order',
        'home_position',
        'engineer_home_position',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(GalleryCategory::class, 'gallery_category_id');
    }
}
