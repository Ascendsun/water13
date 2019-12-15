// GameManager: [function(e, t, a) {
//     "use strict";
//     cc._RF.push(t, "c70a69lfHFAJ7+kzkEbb2EV", "GameManager");
    var n = function(e) {
        return e && e.__esModule ? e: {
        default:
            e
        }
    } (require("../lib/BaseScene"));
    
    cc.Class({
        extends:cc.Component,
        properties: {
            lblProgress: cc.Label,
            loadProgress: cc.ProgressBar,
            reconnectNode: cc.Node,
            _baseNode: null,
            _loginData: null
        },
        onLoad: function() {
            console.log("start load!"),
            this._startTime = Date.now()
            this.initReconnect()
            this.initBaseUI()
        },
        initBaseUI: function() {//预加载游戏资源；
            var self = this;
            console.log("GameManager initBaseUI!");
            // var t = cc.vv.userMgr.gameServerInfo;
            // for (var a in t) {
            //     if (t[a].gametype == cc.vv.userMgr.serverType) {
                 // cc.log(self._loginData);
                    cc.loader.loadRes("prefab/room/base", cc.Prefab,//开房参数用
                    function(t, a, n) {
                        self.loadProgress.progress = t / a;
                        var i = Math.round(t / a * 100);
                        self.lblProgress.string = i.toString() + "%"
                    }
                    ,
                    function(t, a) {
                        self._baseNode = cc.instantiate(a),
                        self.node.addChild(self._baseNode);
                        var n = Date.now() - self._startTime;
                        console.log("load by " + n + " ms"),
                        self.initDone()
                    }
                    );
            //     }
            // }
        },

        initDone: function() {
            this.checkReplay(),
           // this.checkPopMsg(),
            this.setRoomID()
        },
        setRoomID: function() {
            this._loginData && this._loginData.roomid && cc.ss.gameNetMgr && (cc.ss.gameNetMgr.roomId = this._loginData.roomid)
        },
        checkReplay: function() {
            null != cc.ss.replayMgr._replayData ? cc.loader.loadRes("prefabs/game/common/replayTool", cc.Prefab,//接触重连数据如果没有需要用sendlogin 登录~
            function(e, t) {
                var a = cc.instantiate(t);
                this.node.addChild(a, 100);
                var n = a.getChildByName("background");
                n && ("SSS_SERVER_TYPE" == cc.ss.replayMgr._replayData.room_info.gametype ? n.y = -270 : n.y = -26)
            }.bind(this)) : this.sendLogin()
        },
        initReconnect: function() {
            this.reconnectNode.getComponent("ReconnectView").init()
        },
        sendLogin: function() {
            var e = this._loginData,
            t = {
                token: e.token,
                roomid: e.roomid,
                time: e.time,
                sign: e.sign,
                locate: cc.ss.userMgr._locate
            };
            console.log("sendLogin: " + JSON.stringify(t)),
            cc.ss.net.send("login", t),//这里是进入房间全部初始化后发送的登录请求，后台同步数据在login返回
            cc.ss.gameNetMgr && (cc.ss.gameNetMgr.login_result_state = "begin")
        },
        update: function(e) {}
    });