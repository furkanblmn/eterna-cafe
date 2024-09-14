@extends('frontend.layouts.app')
@section('title', $pageTitle)
@section('content')

    <div class="container detail-container">
        <div class="row">
            <div class="col-md-12 ">
                <a href="{{ url('/') }}" class="btn btn-secondary mb-3">
                    <i class="bi bi-arrow-left"></i> Geri Dön
                </a>
            </div>
        </div>
        <div class="row">
            @if (count($user->categories))
                @foreach ($user->categories as $category)
                    <div class="col-md-4 mb-4">
                        <x-item-card :title="$category->title" :image-url="$category->file->orj_link" btnText="Ürünleri Gör" :detail-url="route('frontend.categories.products', [
                            'username' => $user->slug,
                            'category' => $category->slug,
                        ])" />
                    </div>
                @endforeach
            @else
                <div class="alert alert-warning d-flex align-items-center" role="alert">
                    <div>
                        Bu kullanıcı kategori eklememiş
                    </div>
                </div>
            @endif

        </div>
    </div>

@endsection
