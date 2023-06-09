<?php

namespace App\Models;
use App\Models\Animal;
use App\Models\User;
use App\Models\Produit;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vente extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'animal_id',
        'product_id',
        'user_id',
        'montant'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function animal(){
        return $this->belongsTo(Animal::class);
    }
    public function produit(){
        return $this->belongsTo(Produit::class);
    }


}
