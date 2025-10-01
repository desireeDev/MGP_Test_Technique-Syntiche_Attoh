<?php

namespace App\Services;

use App\Models\Colis;
use App\DTO\ColisDTO;

/**
 * Service pour gérer les colis.
 * Centralise toutes les opérations sur les colis.
 */
class ColisService
{
    /**
     * Récupère un colis par son ID
     *
     * @param int $id
     * @return ColisDTO|null
     */
   public function getById(int $id): ?array
{
    $colis = Colis::find($id);
    if (!$colis) return null;

    return (new ColisDTO(
        $colis->id_colis,
        $colis->id_expediteur,
        $colis->id_trajet,
        $colis->id_type_colis,
        $colis->ville_depart,
        $colis->pays_depart,
        $colis->ville_destination,
        $colis->pays_destination,
        $colis->adresse_livraison,
        $colis->nom_destinataire,
        $colis->telephone_destinataire,
        $colis->poids,
        $colis->description,
        $colis->montant_total,
        $colis->statut_colis,
        $colis->date_creation,
        $colis->date_livraison_reelle,
        $colis->code_suivi
    ))->toArray();
}


    /**
     * Récupère tous les colis
     *
     * @return ColisDTO[]
     */
    public function getAll(): array
    {
        return Colis::all()->map(function ($colis) {
            return new ColisDTO(
                $colis->id_colis,
                $colis->id_expediteur,
                $colis->id_trajet,
                $colis->id_type_colis,
                $colis->ville_depart,
                $colis->pays_depart,
                $colis->ville_destination,
                $colis->pays_destination,
                $colis->adresse_livraison,
                $colis->nom_destinataire,
                $colis->telephone_destinataire,
                $colis->poids,
                $colis->description,
                $colis->montant_total,
                $colis->statut_colis,
                $colis->date_creation,
                $colis->date_livraison_reelle,
                $colis->code_suivi
            );
        })->toArray();
    }
}
