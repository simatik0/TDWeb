import { Game } from './Game.js';

// Point d'entrée du jeu
window.addEventListener('load', () => {
    // Récupération et configuration du canvas
    const canvas = document.getElementById('gameCanvas');
    canvas.width = 800;
    canvas.height = 600;

    // Initialisation et démarrage du jeu
    const game = new Game(canvas);
    game.start();
});
