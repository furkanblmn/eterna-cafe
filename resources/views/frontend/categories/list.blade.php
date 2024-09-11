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
                        <div class="card h-100">
                            <a
                                href="{{ route('frontend.categories.products', ['username' => $user->slug, 'category' => $category->slug]) }}">
                                <img src="{{ $category->file_path }}" class="cover-image" alt="{{ $category->title }}">
                            </a>
                            <div class="card-body text-center">
                                <h5 class="card-title">{{ $category->title }}</h5>
                                <a href="{{ route('frontend.categories.products', ['username' => $user->slug, 'category' => $category->slug]) }}"
                                    class="btn btn-primary mt-3">Ürünleri Gör</a>
                            </div>
                        </div>
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
