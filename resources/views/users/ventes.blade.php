@extends('users.layout.app')

@section('title')
Ventes
@endsection

@section('content')
    <div class="container">
        <div class="row">
            <h1 class="my-2">Espace des Ventes</h1>
            <hr>
        </div>
        <div class="row py-5">
            <div class="alert alert-danger" id="error_alert_ventes" style="display: none">
            </div>
        {{-- search input --}}
        <div class="search d-flex my-4">
            <input type="text" id="searchVente_input" class="form-control" placeholder="Rechercher des ventes">
            <button class="btn btn-primary mx-2" onclick="searchVente()"><i class="fas fa-search"></i></button>
        </div>
        <table class="table table-striped table-bordered mt-4">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Type</th>
                <th scope="col">Client</th>
                <th scope="col">Info sur Vente</th>
                <th scope="col">Montant</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody id="ventes_table">
            </tbody>
        </table>
    </div>
    </div>
@endsection

@section('script')
    <script src="{{ asset('/js/users/ventes.js') }}"></script>
@endsection
