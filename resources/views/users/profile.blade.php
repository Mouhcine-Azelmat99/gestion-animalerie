@extends('users.layout.app')

@section('title')
Profile
@endsection

@section('content')
    <div class="container">
        <div class="row">
            <h1 class="my-2">Profile</h1>
            <hr>
        </div>
        <div class="row py-5">
            <div class="alert alert-danger" id="error_alert_ventes" style="display: none">
            </div>

        <form id="users_form" style="display: none">
            <input type="hidden" id="user_id">
            <div class="my-2">
                <label for="nom_user" class="form-label">Nom</label>
                <input id="nom_user" type="text" class="form-control" name="nom">
            </div>
            <div class="my-2">
                <label for="prenom_user" class="form-label">prenom</label>
                <input id="prenom_user" type="text" class="form-control" name="prenom">
            </div>
            <div class="my-2">
                <label for="tel_user" class="form-label">tel</label>
                <input id="tel_user" type="text" class="form-control" name="tel">
            </div>
            <div class="my-2">
                <label for="adress_user" class="form-label">adress</label>
                <input id="adress_user" type="text" class="form-control" name="adress">
            </div>
            <div class="my-2">
                <label for="email_user" class="form-label">email</label>
                <input id="email_user" type="email" class="form-control" name="email">
            </div>
            <div class="my-2">
                <label for="password_user" class="form-label">password</label>
                <input id="password_user" type="text" class="form-control" name="password">
            </div>
            <div class="d-grid gap-2 mt-4">
                <button onclick="updateUser()" style="display: none" id="updateUser_btn" type="button" class="btn btn-lg btn-primary">Update</button>
            </div>
        </form>
            <table class="table table-striped table-bordered mt-4">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Nom</th>
                <th scope="col">Prenome</th>
                <th scope="col">Tel</th>
                <th scope="col">Adress</th>
                <th scope="col">Email</th>
            </tr>
            </thead>
            <tbody id="users_table">
            </tbody>
        </table>
        <div class="d-grid gap-2 mt-4">
            <button class="btn btn-lg btn-primary" onclick="showForm()" id="editProfile_btn">Modifier</button>
        </div>

    </div>
    </div>
@endsection

@section('script')
    <script src="{{ asset('/js/users/profile.js') }}"></script>
@endsection
