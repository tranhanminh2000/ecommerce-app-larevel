<?php

namespace App\Repositories\Book;

use App\Models\Book;
use Illuminate\Support\Facades\DB;

class BookRepository
{
    public function selectById($id)
    {
        $book = Book::with('author', 'category', 'discount')->find($id);

        return $book;
    }

    public function selectByCondition($request)
    {
        if ($request->has("sort")) {
            $sort = $request->get("sort");

            if ($sort['type'] == "onSale") {
                $query = Book::sortByOnSale()->filter($request);
            }
            if ($sort['type'] == "recommend") {
                $query = Book::sortByRecommend()->filter($request);
            }
            if ($sort['type'] == "popular") {
                $query = Book::sortByPopular()->filter($request);
            }
            if ($sort['type'] == "desc") {
                $query = Book::sortByOrder('desc')->filter($request);
            }
            if ($sort['type'] == "asc") {
                $query = Book::sortByOrder('asc')->filter($request);
            }
        }

        return $query;
    }

    public function selectByMostDiscount()
    {
    }

    public function selectByPopular()
    {
    }

    public function selectByRecommended()
    {
    }

    public function selectByOrder(string $orderBy)
    {
    }

    public function update($id)
    {
        //
    }


    public function delete($id)
    {
        //
    }
}
