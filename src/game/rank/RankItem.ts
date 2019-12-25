class RankItem extends game.BaseItem{

    private bg: eui.Rect;
    private headMC: eui.Image;
    private indexText: eui.Label;
    private nickText: eui.Label;
    private valueText: eui.Label;



    public constructor() {
        super();
        this.skinName = "RankItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public dataChanged():void {

        this.indexText.textColor = this.data.index < 4 ? 0xffffff : 0xcccccc;
        this.indexText.text = this.data.index;
        this.nickText.text = StringUtil.getStringByLength(this.data.nick,8)
        this.headMC.source = this.data.head

        if(this.data.type == 'time')
        {
            var cd1 = Math.floor(this.data.value/1000)
            var cd2 = Math.floor(this.data.value/1000*100)%100
            this.valueText.text = DateUtil_wx5.getStringBySecond(cd1).substr(-5) + '′' + ('00' + cd2).substr(-2) + '″';
        }
        else
            this.valueText.text = this.data.value + ' 分'
    }


}