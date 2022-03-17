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


    public function book(){
        return $this->belongsTo(Review::class);
    }

    public function scopeFindReviews ($query, $bookId){
        $query->where("book_id", $bookId);
        return $query;
    }

    public function scopeSort($query, $sortBy = "review_date", $sortValue  ="desc"){
        $query->orderBy($sortBy, $sortValue);
        return $query;
    }

    public function scopeFilter($query, $filterBy = "rating_star", $filterValue = "5"){

        $query->where($filterBy, $filterValue);
        return $query;
    }
}
