<?php

namespace App\Models;
use App\Models\Vente;
use App\Models\Reservation;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prix'
    ];

    public function vente(){
        return $this->hasMany(Vente::class);
    }
    public function reservation(){
        return $this->hasMany(Reservation::class);
    }

}
