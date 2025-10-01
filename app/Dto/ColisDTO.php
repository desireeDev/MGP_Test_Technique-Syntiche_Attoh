<?php

namespace App\DTO;

/**
 * DTO pour un colis
 */
class ColisDTO
{
    public function __construct(
        private readonly int $id,
        private readonly int $id_expediteur,
        private readonly int $id_trajet,
        private readonly int $id_type_colis,
        private readonly string $ville_depart,
        private readonly string $pays_depart,
        private readonly string $ville_destination,
        private readonly string $pays_destination,
        private readonly string $adresse_livraison,
        private readonly string $nom_destinataire,
        private readonly string $telephone_destinataire,
        private readonly float $poids,
        private readonly string $description,
        private readonly float $montant_total,
        private readonly string $statut_colis,
        private readonly string $date_creation,
        private readonly ?string $date_livraison_reelle,
        private readonly string $code_suivi
    ) {}

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'id_expediteur' => $this->id_expediteur,
            'id_trajet' => $this->id_trajet,
            'id_type_colis' => $this->id_type_colis,
            'ville_depart' => $this->ville_depart,
            'pays_depart' => $this->pays_depart,
            'ville_destination' => $this->ville_destination,
            'pays_destination' => $this->pays_destination,
            'adresse_livraison' => $this->adresse_livraison,
            'nom_destinataire' => $this->nom_destinataire,
            'telephone_destinataire' => $this->telephone_destinataire,
            'poids' => $this->poids,
            'description' => $this->description,
            'montant_total' => $this->montant_total,
            'statut_colis' => $this->statut_colis,
            'date_creation' => $this->date_creation,
            'date_livraison_reelle' => $this->date_livraison_reelle,
            'code_suivi' => $this->code_suivi,
        ];
    }
}
