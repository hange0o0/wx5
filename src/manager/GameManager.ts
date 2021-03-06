class GameManager_wx5 {
    private static _instance:GameManager_wx5;
    public static getInstance():GameManager_wx5 {
        if (!this._instance)
            this._instance = new GameManager_wx5();
        return this._instance;
    }
	private wx5_functionX_28089(){console.log(888)}

    private timeID: egret.Timer;
    private timeE = new MyTimer(1000/30);
    private lastTime: number;
    public lastTouchTime: number;
    public lastTouchMC;
	private wx5_functionX_28090(){console.log(1949)}
    public changeUserTime = 0
    public changeUserID = 0
    public changeUserFun;

    public isActive = true;
    public onShowFun
	private wx5_functionX_28091(){console.log(153)}
    public shareFailTime = 0;
	public constructor() {
        this.timeID = new egret.Timer(1000);
        this.timeID.addEventListener(egret.TimerEvent.TIMER,this.timerun_4721,this);
        this.timeID.start();

	wx5_function(8601);
        this.timeE.addEventListener(egret.TimerEvent.TIMER,this.onTimeE_3119,this);
        this.timeE.start();
	}
	
    public static stage:egret.Stage;
    public static stageX;
	private wx5_functionX_28092(){console.log(6405)}
    public static stageY;
    public static container:egret.DisplayObjectContainer;
    public static loadStep


    public static isLiuHai(){
        return this.stage.stageHeight > 1250;
    }
	private wx5_functionX_28093(){console.log(6407)}
    public static paddingTop(){
        return GameManager_wx5.isLiuHai()?50:0
    }
    public static paddingBottom(){
        if(App.isIphoneX)
            return 30;
        return 0;
    }
	private wx5_functionX_28094(){console.log(1781)}

    public static get uiHeight(){
        var h = this.stage.stageHeight// - Config.adHeight;

        if(this.isLiuHai())
        {
            if(App.isIphoneX)
                return h-this.paddingTop()-30;
            return h-this.paddingTop();
        }
        return h//Math.min(1136,this.stage.stageHeight);
        //return this.stage.stageHeight;
    }
	private wx5_functionX_28095(){console.log(842)}
    public static get uiWidth(){
        return this.stage.stageWidth;
    }

    public isWebGL(){
        return egret.Capabilities.renderMode == 'webgl';
    }
	private wx5_functionX_28096(){console.log(3413)}

    public init(){
        GameManager_wx5.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove_2696,this);
        GameManager_wx5.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin_599,this);
        this.createAD();
    }

    public cleanAllTest(){
        this.testHideArr.length = 0
        this.testShowArr.length = 0
    }

    public addTestHide(fun){
        this.testHideArr.push(fun);
    }
    public addTestShow(fun){
        this.testShowArr.push(fun);
    }

    private testHideArr = []
    private testShowArr = []
    public testHide(res){
        while(this.testHideArr[0])
        {
            this.testHideArr.shift()(res);
        }
    }

    public testShow(res){
        while(this.testShowArr[0])
        {
            this.testShowArr.shift()(res);
        }
    }

	private wx5_functionX_28097(){console.log(4913)}
    public addJoinAppid(appid){
        var arr = SharedObjectManager_wx5.getInstance().getMyValue('exchangeUserAppid')|| [];
        var index = arr.indexOf(appid)
        if(index != -1)
            arr.splice(index,1);
        arr.push(appid)
        while(arr.length > 30)
            arr.shift()
        SharedObjectManager_wx5.getInstance().setMyValue('exchangeUserAppid',arr)
    }
	private wx5_functionX_28098(){console.log(4156)}

    ////////////////////////////////banner///////////////////
    public bannerAD
    //public bannerBG
    public insertAD
    public callADBottom
    public isCallADHide
    public createAD(){
        //Config.adHeight = 200;
        if(!window['wx'])
            return;
        if(!Config.wx_ad)
            return;
        if(GameManager_wx5.stage.stageHeight < 1080)
            return;
        var wx = window['wx']

        if(!wx.createBannerAd)
            return;


        var btnw = Math.min(Math.pow(GameManager_wx5.stage.stageHeight/1330,1.6)*640,640)

        let scalex = screen.availWidth/640;
        let scaley = screen.availHeight/GameManager_wx5.stage.stageHeight;
        if(btnw * scalex < 300){ //微信限制广告宽度不能小于300
            btnw = 300 / scalex;
        }
        var  btny = GameManager_wx5.uiHeight;//给广告留的高度

        if(Config.isZJ){//字节广告限制了宽度为 128-208
            if(btnw * scalex > 208) btnw = 208 / scalex;
            else if(btnw * scalex < 128) btnw = 128 / scalex;
            //btny = GameManager_wx5.uiHeight - Math.min(btnw * 9/16, 224);//给广告留的高度(因为界面留空是按微信224留的空，不是取的实际广告高度，故这里要取最大224避免广告遮住上方的内容)
        }

        Config.adHeight =  btnw/640 * 224;

        var  paddingTop = GameManager_wx5.paddingTop();
        var btnx =  (640-btnw)/2;

        let left = scalex * (btnx);
        let top = scaley * (btny + paddingTop);
        let width = scalex * btnw;

        let bannerAd = this.bannerAD = wx.createBannerAd({
            adUnitId: Config.wx_ad,
            style: {
                left: left,
                top: top,
                width: width
            }
        })
        bannerAd.onError(()=>{
            Config.adHeight = 0
            GameManager_wx5.stage.dispatchEventWith(egret.Event.RESIZE);
        })
        bannerAd.onLoad(()=>{
            if(this.isCallADHide)
            {
                bannerAd.hide();
                this.isCallADHide = false;
            }
        })
        bannerAd.onResize((res)=>{
            var btnw = res.width/scalex;
            var btnx =  (640-btnw)/2;
            bannerAd.style.left = scalex * (btnx);


            var hh = res.height/scalex*(640/btnw);
            //if(Math.abs(hh - 224)/224 > 0.02)
            //{
            Config.adHeight =  btnw/640 * hh;
            console.log(res,btnw,Config.adHeight )
            GameManager_wx5.stage.dispatchEventWith(egret.Event.RESIZE);
            //bannerAd.style.top = scaley * (GameManager_wx5.uiHeight + paddingTop);

            this.bannerAD.style.top = scaley * (GameManager_wx5.uiHeight + paddingTop - (this.callADBottom || 0) - GameManager_wx5.paddingBottom() - Config.adHeight);
            //}

            if(this.isCallADHide)
            {
                bannerAd.hide();
                this.isCallADHide = false;
            }
            //

            //console.log(res,scalex,scaley,GameManager.stage.stageHeight)
        })
        this.isCallADHide = true;
        bannerAd.show()



        if (wx.createInterstitialAd && Config.wx_insert){
            this.insertAD = wx.createInterstitialAd({
                adUnitId: Config.wx_insert
            })
        }
    }


    //显示插屏广告
    public showInsert(){
        if(!this.insertAD)
            return;

        this.insertAD.show().catch((err) => {
            console.error(err)
        })
    }

    public showBanner(bottom){
        if(this.bannerAD)
        {
            this.isCallADHide = false;
            //if(!this.bannerBG)
            //{
            //    this.bannerBG = new eui.Image('black_bg_alpha_png')
            //    this.bannerBG.width = 640;
            //    this.bannerBG.height = Config.adHeight;
            //}
            //GameManager_wx5.container.addChild(this.bannerBG)
            //this.bannerBG.bottom = bottom;
            this.bannerAD.show()
            var scaley = screen.availHeight/GameManager_wx5.stage.stageHeight;
            var  paddingTop = GameManager_wx5.paddingTop();
            this.bannerAD.style.top = scaley * (GameManager_wx5.uiHeight + paddingTop - bottom - GameManager_wx5.paddingBottom() - Config.adHeight);
            this.callADBottom = bottom
        }
    }

    public hideBanner(){
        if(this.bannerAD)
            this.bannerAD.hide();
        //MyTool.removeMC(this.bannerBG)
    }

    public stopTimer(){
        this.timeID.stop();
        this.timeE.stop();
    }
	private wx5_functionX_28100(){console.log(4563)}


    private onTimeE_3119(){
        EM_wx5.dispatch(GameEvent.client.timerE);
    }

	private wx5_functionX_28101(){console.log(4477)}

    private onTouchMove_2696(e){
        GameManager_wx5.stageX = e.stageX;
        GameManager_wx5.stageY = e.stageY;
    }
    private onTouchBegin_599(e){
        this.lastTouchMC = e.target;
	wx5_function(2753);
        GameManager_wx5.stageX = e.stageX;
        GameManager_wx5.stageY = e.stageY;
        this.lastTouchTime = egret.getTimer();
    }


	private wx5_functionX_28102(){console.log(530)}
    private timerun_4721(): void {
        if(!UM_wx5.gameid)
            return;
        var now = TM_wx5.now();
        if(!this.lastTime) {
            this.lastTime = now;
	wx5_function(6665);
            return;
        }
        if(!DateUtil_wx5.isSameDay(this.lastTime,now))//跨0点
        {
            //TeamPVEManager.getInstance().passDay();
            //DayGameManager.getInstance().passDay();
            //GuessManager.getInstance().passDay();

            UM_wx5.testPassDay();
	wx5_function(4869);
            EM_wx5.dispatch(GameEvent.client.pass_day);
        }

        EM_wx5.dispatch(GameEvent.client.timer);

        //if(UM.friendtime == 0){  //拿过日志了
        //    if(now%30 == 0) //5分钟请求一次
        //    {
        //        FriendManager.getInstance().getLog(null,null,false);
        //    }
        //}
        this.lastTime = now
        //if(SyncDataManager.getInstance().lastConnectTime && now - SyncDataManager.getInstance().lastConnectTime > 3600) //超过1小时要重新登录
        //{
        //    MyWindow.AlertRelogin('已经离开很长时间了，请重新登陆吧')
        //}
    }
	private wx5_functionX_28103(){console.log(9502)}

    //取现在到晚上12点还差的时间
    public getZeroCD(){
        return this.getZeroTime() - TM_wx5.now();
    }
    public getZeroTime(){
        var d= DateUtil_wx5.timeToChineseDate(TM_wx5.now());
	wx5_function(1993);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        d.setHours(24);

        return Math.floor(d.getTime()/1000);
    }
	private wx5_functionX_28104(){console.log(8492)}

}


class App {
    public static touchEvent: string = egret.TouchEvent.TOUCH_TAP;
	private wx5_functionX_28105(){console.log(1214)}
    
    public constructor() {
    }

    public static get isIphoneX():boolean{
        let hh = screen.height, ww = screen.width;
        if(window['wx']){
            hh = screen.availHeight, ww = screen.availWidth;
        }
        let _iphoneX = /iphone/gi.test(navigator.userAgent) && (hh == 812 && ww == 375);
        let _iphoneXR = /iphone/gi.test(navigator.userAgent) && (hh == 896 && ww == 414);
        return _iphoneX || _iphoneXR;
    }
	private wx5_functionX_28106(){console.log(7286)}
    	
    public static get isMobile():boolean{
        return egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE;
    }
    public static get isAndroid():boolean{
        //var Agents:string[] = ["Android", "iPhone",  "SymbianOS", "Windows Phone",  "iPad", "iPod"];
        var ua:string = navigator.userAgent.toLowerCase();
        return ua.indexOf('android') != -1;
    }
	private wx5_functionX_28107(){console.log(8827)}
    public static get isIOS():boolean{
        //var Agents:string[] = ["Android", "iPhone",  "SymbianOS", "Windows Phone",  "iPad", "iPod"];
        var ua:string = navigator.userAgent.toLowerCase();
        return /ip(ad|hone|od)/.test(ua);
    }
}
//#stop_wx_change#//
function wx5_function(v){}
function sendClientError(str){
    //var url =  'http://172.17.196.195:90/error_wx2/log_error.php'
    //if(window["wx"])
    var url =  'https://www.hangegame.com/error_wx5/log_error.php'
    Net.getInstance().send(url,{str:str});
}

function sendFeedBack(str){
    try{
        str =  UM_wx5.gameid + "--" + str
    }catch(e){}
    var url =  'https://www.hangegame.com/error_wx5/log_feedback.php'
    Net.getInstance().send(url,{str:str});
}

//window.onerror=handleErr;


if(window["wx"])
{
    //window["TeamUI"] = TeamUI;
    //window["BottomUI"] = BottomUI;
    //window["TopUI"] = TopUI
    //window["ChangeUserUI"] = ChangeUserUI
    window["sendClientError"] = sendClientError
    window["GameManager_wx5"] = GameManager_wx5
    window["BasePanel"] = BasePanel
    window["PKItem2"] = PKItem2
    window["PKUI"] = PKUI


    var wx =  window["wx"];

    wx.onError(function(res){
        UM_wx5 && UM_wx5.upDateUserData();
        try{
            var str = "onError:" + ("openid:" + UM_wx5.gameid + "--") + res.message + "--" + res.stack;
            sendClientError(str);
        }catch(e){}
    });

    wx.onHide(function(res){
        console.log(res)
        if(!GameManager_wx5.stage)
            return;
        GameManager_wx5.getInstance().testHide(res)
        UM_wx5 && UM_wx5.upDateUserData();
        SoundManager.getInstance().stopBgSound();
        GameManager_wx5.getInstance().isActive = false;
        //GameManager.stage.dispatchEventWith(egret.Event.DEACTIVATE);
        EM_wx5.dispatch(egret.Event.DEACTIVATE)
        console.log('hide')
        if(!PlayManager.getInstance().dieTime)
        {
            PlayManager.getInstance().onGameFinish()
        }

        //GameUI.getInstance().cleanTouch();
    });

    wx.onShow(function(res){
        console.log(res)
        if(!GameManager_wx5.stage)
            return;
        GameManager_wx5.getInstance().testShow(res)
        SoundManager.getInstance().playSound('bg');
        GameManager_wx5.getInstance().isActive = true;
        //GameManager.stage.dispatchEventWith(egret.Event.ACTIVATE);
        EM_wx5.dispatch(egret.Event.ACTIVATE)

        if(GameManager_wx5.getInstance().changeUserTime)
        {
            if(TM_wx5.now() - GameManager_wx5.getInstance().changeUserTime > 20) //停留超过30秒
            {
                var arr = SharedObjectManager_wx5.getInstance().getMyValue('exchangeUserAppid')|| [];
                arr.unshift(GameManager_wx5.getInstance().changeUserID)
                if(arr.length > 20)
                    arr.length = 20;
                if(GameManager_wx5.getInstance().changeUserFun)
                    GameManager_wx5.getInstance().changeUserFun();
            }
            GameManager_wx5.getInstance().changeUserTime = 0;
            GameManager_wx5.getInstance().changeUserFun = null;
        }


        //GameUI.getInstance().cleanTouch();
        console.log('show')
        PlayManager.getInstance().initExtra(res)
        PlayManager.getInstance().testShowExtra();
    });
    //wx.exitMiniProgram(function(res){
    //    if(!GameManager.stage)
    //        return;
    //    PKManager.getInstance().upDateUserData();
    //});

    wx.onShareAppMessage(() => ({
        title: '这个游戏很好玩，推荐一下',
        imageUrl: Config.localResRoot + "share_img_2.jpg"
    }))

    if(wx.getUpdateManager){ //1.9.90以上版本支持
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            //console.log(res.hasUpdate)
            if(res.hasUpdate){
                wx.showToast({icon:"none", title:"有新版本，正在下载中..", duration: 600000});//10分钟
                window["clearTempCache"] && window["clearTempCache"]();
            }
        })
        updateManager.onUpdateReady(function () {
            wx.hideToast();
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，请点击确定重启应用',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })

        })
        updateManager.onUpdateFailed(function () {
            wx.hideToast();
            wx.showModal({
                title: '更新提示',
                content: '新版本下载失败，点击确定重试哦',
                showCancel: false,
                success: function (res) {
                    updateManager.applyUpdate()
                }
            })
        })
    }


    window["wx"].setKeepScreenOn && window["wx"].setKeepScreenOn({keepScreenOn:true});//屏幕常亮

    Config.isDebug = false;
}
