<?php

namespace App\Repositories\Product;

use App\Models\Product;

class ProductRepository
{
    public function getAllProduct()
    {
        return Product::select();
    }

    public function getProductById($id)
    {
        $product = Product::with('brand', 'category', 'discount', 'coverPhoto')->find($id);

        return $product;
    }

    public function getProductByCondition($request)
    {
        $products = Product::select(
            'products.id',
            'product_name',
            "product_desc",
            "product_price",
            "categories.category_name",
            "brands.brand_name"
        )->with("coverPhoto")
            ->join("brands", "brands.id", "=", "products.brand_id")
            ->join("categories", "categories.id", "=", "products.category_id");

        $products
            ->sort($request)
            ->filter($request);

        if ($request->has('take')) {
            return $products->get()->take($request->query('take'));
        }
        if ($request->has('size')) {
            return $products->paginate($request->query('size'));
        }

        return $products->get();
    }
}
