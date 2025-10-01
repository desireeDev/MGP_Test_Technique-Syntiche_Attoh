<?php

namespace App\Http\Controllers;

use App\Services\TypeColisService;
use Illuminate\Http\JsonResponse;

/**
 * Contrôleur pour gérer les types de colis
 */
class TypeColisController extends Controller
{
    private TypeColisService $typeColisService;

    public function __construct(TypeColisService $typeColisService)
    {
        $this->typeColisService = $typeColisService;
    }

    /**
     * Récupère tous les types de colis
     */
    public function index(): JsonResponse
    {
        return response()->json($this->typeColisService->getAll());
    }

    /**
     * Récupère un type de colis par son ID
     */
    public function show(int $id): JsonResponse
    {
        $type = $this->typeColisService->getById($id);
        if (!$type) {
            return response()->json(['message' => 'Type de colis non trouvé'], 404);
        }
        return response()->json($type);
    }
}
