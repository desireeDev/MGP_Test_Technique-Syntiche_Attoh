<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TrajetPorteur extends Model
{
    protected $table = 'trajet_porteurs';
    protected $primaryKey = 'id_trajet';

    protected $fillable = [
        'id_utilisateur', // Clé étrangère
        'ville_depart',
        'code_pays_depart',
        'ville_destination',
        'code_pays_destination',
        'date_depart',
        'date_arrivee',
        'poids_disponible',
        'poids_total_capacite',
        'tarif_par_kg',
        'statut_trajet',
        'date_expiration_offre',
        'date_creation',
    ];

    // --- Relations ---

    // [EFFECTUE] Relation N:1 (Appartient à un Porteur)
    public function porteur(): BelongsTo
    {
        return $this->belongsTo(Porteur::class, 'id_utilisateur', 'id_utilisateur');
    }

    // [TRANSPORTE] Relation 1:N (Colis transportés par ce trajet)
    public function colisTransports(): HasMany
    {
        return $this->hasMany(Colis::class, 'id_trajet', 'id_trajet');
    }
}
