
# Backend MondialGP

Backend Laravel pour gérer les utilisateurs, colis, porteurs, avis et trajets via une API REST.

---

## Installation

1. Cloner le dépôt :

```bash
git clone <https://github.com/desireeDev/MGP_Test_Technique-Syntiche_Attoh.git>
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

* **Models** : Lees tables de notre bases de donnees (`User`, `Colis`, etc.).
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

```


#Un apercu de quelques tables essentielles

<img width="608" height="286" alt="Apercu" src="https://github.com/user-attachments/assets/d8eeac61-7dcd-46e6-ba02-5626782e193d" />

#La disposition des Api sur Postman


<img width="692" height="181" alt="Avis" src="https://github.com/user-attachments/assets/c83b36b2-c6c0-4bfb-ade2-27cebc031c73" />


<img width="608" height="247" alt="Get_Avis" src="https://github.com/user-attachments/assets/4d7bad2f-6d6a-4d8c-8858-5e210c1d8254" />

#Base de données PhpMyAdmin
<img width="811" height="244" alt="BD" src="https://github.com/user-attachments/assets/75cd4f56-1a17-444d-a911-41943a350267" />

📌 Projet – Vers une architecture microservices
Contexte

Actuellement, le projet est développé sous Laravel avec une architecture monolithique.
Les controllers appellent des services internes pour organiser la logique métier (Users, Porteurs, Trajets, Avis).

Bien que cela améliore la lisibilité et la maintenabilité du code, ce n’est pas une architecture microservices.

Objectif

L’objectif est de préparer le projet pour évoluer vers une architecture microservices, afin de bénéficier de :

Déploiement indépendant des services.

Scalabilité des modules critiques (Trajets, Porteurs, Users, Avis).

Indépendance technologique pour chaque service si nécessaire.

Meilleure organisation pour tests et seeds isolés.


