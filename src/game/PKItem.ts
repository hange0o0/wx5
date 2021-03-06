class PKItem extends game.BaseItem{
    private static pool = [];
    public static createItem():PKItem{
        var item:PKItem = this.pool.pop();
        if(!item)
        {
            item = new PKItem();
        }
        item.isProp = 0
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

    public isItem = true;

    public createTime = 0;
    public speed = 1;
    public addX = 1;
    public addY = 1

    public isSelf;
    public clickNum = 0
    public adObj;
    public isDie = 0 ;
    public isProp = 0 ;

    public constructor() {
        super();
        this.skinName = "PKItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = 50
        this.anchorOffsetY = 50
        this.touchChildren = false
    }

    //public dataChanged():void {
    //    this.mc.source = 'knife_'+this.data.id+'_png'
    //}

    public resetXY(){
        this.alpha = 1;
        this.isDie = 0;

        var rota = Math.random()*360
        this.addX = Math.sin(rota)
        this.addY = Math.cos(rota)
        if(Math.random() > 0.5)
        {
            if(this.addX < 0)
                this.x = 640-50
            else
                this.x = -50
            this.y = Math.random() * GameManager_wx5.uiHeight
        }
        else
        {
            if(this.addY < 0)
                this.y = GameManager_wx5.uiHeight-50
            else
                this.y = -50
            this.x = Math.random() * GameManager_wx5.uiWidth
        }

        this.speed = (0.9 + Math.random()*0.2)*8
    }

    public renewSelf(isInit?,index?){
        this.isSelf = true
         this.resetXY();
        if(!index)
            index = Math.ceil(Math.random()*8)
        this.clickNum = index;
        this.mc.source = 'role_'+index+'_png'
        if(isInit)
        {
            this.x = GameManager_wx5.uiWidth/2
            this.y = GameManager_wx5.uiHeight/2
        }
    }

    public onClick(){
        //this.clickNum -- ;
        //if(this.clickNum <= 0)
        //{
            this.isDie = 1;
        //    return;
        //}
        //this.mc.source = 'role_'+this.clickNum+'_png'
    }

    public renewEnemy(adObj){
        this.adObj = adObj;
        this.isSelf = false
        this.resetXY();
        this.mc.source = this.adObj.logo
    }


    public renewProp(propID){
        this.isProp = propID;
        this.resetXY();
        this.speed *= 1.5;
        this.createTime = (egret.getTimer() - PlayManager.getInstance().startTime)
        this.mc.source = 'prop_'+propID+'_png'
    }

    public move(){
        if(this.isDie)
        {
            this.alpha -= 0.05
            if(this.alpha <=0)
            {
                this.isDie = 2
            }
            return;
        }
        var parent = this.parent;
        if(!parent)
            return;
        var PM = PlayManager.getInstance();
        var needRemove = false;
        if(this.isProp)
        {
            needRemove = (egret.getTimer() - PM.startTime) - this.createTime > 20*1000
        }

        var speed = this.speed;
        if(PM.propTime[1])
            speed *= PM.speedRate;


        this.x += this.addX*speed
        this.y += this.addY*speed

        if(this.addX > 0 && this.x > parent.width-50)
        {
            if(needRemove)
                this.isDie = 1;
            else
                this.addX = -this.addX
        }
        else if(this.addX < 0 && this.x < 50)
        {
            if(needRemove)
                this.isDie = 1;
            else
                this.addX = -this.addX
        }

        if(this.addY > 0 && this.y > parent.height - 50)
        {
            if(needRemove)
                this.isDie = 1;
            else
                this.addY = -this.addY
        }
        else if(this.addY < 0 && this.y < 50)
        {
            if(needRemove)
                this.isDie = 1;
            else
                this.addY = -this.addY
        }
    }

    public remove(){
        MyTool.removeMC(this);
    }

}