<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable
{

    // --- Configuration de la Table ---
    protected $table = 'utilisateurs';
    protected $primaryKey = 'id_utilisateur';
    public $incrementing = true; // Si l'ID est auto-incrémenté

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mot_de_passe', // Doit être hashé avant l'insertion
        'telephone',
        'photo_profil',
        'date_inscription',
        'statut_compte',
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    // --- Relations ---

    // [DEVIENT] Relation 1:1 optionnelle vers Porteur
    public function porteur(): HasOne
    {
        return $this->hasOne(Porteur::class, 'id_utilisateur', 'id_utilisateur');
    }

    // [ENVOIE] Relation 1:N (Colis envoyés par cet utilisateur)
    public function colisEnvoyes(): HasMany
    {
        return $this->hasMany(Colis::class, 'id_expediteur', 'id_utilisateur');
    }

    // [DONNE] Relation 1:N (Avis donnés par cet utilisateur/évaluateur)
    public function avisDonnes(): HasMany
    {
        return $this->hasMany(Avis::class, 'id_evaluateur', 'id_utilisateur');
    }

    // [REÇOIT] Relation 1:N (Notifications reçues)
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class, 'id_utilisateur', 'id_utilisateur');
    }
}
