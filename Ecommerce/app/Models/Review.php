<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'reviews';
    protected $fillable = ["review_date"];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeFindReviews($query, $productId)
    {
        $query->where("product_id", $productId);
        return $query;
    }

    public function scopeSort($query, $sortBy = "review_date", $sortValue  = "desc")
    {
        $query->orderBy($sortBy, $sortValue);
        return $query;
    }

    public function scopeFilter($query, $filterBy = "rating_star", $filterValue = "5")
    {

        $query->where($filterBy, $filterValue);
        return $query;
    }
}