class PropInfoUI extends game.BaseWindow_wx5 {

    private static _instance: PropInfoUI;
    public static getInstance(): PropInfoUI {
        if(!this._instance)
            this._instance = new PropInfoUI();
        return this._instance;
    }

    private backBtn: eui.Button;
    private upBtn: eui.Button;
    private icon: eui.Image;
    private coinText: eui.Label;
    private levelText: eui.Label;
    private desText: eui.Label;


    public propid;
    public constructor() {
        super();
        this.skinName = "PropInfoUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.upBtn,()=>{
            var PM = PropManager.getInstance();
            if(!UM_wx5.checkCoin(PM.getUpCost(this.propid)))
                return;
            PM.upProp(this.propid);
            this.renew();
            SoundManager.getInstance().playEffect('buy');
        })


        this.addBtnEvent(this.backBtn,this.hide)
    }

    public show(propid?){
        this.propid = propid;
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.renew)
    }

    public renew(){
        var PM = PropManager.getInstance();
        var baseData = PM.baseData [this.propid]
        var lv = PM.getLevel(this.propid);

        var des = this.createHtml('当前等级：\n',0xffff00) + PM.getDes(this.propid) + '\n\n' + this.createHtml('下一级：\n',0xffff00) +  PM.getDes(this.propid,lv + 1)
        this.setHtml(this.desText,des);

        this.setTitle(baseData.name)
        this.levelText.text = 'LV.' + lv;
        this.icon.source = 'prop_'+this.propid+'_png'

        var cost = PM.getUpCost(this.propid);
        this.coinText.text = cost
        this.coinText.textColor = cost > UM_wx5.coin?0xFF0000:0xFFFFFF
    }

}