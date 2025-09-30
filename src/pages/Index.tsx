import { useState } from "react";
import Header from "@/components/Header";
import SearchForm, { SearchData } from "@/components/SearchForm";

import CarrierCard from "@/components/CarrierCard";
import CarrierDetail from "@/components/CarrierDetail";
import Footer from "@/components/Footer";
import { ChevronDown } from "lucide-react";


const Index = () => {
  const [selectedCarrier, setSelectedCarrier] = useState(1);

  const handleSearch = (data: SearchData) => {
     console.log(`Recherche de ${data.departure} vers ${data.destination} pour ${data.weight}kg`);
  };
//Déclaration des porteurs
  const carriers = [
    {
      id: 0,
      name: "Mathieu Dubois",
      location: "Certifié +3 mois",
      rating: 4.5,
      reviews: 104,
      capacity: "5kg disponible",
      expiresIn: "8jrs • 23h",
      arrivalDate: "17 Nov.",
      avatar: "/assets/M_Dubois.png",
      price: "6,50"
    },
    {
      id: 1,
      name: "Camille Dubois",
      location: "Canille",
      rating: 5,
      reviews: 12,
      capacity: "25kg disponible",
      expiresIn: "10jrs • 23h",
      arrivalDate: "23 Nov.",
      avatar: "/assets/C_Dubois.png",
      price: "5,23"
    },
    {
      id: 2,
      name: "Théo Rousseau",
      location: "Nouveau",
      rating: 4.8,
      reviews: 8,
      capacity: "10kg disponible",
      expiresIn: "10jrs • 23h",
      arrivalDate: "26 Nov.",
      avatar: "/assets/Théo_R.png",
      price: "4,80"
    },
    {
      id: 3,
      name: "Chloé Bernard",
      location: "Nouveau",
      rating: 4.9,
      reviews: 15,
      capacity: "15kg disponible",
      expiresIn: "10jrs • 23h",
      arrivalDate: "26 Nov.",
      avatar: "/assets/Chloe_B.png",
      price: "5,90"
    },
    {
      id: 4,
      name: "Marie Garnier",
      location: "Nouveau",
      rating: 4.7,
      reviews: 20,
      capacity: "10kg disponible",
      expiresIn: "10jrs • 23h",
      arrivalDate: "03 Déc.",
      avatar: "/assets/Marie_Garnier.png",
      price: "7,20"
    }
  ];

  const selectedCarrierData = carriers.find(c => c.id === selectedCarrier) || carriers[1];

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
                <h2 className="text-xl font-bold text-foreground">5 Résultats trouvés</h2>
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
              <CarrierDetail carrier={selectedCarrierData} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
