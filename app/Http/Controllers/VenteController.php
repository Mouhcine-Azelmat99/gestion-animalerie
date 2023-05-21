<?php

namespace App\Http\Controllers;

use App\Models\Vente;
use Illuminate\Http\Request;

class VenteController extends Controller
{
    // public function index(){
    //     $produits=Vente::all();
    //     return view("admin.produits",compact('produits'));
    // }

    public function getData(){
        // $data=Vente::all();
        $data=Vente::join('users','ventes.user_id','=', 'users.id')
        ->join('produits','ventes.product_id','=', 'produits.id')
        ->orderBy('id', 'DESC')
        ->get(['ventes.*','users.nom as user_nom','users.prenome','produits.nom as produit_nom']);

        $data2=Vente::join('users','ventes.user_id','=', 'users.id')
        ->join('animals','ventes.animal_id','=', 'animals.id')
        ->orderBy('id', 'DESC')
        ->get(['ventes.*','users.nom as user_nom','users.prenome','animals.espece','animals.race']);

        return response()->json([$data,$data2]);
    }

    public function getDataById($id){
        $data=Vente::find($id);
        return response()->json($data);
    }

    public function store(Request $request)
    {
       $res = Vente::create([
           'type' => $request->type,
           'user_id' => $request->user_id,
           'product_id' => $request->product_id,
           'animal_id' => $request->animal_id,
           'montant' => $request->montant
       ]);
       if($res){
        $data=[
            'status'=>"success",
            'message'=>"Vente item has been added"
        ];
        }
        else{
            $data=[
                'status'=>"danger",
                'message'=>"Error can't add the record"
            ];
        }
        return response()->json($data);
    }


    public function destroy($id)
    {
        $prod = Vente::find($id);
        $res=$prod->delete();
        if($res){
            $data=[
                'status'=>"success",
                'message'=>"Vente item has been deleted successfully"
            ];
            }
            else{
                $data=[
                    'status'=>"danger",
                    'message'=>"Error can't delete item"
                ];
            }
            return response()->json($data);
        }
}
