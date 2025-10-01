<?php

namespace App\Services;

use App\Models\User;
use App\DTO\UserDTO;

/**
 * Service pour gérer les utilisateurs
 * Fournit uniquement les méthodes pour récupérer les utilisateurs
 * Toutes les données sont renvoyées via le UserDTO pour normaliser l'API
 */
class UserService
{
    /**
     * Récupère un utilisateur par son ID
     *
     * @param int $id
     * @return array|null Retourne un tableau ou null si l'utilisateur n'existe pas
     */
    public function getUserById(int $id): ?array
    {
        // Cherche l'utilisateur dans la base
        $user = User::find($id);

        if (!$user) {
            return null;
        }

        // Retourne les données du DTO transformées en tableau
        return (new UserDTO(
            $user->id_utilisateur,
            $user->nom,
            $user->prenom,
            $user->email,
            $user->photo_profil
        ))->toArray();
    }

    /**
     * Récupère tous les utilisateurs
     *
     * @return array Tableau de tableaux représentant les utilisateurs
     */
    public function getAllUsers(): array
    {
        // Récupère tous les utilisateurs
        $users = User::all();

        // Transforme chaque utilisateur en tableau via le DTO
        return $users->map(function ($user) {
            return (new UserDTO(
                $user->id_utilisateur,
                $user->nom,
                $user->prenom,
                $user->email,
                $user->photo_profil
            ))->toArray();
        })->toArray();
    }
}
