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
                        <div class="card h-100">
                            <a
                                href="{{ route('frontend.products.detail', ['username' => $user->slug, 'category' => $category->slug, 'product' => $product->slug]) }}">
                                <img src="{{ $product->file->orj_link }}" class="cover-image" alt="{{ $product->title }}">
                            </a>
                            <div class="card-body text-center">
                                <h5 class="card-title">{{ $product->title }}</h5>
                                <a href="{{ route('frontend.products.detail', ['username' => $user->slug, 'category' => $category->slug, 'product' => $product->slug]) }}"
                                    class="btn btn-primary mt-3">Detaya Bak</a>
                            </div>
                        </div>
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
