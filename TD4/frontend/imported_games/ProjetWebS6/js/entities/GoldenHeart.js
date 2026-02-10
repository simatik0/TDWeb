import Entity from './Entity.js';

export class GoldenHeart extends Entity {
    constructor(gameWidth, gameHeight, speed) {
        // Même logique d'apparition que Heart/Enemy
        let x, y;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 : gameWidth;
            y = Math.random() * gameHeight;
        } else {
            x = Math.random() * gameWidth;
            y = Math.random() < 0.5 ? 0 : gameHeight;
        }

        super(x, y, 15, 'gold');

        this.speed = (speed || 1.5) * 1.5; // Vitesse plus rapide que le coeur normal
        this.markedForDeletion = false;

        this.targetX = gameWidth / 2;
        this.targetY = gameHeight / 2;

        this.image = new Image();
        this.image.src = 'assets/img/golden_heart.png';
    }

    update() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const angle = Math.atan2(dy, dx);

        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
    }

    drawShape(ctx) {
        // Draw heart image
        const size = this.radius * 2;
        ctx.drawImage(this.image, -this.radius, -this.radius, size, size);
    }
}
