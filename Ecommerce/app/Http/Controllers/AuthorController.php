<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function getAuthorsName()
    {
        $authorsName = Author::select("author_name")->orderBy("author_name")->get();

        $result = $authorsName->map(function ($value) {
            return $value["author_name"];
        })->all();

        return response()->json([
            "success" => true,
            "data" => ["authorsName" => $result],
        ]);
    }
}
