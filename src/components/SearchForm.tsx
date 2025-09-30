import { MapPin, Calendar, Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Définition des types pour les données de recherche
interface SearchFormProps {
  onSearch?: (data: SearchData) => void; // callback facultatif pour renvoyer les données
}

export interface SearchData {
  departure: string;
  destination: string;
  date: string;
  weight: string;
}

// Composant fonctionnel avec hooks pour gérer l'état des inputs
const SearchForm = ({ onSearch }: SearchFormProps) => {
  // useState pour chaque champ 
  const [departure, setDeparture] = useState("Dakar, Sénégal");
  const [destination, setDestination] = useState("Paris-Orly, France");
  const [date, setDate] = useState("2024-12-02");
  const [weight, setWeight] = useState("24");

  // Fonction pour gérer le clic sur le bouton de recherche
  const handleSearch = () => {
    if (onSearch) {
      // envoie des données structurées
      onSearch({ departure, destination, date, weight });
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-8 mb-8">
      {/* Grid  pour aligner les inputs et le bouton */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">

        {/* Départ du colis */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Départ du colis
          </label>
          <Input
            value={departure}
            onChange={(e) => setDeparture(e.target.value)} // gestion simple de l'état
            placeholder="Ville de départ"
            className="font-semibold"
          />
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Destination
          </label>
          <Input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Ville de destination"
            className="font-semibold"
          />
        </div>

        {/* Départ souhaité */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Départ souhaité
          </label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="font-semibold"
          />
        </div>

        {/* Poids */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Package className="w-4 h-4" />
            Poids (kg)
          </label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Poids"
            className="font-semibold"
          />
        </div>

        {/* Bouton de recherche */}
        <Button 
          onClick={handleSearch} // relie l’action au bouton
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-3xl"
        >
          <Search className="w-5 h-5 mr-2" />
          Rechercher un porteur
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
