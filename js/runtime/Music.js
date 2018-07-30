export class Music{
    constructor(){
        this.bgm = wx.createInnerAudioContext();
        this.bgm.loop = true;
        this.bgm.obeyMuteSwitch = false;
        this.bgm.src = 'audio/bgm.mp3';
    }
    playBgMusic(){
        this.bgm.play()
    }
    pauseBgMusic(){
        this.bgm.stop();
    }
}