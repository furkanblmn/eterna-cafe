@extends('frontend.layouts.app')
@section('title', $pageTitle)
@section('content')

    <div class="container detail-container">
        <div class="row">
            <div class="col-md-12">
                <a href="{{ url('/' . request()->segment(1)) }}" class="btn btn-secondary mb-3">
                    <i class="bi bi-arrow-left"></i> Geri Dön
                </a>
            </div>
        </div>
        <div class="row">
            @if (count($category->products))
                @foreach ($category->products as $product)
                    <div class="col-md-4 mb-4">
                        <x-item-card :title="$product->title" :image-url="$product->file->orj_link" btnText="Detaya Bak" :detail-url="route('frontend.products.detail', [
                            'username' => $user->slug,
                            'category' => $category->slug,
                            'product' => $product->slug,
                        ])" />
                    </div>
                @endforeach
            @else
                <div class="alert alert-warning d-flex align-items-center" role="alert">
                    <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Warning:">
                        <use xlink:href="#exclamation-triangle-fill" />
                    </svg>
                    <div>
                        Bu kategoriye ürün eklememiş
                    </div>
                </div>
            @endif

        </div>
    </div>

@endsection
