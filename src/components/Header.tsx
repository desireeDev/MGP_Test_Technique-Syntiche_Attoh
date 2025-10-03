import { Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

//Component Header de l'application
const Header = () => {
  //Say that le model est caché par defaut
  const [showCarrierModal, setShowCarrierModal] = useState(false);
//Page retournée
  return (
    <>
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo + Titre */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex items-center justify-center overflow-hidden rounded-full">
                <img
                  src="/assets/Baggage.png"
                  alt="Logo MondialGP"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-bold text-primary">MondialGP</span>
              <span className="text-sm font-bold text-black ml-4">Tableau de bord</span>
            </div>

            {/* Côté droit : boutons et avatar */}
            <div className="flex items-center gap-4">
              {/* Button Devenir Porteur */}
              <Button
                onClick={() => setShowCarrierModal(true)}
                variant="secondary"
                className="bg-[#1e293b] text-white hover:bg-[#334155] font-medium rounded-3xl"
              >
                Devenir Porteur
              </Button>

              {/* Notifications et messages */}
              <div className="flex items-center gap-3">
                {/* Message */}
                <button className="relative w-12 h-12 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                  <MessageSquare className="w-6 h-6 text-foreground" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Notification */}
                <button className="relative w-12 h-12 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                  <Bell className="w-6 h-6 text-foreground" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                    2
                  </span>
                </button>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                  <img
                    src="/assets/Avatar_Profil.png"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

    </>
  );
};

export default Header;
