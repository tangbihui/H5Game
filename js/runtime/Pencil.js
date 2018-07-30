import { Sprite } from "../base/Sprite"
import { DataStore } from "../base/DataStore";
export class Pencil extends Sprite {
    constructor(image, top) {
        super(
            image,
            0,0,
            image.width,image.height,
            DataStore.getIntance().canvas.width,0,
            image.width,image.height
        );
        this.top = top;
        this.moveSpeed = 2;
    }
    draw() {
        this.x = this.x - this.moveSpeed;
        super.draw();
    }
}