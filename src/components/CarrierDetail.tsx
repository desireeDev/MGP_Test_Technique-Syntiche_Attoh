import { Star, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

//Interface Typée pour les données du porteur
interface Carrier {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  capacity: string;
  expiresIn: string;
  arrivalDate: string;
  avatar: string;
  price?: string;
}
//Interface Typée pour les props du composant
interface CarrierDetailProps {
  carrier: Carrier;
}

const CarrierDetail = ({ carrier }: CarrierDetailProps) => {
  const acceptedItems = [
    "Électronique",
    "Vêtements, Bijoux",
    "Documents, Nourriture",
    "Liquides, Cosmétiques"
  ];

  const availableWeight = carrier.capacity.match(/\d+/)?.[0] || "0";
  const price = carrier.price || "5,23";

  return (
    <div className="space-y-6">
      {/* Route Card */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Départ</h3>
          <h3 className="text-lg font-semibold text-foreground">Arrivée</h3>
        </div>

        <div className="flex items-center justify-between mb-2">
          {/* Départ */}
          <div className="flex items-center gap-3 min-w-[120px]">
            <img
              src="/assets/Dakar.png"
              alt="Sénégal"
              className="w-8 h-8 object-contain"
            />
            <div>
              <div className="font-bold text-xl text-blue-500">Dakar, Sen</div>
              <div className="text-sm text-muted-foreground">22 Nov, 2024</div>
            </div>
          </div>

          {/* Ligne et valise */}
          <div className="flex-1 relative mx-4">
            <div className="h-px bg-border absolute top-1/2 left-0 right-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img
                src="/assets/laValise.png"
                alt="Indicateur"
                className="w-5 h-5 object-contain"
              />
            </div>
          </div>

          {/* Arrivée */}
          <div className="flex items-center gap-3 min-w-[140px] justify-end">
            <div className="text-right">
              <div className="font-bold text-xl text-blue-500">Paris-Orly, Fra</div>
              <div className="text-sm text-muted-foreground">23 Nov, 2024</div>
            </div>
            <img
              src="/assets/FR.png"
              alt="France"
              className="w-8 h-8 object-contain"
            />
          </div>
        </div>

        {/* Poids disponible */}
        <div className="text-center text-sm text-muted-foreground mt-2">
          {availableWeight}kg disponible
        </div>
      </div>

      {/* Carrier Info Card */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Porteur</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Expire dans {carrier.expiresIn}</span>
          </div>
        </div>

        {/* Avatar et infos du porteur */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img
                src={carrier.avatar}
                alt={carrier.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card"></div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-foreground">{carrier.name}</h4>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="text-sm font-medium">
                  {carrier.rating} ({carrier.reviews} avis)
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{carrier.location}</p>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Tarif</div>
            <div className="text-3xl font-bold text-foreground">{price}€/kg</div>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base font-semibold rounded-3xl">
            Réserver
          </Button>
        </div>

        {/* Assurance et autres */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Reviews */}
          <div>
            <div className="text-sm text-muted-foreground mb-2">Revues</div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-warning text-warning" />
              ))}
            </div>
            <div className="text-lg font-bold text-foreground mt-1">5/5</div>
            <div className="text-sm text-primary cursor-pointer mt-1">+53 revues</div>
          </div>

          {/* Assurance */}
          <div>
            <div className="text-sm text-muted-foreground mb-2">Assurance</div>
            <div className="flex items-center gap-2 mt-2">
  <img
    src="/assets/Assurance.png" 
    alt="Assurance"
    className="w-8 h-8 object-contain"
  />
</div>

            <div className="text-sm font-medium text-foreground mt-1">Dommage & Perte</div>
          </div>

          {/* Accepted Items */}
          <div>
            <div className="text-sm text-muted-foreground mb-2">Type de colis accepté</div>
            <div className="space-y-1 mt-2">
              {acceptedItems.map((item, index) => (
                <div key={index} className="text-sm text-foreground">{item}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Danger */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            Novaship ne peut être tenue responsable du transport de tout objet ou substance 
            interdit par la loi. Notamment les drogues, armes ou produits illicites. Chaque 
            utilisateur s'engage à ne pas utiliser Novaship pour le transport de tout objet dont 
            le contenu ou la nature ne respect pas les lois en vigueur. Novaship se réserve le droit 
            de cette page portail annuler des sanctions légales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarrierDetail;
