/**
 * games.js
 * Gestion de l'affichage de la liste des jeux.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Données des Jeux ---
    // Tableau d'objets représentant les jeux disponibles
    const games = [
        {
            title: "Projet Web S6 (Canvas)",
            description: "Mon projet de jeu vidéo développé en L3 MIAGE sur Canvas.",
            image: "a mettre",
            link: "imported_games/ProjetWebS6/index.html"
        }
    ];

    // --- Sélection du conteneur ---
    const gamesListContainer = document.getElementById('games-list');

    // --- Génération de l'affichage ---
    if (gamesListContainer) {
        // On vide le conteneur par sécurité
        gamesListContainer.innerHTML = '';

        // On utilise forEach pour parcourir le tableau
        games.forEach(game => {
            // Création de la carte du jeu
            // On utilise createElement comme demandé dans les règles (verbeux mais pédagogique)

            // 1. La carte (div)
            const card = document.createElement('div');
            card.classList.add('game-card');

            // 2. L'image (img)
            const img = document.createElement('img');
            img.src = game.image;
            img.alt = game.title;
            img.classList.add('game-image');

            // 3. Le contenu textuel (div)
            const content = document.createElement('div');
            content.classList.add('game-content');

            // 4. Le titre (h3)
            const title = document.createElement('h3');
            title.textContent = game.title;

            // 5. La description (p)
            const desc = document.createElement('p');
            desc.textContent = game.description;

            // 6. Le bouton (a)
            const btn = document.createElement('a');
            btn.href = game.link;
            btn.textContent = "Jouer ➤";
            btn.classList.add('btn', 'btn-play');

            // Assemblage (appendChild)
            content.appendChild(title);
            content.appendChild(desc);
            content.appendChild(btn);

            card.appendChild(img);
            card.appendChild(content);

            // Ajout au conteneur principal
            gamesListContainer.appendChild(card);
        });
    }

});
