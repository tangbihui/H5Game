//各精灵的基类
import { DataStore } from "./DataStore"
export class Sprite {
    constructor(
        image = null,
        srcX = 0,
        srcY = 0,
        srcWidth = 0,
        srcHeight = 0,
        x = 0,
        y = 0,
        width = 0,
        height = 0
    ) {
        this.ctx=DataStore.getIntance().ctx;
        this.image = image;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcWidth = srcWidth;
        this.srcHeight = srcHeight;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    static getImage(key) {
        return DataStore.getIntance().res.get(key);
    }
    draw(
        image = this.image,
        srcX = this.srcX,
        srcY = this.srcY,
        srcWidth = this.srcWidth,
        srcHeight = this.srcHeight,
        x = this.x,
        y = this.y,
        width = this.width,
        height = this.height
    ) {
        this.ctx.drawImage(
            image,
            srcX,srcY,
            srcWidth,srcHeight,
            x,y,
            width,height
        )
    }
}