<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class Book extends Model
{
    use HasFactory, HasApiTokens;

    public $timestamps = false;
    protected $table = 'books';

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function discount()
    {
        return $this->hasOne(Discount::class);
    }

    public function order_item()
    {
        $this->hasMany(Order_items::class);
    }

    public function scopeSortByOnSale()
    {
        $result = Book::select('book.id', 'book_title', 'book_summary', 'book_price', 'book_cover_photo', 'author_name', "discount_price", DB::raw("book_price - discount_price AS  most_discount"))
            ->join("discount", "discount.book_id", '=', 'book.id')
            ->leftJoin("author", "author.id", '=', 'book.author_id')
            ->leftJoin("review", "review.book_id", '=', 'book.id')
            ->leftJoin("category", "category.id", '=', 'book.category_id')
            ->groupBy("book.id", "book_title", 'book_summary', 'book_price', "discount_price", 'book_cover_photo', "author_name")
            ->orderBy("most_discount", 'desc')
            ->orderBy("discount_price", 'asc');

        return $result;
    }

    public function scopeSortByRecommend()
    {
        $result = Book::select(
            'book.id',
            'book_title',
            'book_summary',
            'book_price',
            'book_cover_photo',
            'author_name',
            'discount_price',
            DB::raw('AVG(review.rating_star) as avg_rating')
        )
            ->leftJoin("discount", "discount.book_id", '=', 'book.id')
            ->join("review", "review.book_id", '=', 'book.id')
            ->leftJoin("author", "author.id", '=', 'book.author_id')
            ->groupBy("book.id", "book_title", 'book_summary', 'book_price', "discount_price", 'book_cover_photo', 'author_name')
            ->orderBy("avg_rating", 'DESC')
            ->orderBy("discount_price", 'ASC')
            ->orderBy("book_price", 'ASC');
        return $result;
    }

    public function scopeSortByPopular()
    {
        $result = Book::select(
            'book.id',
            'book_title',
            'book_summary',
            'book_price',
            'book_cover_photo',
            'author_name',
            'discount_price',
            DB::raw('COUNT(review.id) as total_review')
        )
            ->leftJoin("discount", "discount.book_id", '=', 'book.id')
            ->join("review", "review.book_id", '=', 'book.id')
            ->leftJoin("author", "author.id", '=', 'book.author_id')
            ->leftJoin("category", "category.id", '=', 'book.category_id')
            ->groupBy("book.id", "book_title", 'book_summary', 'book_price', "discount_price", 'book_cover_photo', 'author_name')
            ->orderBy("total_review", 'DESC')
            ->orderBy("discount_price", 'ASC')
            ->orderBy("book_price", 'ASC');

        return $result;
    }

    public function scopeSortByOrder($query, $orderBy)
    {
        $query = Book::select(
            'book.id',
            'book_title',
            'book_summary',
            'book_price',
            'book_cover_photo',
            'author_name',
            "discount_price",
        )->selectRaw("CASE
        WHEN discount_price IS NULL
        THEN book_price
        ELSE discount_price
        END as final_price
        ")
            ->leftJoin("discount", "discount.book_id", '=', 'book.id')
            ->leftJoin("review", "review.book_id", '=', 'book.id')
            ->leftJoin("author", "author.id", '=', 'book.author_id')
            ->leftJoin("category", "category.id", '=', 'book.category_id')
            ->groupBy("book.id", "book_title", 'book_summary', 'book_price', "discount_price", 'book_cover_photo', 'author_name')
            ->orderBy("final_price", $orderBy);

        return $query;
    }

    public function scopeFilter($query, $request)
    {
        if ($request->has("filter")) {
            $filter = $request->get("filter");
            if (isset($filter["authorName"])) {
                $query->where("author_name", $filter["authorName"]);
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
