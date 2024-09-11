<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public $data = [];

    public function __construct()
    {
        $this->data['pageTitle'] = "Ürün";
    }

    function index($username, $category, $product)
    {

        $this->data['user'] = User::where('slug', $username)->first();
        $this->data['category'] = Category::where('slug', $category)->first();
        $this->data['product'] = Product::where('slug', $product)->first();
        return view('frontend.products.detail', $this->data);
    }
}
