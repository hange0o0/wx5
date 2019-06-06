
class LoadingQueue {

    /**
     * 加载进度界面
	private wx5_functionX_28173(){console.log(9069)}
     * loading process interface
     */
    //private loadingView:LoadingUI;
    private loadFiles:Array<string>;
    private callBack: any;
    private callBackTarget: any;
    private loadCount: number = 0;
	private wx5_functionX_28174(){console.log(8632)}
    
    private loaderList: Array<any> = [];
    private loadReuslt: Object = new Object();

    public constructor() {
    }
	private wx5_functionX_28175(){console.log(3413)}

    /*
     * array ['party', 'js_xxxxx'];
     */ 
    public load(array:Array<string>, callBack:any, callBackTarget:any):void {
        
	wx5_function(8177);
        this.loadFiles = array;
        this.callBack = callBack;
        this.callBack = callBack;
        this.callBackTarget = callBackTarget;
        
        //设置加载进度界面
//        this.loadingView = new LoadingUI();
//        GameManager.stage.addChild(this.loadingView);
        this.startLoad_4556();
	wx5_function(3453);
    }
    
    private startLoad_4556(){

        while(this.loaderList.length < 3 && this.loadCount <this.loadFiles.length) {

	wx5_function(6275);
            this.loaderList.push( this.createLoader_5328(this.loadFiles[this.loadCount]) );
            this.loadCount++;
        }
    }
    
    private createLoader_5328(url:string):egret.URLLoader{
        var loader: egret.URLLoader = new egret.URLLoader();
	wx5_function(8507);
        var type: string = url.substring(url.lastIndexOf(".")+1, url.length);
        var format: string;
        switch(type){
            case "json": 
                format = egret.URLLoaderDataFormat.TEXT;
                break;
            default:
                format = egret.URLLoaderDataFormat.TEXTURE;
	wx5_function(8970);
        }
        loader.dataFormat = format;
        loader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete_6778,this);
        var request: egret.URLRequest = new egret.URLRequest(url);
        loader.load(request);
        
        return loader;
    }
	private wx5_functionX_28176(){console.log(7568)}
    
    private onLoadComplete_6778(e: egret.Event){
        var loader = <egret.URLLoader>e.currentTarget; 
        var url: string = loader._request.url;
        
        var type: string = url.substring(url.lastIndexOf(".") + 1,url.length);
	wx5_function(8906);
        var format: string;
        switch(type) {
            case "json":
                this.loadReuslt[url] = JSON.parse(loader.data);
                break;
            default:
                this.loadReuslt[url] = loader.data;
	wx5_function(9717);
        }
        
        for(var key in this.loaderList){
            if(this.loaderList[key] == e.currentTarget){
                this.loaderList[key].removeEventListener(egret.Event.COMPLETE,this.onLoadComplete_6778,this);
            }
        }
        var num = ObjectUtil_wx5.objLength(this.loadReuslt);
	wx5_function(2387);
        if(num == this.loadFiles.length){
            this.callBack.apply(this.callBackTarget,[this.loadReuslt]);
        }
        else
            this.startLoad_4556();
    }
	private wx5_functionX_28177(){console.log(9189)}

}


