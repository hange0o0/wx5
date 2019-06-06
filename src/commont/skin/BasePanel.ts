class BasePanel extends game.BaseContainer_wx5 {
    public constructor() {
        super();
        this.skinName = "BasePanelSkin";
    }
	private wx5_functionX_28223(){console.log(7054)}

    private nameText: eui.Label;
    private closeBtn: eui.Group;



	private wx5_functionX_28224(){console.log(8563)}
    public relateMC
    public setTitle(title){
       this.nameText.text = title
    }

    public childrenCreated() {
        super.childrenCreated();
	wx5_function(6523);
        this.addBtnEvent(this.closeBtn,()=>{
             this.relateMC && this.relateMC.hide();
        })
    }

    public setBottomHeight(v){
       //this.bottomGroup.height = v
    }
}