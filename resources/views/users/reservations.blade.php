@extends('users.layout.app')

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
                <th scope="col">Type</th>
                <th scope="col">Info</th>
                <th scope="col">Etat</th>
            </tr>
            </thead>
            <tbody>
                @foreach ($data1 as $element)
                    <tr>
                        <td>{{ $element->id }}</td>
                        <td>{{ $element->type }}</td>
                        <td>{{ $element->produit_nom }}</td>
                        <td>{{ $element->etat }}</td>
                    </tr>
                @endforeach
                @foreach ($data2 as $element)
                    <tr>
                        <td>{{ $element->id }}</td>
                        <td>{{ $element->type }}</td>
                        <td>{{ $element->espece }} - {{ $element->race }}</td>
                        <td>{{ $element->etat }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    </div>
@endsection
