# 🎮 Projet Web - GameZone (TP L3 MIAGE)

Ce projet est une plateforme web permettant d'accéder à des jeux vidéo développés en HTML5/Canvas. Il inclut une gestion simulée des utilisateurs et une navigation fluide.

## 📂 Structure du Projet

Le projet est divisé en deux parties principales : le **Frontend** (l'interface utilisateur) et le **Backend** (le serveur).

```text
TD4/
├── backend/            # Serveur Node.js
├── frontend/           # Interface Web (HTML/CSS/JS)
└── README.md           # Ce fichier
```

---

## 🎨 1. Frontend (`/frontend`)

C'est la partie visible par l'utilisateur. Elle est construite avec HTML, CSS et JavaScript vanilla.

### 📄 Pages HTML

*   **`index.html` (Landing Page)** :
    *   La page d'accueil du site.
    *   Présente le projet et Salima.
    *   Contient le menu de navigation vers les autres sections.
*   **`games.html` (Bibliothèque de Jeux)** :
    *   Affiche la liste des jeux disponibles.
    *   Les cartes de jeux sont générées dynamiquement par JavaScript (`games.js`).
    *   Contient le lien vers le `ProjetWebS6` (importé localement).
*   **`auth.html` (Authentification)** :
    *   Page unique gérant à la fois la **Connexion** et l'**Inscription**.
    *   Utilise un système de "toggle" pour afficher/masquer les formulaires sans recharger la page.


### 🧠 Logiciel JavaScript (`/js`)

*   **`js/main.js`** :
    *   Script global chargé sur toutes les pages.
    *   Gère le menu, l'affichage du profil utilisateur connecté dans le header, et la déconnexion.
*   **`js/auth.js`** :
    *   Spécifique à `auth.html`.
    *   Gère la logique d'**Inscription** : Vérifie si l'email existe, stocke le nouvel utilisateur dans le `localStorage` (clé `users`).
    *   Gère la logique de **Connexion** : Vérifie les identifiants dans le `localStorage`, crée une session (`currentUser`).
*   **`js/games.js`** :
    *   Spécifique à `games.html`.
    *   Contient un tableau d'objets `games` (titre, description, image, lien).
    *   Génère le HTML des cartes de jeu et les insère dans la page.

### 👾 Jeux Importés (`/imported_games`)

*   **`imported_games/ProjetWebS6`** :
    *   Contient une copie complète de ton projet de jeu Canvas précédent.
    *   Cela permet au jeu de fonctionner de manière autonome à l'intérieur de ce projet, sans erreurs de sécurité du navigateur.

---

## ⚙️ 2. Backend (`/backend`)

C'est le serveur qui distribue les fichiers du Frontend au navigateur.

*   **`index.js`** :
    *   Point d'entrée de l'application Node.js.
    *   Utilise le framework **Express**.
    *   **Rôle principal** : Il est configuré pour servir des "fichiers statiques" (le dossier `../frontend`).
    *   Quand tu vas sur `http://localhost:5000`, c'est ce fichier qui t'envoie `index.html`.

*   **`config/db.js`** :
    *   Gère la connexion à la base de données MongoDB (non utilisée pour le moment dans le Frontend, mais prête pour plus tard).

---

## 🚀 Comment lancer le projet

1.  Ouvrir un terminal dans le dossier `backend`.
2.  Lancer le serveur :
    ```bash
    nodemon index.js
    ```
3.  Ouvrir le navigateur sur `http://localhost:5000`.

---

## 👤 Auteur

**Salima** - Étudiante L3 MIAGE
*Projet développé dans le cadre du TD Web.*
