// Net: [function(e, t, a) {
//     "use strict";
//     cc._RF.push(t, "b1cc9yRd15CXqFg0vTGKZUk", "Net");

// var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
// function(e) {
//     return typeof e
// }: function(e) {
//     return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
// };
//var i = require("ListenerManager");

//void 0 != cc.ss && null != cc.ss || (cc.ss = {});
//null == cc.ss.io && (cc.sys.isNative ? cc.ss.io = SocketIO: cc.ss.io = require("socket.io"));

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
                if ("disconnect" != e && "string" == typeof a) 
                try {
                    a = JSON.parse(a)
                } catch (e) { }
                t(a)
            };
            this.handlers[e] = a,
            this.sio && this.on(e, a)
        }
    },
    removeAllHandler: function () {
        this.handlers = {},
            this.sio && this.sio.off && !cc.sys.isNative && this.sio.off()
    },
    connect: function (e, t) {
        var a = this;
        this.isExit = false;
            // console.log("connect io = ", cc.ss.io);
            // console.log("connect ip = ", this.ip);

         //  var socket = 
            //  socket;
           !this.sio && (this.sio = new WebSocket(this.ip),
           cc.ss.io=this.sio,
            // this.sio = cc.ss.io.connect(this.ip, {
            //     reconnection: false,
            //     "force new connection": true,
            //     transports: ["websocket", "polling"]
            // },e,t),
            this.sio.onopen = function (event) {
                console.log('sio 连接已经打开 Send Text WS was opened.'+JSON.stringify(event));
                e();
              // a.startHearbeat()
            },
            //从服务器收到信息时的回调函数
            this.sio.onmessage = function (event) {
                var data = JSON.parse(event.data) ;
                console.log("event in callback：" , data);
                 if(data!=null && data.event != null){
                     a.handlers[data.event](event.data);
                    //cc.ss.event[data.event](event.data);
                }

            },

            //链接失败后的回调函数
            this.sio.onerror = function (event) {
                console.log("Send Text fired an error");
                t();
            },
            //链接关闭后的回调函数
            this.sio.onclose = function (event) {
                console.log("WebSocket instance closed.");
            }
             );
            
            this.on("connect",
                function (t) {
                    console.log("connect"),
                    a.sio && (a.sio.connected = true), e(t)
                }),

            this.on("disconnect",
                function (e) {
                    console.log("disconnect"),
                    cc.ss.io.close()
                }),

            this.on("connect_failed",
                function () { }),

            this.on("kick_user_push",
                function (e) {
                   //  i.ListenerManager.getInstance().trigger("kick_user_push", e)
                });
              

        for (var n in this.handlers) {
            var s = this.handlers[n];
            "function" == typeof s && ("disconnect" == n ? this.fnDisconnect = s : this.on(n, s))
        }
     

    },

    startHearbeat: function () {
        this.on("game_pong",
        function () {
            cc.log("进入了心跳回调触发........................")
            e.lastRecieveTime = Date.now(),
            e.delayMS = e.lastRecieveTime - e.lastSendTime
        });

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
            }.bind(this), 2e3),

            setInterval(function() {
                e.sio && Date.now() - e.lastRecieveTime > 1e4 && (console.log("close net 超时关闭net ................................................"), 
                e.close())
            }.bind(this), 500)
        )
    },

    send: function (e, t) {
      //  this.sio && this.sio.connected && (null != t && "object" == (void 0 === t ? "undefined" : n(t)) && (t = JSON.stringify(t)), null == t && (t = ""), this.sio.emit(e, t))
        this.emit(e, t);
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
       // i.ListenerManager.getInstance().trigger("disconnect")
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

    on:function(command , func){
        this.handlers[command] =  func ;
    },

    exec:function(command , data){
        if (this.sio.readyState === WebSocket.OPEN) {
            console.log(command , data);
            data.command = command;
            data.userid = cc.ss.userMgr.userId;
            data.orgi = cc.ss.seckey ;
            data.token = cc.ss.authorization ;
            this.sio.send(JSON.stringify(data));
        }
    },
    emit:function(command , data){
        let param = {
            data : data
        } ;
        this.exec(command , param) ;
    },
    disconnect:function(){
        cc.game.off(cc.game.EVENT_HIDE);
        cc.game.off(cc.game.EVENT_SHOW);
    },


});
//     cc._RF.pop()
// },
// {
//     "./Manager/ListenerManager": "ListenerManager",
//     "socket-io": "socket-io"
// }],