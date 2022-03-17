<?php

namespace App\Repositories\Review;

use App\Models\Review;

class ReviewRepository
{
    public function selectByCondition($sort, $filter, $bookId)
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
                return Review::findReviews($bookId)->sort($sortBy, $sortValue, $bookId)->filter($filterBy, $filterValue);
            }
            return Review::findReviews($bookId)->sort($sortBy, $sortValue, $bookId);
        }
    }

    public function getAverageStar($bookId)
    {
        return Review::findReviews($bookId)
            ->selectRaw("AVG(rating_star) as avg_rating")->get();
    }

    public function getListStarClassify($bookId)
    {
        return Review::findReviews($bookId)
            ->selectRaw("rating_star, count(rating_star) as count")
            ->groupBy("rating_star")
            ->get();
    }

    public function createNewReview($bookId, $reviewTitle, $reviewDetails, $ratingStar)
    {
        $review = new Review();
        $review->book_id = $bookId;
        $review->review_title = $reviewTitle;
        $review->review_details = $reviewDetails;
        $review->rating_star = $ratingStar;

        $date = date_create();
        $review->review_date = date_format($date, 'Y-m-d H:i:s');

        $review->save();
        return $review;
    }
}
