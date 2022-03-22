<?php

namespace App\Repositories\Review;

use App\Models\Review;

class ReviewRepository
{

    public function selectByCondition($sort, $filter, $productId)
    {
        $sortBy = null;
        $sortValue = null;
        $filterBy = null;
        $filterValue = null;

        if (isset($sort)) {
            foreach ($sort as $key => $value) {
                $sortBy = $key;
                $sortValue = $value;
            }
        }

        if (isset($filter)) {
            foreach ($filter as $key => $value) {
                $filterBy = $key;
                $filterValue = $value;
            }
        }

        if (isset($sortBy)) {
            if (isset($filterBy)) {
                return Review::findReviews($productId)->sort($sortBy, $sortValue, $productId)->filter($filterBy, $filterValue)->with('user');
            }
            return Review::findReviews($productId)->sort($sortBy, $sortValue, $productId)->with('user');
        }
    }

    public function getAverageStar($productId)
    {
        return Review::findReviews($productId)
            ->selectRaw("AVG(rating_star) as avg_rating")->get();
    }

    public function getListStarClassify($productId)
    {
        return Review::findReviews($productId)
            ->selectRaw("rating_star, count(rating_star) as count")
            ->groupBy("rating_star")
            ->get();
    }

    // public function createNewReview($productId, $reviewTitle, $reviewDetails, $ratingStar)
    // {
    //     $review = new Review();
    //     $review->product_id = $productId;
    //     $review->review_title = $reviewTitle;
    //     $review->review_details = $reviewDetails;
    //     $review->rating_star = $ratingStar;

    //     $date = date_create();
    //     $review->review_date = date_format($date, 'Y-m-d H:i:s');

    //     $review->save();
    //     return $review;
    // }
}