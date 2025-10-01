<?php

namespace App\DTO;

/**
 * DTO pour l'utilisateur
 * Contient uniquement les données nécessaires à l'API
 */
class UserDTO
{
    public function __construct(
        private readonly int $id,
        private readonly string $nom,
        private readonly string $prenom,
        private readonly string $email,
        private readonly ?string $photo_profil = null
    ) {}

    /**
     * Convertit le DTO en tableau pour JSON
     *  
     * @return array<string, int|string|null>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'email' => $this->email,
            'photo_profil' => $this->photo_profil,
        ];
    }
}
