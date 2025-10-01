<?php

namespace App\Services;

use App\Models\Avis;
use App\DTO\AvisDTO;

/**
 * Service pour gérer les avis laissés sur les porteurs.
 * Toutes les données sont normalisées via le DTO AvisDTO.
 */
class AvisService
{
    /**
     * Récupère un avis par son ID
     *
     * @param int $id
     * @return array|null Tableau représentant l'avis ou null si non trouvé
     */
    public function getById(int $id): ?array
    {
        $avis = Avis::find($id);
        if (!$avis) return null;

        return (new AvisDTO(
            $avis->id_avis,
            $avis->id_utilisateur_porteur,
            $avis->id_evaluateur,
            $avis->id_colis,
            $avis->note,
            $avis->commentaire,
            $avis->date_avis
        ))->toArray();
    }

    /**
     * Récupère tous les avis
     *
     * @return array Tableau de tableaux représentant tous les avis
     */
    public function getAll(): array
    {
        return Avis::all()->map(function ($avis) {
            return (new AvisDTO(
                $avis->id_avis,
                $avis->id_utilisateur_porteur,
                $avis->id_evaluateur,
                $avis->id_colis,
                $avis->note,
                $avis->commentaire,
                $avis->date_avis
            ))->toArray();
        })->toArray();
    }
}
