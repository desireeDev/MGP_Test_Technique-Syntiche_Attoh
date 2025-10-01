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
     * @return UserDTO|null Retourne un UserDTO ou null si l'utilisateur n'existe pas
     */
    public function getUserById(int $id): ?UserDTO
    {
        // Cherche l'utilisateur dans la base
        $user = User::find($id);

        if (!$user) {
            // Si non trouvé, retourne null
            return null;
        }

        // Retourne un DTO pour normaliser la sortie
        return new UserDTO(
            $user->id_utilisateur,
            $user->nom,
            $user->prenom,
            $user->email,
            $user->photo_profil
        );
    }

    /**
     * Récupère tous les utilisateurs
     *
     * @return UserDTO[] Tableau de UserDTO
     */
    public function getAllUsers(): array
    {
        // On récupère tous les utilisateurs depuis la base
        $users = User::all();

        // On transforme chaque utilisateur en DTO pour normaliser la sortie
        return $users->map(function ($user) {
            return new UserDTO(
                $user->id_utilisateur,
                $user->nom,
                $user->prenom,
                $user->email,
                $user->photo_profil
            );
        })->toArray();
    }
}
