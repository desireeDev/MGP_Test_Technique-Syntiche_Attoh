import React, { useState } from "react";

interface SimpleToggleProps {
  /** Texte à afficher dans le bouton */
  label: string;
  /** Etat initial (activé ou non) */
  initial?: boolean;
  /** Callback quand l'état change */
  onChange?: (state: boolean) => void;
}

/**
 * Composant Toggle simple
 * 
 * Affiche un bouton qui peut être activé ou désactivé.
 * Le style change selon l'état.
 */
const SimpleToggle: React.FC<SimpleToggleProps> = ({
  label,
  initial = false,
  onChange,
}) => {
  // État du toggle (activé / désactivé)
  const [isOn, setIsOn] = useState(initial);

  // Fonction pour changer l'état
  const handleClick = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onChange) onChange(newState);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        px-4 py-2 rounded-md font-medium
        ${isOn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}
        transition-colors
      `}
    >
      {label} {isOn ? "ON" : "OFF"}
    </button>
  );
};

export default SimpleToggle;
