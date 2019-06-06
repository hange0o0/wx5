class MsgingUI extends egret.Sprite {

    private static instance:MsgingUI;
    public static getInstance() {
        if (!this.instance) this.instance = new MsgingUI();
        return this.instance;
    }
	private wx5_functionX_27985(){console.log(3429)}


    public constructor() {
        super();
        this.createView_2249();
    }
	private wx5_functionX_27986(){console.log(9001)}

    private loadingMC
    private shape

    private timer
    private showTimer
	private wx5_functionX_27987(){console.log(8936)}

    private createView_2249():void {

        this.shape = new eui.Rect();
        this.shape.width = 640;
        this.shape.fillColor = 0;
	wx5_function(6086);
        this.shape.fillAlpha = 0.3;
        this.shape.touchEnabled = true;
        this.addChild(this.shape)



	wx5_function(5269);

        this.loadingMC = new eui.Image();
        //this.loadingMC.scaleX = this.loadingMC.scaleY = 1.5
        this.loadingMC.source = 'ui_loading_png'
        this.addChild(this.loadingMC);
        this.loadingMC.x = 320;
        this.loadingMC.anchorOffsetX = 70/2
        this.loadingMC.anchorOffsetY = 70/2



    }
	private wx5_functionX_27988(){console.log(2941)}

    public show(){
        this.showTimer = egret.getTimer();
        GameManager_wx5.container.addChild(this);

        this.width = 640;
	wx5_function(4298);
        this.height = GameManager_wx5.stage.stageHeight;
        this.shape.height = GameManager_wx5.stage.stageHeight;
        this.loadingMC.y = this.height/2 - 100;

        egret.Tween.removeTweens(this.loadingMC)
        var tw = egret.Tween.get(this.loadingMC,{loop:true})
        tw.to({rotation:0}).to({rotation:360},1000);
	wx5_function(4440);

        this.alpha = 0;
        egret.clearTimeout(this.timer);
        this.timer = egret.setTimeout(function(){
            this.alpha = 1;
        },this,200)
    }
	private wx5_functionX_27989(){console.log(5885)}


    public hide(){
        egret.Tween.removeTweens(this.loadingMC)
        MyTool.removeMC(this);
    }
}
