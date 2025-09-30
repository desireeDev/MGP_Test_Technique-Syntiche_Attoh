import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// Composant qui fournit le contexte pour les tooltips dans l'application
const TooltipProvider = TooltipPrimitive.Provider;

// Racine du tooltip (contient le trigger et le contenu)
const Tooltip = TooltipPrimitive.Root;

// Élément déclencheur du tooltip (ex : un bouton, une icône, etc.)
const TooltipTrigger = TooltipPrimitive.Trigger;

// Contenu du tooltip (la bulle qui apparaît)
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset} // Décalage par rapport au trigger
    className={`rounded-md bg-gray-800 text-white px-2 py-1 text-sm shadow ${className}`}
    {...props}
  />
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Export des composants pour les utiliser ailleurs
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
