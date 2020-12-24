import CheckDevice from './check-device';
import Utils from './utility';
import Mouse from './mouse';
import Particle from './particle';
import MiniParticle from './mini-particle';

(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const particlesArray = [];
    const miniParticlesArray = [];
    const colors = ['#D24136', '#EB8A3E', '#EBB582', '#785A46'];
    let width = window.innerWidth;
    let height = window.innerHeight;

    //リサイズ
    reseize();
    function reseize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.restore();
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
    }

    //リサイズイベント
    window.onresize = () => {
        reseize();
    }

    if (CheckDevice.isSp()) {
        const cursor = new Mouse();
        cursor.touch.x = canvas.width / 2;
        cursor.touch.y = canvas.height / 2;
        window.addEventListener('touchmove', (e) => {
            cursor.touchmove(e);
            //パーティクルインスタンスの作成
            particlesArray.push(new Particle(canvas, ctx, cursor.touch.x, cursor.touch.y, 50, Utils.randomColor(colors)));
            particlesArray.forEach((elm) => {
                elm.shatter = () => {
                    for (let i = 0; i < 1; i++) {
                        miniParticlesArray.push(new MiniParticle(canvas, ctx, elm.x, elm.y, 10, Utils.randomColor(colors)));
                    }
                }
            })
        });
    }
    else {
        //マウスイベント
        const cursor = new Mouse();
        cursor.mouse.x = canvas.width / 2;
        cursor.mouse.y = canvas.height / 2;
        window.addEventListener('mousemove', (e) => {
            cursor.mousemove(e);
            //パーティクルインスタンスの作成
            particlesArray.push(new Particle(canvas, ctx, cursor.mouse.x, cursor.mouse.y, 50, Utils.randomColor(colors)));
            particlesArray.forEach((elm) => {
                elm.shatter = () => {
                    for (let i = 0; i < 1; i++) {
                        miniParticlesArray.push(new MiniParticle(canvas, ctx, elm.x, elm.y, 10, Utils.randomColor(colors)));
                    }
                }
            })
        });
    }

    //再帰呼び出し
    render();
    function render() {
        ctx.fillStyle = '#333333';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            let p = particlesArray[i];
            p.update();
            p.draw();
            if (p.life <= 0) {
                particlesArray.splice(i, 1);
                i += -1;
            }
        }
        for (let i = 0; i < miniParticlesArray.length; i++) {
            let minip = miniParticlesArray[i];
            minip.update();
            minip.draw();
            if (minip.life <= 0) {
                miniParticlesArray.splice(i, 1);
                i += -1;
            }
        }
        requestAnimationFrame(render);
    }
})();