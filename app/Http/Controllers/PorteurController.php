<?php

namespace App\Http\Controllers;

use App\Services\PorteurService;
use Illuminate\Http\JsonResponse;

/**
 * Contrôleur pour gérer les porteurs
 * Utilise le PorteurService pour la logique métier
 */
class PorteurController extends Controller
{
    private PorteurService $porteurService;

    public function __construct(PorteurService $porteurService)
    {
        // Injection de dépendance du service
        $this->porteurService = $porteurService;
    }

    /**
     * Récupère tous les porteurs
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $porteurs = $this->porteurService->getAll();
        return response()->json($porteurs);
    }

    /**
     * Récupère un porteur par son ID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $porteur = $this->porteurService->getById($id);
        if (!$porteur) {
            return response()->json(['message' => 'Porteur non trouvé'], 404);
        }
        return response()->json($porteur);
    }
}
