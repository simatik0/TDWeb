/**
 * Gère les entrées clavier et souris de manière centralisée.
 * Expose l'état des touches et de la souris aux autres classes.
 */
export class InputHandler {
    constructor() {
        // État des touches suivies
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
            Enter: false,
            m: false
        };

        // État de la souris
        this.mouse = { x: 0, y: 0, clicked: false };

        // Écouteurs d'événements clavier
        window.addEventListener('keydown', e => {
            if (this.keys.hasOwnProperty(e.key) || e.key === 'm' || e.key === 'M') {
                const key = e.key.toLowerCase() === 'm' ? 'm' : e.key;
                if (this.keys.hasOwnProperty(key)) this.keys[key] = true;
            }
        });

        window.addEventListener('keyup', e => {
            if (this.keys.hasOwnProperty(e.key) || e.key === 'm' || e.key === 'M') {
                const key = e.key.toLowerCase() === 'm' ? 'm' : e.key;
                if (this.keys.hasOwnProperty(key)) this.keys[key] = false;
            }
        });

        // Écouteurs d'événements souris
        window.addEventListener('mousemove', e => {
            const rect = document.querySelector('canvas').getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        window.addEventListener('mousedown', () => this.mouse.clicked = true);
        window.addEventListener('mouseup', () => this.mouse.clicked = false);
    }
}
