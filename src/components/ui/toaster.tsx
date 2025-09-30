import React from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose, ToastViewport } from "@/components/ui/toast";

/**
 * Composant Toaster
 * Sert à afficher les notifications/toasts de l'application
 */
export function Toaster() {
  // On récupère la liste des toasts depuis le hook personnalisé
  const { toasts } = useToast();

  return (
    // Provider pour gérer les toasts
    <ToastProvider>
      {/* On boucle sur tous les toasts */}
      {toasts.map(({ id, title, description }) => (
        <Toast key={id}>
          {/* Contenu du toast */}
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}

          {/* Bouton pour fermer le toast */}
          <ToastClose />
        </Toast>
      ))}

      {/* Zone où les toasts apparaissent */}
      <ToastViewport />
    </ToastProvider>
  );
}
