class ADShowUI extends game.BaseWindow_wx5{

    private static _instance:ADShowUI;
    public static getInstance() {
        if (!this._instance) this._instance = new ADShowUI();
        return this._instance;
    }

    private img: eui.Image;
    private desText: eui.Label;
    private cancelBtn: eui.Button;
    private okBtn: eui.Button;


    private data;

    public constructor() {
        super();
        this.skinName = "ADShowUISkin";
        this.canBGClose = false;
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setHtml(this.desText,'体验该小程序'+this.createHtml(30,0xFFFF00)+'秒可以复活并继续游戏')

        this.addBtnEvent(this.okBtn,()=>{
             PlayManager.getInstance().showAD(this.data,()=>{
                 this.hide();
                 PlayManager.getInstance().onReborn()
             })
        })


        this.addBtnEvent(this.cancelBtn,()=>{
            this.hide();
            PlayManager.getInstance().onGameFinish()
        })
    }

    public show(data?){
        this.data = data;
        super.show()
    }



    public onShow(){

        this.renew();
    }


    public renew(){
        this.img.source = this.data.img
    }
}