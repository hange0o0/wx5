var UM_wx5:UserManager_wx5,TM_wx5:TimeManager_wx5,EM_wx5:EventManager_wx5 ,CM_wx5:CacheManager_wx5,DM:DebugManager
class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
	private wx5_functionX_27976(){console.log(4055)}
     */
    private loadingView: MainLoadingUI;
    protected createChildren(): void {
        super.createChildren();
        console.log('_10')

        //inject the custom material parser
        //注入自定义的素材解析器
	wx5_function(4705);
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //this.stage.setContentSize(640,1136);

        //this.stage.addEventListener(egret.Event.RESIZE,this.setScaleMode_7128,this);
        this.setScaleMode_7128();
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = MainLoadingUI.getInstance();
        //if(_get['debug'] != 100 && _get['debug'] != 101)
        //{
        //    this.loadingView.show(this);
        //}
	wx5_function(8596);



        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete_7853, this);
        RES.loadConfig("resource/default.res.json", "resource/");

	wx5_function(5759);


        UM_wx5 = UserManager_wx5.getInstance();
        TM_wx5 = TimeManager_wx5.getInstance();
        EM_wx5 = EventManager_wx5.getInstance();
        CM_wx5 = CacheManager_wx5.getInstance();
	wx5_function(9753);
        DM = DebugManager.getInstance();
        Config.initURLRequest();
        console.log('_1a')
    }

    private setScaleMode_7128(){
        //if(this.stage.stageWidth/this.stage.stageHeight < 640/1136)
        //{
        //    this.stage.setContentSize(640,1136)
        //    this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        //}
        //else if(this.stage.stageWidth/this.stage.stageHeight > 640/960)
        //{
        //    this.stage.setContentSize(640,960)
        //    this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        //}
        //else
        //    this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
    }
	private wx5_functionX_27977(){console.log(105)}


    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
	private wx5_functionX_27978(){console.log(8457)}
    private onConfigComplete_7853(event:RES.ResourceEvent):void {
        console.log('_1b')
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete_7853, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete_3842, this);

	wx5_function(1030);




        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete_975, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError_5198, this);
	wx5_function(6328);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress_9105, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError_5506, this);
        RES.loadGroup("preload_png");
    }
    private isThemeLoadEnd: boolean = false;
    /**
	private wx5_functionX_27979(){console.log(5288)}
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    private onThemeLoadComplete_3842(): void {
        this.isThemeLoadEnd = true;
        console.log('_1c')
        this.createScene_8939();
	wx5_function(1557);
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
	private wx5_functionX_27980(){console.log(4790)}
    private onResourceLoadComplete_975(event:RES.ResourceEvent):void {
        console.log('_1d')
        if (event.groupName == "preload_png") {

            this.isResourceLoadEnd = true;

	wx5_function(6502);


            this.removeLoadEvent_9511();
            this.createScene_8939();
        }
        //else if (event.groupName == "preload_png") {
        //    RES.loadGroup("preload_jpg");//预加载第一阶段
        //}
        //else if (event.groupName == "preload_png") {
        //    this.removeLoadEvent_9511();
        //    this.createScene_8939();
        //    RES.loadGroup("preload_jpg");
        //    RES.loadGroup("preload_png32")
        //
        //}
    }
	private wx5_functionX_27981(){console.log(4976)}

    private removeLoadEvent_9511(){
        this.loadingView.setFinish();
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete_975, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError_5198, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress_9105, this);
	wx5_function(9065);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError_5506, this);
    }
    private createScene_8939(){
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            this.startCreateScene();
        }
    }
	private wx5_functionX_27982(){console.log(4934)}
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError_5506(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
	wx5_function(3824);
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError_5198(event:RES.ResourceEvent):void {
        //TODO
	wx5_function(9344);
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete_975(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
	private wx5_functionX_27983(){console.log(8215)}
     */
    private onResourceProgress_9105(event:RES.ResourceEvent):void {
        if (event.groupName == "game") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
	private wx5_functionX_27984(){console.log(3160)}
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        //CM_wx5.initData(RES.getRes("data_txt"),'monster');
        //CM_wx5.initData(RES.getRes("gun_txt"),'gun');
        CM_wx5.initFinish()
        GameManager_wx5.stage = this.stage;
	wx5_function(6976);
        GameManager_wx5.container = this;
        if(App.isIOS){
            GameManager_wx5.stage.frameRate = 60;
        }
        GameManager_wx5.getInstance().init();
        console.log('_11')

        if(_get['hide'])
            return;
        //GameUI.getInstance().show();
        //var wx = window['wx'];
        //if(!wx)
        //{
        //    GameUI.getInstance().show();
        //    return;
        //}
        //console.log('_12')
	wx5_function(6821);
        GameUI.getInstance().show();
        PlayManager.getInstance().getAD()
        UM_wx5.getUserInfo()

    }
}
