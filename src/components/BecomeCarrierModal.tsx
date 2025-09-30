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

const BecomeCarrierModal = ({ open, onOpenChange }: BecomeCarrierModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    departure: "",
    destination: "",
    departureDate: "",
    capacity: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
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

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Informations personnelles */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Informations personnelles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jean Dupont"
                  required
                />
              </div>

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
              </div>
            </div>

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
            </div>
          </div>

          {/* Détails du voyage */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Détails du voyage</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

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
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

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
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Informations supplémentaires</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Types de colis acceptés, conditions particulières, etc."
                rows={4}
              />
            </div>
          </div>

          {/* Actions */}
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
