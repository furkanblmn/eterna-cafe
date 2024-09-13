<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Output;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\DestroyRequest;
use App\Http\Requests\Category\EditRequest;
use App\Http\Requests\Category\IndexRequest;
use App\Http\Requests\Category\StoreRequest;
use App\Http\Requests\Category\UpdateRequest;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Yajra\DataTables\Facades\DataTables;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(IndexRequest $request)
    {
        $data['categories'] = Category::where('user_id', Auth::id())->with('file')->get();

        return Inertia::render('Categories/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(IndexRequest $request)
    {
        return Inertia::render('Categories/CreateEdit');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            DB::beginTransaction();
            $input = $request->all();
            $input['user_id'] = Auth::id();

            Category::create($input);
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
    public function edit(EditRequest $request, Category $category)
    {
        $data['category'] = Category::with('file')->find($category->id);
        return Inertia::render('Categories/CreateEdit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Category $category)
    {
        try {
            DB::beginTransaction();
            $input = $request->all();

            $category->update($input);

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
    public function destroy(DestroyRequest $request, Category $category)
    {
        DB::beginTransaction();
        try {
            // Kategori bulunuyor
            $category = Category::findOrFail($category->id);

            // Kategoriye bağlı ürünler arasındaki ilişkiler pivot tablosundan siliniyor
            $category->products()->detach();

            // Kategori siliniyor
            $category->delete();

            DB::commit();
            return response()->json(['status' => 'success', 'message' => 'Kategori ve ilişkileri başarıyla silindi.']);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
