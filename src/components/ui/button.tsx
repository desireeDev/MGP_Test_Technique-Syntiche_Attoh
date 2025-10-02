import * as React from "react";

// Props du composant Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

/**
 * COMPOSANT BOUTON
 * 
 * Un bouton personnalisé avec différents styles et tailles.
 * 
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = "", 
    variant = "default", 
    size = "default", 
    children, 
    ...props 
  }, ref) => {
    
    // Styles de base communs à tous les boutons of our project
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    // Styles selon la variante (couleur)
    const variantStyles = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-800 text-white hover:bg-gray-700", 
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
      ghost: "text-gray-700 hover:bg-gray-100"
    };
    
    // Styles selon la taille
    const sizeStyles = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-9 px-3 text-sm", 
      lg: "h-11 px-8 text-base"
    };

    // Combine tous les styles
    const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
      <button
        className={buttonStyles}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// Nom pour le debugging React
Button.displayName = "Button";

export { Button };