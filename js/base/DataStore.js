//管理各类需要的数据，采用单例模式
export class DataStore{
    static getIntance(){
        if(!DataStore.instance){
            DataStore.instance=new DataStore();
        }
        return DataStore.instance;
    }
    constructor(){
        this.map=new Map();
    }
    //存储数据
    put(key,value){
        if(typeof value==='function')
            value=new value()
        this.map.set(key,value);
        //返回this,用于链式操作
        return this;
    }
    //获取数据
    get(key){
        return this.map.get(key);
    }
    //清空销毁数据
    destroy(){
        for(let value of this.map.values())
            value=null;
    }
}