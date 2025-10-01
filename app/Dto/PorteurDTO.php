<?php

namespace App\DTO;

// DTO pour les porteurs
// Définit toutes les données qui seront validées par l'API
class PorteurDTO
{
    public int $id_utilisateur;   // L'utilisateur lié
    public float $note_moyenne;   // Note moyenne du porteur
    public int $nombre_avis;      // Nombre d'avis reçus
    public bool $certifie;        // Si le porteur est certifié
    public string $statut_porteur;// Actif / Inactif

    public function __construct(array $data)
    {
        $this->id_utilisateur = $data['id_utilisateur'];
        $this->note_moyenne = $data['note_moyenne'];
        $this->nombre_avis = $data['nombre_avis'];
        $this->certifie = $data['certifie'];
        $this->statut_porteur = $data['statut_porteur'];
    }
}
