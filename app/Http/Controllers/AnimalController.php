<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    public function index(){
        $animaux=Animal::all();
        return view("admin.Animaux",compact('animaux'));
    }
    public function getData(){
        $data=Animal::all();
        return response()->json($data);
    }
    public function getDataById($id){
        $data=Animal::find($id);
        return response()->json($data);
    }

    public function update(Request $request,$id)
    {
        $data=[
            'espece'=>$request->espece,
            'race'=>$request->race,
            'age'=>$request->age,
            'prix'=>$request->prix
        ];
        $anim = Animal::find($id);
        $res=$anim->update($data);
        if($res){
            $data=[
                'status'=>"success",
                'message'=>"animal item has been updated"
            ];
        }
        else{
            $data=[
                'status'=>"danger",
                'message'=>"Error can't update the record"
            ];
        }
        return response()->json($data);
    }


    public function destroy($id)
    {
        $anim = Animal::find($id);
        $anim->delete();
        return redirect()->back()->with('msg','Animal est supprimmer en success');
    }

    public function deleteAnimal($id)
    {
        $anim = Animal::find($id);
        $res=$anim->delete();
        if($res){
            $data=[
                'status'=>"success",
                'message'=>"animal item has been deleted"
            ];
        }
        else{
            $data=[
                'status'=>"danger",
                'message'=>"Error can't delete the record"
            ];
        }
        return response()->json($data);    }


    public function store(Request $request)
    {
        $res=Animal::create([
            'espece'=>$request->espece,
            'race'=>$request->race,
            'age'=>$request->age,
            'prix'=>$request->prix
        ]);
        if($res){
            $data=[
                'status'=>"success",
                'message'=>"animal item has been added in the card"
            ];
        }
        else{
            $data=[
                'status'=>"danger",
                'message'=>"Error can't add the record to the card"
            ];
        }
        return response()->json($data);
    }
}
