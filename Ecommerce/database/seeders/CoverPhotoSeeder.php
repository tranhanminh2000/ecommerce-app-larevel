<?php

namespace Database\Seeders;

use App\Models\CoverPhoto;
use App\Models\Product;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;

class CoverPhotoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $product = Product::select("products.id", "category_name")
            ->join("categories", "categories.id", "=", "products.category_id")
            ->get();

        foreach ($product as $item) {
            $faker = Factory::create();
            CoverPhoto::factory()->create([
                "product_id" => $item["id"],
                "cover_photo_item" => $item["category_name"] . $faker->randomElement([1,2,3,4,5]),
            ]);
        }
    }
}
