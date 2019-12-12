// Net: [function(e, t, a) {
//     "use strict";
//     cc._RF.push(t, "b1cc9yRd15CXqFg0vTGKZUk", "Net");

// var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
// function(e) {
//     return typeof e
// }: function(e) {
//     return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
// },

// var i = require("ListenerManager");
// void 0 != cc.ss && null != cc.ss || (cc.ss = {}),
//  null == cc.ss.io && (cc.sys.isNative ? cc.ss.io = SocketIO: cc.ss.io = require("../lib/socket.io"));

cc.Class({
    extends: cc.Component,
    statics: {},
    ctor: function () {
        console.log("Net ctor--我是原来的new"),
            this.ip = "",
            this.cfg = {},
            this.sio = null,
            this.isPinging = !1,
            this.isReconnect = !0,
            this.fnDisconnect = null,
            this.handlers = {},
            this.isExit = !1
    },
    addHandler: function (e, t) {
        if (!this.handlers[e]) {
            var a = function (a) {
                if ("disconnect" != e && "string" == typeof a) try {
                    a = JSON.parse(a)
                } catch (e) { }
                t(a)
            };
            this.handlers[e] = a,
                this.sio && this.sio.on(e, a)
        }
    },
    removeAllHandler: function () {
        this.handlers = {},
            this.sio && this.sio.off && !cc.sys.isNative && this.sio.off()
    },
    connect: function (e, t) {
        var a = this;
        this.isExit = false;
            console.log("connect io = ", cc.ss.io),
            console.log("connect ip = ", this.ip),

            this.sio = cc.ss.io.connect(this.ip, {
                reconnection: false,
                "force new connection": true,
                transports: ["websocket", "polling"]
            },e,t),

            // this.sio.onmessage = function (e) {
            //     console.log("event in callback：" + e);
            //     // var data = self.parse(event.data) ;
            //     // console.log("event in callback：" + event.data);
            //     //  if(data!=null && data.event != null){
            //     //     cc.ss.event[data.event](event.data);
            //     // }
            // };

            this.sio.on("reconnect",
                function () {
                    console.log("reconnection")
                }),

            this.sio.on("connect",
                function (t) {
                    console.log("connect"),
                        a.sio && (a.sio.connected = !0), e(t)
                }),

            this.sio.on("disconnect",
                function (e) {
                    console.log("disconnect"),
                        a.close()
                }),

            this.sio.on("connect_failed",
                function () { }),

            this.sio.on("kick_user_push",
                function (e) {
                    // i.ListenerManager.getInstance().trigger("kick_user_push", e)
                });

        for (var n in this.handlers) {
            var s = this.handlers[n];
            "function" == typeof s && ("disconnect" == n ? this.fnDisconnect = s : this.sio.on(n, s))
        }

      //  this.startHearbeat()

  //  this.addHandler("game_pong",function () {alert("1545")});

    },

    startHearbeat: function () {
       
          this.sio.on("game_pong",
            function () {
                e.lastRecieveTime = Date.now(),
                    e.delayMS = e.lastRecieveTime - e.lastSendTime
            }),

            this.lastRecieveTime = Date.now();
        var e = this;
        e.isPinging || (e.isPinging = true,

            cc.game.on(cc.game.EVENT_HIDE,//监听窗口隐藏
                function () {
                    console.log("event hide on net"),
                        e.ping()
                }),

            setInterval(function () {
                e.sio && e.ping()
            }.bind(this), 2e3)

            // setInterval(function() {
            //     e.sio && Date.now() - e.lastRecieveTime > 1e4 && (console.log("close net 超时关闭net ................................................"), e.close())
            // }.bind(this), 500)
        )
    },
    send: function (e, t) {
      //  this.sio && this.sio.connected && (null != t && "object" == (void 0 === t ? "undefined" : n(t)) && (t = JSON.stringify(t)), null == t && (t = ""), this.sio.emit(e, t))
        this.sio.emit(e, t);
    },
    ping: function () {
        this.sio && !this.isExit && (this.lastSendTime = Date.now(), this.send("game_ping", {time:Date.now()}))
    },
    close: function () {
        console.log("close0000000000000000000"),
            this.delayMS = null,
            this.sio && this.sio.connected && (this.sio.connected = false, this.sio.disconnect()),
            this.sio = null,
            this.fnDisconnect && (this.fnDisconnect(), this.fnDisconnect = null)
        //i.ListenerManager.getInstance().trigger("disconnect")
    },

    test: function (e) {
        var t = null,
            a = {
                account: cc.ss.userMgr.account,
                sign: cc.ss.userMgr.sign,
                serverType: cc.ss.userMgr.serverType,
                ip: this.cfg.ip,
                port: this.cfg.port
            };
        t = cc.ss.http.sendHallReq("/is_server_online", a,
            function (a) {
                e(a.isonline),
                    t = null
            }),
            setTimeout(function () {
                t && (t.abort(), e(!1))
            },
                1500)
    },

    alert: function (message) {
        this.alertForCallBack(message, null);
    },

    alertForCallBack: function (message, func) {
        if (cc.ss.alert.size() > 0) {
            this.alertdialog = cc.ss.dialog.get();
            this.alertdialog.parent = cc.find("Canvas");
            let node = this.alertdialog.getChildByName("message");
            if (node != null && node.getComponent(cc.Label)) {
                node.getComponent(cc.Label).string = message;
            }
            if (func != null) {
                let temp = this.alertdialog.getComponent("BeiMiDialog");
                if (temp != null) {
                    temp.callback(func);
                }
            }
        }
        this.closeloadding();
    },
});
//     cc._RF.pop()
// },
// {
//     "./Manager/ListenerManager": "ListenerManager",
//     "socket-io": "socket-io"
// }],