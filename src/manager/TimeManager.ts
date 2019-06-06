class TimeManager_wx5 {

	public constructor() {
	}
	
	private wx5_functionX_28130(){console.log(9910)}
    private static _instance: TimeManager_wx5;
    
    public static getInstance():TimeManager_wx5{
        if(!TimeManager_wx5._instance)
            TimeManager_wx5._instance = new TimeManager_wx5();
        return TimeManager_wx5._instance;
    }
	private wx5_functionX_28131(){console.log(8671)}
    
    private _timeDiff: number = 0;
    public get timeDiff():number {
        return this._timeDiff - DM.addTime;
    }

	private wx5_functionX_28132(){console.log(6094)}
    public loginTime: number = 0;//等陆时的服务器时间

    private loginWXTime = 0;
    public init(time:number):void{
        //本地和服务器的时间差
        this._timeDiff = Math.floor(Date.now() / 1000 - time);
    }
	private wx5_functionX_28133(){console.log(2469)}

    public getTimer(){
        var wx = window['wx'];
        if(wx)
            return  Math.floor((wx.getPerformance().now() -  this.loginWXTime)/1000)
        return egret.getTimer();
    }
	private wx5_functionX_28134(){console.log(7945)}

    public initlogin(t){
        var wx = window['wx'];
        this.loginWXTime = wx.getPerformance().now()
        this.loginTime = Math.floor(t/1000)//Math.floor((t - wx.getPerformance().now())/1000);
    }
	private wx5_functionX_28135(){console.log(8808)}
    
    public now():number{
        if(this.loginTime)
        {
            var wx = window['wx'];
            return this.loginTime + Math.floor(this.getTimer()/1000)
        }
        return Math.floor(Date.now() / 1000) - this.timeDiff //+ 24*3600 *7;
    }
	private wx5_functionX_28136(){console.log(6025)}
    public nowMS():number{
        if(this.loginTime)
        {
            var wx = window['wx'];
            return this.loginTime*1000 + this.getTimer();
        }
        return Date.now() - this.timeDiff*1000
    }
	private wx5_functionX_28137(){console.log(8424)}

    public getLastDayOfWeekDate(time:number, endDay:any):Date{
        endDay = endDay || 5;
        //得到今天是周几
        var d = new Date(time * 1000);
            var curDay = d.getDay();
            var add = endDay > curDay
            ? endDay - curDay
            : 7 - (curDay - endDay);
	wx5_function(843);
            
            return new Date(d.getTime() + add * 24 * 3600 * 1000);
    }
    
    public offsetDate():Date{
        var offsetTime = -21600;
	wx5_function(7461);
        var time = this.now();
        time += offsetTime;
        return DateUtil_wx5.timeToChineseDate(time);
    }
    
    public chineseDate():Date{
        return DateUtil_wx5.timeToChineseDate(this.now());
    }
	private wx5_functionX_28138(){console.log(4410)}
    
    public getNextDateTime():number{
        return DateUtil_wx5.getNextDateTimeByHours(6);
    }
    
}
