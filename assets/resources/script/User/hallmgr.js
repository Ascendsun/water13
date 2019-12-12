var ssCommon = require("ssCommon");
cc.Class({
    extends: ssCommon,
    properties: {


          //  _gameList: [],
             _selectName: "setup",
            _conf: null  //创建房间设置
      
    },

    onLoad: function () {
     //    this._selectName = "",
      //  cc.sys.localStorage.getItem(cc.ss.CHANNEL + "_select_gamename") ? //获取本地设置的通道名称
       // this._selectName = cc.sys.localStorage.getItem(cc.ss.CHANNEL + "_select_gamename") :
       // cc.ss.userMgr.defaultGame && (this._selectName = cc.ss.userMgr.defaultGame.gamecode),
        this.initView();
       // this.updateGems();
        // var e = [{
        //     type: "updateGems",
        //     caller: this,
        //     listener: this.updateGems
        // }];
        // this.addListenList(e);

        // this.oncreadroom();//这里临时进入房间请求
         this.onBtnCreate();
        
    },

    initView: function() {
        // var e = cc.ss.userMgr.gameServerInfo;
        // for (var t in e) {
        //     var a = e[t];
        //     this._gameList.push(a)
        // }
       // console.log(this._gameList),
      //  this.setgame.removeAllChildren(),
        this._conf = {};
    },

    oncreadroom: function (event, data) {
    //cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
    //cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT)
    cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
    // cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_WIDTH);
     cc.find('Canvas').destroy();
     cc.view.setFrameSize(1280, 720);
     cc.director.loadScene("room");    
    //this.roomPrefabs.active=true;
    // cc.log('加载 进入了 room-------------------------');
    },

    roomCallBack: function (result, self) {//这个回调不知道能不能收到返回消息
        var data = self.parse(result);
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

    onBtnCreate: function() {
        var e = this;
        if ( 1 != this.btnCreateClicked) {
            this.btnCreateClicked = !0,
            setTimeout(function() {
                e.btnCreateClicked = !1
            },
            8e3);
                var n = this.constructRuleConf();
                cc.ss.userMgr.createRoom(n),
                this.saveRoominfoLocal()
        }
    },

    constructRuleConf: function() {//这里需要读取开房设置参数
        if (null == this._conf) return "";
        var e = {};
        for (var t in this._conf) this._conf[t] && (1 == this._conf[t].length ? e[t] = this._conf[t][0] : e[t] = this._conf[t].concat());
        return e
    },

    saveRoominfoLocal: function() {//保存开房间信息到本地
        if (null != this._conf) {
            for (var e in this._conf) cc.sys.localStorage.setItem(this._selectName + "_" + e, JSON.stringify(this._conf[e]));
            cc.sys.localStorage.setItem("sss_select_gamename", this._selectName)
        }
    },

});
