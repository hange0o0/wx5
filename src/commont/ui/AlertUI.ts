class AlertUI extends game.BaseWindow_wx5 {
    public constructor() {
        super();
        this.skinName = "AlertSkin";
    }
	private wx5_functionX_28232(){console.log(1113)}

    private cancelBtn: eui.Button;
    private okBtn: eui.Button;
    private closeBtn: eui.Button;
    public text: eui.Label;

	private wx5_functionX_28233(){console.log(3970)}
    private textIn;
    private fun;
    private btnLabel;

    public childrenCreated() {
        this.canBGClose = false;
	wx5_function(9483);
        super.childrenCreated();
        this.addBtnEvent(this.okBtn, this.onClick_456);
        MyTool.removeMC(this.closeBtn)
        MyTool.removeMC(this.cancelBtn)
    }

	private wx5_functionX_28234(){console.log(9762)}
    public show(v?,fun?,btnLabel?){
        this.textIn = v;
        this.fun = fun;
        this.btnLabel = btnLabel;
        super.show();
    }
	private wx5_functionX_28235(){console.log(6668)}

    public onShow(){
        MyTool.setColorText(this.text, this.textIn);
        this.okBtn.label = this.btnLabel || '确认'
        if(this.text.numLines > 1)
            this.text.textAlign = 'left'

	wx5_function(3294);

        var ww = GameManager_wx5.container.width;
        var hh = GameManager_wx5.container.height;
        this.x = (ww - this.width) / 2;
        this.y = (hh - this.height) / 2;
    }
	private wx5_functionX_28236(){console.log(378)}

    private onClick_456(){
        this.hide();
        if(this.fun)
            this.fun();
    }
}
