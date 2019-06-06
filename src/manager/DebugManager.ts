class DebugManager {
    private static _instance:DebugManager;
    private static cd = 0
    public static getInstance():DebugManager {
        if (!this._instance)
            this._instance = new DebugManager();
        return this._instance;
    }
	private wx5_functionX_28075(){console.log(6518)}

    public jumpPK = false;
    public stop = 0;
    public winCardArr = [];
    public finishFun = function(winArr){return false}

	private wx5_functionX_28076(){console.log(8251)}

    public constructor() {

    }


	private wx5_functionX_28077(){console.log(8762)}
    public printDetail = false;  //打印胜出怪物
    public winMonster = {}
    public winUseCard = []

    public outPut = []

	private wx5_functionX_28078(){console.log(5173)}
    public callCost = 0
    public callLevel = 0
    public callNum = 0
    public repeatNum = 0

    public addTime = 0;
	private wx5_functionX_28079(){console.log(4225)}
    public addTimeCD(t){
        this.addTime += t;
        SharedObjectManager_wx5.getInstance().setMyValue('addTime',this.addTime)


    }
	private wx5_functionX_28080(){console.log(9665)}





}

//DM.testCard('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16','1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16')
//DM.testMV('mv2',10,[30,31])
//javascript:DM.showAllMV();
//Net.send('clean_server')
//DM.test();
//DM.createHang(0,5);
//DM.stop = 1;