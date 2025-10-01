<?php

namespace App\Services;

use App\Models\Porteur;
use App\DTO\PorteurDTO;

/**
 * Service pour gérer les porteurs
 * Fournit uniquement des méthodes de lecture pour les porteurs
 * Toutes les données sont renvoyées via le PorteurDTO transformé en tableau
 */
class PorteurService
{
    /**
     * Récupère un porteur par son ID
     *
     * @param int $id
     * @return array|null Retourne les données du porteur sous forme de tableau ou null si non trouvé
     */
    public function getById(int $id): ?array
    {
        $porteur = Porteur::find($id); // Cherche le porteur dans la base
        if (!$porteur) return null;    // Retourne null si non trouvé

        // Transforme le DTO en tableau pour JSON
        return (new PorteurDTO(
            $porteur->id_utilisateur,
            $porteur->note_moyenne,
            $porteur->nombre_avis,
            $porteur->certifie,
            $porteur->statut_porteur
        ))->toArray();
    }

    /**
     * Récupère tous les porteurs
     *
     * @return array Tableau de tableaux représentant chaque porteur
     */
    public function getAll(): array
    {
        // Récupère tous les porteurs
        $porteurs = Porteur::all();

        // Transforme chaque porteur en DTO puis en tableau pour JSON
        return $porteurs->map(function ($porteur) {
            return (new PorteurDTO(
                $porteur->id_utilisateur,
                $porteur->note_moyenne,
                $porteur->nombre_avis,
                $porteur->certifie,
                $porteur->statut_porteur
            ))->toArray();
        })->toArray();
    }
}
