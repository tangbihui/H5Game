import {Sprite} from "../base/Sprite"
import { DataStore } from "../base/DataStore";
//小鸟有三张图片
export class Birds extends Sprite{
    constructor() {
        const image=Sprite.getImage('birds');
        super(image,
            0,0,
            image.width,image.height,
            0,0,
            image.width,image.height
        );
        this.clippingX=[
            9,
            9+34+18,
            9+34+18+34+18
        ];
        // 用数组记录小鸟三种状态数据
        this.clippingY=[10,10,10];
        this.clippingWidth=[30,30,30];
        this.clippingHeight=[24,24,24];
        const birdX=DataStore.getIntance().canvas.width/4;
        this.birdsX=[birdX,birdX,birdX];
        const birdY=DataStore.getIntance().canvas.height/2;
        this.birdsY=[birdY,birdY,birdY];
        this.y=[birdY,birdY,birdY];
        this.birdsWidth=[30,30,30];
        this.birdsHeight=[24,24,24];
        this.index=0;
        this.count=0;
        this.time=0;
    }
    draw(){
        const speed=0.2;
        this.count+=speed;
        //定义重力加速度
        const g=0.98/2.4;
        const offsetUp=30;
        //模拟自由落体
        for(let i=0;i<=2;i++){
            this.birdsY[i]=this.y[i]+(g*this.time*(this.time-offsetUp))/2;
        }
        this.time++;
        if(this.index>=2)
            this.count=0;
        this.index=Math.floor(this.count);
        super.draw(
            this.image,
            this.clippingX[this.index],this.clippingY[this.index],
            this.clippingWidth[this.index],this.clippingHeight[this.index],
            this.birdsX[this.index],this.birdsY[this.index],
            this.birdsWidth[this.index],this.birdsHeight[this.index]
        )
    }
}