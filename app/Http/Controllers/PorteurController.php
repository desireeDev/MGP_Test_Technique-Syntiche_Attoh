<?php

namespace App\Http\Controllers;

use App\Services\PorteurService;
use Illuminate\Http\JsonResponse;

/**
 * Contrôleur pour exposer les routes API pour les porteurs
 * GET /porteurs -> liste tous les porteurs
 * GET /porteurs/{id} -> détail d’un porteur
 */
class PorteurController extends Controller
{
    private PorteurService $porteurService;

    public function __construct(PorteurService $porteurService)
    {
        $this->porteurService = $porteurService;
    }

    /**
     * Retourne la liste de tous les porteurs
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $porteurs = $this->porteurService->getAll();
        return response()->json($porteurs);
    }

    /**
     * Retourne un porteur spécifique par ID
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
