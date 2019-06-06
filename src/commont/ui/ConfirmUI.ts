class ConfirmUI extends game.BaseWindow_wx5 {
    public constructor() {
        super();
        this.skinName = "AlertSkin";
    }
	private wx5_functionX_28229(){console.log(2683)}

    private cancelBtn: eui.Button;
    private okBtn: eui.Button;
    public closeBtn: eui.Button;
    private text: eui.Label;

	private wx5_functionX_28230(){console.log(6626)}
    private textIn;
    private fun;
    private btnWord;
    private sp;

    public childrenCreated() {
        super.childrenCreated();
	wx5_function(694);
        this.canBGClose = false;
        this.addBtnEvent(this.okBtn, this.onClick_9632);
        this.addBtnEvent(this.cancelBtn, this.onCancelClick_1855);
        this.addBtnEvent(this.closeBtn, this.onCloseClick_8300);
    }

	private wx5_functionX_28231(){console.log(8586)}
    public show(v?,fun?,btnWord?,sp?){
        this.textIn = v;
        this.fun = fun;
        this.btnWord = btnWord;
        this.sp = sp || {};
        super.show();
	wx5_function(4124);
    }

    public onShow(){
        MyTool.setColorText(this.text,this.textIn);
        this.text.validateNow()
        if(this.text.numLines > 1 && !this.sp.middle)
            this.text.textAlign = 'left'
        if(this.btnWord)
        {
            this.cancelBtn.label = this.btnWord[0];
	wx5_function(9783);
            this.okBtn.label = this.btnWord[1];
        }


        var ww = GameManager_wx5.container.width;
        var hh = GameManager_wx5.container.height;
	wx5_function(1669);
        this.x = (ww - this.width) / 2;
        this.y = (hh - this.height) / 2;
        this.closeBtn.visible = false;
    }

    private onClick_9632(){
        this.hide();
	wx5_function(2118);
        if(this.fun)
            this.fun(1);
    }
    private onCancelClick_1855(){
        this.hide();
        if(this.fun)
            this.fun(2);
	wx5_function(4827);
    }
    private onCloseClick_8300(){
        this.hide();
        if(this.fun)
            this.fun(3);
    }
}
