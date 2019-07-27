
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

    public extraData;//外部带入的数据
    public finishExtraUin = -1//已完成的Uin
    public alertUin = -1//已完成的Uin

    public index = 1;
    public adList;
    public gameADList;

    public score = 0
    public lastClick = 0
    public maxCD = 0
    public startTime = 0
    public dieTime = 0
    public dieTimes = 0
    public countDown = 0
    public gameStep = 0
    public isGameOver = true
    public lastAddAD = 0

    public cloudPath = 'cloud://server1-8635ef.7365-server1-8635ef/'
    public myAppID = 'wxe2875716299fa092'


    private nameArr = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵舒汪祁'.split('')
    private jobArr = '时装设计,健身教练,教师,记者,演员,厨师,医生,护士,司机,军人,律师,商人,会计,出纳,作家,导游,模特,警察,歌手,画家,裁缝,翻译,法官,消防员,魔术师,救生员,运动员,工程师,飞行员,经纪人,审计员,漫画家,主持人,调酒师,化妆师,艺术家,甜品师,赛车手,律师,兽医,程序员,诗人,学生,幼教'.split(',')
    private likeArr = '唱歌,跳舞,篮球,足球,保龄球,高尔夫球,瑜伽,武术,演讲,手工,画画,写歌,作曲,表演,乒乓球,台球,羽毛球,排球,书法,阅读,写作,摄影,旅游,购物,志愿者,讲笑话,cosplay,电影,玩游戏,剪纸,收藏,购物,逛街,跑步,健身,围棋,象棋,飞行棋,斗兽棋,五子棋,斗地主,赛车,网球,设计,拼图,京剧,遛狗,攀岩,跑酷,潜水,轮滑,滑板,街舞,滑雪,登山,单车攀爬,美术,朗诵,英语,游泳,听音乐,钢琴,魔术,魔方,射击,桌球,桌游,跆拳道,美食,编程,骑马,弹琴,插花,乐高,雕刻,集邮,烘焙,架子鼓,吉他'.split(',')
    public heroList = [];


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

    public showAD(data,finishFun?){
        var wx = window['wx'];

        if(!wx)
        {
            console.log('click AD')
            finishFun && finishFun();
            //PlayManager.getInstance().onGameFinish()
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
                GameManager_wx5.getInstance().changeUserFun = finishFun;
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
        if(UM_wx5.isTest)
        {
            this.gameADList = this.getListByNum(12);
            ArrayUtil_wx5.random(this.gameADList);
            if(this.gameADList.length > 10)
                this.gameADList.length = 10;
        }
        else
        {
            ArrayUtil_wx5.random(this.heroList)
            this.gameADList = this.heroList.slice(0,10)
        }
    }

    public initGame(){
        this.resetADList();
        this.score = 0
        this.lastClick = 0
        this.maxCD = 0
        this.startTime = 0
        this.countDown = 10
        this.gameStep = 0
        this.dieTime = 0
        this.dieTimes = 0
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
        UM_wx5.playTimes ++;
        this.sendGameStart(UM_wx5.playTimes)
    }
    public onGameFinish(){
        if(!this.isGameOver)
        {
            this.isGameOver = true
            this.startTime = egret.getTimer() - this.startTime;
            PKResultUI.getInstance().show();
        }
    }

    public onDie(data?){
        this.dieTime = egret.getTimer();

        if(this.dieTimes < Math.ceil((egret.getTimer() - this.startTime)/30000))
        {
            this.dieTimes ++
            RebornUI.getInstance().show()
        }
        else
        {
            this.onGameFinish();
        }
        //ADShowUI.getInstance().show(data)
    }

    public onReborn(){
        this.startTime += egret.getTimer() - this.dieTime;
        this.maxCD = 10000
        this.lastClick = egret.getTimer();
        this.dieTime = 0
        this.sendGameReborn(Math.floor((egret.getTimer() - this.startTime)/1000));
    }

    public initExtra(data){
        this.extraData = null;
        if(!data || !data.referrerInfo || !data.referrerInfo.extraData || !data.referrerInfo.extraData.appid)
        {
            return;
        }
        if(this.finishExtraUin != data.referrerInfo.extraData.uin)
        {
            this.extraData = data.referrerInfo.extraData
        }
    }

    //前往WX5
    public onExtraSuccess(){
        var wx = window['wx'];
        if(!wx)
        {
            return;
        }

        var self = this;
        var oo = ObjectUtil_wx5.clone(this.extraData)
        oo.appid = 'wxe2875716299fa092'//我的APPID
        oo.uin = Math.floor(Math.random()*1000000000000000);//唯一Key
        wx.navigateToMiniProgram({
            appId: this.extraData.appid,//进入的APPID
            envVersion:'trial',
            extraData:oo,
            success(res) {
                self.finishExtraUin = self.extraData.uin
                self.extraData = null;
                // 打开成功
            }
        })
    }

    public testShowExtra(){
        var extraData = PlayManager.getInstance().extraData
        if(extraData && extraData.uin != PlayManager.getInstance().alertUin)
        {
            var str = '接收到其它小游戏的任务：\n'
            if(extraData.key == 'cd')
                str += '坚持 ' + extraData.value + ' 秒';
            else
                str += '获得 ' + extraData.value + ' 分';
            MyWindow.Alert(str,()=>{
                PKResultUI.getInstance().hide();
                PKUI.getInstance().hide();
            },'开始游戏').showCenter()
            PlayManager.getInstance().alertUin = extraData.uin;
        }

    }

    public sendKey
    public sendKeyName
    public sendGameStart(key){
        var wx = window['wx']
        if(!wx)
            return;
        this.sendKey = key
        this.sendKeyName = '第'+key+'次玩'
        wx.aldStage.onStart({
            stageId : this.sendKey, //关卡ID， 必须是1 || 2 || 1.1 || 12.2 格式  该字段必传
            stageName : this.sendKeyName,//关卡名称，该字段必传
            userId  : UM_wx5.gameid//用户ID
        })
    }

    public sendGameReborn(time){
        var wx = window['wx']
        if(!wx)
            return;
        wx.aldStage.onRunning({
            stageId : this.sendKey,    //关卡ID 该字段必传
            stageName : this.sendKeyName, //关卡名称  该字段必传
            userId : UM_wx5.gameid,//用户ID
            event : "revive",  //支付成功 关卡进行中，用户触发的操作    该字段必传
            params : {    //参数
                itemName : time,  //购买商品名称  该字段必传
            }
        })
    }


    public sendGameEnd(success?,info?){
        var wx = window['wx']
        if(!wx)
            return;
        wx.aldStage.onEnd({
            stageId : this.sendKey,    //关卡ID 该字段必传
            stageName : this.sendKeyName, //关卡名称  该字段必传
            userId : UM_wx5.gameid,  //用户ID 可选
            event :success?"complete":"fail",   //关卡完成  关卡进行中，用户触发的操作    该字段必传
            params : {
                desc :info   //描述
            }
        })
    }




    public initADObj(){
        for(var i=1;i<=50;i++)
        {
            var name = ArrayUtil_wx5.randomOne(this.nameArr)  + 'X' + (Math.random()>0.5?'':'X')
            if(i<=15)
                var age = Math.floor(Math.random()*8) + 20;
            else
                var age = Math.floor(Math.random()*5) + 20;
            var job = ArrayUtil_wx5.randomOne(this.jobArr)
            var like = this.likeArr.concat();
            ArrayUtil_wx5.random(like,5);
            like.length = Math.floor(Math.random()*3) + 1
            this.heroList.push( {
                isHero:true,
                logo:'head_'+i+'_png',//i + '',
                name:name,
                desc: age + '岁， 职业：' + job + '， 兴趣：' +  like.join('、')
            })
        }
    }


}