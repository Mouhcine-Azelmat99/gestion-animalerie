<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Produit;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Vente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $data=[
            'ventes'=> Vente::count(),
            'animaux'=> Animal::count(),
            'produits'=> Produit::count(),
            'reservations'=> Reservation::count(),
        ];
        return view('home',compact('data'));
    }
}
