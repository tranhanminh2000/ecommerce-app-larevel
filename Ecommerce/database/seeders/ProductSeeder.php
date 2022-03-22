<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;

class productseeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::factory()->count(10)->create();
        $faker = Factory::create();
        $categories = Category::factory()->count(8)->create();
        $brands = Brand::factory()->count(4)->create();
        foreach ($categories as $category) {
            foreach ($brands as $brand) {
                $products = Product::factory()
                    ->count($faker->numberBetween(1, 10))
                    ->create([
                        'category_id' => $category->id,
                        'brand_id' => $brand->id,
                    ]);
                foreach ($products as $product) {
                    if ($faker->boolean(25)) {
                        $percentage = $faker->randomElement([0, 25, 50, 75]);
                        $discount = Discount::factory();
                        if ($percentage) {
                            $discount->create([
                                'discount_price' => number_format($product->product_price * $percentage / 100, 2),
                                'product_id' => $product->id
                            ]);
                        } else {
                            $discount->create(['product_id' => $product->id]);
                        }
                    }
                    if ($faker->boolean(40)) {
                        $user = $faker->randomElement($users);
                        Review::factory()->count($faker->numberBetween(1, 10))
                            ->create([
                                'product_id' => $product->id,
                                'user_id' => $user->id
                            ]);
                    }
                }
            }
        }
    }
}
