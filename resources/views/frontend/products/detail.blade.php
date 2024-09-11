@extends('frontend.layouts.app')
@section('title', $pageTitle)
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
                <img src="{{ $product->file_path }}" alt="{{ $product->title }}" class="product-image">
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

    </div>

@endsection
