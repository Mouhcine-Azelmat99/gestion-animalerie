<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Produit;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Vente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function index(){
        $data=[
            'ventes'=> Vente::count(),
            'reservations'=> Reservation::count(),
            'animaux'=> Animal::count(),
            'produits'=> Produit::count(),
            'users'=> User::count(),
            'caisse'=> DB::table('ventes')->sum('montant')
        ];
        return view("admin.dashboard",compact('data'));
    }
    public function ventes(){
        return view("admin.ventes");
    }

    public function users(){
        $users=User::all();
        return view("admin.clients",compact('users'));
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return redirect()->back()->with('msg','Client est supprimmer en success');
    }

}
