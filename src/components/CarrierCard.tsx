import { Star, Package } from "lucide-react";

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
//Détecter quelques erreurs courantes
  return (
    <div
      onClick={onClick}
      className={`relative p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md bg-white ${
        isActive ? 'border-blue-500' : 'border-gray-200'
      }`}
    >
      {/* Barre active / inactive */}
      {isActive ? (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg"></div>
      ) : (
       <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-400 rounded-l-lg"></div>
      )}

      <div className="flex items-center gap-3">
        {/* Avatar avec badge */}
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          </div>
          {certifie && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Informations */}
        <div className="flex-1 min-w-0">
          {/* Ligne 1: Nom + rating + date */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate text-base">{name}</h3>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">{rating}</span>
                <span className="text-xs text-gray-500">({reviews} avis)</span>
              </div>
            </div>
            <div className="text-sm text-gray-900 whitespace-nowrap">
              Arrivé {arrivalDate}
            </div>
          </div>

          {/* Ligne 2: Certification ou Nouveau */}
          <p className="text-xs text-gray-600 mb-2">
            {certifie && moisCertification > 0
              ? `Certifié +${moisCertification} mois`
              : "Nouveau"}
          </p>
  {/* Affichage incorrecte car soucis au niveau de la bd*/}
          {/* Ligne 3: Capacité + expiration */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-900">{capacity}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <span>Expire dans</span>
              <span className="font-medium">{expiresIn}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrierCard;
