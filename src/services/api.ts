// src/services/api.ts
import axios from "axios";
import { User, Colis, TrajetPorteur, Porteur, Avis } from "./types";

// --- Base URL API ---
const API_BASE_URL = "http://localhost:8000/api";

// --- Instance axios ---
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour logger les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erreur API:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

// --- Utilisateurs ---
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/users");
    console.log("Users reçus:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
    throw error;
  }
};

// --- Colis ---
export const getColis = async (): Promise<Colis[]> => {
  try {
    const response = await api.get<Colis[]>("/colis");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des colis:", error);
    throw error;
  }
};

export const getColisById = async (id: number): Promise<Colis> => {
  try {
    const response = await api.get<Colis>(`/colis/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du colis ${id}:`, error);
    throw error;
  }
};

// --- Trajets des porteurs ---
export const getTrajets = async (): Promise<TrajetPorteur[]> => {
  try {
    const response = await api.get<TrajetPorteur[]>("/trajets");
    console.log("Trajets reçus:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des trajets:", error);
    throw error;
  }
};

// --- Porteurs ---
export const getPorteurs = async (): Promise<Porteur[]> => {
  try {
    const response = await api.get<Porteur[]>("/porteurs");
    console.log("Porteurs reçus:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des porteurs:", error);
    throw error;
  }
};

// --- Avis ---
export const getAvis = async (): Promise<Avis[]> => {
  try {
    const response = await api.get<Avis[]>("/avis");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des avis:", error);
    throw error;
  }
};

// --- Types de colis (tous) ---
export const getTypesColis = async () => {
  try {
    const response = await api.get("/types-colis");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des types de colis:", error);
    throw error;
  }
};

// --- Types de colis pour un trajet spécifique ---
export const getTypeColisByTrajet = async (id_trajet: number): Promise<string[]> => {
  try {
    const response = await api.get(`/trajets/${id_trajet}/types-colis`);
    console.log(`Types de colis pour trajet ${id_trajet}:`, response.data);
    
    // On suppose que l'API renvoie un tableau de { nom_type: string }
    if (Array.isArray(response.data)) {
      return response.data.map((t: any) => t.nom_type || t.name || String(t));
    }
    return [];
  } catch (error) {
    console.error(`Erreur lors de la récupération des types de colis pour trajet ${id_trajet}:`, error);
    // Retourner un tableau vide au lieu de throw pour éviter de bloquer l'affichage
    return [];
  }
};

export default api;