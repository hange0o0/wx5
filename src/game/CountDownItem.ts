class CountDownItem extends game.BaseItem{
    private static pool = [];
    public static createItem():CountDownItem{
        var item:CountDownItem = this.pool.pop();
        if(!item)
        {
            item = new CountDownItem();
        }
        return item;
    }
    public static freeItem(item){
        if(!item)
            return;
        item.remove();
        if(this.pool.indexOf(item) == -1)
            this.pool.push(item);
    }

    private mc: eui.Image;

    private shape = new egret.Shape()

    private step = 0
    private maxStep = 0
    public constructor() {
        super();
        this.skinName = "CountDownItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.touchChildren = false

        this.addChildAt(this.shape,1);
        this.shape.x = 50
        this.shape.y = 50
    }

    public dataChanged(){

    }

    private onE(){
        if(this.step <= 0)
        {
            PKUI.getInstance().removeCountDown(this)
            return;
        }
        this.step --;
        MyTool.getSector(96,-90,-this.step/this.maxStep*360,0xFFFFFF,1,this.shape)
    }


    public remove(){
        MyTool.removeMC(this);
    }

}