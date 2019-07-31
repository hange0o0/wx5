class PropManager extends egret.EventDispatcher {

    private static _instance:PropManager;

    public static getInstance():PropManager {
        if (!this._instance)
            this._instance = new PropManager();
        return this._instance;
    }


    public constructor() {
        super();
    }


    public baseData = {
        1:{name:'冰冻',des:'使所有单位的移动速度降低$value$%，持续15秒',base:30,add:2,coin:100,coinAdd:100},
        2:{name:'炸弹',des:'点击后消灭$value$范围内的敌人',base:80,add:5,coin:200,coinAdd:200},
        3:{name:'刷子',des:'马上消灭地图上$value$个敌人',base:3,add:1,coin:500,coinAdd:500},
        4:{name:'时间延长',des:'增加每次点击限制时间$value$秒，持续15秒',base:1,add:0.1,coin:100,coinAdd:100},
        5:{name:'护盾',des:'在$value$秒内，即使点错也不会失败',base:5,add:1,coin:300,coinAdd:300},
    }

    public getLevel(id):number{
        if(UM_wx5.isLogin)
            return UM_wx5.propLevel[id] || 1;
        else
            return 1;
    }

    public getUpCost(id){
        var level = this.getLevel(id) - 1;
        var oo = this.baseData[id];
        return oo.coin + oo.coinAdd*level;
    }

    public getPropValue(id,level?:number):number{
        level = (level || this.getLevel(id))-1;
        var oo = this.baseData[id];
        return oo.base + oo.add*level;
    }

    public getDes(id,level?){
        return this.baseData[id].des.replace('$value$',' ' + MyTool.createHtml(MyTool.toFixed(this.getPropValue(id,level),1),0x00ff00) + ' ')
    }

    public upProp(id){
        UM_wx5.addCoin(-this.getUpCost(id));
        UM_wx5.propLevel[id] = this.getLevel(id) + 1;
        EM_wx5.dispatch(GameEvent.client.PROP_CHANGE)
    }

}