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
        $this->data['user'] = User::where('slug', $username)->firstOrFail();
        $this->data['category'] = Category::where('slug', $category)->firstOrFail();
        $this->data['product'] = Product::where('slug', $product)->firstOrFail();
        $this->data['similar_products'] = Product::whereHas('categories', function ($query) {
            $query->where('slug', $this->data['category']->slug);
        })->where('id', '!=', $this->data['product']->id)->limit(6)->get();
        return view('frontend.products.detail', $this->data);
    }
}
