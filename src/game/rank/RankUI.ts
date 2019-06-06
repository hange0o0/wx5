class RankUI extends game.BaseWindow_wx5{

    private static _instance:RankUI;
    public static getInstance() {
        if (!this._instance) this._instance = new RankUI();
        return this._instance;
    }

    private tab: eui.TabBar;




    private bitmap: egret.Bitmap;
    private isdisplay = false;


    public constructor() {
        super();
        this.skinName = "RankUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('好友排行')



        this.tab.addEventListener(egret.Event.CHANGE,this.onTab,this)
        this.tab.selectedIndex = 0;
    }



    private onTab(){
        this.renew()
    }


    public onShow(){

        this.renew();
    }


    public renew(){
        if(!window['wx'])
            return;
        this.remove();
        this.showBitmapList()
    }


    private poseData(){
        if(this.tab.selectedIndex == 0)
        {
            var key = 'time'
            var value = UM_wx5.time
        }
        else if(this.tab.selectedIndex == 1)
        {
            var key = 'score'
            var value = UM_wx5.score
        }
        let param:any = {
            me: UM_wx5.gameid,
            command: 'open',
            key:key,
            rankHeight:this.height-this.bitmap.y - 20,
            x:this.bitmap.x + (GameManager_wx5.uiWidth - this.width)/2,
            y:this.bitmap.y + (GameManager_wx5.uiHeight - this.height)/2,
            me_value: value,// + ',0', //第2位时间传0，永远排在最上面
            root: "openDataContext/",
        }

        //发送消息
        var platform = window['platform']
        platform.openDataContext.postMessage(param);
    }

    //0 好友榜，2群排行
    public showBitmapList(){
        if(!window["wx"] || !window["wx"].getOpenDataContext) return;
        this.remove();
        var platform = window['platform']
        if (!this.isdisplay) {

            this.bitmap = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this.bitmap.x = 30;
            this.bitmap.y = 130;
            this.addChild(this.bitmap);
            this.bitmap.touchEnabled = false

            this.isdisplay = true;
            this.poseData();
        }
    }

    protected remove(){
        var platform = window['platform']
        if(this.isdisplay){
            this.isdisplay = false;
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);

            if(platform.openDataContext){
                platform.openDataContext.postMessage({ command: 'close' });
            }
        }
    }
    public hide(){
        this.remove();
        super.hide();
    }
}