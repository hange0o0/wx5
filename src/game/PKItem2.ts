class PKItem2 extends game.BaseItem{

    private mc: eui.Image;
    private nameText: eui.Label;
    private desText: eui.Label;


    public speed = 3;
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
        if(PlayManager.getInstance().gameStep < this.startStep)
            return;
        this.y += this.addY*this.speed

        if(this.addY > 0 && this.y > GameManager_wx5.uiHeight)
            this.addY = -this.addY
        else if(this.addY < 0 && this.y < -120)
        {
            this.addY = -this.addY
            if(this.startStep == 1 && !PlayManager.getInstance().isGameOver && PlayManager.getInstance().gameStep == 1)
            {
                PlayManager.getInstance().gameStep ++;
                SoundManager.getInstance().playEffect('laugh1')
            }
        }
    }

    public remove(){
        MyTool.removeMC(this);
    }

}