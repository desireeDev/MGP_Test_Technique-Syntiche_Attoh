import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Cote Gauche - Logo &&Infos */}
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4L4 10L16 16L28 10L16 4Z" fill="#3B5FE8"/>
              <path d="M4 16L16 22L28 16" stroke="#3B5FE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 22L16 28L28 22" stroke="#3B5FE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm text-muted-foreground">
              © 2024 MondialGP. Tous droits réservés.
            </span>
          </div>

          {/* Center - Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Paramètres de confidentialité
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Conditions d'utilisation
            </a>
          </div>

          {/* Cote Droit - Social links */}
          <div className="flex items-center gap-3">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
