<?php

namespace App\DTO;

// DTO pour les avis
// Définit les données acceptées pour un avis
class AvisDTO
{
    public int $id_utilisateur_porteur; // ID du porteur évalué
    public int $id_evaluateur;          // ID de l'utilisateur qui note
    public int $id_colis;               // Colis associé
    public int $note;                   // Note de 1 à 5
    public string $commentaire;         // Commentaire écrit
    public string $date_avis;           // Date de l'avis

    public function __construct(array $data)
    {
        $this->id_utilisateur_porteur = $data['id_utilisateur_porteur'];
        $this->id_evaluateur = $data['id_evaluateur'];
        $this->id_colis = $data['id_colis'];
        $this->note = $data['note'];
        $this->commentaire = $data['commentaire'];
        $this->date_avis = $data['date_avis'];
    }
}
