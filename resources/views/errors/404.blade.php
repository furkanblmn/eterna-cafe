@extends('frontend.layouts.app')
@section('title', 'Sayfa Bulunamadı')

@section('content')
    <div class="container text-center" style="padding: 100px 0;">
        <h1 class="display-1">404</h1>
        <h2>Üzgünüz, aradığınız sayfa bulunamadı.</h2>
        <p>
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>

        <a href="{{ url()->previous() }}" class="btn btn-primary">Geri Dön</a>

        <p class="mt-3">
            Veya <a href="{{ url('/') }}">anasayfa</a>'ya geri dönün.
        </p>
    </div>
@endsection
