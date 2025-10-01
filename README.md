
# Backend MondialGP

Backend Laravel pour gérer les utilisateurs, colis, porteurs, avis et trajets via une API REST.

---

## Installation

1. Cloner le dépôt :

```bash
git clone <url_du_repo>
cd backendMondialGP
```

2. Installer les dépendances :

```bash
composer install
```

3. Configurer `.env` avec votre base de données et générer la clé :

```bash
cp .env.example .env
php artisan key:generate
```

4. Créer les tables et seed :

```bash
php artisan migrate:fresh --seed
```

---

## Architecture

* **DTOs** : Normalisent les données pour l’API (`UserDTO`, `ColisDTO`, etc.), chaque DTO a `toArray()`.
* **Services** : Logique métier, utilisent les DTO (`UserService`, `ColisService`, etc.).
* **Controllers** : Appellent les services et renvoient des JSON.
* **Routes** : Toutes les routes sont définies dans `routes/api.php`.

---

## Routes principales

| Ressource        | Route                   | Méthode |
| ---------------- | ----------------------- | ------- |
| Utilisateurs     | `/api/users`            | GET     |
| Utilisateurs     | `/api/users/{id}`       | GET     |
| Colis            | `/api/colis`            | GET     |
| Colis            | `/api/colis/{id}`       | GET     |
| Avis             | `/api/avis`             | GET     |
| Avis             | `/api/avis/{id}`        | GET     |
| Types de colis   | `/api/types-colis`      | GET     |
| Types de colis   | `/api/types-colis/{id}` | GET     |
| Trajets porteurs | `/api/trajets`          | GET     |
| Trajets porteurs | `/api/trajets/{id}`     | GET     |
| Porteurs         | `/api/porteurs`         | GET     |
| Porteurs         | `/api/porteurs/{id}`    | GET     |

---

## Erreurs rencontrées et solutions

| Erreur                                 | Cause                                              | Solution                                                                               |
| -------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Duplicate entry** lors du seeding    | Seeders inséraient plusieurs fois le même code     | `php artisan migrate:fresh --seed` pour réinitialiser la base                          |
| **Data too long** pour certains champs | Valeurs trop longues pour la colonne               | Adapter la taille de la colonne ou raccourcir les données                              |
| **404 Routes**                         | Routes définies dans `web.php`                     | Déplacer toutes les routes API dans `routes/api.php`                                   |
| **JSON vide**                          | DTOs non convertis correctement                    | Appeler `toArray()` sur chaque DTO avant de renvoyer la réponse                        |
| **500 Internal Server Error**          | Appel à méthode non définie (`getAll()` manquante) | Ajouter correctement les méthodes `getAllUsers()`, `getAll()`, etc., dans les services |

---

## Test API

* Lancer le serveur :

```bash
php artisan serve
```

* Tester avec Postman  en utilisant :

```
BASE_URL = http://localhost:8000/api
