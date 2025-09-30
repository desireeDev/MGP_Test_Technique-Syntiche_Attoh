<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Avis extends Model
{
    protected $table = 'avis';
    protected $primaryKey = 'id_avis';
    public $timestamps = false;

    protected $fillable = [
        'id_utilisateur_porteur',  // Clé étrangère (Porteur concerné)
        'id_evaluateur',           // Clé étrangère (Utilisateur qui évalue)
        'id_colis',                // Clé étrangère
        'note',
        'commentaire',
        'date_avis',
    ];

    // --- Relations ---

    // [CONCERNE] Relation N:1 (Porteur qui reçoit la note)
    public function porteurConcerne(): BelongsTo
    {
        return $this->belongsTo(Porteur::class, 'id_utilisateur_porteur', 'id_utilisateur');
    }

    // [DONNE] Relation N:1 (Utilisateur qui donne la note)
    public function evaluateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_evaluateur', 'id_utilisateur');
    }

    // [GÉNÈRE] Relation N:1 (Colis lié à cet avis)
    public function colis(): BelongsTo
    {
        return $this->belongsTo(Colis::class, 'id_colis', 'id_colis');
    }
}
