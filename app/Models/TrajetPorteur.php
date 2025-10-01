<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;

class TrajetPorteur extends Model
{
    protected $table = 'trajet_porteurs';
    protected $primaryKey = 'id_trajet';

    protected $fillable = [
        'id_utilisateur',
        'ville_depart',
        'code_pays_depart',
        'ville_destination',
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

    /**
     * Boot method for model events
     * Gère les calculs automatiques lors de la création et mise à jour
     */
    protected static function boot()
    {
        parent::boot();

        // Définit automatiquement la date d'expiration si vide
        static::saving(function ($model) {
            $model->setExpirationDateIfEmpty();
        });
    }

    /**
     * Définit la date d'expiration si elle est vide
     * Calcule 15 jours après la date d'arrivée
     */
    protected function setExpirationDateIfEmpty(): void
    {
        // Si pas de date d'expiration mais on a une date d'arrivée
        if (empty($this->date_expiration_offre) && !empty($this->date_arrivee)) {
            $dateArrivee = Carbon::parse($this->date_arrivee);
            $this->date_expiration_offre = $dateArrivee->addDays(15);
        }
    }

    // --- Relations ---

    /**
     * Relation avec le modèle Porteur
     * Un trajet appartient à un porteur
     */
    public function porteur(): BelongsTo
    {
        return $this->belongsTo(Porteur::class, 'id_utilisateur', 'id_utilisateur');
    }

    /**
     * Relation avec les colis transportés
     * Un trajet peut avoir plusieurs colis
     */
    public function colisTransports(): HasMany
    {
        return $this->hasMany(Colis::class, 'id_trajet', 'id_trajet');
    }
}
