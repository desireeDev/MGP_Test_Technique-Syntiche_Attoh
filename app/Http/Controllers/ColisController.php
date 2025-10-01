<?php

namespace App\Http\Controllers;

use App\Services\ColisService;
use Illuminate\Http\JsonResponse;

/**
 * Contrôleur pour gérer les colis
 */
class ColisController extends Controller
{
    private ColisService $colisService;

    public function __construct(ColisService $colisService)
    {
        $this->colisService = $colisService;
    }

    /**
     * Récupère tous les colis
     */
    public function index(): JsonResponse
    {
        return response()->json($this->colisService->getAll());
    }

    /**
     * Récupère un colis par son ID
     */
    public function show(int $id): JsonResponse
    {
        $colis = $this->colisService->getById($id);
        if (!$colis) {
            return response()->json(['message' => 'Colis non trouvé'], 404);
        }
        return response()->json($colis);
    }
}
