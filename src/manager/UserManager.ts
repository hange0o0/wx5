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
    public set needUpUser(v){
        if(!UM_wx5.isLogin)
            return;
        this._needUpUser = v;
        v && egret.callLater(this.localSave,this)
    }
    //
    //
    public nick
    public head
    public gender
    //
    //
    public isLogin = false

    public isTest = true;
    public testVersion = 191223//与服务器相同则为测试版本
    public shareFail;
    //
    public gameid: string = 'null';
    public time = 0;
    public score = 0;
    public dbid: string;
    public playTimes

    public coinTimes
    public coin
    public propLevel;
    public lastTime;


    public loginSuccess = true
    public gameid2: string;//匿名的openid，如果是匿名，gameid与gameid2相同

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
        this.isLogin = true

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
        this.playTimes = data.playTimes || 0;


        this.coin = data.coin || 0;
        this.lastTime = data.lastTime || 0;
        this.coinTimes = data.coinTimes || 0;
        this.propLevel = data.propLevel || {};
        if(!this.lastTime && !this.coin)
            this.coin = 200;


        this.localSave();

        PlayManager.getInstance().resetSpeedRate();
        EM_wx5.dispatchEventWith(GameEvent.client.LOAD_FINISH)
    }

    public renewInfo(userInfo){
        if(!userInfo)
            return;
        this.nick = userInfo.nickName
        this.head = userInfo.avatarUrl
        this.gender = userInfo.gender || 1 //性别 0：未知、1：男、2：女
    }

    public testPassDay(){
        if(!DateUtil_wx5.isSameDay(this.lastTime))
        {
            this.lastTime = TM_wx5.now();
            this.coinTimes = 0;
            this.needUpUser = true
        }
    }

    public addCoin(v,stopSave?){
        if(!v)
            return;
        this.coin += v;
        if(this.coin < 0)
            this.coin = 0;
        if(!stopSave)
            UM_wx5.needUpUser = true;
        EM_wx5.dispatch(GameEvent.client.COIN_CHANGE)
    }

    public getUserInfoZJ(fun,force=false) {
        var tt = window['wx'];
        tt.login({
            force: force,
            success: (res)=> {
                this.loginSuccess = res.code
                console.log(res);
                var url = Config.serverPath + 'getInfo.php'
                Net.getInstance().send(url, res, fun);
            },
            fail(res) {
                console.log(`login调用失败`);
            }
        });
    }

    public getUserInfo(fun?){
        if(Config.isZJ || Config.isQQ)
        {
            this.getUserInfoZJ((data)=>{
                this.gameid = data.data.openid || data.data.anonymous_openid
                this.gameid2 = data.data.anonymous_openid
                this.isTest = data.version == this.testVersion;
                TimeManager_wx5.getInstance().initlogin(data.time)

                Net.getInstance().getServerData((data)=>{
                    console.log(data);
                    if(data.data)
                    {
                        var tempdata = JSON.parse(Base64.decode(data.data.gamedata))
                        if(data.data.sharedata)
                        {
                            var  shareData = JSON.parse(data.data.sharedata)
                            tempdata.shareUser = shareData;
                        }

                        this.fill(tempdata);
                    }
                    else
                    {
                        var initData:any = this.orginUserData();
                        this.fill(initData);
                        Net.getInstance().saveServerData(true);
                    }

                    fun && fun();
                });
                //this.gameid = _get['openid'];
                //this.isFirst = !SharedObjectManager_wx4.getInstance().getMyValue('localSave')
                //this.fill(this.orginUserData_5537());

            })
            return;
        }


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
    }

    private orginUserData(){
         return {
             saveTime:0,
             time:0,
             score:0,
             coin:200,
         };
    }

    public getUpdataData(){
        return {
            time:UM_wx5.time,
            score:UM_wx5.score,
            playTimes:UM_wx5.playTimes,
            coin:UM_wx5.coin,
            coinTimes:UM_wx5.coinTimes,
            lastTime:UM_wx5.lastTime,
            propLevel:UM_wx5.propLevel,
            saveTime:TM_wx5.now(),
        };
    }


    public upDateUserData(){
        if(!this.needUpUser)
            return;
        var wx = window['wx'];
        if(Config.isWX)
        {
            var updateData:any = this.getUpdataData();;
            WXDB.updata('user',updateData)
        }
        else if(Config.isZJ || Config.isQQ)
        {
            Net.getInstance().saveServerData();
        }


        this.needUpUser = false;
        this.localSave();
        //this.upWXData();
    }

    private localSave(){
        if(!UM_wx5.isLogin)
            return;
        SharedObjectManager_wx5.getInstance().setMyValue('localSave',this.getUpdataData())
    }


    public upWXTime(){
        if(!Config.isWX)
            return;
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
        if(!Config.isWX)
            return;
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

    public checkCoin(v){
        if(this.coin < v)
        {
            NotEnoughCoinUI.getInstance().show();
            return false
        }
        return true
    }

}
