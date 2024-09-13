<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::inRandomOrder()->first();

        return [
            'user_id' => $user->id,
            'title' => $this->faker->word,
            'price' => $this->faker->randomFloat(2, 2, 100),
            'content' => $this->faker->paragraph(3),
            'file_id' => rand(1, 2),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Product $product) {
            $categories = Category::where('user_id', $product->user_id)
                ->inRandomOrder()
                ->take(rand(1, 3))
                ->pluck('id');

            $product->categories()->attach($categories);
        });
    }
}
