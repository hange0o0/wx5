class MyTimer extends egret.EventDispatcher {
    private cd = 0;
    private timer
    private lastTime = 0;
    public constructor(v) {
        super();
	wx5_function(381);
        this.cd = v;
        this.timer = new egret.Timer(v);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onE_204,this)


    }
	private wx5_functionX_28031(){console.log(129)}

    private onE_204(){
        var total = egret.getTimer() - this.lastTime;
        var num = Math.floor(total/this.cd)
        //if(total > 200)
        //{
        //     console.log(total)
        //}
        if(total > 3000)//卡太久，跳过
        {
            this.dispatchEventWith(egret.TimerEvent.TIMER)
            this.lastTime = egret.getTimer();
	wx5_function(8609);
            return;
        }
        while(num --)
        {
            this.dispatchEventWith(egret.TimerEvent.TIMER)
            this.lastTime += this.cd;
	wx5_function(1651);
        }
    }

    public start(){
       this.timer.start();
        this.lastTime = egret.getTimer()
    }
	private wx5_functionX_28032(){console.log(2160)}

    public stop(){
        this.timer.stop();
    }


	private wx5_functionX_28033(){console.log(6033)}

}