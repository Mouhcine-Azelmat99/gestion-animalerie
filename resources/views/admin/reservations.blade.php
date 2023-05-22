@extends('admin.layout.app')

@section('title')
Reservations
@endsection

@section('content')
    <div class="container">
        <div class="row">
            <h1 class="my-2">Espace des Reservations</h1>
            <hr>
        </div>
        <div class="row py-5">
            @if (Session::has('msg'))
                <div class="alert alert-success">
                    {{ Session::get('msg') }}
                </div>
            @endif
            </div>
        </div>
        {{-- search input --}}
        <div class="search d-flex my-4">
            <input type="text" id="searchReservation_input" class="form-control" placeholder="Rechercher des reservations">
            <button class="btn btn-primary mx-2" onclick="searchReservation()"><i class="fas fa-search"></i></button>
        </div>
        <table class="table table-striped table-bordered mt-4">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Type</th>
                <th scope="col">Info</th>
                <th scope="col">Prix</th>
                <th scope="col">Client</th>
                <th scope="col">Etat</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody id="table_reservations">
            </tbody>
        </table>
    </div>
    </div>
@endsection

@section('script')
<script src="{{ asset('js/admin/reservations.js') }}"></script>
@endsection
