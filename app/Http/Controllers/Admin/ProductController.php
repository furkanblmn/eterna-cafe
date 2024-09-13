<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Output;
use App\Http\Controllers\Controller;
use App\Http\Requests\Product\DestroyRequest;
use App\Http\Requests\Product\EditRequest;
use App\Http\Requests\Product\IndexRequest;
use App\Http\Requests\Product\StoreRequest;
use App\Http\Requests\Product\UpdateRequest;
use App\Models\Category;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductController extends Controller
{

    /**
     * Display a listing of the resource.
     */

    public function index(IndexRequest $request)
    {
        $data['products'] = Product::where('user_id', Auth::id())->with(['file', 'categories'])->get();

        return Inertia::render('Products/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(IndexRequest $request)
    {
        $data['categories'] = Category::where('user_id', Auth::id())->get();
        return Inertia::render('Products/CreateEdit', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            DB::beginTransaction();
            $input = $request->except('categories');
            $input['user_id'] = Auth::id();


            $product = Product::create($input);

            $product->categories()->sync($request->categories);


            DB::commit();
            return Output::ok([
                'message' => "Kayıt işlemi başarıyla tamamlandı"
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return Output::fails($e->getMessage());
        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EditRequest $request, Product $product)
    {
        $data['product'] = Product::with(['file', 'categories'])->find($product->id);
        $data['categories'] = Category::where('user_id', Auth::id())->get();
        return Inertia::render('Products/CreateEdit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Product $product)
    {
        try {
            DB::beginTransaction();

            $input = $request->except('categories');
            $product->update($input);

            $product->categories()->sync($request->categories);

            DB::commit();
            return Output::ok([
                'message' => "Güncelleme işlemi başarıyla tamamlandı"
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return Output::fails($e->getMessage());
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroyRequest $request, Product $product)
    {
        DB::beginTransaction();
        try {
            $product = Product::findOrFail($product->id);

            $product->categories()->detach();

            $product->delete();

            DB::commit();
            return response()->json(['status' => 'success', 'message' => 'Ürün başarıyla silindi.']);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
