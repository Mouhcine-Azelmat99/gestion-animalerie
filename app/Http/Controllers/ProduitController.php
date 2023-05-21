<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    public function index(){
        $produits=Produit::all();
        return view("admin.produits",compact('produits'));
    }

    public function getData(){
        $data=Produit::all();
        return response()->json($data);
    }

    public function getDataById($id){
        $data=Produit::find($id);
        return response()->json($data);
    }

    public function store(Request $request)
    {
       $res = Produit::create([
           'nom' => $request->nom,
           'prix' => $request->prix
       ]);
       if($res){
        $data=[
            'status'=>"success",
            'message'=>"Produit item has been added"
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

    public function update(Request $request,$id)
    {
        $data=[
            'nom' => $request->nom,
            'prix' => $request->prix
         ];
        $prod = Produit::find($id);
        $res=$prod->update($data);
        if($res){
            $data=[
                'status'=>"success",
                'message'=>"Produit item has been updated successfully"
            ];
        }
        else{
            $data=[
                'status'=>"danger",
                'message'=>"Error can't update item"
            ];
        }
        return response()->json($data);
    }

    public function destroy($id)
    {
        $prod = Produit::find($id);
        $res=$prod->delete();
        if($res){
            $data=[
                'status'=>"success",
                'message'=>"Produit item has been deleted successfully"
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
