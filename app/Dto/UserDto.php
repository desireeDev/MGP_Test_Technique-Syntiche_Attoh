<?php

namespace App\DTO;

// DTO pour les utilisateurs
// Ce DTO définit toutes les données  qui seront validées par l'API
class UserDTO
{
    public string $nom;          // Nom de l'utilisateur
    public string $prenom;       // Prénom
    public string $email;        // Email unique
    public string $mot_de_passe; // Mot de passe 
    public ?string $photo_profil; // Chemin relatif vers la photo, facultatif
    public string $statut_compte; // Actif / Inactif

    // Le constructeur prend un tableau de données (souvent depuis la requête API)
    public function __construct(array $data)
    {
        $this->nom = $data['nom'];
        $this->prenom = $data['prenom'];
        $this->email = $data['email'];
        $this->mot_de_passe = $data['mot_de_passe'];
        $this->photo_profil = $data['photo_profil'] ?? null; // facultatif
        $this->statut_compte = $data['statut_compte'];
    }
}
