<?php

namespace App\DTO;

/**
 * DTO (Data Transfer Object) pour représenter un porteur
 * Sert à transformer les données du modèle Porteur + utilisateur en un tableau
 * prêt à être renvoyé en JSON
 */
class PorteurDTO
{
    /**
     * Constructeur
     *
     * @param int $id ID du porteur
     * @param int $user_id ID de l'utilisateur associé
     * @param string|null $nom Nom de l'utilisateur
     * @param string|null $prenom Prénom de l'utilisateur
     * @param string|null $photo_profil URL de la photo de profil
     * @param float $note_moyenne Note moyenne du porteur
     * @param int $nombre_avis Nombre d'avis reçus
     * @param bool $certifie Indique si le porteur est certifié
     * @param string|null $statut_porteur Statut du porteur
     */
    public function __construct(
        private readonly int $id,
        private readonly int $user_id,
        private readonly ?string $nom,
        private readonly ?string $prenom,
        private readonly ?string $photo_profil,
        private readonly float $note_moyenne,
        private readonly int $nombre_avis,
        private readonly bool $certifie,
        private readonly ?string $statut_porteur
    ) {}

    /**
     * Transforme l'objet en tableau associatif
     * @return array<string, mixed> Tableau prêt pour JSON
     */
    public function toArray(): array
    {
        return [
            'id_utilisateur' => $this->id,
            'user_id'        => $this->user_id,
            'nom'            => $this->nom,
            'prenom'         => $this->prenom,
            'photo_profil'   => $this->photo_profil,
            'note_moyenne'   => $this->note_moyenne,
            'nombre_avis'    => $this->nombre_avis,
            'certifie'       => $this->certifie,
            'statut_porteur' => $this->statut_porteur,
        ];
    }
}
