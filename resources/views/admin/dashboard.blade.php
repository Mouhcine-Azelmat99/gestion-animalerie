@extends('admin.layout.app')

@section('title')
    Restaurent Admin
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
                    <h2 class="text-center">La caisse</h2>
                    <h1 class="text-center">
                        {{ $data['caisse'] }}
                    </h1>
                </div>
            </div>
            <div class="col-lg-6 my-3">
                <div class="bg-primary p-5">
                    <h2 class="text-center">Clients</h2>
                    <h1 class="text-center">
                        {{ $data['users'] }}
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
                    <h2 class="text-center">Reservations</h2>
                    <h1 class="text-center">
                        {{ $data['reservations'] }}
                    </h1>
                </div>
            </div>
        </div>
        <div class="row py-5">
            @if (Session::has('msg'))
            <div class="alert alert-success">
                {{ Session::get('msg') }}
            </div>
        @endif
        {{-- <table class="table table-striped table-bordered">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Firstname</th>
                <th scope="col">lastname</th>
                <th scope="col">phone</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
            </tr>
            </thead>
            <tbody>
                @foreach ($users as $user)
            <tr>
                <td>{{ $user->id }}</td>
                <td>{{ $user->firstname }}</td>
                <td>{{ $user->lastname }}</td>
                <td>{{ $user->tel }}</td>
                <td>{{ $user->email }}</td>
                <td>
                    @if(!($user->isAdmin))
                        <form action="{{ route('setAdmin',$user->id)}}" method="POST">
                        @csrf
                        @method('put')
                        <button class="btn btn-danger bg-danger" type="submit">Set Admin</button>
                        </form>
                    @else
                        <span class="bg-success p-2 text-white px-4">Admin</span>
                    @endif
                </td>
            @endforeach
            </tr>
            </tbody>
        </table> --}}
    </div>
    </div>
@endsection
