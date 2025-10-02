import { Star, Package, Clock } from "lucide-react";

interface CarrierCardProps {
  name: string;
  certification: string;
  rating: number;
  reviews: number;
  capacity: string;
  expiresIn: string;
  arrivalDate: string;
  avatar: string;       
  certifie: boolean;    
  moisCertification: number; 
  isActive?: boolean;   
  onClick?: () => void; 
}

const CarrierCard = ({
  name,
  certification,
  rating,
  reviews,
  capacity,
  expiresIn,
  arrivalDate,
  avatar,
  certifie,
  moisCertification,
  isActive = false,
  onClick
}: CarrierCardProps) => {
  // 🔹 Debug : afficher toutes les données reçues
  console.log("🎯 CarrierCard props:", {
    name,
    certification,
    rating,
    reviews,
    capacity,
    expiresIn,
    arrivalDate,
    certifie,
    moisCertification
  });
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
        isActive ? 'border-primary bg-primary/5' : 'border-border bg-card'
      }`}
    >
      <div className="flex items-start gap-4">
        
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={avatar}       
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Informations du porteur */}
        <div className="flex-1 min-w-0">
          {/* Nom + Rating + Avis sur la même ligne */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground truncate">{name}</h3>
                
                {/* Rating + Avis */}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="text-sm font-medium">{rating}</span>
                  <span className="text-xs text-muted-foreground">({reviews} avis)</span>
                </div>

                {/* Certification badge */}
                {certifie && moisCertification > 0 && (
                  <span className="text-xs text-green-600 font-medium">
                    Certifié +{moisCertification} mois
                  </span>
                )}
              </div>

              {/* Texte de certification sous la ligne */}
              <p className="text-sm text-muted-foreground mt-1">{certification}</p>
            </div>

            {/* Date d'arrivée */}
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
