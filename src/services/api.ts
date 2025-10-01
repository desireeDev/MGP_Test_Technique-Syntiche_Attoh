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

// --- Utilisateurs ---
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

// --- Colis ---
export const getColis = async (): Promise<Colis[]> => {
  const response = await api.get<Colis[]>("/colis");
  return response.data;
};

export const getColisById = async (id: number): Promise<Colis> => {
  const response = await api.get<Colis>(`/colis/${id}`);
  return response.data;
};

// --- Trajets des porteurs ---
export const getTrajets = async (): Promise<TrajetPorteur[]> => {
  const response = await api.get<TrajetPorteur[]>("/trajets");
  return response.data;
};

// --- Porteurs ---
export const getPorteurs = async (): Promise<Porteur[]> => {
  const response = await api.get<Porteur[]>("/porteurs");
  return response.data;
};

// --- Avis ---
export const getAvis = async (): Promise<Avis[]> => {
  const response = await api.get<Avis[]>("/avis");
  return response.data;
};
// --- Types de colis ---
export const getTypesColis = async (id_trajet: number) => {
  const response = await api.get("/types-colis"); // route API pour types de colis
  return response.data;
};
// --- Types de colis pour un trajet spécifique ---
export const getTypeColisByTrajet = async (id_trajet: number): Promise<string[]> => {
  const response = await api.get(`/trajets/${id_trajet}/types-colis`);
  // On suppose que l'API renvoie un tableau de { nom_type: string }
  return response.data.map((t: any) => t.nom_type);
};

export default api;
