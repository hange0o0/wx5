class NotEnoughCoinUI extends game.BaseWindow_wx5 {

    private static _instance:NotEnoughCoinUI;

    public static getInstance():NotEnoughCoinUI {
        if (!this._instance)
            this._instance = new NotEnoughCoinUI();
        return this._instance;
    }

    private desText: eui.Label;
    private btnGroup: eui.Group;
    private shareBtn: eui.Button;
    private coinText: eui.Label;






    private coin
    public constructor() {
        super();
        this.canBGClose = false;
        this.skinName = "NotEnoughCoinUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('领取补助')
        this.addBtnEvent(this.shareBtn,this.onShare)
    }

    public hide(){
        super.hide();
    }


    public onShare(){
        ShareTool.openGDTV(()=>{
            UM_wx5.coinTimes ++;
            UM_wx5.addCoin(this.coin);
            MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil_wx5.addNumSeparator(this.coin,2),0xFFFF00),1000)
            this.hide();
            SoundManager.getInstance().playEffect('coin')
        })
    }

    public show(){
        if(UM_wx5.coinTimes >= 10)
        {
            MyWindow.ShowTips('金币不足！')
            return
        }
        super.show();
    }

    public onShow(){
        this.coin = 500 + 100*UM_wx5.coinTimes;

        this.coinText.text = ''  + this.coin
        this.desText.text = '今日还可领取 '+(10 - UM_wx5.coinTimes)+' 次'
    }
}