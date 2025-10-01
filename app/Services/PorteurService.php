<?php

namespace App\Services;

use App\Models\Porteur;
use App\DTO\PorteurDTO;

/**
 * Service pour gérer les porteurs
 * Utilise le PorteurDTO pour normaliser les données
 */
class PorteurService
{
    /**
     * Récupère un porteur par son ID
     *
     * @param int $id
     * @return PorteurDTO|null
     */
    public function getById(int $id): ?PorteurDTO
    {
        $porteur = Porteur::find($id);
        if (!$porteur) return null;

        return new PorteurDTO(
            $porteur->id_utilisateur,
            $porteur->note_moyenne,
            $porteur->nombre_avis,
            $porteur->certifie,
            $porteur->statut_porteur
        );
    }

    /**
     * Récupère tous les porteurs
     *
     * @return PorteurDTO[]
     */
    public function getAll(): array
    {
        return Porteur::all()->map(function ($porteur) {
            return new PorteurDTO(
                $porteur->id_utilisateur,
                $porteur->note_moyenne,
                $porteur->nombre_avis,
                $porteur->certifie,
                $porteur->statut_porteur
            );
        })->toArray();
    }
}
