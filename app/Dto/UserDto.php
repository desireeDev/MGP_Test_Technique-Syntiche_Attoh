<?php
namespace App\DTO;

use Illuminate\Support\Facades\Storage;

class UserDTO
{
    public function __construct(
        private readonly int $id,
        private readonly string $nom,
        private readonly string $prenom,
        private readonly string $email,
        private readonly ?string $photo_profil = null
    ) {}

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'email' => $this->email,
            'photo_profil' => $this->photo_profil
                ? Storage::url($this->photo_profil) // <- URL publique
                : null,
        ];
    }
}
