/**
 * main.js
 * Script principal pour la gestion de l'interface et des interactions.
 */

// On attend que le DOM soit chargé avant de lancer nos scripts
document.addEventListener('DOMContentLoaded', () => {
    console.log("Bienvenue sur le projet de Salima ! 🌸");

    // Exemple d'interaction simple pour tester
    const ctaButton = document.querySelector('.btn');

    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            // Pour l'instant, le lien fait déjà la redirection, 
            // mais on pourrait ajouter une animation ou un log ici.
            console.log("Click sur le bouton Jouer !");
        });
    }

    // Gestion de l'affichage utilisateur connecté (Bonus anticipation)
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const authLink = document.getElementById('auth-link');

    if (user && authLink) {
        authLink.textContent = "Mon Profil (" + user.email.split('@')[0] + ")";
        authLink.href = "#"; // Pour l'instant, ou page de profil plus tard
        authLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm("Voulez-vous vous déconnecter ?")) {
                localStorage.removeItem('currentUser');
                window.location.reload();
            }
        });
    }
});
