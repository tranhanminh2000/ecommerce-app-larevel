<?php

namespace Database\Factories;

use App\Models\Coupon;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class CouponFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Coupon::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'coupon_amount' => $this->faker->randomElement([20, 30, 40, 50]),
            'active' => $this->faker->randomFloat([true, false]),
        ];
    }
}
