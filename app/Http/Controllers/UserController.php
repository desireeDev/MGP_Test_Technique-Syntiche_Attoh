<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\JsonResponse;

/**
 * Contrôleur pour gérer les utilisateurs
 * Utilise UserService pour la logique métier
 */
class UserController extends Controller
{
    private UserService $userService;
//Injection de dependance par constructeur
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Récupère tous les utilisateurs
     */
    public function index(): JsonResponse
    {
        $users = $this->userService->getAllUsers();
        return response()->json($users);
    }

    /**
     * Récupère un utilisateur par son ID
     */
    public function show(int $id): JsonResponse
    {
        $user = $this->userService->getUserById($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
        return response()->json($user);
    }
}
