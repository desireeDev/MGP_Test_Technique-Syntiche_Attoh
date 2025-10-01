<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

return new class extends Migration
{
    /**
     * Correction des dates d'expiration existantes
     * Convertit les valeurs "Ouvert" en vraies dates
     */
    public function up(): void
    {
        // 1. Corriger les enregistrements où date_expiration_offre = "Ouvert"
        DB::table('trajet_porteurs')
            ->where('date_expiration_offre', 'Ouvert')
            ->update([
                'date_expiration_offre' => DB::raw('DATE_ADD(date_arrivee, INTERVAL 15 DAY)')
            ]);

        // 2. Corriger les enregistrements où date_expiration_offre est NULL
        DB::table('trajet_porteurs')
            ->whereNull('date_expiration_offre')
            ->update([
                'date_expiration_offre' => DB::raw('DATE_ADD(date_arrivee, INTERVAL 15 DAY)')
            ]);

        // 3. Pour les cas où date_arrivee est NULL, utiliser date_creation + 30 jours
        DB::table('trajet_porteurs')
            ->whereNull('date_expiration_offre')
            ->update([
                'date_expiration_offre' => DB::raw('DATE_ADD(date_creation, INTERVAL 30 DAY)')
            ]);
    }

    /**
     * Revertir les changements (optionnel)
     */
    public function down(): void
    {
        // Remettre "Ouvert" pour les dates qui viennent d'être calculées
   
    }
};
