<?php

namespace App\Services;

use App\Models\TrajetPorteur;
use App\DTO\TrajetPorteurDTO;

/**
 * Service pour gérer les trajets proposés par les porteurs.
 */
class TrajetPorteurService
{
    /**
     * Récupère un trajet par son ID
     */
    public function getById(int $id): ?array
    {
        $trajet = TrajetPorteur::find($id);
        if (!$trajet) return null;

        return $this->createDTOFromModel($trajet)->toArray();
    }

    /**
     * Récupère tous les trajets
     */
    public function getAll(): array
    {
        $trajets = TrajetPorteur::all();

        return $trajets->map(function ($trajet) {
            return $this->createDTOFromModel($trajet)->toArray();
        })->toArray();
    }

    /**
     * Crée un DTO à partir du modèle TrajetPorteur
     * Centralise la transformation pour éviter les incohérences
     */
    private function createDTOFromModel(TrajetPorteur $trajet): TrajetPorteurDTO
    {
        return new TrajetPorteurDTO(
            $trajet->id_trajet,               // 1. id
            $trajet->id_utilisateur,          // 2. user_id
            $trajet->ville_depart,            // 3. ville_depart
            $trajet->code_pays_depart,        // 4. code_pays_depart
            $trajet->ville_destination,       // 5. ville_destination
            $trajet->code_pays_destination,   // 6. code_pays_destination
            $trajet->date_depart,             // 7. date_depart
            $trajet->date_arrivee,            // 8. date_arrivee
            $trajet->poids_disponible,        // 9. poids_disponible
            $trajet->poids_total_capacite,    // 10. poids_total_capacite
            $trajet->tarif_par_kg,            // 11. tarif_par_kg
            $trajet->statut_trajet,           // 12. statut_trajet
            $trajet->date_expiration_offre,   // 13. date_expiration_offre
            $trajet->date_creation            // 14. date_creation
        );
    }
}
