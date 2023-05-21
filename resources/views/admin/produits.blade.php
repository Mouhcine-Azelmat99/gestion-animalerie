@extends('admin.layout.app')

@section('title')
Produits
@endsection

@section('content')
    <div class="container">
        <div class="row">
            <h1 class="my-2">Espace des produits</h1>
            <hr>
        </div>
        <div class="row py-5">
            <div class="alert alert-danger" id="error_alert_produits" style="display: none">
            </div>
        {{-- Product form  --}}
        <form id="produits_form">
            <input type="hidden" id="product_id">
            <div class="my-2">
                <label for="nom_produit" class="form-label">Nom</label>
                <input id="nom_produit" type="text" class="form-control" name="nom">
            </div>
            <div class="my-2">
                <label for="prix_produit" class="form-label">prix</label>
                <input id="prix_produit" type="number" class="form-control" name="prix">
            </div>

            <div class="d-grid gap-2 mt-4">
                <button onclick="addProduct()" id="addProduct_btn" type="button" class="btn btn-lg btn-danger">Ajouter</button>
                <button onclick="updateProduct()" style="display: none" id="updateProduct_btn" type="button" class="btn btn-lg btn-primary">Update</button>
            </div>
        </form>
        {{-- search input --}}
        <div class="search d-flex my-4">
            <input type="text" id="searchProduct_input" class="form-control" placeholder="Rechercher des produits">
            <button class="btn btn-primary mx-2" onclick="searchProduct()"><i class="fas fa-search"></i></button>
        </div>
        <table class="table table-striped table-bordered mt-4">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Nom</th>
                <th scope="col">prix</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody id="produits_table">
            </tbody>
        </table>
    </div>
    </div>
@endsection

@section('script')
    <script src="{{ asset('/js/admin/produits.js') }}"></script>
@endsection
