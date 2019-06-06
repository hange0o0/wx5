class UserManager_wx5 {
    public constructor() {

    }

	private wx5_functionX_28127(){console.log(6136)}
    private static _instance: UserManager_wx5;

    public static getInstance():UserManager_wx5{
        if(!UserManager_wx5._instance)
            UserManager_wx5._instance = new UserManager_wx5();
        return UserManager_wx5._instance;
    }
	private wx5_functionX_28128(){console.log(4223)}

    private _needUpUser = false;
    public get needUpUser(){return this._needUpUser}
    public set needUpUser(v){this._needUpUser = v;v && egret.callLater(this.localSave,this)}
    //
    //
    //public nick
    //public head
    //public gender
    //
    //
    public isTest;
    public testVersion = 1//与服务器相同则为测试版本
    public shareFail;
    //
    public gameid: string = 'null';
    public time = 0;
    public score = 0;
    public dbid: string;
    //
    //public coin: number = 999;
    //public level: number = 1;
    //public gunLevel: any = {};
    //public gunPos: any = {};
    //public pastDayCoin
    //public gunPosNum = 3;
    //public endLess = 0;
    //public coinTimes = 0;
    //public helpUser = null;
    //
    //
    //public shareUser = [];//buff玩家的数据   openid:{head,nick,time}
    //public loginTime = 0
    //
    //
    //public isFirst = false
    //public hourEarn = 0;
    //public offlineTime
    //public initDataTime
    //
    //
    //public nextMakeTime = 0//上次免费时间
    //public videoMakeTimes = 0;
    //public makeList = []  //图纸
    //
    //
    //
    //public haveGetUser = false
    public fill(data:any):void{
        var localData = SharedObjectManager_wx5.getInstance().getMyValue('localSave')
        if(localData && localData.saveTime && localData.saveTime - data.saveTime > 10) //本地的数据更新
        {
            //console.log('overwrite')
            for(var s in localData)
            {
                data[s] = localData[s];
            }
        }
        var saveTime = data.saveTime;

        this.dbid = data._id;
        this.time = data.time;
        this.score = data.score;
        this.localSave();
    }
    //
    //public getPassDayCoin(){
    //    return Math.floor(this.level * 5*Math.pow(1.23,this.level/10))*100
    //}
    //
    //public testPassDay(){
    //    if(!DateUtil_wx5.isSameDay(this.pastDayCoin.t))
    //    {
    //        this.pastDayCoin.t = TM_wx5.now();
    //        this.videoMakeTimes = 0;
    //        this.coinTimes = 0;
    //        this.pastDayCoin.coin = this.getPassDayCoin();
    //        this.needUpUser = true
    //    }
    //}
    //
    //public renewInfo(userInfo){
    //    if(!userInfo)
    //        return;
    //    this.haveGetUser = true;
    //    this.nick = userInfo.nickName
    //    this.head = userInfo.avatarUrl
    //    this.gender = userInfo.gender || 1 //性别 0：未知、1：男、2：女
    //    this.testAddInvite();
    //}
    //public addCoin(v,stopSave?){
    //    if(!v)
    //        return;
    //    this.coin += v;
    //    if(this.coin < 0)
    //        this.coin = 0;
    //    if(!stopSave)
    //        UM_wx5.needUpUser = true;
    //    EM_wx5.dispatch(GameEvent.client.COIN_CHANGE)
    //}
    //
    public getUserInfo(fun?){
        var wx = window['wx'];
        if(!wx)
        {
            setTimeout(()=>{
                this.gameid = _get['openid'];
                this.fill(this.orginUserData());
                fun && fun();
            },1000)
            return;
        }
        //wx.login({
        //    success:()=>{
                wx.cloud.callFunction({      //取玩家openID,
                    name: 'getInfo',
                    complete: (res) => {
                        if(!res.result)
                        {
                            MyWindow.Alert('请求用户数据失败，请重新启动',()=>{
                                wx.exitMiniProgram({});
                            })
                            return;
                        }
                        //console.log(res)
                        this.gameid = res.result.openid
                        this.isTest = res.result.testVersion == this.testVersion;
                        this.shareFail = res.result.shareFail;
                        //console.log(11)
                        TimeManager_wx5.getInstance().initlogin(res.result.time)
                        //console.log(res.result.time)
                        this.loginUser(fun)
                    },
                    fail:()=>{
                       MyWindow.Alert('请求用户数据超时，请重新启动',()=>{
                           wx.exitMiniProgram({});
                       })
                    }
                })
        //    }
        //})
    }

    public loginUser(fun?){
        var wx = window['wx'];
        const db = wx.cloud.database();
        db.collection('user').where({     //取玩家数据
            _openid: this.gameid,
        }).get({
            success: (res)=>{
                //console.log(res,res.data.length == 0);
                if(res.data.length == 0)//新用户
                {
                    this.onNewUser(fun)
                    return;
                }
                this.fill(res.data[0]);
                fun && fun();
            }
        })
    }
    //
    //public renewFriendNew(fun)
    //{
    //    if(TM_wx5.now() - this.initDataTime < 5*60)
    //    {
    //        fun && fun();
    //        return;
    //    }
    //    this.initDataTime = TM_wx5.now();
    //    var wx = window['wx'];
    //    if(!wx)
    //    {
    //        fun && fun();
    //        return;
    //    }
    //    const db = wx.cloud.database();
    //    db.collection('user').where({     //取玩家数据
    //        _openid: this.gameid,
    //    }).get({
    //        success: (res)=>{
    //            var data = res.data[0];
    //            this.shareUser = data.shareUser;
    //            fun && fun();
    //        }
    //    })
    //}
    //
    //private testAddInvite(){
    //    if(this.helpUser && this.haveGetUser)
    //    {
    //        var wx = window['wx'];
    //        if(!wx)
    //            return;
    //        wx.cloud.callFunction({      //取玩家openID,
    //            name: 'onShareIn',
    //            data:{
    //                other:this.helpUser,
    //                nick:UM_wx5.nick,
    //                head:UM_wx5.head,
    //            },
    //            complete: (res) => {
    //                console.log(res)
    //                this.helpUser = null;
    //                this.needUpUser = true;
    //            }
    //        })
    //    }
    //}
    //
    //新用户注册
    private onNewUser(fun?){
        //console.log('newUser')
        var wx = window['wx'];
        const db = wx.cloud.database();
        var initData:any = this.orginUserData();
        db.collection('user').add({
            data:initData,
            success: (res)=>{
                initData._id = res._id;
                this.fill(initData);
                fun && fun();
            }
        })
        //
        //this.needUpUser = true;
    }

    private orginUserData(){
         return {
             saveTime:0,
             time:0,
             score:0,

         };
    }

    private getUpdataData(){
        return {
            time:UM_wx5.time,
            score:UM_wx5.score,
            saveTime:TM_wx5.now(),
        };
    }


    public upDateUserData(){
        if(!this.needUpUser)
            return;
        var wx = window['wx'];
        if(wx)
        {
            var updateData:any = this.getUpdataData();;
            WXDB.updata('user',updateData)
        }
        this.needUpUser = false;
        this.localSave();
        //this.upWXData();
    }

    private localSave(){
        SharedObjectManager_wx5.getInstance().setMyValue('localSave',this.getUpdataData())
    }


    public upWXTime(){
        var wx = window['wx'];
        if(!wx)
            return;
        var score = JSON.stringify({"wxgame":{"score":UM_wx5.time,"update_time": TM_wx5.now()}})
        var upList = [{ key: 'endless', value: score}]; //{ key: 'level', value: UM.chapterLevel + ',' + TM.now()},
        wx.setUserCloudStorage({
            KVDataList: upList,
            success: res => {
                console.log(res);
            },
            fail: res => {
                console.log(res);
            }
        });
    }

    public upWXScore(){
        var wx = window['wx'];
        if(!wx)
            return;
        var score = JSON.stringify({"wxgame":{"score":UM_wx5.score,"update_time": TM_wx5.now()}})
        var upList = [{ key: 'endless', value: score}]; //{ key: 'level', value: UM.chapterLevel + ',' + TM.now()},
        wx.setUserCloudStorage({
            KVDataList: upList,
            success: res => {
                console.log(res);
            },
            fail: res => {
                console.log(res);
            }
        });
    }
	private wx5_functionX_28129(){console.log(1895)}


}