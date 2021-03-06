class PKUI extends game.BaseUI_wx5 {

    private static _instance: PKUI;
    public static getInstance(): PKUI {
        if(!this._instance)
            this._instance = new PKUI();
        return this._instance;
    }

    private bg: eui.Image;
    private con: eui.Group;
    private item1: PKItem2;
    private item2: PKItem2;
    private barGroup: eui.Group;
    private barMC: eui.Image;
    private propGroup: eui.Group;
    private cdText: eui.Label;
    private scoreText: eui.Label;
    private readyBG: eui.Image;
    private numText: eui.Label;
    private adRedMC: eui.Image;
    private timeOverMC: eui.Image;









    public itemArr = []
    public txtPool = []
    public propArr = []
    private barWidth = 632;

    public redTW


    private wordBase = {
        0:{w:'Miss',color:0xFF0000},
        1:{w:'Good',color:0xFFFF00},
        2:{w:'Cool',color:0x00ff00},
        3:{w:'Perfect',color:0xFF00FF},
    }

    public constructor() {
        super();
        this.skinName = "PKUISkin";
        //this.isShowAD = true
    }

    public childrenCreated() {
        super.childrenCreated();
        this.con.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick, this);
        this.item1.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick2, this);
        this.item2.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick3, this);
        this.item1.startStep = 1;
        this.item2.startStep = 2;

        this.adRedMC.alpha = 0.5;
        this.redTW = egret.Tween.get(this.adRedMC,{loop:true}).to({alpha:0.2},500).to({alpha:0.5},500)
        this.redTW.setPaused(true)
        MyTool.removeMC(this.adRedMC)
    }

    private onClick2(){
        if(PlayManager.getInstance().propTime[5])
        {
            SoundManager.getInstance().playEffect('score1')
            return;
        }
        if(this.timeOverMC.visible)
            return;
        SoundManager.getInstance().playEffect('error');
        //setTimeout(()=>{
            PlayManager.getInstance().onDie(this.item1.adObj)
        //},300)

    }
    private onClick3(){
        if(PlayManager.getInstance().propTime[5])
        {
            SoundManager.getInstance().playEffect('score1')
            return;
        }
        if(this.timeOverMC.visible)
            return;
        SoundManager.getInstance().playEffect('error');
        //setTimeout(()=>{
            PlayManager.getInstance().onDie(this.item2.adObj)
        //},300)

    }

    private resetClickCD(){
        var PM = PlayManager.getInstance();
        PM.maxCD = Math.max(500,3000 - (egret.getTimer() - PM.startTime)/100*1.5)
        if(PlayManager.getInstance().propTime[4])
            PM.maxCD += PropManager.getInstance().getPropValue(4)*1000;
        PM.lastClick = egret.getTimer();
    }

    private onClick(e){
        var PM = PlayManager.getInstance();
        if(PM.countDown)
            return;
        if(this.timeOverMC.visible)
            return;
        var target:any = null;
        var pp = this.con.globalToLocal(e.stageX,e.stageY)
        var r = 50;
        for(var i=this.itemArr.length-1;i>=0;i--)
        {
            var temp = this.itemArr[i]
            //var r = temp.isSelf?60:50
            if(Math.abs(temp.x - pp.x) <= r && Math.abs(temp.y - pp.y) <= r && MyTool.getDistance(temp.x,temp.y,pp.x,pp.y) <= r)
            {
                target = temp;
                break;
            }
        }
        if(!target)
        {
            var oo = this.wordBase[0];
            this.playText({x:pp.x,y:pp.y - 50},oo.w,oo.color)
            SoundManager.getInstance().playEffect('score1')
            return;
        }
        if(target.isDie)
            return;
        if(target.isSelf)
        {
            //var r = 60;
            //var p = target.globalToLocal(e.stageX,e.stageY);
            var len = MyTool.getDistance(target.x,target.y,pp.x,pp.y);
            var step = 4-Math.min(3,Math.ceil(len/r*3))
            SoundManager.getInstance().playEffect('score' + (step+1))
            var addScore = Math.max(1,Math.ceil(r-len));
            PM.score += addScore;
            this.scoreText.text = '积分：' + PM.score

            this.resetClickCD();

            this.showWord(target,step,addScore);
            target.onClick();
        }
        else if(target.isProp)
        {
            //SoundManager.getInstance().playEffect('error');
            target.onClick();
            if(target.isProp == 2)
            {
                SoundManager.getInstance().playEffect('bomb');
                //爆炸动画
                var mc = new eui.Image('ring_png')
                this.con.addChild(mc)
                mc.x = pp.x
                mc.y = pp.y
                mc.anchorOffsetX = 251/2
                mc.anchorOffsetY = 251/2
                egret.Tween.get(mc).to({scaleX:2,scaleY:2,alpha:0},200).call(()=>{
                    MyTool.removeMC(mc);
                })
                //
                for(var i=0;i<this.itemArr.length;i++)
                {
                    var target = this.itemArr[i];
                    if(target.isSelf)
                        continue;
                    if(target.isProp)
                        continue;
                    if(target.isDie)
                        continue;
                    r = PropManager.getInstance().getPropValue(2) + 50;
                    if(Math.abs(target.x - pp.x) <= r && Math.abs(target.y - pp.y) <= r && MyTool.getDistance(target.x,target.y,pp.x,pp.y) <= r)
                    {
                        target.onClick();
                    }
                }
            }
            else if(target.isProp == 3)
            {
                SoundManager.getInstance().playEffect('cut');
                 this.removeEnemy(PropManager.getInstance().getPropValue(3));
            }
            else
            {
                SoundManager.getInstance().playEffect('reward');
                PlayManager.getInstance().addProp(target.isProp)
                var propItem = CountDownItem.createItem();
                this.propArr.push(propItem)
                this.propGroup.addChild(propItem)
                var cd = 15*30;
                if(target.isProp == 5)
                    cd = Math.round(PropManager.getInstance().getPropValue(5)*30)
                propItem.data = {
                    id:target.isProp,
                    max:cd
                }
            }

            this.resetClickCD();
        }
        else
        {
            if(!PlayManager.getInstance().propTime[5])
            {
                SoundManager.getInstance().playEffect('error');
                PM.onDie(target.adObj)
            }
            else
            {
                SoundManager.getInstance().playEffect('score1')
            }

            //setTimeout(()=>{
            //    PM.showAD(target.adObj)
            //},300)
        }
    }


    public showWord(item,step,score){
        var oo = this.wordBase[step];
        this.playText({x:item.x,y:item.y - 50},oo.w,oo.color)
        if(score)
        {
            this.playText({x:item.x,y:item.y - 80},'+ ' + score,oo.color,2)
        }
    }

    public show(){
        //this.isShowAD = !UM_wx5.isTest
        super.show()
    }

    public hide() {
        super.hide();
    }

    public showTimeOver(){
        this.timeOverMC.visible = true;
        this.timeOverMC.scaleX = this.timeOverMC.scaleY = 0
        PlayManager.getInstance().dieTime = egret.getTimer();
        egret.Tween.get(this.timeOverMC).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1,scaleY:1},200).wait(1200).call(()=>{
            PlayManager.getInstance().onDie()
        })
    }

    public reborn(){
        this.timeOverMC.visible = false;
        this.removeEnemy(3);
        SoundManager.getInstance().playEffect('reborn');
    }

    public removeCountDown(item){
        var index = this.propArr.indexOf(item);
        if(index != -1)
            this.propArr.splice(index,1);
        CountDownItem.freeItem(item);
        if(PlayManager.getInstance().propTime[item.data.id])
            PlayManager.getInstance().propTime[item.data.id] --;
    }

    private removeEnemy(num){
        for(var i=0;i<this.itemArr.length && num > 0;i++)
        {
            var target = this.itemArr[i];
            if(target.isSelf)
                continue;
            if(target.isProp)
                continue;
            if(target.isDie)
                continue;
            target.onClick();
            num--;
        }
    }

    public onShow(){
        this.timeOverMC.visible = false;
        this.adRedMC.visible = false;
        this.adRedMC.height = Config.adHeight;
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)

        if(ZijieScreenBtn.e)
        {
            ZijieScreenBtn.e.init();
            ZijieScreenBtn.e.start();
        }
    }

    private onE(){
        var PM =  PlayManager.getInstance()
        var len = this.itemArr.length;
        for(var i=0;i<len;i++)
        {
            var item = this.itemArr[i]
            item.move();
            if(item.isDie == 2)
            {
                var isSelf = item.isSelf
                this.itemArr.splice(i,1)
                PKItem.freeItem(item)
                i--;

                //加回去1个
                if(isSelf)
                {
                    var item2 = PKItem.createItem();
                    this.itemArr.unshift(item2)
                    this.con.addChildAt(item2,0)
                    item2.renewSelf();
                    item2.speed *=(1 + (egret.getTimer() - PM.startTime)/1000/150)
                }
                else
                {
                    len --;
                }

            }
        }
        this.item1.move()
        this.item2.move()
        if(PM.countDown)
        {
            var num = 3-Math.floor((egret.getTimer() - PM.startTime)/1000)
            if(num <= 0)
            {
                this.readyBG.visible = false
                this.barGroup.visible = true

                PM.startGame();
                this.numText.text = ''
                this.scoreText.text = '积分：' + PM.score
            }
            else if(PM.countDown != num)
            {
                PM.countDown = num
                this.numText.text = '' + num;
                egret.Tween.removeTweens(this.numText)
                this.numText.scaleX = this.numText.scaleY = 0
                egret.Tween.get(this.numText).to({scaleX:1.2,scaleY:1.2},250).to({scaleX:1,scaleY:1},250)
            }
        }
        else if(!PM.isGameOver && !PM.dieTime && !this.timeOverMC.visible)
        {
            for(var i=0;i<this.propArr.length;i++)
            {
                if(this.propArr[i].onE())
                    i--;
            }

            var cd = egret.getTimer() - PM.startTime
            var cd1 = Math.floor(cd/1000)
            var cd2 = Math.floor(cd/1000*100)%100
            this.cdText.text = '计时：' + DateUtil_wx5.getStringBySecond(cd1).substr(-5) + '′' + ('00' + cd2).substr(-2) + "″"

            if(PM.gameStep == 0 && cd > 20*1000)
            {
                PM.gameStep = 1;
                SoundManager.getInstance().playEffect('laugh1')
            }

            if(!UM_wx5.isTest)
            {
                if(cd > PM.adMoveTime1)//显红
                {
                    if(PM.adMoveNum >= 5)
                        PM.adMoveTime2 = PM.adMoveTime1 + (Math.random()*1)*1000 + 300
                    else
                        PM.adMoveTime2 = PM.adMoveTime1 + (1+Math.random()*2)*1000
                    PM.adMoveTime1 += (10 + 3*Math.random() - PM.adMoveNum)*1000
                    PM.adMoveNum ++;
                    if(PM.adMoveNum >8)
                        PM.adMoveNum = 8
                    this.adRedMC.visible = true;
                    this.redTW.setPaused(false)
                    this.adRedMC.y = 100 + (GameManager_wx5.uiHeight-Config.adHeight - 100)*Math.random()
                }

                if(cd > PM.adMoveTime2)//广告动
                {
                    this.adRedMC.visible = false;
                    this.redTW.setPaused(true)
                    GameManager_wx5.getInstance().showBanner(GameManager_wx5.uiHeight - this.adRedMC.y - Config.adHeight)
                }
            }





            cd = PM.maxCD - (egret.getTimer() - PM.lastClick)
            if(cd <= 0)
            {
                SoundManager.getInstance().playEffect('time_over')
                this.showTimeOver();

            }
            else
            {
                 this.barMC.width = cd/PM.maxCD*this.barWidth
            }

            if(egret.getTimer() - PM.lastAddAD > 6*1000)
            {
                PM.lastAddAD = egret.getTimer();
                var item2 = PKItem.createItem();
                this.itemArr.push(item2)
                this.con.addChild(item2)
                item2.renewEnemy(ArrayUtil_wx5.randomOne(PM.gameADList));
                item2.speed *=(1 + (egret.getTimer() - PM.startTime)/1000/150)

                this.item1.speed *= 1.03
                this.item2.speed *= 1.03
                this.item2.move()
            }

            if(egret.getTimer() - PM.lastAddProp > 12*1000)
            {
                PM.lastAddProp = egret.getTimer();
                var item2 = PKItem.createItem();
                this.itemArr.push(item2)
                this.con.addChildAt(item2,0)
                item2.renewProp(Math.ceil(Math.random()*5));
                item2.speed *=(1 + (egret.getTimer() - PM.startTime)/1000/150)
                this.item2.move()
            }

        }
    }


    public renew(){
        var PM =  PlayManager.getInstance()
        PM.initGame();
        this.bg.source = PM.getBG();
        while(this.itemArr.length)
        {
            PKItem.freeItem(this.itemArr.pop())
        }
        while(this.propArr.length)
        {
            CountDownItem.freeItem(this.propArr.pop())
        }

        var num = Math.ceil(GameManager_wx5.uiHeight/70);
        var myNum = Math.floor(num*0.5);
        num -= myNum;

        for(var i=0;i<myNum;i++)
        {
            var item = PKItem.createItem();
            this.itemArr.push(item)
            this.con.addChild(item)
            item.renewSelf(true);
        }


        for(var i=0;i<num;i++)
        {
            var item = PKItem.createItem();
            this.itemArr.push(item)
            this.con.addChild(item)
            item.renewEnemy(ArrayUtil_wx5.randomOne(PM.gameADList));
        }

        this.item1.renewEnemy(ArrayUtil_wx5.randomOne(PM.gameADList));
        this.item2.renewEnemy(ArrayUtil_wx5.randomOne(PM.gameADList));
        this.item1.y = -120
        this.item2.y = GameManager_wx5.uiHeight;

        this.cdText.text = ''
        this.scoreText.text = ''
        this.barMC.width = this.barWidth;
        this.barGroup.visible = false
        this.onE();
        SoundManager.getInstance().playEffect('count_down')
        this.readyBG.visible = true
    }


    public playText(p,value,color=0xFF0000,mvType=1){
        var txt = this.createTxt();
        txt.textColor = color;
        txt.text = value;
        txt.x = p.x;
        txt.y = p.y;
        this.addChild(txt)

        var tw = egret.Tween.get(txt);
        if(mvType == 1)
        {
            tw.to({scaleX:0,scaleY:0}).to({scaleX:1.2,scaleY:1.2},100).to({scaleX:1,scaleY:1},100).wait(500).call(()=>{
                this.freeTxt(txt);
            })
        }
        else if(mvType == 2)
        {
            tw.wait(500).call(function(){
                this.freeTxt(txt);
            },this)
        }

    }

    private createTxt():eui.Label{
        var item:eui.Label = this.txtPool.pop();
        if(!item)
        {
            item = new eui.Label();
            item.size = 24;
            //item.bold = true;
            if(egret.Capabilities.renderMode == 'webgl')
                item.stroke = 2;
            item.width = 160;
            item.textAlign="center"
            item.anchorOffsetX = 80;
            //item.strokeColor = 0x000000
            //item.cacheAsBitmap = true;
        }

        item.alpha = 1;
        return item;
    }

    private freeTxt(item){
        if(!item)
            return;
        egret.Tween.removeTweens(item)
        MyTool.removeMC(item);
        this.txtPool.push(item);
    }

}