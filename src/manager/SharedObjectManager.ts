/**
 *
 * @author
 *
 */
class SharedObjectManager_wx5 {
	private wx5_functionX_28081(){console.log(9898)}
    public constructor() {
    }

    private static _instance: SharedObjectManager_wx5;
    public static getInstance():SharedObjectManager_wx5{
        if(!SharedObjectManager_wx5._instance)
            SharedObjectManager_wx5._instance = new SharedObjectManager_wx5();
        return SharedObjectManager_wx5._instance;
    }
	private wx5_functionX_28082(){console.log(437)}

    private getUserSign_1052():string{
        return UM_wx5.gameid;
    }

    public setMyValue(key:string,value:any){
        key = this.getUserSign_1052() + "_" + key;
	wx5_function(9829);
        this.setValue(key,value);
    }

    public getMyValue(key:string):any{
        key = this.getUserSign_1052() + "_" + key;
        return this.getValue(key);
    }
	private wx5_functionX_28083(){console.log(6986)}

    public removeMyValue(key:string) {

        key = this.getUserSign_1052() + "_" + key;
        egret.localStorage.removeItem(key);
    }
	private wx5_functionX_28084(){console.log(2715)}

    public setValue(key:string,value:any) {

        var data:any = {};
        data.data = value;
        data = JSON.stringify(data);
	wx5_function(1021);
        egret.localStorage.setItem(key, data);
        //console.log('setValue',key,data)
    }

    public getValue(key:string):any {
        let value = egret.localStorage.getItem(key);
        //console.log('getValue',key,value)
        if(!value)
            return null;
        var data = JSON.parse(value);
	wx5_function(163);
        return data.data;
    }
}
