@extends('users.layout.app')

@section('title')
    Animalerie-Home
@endsection

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-lg-6 my-3">
                <div class="bg-primary p-5">
                    <h2 class="text-center">Ventes</h2>
                    <h1 class="text-center">
                        {{ $data['ventes'] }}
                    </h1>
                </div>
            </div>
            <div class="col-lg-6 my-3">
                <div class="bg-primary p-5">
                    <h2 class="text-center">reservations</h2>
                    <h1 class="text-center">
                        {{ $data['reservations'] }}
                    </h1>
                </div>
            </div>
            <div class="col-lg-6 my-3">
                <div class="bg-primary p-5">
                    <h2 class="text-center">Animax</h2>
                    <h1 class="text-center">
                        {{ $data['animaux'] }}
                    </h1>
                </div>
            </div>
            <div class="col-lg-6 my-3">
                <div class="bg-primary p-5">
                    <h2 class="text-center">Produits</h2>
                    <h1 class="text-center">
                        {{ $data['produits'] }}
                    </h1>
                </div>
            </div>
            <div class="col-lg-6 my-3">
                <div class="bg-primary p-5">
                    <h2 class="text-center">Ventes</h2>
                    <h1 class="text-center">
                        {{ $data['ventes'] }}
                    </h1>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
