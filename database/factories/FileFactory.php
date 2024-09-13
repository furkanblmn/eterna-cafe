<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FileFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \App\Models\File::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // Kayıt sırasına göre iki farklı veri döndüreceğiz
        static $count = 0;
        $count++;

        // Belirlediğimiz dosya isimleri ve slug'lar
        $data = [
            [
                'path' => '/uploads/images',
                'slug' => 'undraw-profile-2-1.svg'
            ],
            [
                'path' => '/uploads/images',
                'slug' => 'undraw-profile-2.svg'
            ],
        ];

        // Sadece iki kayıt oluşturulacak, $count 1 veya 2'yi gösterecek.
        return array_merge($data[$count - 1], [
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
