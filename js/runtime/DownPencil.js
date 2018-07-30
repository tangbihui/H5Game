import {Pencil} from "./Pencil"
import { Sprite } from "../base/Sprite";
import { DataStore } from "../base/DataStore";
export class DownPencil extends Pencil{
    constructor(top){
        const image=Sprite.getImage('pencilDown');
        super(image,top);
    }
    draw(){
        const gap=DataStore.getIntance().canvas.height/4;
        this.y=this.top+gap;
        super.draw()
    }
}