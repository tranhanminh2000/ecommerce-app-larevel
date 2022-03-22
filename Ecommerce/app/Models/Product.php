<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Product extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'products';

    public function coverPhoto()
    {
        return $this->hasMany(CoverPhoto::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function review()
    {
        return $this->hasMany(Review::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    public function discount()
    {
        return $this->hasOne(Discount::class);
    }


    public function scopeSelectDiscountPrice($query)
    {
        $query->selectRaw('
        CASE
            WHEN
            (CAST(NOW() AS DATE) BETWEEN discounts.discount_start_date AND discounts.discount_end_date)
            OR
            ((CAST(NOW() AS DATE) >= discounts.discount_start_date) AND discounts.discount_end_date ISNULL)
            THEN discounts.discount_price
            ELSE null
        END AS discount_price');
        return $query;
    }

    public function scopeSelectFinalPrice($query)
    {
        $query->selectRaw('
        CASE
            WHEN
                (CAST(NOW() AS DATE) BETWEEN discounts.discount_start_date AND discounts.discount_end_date)
                OR
                ((CAST(NOW() AS DATE) >= discounts.discount_start_date) AND discounts.discount_end_date ISNULL)
            THEN discounts.discount_price
            ELSE products.product_price
        END AS final_price');
        return $query;
    }

    public function scopeSort($query, $request)
    {
        if ($request->query("sort") == "desc" || $request->query("sort") == "asc") {
            $query
                ->leftJoin("discounts", "products.id", '=', 'discounts.product_id')
                ->selectDiscountPrice()
                ->selectFinalPrice()
                ->orderBy("final_price", $request->query("sort"));
        }

        if ($request->query("sort") == "onSale") {
            $query
                ->selectRaw("products.product_price - discounts.discount_price as most_discount")
                ->selectDiscountPrice()
                ->Join("discounts", "products.id", '=', 'discounts.product_id')
                ->whereRaw("
                (CAST(NOW() AS DATE) BETWEEN discounts.discount_start_date AND discounts.discount_end_date)
                OR
                ((CAST(NOW() AS DATE) >= discounts.discount_start_date) AND discounts.discount_end_date ISNULL)")
                ->orderBy("most_discount", 'desc')
                ->orderBy("discount_price", 'asc');
        }

        if ($request->query("sort") == "recommend") {
            $query
                ->selectRaw(DB::raw("AVG(reviews.rating_star) as avg_star"))
                ->selectDiscountPrice()
                ->leftJoin("discounts", "products.id", '=', 'discounts.product_id')
                ->join("reviews", "reviews.product_id", "=", "products.id")
                ->groupBy("products.id", "categories.category_name", "brands.brand_name", "discounts.discount_start_date", "discounts.discount_end_date", "discounts.discount_price")
                ->orderBy("avg_star", "desc");
        }

        if ($request->query("sort") == "popular") {
            $query
                ->selectRaw(DB::raw("COUNT(reviews.id) as total_review"))
                ->selectDiscountPrice()
                ->selectFinalPrice()
                ->leftJoin("discounts", "products.id", '=', 'discounts.product_id')
                ->join("reviews", "reviews.product_id", "=", "products.id")
                ->groupBy("products.id", "categories.category_name", "brands.brand_name", "discounts.discount_start_date", "discounts.discount_end_date", "discounts.discount_price")
                ->orderBy("total_review", "desc")
                ->orderBy("final_price", 'asc');
        }
        return $query;
    }

    public function scopeFilter($query, $request)
    {
        if ($request->has("filter")) {
            $filter = $request->get("filter");
            if (isset($filter["brandName"])) {
                $query->where("brand_name", $filter["brandName"]);
            }
            if (isset($filter["categoryName"])) {
                $query->where("category_name", $filter["categoryName"]);
            }
            if (isset($filter["ratingStar"])) {
                $query->havingRaw("AVG(review.rating_star) >= " . $filter["ratingStar"]);
            }
        }

        return $query;
    }
}
