<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\File;
use Carbon\Carbon;

class FileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Belirlediğimiz dosya isimleri ve slug'lar
        $data = [
            [
                'path' => '/uploads/images',
                'slug' => 'resim.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'path' => '/uploads/images',
                'slug' => 'resim-1.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        // Verileri veritabanına ekle
        File::insert($data);
    }
}
