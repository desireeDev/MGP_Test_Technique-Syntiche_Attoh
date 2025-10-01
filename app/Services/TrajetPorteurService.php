<?php

namespace App\Services;

use App\Models\TrajetPorteur;
use App\DTO\TrajetPorteurDTO;

/**
 * Service pour gérer les trajets proposés par les porteurs.
 * Toutes les données sont normalisées via le TrajetPorteurDTO.
 */
class TrajetPorteurService
{
    /**
     * Récupère un trajet par son ID
     *
     * @param int $id
     * @return array|null Tableau du trajet ou null si non trouvé
     */
    public function getById(int $id): ?array
    {
        $trajet = TrajetPorteur::find($id);
        if (!$trajet) return null;

        // Retourne le DTO transformé en tableau
        return (new TrajetPorteurDTO(
            $trajet->id_trajet,
            $trajet->id_utilisateur,
            $trajet->ville_depart,
            $trajet->code_pays_depart,
            $trajet->ville_destination,
            $trajet->code_pays_destination,
            $trajet->date_depart,
            $trajet->date_arrivee,
            $trajet->poids_disponible,
            $trajet->poids_total_capacite,
            $trajet->tarif_par_kg,
            $trajet->statut_trajet
        ))->toArray();
    }

    /**
     * Récupère tous les trajets
     *
     * @return array Tableau de tableaux représentant les trajets
     */
    public function getAll(): array
    {
        $trajets = TrajetPorteur::all();

        // Transforme chaque trajet en tableau via le DTO
        return $trajets->map(function ($trajet) {
            return (new TrajetPorteurDTO(
                $trajet->id_trajet,
                $trajet->id_utilisateur,
                $trajet->ville_depart,
                $trajet->code_pays_depart,
                $trajet->ville_destination,
                $trajet->code_pays_destination,
                $trajet->date_depart,
                $trajet->date_arrivee,
                $trajet->poids_disponible,
                $trajet->poids_total_capacite,
                $trajet->tarif_par_kg,
                $trajet->statut_trajet
            ))->toArray();
        })->toArray();
    }
}
