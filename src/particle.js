import Utils from './utility';

export default class Particle {
    constructor(canvas, ctx, x, y, radius, color) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.color = color;
        this.x = x;
        this.y = y;
        this.vx = Utils.randomInt(-12, 12);
        this.vy = -3;
        this.friction = .8;
        this.grav = 1;
        this.maxLife = 80;
        this.life = 80;
        this.radius = radius;
        this.scale = this.life / this.maxLife * this.radius;
        this.type = Math.floor(Math.random() * 7);
        this.opacity = .6;
    }
    draw() {
        this.scale = this.life / this.maxLife * this.radius;
        this.ctx.beginPath();
        switch (this.type) {
            case 0:
                this.ctx.save();
                this.ctx.arc(this.x, this.y, this.scale, 0, Math.PI * 2, false);
                this.ctx.fillStyle = this.color;
                this.ctx.shadowColor = this.color;
                this.ctx.shadowBlur = 30;
                this.ctx.shadowOffsetX = 0;
                this.ctx.shadowOffsetY = 0;
                this.ctx.globalAlpha = this.opacity;
                this.ctx.fill();
                this.ctx.restore();
                break;
            case 1:
                this.ctx.save();
                this.ctx.arc(this.x, this.y, this.scale, 0, Math.PI * 2, false);
                this.ctx.strokeStyle = this.color;
                this.ctx.lineWidth = 5;
                this.ctx.shadowColor = this.color;
                this.ctx.shadowBlur = 30;
                this.ctx.shadowOffsetX = 0;
                this.ctx.shadowOffsetY = 0;
                this.ctx.globalAlpha = this.opacity;
                this.ctx.stroke();
                this.ctx.restore();
                break;
            case 2:
                this.trianglex = 48;
                this.triangley = 80;
                this.ctx.save();
                this.ctx.translate(-this.trianglex / 2, -this.triangley / 2);
                this.ctx.moveTo(this.x, this.y);
                this.ctx.lineTo(this.x - this.trianglex, this.y + this.triangley);
                this.ctx.lineTo(this.x + this.trianglex, this.y + this.triangley);
                this.ctx.lineTo(this.x, this.y);
                this.ctx.fillStyle = this.color;
                this.ctx.shadowColor = this.color;
                this.ctx.shadowBlur = 30;
                this.ctx.shadowOffsetX = 0;
                this.ctx.shadowOffsetY = 0;
                this.ctx.globalAlpha = this.opacity;
                this.ctx.fill();
                this.ctx.restore();
                break;
            case 3:
                this.trianglex = 48;
                this.triangley = 80;
                this.ctx.save();
                this.ctx.translate(-this.trianglex / 2, -this.triangley / 2);
                this.ctx.moveTo(this.x, this.y);
                this.ctx.lineTo(this.x - this.trianglex, this.y + this.triangley);
                this.ctx.lineTo(this.x + this.trianglex, this.y + this.triangley);
                this.ctx.lineTo(this.x, this.y);
                this.ctx.strokeStyle = this.color;
                this.ctx.lineWidth = 5;
                this.ctx.shadowColor = this.color;
                this.ctx.shadowBlur = 30;
                this.ctx.shadowOffsetX = 0;
                this.ctx.shadowOffsetY = 0;
                this.ctx.globalAlpha = this.opacity;
                this.ctx.stroke();
                this.ctx.restore();
                break;
            case 4:
                this.ctx.save();
                function drawStar(context, xCenter, yCenter, nPoints, outerRadius, innerRadius) {
                    for (var ixVertex = 0; ixVertex <= 2 * nPoints; ++ixVertex) {
                        var angle = ixVertex * Math.PI / nPoints - Math.PI / 2;
                        var radius = ixVertex % 2 == 0 ? outerRadius : innerRadius;
                        context.lineTo(xCenter + radius * Math.cos(angle), yCenter + radius * Math.sin(angle));
                    }
                }
                drawStar(this.ctx, this.x, this.y, 5, 60, 25);
                this.ctx.fillStyle = this.color;
                this.ctx.shadowColor = this.color;
                this.ctx.shadowBlur = 30;
                this.ctx.shadowOffsetX = 0;
                this.ctx.shadowOffsetY = 0;
                this.ctx.globalAlpha = this.opacity;
                this.ctx.fill();
                this.ctx.restore();
                break;
            case 5:
                this.rectx = 90;
                this.recty = 90;
                this.ctx.save();
                this.ctx.translate(-this.rectx / 2, -this.recty / 2);
                this.ctx.rect(this.x, this.y, this.rectx, this.recty);
                this.ctx.fillStyle = this.color;
                this.ctx.shadowColor = this.color;
                this.ctx.shadowBlur = 30;
                this.ctx.shadowOffsetX = 0;
                this.ctx.shadowOffsetY = 0;
                this.ctx.globalAlpha = this.opacity;
                this.ctx.fill();
                this.ctx.restore();
                break;
            case 6:
                this.rectx = 90;
                this.recty = 90;
                this.ctx.save();
                this.ctx.translate(-this.rectx / 2, -this.recty / 2);
                this.ctx.rect(this.x, this.y, this.rectx, this.recty);
                this.ctx.strokeStyle = this.color;
                this.ctx.lineWidth = 5;
                this.ctx.shadowColor = this.color;
                this.ctx.shadowBlur = 30;
                this.ctx.shadowOffsetX = 0;
                this.ctx.shadowOffsetY = 0;
                this.ctx.globalAlpha = this.opacity;
                this.ctx.stroke();
                this.ctx.restore();
                break;
        }
        this.ctx.closePath();
    }
    update() {
        if (this.y + this.scale + this.vy > this.canvas.height && (this.type === 0 || this.type === 1)) {
            this.vy = - this.vy * this.friction;
            this.life += -20;
            this.shatter();
        }
        else if (!(this.type === 0 || this.type === 1) && this.y + this.scale + this.vy > this.canvas.height) {
            this.life = 0;
        }
        else {
            this.vy += this.grav;
        }
        this.x += this.vx;
        this.y += this.vy;
    }
    shatter() { };
}