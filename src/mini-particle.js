import Particle from './particle';
import Utils from './utility';

export default class MiniParticle extends Particle {
    constructor(canvas, ctx, x, y, radius, color) {
        super(canvas, ctx, x, y, radius, color);
        this.vx = Utils.randomInt(-5, 5);
        this.vy = Utils.randomInt(-15, 15);
        this.friction = .8;
        this.grav = .1;
        this.life = 100;
        this.opacity = 1;
        this.maxOpacity = 100;
    }
    draw() {
        this.scale = this.life / this.maxLife * this.radius;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.scale, 0, Math.PI * 2, false);
        this.ctx.shadowColor = this.color;
        this.ctx.shadowBlur = 30;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fill()
        this.ctx.closePath();
        this.ctx.restore();
    }
    update() {
        if (this.y + this.radius + this.vy > this.canvas.height) {
            this.vy = - this.vy * this.friction;
        }
        else {
            this.vy += this.grav;
        }
        this.x += this.vx;
        this.y += this.vy;

        this.life += -1;
        this.maxOpacity += -1;
        if (this.opacity >= 0) {
            this.opacity += -1 / this.maxOpacity;
        }
    }
}