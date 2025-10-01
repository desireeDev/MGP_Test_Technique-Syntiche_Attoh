<?php

namespace App\DTO;

/**
 * DTO pour un trajet de porteur
 */
class TrajetPorteurDTO
{
    public function __construct(
        private readonly int $id,
        private readonly int $user_id,
        private readonly string $ville_depart,
        private readonly string $code_pays_depart,
        private readonly string $ville_destination,
        private readonly string $code_pays_destination,
        private readonly string $date_depart,
        private readonly string $date_arrivee,
        private readonly float $poids_disponible,
        private readonly float $poids_total_capacite,
        private readonly float $tarif_par_kg
    ) {}

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'ville_depart' => $this->ville_depart,
            'code_pays_depart' => $this->code_pays_depart,
            'ville_destination' => $this->ville_destination,
            'code_pays_destination' => $this->code_pays_destination,
            'date_depart' => $this->date_depart,
            'date_arrivee' => $this->date_arrivee,
            'poids_disponible' => $this->poids_disponible,
            'poids_total_capacite' => $this->poids_total_capacite,
            'tarif_par_kg' => $this->tarif_par_kg,
        ];
    }
}
