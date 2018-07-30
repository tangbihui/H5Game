import { DataStore } from "../base/DataStore";

export class Score{
    constructor() {
        this.ctx=DataStore.getIntance().ctx;
        this.scoreNumber=0;
        this.isScore=true;
    }
    draw(){
        this.ctx.font="25px Arial";
        this.ctx.fillStyle="#ffcbeb";
        this.ctx.fillText(
            this.scoreNumber,
            DataStore.getIntance().canvas.width/2,
            DataStore.getIntance().canvas.height/18,
        )
    }
}