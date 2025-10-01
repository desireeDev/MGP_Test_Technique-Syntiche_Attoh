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
   Interface pour le frontend
   Sert à transformer les données du backend pour l'affichage
--------------------------------*/
interface CarrierDisplay {
  id: number;                  // ID du porteur
  name: string;                // Nom complet du porteur
  certification: string;       // Texte de certification (ex: "Certifié +3 mois" ou "Nouveau")
  rating: number;              // Note moyenne
  reviews: number;             // Nombre d'avis
  capacity: string;            // Poids disponible formaté (ex: "10 kg disponible")
  expiresIn: string;           // Temps restant avant expiration
  arrivalDate: string;         // Date d'arrivée formatée
  avatar: string;              // URL de la photo de profil
  price: number | "N/A";       // Tarif par kg
  typesColis: string[];        // Types de colis acceptés
  certifie: boolean;           // Boolean de certification
  moisCertification: number;   // Nombre de mois de certification
  villeDepart: string;         // Ville de départ
  codePaysDepart: string;      // Code pays départ
  villeDestination: string;    // Ville de destination
  codePaysDestination: string; // Code pays destination
  dateDepartRaw: string;       // Date brute départ formatée
  dateArriveeRaw: string;      // Date brute arrivée formatée
}

/* -------------------------------
   Fonction pour calculer le temps restant avant expiration
--------------------------------*/
const calculateTimeRemaining = (expirationDate: string): string => {
  const now = new Date();
  const expiry = new Date(expirationDate);
  const diff = expiry.getTime() - now.getTime(); // différence en millisecondes

  if (diff <= 0) return "Expiré"; // si la date est passée

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return `${days}jrs : ${hours}h`;
};

/* -------------------------------
   Fonction pour formater les dates en français
   Exemple: "17 novembre 2024"
--------------------------------*/
const formatDateFR = (dateStr?: string) => {
  if (!dateStr) return "N/A"; // Si aucune date fournie
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "N/A"; // Si date invalide
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/* -------------------------------
   Composant principal
--------------------------------*/
const Index = () => {
  // --- États principaux ---
  const [selectedCarrier, setSelectedCarrier] = useState<number>(0); // ID du porteur sélectionné
  const [carriers, setCarriers] = useState<CarrierDisplay[]>([]);    // Liste formatée pour le frontend
  const [loading, setLoading] = useState<boolean>(true);             // Loader pendant récupération API
  const [error, setError] = useState<string>("");                    // Message d'erreur si API échoue

  /* -------------------------------
     useEffect pour récupérer les données au montage
  --------------------------------*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // --- Appels API ---
        const porteurs: Porteur[] = await getPorteurs();     // Récupérer tous les porteurs
        const trajets: TrajetPorteur[] = await getTrajets(); // Récupérer tous les trajets

        // --- Transformation des données pour l'affichage frontend ---
        const formattedData: CarrierDisplay[] = await Promise.all(
          porteurs.map(async (porteur) => {
            // Chercher le trajet associé à ce porteur
            const trajet = trajets.find(t => t.id_utilisateur === porteur.id_utilisateur);

            // Types de colis acceptés pour ce trajet
            let typesColis: string[] = [];
            if (trajet?.id_trajet) {
              typesColis = await getTypeColisByTrajet(trajet.id_trajet);
            }

            // Retourner un objet formaté
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
              arrivalDate: formatDateFR(trajet?.date_arrivee),
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

        // --- Mise à jour des états ---
        setCarriers(formattedData);
        if (formattedData.length > 0) setSelectedCarrier(formattedData[0].id);

      } catch (err) {
        console.error("Erreur API :", err);
        setError("Erreur lors du chargement des données. Vérifiez le backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Données du porteur sélectionné ---
  const selectedCarrierData = carriers.find(c => c.id === selectedCarrier) || carriers[0];
  console.log("Données du porteur sélectionné :", selectedCarrierData);

  // --- Fonction de recherche depuis le formulaire ---
  const handleSearch = (data: SearchData) => {
    console.log(`Recherche de ${data.departure} vers ${data.destination} pour ${data.weight}kg`);
  };

  // --- Gestion des états de chargement et erreurs ---
  if (loading) return <div className="text-center py-20">Chargement...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (carriers.length === 0) return <div className="text-center py-20">Aucun porteur trouvé</div>;

  /* -------------------------------
     Rendu principal
  --------------------------------*/
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Formulaire de recherche */}
          <SearchForm onSearch={handleSearch} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* -------------------------------
               Colonne gauche : Liste des porteurs
            --------------------------------*/}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">{carriers.length} Résultats trouvés</h2>
                <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Tous les porteurs <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {carriers.map((carrier) => (
                  <CarrierCard
                    key={carrier.id}
                    {...carrier}
                    isActive={selectedCarrier === carrier.id}
                    onClick={() => setSelectedCarrier(carrier.id)}
                  />
                ))}
              </div>
            </div>

            {/* -------------------------------
               Colonne droite : détails du porteur sélectionné
            --------------------------------*/}
            <div className="xl:sticky xl:top-24 h-fit">
              {selectedCarrierData && (
                <CarrierDetail carrier={{ ...selectedCarrierData, price: String(selectedCarrierData.price) }} />
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
