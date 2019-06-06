
class PlayManager extends egret.EventDispatcher {

    private static _instance: PlayManager;

    public static getInstance():PlayManager{
        if(!this._instance)
            this._instance = new PlayManager();
        return this._instance;
    }


    public constructor() {
        super();
    }

    public index = 1;
    public adList;
    public gameADList;

    public score = 0
    public lastClick = 0
    public maxCD = 0
    public startTime = 0
    public countDown = 0
    public gameStep = 0
    public isGameOver = true
    public lastAddAD = 0

    public cloudPath = 'cloud://server1-8635ef.7365-server1-8635ef/'
    public myAppID = 'wxe2875716299fa092'

    public getAD(fun?){
        if(this.adList)
        {
            fun && fun();
            return;
        }

        var self = this;
        //var splitList = ['wxd5d9d807682d46bb',"wxf9c8e218c23e2eb7","wxe066524f2972cb1a","wx2f66e2c8de744d53"]
        this.adList = []
        var num = 20
        var wx = window['wx'];
        //console.log(333333)
        if(!wx) {
            var temp = {
                isSelf:true,
                "appid": "wxd5d9d807682d46bb",
                "logo": "skin_btn_png",
                img:'skin_btn_png',
                "desc": "右手油门，左手刹车，做一个平民车神！",
                name:'前方有测速监控'
            }
            this.adList.push(temp)
            this.adList.push(temp)
            this.adList.push(temp)
            this.adList.push(temp)

            //this.adList.push({
            //    isSelf:true,
            //    "appid": "wxf9c8e218c23e2eb7",
            //    "logo": "logo_wx2_png",
            //    img:'ad2_jpg',
            //    "desc": "投注你相中的怪物队伍吧，伯乐！",
            //    name:'怪物斗兽场'
            //})
            //
            //this.adList.push({
            //    isSelf:true,
            //    "appid": "wxe066524f2972cb1a",
            //    "logo": "logo_wx3_png",
            //    img:'ad3_jpg',
            //    "desc": "挖矿，扩张，赏金任务，烧杀抢掠！",
            //    name:'怪物争霸'
            //})
            //
            //this.adList.push({
            //    isSelf:true,
            //    "appid": "wx2f66e2c8de744d53",
            //    "logo": "logo_wx4_png",
            //    img:'ad4_jpg',
            //    "desc": "怪物来袭，且看我上演一出割草无双！",
            //    name:'飞刀大战怪物'
            //})
            fun && fun();
            return;
        }

        wx.wladGetAds(num,function (res) { //第⼀一个参数为获取⼴广告条数，第⼆二个参数为获取成功后回调⽅方法;
            self.adList = self.adList.concat(res.data);
            self.resetAdList();
            fun && fun();
        })

        wx.cloud.downloadFile({
            fileID: self.cloudPath + 'adList.txt',
            success: res => {
                var url =  res.tempFilePath;
                var loader: egret.URLLoader = new egret.URLLoader();
                loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                loader.once(egret.Event.COMPLETE,()=>{
                    var str = loader.data.replace(/\r\n/g,'')
                    var arr = JSON.parse(str);
                    self.resetPath(arr)

                },this);
                loader.load(new egret.URLRequest(url));
            },
            fail: err => {
                console.log(err)
            }
        })
        //var loader = new egret.URLLoader();
        //loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //loader.once(egret.Event.COMPLETE,()=>{
        //    console.log(JSON.parse(loader.data.replace(/\r\n/g,'')));
        //},this);
        //loader.load(new egret.URLRequest('http://172.17.196.195:9034/resource/data/adList.txt'));

        //window['xhtad'].xhtAdsData('fixed').then(ads => {
        //    if(ads)
        //    {
        //        ads.appid = ads.appId;
        //        ads.logo = ads.img;
        //        ads.img = ads.qrImg;
        //        ads.isXiaoHu = true;
        //        self.adList.push(ads)
        //    }
        //})
    }

    //把非自己的去掉
    private resetAdList(){
        var myObj = {};
        for(var i=0;i<this.adList.length;i++)
        {
             if(this.adList[i].isSelf)
             {
                 myObj[this.adList[i].appid] = true;
             }
        }
        for(var i=0;i<this.adList.length;i++)
        {
            if(!this.adList[i].isSelf &&  myObj[this.adList[i].appid])
            {
                this.adList.splice(i,1);
                i--;
            }
        }
    }

    //重置路径
    private resetPath(arr){

        for(var i=0;i<arr.length;i++)
        {
            var oo = arr[i];
            if(oo.appid == this.myAppID)
            {
                arr.splice(i,1);
                i--;
                continue;
            }
            this.resetOne(oo);
        }
    }

    private resetOne(oo){
        var wx = window['wx'];
        var self = this;
        oo.isSelf = true;
        oo.step = 2;
        wx.cloud.downloadFile({
            fileID: this.cloudPath + oo.logo,
            success: res => {
                oo.logo =  res.tempFilePath;
                self.pushADData(oo);
            }
        })

        wx.cloud.downloadFile({
            fileID: this.cloudPath + oo.img,
            success: res => {
                oo.img =  res.tempFilePath;
                self.pushADData(oo);
            }
        })
    }

    private pushADData(oo){
        oo.step --;
        if(!oo.step)
        {
            this.adList.push(oo)
            this.resetAdList();
        }
    }

    public showAD(data){
        var wx = window['wx'];

        if(!wx)
        {
            console.log('click AD')
            PlayManager.getInstance().onGameFinish()
            return;
        }

        //if(data.isXiaoHu)
        //{
        //    window['xhtad'].xhtAdsClick(data.adName)
        //    return;
        //}

        wx.previewImage({
            urls: [data.img],
            success: function () {
                GameManager_wx5.getInstance().changeUserTime = TM_wx5.now();
                GameManager_wx5.getInstance().changeUserID = data.appid;
            }
        })
    }

    public getListByNum(num,fun?){
        if(!this.adList)
            return [];
        var arr = SharedObjectManager_wx5.getInstance().getMyValue('exchangeUserAppid')|| [];
        for(var i=0;i<this.adList.length;i++)
        {
            this.adList[i].temp = arr.indexOf(this.adList[i].appid)

            if(this.adList[i].isSelf)
                this.adList[i].temp2 = 1
            else if(this.adList[i].isXiaoHu)
                this.adList[i].temp2 = 2
            else
                this.adList[i].temp2 = 3
            this.adList[i].fun = fun;
        }
        ArrayUtil_wx5.sortByField(this.adList,['temp','temp2'],[0,0]);
        return this.adList.slice(0,num);
    }

    public randomBG(){
        this.index = Math.ceil(15*Math.random())
    }

    public getBG(){
        return 'bg_'+this.index+'_jpg'
    }

    private resetADList(){
        this.gameADList = this.getListByNum(12);
        ArrayUtil_wx5.random(this.gameADList);
        if(this.gameADList.length > 10)
            this.gameADList.length = 10;
    }

    public initGame(){
        this.resetADList();
        this.score = 0
        this.lastClick = 0
        this.maxCD = 0
        this.startTime = 0
        this.countDown = 10
        this.gameStep = 0
        this.startTime = egret.getTimer();
        this.isGameOver = true
    }
    public startGame(){
        this.startTime = egret.getTimer();
        this.lastClick  = this.startTime
        this.lastAddAD  = this.startTime
        this.maxCD = 3000
        this.countDown = 0
        this.gameStep = 0
        this.isGameOver = false
    }
    public onGameFinish(){
        if(!this.isGameOver)
        {
            this.isGameOver = true
            this.startTime = egret.getTimer() - this.startTime;
            PKResultUI.getInstance().show();
        }

    }
}