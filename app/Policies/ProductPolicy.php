<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ProductPolicy
{
    /**
     * Kullanıcı sadece kendisine ait kategorileri görüntüleyebilir.
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
     * Kullanıcı sadece kendisine ait kategorileri güncelleyebilir.
     */
    public function update(User $user, Product $product)
    {
        return $user->id === $product->user_id;
    }

    /**
     * Kullanıcı sadece kendisine ait kategorileri silebilir.
     */
    public function delete(User $user, Product $product)
    {
        return $user->id === $product->user_id;
    }

    /**
     * Kullanıcı sadece kendi kategorilerini listeleyebilir.
     */
    public function viewAny(User $user)
    {
        return Auth::check();
    }
}
