class TipsUI extends game.BaseContainer_wx5{
	private static instancePool = [];
	private static showTips = [];
	public static getInstance() {
		var instance = this.instancePool.pop()
		if (!instance)
			instance = new TipsUI();
		return instance;
	}
	private wx5_functionX_28237(){console.log(7299)}

    private text: eui.Label;

	private timer;
	public toY

	private wx5_functionX_28238(){console.log(2004)}
	public constructor() {
		super();
		this.skinName = 'TipsUISkin';
		this.touchChildren = this.touchEnabled = false;
	}

	private wx5_functionX_28239(){console.log(6372)}
	public show(v?,cd?){
		for(var i=0;i<TipsUI.showTips.length;i++)
		{
			var item =  TipsUI.showTips[i];
			item.toY -= 70
			egret.Tween.removeTweens(item);
	wx5_function(9919);
			var tw = egret.Tween.get(item);
			tw.to({y:item.toY},Math.abs(item.toY - item.y)*2);
		}
		TipsUI.showTips.push(this)
		egret.clearTimeout(this.timer);

	wx5_function(6559);

		//this.verticalCenter = 0;
		GameManager_wx5.stage.addChild(this);
		MyTool.setColorText(this.text,v);
		//if(this.text.numLines > 1)
		//	this.text.textAlign = 'left'
		//else
		//	this.text.textAlign = 'center'
		this.visible = false
		this.timer = egret.setTimeout(this.onTimer_1959,this,cd + (TipsUI.showTips.length-1)*100);
		egret.setTimeout(function(){
			this.visible = true
		},this,(TipsUI.showTips.length-1)*100);
	wx5_function(5720);

		this.validateNow();
		this.x =  (GameManager_wx5.stage.stageWidth -this.width)/2
		this.y =  GameManager_wx5.stage.stageHeight * 0.2;
		this.toY =  this.y;
	}
	private wx5_functionX_28240(){console.log(4641)}

	private onTimer_1959(){
		this.hide();
	}

	public hide(){
		egret.clearTimeout(this.timer);
	wx5_function(84);
		MyTool.removeMC(this);
		PopUpManager.testShape();
		TipsUI.instancePool.push(this)
		var index = TipsUI.showTips.indexOf(this)
		if(index != -1)
			TipsUI.showTips.splice(index,1)
	}
	private wx5_functionX_28241(){console.log(9795)}


}
