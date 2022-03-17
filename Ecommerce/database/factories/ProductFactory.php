<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'product_name' => $this->faker->sentence($this->faker->biasedNumberBetween(4, 8)),
            'product_desc' => $this->faker->realTextBetween(),
            'product_price' => $this->faker->randomFloat(2, 29, 79),
        ];
    }
}
