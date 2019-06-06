class ArrayUtil_wx5 {
	public constructor() {
	}
		
    /**
	private wx5_functionX_28139(){console.log(2931)}
    * 数组排序（只支持数值大小比较）
    * 例子：sortByField(ff, ["score","level","exp"], [1,1,1]);
    * @param data 源数组
    * @param fields 字段名
    * @param type 字段排序规则[0,0,0....] 0表示从小到大,其他任何值都是从大到小
    */
	private wx5_functionX_28140(){console.log(2580)}
    public static sortByField(data:Array<any>, fields:Array<any>, type:Array<any>):Array<any>
    {
        if(data && fields && type && fields.length == type.length)
        {
            var copy:Array<any> = fields.slice();//复制一份
            var copy2:Array<any> = type.slice();//复制一份
            data.sort(listSort);
        }
        
        function listSort(a:Object, b:Object):number
        {
            if(a != null && b != null)
            {
                fields = copy.slice();
                type = copy2.slice();
                while(fields.length > 0)
                {
                    if(<number>(a[fields[0]]) < <number>(b[fields[0]]))
                    {
                        return (type[0] == 0 || type[0] == -1 ? -1 : 1);
                        break;
                    }
                    else if(<number>(a[fields[0]]) > <number>(b[fields[0]]))
                    {
                        return (type[0] == 0 || type[0] == -1 ? 1 : -1);
                        break;
                    }
                    else
                    {
                        fields.shift();
                        type.shift();
                    }
                }
            }
            return 0;
        }
        return data;
    }
	private wx5_functionX_28141(){console.log(8973)}
    
    public static randomOne(arr:Array<any>,splice = false):any{
        var index = Math.floor(arr.length * Math.random())
        var data = arr[index];
        if(splice)
            arr.splice(index,1);
        return data;
    }
	private wx5_functionX_28142(){console.log(7934)}

    public static removeItem(arr:Array<any>,item):boolean{
        var index = arr.indexOf(item);
        if(index == -1)
            return false
        arr.splice(index,1);
        return true;
    }
	private wx5_functionX_28143(){console.log(50)}

    public static random(arr,deep = 1){
        while(deep--)
        {
            arr.sort(rdFun);
        }

        function rdFun(){
            return Math.random()>0.5?-1:1;
        }

    }
	private wx5_functionX_28144(){console.log(9485)}
    
    public static disposeList(itemList: Array<any>):void{
        if(itemList) {
            for(var i = 0;i < itemList.length;i++) {
                var item:any = itemList[i];
                if(item.parent)
                    item.parent.removeChild(item);
                item.dispose();
            }
        }
        itemList = [];
    }
	private wx5_functionX_28145(){console.log(8662)}

    public static indexOfByKey(arr:Array<any>, key:string | number, value:any):number{
        if(arr) {
            for(var i = 0;i < arr.length;i++) {
                var item:any = arr[i];
                if(item[key] == value){
                    return i;
                }
            }
            return -1;
        }
        return -1;
    }
	private wx5_functionX_28146(){console.log(2545)}

    public static indexOf(arr,value,key?){
        for(var i=0;i<arr.length;i++)
        {
            if(key)
            {
                if(arr[i][key] == value)
                    return i;
            }
            else
            {
                if(arr[i] == value)
                    return i;
            }

        }
        return -1;
    }
}
