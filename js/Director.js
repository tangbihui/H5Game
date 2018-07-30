import { DataStore } from "./base/DataStore"
import { UpPencil } from "./runtime/UpPencil";
import { DownPencil } from "./runtime/DownPencil";
export class Director {
    static getInstance() {
        if (!Director.instance)
            Director.instance = new Director();
        return Director.instance;
    }
    constructor() {
        this.dataStore = DataStore.getIntance();
    }
    createPencil() {
        const canvas = this.dataStore.canvas;
        const minTop = canvas.height / 8;
        const maxTop = canvas.height / 3;
        const top = minTop + (maxTop - minTop) * Math.random();
        this.dataStore.get('pencils').push(new UpPencil(top))
        this.dataStore.get('pencils').push(new DownPencil(top))
    }
    birdsEvent() {
        let birds = this.dataStore.get('birds');
        for (let i = 0; i <= 2; i++) {
            birds.y[i] = birds.birdsY[i]
        }
        birds.time=0;
    }
    //检测铅笔和小鸟碰撞
    static isStrike(bird, pencil) {
        let s = false;
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.left > pencil.right ||
            bird.right < pencil.left) {
            s = true;
        }
        return !s;
    }
    //检测碰撞
    check() {
        let pencils = this.dataStore.get('pencils');
        let birds = this.dataStore.get('birds');
        let land = this.dataStore.get('land');
        let score = this.dataStore.get('score');
        //检测小鸟与地板碰撞
        if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            this.isGameOver = true;
            return;
        }
        //检测小鸟与铅笔碰撞
        //小鸟的边框模型
        const birdsBorder = {
            top: birds.y[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };

        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞到水管啦');
                this.isGameOver = true;
                return;
            }
        }
        //加分
        if ((birds.birdsX[0] > pencils[0].x + pencils[0].width) && score.isScore) {
            score.scoreNumber++;
            score.isScore = false;
        }
    }
    run() {
        this.check();
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();
            const pencils = this.dataStore.get('pencils');
            //判断是否删除离开屏幕的铅笔
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length == 4) {
                pencils.shift();
                pencils.shift();
                this.dataStore.get('score').isScore = true;
            }
            //创建一组铅笔
            if (pencils[0].x < (this.dataStore.canvas.width - pencils[0].width) / 2 && pencils.length == 2)
                this.createPencil()
            pencils.forEach(pencil => {
                pencil.draw();
            });
            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();
            this.dataStore.get('score').draw();
            this.dataStore.get('music').playBgMusic();
            let timer = requestAnimationFrame(() => {
                this.run()
            });
            this.dataStore.put('timer', timer);
        }
        else {
            this.dataStore.get('music').pauseBgMusic();
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
            //触发微信小游戏垃圾回收
            wx.triggerGC();
        }
    }
}