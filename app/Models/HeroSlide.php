<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'image',
        'title_ar',
        'title_en',
        'subtitle_ar',
        'subtitle_en',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
