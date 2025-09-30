import React, { createContext, useContext, useState } from "react";

interface SimpleToggleGroupProps {
  children: React.ReactNode;
  /** Classe CSS optionnelle pour le groupe */
  className?: string;
}

interface SimpleToggleGroupItemProps {
  label: string;
  /** Valeur initiale activée ou non */
  initial?: boolean;
  /** Callback quand l'état change */
  onChange?: (state: boolean) => void;
  className?: string;
}

/**
 * Contexte pour partager un état de style ou autre si nécessaire
 * Ici on ne l'utilise pas pour les styles mais garde la structure simple
 */
const SimpleToggleGroupContext = createContext({});

/**
 * Groupe de toggles simple
 */
const SimpleToggleGroup: React.FC<SimpleToggleGroupProps> = ({ children, className }) => {
  return <div className={`flex items-center gap-1 ${className || ""}`}>{children}</div>;
};

/**
 * Item du toggle group
 */
const SimpleToggleGroupItem: React.FC<SimpleToggleGroupItemProps> = ({
  label,
  initial = false,
  onChange,
  className,
}) => {
  const [isOn, setIsOn] = useState(initial);

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
        ${className || ""}
      `}
    >
      {label} {isOn ? "ON" : "OFF"}
    </button>
  );
};

export { SimpleToggleGroup, SimpleToggleGroupItem };
