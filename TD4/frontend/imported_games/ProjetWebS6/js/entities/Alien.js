import { Enemy } from './Enemy.js';

export class Alien extends Enemy {
    constructor(gameWidth, gameHeight, speed) {
        super(gameWidth, gameHeight, speed);
        this.damage = 2; // Dégats infligés de 2 points
        this.color = 'red';
        this.radius = 35;

        this.image = new Image();
        this.image.src = 'assets/img/alien.png';
    }

    drawShape(ctx) {
        const size = this.radius * 2.5;
        ctx.drawImage(this.image, -size / 2, -size / 2, size, size);
    }
}
