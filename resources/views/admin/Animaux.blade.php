@extends('admin.layout.app')

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
        {{-- Animal form  --}}
        <form id="animal_form">
            <input type="hidden" id="anim_id">
            <div class="my-2">
                <label for="espece" class="form-label">Espece</label>
                <input id="espece" type="text" class="form-control" name="espece">
            </div>
            <div class="my-2">
                <label for="race" class="form-label">Race</label>
                <input id="race" type="text" class="form-control" name="race">
            </div>
            <div class="my-2">
                <label for="age" class="form-label">age</label>
                <input id="age" type="number" class="form-control" name="age">
            </div>
            <div class="my-2">
                <label for="prix" class="form-label">prix</label>
                <input id="prix" type="number" class="form-control" name="prix">
            </div>

            <div class="d-grid gap-2 mt-4">
                <button onclick="addAnimal()" id="addAnimal_btn" type="button" class="btn btn-lg btn-danger">Ajouter</button>
                <button onclick="updateAnimal()" style="display: none" id="updateAnimal_btn" type="button" class="btn btn-lg btn-primary">Update</button>
            </div>
        </form>
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
    <script src="{{ asset('/js/admin/animaux.js') }}"></script>
@endsection
