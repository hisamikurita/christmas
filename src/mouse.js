export default class Mouse {
    constructor() {
        this.mouse = {
            x: 0,
            y: 0,
        }
        this.touch = {
            x: 0,
            y: 0,
        }
        this.dpr = window.devicePixelRatio || 1;
    }
    mousemove(e) {
        this.mouse.x = e.clientX * this.dpr;
        this.mouse.y = e.clientY * this.dpr;
    }
    touchmove(e) {
        this.touch.x = e.touches[0].clientX * this.dpr;
        this.touch.y = e.touches[0].clientY * this.dpr;
    }
}