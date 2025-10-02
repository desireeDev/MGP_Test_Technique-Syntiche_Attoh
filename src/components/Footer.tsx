

/**
 * Composant Footer - Pied de page de l'application
 * Affiche le logo, les liens légaux et les réseaux sociaux
 */
const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-6 mt-12">
      <div className="container mx-auto px-4">
        
        {/* Conteneur principal flexbox pour l'alignement responsive */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* ==================== */}
          {/* SECTION GAUCHE - LOGO ET COPYRIGHT */}
          {/* ==================== */}
          <div className="flex items-center gap-3">
            {/* Logo principal de MondialGP */}
            <img 
              src="/assets/Logo/La_Valise.png" 
              alt="MondialGP - Service de transport de colis" 
              className="w-8 h-8 object-contain"
            />
            {/* Texte de copyright */}
            <span className="text-sm text-muted-foreground">
              © 2024 MondialGP. Tous droits réservés.
            </span>
          </div>

          {/* ==================== */}
          {/* SECTION CENTRE - LIENS LÉGAUX */}
          {/* ==================== */}
          <div className="flex items-center gap-6 text-sm">
            {/* Lien vers les paramètres de confidentialité */}
            <a 
              href="/privacy" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Paramètres de confidentialité
            </a>
            {/* Séparateur visuel */}
            <span className="text-muted-foreground">•</span>
            {/* Lien vers les conditions d'utilisation */}
            <a 
              href="/terms" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Conditions d'utilisation
            </a>
          </div>

          {/* ==================== */}
          {/* SECTION DROITE - RÉSEAUX SOCIAUX */}
          {/* ==================== */}
          <div className="flex items-center gap-3">
            
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Suivez-nous sur Facebook"
            >
              <img 
                src="/assets/Logo/Logo_fb.png" 
                alt="Facebook" 
                className="w-9 h-9 object-contain"
              />
            </a>
            
            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Suivez-nous sur Instagram"
            >
              <img 
                src="/assets/Logo/Logo_Insta.png" 
                alt="Instagram" 
                className="w-9 h-9 object-contain"
              />
            </a>
            
            {/* Twitter/X */}
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Suivez-nous sur Twitter"
            >
              <img 
                src="/assets/Logo/Logo_X.png" 
                alt="Twitter" 
                className="w-9 h-9 object-contain"
              />
            </a>
            
            {/* LinkedIn */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Suivez-nous sur LinkedIn"
            >
              <img 
                src="/assets/Logo/Logo_Link.png" 
                alt="LinkedIn" 
                className="w-9 h-9 object-contain"
              />
            </a>
            
            {/* YouTube */}
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Suivez-nous sur YouTube"
            >
              <img 
                src="/assets/Logo/Logo_Youtube.png" 
                alt="YouTube" 
                className="w-9 h-9 object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;