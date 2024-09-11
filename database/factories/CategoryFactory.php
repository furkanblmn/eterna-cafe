<?php

namespace Database\Factories;

use App\Models\User; // User modelini ekliyoruz
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
        return [
            'user_id' => User::query()->inRandomOrder()->first()->id,
            'title' => $this->faker->word,
            'file_path' => $this->faker->imageUrl(480, 480, 'categories', true),
        ];
    }
}
