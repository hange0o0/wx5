class PKResultUI extends game.BaseUI_wx5{

    private static _instance:PKResultUI;
    public static getInstance() {
        if (!this._instance) this._instance = new PKResultUI();
        return this._instance;
    }

    private cdText: eui.Label;
    private record1: eui.Image;
    private scoreText: eui.Label;
    private record2: eui.Image;
    private honorText: eui.Label;
    private btnGroup: eui.Group;
    private shareBtn1: eui.Button;
    private shareBtn2: eui.Button;
    private adGroup: eui.Group;
    private viedoBtn: eui.Image;
    private closeBtn: eui.Image;
    private closeBtn2: eui.Group;
    private list: eui.List;


    private shareText = ''

    public constructor() {
        super();
        this.skinName = "PKResultUISkin";
        this.hideBehind = false;

        this.isShowAD = true;
        this.adBottom = 0;
    }

    public childrenCreated() {
        super.childrenCreated();
        this.list.itemRenderer = ChangeUserItem

        this.addBtnEvent(this.closeBtn,this.close)
        this.addBtnEvent(this.closeBtn2,this.close)

        this.addBtnEvent(this.viedoBtn,()=>{
            ShareTool.openGDTV(()=>{
            })
        })

        this.addBtnEvent(this.shareBtn1,()=>{
            ShareTool.share('自从玩了这个 游戏广告再也无法干扰到我了',Config.localResRoot + "share1.jpg",{},null,true)
        })

        this.addBtnEvent(this.shareBtn2,()=>{
            ShareTool.share(this.shareText,Config.localResRoot + "share2.jpg",{},null,true)
        })

        MyTool.removeMC(this.adGroup)
    }

    public close(){
        this.hide();
        PKUI.getInstance().hide()
    }

    public onShow(){
        this.renew();
    }

    private getHonor(cd){
        var cdArr = [10,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300]
        var word = [
            '广告狂热份子',
            '广告爱好者',
            '广告目标人群',
            '广告受众',
            '广告免疫者',
            '广告猎人',
            '广告杀手',
            '广告终结者',
            '广告灾难',
            '广告破灭',
            '广告炼狱',
            '无广告帝王',
        ]
        for(var i=0;i<cdArr.length;i++)
        {
            if(cd <= cdArr[i])
                return word[i] || word.pop();
        }
       return word.pop();
    }


    public renew(){
        var PM = PlayManager.getInstance();
        var cd = PM.startTime
        var cd1 = Math.floor(cd/1000)
        var cd2 = Math.floor(cd/1000*100)%100

        this.cdText.text = DateUtil_wx5.getStringBySecond(cd1).substr(-5) + '′' + ('00' + cd2).substr(-2) + "″"
        this.scoreText.text = PM.score + ''


        this.record1.visible = cd > UM_wx5.time
        if(this.record1.visible)
        {
            UM_wx5.time = cd;
            UM_wx5.needUpUser = true;
            UM_wx5.upWXTime()

        }

        this.record2.visible = PM.score > UM_wx5.score
        if(this.record2.visible)
        {
            UM_wx5.score = PM.score;
            UM_wx5.needUpUser = true;
            UM_wx5.upWXScore()
        }


        this.setHtml(this.honorText,'获得了【'+this.createHtml(this.getHonor(cd1),0xFF0000)+'】称号')
        this.shareText = '我在广告包围中坚持了'+cd1+'秒，获得了【'+this.getHonor(cd1)+'】称号'

        this.list.dataProvider = new eui.ArrayCollection(PlayManager.getInstance().gameADList)
    }

    public hide(){
        super.hide();
    }
}