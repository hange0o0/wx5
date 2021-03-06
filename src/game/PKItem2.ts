class PKItem2 extends game.BaseItem{

    private mc: eui.Image;
    private nameText: eui.Label;
    private desText: eui.Label;


    public speed = 6;
    public addY = 1;
    public adObj;
    public isItem = true;
    public isSelf = false;

    public startStep = 999;

    public constructor() {
        super();
        this.skinName = "PKItem2Skin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.touchChildren = false
        this.cacheAsBitmap = true;
    }

    public renewEnemy(adObj){
        this.adObj = adObj;
        this.addY = 1;

        this.mc.source = this.adObj.logo
        this.nameText.text = this.adObj.name
        this.desText.text = this.adObj.desc
    }

    public move(){
        var PM = PlayManager.getInstance()
        if(PM.gameStep < this.startStep)
            return;

        var speed = this.speed;
        if(PM.propTime[1])
            speed *= PM.speedRate;


        this.y += this.addY*speed

        if(this.addY > 0 && this.y > GameManager_wx5.uiHeight)
            this.addY = -this.addY
        else if(this.addY < 0 && this.y < -120)
        {
            this.addY = -this.addY
            if(this.startStep == 1 && !PM.isGameOver && PM.gameStep == 1 && !PM.dieTime)
            {
                PM.gameStep ++;
                SoundManager.getInstance().playEffect('laugh1')
            }
        }
    }

    public remove(){
        MyTool.removeMC(this);
    }

}