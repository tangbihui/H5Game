import {Sprite} from "../base/Sprite"
import { DataStore } from "../base/DataStore";
export class StartBtn extends Sprite{
    constructor() {
        const image=Sprite.getImage('startButton');
        super(image,
            0,0,
            image.width,image.height,
            (DataStore.getIntance().canvas.width-image.width)/2,
            (DataStore.getIntance().canvas.height-image.height)/2,
            image.width,image.height
        )
        this.dataStore= DataStore.getIntance()
    }
   draw(){
        this.dataStore.ctx.fillStyle="rgba(0,0,0,.6)";
        this.dataStore.ctx.fillRect(0,0,this.dataStore.canvas.width,this.dataStore.canvas.height);
        super.draw();
   }
}