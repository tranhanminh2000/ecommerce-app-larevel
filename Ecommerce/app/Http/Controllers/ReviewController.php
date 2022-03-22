<?php

namespace App\Http\Controllers;


use App\Repositories\Review\ReviewRepository;
use App\Support\Collection;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public ReviewRepository $reviewRepository;

    public function __construct(ReviewRepository $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $size = $request->query('size');
        $sort = $request->query('sort');
        $filter = $request->query('filter');
        $productId = $request->query('productId');

        $reviews = $this->reviewRepository->selectByCondition($sort, $filter, $productId)->get()->unique();

        $result = (new Collection($reviews))->paginate($size);
        $avgStar = $this->reviewRepository->getAverageStar($productId);
        $listStarClassify = $this->reviewRepository->getListStarClassify($productId);

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->productRepository->getProductById($id);
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