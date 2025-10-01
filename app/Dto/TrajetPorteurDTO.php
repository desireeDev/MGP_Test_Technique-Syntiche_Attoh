<?php

namespace App\DTO;

// DTO pour les trajets des porteurs
// Définit les données transférées pour créer ou lire un trajet
class TrajetPorteurDTO
{
    public int $id_utilisateur;        // L'utilisateur porteur
    public string $ville_depart;       // Ville de départ
    public string $code_pays_depart;   // Code pays départ
    public string $ville_destination;  // Ville d'arrivée
    public string $code_pays_destination; // Code pays destination
    public string $date_depart;        // Date de départ
    public string $date_arrivee;       // Date d'arrivée
    public float $poids_disponible;    // Poids disponible pour transporter
    public float $poids_total_capacite;// Poids total max du trajet
    public float $tarif_par_kg;        // Tarif par kg
    public string $statut_trajet;      // Ouvert / Fermé

    public function __construct(array $data)
    {
        $this->id_utilisateur = $data['id_utilisateur'];
        $this->ville_depart = $data['ville_depart'];
        $this->code_pays_depart = $data['code_pays_depart'];
        $this->ville_destination = $data['ville_destination'];
        $this->code_pays_destination = $data['code_pays_destination'];
        $this->date_depart = $data['date_depart'];
        $this->date_arrivee = $data['date_arrivee'];
        $this->poids_disponible = $data['poids_disponible'];
        $this->poids_total_capacite = $data['poids_total_capacite'];
        $this->tarif_par_kg = $data['tarif_par_kg'];
        $this->statut_trajet = $data['statut_trajet'];
    }
}
