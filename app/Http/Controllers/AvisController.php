<?php

namespace App\Http\Controllers;

use App\Services\AvisService;
use Illuminate\Http\JsonResponse;

/**
 * Contrôleur pour gérer les avis
 */
class AvisController extends Controller
{
    private AvisService $avisService;
//Injection de dépendance du service AvisService par constructeur
    public function __construct(AvisService $avisService)
    {
        $this->avisService = $avisService;
    }

    /**
     * Récupère tous les avis
     */
    public function index(): JsonResponse
    {
        return response()->json($this->avisService->getAll());
    }

    /**
     * Récupère un avis par son ID
     */
    public function show(int $id): JsonResponse
    {
        $avis = $this->avisService->getById($id);
        if (!$avis) {
            return response()->json(['message' => 'Avis non trouvé'], 404);
        }
        return response()->json($avis);
    }
}
