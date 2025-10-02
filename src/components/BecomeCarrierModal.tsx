//Importations des composants UI et des icônes
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { Plane, MapPin, Calendar, Package } from "lucide-react";

interface BecomeCarrierModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
//Cette page gère the soumission of the form to become a carrier
const BecomeCarrierModal = ({ open, onOpenChange }: BecomeCarrierModalProps) => {
  // ÉTAT DU FORMULAIRE - Correspondance avec les tables de la base de données
  const [formData, setFormData] = useState({
    name: "",           // Table 'porteurs' : nom + prenom
    email: "",          // Table 'utilisateurs' : email
    phone: "",          // Table 'utilisateurs' : telephone
    departure: "",      // Table 'trajet_porteurs' : ville_depart
    destination: "",    // Table 'trajet_porteurs' : ville_destination
    departureDate: "",  // Table 'trajet_porteurs' : date_depart
    capacity: "",       //  Table 'trajet_porteurs' : poids_total_capacite
    description: "",    // ➡️Informations supplémentaires (pas dans la BD directement)
  });

  /**
   *  GESTION DE LA SOUMISSION DU FORMULAIRE
   * En production, cette fonction enverrait les données à l'API
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 🔹 STRUCTURE DES DONNÉES POUR L'ENVOI À L'API :
    const carrierData = {
      // Données pour la table 'utilisateurs'
      user: {
        nom: formData.name.split(' ')[0],           // Premier mot = nom
        prenom: formData.name.split(' ').slice(1).join(' '), // Reste = prénom
        email: formData.email,
        telephone: formData.phone,
        // photo_profil, date_inscription, statut_compte seraient gérés automatiquement
      },
      // Données pour la table 'porteurs' 
      porteur: {
        // ➡️ note_moyenne, nombre_avis, certifie, mois_certification seraient initialisés à des valeurs par défaut
        statut_porteur: "En attente", // Nouveau porteur en attente de validation
        ville_depart_habituelle: formData.departure,
        pays_depart_habituel: "", // ➡️ À extraire du champ departure si possible
        ville_destination_habituelle: formData.destination,
        pays_destination_habituel: "", // ➡️ À extraire du champ destination si possible
      },
      // Données pour la table 'trajet_porteurs'
      trajet: {
        ville_depart: formData.departure,
        code_pays_depart: "", // ➡️ À déterminer automatiquement
        ville_destination: formData.destination,
        code_pays_destination: "", // ➡️ À déterminer automatiquement
        date_depart: formData.departureDate,
        date_arrivee: "", // ➡️ À calculer ou demander à l'utilisateur
        poids_disponible: formData.capacity, // ➡️ Toute la capacité est disponible initialement
        poids_total_capacite: formData.capacity,
        tarif_par_kg: 0, // ➡️ À définir par l'administrateur ou formulaire supplémentaire
        statut_trajet: "Ouvert",
        date_expiration_offre: "", // ➡️ À calculer automatiquement (date_depart + X jours)
        date_creation: new Date().toISOString(),
      },
      // Informations supplémentaires
      description: formData.description
    };

    console.log("📤 Données à envoyer à l'API:", carrierData);
    

    
    // Fermeture du modal et réinitialisation
    onOpenChange(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      departure: "",
      destination: "",
      departureDate: "",
      capacity: "",
      description: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Plane className="w-6 h-6 text-primary" />
            Devenir Porteur
          </DialogTitle>
          <DialogDescription>
            Remplissez ce formulaire pour proposer vos services de transport de colis.
            Gagnez de l'argent en transportant des colis lors de vos voyages.
          </DialogDescription>
        </DialogHeader>

        {/* 🔹 FORMULAIRE PRINCIPAL */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          
          {/* ==================== */}
          {/* INFORMATIONS PERSONNELLES */}
          {/* ==================== */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Informations personnelles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NOM COMPLET - Correspond à 'nom' + 'prenom' dans la table utilisateurs */}
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jean Dupont"
                  required
                />
                <p className="text-xs text-muted-foreground">
                   Sera séparé en 'nom' et 'prenom' dans la base
                </p>
              </div>

              {/* EMAIL - Correspond à 'email' dans la table utilisateurs */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jean.dupont@email.com"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Stocké dans la table 'utilisateurs'
                </p>
              </div>
            </div>

            {/* TÉLÉPHONE - Correspond à 'telephone' dans la table utilisateurs */}
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+33 6 12 34 56 78"
                required
              />
              <p className="text-xs text-muted-foreground">
                ➡️ Stocké dans la table 'utilisateurs'
              </p>
            </div>
          </div>

          {/* ==================== */}
          {/* DÉTAILS DU VOYAGE */}
          {/* ==================== */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Détails du voyage</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* VILLE DE DÉPART - Correspond à 'ville_depart' dans trajet_porteurs */}
              <div className="space-y-2">
                <Label htmlFor="departure" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Ville de départ *
                </Label>
                <Input
                  id="departure"
                  value={formData.departure}
                  onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                  placeholder="Dakar, Sénégal"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  ➡️ Stocké dans 'trajet_porteurs.ville_depart' et 'porteurs.ville_depart_habituelle'
                </p>
              </div>

              {/* VILLE DE DESTINATION - Correspond à 'ville_destination' dans trajet_porteurs */}
              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Ville de destination *
                </Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="Paris, France"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  ➡️ Stocké dans 'trajet_porteurs.ville_destination' et 'porteurs.ville_destination_habituelle'
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DATE DE DÉPART - Correspond à 'date_depart' dans trajet_porteurs */}
              <div className="space-y-2">
                <Label htmlFor="departureDate" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date de départ *
                </Label>
                <Input
                  id="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  ➡️ Stocké dans 'trajet_porteurs.date_depart'
                </p>
              </div>

              {/* CAPACITÉ - Correspond à 'poids_total_capacite' dans trajet_porteurs */}
              <div className="space-y-2">
                <Label htmlFor="capacity" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Capacité disponible (kg) *
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  placeholder="25"
                  min="1"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  ➡️ Stocké dans 'trajet_porteurs.poids_total_capacite' et 'poids_disponible'
                </p>
              </div>
            </div>

            {/* DESCRIPTION - Information supplémentaire (non stockée directement en BD) */}
            <div className="space-y-2">
              <Label htmlFor="description">Informations supplémentaires</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Types de colis acceptés, conditions particulières, etc."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                ➡️ Information contextuelle pour l'administrateur
              </p>
            </div>
          </div>

          {/* ==================== */}
          {/* ACTIONS DU FORMULAIRE */}
          {/* ==================== */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Soumettre ma candidature
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BecomeCarrierModal;