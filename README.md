
🌐 MondialGP – Plateforme de mise en relation pour l’envoi de colis

MondialGP connecte les **expéditeurs** avec des **voyageurs disposant d’espace dans leurs bagages** pour des envois internationaux rapides, sécurisés et économiques.

---

## 🛠 Technologies utilisées

* **Vite** – Build rapide et expérience de développement fluide
* **TypeScript** – Code plus sûr et lisible
* **React** – Construction de l’interface utilisateur
* **Tailwind CSS** – Mise en page moderne et responsive
* **shadcn-ui** – Composants UI élégants et réutilisables

---

## 🚀 Comment cloner et lancer le projet

```bash
# Cloner le dépôt
git clone https://github.com/desireeDev/MGP_Test_Technique-Syntiche_Attoh.git

# Aller dans le dossier du projet
cd MGP_Test_Technique-Syntiche_Attoh

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```
# 📋 **Classification des Erreurs Rencontrées et Solutions**

## **1. 🚨 ERREUR : Données non affichées - Trajets non associés aux porteurs**

### **Problème :**
```typescript
// Dans Index.tsx - LIGNE ORIGINALE (ne fonctionnait pas)
const trajet = trajets.find(t => t.id_utilisateur === porteur.id_utilisateur);
// Résultat: 🚗 Trajet associé: undefined
```

### **Cause :**
- **Incohérence API/TypeScript** : L'API envoie `user_id` mais TypeScript attend `id_utilisateur`

### **Solution :**
```typescript
// CORRECTION
const trajet = trajets.find(t => t.user_id === porteur.id_utilisateur);
```

---

## **2. 🚨 ERREUR : Date d'expiration "N/A" au lieu de "Xjrs : Yh"**

### **Problème :**
```typescript
date_expiration_offre: "Ouvert"  // ← Valeur string au lieu d'une date
```

### **Cause :**
- **Backend Laravel** : Le champ `date_expiration_offre` contenait "Ouvert" au lieu d'une vraie date

### **Solutions appliquées :**

#### **Solution Backend (Laravel) :**
```php
// Dans TrajetPorteur.php - Calcul automatique
protected static function boot() {
    parent::boot();
    static::saving(function ($model) {
        if (empty($model->date_expiration_offre) && !empty($model->date_arrivee)) {
            $model->date_expiration_offre = Carbon::parse($model->date_arrivee)->addDays(15);
        }
    });
}
```

#### **Solution Frontend (TypeScript) :**
```typescript
// Fonction améliorée avec fallback
const calculateTimeRemaining = (expirationDate: string, arrivalDate?: string): string => {
    if (expirationDate === "Ouvert" && arrivalDate) {
        // Calcul automatique 15 jours après l'arrivée
        const calculatedExpiration = new Date(arrivalDate);
        calculatedExpiration.setDate(calculatedExpiration.getDate() + 15);
        expirationDate = calculatedExpiration.toISOString();
    }
    // ... reste du calcul
};
```

---

## **3. 🚨 ERREUR : Incohérence DTO/Controller - Arguments manquants**

### **Problème :**
```
ArgumentCountError: Too few arguments to function App\DTO\TrajetPorteurDTO
Expected 14 arguments, 11 passed
```

### **Cause :**
- **Service Laravel** : Les méthodes `getById()` et `getAll()` n'envoyaient pas le même nombre d'arguments au DTO

### **Solution :**
```php
// Service unifié avec méthode centrale
private function createDTOFromModel(TrajetPorteur $trajet): TrajetPorteurDTO {
    return new TrajetPorteurDTO(
        $trajet->id_trajet,
        $trajet->id_utilisateur,
        // ... tous les 14 arguments dans le bon ordre
        $trajet->statut_trajet,           // Argument 12
        $trajet->date_expiration_offre,   // Argument 13  
        $trajet->date_creation            // Argument 14
    );
}
```

---

## **4. 🚨 ERREUR : Villes et dates codées en dur dans CarrierDetail**

### **Problème :**
```typescript
// Données codées en dur
<div className="font-bold text-xl text-blue-500">Dakar, Sen</div>
<div className="text-sm text-muted-foreground">22 Nov, 2024</div>
```

### **Solution :**
```typescript
// Données dynamiques
<div className="font-bold text-xl text-blue-500">
    {carrier.villeDepart}, {getCountryCode(carrier.codePaysDepart)}
</div>
<div className="text-sm text-muted-foreground">
    {formatDateDisplay(carrier.dateDepartRaw)}
</div>
```

---

## **5. 🚨 ERREUR : SearchForm avec données statiques**

### **Problème :**
```typescript
const [departure, setDeparture] = useState("Dakar, Sénégal"); // Codé en dur
const [destination, setDestination] = useState("Paris-Orly, France"); // Codé en dur
```

### **Solution :**
```typescript
// Props dynamiques
<SearchForm 
  onSearch={handleSearch}
  availableDepartures={availableDepartures}    // ["Dakar", "Paris", ...]
  availableDestinations={availableDestinations} // ["Paris-Orly", "Lyon", ...]
/>

// Extraction depuis l'API
const uniqueDepartures = [...new Set(trajets.map(t => t.ville_depart))];
const uniqueDestinations = [...new Set(trajets.map(t => t.ville_destination))];
```

---

## **6. 🚨 ERREUR : Bouton "Rechercher" sans feedback visuel**

### **Problème :**
- L'utilisateur clique mais ne voit rien se passer
- Pas d'indication que la recherche est en cours

### **Solution :**
```typescript
// État de recherche
const [isSearching, setIsSearching] = useState<boolean>(false);

// Feedback visuel
{isSearching && (
    <span className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full animate-pulse">
        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        Recherche...
    </span>
)}
```

---

## **7. 🚨 ERREUR : Filtrage avec includes() au lieu de correspondance exacte**

### **Problème :**
```typescript
// Ancien filtrage (trop permissif)
carrier.villeDepart.toLowerCase().includes(data.departure.toLowerCase())
```

### **Solution :**
```typescript
// Nouveau filtrage (correspondance exacte)
carrier.villeDepart === data.departure
```

---

## **8. 🚨 ERREUR : Gestion d'état incorrecte pour le filtrage**

### **Problème :**
```typescript
// Un seul état pour tout
const [carriers, setCarriers] = useState<CarrierDisplay[]>([]);
// En filtrant, on perd les données originales
```

### **Solution :**
```typescript
// Deux états séparés
const [allCarriers, setAllCarriers] = useState<CarrierDisplay[]>([]);     // Tous les porteurs
const [filteredCarriers, setFilteredCarriers] = useState<CarrierDisplay[]>([]); // Porteurs filtrés
```

---





