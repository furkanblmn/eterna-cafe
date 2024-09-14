@extends('frontend.layouts.app')
@section('title', $product->title)
@section('content')

    <div class="container detail-container">
        <div class="row">
            <div class="col-md-12">
                <a href="{{ url('/' . request()->segment(1) . '/' . request()->segment(2)) }}" class="btn btn-secondary mb-3">
                    <i class="bi bi-arrow-left"></i> Geri Dön
                </a>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <img src="{{ $product->file->orj_link }}" alt="{{ $product->title }}" class="product-image">
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 text-center">
                <h1 class="product-title">{{ $product->title }}</h1>
                <p class="product-price">{{ $product->price }}₺</p>
            </div>
        </div>

        <div class="row product-list">
            <div class="col-md-12">
                {!! $product->content !!}
            </div>
        </div>

        <div class="similar-product my-5">
            <h4 class="title mb-3">Benzer Ürünler</h4>
            <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                    @foreach ($similar_products as $similar)
                        <div class="swiper-slide">
                            <x-item-card :title="$similar->title" :image-url="$similar->file->orj_link" btnText="Detaya Bak" :detail-url="route('frontend.products.detail', [
                                'username' => $user->slug,
                                'category' => $category->slug,
                                'product' => $similar->slug,
                            ])" />
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>

@endsection
@section('js')
    <script>
        new Swiper(".mySwiper", {
            slidesPerView: 4,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    </script>
@endsection
