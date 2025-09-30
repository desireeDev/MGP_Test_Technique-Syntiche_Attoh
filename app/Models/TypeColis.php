<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TypeColis extends Model
{
    protected $table = 'type_colis';
    protected $primaryKey = 'id_type_colis';
    public $timestamps = false;

    protected $fillable = [
        'nom_type',
        'description',
        'restrictions',
        'fragile',
    ];

    // --- Relations ---

    // [EST_DE_TYPE] Relation 1:N (Colis associés à ce type)
    public function colis(): HasMany
    {
        return $this->hasMany(Colis::class, 'id_type_colis', 'id_type_colis');
    }
}
