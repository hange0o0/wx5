/**
 *
 * @author 
 *
 */
class Config {
	private wx5_functionX_28021(){console.log(6894)}
	public constructor() {
	}

    public static isDebug: boolean = true;
    public static userHost: string = 'hangegame.com';
    public static host: string = 'hangegame.com';
	private wx5_functionX_28022(){console.log(5769)}
    public static pkServerHost: string = '172.17.196.195';
    public static pkServerPose = 9029;
    public static serverID: number = 1;
    //public static host: string = '172.17.196.195:90';
    public static user_version: number = 1;
    public static version: number = 1;
    public static displayVersion = '1.0.0';
	private wx5_functionX_28023(){console.log(9693)}
    public static pk_version: number = 1;
    public static cdn: string = "";
    public static localResRoot:string = "resource/game_assets/";
    public static localResRoot2:string = "resource/game_assets2/";
    //public static getShare(id){
    //    id = id || Math.ceil(Math.random()*4)
    //   return "resource/game_assets2/share/share"+id+".jpg";
    //}

    public static adHeight = 0
	private wx5_functionX_28024(){console.log(5773)}

    public static openRate = 10;

    public static wx_ad = 'adunit-27946aea5df8df29';
    public static wx_video = 'adunit-42a7a31a8ec11c41';
    public static wx_insert = 'adunit-d29e7adc9a145b48';

    public static myAppID = 'wxe2875716299fa092';




    //public static friendLevel = 3;
    //public static gambleLevel = 20;
    //
    //
    //public static mapLevel = 5;
    //public static dayLevel = 15;
    //public static serverLevel = 25;//卡士二阶
    //public static serverEqualLevel = 45;  //卡士五阶
    //public static leaderLevel = 95;  //
    //public static leaderSkillLevel = 145;  //
	private wx5_functionX_28025(){console.log(1766)}


    public static platform = '';
    public static platformGameidAdd = '';
    public static equalValue = 1000;

    public static getShare(){
        return Config.localResRoot + "share2.jpg"
    }


    public static isZJ: boolean = false;
    public static isQQ: boolean = false;
    public static isWX: boolean = false;
    public static serverPath = 'https://www.hangegame.com/wx5_server/'
    public static init(){
        this.isZJ = window['iszj']
        this.isQQ = window['isQQ']
        this.isWX = window['wx']
        if(this.isZJ)
        {
            this.isWX = false;

            this.wx_ad = '33kcbm3nk8ag2idrl2';
            this.wx_video = '3l4aa0m5imel9kala3';
            this.wx_insert = '';
            this.myAppID = 'tt14f862458bd2e750';
            this.serverPath = 'https://www.hangegame.com/wx5_server/zj/'
        }

        if(this.isQQ)
        {
            this.isWX = false;
            this.wx_ad = '';
            this.wx_video = '';
            this.wx_insert = '';
            this.myAppID = '1109869435';

            this.serverPath = 'https://www.hangegame.com/wx4_server/qq/'
        }
    }

    //是否没有广告
    public static isNoVideo(){
        return this.isQQ && !this.wx_video
    }

    private static createImg(name,path=''){
        return {
           "name":name.replace('.','_'),
           "type":"image",
           "url": path + name
       }
    }
	private wx5_functionX_28027(){console.log(3818)}
    private static createJSON(name,path=''){
        return {
           "name":name.replace('.','_'),
           "type":"json",
           "url": path + name
       }
    }
	private wx5_functionX_28028(){console.log(973)}

    public static initURLRequest() {
        //if(AppQU.isApp) return;

        var url = location.hash || location.search || "";
        var splitStr = location.hash ? '#' : '?';
        //        var obj = new Object();
        if(url.indexOf(splitStr) != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for(var i = 0;i < strs.length;i++) {
                _get[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }

        //if(ConfigQU.other){
        //    if(_get["iscloseSocket"]){
        //        ConfigQU.other.iscloseSocket = _get["iscloseSocket"];
        //        console.warn("设置了iscloseSocket：", _get["iscloseSocket"]);
        //    }
        //}
    }
	private wx5_functionX_28029(){console.log(6194)}

}

class _get {
    public constructor() {
    }
}

