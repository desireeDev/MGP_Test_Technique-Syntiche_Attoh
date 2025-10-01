<?php

namespace App\Services;

use App\Models\Avis;
use App\DTO\AvisDTO;

/**
 * Service pour gérer les avis laissés sur les porteurs.
 * Permet de récupérer les avis de façon structurée.
 */
class AvisService
{
    /**
     * Récupère un avis par son ID
     *
     * @param int $id
     * @return AvisDTO|null
     */
    public function getById(int $id): ?AvisDTO
    {
        $avis = Avis::find($id);
        if (!$avis) return null;

        return new AvisDTO(
            $avis->id_avis,
            $avis->id_utilisateur_porteur,
            $avis->id_evaluateur,
            $avis->id_colis,
            $avis->note,
            $avis->commentaire,
            $avis->date_avis
        );
    }

    /**
     * Récupère tous les avis
     *
     * @return AvisDTO[]
     */
    public function getAll(): array
    {
        return Avis::all()->map(function ($avis) {
            return new AvisDTO(
                $avis->id_avis,
                $avis->id_utilisateur_porteur,
                $avis->id_evaluateur,
                $avis->id_colis,
                $avis->note,
                $avis->commentaire,
                $avis->date_avis
            );
        })->toArray();
    }
}
