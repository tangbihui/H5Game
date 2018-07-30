import { Sprite } from "../base/Sprite"
import { DataStore } from "../base/DataStore"
export class Land extends Sprite {
    constructor() {
        const image = Sprite.getImage('land');
        super(image,
            0, 0,
            image.width, image.height,
            0, DataStore.getIntance().canvas.height - image.height,
            image.width, image.height
        );
        this.landX = 0;
        this.landSpeed = 2;
    }
    draw() {
        this.landX = this.landX + this.landSpeed;
        if (this.landX >= this.image.width - DataStore.getIntance().canvas.width)
            this.landX = 0;
        this.x = -this.landX;
        super.draw()
    }
}