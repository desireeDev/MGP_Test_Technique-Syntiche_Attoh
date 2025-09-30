import { Star, Package, Clock } from "lucide-react";

// Props du composant CarrierCard
interface CarrierCardProps {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  capacity: string;
  expiresIn: string;
  arrivalDate: string;
  avatar: string;       // chemin vers l'image de l'avatar
  isActive?: boolean;   // optionnel, pour indiquer si la carte est sélectionnée
  onClick?: () => void; // callback lorsqu'on clique sur la carte
}

const CarrierCard = ({
  name,
  location,
  rating,
  reviews,
  capacity,
  expiresIn,
  arrivalDate,
  avatar,
  isActive = false,
  onClick
}: CarrierCardProps) => {
  return (
    // Carte clickable avec style conditionnel si active
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
        isActive ? 'border-primary bg-primary/5' : 'border-border bg-card'
      }`}
    >
      <div className="flex items-start gap-4">
        
        {/* Avatar avec badge */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            {/* L'image s'affiche correctement avec object-cover */}
            <img
              src={avatar}       
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Petit badge vert indiquant l'activité ou statut */}
          {isActive && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card"></div>
          )}
        </div>

        {/* Informations du porteur */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{name}</h3>
                <div className="flex items-center gap-1">
                  {/* Étoile + note */}
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="text-sm font-medium">{rating}</span>
                  <span className="text-xs text-muted-foreground">({reviews} avis)</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{location}</p>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium text-foreground">Arrivé {arrivalDate}</div>
            </div>
          </div>

          {/* Capacités et expiration */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">{capacity}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Expire dans {expiresIn}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CarrierCard;
