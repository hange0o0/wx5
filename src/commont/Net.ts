class Net extends egret.EventDispatcher{
    private static instance: Net;
    public static getInstance() {
        if(!this.instance) this.instance = new Net();
        return this.instance;
    }
	private wx5_functionX_28067(){console.log(2663)}

    public constructor() {
        super();
    }

    public send(url,msg){
        var loader = new egret.URLLoader();
	wx5_function(7336);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader['msg'] = msg;
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        var variables = new egret.URLVariables('a=1');
        var oo:any = {};
	wx5_function(1213);
        oo.msg = JSON.stringify(msg);
        variables.variables = oo;
        request.data = variables;
        if(Config.isDebug )
        {
            console.log('send===>      '+JSON.stringify(msg) +'   '+TM_wx5.now());
	wx5_function(6814);
        }
        loader.load(request);
    }


    private refresh_8561(){
        location.reload();
	wx5_function(7405);
    }

    private addLoading_5943(){
        MsgingUI.getInstance().show();
    }

	private wx5_functionX_28068(){console.log(8284)}
    private removeLoading_4115(){
        MsgingUI.getInstance().hide();
    }
}