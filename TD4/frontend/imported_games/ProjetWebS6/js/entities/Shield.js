import Entity from './Entity.js';

export class Shield extends Entity {
    constructor(x, y, orbitDistance, color) {
        super(x, y, 20, color);
        this.orbitDistance = orbitDistance;
        this.angle = 0;
        this.width = 40;
        this.height = 40;

        this.image = new Image();
        this.image.src = 'assets/img/shield.png';
    }

    update(inputHandler) {
        if (inputHandler.keys.ArrowLeft) {
            this.angle -= 0.1;
        }
        if (inputHandler.keys.ArrowRight) {
            this.angle += 0.1;
        }
    }

    drawShape(ctx) {
        ctx.rotate(this.angle);
        ctx.translate(this.orbitDistance, 0);
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);

    }
}
