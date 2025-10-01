// src/types.ts

// --- Utilisateur ---
export interface User {
  id_utilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  photo_profil?: string;
  telephone?: string;
  date_inscription?: string;
  statut_compte?: string;
}

// --- Porteur ---
export interface Porteur extends User{
  note_moyenne?: number;
  nombre_avis?: number;
  certifie?: boolean;
  mois_certification?: number;
  statut_porteur?: string;
  ville_depart_habituelle?: string;
  pays_depart_habituel?: string;
  ville_destination_habituelle?: string;
  pays_destination_habituel?: string;
}

// --- Trajet Poteur ---
export interface TrajetPorteur {
  id_trajet: number;
  id_utilisateur: number;
  ville_depart: string;
  code_pays_depart: string;
  ville_destination: string;
  code_pays_destination: string;
  date_depart: string;
  date_arrivee: string;
  poids_disponible?: number;
  poids_total_capacite?: number;
  tarif_par_kg?: number;
  statut_trajet?: string;
  date_expiration_offre?: string;
  date_creation?: string;
}

// --- Colis ---
export interface Colis {
  id_colis: number;
  id_expediteur: number;
  id_trajet?: number;
  id_type_colis?: number;
  ville_depart: string;
  pays_depart: string;
  ville_destination: string;
  pays_destination: string;
  adresse_livraison?: string;
  nom_destinataire?: string;
  telephone_destinataire?: string;
  poids?: number;
  description?: string;
  montant_total?: number;
  statut_colis?: string;
  date_creation?: string;
  date_livraison_reelle?: string;
  code_suivi?: string;
}

// --- Type de Colis ---
export interface TypeColis {
  id_type_colis: number;
  nom_type: string;
  restrictions?: string;
  description?: string;
  fragile?: boolean;
}

// --- Avis ---
export interface Avis {
  id_avis: number;
  id_utilisateur_porteur: number;
  id_evaluateur: number;
  id_colis?: number;
  note: number;
  commentaire?: string;
  date_avis?: string;
}
// Pour l'affichage dans le frontend
export interface Carrier {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  capacity: string;
  expiresIn: string;
  arrivalDate: string;
  avatar: string;
  price: string;
   // Nouveau champ pour la certification
}
export interface TypeColis {
  id_type_colis: number;
  nom_type: string;
  description?: string;
  restrictions?: string;
  fragile?: boolean;
}
