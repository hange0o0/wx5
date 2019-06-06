class EventManager_wx5 extends egret.EventDispatcher {
    
    private static _instance: EventManager_wx5;
    
    public static getInstance():EventManager_wx5{
        if(!EventManager_wx5._instance)
            EventManager_wx5._instance = new EventManager_wx5();
        return EventManager_wx5._instance;
    }
	private wx5_functionX_28108(){console.log(991)}
        
	public constructor() {
        super();
	}
	public dispatch(type:string, data?:any){
        EventManager_wx5.getInstance().dispatchEventWith(type, false, data);
	wx5_function(5017);
	}
	public addEvent(type:string, func:Function, thisObj:any){
    	  EventManager_wx5.getInstance().addEventListener(type, func, thisObj);
	}
    public removeEvent(type: string, func: Function, thisObj: any) {
        EventManager_wx5.getInstance().removeEventListener(type, func, thisObj);
	wx5_function(1204);
    }

}

