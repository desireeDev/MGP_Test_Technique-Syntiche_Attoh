<?php

namespace App\Http\Controllers;

use App\Services\TrajetPorteurService;
use Illuminate\Http\JsonResponse;

/**
 * Contrôleur pour gérer les trajets des porteurs
 */
class TrajetPorteurController extends Controller
{//Injection de dependance par constructeur
    private TrajetPorteurService $trajetService;

    public function __construct(TrajetPorteurService $trajetService)
    {
        $this->trajetService = $trajetService;
    }

    /**
     * Récupère tous les trajets de porteurs
     */
    public function index(): JsonResponse
    {
        $trajets = $this->trajetService->getAll();
        return response()->json($trajets);
    }

    /**
     * Récupère un trajet par son ID
     */
    public function show(int $id): JsonResponse
    {
        $trajet = $this->trajetService->getById($id);
        if (!$trajet) {
            return response()->json(['message' => 'Trajet non trouvé'], 404);
        }
        return response()->json($trajet);
    }
}
