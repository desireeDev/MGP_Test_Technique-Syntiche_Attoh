//Commonent SearchForùm.tsx est le formulaire de recherche de porteurs.
import { MapPin, Calendar, Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

// Définition des types pour les données de recherche
interface SearchFormProps {
  onSearch?: (data: SearchData) => void; // callback facultatif pour renvoyer les données
  availableDestinations?: string[];     // Liste des destinations disponibles depuis la BD
  availableDepartures?: string[];       // Liste des départs disponibles depuis la BD
}

export interface SearchData {
  departure: string;
  destination: string;
  date: string;
  weight: string;
}

// Composant fonctionnel avec hooks pour gérer l'état des inputs
const SearchForm = ({ onSearch, availableDestinations = [], availableDepartures = [] }: SearchFormProps) => {
  // États pour chaque champ avec valeurs par défaut vides
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");

  // 🔹 Initialise les valeurs avec les premières options disponibles
  useEffect(() => {
    if (availableDepartures.length > 0 && !departure) {
      setDeparture(availableDepartures[0]);
    }
    if (availableDestinations.length > 0 && !destination) {
      setDestination(availableDestinations[0]);
    }
    
    // Date par défaut : aujourd'hui + 7 jours
    if (!date) {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      setDate(nextWeek.toISOString().split('T')[0]);
    }
    
    // Poids par défaut
    if (!weight) {
      setWeight("10");
    }
  }, [availableDepartures, availableDestinations, departure, destination, date, weight]);

  // Fonction pour gérer le clic sur le bouton de recherche
  const handleSearch = () => {
    if (onSearch) {
      // Envoie des données structurées
      onSearch({ departure, destination, date, weight });
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-8 mb-8">
      {/* Grid pour aligner les inputs et le bouton */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">

        {/* Départ du colis - Dynamique depuis la BD */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Départ du colis
          </label>
          <select
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="w-full p-2 border border-border rounded-md font-semibold bg-background"
          >
            {availableDepartures.length > 0 ? (
              availableDepartures.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))
            ) : (
              <option value="">Chargement...</option>
            )}
          </select>
        </div>

        {/* Destination - Dynamique depuis la BD */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Destination
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 border border-border rounded-md font-semibold bg-background"
          >
            {availableDestinations.length > 0 ? (
              availableDestinations.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))
            ) : (
              <option value="">Chargement...</option>
            )}
          </select>
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
            min={new Date().toISOString().split('T')[0]} // Pas de dates passées
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
            placeholder="Poids en kg"
            className="font-semibold"
            min="0.1"
            step="0.1"
          />
        </div>

        {/* Bouton de recherche */}
        <Button 
          onClick={handleSearch}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-3xl"
          disabled={!departure || !destination} // Désactivé si pas de départ/destination
        >
          <Search className="w-5 h-5 mr-2" />
          Rechercher un porteur
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;