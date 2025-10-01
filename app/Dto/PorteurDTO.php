<?php

namespace App\DTO;

/**
 * DTO pour un porteur
 */
class PorteurDTO
{
    public function __construct(
        private readonly int $id,
        private readonly int $user_id,
        private readonly float $note_moyenne,
        private readonly int $nombre_avis,
        private readonly bool $certifie
    ) {}

    /**
     * Retourne les infos du porteur sous forme de tableau
     *
     * @return array<string, int|float|bool>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'note_moyenne' => $this->note_moyenne,
            'nombre_avis' => $this->nombre_avis,
            'certifie' => $this->certifie,
        ];
    }
}
