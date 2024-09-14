<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ProductPolicy
{
    /**
     * Kullanıcı sadece kendisine ait ürünleri görüntüleyebilir.
     */
    public function view(User $user, Product $product)
    {
        return $user->id === $product->user_id;
    }

    public function create(User $user)
    {
        return Auth::check();
    }

    /**
     * Kullanıcı sadece kendisine ait ürünleri güncelleyebilir.
     */
    public function update(User $user, Product $product)
    {
        return $user->id === $product->user_id;
    }

    /**
     * Kullanıcı sadece kendisine ait ürünleri silebilir.
     */
    public function delete(User $user, Product $product)
    {
        return $user->id === $product->user_id;
    }

    public function viewAny(User $user)
    {
        return Auth::check();
    }
}
