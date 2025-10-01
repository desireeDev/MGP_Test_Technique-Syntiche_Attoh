<?php

namespace App\DTO;

/**
 * DTO pour un avis sur un porteur
 */
class AvisDTO
{
    public function __construct(
        private readonly int $id,
        private readonly int $id_utilisateur_porteur,
        private readonly int $id_evaluateur,
        private readonly int $id_colis,
        private readonly int $note,
        private readonly string $commentaire,
        private readonly string $date_avis
    ) {}

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'id_utilisateur_porteur' => $this->id_utilisateur_porteur,
            'id_evaluateur' => $this->id_evaluateur,
            'id_colis' => $this->id_colis,
            'note' => $this->note,
            'commentaire' => $this->commentaire,
            'date_avis' => $this->date_avis,
        ];
    }
}
