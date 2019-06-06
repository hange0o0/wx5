class GameUI extends game.BaseUI_wx5 {

    private static _instance: GameUI;
    public static getInstance(): GameUI {
        if(!this._instance)
            this._instance = new GameUI();
        return this._instance;
    }


    private bg: eui.Image;
    private startBtn: eui.Button;
    private soundBtn: eui.Image;
    private barMC: eui.Image;
    private con: eui.Group;
    private rankBtn: eui.Image;



    public itemArr = []
    public constructor() {
        super();
        this.skinName = "GameUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.startBtn,()=>{
             if(PlayManager.getInstance().adList.length == 0)
             {
                 MyWindow.ShowTips('正在组装敌人，请稍后')
                 return;
             }
             PKUI.getInstance().show();
        })



        this.addBtnEvent(this.rankBtn,()=>{
            RankUI.getInstance().show();
        },this,true)


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


        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
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
    }

}