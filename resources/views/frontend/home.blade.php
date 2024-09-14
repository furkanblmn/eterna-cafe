@extends('frontend.layouts.app')
@section('title', $pageTitle)
@section('content')
    <h1 class="text-center">Kullanıcılar</h1>
    <div class="container my-5">
        <div class="row mt-4">
            @foreach ($users as $user)
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{ $user->username }}</h5>
                            <p class="card-text">{{ $user->username }} restoranının ürünleri için tıklayın.</p>
                            <a href="{{ route('frontend.categories.list', ['username' => $user->slug]) }}" class="btn btn-primary">Kategorileri Gör</a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection
