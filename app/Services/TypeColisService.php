<?php

namespace App\Services;

use App\Models\TypeColis;
use App\DTO\TypeColisDTO;

/**
 * Service pour gérer les types de colis.
 * Toutes les données sont normalisées via le TypeColisDTO.
 */
class TypeColisService
{
    /**
     * Récupère un type de colis par son ID
     *
     * @param int $id
     * @return array|null Tableau du type de colis ou null si non trouvé
     */
    public function getById(int $id): ?array
    {
        $type = TypeColis::find($id);
        if (!$type) return null;

        // Retourne le DTO transformé en tableau
        return (new TypeColisDTO(
            $type->id_type_colis,
            $type->nom_type,
            $type->restrictions,
            $type->description,
            $type->fragile
        ))->toArray();
    }

    /**
     * Récupère tous les types de colis
     *
     * @return array Tableau de tableaux représentant les types de colis
     */
    public function getAll(): array
    {
        $types = TypeColis::all();

        // Transforme chaque type en tableau via le DTO
        return $types->map(function ($type) {
            return (new TypeColisDTO(
                $type->id_type_colis,
                $type->nom_type,
                $type->restrictions,
                $type->description,
                $type->fragile
            ))->toArray();
        })->toArray();
    }
}
