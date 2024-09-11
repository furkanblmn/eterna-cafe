<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public $data = [];

    public function __construct()
    {
        $this->data['pageTitle'] = "Kategoriler";
    }


    function index($username)
    {
        $this->data['user'] = User::with('categories')->where('slug', $username)->first();
        return view('frontend.categories.list', $this->data);
    }

    function products($username, $category)
    {
        $this->data['user'] = User::where('slug', $username)->first();
        $this->data['category'] = Category::with('products')->where('slug', $category)->first();
        return view('frontend.products.list', $this->data);
    }
}
