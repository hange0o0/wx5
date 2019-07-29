class GameUI extends game.BaseUI_wx5 {

    private static _instance: GameUI;
    public static getInstance(): GameUI {
        if(!this._instance)
            this._instance = new GameUI();
        return this._instance;
    }


    private bg: eui.Image;
    private startBtn: eui.Button;
    private barMC: eui.Image;
    private con: eui.Group;
    private ad1: eui.Image;
    private ad2: eui.Image;
    private prop1: eui.Group;
    private red1: eui.Image;
    private lvText1: eui.Label;
    private prop2: eui.Group;
    private red2: eui.Image;
    private lvText2: eui.Label;
    private prop3: eui.Group;
    private red3: eui.Image;
    private lvText3: eui.Label;
    private prop4: eui.Group;
    private red4: eui.Image;
    private lvText4: eui.Label;
    private prop5: eui.Group;
    private red5: eui.Image;
    private lvText5: eui.Label;
    private coinText: eui.Label;
    private soundBtn: eui.Image;
    private rankBtn: eui.Image;
    private feedBackBtn: eui.Image;







    public itemArr = []
    public constructor() {
        super();
        this.skinName = "GameUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.startBtn,()=>{
             if(UM_wx5.isTest && PlayManager.getInstance().adList.length == 0)
             {
                 MyWindow.ShowTips('正在组装敌人，请稍后')
                 return;
             }
             PKUI.getInstance().show();
        })

        this.addBtnEvent(this.ad1,()=>{
            PlayManager.getInstance().showAD(this.ad1['adData'])
        })
        this.addBtnEvent(this.ad2,()=>{
            PlayManager.getInstance().showAD(this.ad2['adData'])
        })

        this.addBtnEvent(this.rankBtn,()=>{
            RankUI.getInstance().show();
        },this)

        this.addBtnEvent(this.feedBackBtn,()=>{
            FeedBackUI.getInstance().show();
        },this)


        this.addBtnEvent(this.prop1,()=>{
            PropInfoUI.getInstance().show(1);
        },this)
        this.addBtnEvent(this.prop2,()=>{
            PropInfoUI.getInstance().show(2);
        },this)
        this.addBtnEvent(this.prop3,()=>{
            PropInfoUI.getInstance().show(3);
        },this)
        this.addBtnEvent(this.prop4,()=>{
            PropInfoUI.getInstance().show(4);
        },this)
        this.addBtnEvent(this.prop5,()=>{
            PropInfoUI.getInstance().show(5);
        },this)


        this.addBtnEvent(this.soundBtn,()=>{
            SoundManager.getInstance().soundPlaying = !SoundManager.getInstance().soundPlaying
            SoundManager.getInstance().bgPlaying = !SoundManager.getInstance().bgPlaying
            this.renewSound();
        },this,true)

        MyTool.addLongTouch(this.startBtn,()=>{
            if(egret.getTimer() - DebugUI.getInstance().debugTimer < 3000)
            {
                MyWindow.ShowTips('你作弊！')
                DebugUI.getInstance().debugOpen = true
            }
        },this)

        MyTool.addLongTouch(this.soundBtn,()=>{
            if(DEBUG)
            {
                DebugUI.getInstance().show();
                return;
            }
            if(DebugUI.getInstance().debugOpen && !SoundManager.getInstance().soundPlaying)
            {
                DebugUI.getInstance().show();
            }
        },this)
    }

    private renewSound(){
        this.soundBtn.source = SoundManager.getInstance().bgPlaying?'sound_btn1_png':'sound_btn2_png'
    }

    public show(){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        PlayManager.getInstance().randomBG();
        PlayManager.getInstance().initADObj();
        SoundManager.getInstance().playSound('bg')

        this.renewSound();
        this.renew();

        if(this.itemArr.length == 0)
        {
            for(var i=0;i<8;i++)
            {
                var item = PKItem.createItem();
                this.itemArr.push(item)
                this.con.addChild(item)
                item.renewSelf(false,i+1);

                item.x = 560/2;
                item.y = (GameManager_wx5.uiHeight - 240 - 420)/2;
            }
        }

       PlayManager.getInstance().testShowExtra();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.PROP_CHANGE,this.renewProp)
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.renewCoin)
    }

    private renewProp(){
        var PM = PropManager.getInstance();
        for(var i=1;i<=5;i++)
        {
            this['red' + i].visible = PM.getUpCost(i) <= UM_wx5.coin;
            this['lvText' + i].text = 'LV.' + PM.getLevel(i);
        }
    }

    private renewCoin(){
       this.coinText.text = NumberUtil_wx5.addNumSeparator(UM_wx5.coin)
        this.renewProp();
    }

    private onE() {
        if(!this.visible)
            return;
        this.barMC.width -= 2;
        if(this.barMC.width <=0)
            this.barMC.width =  540-8
        for (var i = 0; i < this.itemArr.length; i++) {
            this.itemArr[i].move();
        }
    }


    public onVisibleChange(){
        if(this.visible)
        {
            PlayManager.getInstance().randomBG();
            this.renew();
        }
    }

    public renew(){
         this.bg.source = PlayManager.getInstance().getBG();
            this.renewCoin();

        var adArr = PlayManager.getInstance().getListByNum(10);

        var ad = ArrayUtil_wx5.randomOne(adArr,true);
        if(ad)
        {
            this.ad1['adData'] = ad;
            this.ad1.source = ad.logo
            this.ad1.visible = true;
        }
        else
        {
            this.ad1.visible = false;
        }


        var ad = ArrayUtil_wx5.randomOne(adArr,true);
        if(ad)
        {
            this.ad2['adData'] = ad;
            this.ad2.source = ad.logo
            this.ad2.visible = true;
        }
        else
        {
            this.ad2.visible = false;
        }
    }

}