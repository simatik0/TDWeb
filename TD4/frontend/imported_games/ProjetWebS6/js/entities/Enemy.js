import Entity from './Entity.js';

export class Enemy extends Entity {
    constructor(gameWidth, gameHeight, speed) {
        // Apparition aléatoire des ennemis
        let x, y;
        if (Math.random() < 0.5) {
            // Horizontale
            x = Math.random() < 0.5 ? 0 : gameWidth;
            y = Math.random() * gameHeight;
        } else {
            // Verticale
            x = Math.random() * gameWidth;
            y = Math.random() < 0.5 ? 0 : gameHeight;
        }

        super(x, y, 15, 'red');

        this.speed = speed || 1.5;
        this.markedForDeletion = false;

        // Cible
        this.targetX = gameWidth / 2;
        this.targetY = gameHeight / 2;

        // Assets Images
        this.image = new Image();
        this.image.src = 'assets/img/asteroid.png';
        this.angleRotation = 0;
        this.rotationSpeed = this.speed * 0.05; // Rotation plus rapide si vitesse plus rapide
    }

    update() {
        // Mouvements 
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const angle = Math.atan2(dy, dx);

        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;

        // Self-Rotation
        this.angleRotation += this.rotationSpeed;
    }

    drawShape(ctx) {
        ctx.rotate(this.angleRotation);

        const size = this.radius * 2.5;
        ctx.drawImage(this.image, -size / 2, -size / 2, size, size);
    }
}
