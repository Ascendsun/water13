var ssCommon = require("ssCommon");
var com = require("modol");
cc.Class({
    extends: ssCommon,

    properties: {
   
    },

    onLoad () {
        //通过外部链接进入游戏后，判断是否是被邀请进来的
        if(cc.ss.inviteroom != null){
            var param = {
                token:cc.ss.authorization,
                roomid:cc.ss.inviteroom,
                orgi:cc.ss.user.orgi,
                userid:cc.ss.user.id
            } ;
            cc.ss.socket.exec("searchstatus" , param);
            this.registercallback(this.roomCallBack);
        
    
        this.loadding();
        }
    },

    roomCallBack:function(result , self){
        var data = self.parse(result) ;   
        // com.moduleshuju = data;  
        console.log(data);
        if(data.gamestatus == 'ok'){
            com.jiarufangjian = 1;  
            cc.ss.jiaru = 1;
            cc.ss.type = 'room';
            self.scene("douniu",self); //输入房间号回传结果result为空的情况下加入场景，调用DizhuBegin脚本
            cc.ss.msgid = data.msgid;
        }else if(data.gamestatus == "notexist"){
            self.alert("房间号不存在。");
        }
    },


});
