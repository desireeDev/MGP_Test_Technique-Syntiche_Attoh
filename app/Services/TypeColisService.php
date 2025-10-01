<?php

namespace App\Services;

use App\Models\TypeColis;
use App\DTO\TypeColisDTO;

/**
 * Service pour gérer les types de colis.
 */
class TypeColisService
{
    /**
     * Récupère un type de colis par son ID
     *
     * @param int $id
     * @return TypeColisDTO|null
     */
    public function getById(int $id): ?TypeColisDTO
    {
        $type = TypeColis::find($id);
        if (!$type) return null;

        return new TypeColisDTO(
            $type->id_type_colis,
            $type->nom_type,
            $type->restrictions,
            $type->description,
            $type->fragile
        );
    }

    /**
     * Récupère tous les types de colis
     *
     * @return TypeColisDTO[]
     */
    public function getAll(): array
    {
        return TypeColis::all()->map(function ($type) {
            return new TypeColisDTO(
                $type->id_type_colis,
                $type->nom_type,
                $type->restrictions,
                $type->description,
                $type->fragile
            );
        })->toArray();
    }
}
