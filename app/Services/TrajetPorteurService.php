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
     *
     * @param int $id
     * @return TrajetPorteurDTO|null
     */
    public function getById(int $id): ?TrajetPorteurDTO
    {
        $trajet = TrajetPorteur::find($id);
        if (!$trajet) return null;

        return new TrajetPorteurDTO(
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
        );
    }

    /**
     * Récupère tous les trajets
     *
     * @return TrajetPorteurDTO[]
     */
    public function getAll(): array
    {
        return TrajetPorteur::all()->map(function ($trajet) {
            return new TrajetPorteurDTO(
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
            );
        })->toArray();
    }
}
