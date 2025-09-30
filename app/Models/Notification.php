<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    protected $table = 'notifications';
    protected $primaryKey = 'id_notification';

    protected $fillable = [
        'id_utilisateur', // Clé étrangère
        'type_notification',
        'message',
        'lue',
        'date_notification',
    ];

    // --- Relations ---

    // [REÇOIT] Relation N:1 (Utilisateur destinataire)
    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_utilisateur', 'id_utilisateur');
    }
}
