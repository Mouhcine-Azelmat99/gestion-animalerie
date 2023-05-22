<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ClientController extends Controller
{
    // public function index(){
    //     $Users=User::all();
    //     return view("admin.Users",compact('Users'));
    // }

    public function getUserId(){
        $user_id=Auth::id();
        $data=['user_id'=>$user_id];
        return response()->json($data);
    }

    public function getData(){
        $data=User::all();
        return response()->json($data);
    }

    public function getDataById($id){
        $data=User::find($id);
        return response()->json($data);
    }
    public function getCurrentUser(){
        $user=Auth::user();
        return response()->json($user);
    }

    public function store(Request $request)
    {
       $res = User::create([
           'nom' => $request->nom,
           'prenome' => $request->prenome,
           'tel' => $request->tel,
           'adress' => $request->adress,
           'email' => $request->email,
           'password' => Hash::make($request->password)
        ]);
       if($res){
        $data=[
            'status'=>"success",
            'message'=>"User item has been added"
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
        $user = User::find($id);
        $user->nom=$request->nom;
        $user->prenome=$request->prenome;
        $user->tel=$request->tel;
        $user->adress=$request->adress;
        $user->email=$request->email;
        if($request->password){
            $user->password=Hash::make($request->password);
        }
        $res=$user->update();
        if($res){
            $data=[
                'status'=>"success",
                'message'=>"User item has been updated successfully"
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
        $prod = User::find($id);
        $res=$prod->delete();
        if($res){
            $data=[
                'status'=>"success",
                'message'=>"User item has been deleted successfully"
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
