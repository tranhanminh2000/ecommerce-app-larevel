<?php

namespace App\Http\Controllers;


use App\Models\Review;
use App\Repositories\Review\ReviewRepository;
use App\Support\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public ReviewRepository $reviewRepository;

    public function __construct(reviewRepository $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }


    public function index(Request $request)
    {
        $size = $request->query('size');
        $sort = $request->query('sort');
        $filter = $request->query('filter');
        $bookId = $request->query('bookId');

        $reviews = $this->reviewRepository->selectByCondition($sort, $filter, $bookId)->get()->unique();

        $result = (new Collection($reviews))->paginate($size);
        $avgStar = $this->reviewRepository->getAverageStar($bookId);
        $listStarClassify = $this->reviewRepository->getListStarClassify($bookId);

        return response()->json([
            "success" => true,
            "data" => [
                "avg_star" => $avgStar[0]["avg_rating"],
                "listStarClassify" => $listStarClassify,
                "reviewsData" => $result
            ]
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'bookId' => 'required',
            'reviewTitle' => 'required',
            'ratingStar' => 'required',
        ]);

        // Check validation failure
        if ($validator->fails()) {
            $result = response()->json([
                "success" => false,
                "message" => $validator->getMessageBag(),
            ], 404);

            return $result;
        }

        $bookId = $request->bookId;
        $reviewTile = $request->reviewTitle;
        $reviewDetails = $request->reviewDetails;
        $ratingStar = $request->ratingStar;

        $result = $this->reviewRepository->createNewReview($bookId, $reviewTile, $reviewDetails, $ratingStar);

        return  response()->json([
            "success" => true,
            "newReview" => $result,
        ], 200);;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
