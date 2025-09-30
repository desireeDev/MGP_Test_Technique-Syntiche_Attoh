<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Colis extends Model
{
    protected $table = 'colis';
    protected $primaryKey = 'id_colis';

    protected $fillable = [
        'id_expediteur',    // Clé étrangère
        'id_trajet',        // Clé étrangère (peut être NULL initialement)
        'id_type_colis',    // Clé étrangère
        'ville_depart',
        'pays_depart',
        'ville_destination',
        'pays_destination',
        'adresse_livraison',
        'nom_destinataire',
        'telephone_destinataire',
        'poids',
        'description',
        'montant_total',
        'statut_colis',
        'date_creation',
        'date_reservation',
        'date_livraison_prevue',
        'date_livraison_reelle',
        'code_suivi',
        'instructions_livraison',
    ];

    // --- Relations ---

    // [ENVOIE] Relation N:1 (L'expéditeur)
    public function expediteur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_expediteur', 'id_utilisateur');
    }

    // [TRANSPORTE] Relation N:1 (Le trajet assigné)
    public function trajet(): BelongsTo
    {
        return $this->belongsTo(TrajetPorteur::class, 'id_trajet', 'id_trajet');
    }

    // [EST_DE_TYPE] Relation N:1 (Le type du colis)
    public function type(): BelongsTo
    {
        return $this->belongsTo(TypeColis::class, 'id_type_colis', 'id_type_colis');
    }

    // [GÉNÈRE] Relation 1:1 (L'avis éventuel)
    public function avis(): HasOne
    {
        return $this->hasOne(Avis::class, 'id_colis', 'id_colis');
    }
}
