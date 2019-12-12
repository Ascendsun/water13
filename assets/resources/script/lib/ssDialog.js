var ssCommon = require("ssCommon");
cc.Class({
    extends: ssCommon,

    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function(e){
            e.stopPropagation();
        });
        /**
         * 关闭ALERT的回调动作
         */
        this.node.on("close", function (event) {
            if(cc.ss!=null && cc.ss.sessiontimeout == true){
                cc.ss.sessiontimeout = null;
                self.scene("login" , self) ;
            }
            event.stopPropagation();
        });
    },
    onClose:function(){
        let dialog = cc.find("Canvas/alert") ;
        cc.ss.alert.put(dialog);
        // this.node.dispatchEvent( new cc.Event.EventCustom("close", true) );
    }


});
