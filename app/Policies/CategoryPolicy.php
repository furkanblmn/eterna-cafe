<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class CategoryPolicy
{
    /**
     * Kullanıcı sadece kendisine ait kategorileri görüntüleyebilir.
     */
    public function view(User $user, Category $category)
    {
        return $user->id === $category->user_id;
    }

    public function create(User $user)
    {
        return Auth::check();
    }

    /**
     * Kullanıcı sadece kendisine ait kategorileri güncelleyebilir.
     */
    public function update(User $user, Category $category)
    {
        return $user->id === $category->user_id;
    }

    /**
     * Kullanıcı sadece kendisine ait kategorileri silebilir.
     */
    public function delete(User $user, Category $category)
    {
        return $user->id === $category->user_id;
    }

    public function viewAny(User $user)
    {
        return Auth::check();
    }
}
