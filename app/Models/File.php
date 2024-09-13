<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $guarded = [];


    protected $appends = ['orj_path', 'orj_link'];

    // Genel bir path oluşturucu fonksiyon
    protected function buildPath($folder)
    {
        $path = $folder;
        $slug = $this->attributes['slug'] ?? '';

        return "{$path}/{$slug}";
    }

    // Orijinal dosya yolu için fonksiyon
    public function getOrjPathAttribute()
    {
        return $this->buildPath($this->attributes['path'] ?? '');
    }

    // Genel bir link oluşturucu fonksiyon
    protected function buildLink($path)
    {
        return url($path);
    }

    // Orijinal dosya linki için fonksiyon
    public function getOrjLinkAttribute()
    {
        return $this->buildLink($this->orj_path);
    }
}
