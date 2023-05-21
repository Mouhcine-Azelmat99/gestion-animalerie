@extends('users.layout.app')

@section('title')
    Animaux
@endsection

@section('content')
    <div class="container">
        <div class="row">
            <h1 class="my-2">Espace des animaux</h1>
            <hr>
        </div>
        <div class="row py-5">
            <div class="alert alert-danger" id="error_alert" style="display: none">
        </div>
        {{-- search input --}}
        <div class="search d-flex my-4">
            <input type="text" id="searchAnimal_input" class="form-control" placeholder="Rechercher des animaux">
            <button class="btn btn-primary mx-2" onclick="searchAnimal()"><i class="fas fa-search"></i></button>
        </div>
        <table class="table table-striped table-bordered mt-4">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Espece</th>
                <th scope="col">race</th>
                <th scope="col">age</th>
                <th scope="col">prix</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody id="animaux_table">
            </tbody>
        </table>
    </div>
    </div>
@endsection


@section('script')
    <script src="{{ asset('/js/users/animaux.js') }}"></script>
@endsection
