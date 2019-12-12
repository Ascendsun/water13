var ssCommon = require("ssCommon");
var com = require("modol");
cc.Class({
    extends: ssCommon,
    properties: {

        numdata: {
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function () {
        // this.roomid = new Array() ;
    },

    onClick: function (event, data) {
        // cc.ss.audio.playSFX("btn_click");
       
        if(this.numdata.string.length < 6){
            this.numdata.string += data;
        }
        if (this.numdata.string.length == 6) {
            console.log("ret:------------------"+this.numdata.string );
           this.onInputFinished(this.numdata.string);
        }
    },

    onInputFinished: function(e) {
        cc.ss.userMgr.enterRoom(e,
        function(e) {
            console.log("ret:" + e),
            0 == e.errcode ? this.node.active = !1 : (cc.ss.alert.show("提示", e.errmsg), this.onResetClicked())
        }.bind(this))
    },

    roomCallBack: function (result, self) {
        var data = self.parse(result);
        // com.moduleshuju = data;  
        console.log(data);
        if (data.gamestatus == 'ok') {
            com.jiarufangjian = 1;
            cc.ss.jiaru = 1;
            cc.ss.type = 'room';
            self.scene("douniu", self); //输入房间号回传结果result为空的情况下加入场景，调用DizhuBegin脚本
            cc.ss.msgid = data.msgid;
        } else if (data.gamestatus == "notexist") {
            self.alert("房间号不存在。");
        }
    },

    //删除
    onDeleteClick: function () {
        // cc.ss.audio.playSFX("btn_click");
        this.numdata.string = this.numdata.string.substr(0,this.numdata.string.length - 1);
    },
    //重输
    onCleanClick: function () {
        // cc.ss.audio.playSFX("btn_click");
        this.numdata.string = '';
    },
  
    // update (dt) {},
});
