import { ResourceLoader } from "./base/ResourceLoader"
import { DataStore } from "./base/DataStore"
import { Background } from "./runtime/Backgound"
import { Land } from "./runtime/Land"
import { Birds } from "./player/Birds"
import { Score } from "./player/Score"
import { StartBtn } from "./player/StartBtn"
import { Director } from "./Director"
import {Music} from "./runtime/Music";
export class Main {
  constructor() {
    this.resourceLoader = ResourceLoader.getIntance();
    this.dataStore=DataStore.getIntance();
    this.director=Director.getInstance();
    this.resourceLoader.onLoaded(map => { this.firstLoadResource(map) });
  }
  
  //资源加载完成
  firstLoadResource(map) {
    this.dataStore.canvas=canvas;
    this.dataStore.ctx=canvas.getContext('2d');
    this.dataStore.res=map;
    this.dataStore.put('music',Music);
    this.init();
  }
  //初始化各类精灵，注册全局事件
  init(){
      this.director.isGameOver=false;
      this.dataStore.put('background',Background)
      .put('land',Land)
      .put('pencils',[])
      .put('birds',Birds)
      .put('score',Score)
      .put('startButton',StartBtn);
      //注册touchstart事件
      this.bindEvent();
      this.director.createPencil();
      this.director.run();
  }
  bindEvent(){
    wx.onTouchStart((e)=> {
        if(this.director.isGameOver){
          let touchX=e.touches[0].clientX;
          let touchY=e.touches[0].clientY;
          const startButton=this.dataStore.get('startButton');
          if(touchX>startButton.x &&
            touchX<startButton.x+startButton.width&&
            touchY>startButton.y&&
            touchY<startButton.y+startButton.height
          )
          this.init();
        }
        else{
          this.director.birdsEvent();
        }
      }
    );
  }
}