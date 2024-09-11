<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public $data = [];

    public function __construct()
    {
        $this->data['pageTitle'] = "Anasayfa";
    }

    function index()
    {
        $this->data['users'] = User::get();
        return view('frontend.home', $this->data);
    }
}
