import { useState, useEffect } from "react";
import { getPorteurs, getTrajets, getTypeColisByTrajet } from "@/services/api";
import { Porteur, TrajetPorteur } from "@/services/types";

import Header from "@/components/Header";
import SearchForm, { SearchData } from "@/components/SearchForm";
import CarrierCard from "@/components/CarrierCard";
import CarrierDetail from "@/components/CarrierDetail";
import Footer from "@/components/Footer";
import { ChevronDown } from "lucide-react";

/* -------------------------------
   Interface pour l'affichage frontend
   Transforme les données brutes du backend en format utilisable par l'UI
--------------------------------*/
interface CarrierDisplay {
  id: number;                  // ID unique du porteur
  name: string;                // Nom complet formaté "Prénom Nom"
  certification: string;       // Statut "Certifié +X mois" ou "Nouveau"
  rating: number;              // Note moyenne sur 5
  reviews: number;             // Nombre total d'avis
  capacity: string;            // Poids disponible formaté "X kg disponible"
  expiresIn: string;           // Temps restant "Xjrs : Yh" ou "N/A"
  arrivalDate: string;         // Date d'arrivée formatée "17 Nov"
  avatar: string;              // URL de l'avatar ou image par défaut
  price: number | "N/A";       // Tarif par kg ou "N/A"
  typesColis: string[];        // Liste des types de colis acceptés
  certifie: boolean;           // Statut de certification booléen
  moisCertification: number;   // Durée de certification en mois
  villeDepart: string;         // Ville de départ brute
  codePaysDepart: string;      // Code pays départ (ex: "SN")
  villeDestination: string;    // Ville de destination brute
  codePaysDestination: string; // Code pays destination (ex: "FR")
  dateDepartRaw: string;       // Date départ formatée "17 novembre 2024"
  dateArriveeRaw: string;      // Date arrivée formatée "17 novembre 2024"
}

/* -------------------------------
   FONCTIONS UTILITAIRES
--------------------------------*/

/**
 * Calcule le temps restant avant expiration d'une offre
 * @param expirationDate - Date d'expiration au format string
 * @returns Temps restant formaté "Xjrs : Yh" ou "Expiré" ou "N/A"
 */
const calculateTimeRemaining = (expirationDate: string): string => {
  // Vérification de la validité de la date
  if (!expirationDate || expirationDate === "Ouvert" || isNaN(new Date(expirationDate).getTime())) {
    return "N/A";
  }

  const now = new Date();
  const expiry = new Date(expirationDate);
  const diff = expiry.getTime() - now.getTime();

  // Si la date est déjà passée
  if (diff <= 0) return "Expiré";

  // Calcul des jours et heures restants
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  return `${days}jrs : ${hours}h`;
};

/**
 * Formate une date en format court français "17 Nov"
 * @param dateStr - Date au format string
 * @returns Date formatée ou "N/A" si invalide
 */
const formatDateShortFR = (dateStr?: string) => {
  if (!dateStr) return "N/A";
  
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "N/A";
  
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  }).replace('.', '');
};

/**
 * Formate une date en format long français "17 novembre 2024"
 * @param dateStr - Date au format string
 * @returns Date formatée ou "N/A" si invalide
 */
const formatDateFR = (dateStr?: string) => {
  if (!dateStr) return "N/A";
  
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "N/A";
  
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/* -------------------------------
   COMPOSANT PRINCIPAL
--------------------------------*/
const Index = () => {
  // --- ÉTATS PRINCIPAUX ---
  const [selectedCarrier, setSelectedCarrier] = useState<number>(0);        // ID du porteur sélectionné
  const [allCarriers, setAllCarriers] = useState<CarrierDisplay[]>([]);     // Liste complète des porteurs (pour le filtrage)
  const [filteredCarriers, setFilteredCarriers] = useState<CarrierDisplay[]>([]); // Porteurs filtrés à afficher
  const [loading, setLoading] = useState<boolean>(true);                    // État de chargement
  const [error, setError] = useState<string>("");                           // Message d'erreur
  const [availableDepartures, setAvailableDepartures] = useState<string[]>([]);   // Villes de départ uniques
  const [availableDestinations, setAvailableDestinations] = useState<string[]>([]); // Villes de destination uniques
  const [isSearching, setIsSearching] = useState<boolean>(false);           // 🔥 État pour le feedback de recherche

  /* -------------------------------
     EFFET POUR RÉCUPÉRER LES DONNÉES AU CHARGEMENT
  --------------------------------*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // --- APPELS API ---
        const porteurs: Porteur[] = await getPorteurs();
        const trajets: TrajetPorteur[] = await getTrajets();

        // --- EXTRACTION DES VILLES UNIQUES POUR LE FORMULAIRE ---
        const uniqueDepartures = [...new Set(trajets.map(t => t.ville_depart))];
        const uniqueDestinations = [...new Set(trajets.map(t => t.ville_destination))];
        
        setAvailableDepartures(uniqueDepartures);
        setAvailableDestinations(uniqueDestinations);

        console.log("🏙️ Villes de départ disponibles:", uniqueDepartures);
        console.log("🏙️ Villes de destination disponibles:", uniqueDestinations);

        // --- TRANSFORMATION DES DONNÉES POUR L'AFFICHAGE ---
        const formattedData: CarrierDisplay[] = await Promise.all(
          porteurs.map(async (porteur) => {
            // Recherche du trajet associé au porteur
            const trajet = trajets.find(t => t.user_id === porteur.id_utilisateur);

            // Récupération des types de colis acceptés
            let typesColis: string[] = [];
            if (trajet?.id_trajet) {
              typesColis = await getTypeColisByTrajet(trajet.id_trajet);
            }

            // Construction de l'objet formaté pour l'UI
            return {
              id: porteur.id_utilisateur,
              name: `${porteur.prenom || ""} ${porteur.nom || ""}`.trim() || "Nom non précisé",
              certification: porteur.certifie && porteur.mois_certification > 0
                ? `Certifié +${porteur.mois_certification} mois`
                : "Nouveau",
              rating: porteur.note_moyenne || 0,
              reviews: porteur.nombre_avis || 0,
              capacity: trajet?.poids_disponible !== undefined
                ? `${trajet.poids_disponible} kg disponible`
                : "Non précisé",
              expiresIn: trajet?.date_expiration_offre
                ? calculateTimeRemaining(trajet.date_expiration_offre)
                : "N/A",
              arrivalDate: formatDateShortFR(trajet?.date_arrivee),
              avatar: porteur.photo_profil
                ? `http://localhost:8000/storage/${porteur.photo_profil}`
                : "/assets/default_avatar.png",
              price: trajet?.tarif_par_kg !== undefined ? trajet.tarif_par_kg : "N/A",
              typesColis,
              certifie: porteur.certifie || false,
              moisCertification: porteur.mois_certification || 0,
              villeDepart: trajet?.ville_depart || "Non précisé",
              codePaysDepart: trajet?.code_pays_depart || "N/A",
              villeDestination: trajet?.ville_destination || "Non précisé",
              codePaysDestination: trajet?.code_pays_destination || "N/A",
              dateDepartRaw: formatDateFR(trajet?.date_depart),
              dateArriveeRaw: formatDateFR(trajet?.date_arrivee),
            };
          })
        );

        // --- MISE À JOUR DES ÉTATS ---
        setAllCarriers(formattedData);          // Sauvegarde de tous les porteurs
        setFilteredCarriers(formattedData);     // Affichage initial de tous les porteurs
        
        // Sélection du premier porteur par défaut
        if (formattedData.length > 0) {
          setSelectedCarrier(formattedData[0].id);
        }

      } catch (err) {
        console.error("❌ Erreur API :", err);
        setError("Erreur lors du chargement des données. Vérifiez le backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- DONNÉES DU PORTEUR SÉLECTIONNÉ ---
  const selectedCarrierData = filteredCarriers.find(c => c.id === selectedCarrier) || filteredCarriers[0];

  /* -------------------------------
     FONCTION DE RECHERCHE ET FILTRAGE AVEC FEEDBACK VISUEL
  --------------------------------*/
  const handleSearch = (data: SearchData) => {
    console.log("🔍 Recherche effectuée:", data);
    
    // 🔥 Activation du feedback visuel
    setIsSearching(true);
    
    // Petit délai pour améliorer l'UX (le filtrage est instantané mais on veut que l'utilisateur voie le feedback)
    setTimeout(() => {
      // 🔹 FILTRAGE DES PORTEURS SELON LES CRITÈRES
      const filtered = allCarriers.filter(carrier => {
        // Filtre par ville de départ (correspondance exacte)
        const matchesDeparture = data.departure ? 
          carrier.villeDepart === data.departure : true;
        
        // Filtre par ville de destination (correspondance exacte)
        const matchesDestination = data.destination ? 
          carrier.villeDestination === data.destination : true;
        
        // Filtre par poids (le porteur doit avoir assez de capacité)
        const matchesWeight = data.weight ? 
          parseInt(carrier.capacity) >= parseInt(data.weight) : true;

        return matchesDeparture && matchesDestination && matchesWeight;
      });

      console.log(`📊 Résultats filtrés: ${filtered.length} porteurs`);
      
      // Mise à jour de la liste affichée
      setFilteredCarriers(filtered);
      
      // Réinitialisation de la sélection si nécessaire
      if (filtered.length > 0) {
        const currentSelectedStillExists = filtered.find(c => c.id === selectedCarrier);
        if (!currentSelectedStillExists) {
          setSelectedCarrier(filtered[0].id);
        }
      } else {
        setSelectedCarrier(0);
      }
      
      // 🔥 Désactivation du feedback visuel après le filtrage
      setIsSearching(false);
    }, 300); // Petit délai de 300ms pour que l'utilisateur voie le feedback
  };

  // 🔥 Fonction pour réinitialiser la recherche et voir tous les porteurs
  const resetSearch = () => {
    setFilteredCarriers(allCarriers);
    if (allCarriers.length > 0) {
      setSelectedCarrier(allCarriers[0].id);
    }
  };

  // --- GESTION DES ÉTATS DE CHARGEMENT ET ERREURS ---
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <div className="text-lg text-muted-foreground">Chargement des porteurs...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20 text-red-500">
            <div className="text-lg font-medium">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Réessayer
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
// --- GESTION DU CAS OÙ AUCUN PORTEUR NE CORRESPOND AUX CRITÈRES ---
  if (filteredCarriers.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <SearchForm 
              onSearch={handleSearch}
              availableDepartures={availableDepartures}
              availableDestinations={availableDestinations}
            />
            <div className="text-center py-20">
              <div className="text-lg text-muted-foreground">Aucun porteur trouvé pour vos critères</div>
              <button 
                onClick={resetSearch}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Voir tous les porteurs
              </button>
            </div>
          </div>
        </main>
        //
        <Footer />
      </div>
    );
  }

  /* -------------------------------
     RENDU PRINCIPAL
  --------------------------------*/
  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      {/* En-tête de l'application */}
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          
          {/* Formulaire de recherche avec données dynamiques */}
          <SearchForm 
            onSearch={handleSearch}
            availableDepartures={availableDepartures}
            availableDestinations={availableDestinations}
          />
          
          {/* Grille principale : Liste des porteurs + Détails */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* --- COLONNE GAUCHE : LISTE DES PORTEURS --- */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-foreground">
                    {filteredCarriers.length} Résultat{filteredCarriers.length > 1 ? 's' : ''} trouvé{filteredCarriers.length > 1 ? 's' : ''}
                  </h2>
                  
                  {/* 🔥 INDICATEUR DE RECHERCHE EN COURS */}
                  {isSearching && (
                    <span className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full animate-pulse">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Recherche...
                    </span>
                  )}
                </div>
                
               <div className="flex items-center gap-2"> <span className="text-sm text-foreground">Trier par :</span> <div className="flex items-center gap-2 border rounded-lg px-3 py-1 cursor-pointer hover:bg-muted transition"> <span className="text-sm font-medium text-foreground"> Tous les porteurs </span> <ChevronDown className="w-4 h-4 text-muted-foreground" /> </div> </div>
              </div>
              
              {/* Liste des cartes porteurs */}
              <div className="space-y-4">
                {filteredCarriers.map((carrier) => (
                  <CarrierCard
                    key={carrier.id}
                    {...carrier}
                    isActive={selectedCarrier === carrier.id}
                    onClick={() => setSelectedCarrier(carrier.id)}
                  />
                ))}
              </div>
            </div>

            {/* --- COLONNE DROITE : DÉTAILS DU PORTEUR SÉLECTIONNÉ --- */}
            <div className="xl:sticky xl:top-24 h-fit">
              {selectedCarrierData && (
                <CarrierDetail 
                  carrier={{ 
                    ...selectedCarrierData, 
                    price: String(selectedCarrierData.price) 
                  }} 
                />
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Pied de page */}
      <Footer />
      
    </div>
  );
};

export default Index;