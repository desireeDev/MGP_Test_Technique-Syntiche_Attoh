<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Porteur extends Model
{
    // --- Configuration de la Table (Héritage) ---
    protected $table = 'porteurs';
    protected $primaryKey = 'id_utilisateur'; // Clé PK/FK partagée
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = false; 

    protected $fillable = [
        'id_utilisateur', // Doit être fourni lors de la création
        'note_moyenne',
        'nombre_avis',
        'certifie',
        'mois_certification',
        'statut_porteur',
        'ville_depart_habituelle',
        'pays_depart_habituel',
        'ville_destination_habituelle',
        'pays_destination_habituel',
    ];

    // --- Relations ---

    // [DEVIENT] Relation N:1 (Le Porteur est un Utilisateur)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_utilisateur', 'id_utilisateur');
    }

    // [EFFECTUE] Relation 1:N (Trajets créés par ce porteur)
    public function trajets(): HasMany
    {
        return $this->hasMany(TrajetPorteur::class, 'id_utilisateur', 'id_utilisateur');
    }

    // [CONCERNE] Relation 1:N (Avis reçus par ce porteur)
    public function avisRecus(): HasMany
    {
        return $this->hasMany(Avis::class, 'id_utilisateur_porteur', 'id_utilisateur');
    }
}
