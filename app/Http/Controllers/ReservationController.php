<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Vente;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index(){
        $user_id=1;
        $data1=Reservation::where('user_id',$user_id)
        ->join('produits','reservations.product_id','=', 'produits.id')
        ->orderBy('id', 'DESC')
        ->get(['reservations.*','produits.nom as produit_nom']);

        $data2=Reservation::where('user_id',$user_id)
        ->join('animals','reservations.animal_id','=', 'animals.id')
        ->orderBy('id', 'DESC')
        ->get(['reservations.*','animals.espece','animals.race']);
        return view("users.reservations",compact('data1','data2'));
    }
    public function adminPage(){
        $data1=Reservation::join('users','reservations.user_id','=', 'users.id')
        ->join('produits','reservations.product_id','=', 'produits.id')
        ->orderBy('id', 'DESC')
        ->get(['reservations.*','users.nom as user_nom','users.prenome','produits.nom as produit_nom']);

        $data2=Reservation::join('users','reservations.user_id','=', 'users.id')
        ->join('animals','reservations.animal_id','=', 'animals.id')
        ->orderBy('id', 'DESC')
        ->get(['reservations.*','users.nom as user_nom','users.prenome','animals.espece','animals.race']);
        return view("admin.reservations",compact('data1','data2'));
    }

    public function getData(){
        // $data=Reservation::all();
        $data=Reservation::join('users','ventes.user_id','=', 'users.id')
        ->join('produits','ventes.product_id','=', 'produits.id')
        ->orderBy('id', 'DESC')
        ->get(['ventes.*','users.nom as user_nom','users.prenome','produits.nom as produit_nom']);

        $data2=Reservation::join('users','ventes.user_id','=', 'users.id')
        ->join('animals','ventes.animal_id','=', 'animals.id')
        ->orderBy('id', 'DESC')
        ->get(['ventes.*','users.nom as user_nom','users.prenome','animals.espece','animals.race']);

        return response()->json([$data,$data2]);
    }

    public function getDataById($id){
        $data=Reservation::find($id);
        return response()->json($data);
    }

    public function store(Request $request)
    {
       $res = Reservation::create([
           'type' => $request->type,
           'user_id' => $request->user_id,
           'product_id' => $request->product_id,
           'animal_id' => $request->animal_id,
       ]);
       if($res){
        $data=[
            'status'=>"success",
            'message'=>"Reservation item has been added"
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
        $prod = Reservation::find($id);
        $res=$prod->delete();
        if($res){
            $data=[
                'status'=>"success",
                'message'=>"Reservation item has been deleted successfully"
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

        public function confirmer(Request $req,$id)
        {
            $res=Reservation::find($id);
            if($res->animal_id){
                $montant=$res->animal->prix;
            }else{
                $montant=$res->produit->prix;
            }
            $res->etat="confirme";
            $res->update();
            dd($res->animal_id);
            Vente::create([
                'type' =>$res->type,
                'animal_id ' =>$res->animal_id ,
                'product_id ' =>$res->product_id ,
                'montant' =>$montant,
                'user_id' =>$res->user_id,
            ]);
            return redirect()->back()->with('msg',"reservation confirmed");
        }

}
