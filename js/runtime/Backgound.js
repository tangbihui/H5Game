import {Sprite} from "../base/Sprite"
import {DataStore} from "../base/DataStore"
export class Background extends Sprite{
    constructor(){
        const image=Sprite.getImage('background');
        const canvas=DataStore.getIntance().canvas
        super(image,
              0,0,
              image.width,image.height,
              0,0,
              canvas.width,canvas.height
            )
    }
}