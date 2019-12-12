var Base64 = require("Base64");
//var chcode = require("modol");
cc.Class({
    extends: cc.Component,
    statics: {},

    // ctor: function() {
    //     console.log("Net ctor"),
    //     this.ip = '',
    //     this.cfg = {},
    //     this.sio = null,
    //     this.isPinging = !1,
    //     this.isReconnect = !0,
    //     this.fnDisconnect = null,
    //     this.handlers = {},
    //     this.isExit = !1
    // },

    // onLoad: function () {
    //     cc.ss.room_callback = null;  //加入房间回调函数
    // },

    ready: function () {
        var check = false;
        if (cc.ss) {
            check = true;
        } else {
            this.scene("login", this);
        }
        return check;
    },
    
    connect: function () {
        let self = this;
        this.isExit = !1;

      //  this.sio = window.io.connect(cc.ss.http.wsURL + "/bm/game?userid="+cc.ss.user.id, { "connection": true });
      
        // console.log("connect io = ", cc.ss.io),
        // console.log("connect ip = ", this.ip),

        this.sio = window.io.connect(cc.ss.http.wsURL + "/bm/game?userid="+cc.ss.user.id, {
            reconnection: !1,
            "force new connection": !0,
            transports: ["websocket", "polling"],
            get sendgamestatus(){self.sendgamestatus()}
        }),

        // this.sio.on("reconnect",
        // function() {
        //     console.log("reconnection")
        // }),

        // this.sio.on("connect",
        // function(t) {
        //     console.log("connect"),
        //     a.sio && (a.sio.connected = !0),
        //     e(t)
        // }),

        // this.sio.on("disconnect",
        // function(e) {
        //     console.log("disconnect"),
        //     a.close()
        // }),

        // this.sio.on("connect_failed",
        // function() {}),

        // this.sio.on("kick_user_push",
        // function(e) {
        //     i.ListenerManager.getInstance().trigger("kick_user_push", e)
        // });
        // for (var n in this.handlers) {
        //     var s = this.handlers[n];
        //     "function" == typeof s && ("disconnect" == n ? this.fnDisconnect = s: this.sio.on(n, s))
        // }
        
        cc.log('创建了sio连接....');

        this.sio.on('connect', function (data) {
            console.log("connected to server");
           });

           this.sio.on('disconnect', function (data) {
            //这里是处理服务器断开主动断开的请求；
           console.log("disconnected from server");
        });

        // var param = {
        //     token: cc.ss.authorization,
        //     orgi: cc.ss.user.orgi,
        //     userid: cc.ss.user.id
        // };
        // this.sio.exec("gamestatus", param);

        this.sio.on("gamestatus", function (result) {
            cc.log('收到了gamestatus'+ result);
            if (result != null) {
                var data = self.parse(result);

                if (data.gamestatus='notready'){//没有准备进入大厅；
                    self.scene('hall', self);//进入大厅；

                }else
                if (data.searchroomid == null) {
                    if (cc.ss.extparams != null) {
                        if (data.gamestatus == "playing" && data.gametype != null) {
                            /**
                             * 修正重新进入房间后 玩法被覆盖的问题，从服务端发送过来的 玩法数据是 当前玩家所在房间的玩法，是准确的
                             */
                            if (cc.ss.extparams != null) {
                                cc.ss.extparams.playway = data.playway;
                                cc.ss.extparams.gametype = data.gametype;
                                if (data.cardroom != null && data.cardroom == true) {
                                    cc.ss.extparams.gamemodel = "room";
                                }
                            }
                            self.scene(data.gametype, self);
                        } else if (data.gamestatus == "timeout") { //会话过期，退出登录 ， 会话时间由后台容器提供控制
                            cc.ss.sessiontimeout = true;
                            self.alert("登录已过期，请重新登录");
                        } else {
                            console.log('创建房间加入返回参数:' + data);
                            console.log(data);
                            if (data.gamestatus == null || data.gamestatus != 'repeat' || data.gamestatus == "notready") {
                                self.scene('hall', self);
                            } else {
                                self.closeloadding();
                            }
                        }
                    }
                } else {
                    cc.ss.jiaru = 1;
                    cc.ss.searchroomid = data.searchroomid;
                    self.scene('hall', self);
                }
                cc.ss.gamestatus = data.gamestatus;
            }
        });

        /**
         * 加入房卡模式的游戏类型 ， 需要校验是否是服务端发送的消息
         */
        this.sio.on("searchstatus", function (result) {
            //result 是 GamePlayway数据，如果找到了 房间数据，则进入房间，如果未找到房间数据，则提示房间不存在
            if (result != null && cc.ss.room_callback != null) {
                cc.ss.room_callback(result, self);
            }
        });
        return this.sio;
    },
    
    sendgamestatus:function(){//登录时后去登录状态信息
    var param = {
        token: cc.ss.authorization,
        orgi: cc.ss.user.orgi,
        userid: cc.ss.user.id
    };
    this.sio.exec("gamestatus", param);
    cc.log('send:gamestatus')
    },


    disconnect: function () {
        if (this.sio != null) {
            this.sio.disconnect();
            this.sio = null;
        }
    },

    addHandler: function(e, t) {
        if (!this.handlers[e]) {
            var a = function(a) {
                if ("disconnect" != e && "string" == typeof a) try {
                    a = JSON.parse(a)
                } catch(e) {}
                t(a)
            };
            this.handlers[e] = a,
            this.sio && this.sio.on(e, a)
        }
    },

    removeAllHandler: function() {
        this.handlers = {},
        this.sio && this.sio.off && !cc.sys.isNative && this.sio.off()
    },

    registercallback: function (callback) {
        cc.ss.room_callback = callback;
    },
    cleancallback: function () {
        cc.ss.room_callback = null;
    },
    getCommon: function (common) {
        //查找结点
        var object = cc.find("Canvas/script/" + common);
        //获取节点上的组件
        return object.getComponent(common);
    },

    loadding: function () {
        if (cc.ss.loadding.size() > 0) {
            this.loaddingDialog = cc.ss.loadding.get();
            this.loaddingDialog.parent = cc.find("Canvas");
            if (this.loaddingDialog.getChildByName('splash').getComponent(cc.Widget) != null) {
                this.loaddingDialog.getChildByName('splash').getComponent(cc.Widget).target = cc.find('Canvas');
                this.loaddingDialog.getChildByName('splash').getComponent(cc.Widget).isAlignLeft = true;
                this.loaddingDialog.getChildByName('splash').getComponent(cc.Widget).isAlignRight = true;
            } else {
                this.loaddingDialog.getChildByName('splash').addComponent(cc.Widget);
                this.loaddingDialog.getChildByName('splash').getComponent(cc.Widget).target = cc.find('Canvas');
                this.loaddingDialog.getChildByName('splash').getComponent(cc.Widget).isAlignLeft = true;
                this.loaddingDialog.getChildByName('splash').getComponent(cc.Widget).isAlignRight = true;
            }

            this._animCtrl = this.loaddingDialog.getComponent(cc.Animation);
            var animState = this._animCtrl.play("loadding");
            animState.wrapMode = cc.WrapMode.Loop;
        }
    },

    alert: function (message) {
        this.alertForCallBack(message, null);
    },
    alertForCallBack: function (message, func) {
        if (cc.ss.dialog.size() > 0) {
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
    closeloadding: function () {
        //按照路径查找节点，即使节点处于非活动状态，该函数仍然会返回该节点
        if (cc.find("Canvas/loadding")) {
            //
            cc.ss.loadding.put(cc.find("Canvas/loadding"));
        }
    },
    closeOpenWin: function () {
        if (cc.ss.openwin != null) {
            //销毁该对象，并释放所有它对其它对象的引用。
            cc.ss.openwin.destroy();
            cc.ss.openwin = null;
        }
    },
    openWin: function (prefab) {
        if (prefab != null) {
            cc.ss.openwin = cc.instantiate(prefab);
            cc.ss.openwin.parent = this.root();
        }
    },
    pvalistener: function (context, func) {
        cc.ss.listener = func;
        cc.ss.context = context;
    },
    cleanpvalistener: function () {
        if (cc.ss != null) {
            cc.ss.listener = null;
            cc.ss.context = null;
        }
    },
    pva: function (pvatype, balance) {   //客户端资产变更（仅显示，多个地方都会调用 pva方法）
        if (pvatype != null) {
            if (pvatype == "gold") {
                cc.ss.user.goldcoins = balance;
            } else if (pvatype == "cards") {
                cc.ss.user.cards = balance;
            } else if (pvatype == "diamonds") {
                cc.ss.user.diamonds = balance;
            }
        }
    },
    updatepva: function () {
        if (cc.ss != null && cc.ss.listener != null && cc.ss.context != null) {
            cc.ss.listener(cc.ss.context);
        }
    },
    subsidy: function () {
        var needsubsidy = false;
        if (cc.ss.user.goldcoins <= 0) {
            let self = this;
            needsubsidy = true;
            //提示是否需要破产补助 , 提示的时候，需要查询服务端是否当天的 补助次数已用完，如果还有剩余补助次数，则开始补助，否则直接进入商城提示兑换 ， 剩余的补助次数，在服务器推送 PVA信息的时候，同时推送过来
            if (cc.ss.data.subsidy == true && cc.ss.data.subtimes > 0 && cc.ss.data.subgolds > 0 && cc.ss.data.lefttimes > 0) {
                // cc.loader.loadRes("prefab/welfare/over", function (err, prefab) {
                //     cc.ss.openwin = cc.instantiate(prefab);
                //     cc.ss.openwin.parent = cc.ss.context.root();
                // });
                let tipmsg = "金币不足，您可以领取救济金。";
                if (cc.ss.data.submsg != null) {
                    tipmsg = cc.ss.data.submsg;
                }
                this.alertForCallBack(tipmsg, function () {
                    self.welfareDialog();
                });
            } else {
                let recmsg = "金币不足，请充值。";
                if (cc.ss.data.recmsg != null) {
                    recmsg = cc.ss.data.recmsg;
                }
                this.alertForCallBack(recmsg, function () {
                    self.shopDialog();
                });
            }
        }
        return needsubsidy;
    },
    welfareDialog: function () {
        cc.loader.loadRes("prefab/welfare/over", function (err, prefab) {
            cc.ss.openwin = cc.instantiate(prefab);
            cc.ss.openwin.parent = cc.ss.context.root();
        });
    },
    shopDialog: function () {
        cc.loader.loadRes("prefab/welfare/shop", function (err, prefab) {
            cc.ss.openwin = cc.instantiate(prefab);
            cc.ss.openwin.parent = cc.ss.context.root();
        });
    },
    resize: function () {
        //let win = cc.director.getWinSize() ;
        let win = cc.winSize;
        cc.view.setDesignResolutionSize(win.width, win.height, cc.ResolutionPolicy.EXACT_FIT);
    },
    closealert: function () {
        if (cc.find("Canvas/alert")) {
            cc.ss.dialog.put(cc.find("Canvas/alert"));
        }
    },
    //加载场景
    scene: function (name, self) {
        console.log('scene加载');
        //预加载场景，可以随时用cc.director.loadScene来启动场景
         cc.director.preloadScene(name, function () {
            if (cc.ss) {
                self.closeloadding(self.loaddingDialog);
            }
          cc.director.loadScene(name);
        });

    },
    
    preload: function (extparams, self) {
        this.loadding();
        /**
         *切换游戏场景之前，需要先检查是否 是在游戏中，如果是在游戏中，则直接进入该游戏，如果不在游戏中，则执行 新场景游戏
         */
        cc.ss.extparams = extparams;
        /**
         * 发送状态查询请求，如果玩家当前在游戏中，则直接进入游戏回复状态，如果玩家不在游戏中，则创建新游戏场景
         */
        var param = {
            token: cc.ss.authorization,
            orgi: cc.ss.user.orgi,
            userid: cc.ss.user.id
        };
        cc.ss.net.exec("gamestatus", param);
    },

    root: function () {
        //查找Canvas节点
        return cc.find("Canvas");
    },
    decode: function (data) {
        return Base64.decode(data);
    },

    parse: function (result) {
        return JSON.parse(result);
    },
    reset: function (data, result) {
        //放在全局变量
        if (data.token != null) {
            cc.ss.authorization = data.token.id;
            cc.sys.localStorage.setItem("token", data.token.id);
        }
        if(data.invitation_roomid != null){
            cc.ss.inviteroom = data.invitation_roomid;
        }
        cc.ss.usersign = data.userSign;
        cc.ss.user = data.data;
        cc.ss.games = data.games;
        cc.ss.gametype = data.gametype;
        cc.ss.usermsg = data.usermsg;
        cc.ss.data = data;
        cc.ss.playway = null;
    },
    logout: function () {
        this.closeOpenWin();
        cc.ss.authorization = null;
        cc.ss.user = null;
        cc.ss.games = null;

        cc.ss.playway = null;

        this.disconnect();
    },
    socket: function () {
        let socket = cc.ss.net;
        if (socket == null) {
            socket = this.connect();
        }
        return socket;
    },
    map: function (command, callback) {
        if (cc.ss != null && cc.ss.routes[command] == null) {
            cc.ss.routes[command] = callback || function () { };
        }
    },
    cleanmap: function () {
        if (cc.ss != null && cc.ss.routes != null) {
            //cc.ss.routes.splice(0 , cc.ss.routes.length) ;
            for (var p in cc.ss.routes) {
                delete cc.ss.routes[p];
            }
        }
    },
    route: function (command) {
        return cc.ss.routes[command] || function () { };
    },
    /**
     * 解决Layout的渲染顺序和显示顺序不一致的问题
     * @param target
     * @param func
     */
    layout: function (target, func) {
        if (target != null) {
            let temp = new Array();
            let children = target.children;
            for (var inx = 0; inx < children.length; inx++) {
                temp.push(children[inx]);
            }
            for (var inx = 0; inx < temp.length; inx++) {
                target.removeChild(temp[inx]);
            }

            temp.sort(func);
            for (var inx = 0; inx < temp.length; inx++) {
                temp[inx].parent = target;
            }
            temp.splice(0, temp.length);
        }
    },

});
