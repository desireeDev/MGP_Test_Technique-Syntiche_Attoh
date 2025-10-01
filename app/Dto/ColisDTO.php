<?php

namespace App\DTO;

// DTO pour les colis
// Définit exactement quelles données sont acceptées pour un colis
class ColisDTO
{
    public int $id_expediteur;        // ID de l'expéditeur
    public int $id_trajet;            // Trajet lié
    public int $id_type_colis;        // Type de colis
    public string $ville_depart;      // Ville départ
    public string $pays_depart;       // Pays départ
    public string $ville_destination; // Ville destination
    public string $pays_destination;  // Pays destination
    public string $adresse_livraison; // Adresse complète
    public string $nom_destinataire;  // Nom du destinataire
    public string $telephone_destinataire; // Téléphone
    public float $poids;              // Poids du colis
    public string $description;       // Description du colis
    public float $montant_total;      // Montant payé
    public string $statut_colis;      // Livré / En attente
    public ?string $code_suivi;       // Code suivi, facultatif
// Le constructeur prend un tableau de données (souvent depuis la requête API)
    public function __construct(array $data)
    {
        $this->id_expediteur = $data['id_expediteur'];
        $this->id_trajet = $data['id_trajet'];
        $this->id_type_colis = $data['id_type_colis'];
        $this->ville_depart = $data['ville_depart'];
        $this->pays_depart = $data['pays_depart'];
        $this->ville_destination = $data['ville_destination'];
        $this->pays_destination = $data['pays_destination'];
        $this->adresse_livraison = $data['adresse_livraison'];
        $this->nom_destinataire = $data['nom_destinataire'];
        $this->telephone_destinataire = $data['telephone_destinataire'];
        $this->poids = $data['poids'];
        $this->description = $data['description'];
        $this->montant_total = $data['montant_total'];
        $this->statut_colis = $data['statut_colis'];
        $this->code_suivi = $data['code_suivi'] ?? null;
    }
}
