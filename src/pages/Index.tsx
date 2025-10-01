// src/pages/index.tsx
import { useState, useEffect } from "react";
import { getPorteurs, getTrajets, getTypesColis } from "@/services/api";
import { Porteur, TrajetPorteur } from "@/services/types";

import Header from "@/components/Header";
import SearchForm, { SearchData } from "@/components/SearchForm";
import CarrierCard from "@/components/CarrierCard";
import CarrierDetail from "@/components/CarrierDetail";
import Footer from "@/components/Footer";
import { ChevronDown } from "lucide-react";

// Interface pour l'affichage frontend
interface CarrierDisplay {
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
  typesColis: string[];
}

const Index = () => {
  const [selectedCarrier, setSelectedCarrier] = useState<number>(0);
  const [carriers, setCarriers] = useState<CarrierDisplay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const porteurs: Porteur[] = await getPorteurs();
        const trajets: TrajetPorteur[] = await getTrajets();

        const formattedData: CarrierDisplay[] = await Promise.all(
          porteurs.map(async (p) => {
            const trajet = trajets.find(t => t.id_utilisateur === p.id_utilisateur);

            // Récupérer les types de colis si le trajet existe
            let typesColis: string[] = [];
            if (trajet && trajet.id_trajet) {
              const types = await getTypesColis(trajet.id_trajet);
              typesColis = types.map((t: any) => t.nom_type);
            }

            return {
              id: p.id_utilisateur,
              name: `${(p as any).nom || ""} ${(p as any).prenom || ""}`,
              location: p.statut_porteur || "Non précisé",
              rating: p.note_moyenne || 0,
              reviews: p.nombre_avis || 0,
              capacity: trajet ? `${trajet.poids_disponible || 0}kg disponible` : "N/A",
              expiresIn: trajet ? new Date(trajet.date_expiration_offre || "").toLocaleDateString() : "N/A",
              arrivalDate: trajet ? new Date(trajet.date_arrivee || "").toLocaleDateString() : "N/A",
              avatar: "/assets/default_avatar.png",
              price: trajet ? `${trajet.tarif_par_kg || 0}€` : "N/A",
              typesColis,
            };
          })
        );

        setCarriers(formattedData);
        if (formattedData.length > 0) setSelectedCarrier(formattedData[0].id);
      } catch (error) {
        console.error("Erreur API :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectedCarrierData = carriers.find(c => c.id === selectedCarrier) || carriers[0];

  const handleSearch = (data: SearchData) => {
    console.log(`Recherche de ${data.departure} vers ${data.destination} pour ${data.weight}kg`);
  };

  if (loading) return <div className="text-center py-20">Chargement...</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <SearchForm onSearch={handleSearch} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left side - Carriers list */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">{carriers.length} Résultats trouvés</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Trier par :</span>
                  <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Tous les porteurs
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
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

            {/* Right side - Carrier detail */}
            <div className="xl:sticky xl:top-24 h-fit">
              {selectedCarrierData && <CarrierDetail carrier={selectedCarrierData} />}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
