<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Her kategori belirli bir kullanıcıya ait olacak şekilde tanımlanır
        return [
            'user_id' => User::inRandomOrder()->first()->id, // Rastgele bir kullanıcı
            'title' => $this->faker->word,
            'file_id' => rand(1, 2),
        ];
    }
}
