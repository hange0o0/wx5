class ChangeUserItem extends game.BaseItem{


    private mc: eui.Image;
    private nameText: eui.Label;

    public constructor() {
        super();
        this.skinName = "ChangeUserItemSkin";
    }


    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
    }


    private onClick(){
        if(this.data.isHero)
            return;
        PlayManager.getInstance().showAD(this.data,this.data.fun)
    }

    public dataChanged():void {
        this.mc.source = this.data.logo;
        this.nameText.text = StringUtil.getStringByLength(this.data.name,5);
    }

}
