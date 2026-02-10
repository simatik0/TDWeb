import { InputHandler } from './InputHandler.js';
import { Planet } from './entities/Planet.js';
import { Shield } from './entities/Shield.js';
import { Enemy } from './entities/Enemy.js';
import { Saucer } from './entities/Saucer.js';
import { Alien } from './entities/Alien.js';
import { Heart } from './entities/Heart.js';
import { GoldenHeart } from './entities/GoldenHeart.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.lastTime = 0;

        this.input = new InputHandler();
        this.gameState = 'MENU'; // MENU, PLAYING, GAMEOVER

        this.planet = new Planet(this.width / 2, this.height / 2, 50, 'blue');
        this.shield = new Shield(this.width / 2, this.height / 2, 100, 'pink');

        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 2000;
        this.enemySpeed = 1.5;
        this.score = 0;
        this.lives = 3;
        this.difficulty = 'EASY';
        this.currentHighScore = 0;

        // Assets
        this.sprites = {
            heart: new Image(),
            goldenHeart: new Image()
        };
        this.sprites.heart.src = 'assets/img/heart.png';
        this.sprites.goldenHeart.src = 'assets/img/golden_heart.png';

        // Sons
        this.sounds = {
            background: new Audio('assets/sounds/background.mp3'),
            smash: new Audio('assets/sounds/meteor-smash.mp3'),
            shield: new Audio('assets/sounds/shield.mp3'),
            healing: new Audio('assets/sounds/healing.mp3'),
            gameover: new Audio('assets/sounds/gameover.mp3')
        };
        this.sounds.background.loop = true;
        this.sounds.background.volume = 0.05;

        // Boutons du Menu
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const btnWidth = 200;
        const btnHeight = 50;

        this.buttons = [
            { text: 'FACILE', color: 'green', x: centerX - 100, y: centerY - 100, width: btnWidth, height: btnHeight, difficulty: 'EASY' },
            { text: 'MOYEN', color: 'orange', x: centerX - 100, y: centerY - 20, width: btnWidth, height: btnHeight, difficulty: 'MEDIUM' }, // Centered-ish
            { text: 'DIFFICILE', color: 'red', x: centerX - 100, y: centerY + 60, width: btnWidth, height: btnHeight, difficulty: 'HARD' }
        ];

        // Boutons Menu In game
        this.menuButton = {
            x: this.width - 100,
            y: 20,
            width: 80,
            height: 30
        };
    }

    start() {
        console.log("Jeu démarré");
        this.gameLoop(0);
    }

    gameLoop(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;

        this.ctx.clearRect(0, 0, this.width, this.height);

        switch (this.gameState) {
            case 'MENU':
                this.updateMenu();
                this.drawMenu();
                break;
            case 'PLAYING':
                this.updatePlaying(deltaTime);
                this.drawPlaying();
                break;
            case 'GAMEOVER':
                this.drawGameOver();
                if (this.input.keys.Enter) {
                    this.resetGame();
                }
                if (this.input.keys.m) {
                    this.gameState = 'MENU';
                    this.resetGame();
                    this.gameState = 'MENU';
                }
                break;
        }

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    setDifficulty(diff) {
        this.difficulty = diff;
        if (diff === 'EASY') {
            this.enemySpeed = 1.5;
            this.enemyInterval = 2000;
        } else if (diff === 'MEDIUM') {
            this.enemySpeed = 2.0;
            this.enemyInterval = 1500;
        } else if (diff === 'HARD') {
            this.enemySpeed = 2.5;
            this.enemyInterval = 1000;
        }
        this.currentHighScore = parseInt(localStorage.getItem(`highScore_${diff}`)) || 0;
    }

    saveScore() {
        if (this.score > this.currentHighScore) {
            this.currentHighScore = this.score;
            localStorage.setItem(`highScore_${this.difficulty}`, this.currentHighScore);
        }
    }

    resetGame() {
        this.enemies = [];
        this.score = 0;
        this.lives = 3;
        this.setDifficulty(this.difficulty);
        this.gameState = 'PLAYING';
        if (this.sounds.background.paused) {
            this.sounds.background.currentTime = 0;
            this.sounds.background.play().catch(() => { });
        }
    }

    updateMenu() {
        if (this.input.mouse.clicked) {
            const mx = this.input.mouse.x;
            const my = this.input.mouse.y;

            this.buttons.forEach(btn => {
                if (mx >= btn.x && mx <= btn.x + btn.width &&
                    my >= btn.y && my <= btn.y + btn.height) {
                    this.setDifficulty(btn.difficulty);
                    this.gameState = 'PLAYING';
                    this.input.mouse.clicked = false;

                    // Lancer la musique si elle n'est pas déjà en cours
                    if (this.sounds.background.paused) {
                        this.sounds.background.play().catch(e => console.warn("Impossible de lancer la musique : ", e));
                    }
                }
            });
        }
    }

    drawMenu() {
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.ctx.font = '40px Arial';
        this.ctx.textAlign = 'center';

        // Titre
        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2 - 120);
        this.ctx.fillText('PROTECT THE PLANET', 0, 0);
        this.ctx.restore();

        // Sous-titre
        this.ctx.font = '20px Arial';
        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2 - 80);
        this.ctx.fillText('Select Difficulty:', 0, 0);
        this.ctx.restore();

        this.buttons.forEach(btn => {
            this.ctx.save();
            this.ctx.translate(btn.x, btn.y);

            this.ctx.fillStyle = btn.color;
            this.ctx.fillRect(0, 0, btn.width, btn.height);

            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(0, 0, btn.width, btn.height);

            this.ctx.fillStyle = 'white';
            this.ctx.font = '24px Arial';
            this.ctx.shadowColor = "black";
            this.ctx.shadowBlur = 3;
            // Texte centré dans le bouton
            this.ctx.fillText(btn.text, btn.width / 2, btn.height / 2 + 8);

            // Afficher le meilleur score (sous le bouton)
            const score = localStorage.getItem(`highScore_${btn.difficulty}`) || 0;
            this.ctx.font = '16px Arial';
            this.ctx.fillText(`Best: ${score}`, btn.width / 2, btn.height + 20);

            this.ctx.shadowBlur = 0;
            this.ctx.restore();
        });

        this.ctx.restore();
    }

    spawnEntity() {
        let rand = Math.random();

        if (this.difficulty === 'EASY') {
            this.enemies.push(new Enemy(this.width, this.height, this.enemySpeed));
        }
        else if (this.difficulty === 'MEDIUM') {
            // 5% Golden Heart, 10% Heart, 20% Saucer, 65% Enemy
            if (rand < 0.05) {
                this.enemies.push(new GoldenHeart(this.width, this.height, this.enemySpeed));
            } else if (rand < 0.15) {
                this.enemies.push(new Heart(this.width, this.height, this.enemySpeed));
            } else if (rand < 0.35) {
                this.enemies.push(new Saucer(this.width, this.height, this.enemySpeed));
            } else {
                this.enemies.push(new Enemy(this.width, this.height, this.enemySpeed));
            }
        }
        else if (this.difficulty === 'HARD') {
            // 5% Golden Heart (only way to heal), 30% Saucer, 20% Alien, 45% Enemy
            if (rand < 0.05) {
                this.enemies.push(new GoldenHeart(this.width, this.height, this.enemySpeed));
            } else if (rand < 0.35) {
                this.enemies.push(new Saucer(this.width, this.height, this.enemySpeed));
            } else if (rand < 0.55) {
                this.enemies.push(new Alien(this.width, this.height, this.enemySpeed));
            } else {
                this.enemies.push(new Enemy(this.width, this.height, this.enemySpeed));
            }
        }
    }

    updatePlaying(deltaTime) {
        // Bouton Menu In game
        if (this.input.mouse.clicked) {
            const mx = this.input.mouse.x;
            const my = this.input.mouse.y;
            if (mx >= this.menuButton.x && mx <= this.menuButton.x + this.menuButton.width &&
                my >= this.menuButton.y && my <= this.menuButton.y + this.menuButton.height) {
                this.resetGame();
                this.gameState = 'MENU';
                this.input.mouse.clicked = false;
                return;
            }
        }

        this.shield.update(this.input);

        if (this.enemyTimer > this.enemyInterval) {
            this.spawnEntity();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }

        this.enemies.forEach(entity => {
            entity.update();
            const dx = entity.x - this.planet.x;
            const dy = entity.y - this.planet.y;
            const distToPlanet = Math.hypot(dx, dy);

            if (distToPlanet < this.planet.radius + entity.radius) {
                entity.markedForDeletion = true;

                if (entity instanceof Heart || entity instanceof GoldenHeart) {
                } else {
                    // C'est un ennemi, on joue le son de crash
                    this.sounds.smash.currentTime = 0;
                    this.sounds.smash.play().catch(() => { });

                    if (entity instanceof Alien) {
                        this.lives -= 2;
                    } else {
                        this.lives--;
                    }
                }

                if (this.lives <= 0) {
                    this.lives = 0;
                    this.saveScore();
                    this.gameState = 'GAMEOVER';
                    this.sounds.background.pause();
                    this.sounds.gameover.currentTime = 0;
                    this.sounds.gameover.play().catch(() => { });
                }
            }

            const shieldRadius = 110;
            const sx = this.planet.x + Math.cos(this.shield.angle) * shieldRadius;
            const sy = this.planet.y + Math.sin(this.shield.angle) * shieldRadius;
            const distToShield = Math.hypot(entity.x - sx, entity.y - sy);

            if (distToShield < entity.radius + 20) {
                entity.markedForDeletion = true;

                if (entity instanceof Heart) {
                    if (this.lives < 5) this.lives++;
                    this.sounds.healing.currentTime = 0;
                    this.sounds.healing.play().catch(() => { });
                } else if (entity instanceof GoldenHeart) {
                    this.lives++;
                    if (this.lives > 5) this.lives = 5;
                    this.sounds.healing.currentTime = 0;
                    this.sounds.healing.play().catch(() => { });
                } else {
                    this.score++;
                    // Play shield sound
                    this.sounds.shield.currentTime = 0;
                    this.sounds.shield.play().catch(() => { });
                }
            }
        });

        this.enemies = this.enemies.filter(e => !e.markedForDeletion);
    }

    drawPlaying() {
        this.ctx.save();

        // Score & Mode
        this.ctx.save();
        this.ctx.translate(20, 50);
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.shadowColor = "black";
        this.ctx.shadowBlur = 5;
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Score: ' + this.score, 0, 0);
        this.ctx.fillText('Mode: ' + this.difficulty, 0, 50);
        this.ctx.shadowBlur = 0;
        this.ctx.restore();

        // Menu Button
        this.ctx.save();
        this.ctx.translate(this.menuButton.x, this.menuButton.y);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.fillRect(0, 0, this.menuButton.width, this.menuButton.height);
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(0, 0, this.menuButton.width, this.menuButton.height);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('MENU', this.menuButton.width / 2, 20);
        this.ctx.restore();

        this.drawLives();
        this.ctx.restore();

        this.planet.draw(this.ctx);
        this.shield.draw(this.ctx);
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
    }

    drawLives() {
        this.ctx.save();
        const startX = 20;
        const startY = 130;
        const size = 30;

        for (let i = 0; i < this.lives; i++) {
            let img = (i >= 3) ? this.sprites.goldenHeart : this.sprites.heart;
            this.ctx.save();
            this.ctx.translate(startX + (i * 35), startY);
            this.ctx.drawImage(img, 0, 0, size, size);
            this.ctx.restore();
        }
        this.ctx.restore();
    }

    drawGameOver() {
        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2);

        this.ctx.fillStyle = 'red';
        this.ctx.font = '40px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', 0, -60);

        this.ctx.fillStyle = 'white';
        this.ctx.fillText('Score: ' + this.score, 0, 0);
        this.ctx.fillText(`High Score (${this.difficulty}): ${this.currentHighScore}`, 0, 40);

        this.ctx.font = '20px Arial';
        this.ctx.fillText('Press Enter to Restart', 0, 100);
        this.ctx.fillText('Press M for Menu', 0, 130);
        this.ctx.restore();
    }
}
