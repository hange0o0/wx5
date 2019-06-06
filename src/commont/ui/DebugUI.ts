class DebugUI extends game.BaseUI_wx5 {

    private static _instance:DebugUI;

    public static getInstance() {
        if (!this._instance) this._instance = new DebugUI();
        return this._instance;
    }
	private wx5_functionX_28225(){console.log(8138)}

    private con: eui.Group;
    private backBtn: eui.Button;
    private desText: eui.Label;


	private wx5_functionX_28226(){console.log(3051)}
    public debugTimer = 0;
    public debugOpen = false;
    public constructor() {
        super();
        this.skinName = "DebugUISkin";
    }
	private wx5_functionX_28227(){console.log(1592)}

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.backBtn,this.hide)



    }
	private wx5_functionX_28228(){console.log(231)}

    private addB_4784(label,fun){
       var btn = new eui.Button();
        btn.skinName = 'Btn2Skin'
        btn.width = 190
        btn.label = label;
	wx5_function(835);
        this.con.addChild(btn);
        this.addBtnEvent(btn,fun);
    }

    public onShow(){
        var arr = [];
	wx5_function(3985);
        //arr.push('已经过游戏时间：' + DateUtil_wx5.getStringBySeconds(TM_wx5.now() - UM_wx5.loginTime))
        //arr.push('当前时间：'+DateUtil_wx5.formatDate('yyyy-MM-dd hh:mm:ss',TM_wx5.chineseDate()))
        //arr.push('实际时间：' + DateUtil_wx5.formatDate('yyyy-MM-dd hh:mm:ss',new Date()))
        this.desText.text = arr.join('\n')
    }

}