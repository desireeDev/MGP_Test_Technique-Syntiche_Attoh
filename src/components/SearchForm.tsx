import { MapPin, Calendar, Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

// Définition des types pour les données de recherche
interface SearchFormProps {
  onSearch?: (data: SearchData) => void;
  availableDestinations?: string[];
  availableDepartures?: string[];
}

export interface SearchData {
  departure: string;
  destination: string;
  date: string;
  weight: string;
}

// Composant fonctionnel avec hooks pour gérer l'état des inputs
const SearchForm = ({ onSearch, availableDestinations = [], availableDepartures = [] }: SearchFormProps) => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [displayDate, setDisplayDate] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  // 🔹 Formate la date en français "02 Décembre"
  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    
    // Format "02 Décembre" (sans année)
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('fr-FR', { month: 'long' });
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    
    return `${day} ${capitalizedMonth}`;
  };

  //  Initialise les valeurs avec les premières options disponibles
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
      const defaultDate = nextWeek.toISOString().split('T')[0];
      setDate(defaultDate);
      setDisplayDate(formatDateForDisplay(defaultDate));
    }
    
    // Poids par défaut
    if (!weight) {
      setWeight("10");
    }
  }, [availableDepartures, availableDestinations, departure, destination, date, weight]);

  //  Gère le changement de date
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);
    setDisplayDate(formatDateForDisplay(newDate));
  };

  // Ouvre le date picker avec useRef
  const handleDisplayDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  // Fonction pour gérer le clic sur le bouton de recherche
  const handleSearch = () => {
    if (onSearch) {
      onSearch({ departure, destination, date, weight });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 mb-6">
      <div className="flex items-center gap-4">
        {/* Pillule grise */}
        {/* Utilisation de flex-1 pour que la pillule prenne tout l'espace disponible  et jouer sur la taille px*/ }
        <div className="bg-gray-50 rounded-full shadow-sm border border-gray-200 px-2 py-1.5 flex-1">
          <div className="flex items-center gap-0 divide-x divide-gray-300">

        {/* Départ du colis - Dynamique depuis la BD */}
        <div className="flex items-center gap-2 px-4 py-1.5 flex-1">
          <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <label className="text-xs text-gray-500 mb-0.5">
              Départ du colis
            </label>
            <select
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="text-sm font-medium bg-transparent border-none outline-none cursor-pointer text-gray-900 truncate"
              style={{ appearance: 'none', WebkitAppearance: 'none' }}
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
        </div>

        {/* Destination - Dynamique depuis la BD */}
        <div className="flex items-center gap-2 px-4 py-1.5 flex-1">
          <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <label className="text-xs text-gray-500 mb-0.5">
              Destination
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="text-sm font-medium bg-transparent border-none outline-none cursor-pointer text-gray-900 truncate"
              style={{ appearance: 'none', WebkitAppearance: 'none' }}
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
        </div>

        {/* Départ souhaité - FORMAT "02 Décembre" */}
        <div className="flex items-center gap-2 px-4 py-1.5 flex-1">
          <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-0.5">
              Départ souhaité
            </label>
            
            {/* Input caché pour le date picker avec ref */}
            <input
              ref={dateInputRef}
              type="date"
              value={date}
              onChange={handleDateChange}
              className="hidden"
              min={new Date().toISOString().split('T')[0]}
            />
            
            {/* Affichage cliquable */}
            <div 
              onClick={handleDisplayDateClick}
              className="text-sm font-medium cursor-pointer text-gray-900 whitespace-nowrap"
            >
              {displayDate || "Sélectionner une date"}
            </div>
          </div>
        </div>

        {/* Poids avec "kilos" ajouté */}
        <div className="flex items-center gap-2 px-4 py-1.5 flex-1">
          <Package className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-0.5">
              Poids
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-12 text-sm font-medium bg-transparent border-none outline-none text-gray-900"
                min="0.1"
                step="0.1"
              />
              <span className="text-sm font-medium text-gray-900 whitespace-nowrap">kilos</span>
            </div>
          </div>
        </div>

        </div>
      </div>

        {/* Bouton de recherche - EN DEHORS de la pillule */}
        <Button 
          onClick={handleSearch}
          className="h-12 px-6 bg-blue-700 hover:bg-blue-700 text-white font-medium rounded-full flex items-center gap-2 whitespace-nowrap flex-shrink-0"
          disabled={!departure || !destination}
        >
          <Search className="w-4 h-4" />
          Rechercher un porteur
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;