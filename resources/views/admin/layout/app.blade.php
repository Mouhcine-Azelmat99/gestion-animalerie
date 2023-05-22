<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- fontawesome  -->
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <!-- css file -->
    {{-- <link rel="stylesheet"href="{{ mix('/css/app.css') }}"> --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>@yield('title')</title>
  </head>
  <body style="overflow-x: visible">
    <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark text-white">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-warning text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Animalerie Admin</span>
                </a>
                <hr>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start text-white" id="menu">
                    <li class="nav-item my-3">
                        <a href="{{ route('dashboard') }}" class="nav-link text-white align-middle px-0">
                            <i class="fas fa-home"></i> <span class="ms-1 d-none d-sm-inline">DASHBOARD</span>
                        </a>
                    </li>
                    <li class="nav-item my-2">
                        <a href="{{ route('animaux') }}" class="nav-link text-white px-0 align-middle">
                            <i class="fas fa-dog"></i><span class="ms-1 d-none d-sm-inline">Animaux</span> </a>
                    </li>
                    <li class="nav-item my-2">
                        <a href="{{ route('produits.index') }}" class="nav-link text-white px-0 align-middle">
                            <i class="fas fa-shopping-bag"></i><span class="ms-1 d-none d-sm-inline">Produits</span> </a>
                    </li>
                    <li class="nav-item my-2">
                        <a href="{{ route('users') }}" class="nav-link text-white px-0 align-middle">
                            <i class="fas fa-users"></i><span class="ms-1 d-none d-sm-inline">Clients</span> </a>
                    </li>
                    <li class="nav-item my-2">
                        <a href="{{ route('ventes.index') }}" class="nav-link text-white px-0 align-middle">
                            <i class="fas fa-sack-dollar"></i> <span class="ms-1 d-none d-sm-inline">Ventes</span> </a>
                    </li>
                    <li class="nav-item my-2">
                        <a href="{{ route('reservations.admin') }}" class="nav-link text-white px-0 align-middle">
                            <i class="fas fa-clipboard-list"></i> <span class="ms-1 d-none d-sm-inline">Reservations</span> </a>
                    </li>
                    <li class="nav-item my-2">
                        <form id="logout-form" action="{{ route('logout') }}" method="POST">
                            <button class="btn btn-danger">Logout</button>
                            @csrf
                    </form>
                </ul>
            </ul>
            </div>
        </div>
        <div class="col py-3">
            <div class="content py-3">
                 @yield('content')
            </div>
        </div>
    </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
    <script src="{{ asset('/js/app.js') }}"></script>
    @yield('script')
  </body>
</html>
