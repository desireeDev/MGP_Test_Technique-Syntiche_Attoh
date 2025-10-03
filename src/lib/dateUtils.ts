// utils/conversionDate.ts

/**
 * Calcule le temps restant avant expiration d'une offre
 * 
 * @param expirationDate - Date d'expiration au format string
 * @returns Temps restant formaté "Xjrs : Yh" ou "Expiré" si la date est passée, ou "N/A" si la date est invalide
 * 
 * Fonction très pratique pour afficher aux utilisateurs combien de temps il reste avant la fin d'une offre.
 */
export const calculateTimeRemaining = (expirationDate: string): string => {
  // Vérification initiale : si aucune date n'est fournie, si la date est spéciale ("Ouvert")
  // ou si la date n'est pas valide → on retourne "N/A"
  if (!expirationDate || expirationDate === "Ouvert" || isNaN(new Date(expirationDate).getTime())) {
    return "N/A";
  }

  // Création des objets Date pour calculer la différence
  const now = new Date();                 // Date et heure actuelles
  const expiry = new Date(expirationDate); // Date d'expiration fournie
  const diff = expiry.getTime() - now.getTime(); // Différence en millisecondes

  // Si la date est déjà passée → retour immédiat "Expiré"
  if (diff <= 0) return "Expiré";

  // Conversion des millisecondes en jours et heures
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));                   // Nombre de jours entiers restants
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Heures restantes après avoir compté les jours

  // Formatage final pour affichage : "3jrs : 5h"
  return `${days}jrs : ${hours}h`;
};

/**
 * Formate une date en format court français
 * Exemple : "17 Nov"
 * 
 * @param dateStr - Date au format string
 * @returns Date formatée ou "N/A" si la date est invalide ou absente
 * 
 * Utile pour les aperçus rapides où seule la date (jour + mois) est pertinente.
 */
export const formatDateShortFR = (dateStr?: string) => {
  // Si aucune date n'est fournie → retour "N/A"
  if (!dateStr) return "N/A";

  // Création de l'objet Date et validation
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "N/A";

  // Formatage avec la locale française
  // day: "numeric" → jour en chiffre
  // month: "short" → mois abrégé (ex: "Nov")
  // replace('.', '') → supprime le point ajouté automatiquement par le format français
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  }).replace('.', '');
};

/**
 * Formate une date en format long français
 * Exemple : "17 novembre 2024"
 * 
 * @param dateStr - Date au format string
 * @returns Date formatée ou "N/A" si la date est invalide ou absente
 * 
 * Ce format est utile pour les affichages détaillés, par exemple dans les pages de détails d'un porteur.
 */
export const formatDateFR = (dateStr?: string) => {
  // Vérification si la date est fournie
  if (!dateStr) return "N/A";

  // Création de l'objet Date et validation
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "N/A";

  // Formatage complet avec jour, mois en toutes lettres et année
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
