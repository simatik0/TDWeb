import { Enemy } from './Enemy.js';

export class Saucer extends Enemy {
    constructor(gameWidth, gameHeight, speed) {
        // Vaisseau se déplace 1.5x plus vite que les ennemis normaux
        super(gameWidth, gameHeight, speed * 1.5);
        this.color = 'purple';
        this.radius = 25;

        this.image = new Image();
        this.image.src = 'assets/img/saucer.png';
    }

    drawShape(ctx) {
        const size = this.radius * 2.5;
        ctx.drawImage(this.image, -size / 2, -size / 2, size, size);
    }
}
