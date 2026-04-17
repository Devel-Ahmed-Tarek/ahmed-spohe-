<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryItem extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
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
}
