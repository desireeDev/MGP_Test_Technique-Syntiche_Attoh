<?php

namespace App\Services;

use App\Models\Porteur;
use App\DTO\PorteurDTO;

/**
 * Service pour gérer la logique métier des porteurs
 * Sert à récupérer les porteurs avec leurs informations utilisateur
 */
class PorteurService
{
    /**
     * Récupère tous les porteurs avec leurs infos utilisateurs
     *
     * @return array<int, array<string, mixed>> Tableau de porteurs prêts pour JSON
     */
    public function getAll(): array
    {
        // Avec "with('user')", on fait un eager loading pour récupérer les infos utilisateur en même temps
        $porteurs = Porteur::with('user')->get();

        // Transforme chaque porteur en DTO, puis en tableau
        return $porteurs->map(function ($porteur) {
            $user = $porteur->user; // Relation "user" depuis le modèle Porteur

            return (new PorteurDTO(
                $porteur->id_utilisateur,
                $user?->id_utilisateur ?? 0,       // null-safe si utilisateur manquant
                $user?->nom ?? null,
                $user?->prenom ?? null,
                $user?->photo_profil ?? null,
                $porteur->note_moyenne ?? 0,
                $porteur->nombre_avis ?? 0,
                $porteur->certifie ?? false,
                $porteur->statut_porteur ?? null
            ))->toArray();
        })->toArray();
    }

    /**
     * Récupère un porteur spécifique par ID avec les infos utilisateur
     *
     * @param int $id ID du porteur
     * @return array<string, mixed>|null Portreur sous forme de tableau ou null si non trouvé
     */
    public function getById(int $id): ?array
    {
        // Récupération du porteur avec son utilisateur
        $porteur = Porteur::with('user')->find($id);
        if (!$porteur) return null;

        $user = $porteur->user;

        // Transforme en DTO puis en tableau
        return (new PorteurDTO(
            $porteur->id_utilisateur,
            $user?->id_utilisateur ?? 0,
            $user?->nom ?? null,
            $user?->prenom ?? null,
            $user?->photo_profil ?? null,
            $porteur->note_moyenne ?? 0,
            $porteur->nombre_avis ?? 0,
            $porteur->certifie ?? false,
            $porteur->statut_porteur ?? null
        ))->toArray();
    }
}
