@extends('frontend.layouts.app')
@section('title', 'Sunucu Hatası')

@section('content')
    <div class="container text-center" style="padding: 100px 0;">
        <h1 class="display-1">500</h1>
        <h2>Üzgünüz, bir sorun oluştu.</h2>
        <p>
            Teknik bir problem yaşandı. Lütfen daha sonra tekrar deneyin.
        </p>
        <p class="mt-3">
            Veya <a href="{{ url('/') }}">anasayfa</a>'ya geri dönün.
        </p>
    </div>
@endsection
