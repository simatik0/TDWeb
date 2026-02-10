/**
 * Classe de base pour toutes les entités du jeu.
 * Gère la position, le rayon, la couleur et le rendu de base.
 */
export default class Entity {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    // Mise à jour de l'état de l'entité (à surcharger)
    update() {
    }

    /**
     * Méthode de dessin générique respectant les règles de transformation.
     * Translate le contexte à la position (x, y) de l'entité,
     * puis appelle drawShape pour le dessin local.
     */
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        this.drawShape(ctx);
        ctx.restore();
    }

    // Dessin de la forme spécifique (à surcharger par les sous-classes)
    // Doit dessiner autour de (0, 0)
    drawShape(ctx) {
    }
}
