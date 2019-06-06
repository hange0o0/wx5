
module game {

    /**
    *  界面基类
	private wx5_functionX_27992(){console.log(9546)}
    */
    export class BaseContainer_wx5 extends eui.Component {
        
        
        public constructor(skinName?:string) {
            super();
	wx5_function(7419);
            
            if(skinName)
                this.skinName = skinName;
        }
                    
        public childrenCreated() {
        }
	private wx5_functionX_27993(){console.log(2545)}
                    
        public partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
            instance.id = partName;

            //赋予btn图片按钮的行为
            if(instance instanceof eui.Image) {
                if(partName.toLowerCase().indexOf("btn") > -1) {
                }else{
                    instance.touchEnabled = false;
	wx5_function(53);
                }
            }
            else if(instance instanceof eui.Label){ //label不可交互
                instance.touchEnabled = false;
            }
        }
        //
        //public getImg(name:string):eui.Image{
        //    return <eui.Image>this[name];
        //}
        //
        //public getLabel(name: string): eui.Label {
        //    return <eui.Label>this[name];
        //}
        //
        //public getText(name: string): egret.TextField {
        //    return <egret.TextField>this[name];
        //}
        //
        //public getButton(name: string): eui.Button {
        //    return <eui.Button>this[name];
        //}
        //
        //public getItem(name: string): game.BaseItem {
        //    return <game.BaseItem>this[name];
        //}
	private wx5_functionX_27994(){console.log(563)}

                
        /*
        * 设置html  
        * this.setHtml(this.txt,"<font color=0xff0000>五23424</font>");
        */ 
	private wx5_functionX_27995(){console.log(667)}
        public setHtml(txt:eui.Label, str:string):void{
            txt.textFlow = new egret.HtmlTextParser().parser(str);
        }  
                
        /*
        * 给按钮添加事件  
	private wx5_functionX_27996(){console.log(4525)}
        * this.addBtnEvent(this.btn, this.btnClick);
        */ 
        public addBtnEvent(btn: egret.DisplayObject, fun:any, thisObject?:any,stopAddSound?):void{
            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,fun,thisObject || this);

	wx5_function(6206);
            var btnName = (btn['id'] || '').toLocaleLowerCase();
            if(!stopAddSound && (btnName.indexOf('btn')!=-1 || btnName.indexOf('button')!=-1))
                SoundManager.getInstance().addBtnClickEffect(btn);
        }

        public createHtml(str:string | number, color?:number, size?:number):string{
            return MyTool.createHtml(str,color,size);
        }
	private wx5_functionX_27997(){console.log(8243)}

        /*
        * 给按钮移除事件  
        * this.removeBtnEvent(this.btn, this.btnClick);
        */ 
        public removeBtnEvent(btn: egret.DisplayObject, fun:any, thisObject?:any):void{
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, fun, thisObject || this);
	wx5_function(1465);
        }

        public clearList(list:eui.List | Array<eui.List>){
            var lists:any = list;
            if(list instanceof eui.List){
                lists = [list];
	wx5_function(1738);
            }
            for(var key in lists){
                try{
                    lists[key].dataProvider = null;
                    //必现调用下面2句，并且 需要在hide之前调用
                    lists[key].dataProviderRefreshed();
                }
                catch(e){
                }
            }
            this.validateNow();
	wx5_function(1099);
        }
        
    }
    
    
    /**
    *  界面基类
    */
    export class BaseUI_wx5 extends game.BaseContainer_wx5 {
	private wx5_functionX_27998(){console.log(5754)}
        
        public LoadFiles: Array<string>;//加载文件配置['party', 'js_xxxxx'];
        private isStartLoad: boolean = false;
        
        private static UIshowList: any = {};
        public BaseTypeList: Array<number> = [];//页面模块配置，主要用来控制全局调用
	private wx5_functionX_27999(){console.log(473)}
        public isInitUI: boolean = true;//是否已经初始化完皮肤
        
        private _arguments: Array<any>;
        private sizeList: Array<any> = [];

        public isWindow: boolean = false;
	private wx5_functionX_28000(){console.log(2441)}
        public noMV: boolean = false;
        public isHideFlag:boolean = true;
        public canBGClose:boolean = false;


        public loadData = null;
	private wx5_functionX_28001(){console.log(4981)}
        public loadUI = null;

        public hideBehind = true;

        public showFinishFunList = []; //显示成功后回调的方法

	private wx5_functionX_28002(){console.log(8303)}
        private panelEvents: any = {};

        public isShowAD = false;
        public adBottom = 0;

        public baseX = 0
	private wx5_functionX_28003(){console.log(668)}
        public baseY = 0

        public constructor(isWindow?:boolean) {
            super();
            this.isWindow = isWindow;
            if(!this.isWindow)
                GameManager_wx5.stage.addEventListener(egret.Event.RESIZE,this.onResize,this);
	wx5_function(2266);
        }
                    
                    
        public childrenCreated() {
            this.isInitUI = true;
            
            if(!this.isWindow)
                this.onResize(null);
	wx5_function(1681);
            
//            if(this.parent){
//                this.addEventListener(egret.Event.ENTER_FRAME,this.createComplete_308,this);
//            }
        }
        private createComplete_308(e:egret.Event){
            this.removeEventListener(egret.Event.ENTER_FRAME,this.createComplete_308,this);
            if(this._arguments)
                this.onShow.apply(this,this._arguments);
            else
                this.onShow();
	wx5_function(1263);

            this.runShowFinish_7484();
        }

        private runShowFinish_7484(){
            while(this.showFinishFunList.length > 0)
            {
                this.showFinishFunList.shift()();
	wx5_function(2845);
            }
        }

        public addShowFinishFun(fun){
            this.showFinishFunList.push(fun);
        }
	private wx5_functionX_28004(){console.log(4470)}
                    
        public partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
        }
                    
        /*public show(){
        eui.PopUpManager.addPopUp(this,true);
	wx5_function(9791);
        this.verticalCenter = -700;
        egret.Tween.get(this).to({verticalCenter:0} , 500 , egret.Ease.backOut);
                            
        }*/

        public addPanelOpenEvent(type:string, callBack:Function){
            this.panelEvents[type] = callBack;
	wx5_function(7343);
            EM_wx5.addEvent(type, callBack, this);
        }
            
        public addListenerSizeY(list:Array<any>):void{
            while(list.length > 0){
                this.sizeList.push({ui:list.pop(), type:"y"});
	wx5_function(3784);
            }
        }
        public addListenerSizeH(list:Array<any>):void{
            while(list.length > 0){
                this.sizeList.push({ui:list.pop(), type:"h"});
            }
        }
	private wx5_functionX_28005(){console.log(3543)}

        public resizeFun(){

        }
        public onVisibleChange(){

        }
	private wx5_functionX_28006(){console.log(1014)}

        public onResize(e:Event):void{
//            console.log(GameManager.stage.stageWidth, GameManager.stage.stageHeight)
//            console.log(GameManager.stage.width, GameManager.stage.height)
            this.height = GameManager_wx5.uiHeight;
            var item: any;
            for(var i = 0;i < this.sizeList.length; i++){
                /*
                item = this.sizeList[i];
	wx5_function(9226);
                if(item.type == "h"){
                    item.ui.height = GameManager.stage.stageHeight - item.ui.y;
                }
                else if(item.type == "y"){
                    item.ui.y = GameManager.stage.stageHeight - item.ui.height;
                }*/
            }

	wx5_function(8848);
            this.scrollRect = new egret.Rectangle(0,0, GameManager_wx5.uiWidth, GameManager_wx5.uiHeight);
            if(GameManager_wx5.isLiuHai())
                this.y = 50
            else
                this.y = 0;
            //this.y = (GameManager.stage.stageHeight - GameManager.uiHeight)/2

            if(this.parent)
                this.resizeFun();
	wx5_function(4);
        }
            
        public cacheFunArguments(...argument:any[]):void{
            this._arguments = argument;
        }
                            
	private wx5_functionX_28007(){console.log(852)}
        public onShow(...argument:any[]):any{
            return this;      
        }
                        
                        		
        public show():any{

            //if(this.LoadFiles && this.LoadFiles.length > 0){
            //    if(this.isStartLoad) return;
            //    this.isStartLoad = true;
            //    LoadingFile.getInstance().loadGroup(this.LoadFiles, this.showFun_517, this,this.loadUI,this.loadData);
            //    this.LoadFiles = [];
            //    return;
            //}
	wx5_function(5455);
            this.showFun_517();
            
            return this;
        }

        //public showToTop(){
        //    if(this.stage)
        //        PopUpManager.addPopUp(this,this.isWindow);
        //}

	private wx5_functionX_28008(){console.log(9519)}
        
        private showFun_517():void{
            this.isStartLoad = false;
            
            if(this.BaseTypeList){
                for(var i=0; i<this.BaseTypeList.length; i++){
                    var _type = this.BaseTypeList[i];
	wx5_function(6357);
                    if( !BaseUI_wx5.UIshowList[ _type ]){
                        BaseUI_wx5.UIshowList[ _type ] = [];
                    }
                    if(BaseUI_wx5.UIshowList[ _type ].indexOf(this) == -1)
                        BaseUI_wx5.UIshowList[ _type ].push(this);
                }
            }
            //1102
//            this.invalidateSkinState();
//            eui.PopUpManager.addPopUp(this,true);
	wx5_function(3559);
            PopUpManager.addPopUp(this,this.isWindow,this.noMV);
            
            if(this.isInitUI){
                this.isHideFlag = false
                if(this._arguments)
                    this.onShow.apply(this,this._arguments);
                else
                    this.onShow();
	wx5_function(5098);

                this.runShowFinish_7484();
            }
            BaseUI_wx5.setStopEevent();
        }

	private wx5_functionX_28009(){console.log(6558)}
        public isHide():boolean{
            return this.isHideFlag
        }
                    
        public hide():any{
            this.beforeHide();
	wx5_function(8737);

            for(var key in this.panelEvents){
                EM_wx5.removeEvent(key, this.panelEvents[key], this);
            }

            if(this.BaseTypeList){
                for(var i=0; i<this.BaseTypeList.length; i++){
                    var _type = this.BaseTypeList[i];
	wx5_function(566);
                    var list = BaseUI_wx5.UIshowList[ _type ];
                    if( list ){
                        for(var j=list.length - 1; j>=0; j--){
                            if(list[j] == self)
                                list.splice(j, 1);
                        }
                    }
                }
            }

	wx5_function(6515);
            this.isHideFlag = true;
            //1102
//            eui.PopUpManager.removePopUp(this);
//            this.validateSkinState();
            PopUpManager.removePopUp(this);
            return this;
        }
        
        private onAddToStage_7345(event:egret.Event) {
            console.log(222);
	wx5_function(6266);
        }
        
        // 批量关闭UI， 用法：this.BaseTypeList = [1, 2];
        // 1xxxx 2xxxx
        public static hideType = function(type){
            var list = BaseUI_wx5.UIshowList[type];
            if(list){
                for(var i=list.length-1; i>=0; i--){
                    list[i].hide();
                }
            }
        }
	private wx5_functionX_28010(){console.log(1984)}
        
        //用来记录和判断一个界面打开后 禁止马上响应交互事件（最常见的是触摸屏幕关闭界面）
        private static openTime: number;
        public static get isStopEevent():boolean{
            return (Date.now() - BaseUI_wx5.openTime < 400); //面板打开后500秒内不响应交互事件（触摸、单击）
        }
        
	private wx5_functionX_28011(){console.log(6148)}
        public static setStopEevent() {
            BaseUI_wx5.openTime = Date.now();
        }
        
        public paySound(key:string, delay?:number):void{
            
        }
	private wx5_functionX_28012(){console.log(1725)}



        public beforeHide(){

        }
	private wx5_functionX_28013(){console.log(2337)}
                
    }
    
    /**
    *  界面基类
    */
    export class BaseWindow_wx5 extends game.BaseUI_wx5 {
	private wx5_functionX_28014(){console.log(8705)}

        public constructor() {
            super(true);
            this.canBGClose = true;
        }

	private wx5_functionX_28015(){console.log(9693)}
        public setTitle(title,h?){
            var bg:any = this.getChildAt(0)
            bg.setTitle(title);
            bg.relateMC = this;
            //if(h)
            //    bg.setBottomHeight(h);
        }
    }
    
    export class BaseItem extends eui.ItemRenderer {
	private wx5_functionX_28016(){console.log(4931)}
        public constructor() {
            super();

        }

        public partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
	wx5_function(4572);
            instance.id = partName;

            //赋予btn图片按钮的行为
            if(instance instanceof eui.Image) {
                if(partName.toLowerCase().indexOf("btn") > -1) {
                }else{
                    instance.touchEnabled = false;
	wx5_function(9740);
                }
            }
            else if(instance instanceof eui.Label){ //label不可交互
                instance.touchEnabled = false;
            }
        }
	private wx5_functionX_28017(){console.log(3422)}
        
        /*
        * 设置html  
        * this.setHtml(this.txt,"<font color=0xff0000>五23424</font>");
        */ 
        public setHtml(txt:eui.Label, str:string):void{
            txt.textFlow = new egret.HtmlTextParser().parser(str);
	wx5_function(2224);
        }
                        
        /*
        * 给按钮添加事件
        * this.addBtnEvent(this.btn, this.btnClick);
        */
	private wx5_functionX_28018(){console.log(5917)}
        public addBtnEvent(btn:eui.UIComponent, fun:any,stopSound?):void{
            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, this);

            if(!stopSound)
            {
                var btnName = (btn['id'] || '').toLocaleLowerCase();
	wx5_function(1519);
                if(btnName.indexOf('btn')!=-1 || btnName.indexOf('button')!=-1)
                    SoundManager.getInstance().addBtnClickEffect(btn);
            }

        }

	private wx5_functionX_28019(){console.log(8984)}
        public createHtml(str:string | number, color?:number, size?:number):string{
            return MyTool.createHtml(str,color,size);
        }
        /*
        * 给按钮移除事件
        * this.removeBtnEvent(this.btn, this.btnClick);
	private wx5_functionX_28020(){console.log(5193)}
        */
        public removeBtnEvent(btn:eui.UIComponent, fun:any, thisObject?:any):void{
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, fun, thisObject || this);
        }
                
    }

}
