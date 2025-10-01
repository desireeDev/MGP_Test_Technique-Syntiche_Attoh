<?php

namespace App\DTO;

/**
 * DTO pour un type de colis
 * Données acceptées par l"API et readonly pour say non modifiable
 */
class TypeColisDTO
{
    public function __construct(
        private readonly int $id,
        private readonly string $nom_type,
        private readonly string $restrictions,
        private readonly string $description,
        private readonly bool $fragile
    ) {}
//Transforme le DTO en tableau pour JSON
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'nom_type' => $this->nom_type,
            'restrictions' => $this->restrictions,
            'description' => $this->description,
            'fragile' => $this->fragile,
        ];
    }
}
