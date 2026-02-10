import Entity from './Entity.js';

export class Planet extends Entity {
    constructor(x, y, radius, color) {
        super(x, y, radius, color);
        this.image = new Image();
        this.image.src = 'assets/img/earth.png';
    }

    drawShape(ctx) {
        ctx.drawImage(this.image, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
    }
}
