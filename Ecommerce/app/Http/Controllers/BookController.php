<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Repositories\Book\BookRepository;
use App\Support\Collection;
use Illuminate\Http\Request;


class BookController extends Controller
{
    public $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $size  = $request->query("size");

        $books = $this->bookRepository->selectByCondition($request)->get()->unique();

        $result = (new Collection($books))->paginate($size);

        return  $result;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // null
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // null
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $book = $this->bookRepository->selectById($id);
        return $book;
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

    public function getMostDiscount(Request $request)
    {
        $size = $request->query('size');

        $books = Book::sortByOnSale()->get();

        return $books->unique()->take($size);
    }

    public function getRecommended(Request $request)
    {
        $size = $request->query('size');

        $books = Book::sortByRecommend()->get();

        return $books->unique()->take($size);
    }

    public function getPopular(Request $request)
    {
        $size = $request->query('size');

        $books = Book::sortByPopular()->get();

        return $books->unique()->take($size);
    }
}
