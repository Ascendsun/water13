
cc.Class({
    extends: cc.Component,
    properties: {
        account: null,
        userId: null,
        headimgurl: "",
        userName: null,
        lv: 0,
        exp: 0,
        coins: 0,
        gems: 0,
        sign: 0,
        ip: "",
        sex: 0,
        pid: 0,
        plv: 0,
        pflag: 0,
        authflag: 0,
        phone: 0,
        cardconfig: null,
        roomData: null,
        enterRoomType: null,
        oldRoomId: null,
        bObserver: !1,
        gameServerInfo: null,
        defaultGame: null,
        recordid: null,
        _locate: null,
        propinfo: null,
        wxGetSignTimes: 0
    },
    guestAuth: function () {//游客登录
        var e = cc.args.account;
        null == e && (e = cc.sys.localStorage.getItem("wx_account")),
            null == e && (e = Date.now(), cc.sys.localStorage.setItem("wx_account", e));
        cc.ss.http.sendLoginReq("/api/login", {
            account: 10,
            token: cc.ss.authorization
        },
            function (e) {
                var t = cc.ss.userMgr;
                0 !== e.errcode ? console.log("游客连接大厅服务器验证账号失败:" + e.errmsg) : 
                (console.log("游客准备连接大厅服务器验证账号" + JSON.stringify(e)),
                    t.account = e.account,
                    t.sign = e.sign,
                    // cc.ss.HALL_IP_IDX = 0,
                    //  cc.sys.localStorage.getItem("HALL_IP_IDX") && (cc.ss.HALL_IP_IDX = cc.sys.localStorage.getItem("HALL_IP_IDX")),
                    // console.log("游客准备连接大厅服务器验证账号2"+JSON.stringify(e)), 
                    //  cc.ss.http.setHallIP(),
                    //   console.log("游客准备连接大厅服务器验证账号3"+JSON.stringify(e)),
                t.login(e,1))//账户|签名|是否变成本地
            })
    },
    onAuth: function (e) {//第三方登录 
        var t = cc.ss.userMgr;
        0 !== e.errcode ? console.log("连接大厅服务器验证账号失败:" + e.errmsg) : 
            (console.log("准备连接大厅服务器验证账号"),
            t.account = e.account, 
            t.sign = e.sign, 
            // cc.ss.HALL_IP_IDX = 0,
            // cc.sys.localStorage.getItem("HALL_IP_IDX") && (cc.ss.HALL_IP_IDX = cc.sys.localStorage.getItem("HALL_IP_IDX")), 
            //  cc.ss.http.setHallIP(),
            t.login(e,0))//账户|签名|是否变成本地
    },
    readyForWx: function () {//微信的登录过程
        if (!(this.wxGetSignTimes > 3)) {
            var e = encodeURIComponent(location.href.split("#")[0]);
            console.log("readyForWx 请求签名时 当前地址栏 " + location.href),
                console.log("readyForWx url = " + e);
            var t = {
                account: cc.ss.userMgr.account,
                sign: cc.ss.userMgr.sign,
                url: e
            },
                a = this;
            cc.ss.http.sendHallReq("/get_wxshare_sign", t,
                function (e) {
                    if (e.errcode && 0 != e.errcode) cc.ss.alert.show("分享初始化错误", e.errmsg,
                        function () {
                            a.readyForWx(),
                                a.wxGetSignTimes++
                        });
                    else {
                        var t = e.appid,
                            i = e.timestamp,
                            s = e.nonceStr,
                            o = e.signature,
                            r = document.createElement("script");
                        r.async = !0,
                            r.src = cc.ss.protocol + "res.wx.qq.com/open/js/jweixin-1.2.0.js",
                            console.log(r.src),
                            document.body.appendChild(r),
                            r.addEventListener("load",
                                function () {
                                    wx.config({
                                        debug: !1,
                                        appId: t,
                                        timestamp: i,
                                        nonceStr: s,
                                        signature: o,
                                        jsApiList: ["checkJsApi", "hideMenuItems", "onMenuShareAppMessage", "getLocation", "chooseWXPay"]
                                    }),
                                        wx.ready(function () {
                                            console.log("UserMgr readyForWx complete!"),
                                                wx.hideMenuItems({
                                                    menuList: ["menuItem:share:timeline", "menuItem:copyUrl", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"]
                                                }),
                                                wx.getLocation({
                                                    type: "wgs84",
                                                    success: function (e) {
                                                        a._locate = {
                                                            latitude: e.latitude,
                                                            longitude: e.longitude,
                                                            speed: e.speed,
                                                            altitude: e.altitude
                                                        },
                                                            console.log("地理位置：" + JSON.stringify(a._locate)),
                                                            n.ListenerManager.getInstance().trigger("wx_getLocation")
                                                    }
                                                }),
                                                cc.ss.utils._isWxReady = !0,
                                                n.ListenerManager.getInstance().trigger("wxSdkReady")
                                        }),
                                        wx.error(function (e) {
                                            console.log("当前地址栏 ", location.href),
                                                console.log("wx.error res: " + JSON.stringify(e)),
                                                console.log("重新请求！"),
                                                a.readyForWx(),
                                                a.wxGetSignTimes++
                                        })
                                })
                    }
                })
        }
    },
    // setDefaultGame: function () {//多游戏模式下设置默认进入游戏项
    //     if (this.gameServerInfo) for (var e in this.gameServerInfo) {
    //         var t = this.gameServerInfo[e];
    //         if (t && 0 == t.hide) {
    //             this.defaultGame = t;
    //             break
    //         }
    //     }
    // },
    login: function (e,a) {//登录到大厅
        //  console.log("登录大厅服务器验证账号");
      var n = this;
      console.log("登录验证成功,保存到本地"+JSON.stringify(e)),
      cc.sys.localStorage.setItem("wx_account", e.account),
      cc.sys.localStorage.setItem("wx_sign", e.sign),
      n.account = e.account,
      n.userId = e.userid,
      n.userName = e.name,
      n.lv = e.lv,
      n.exp = e.exp,
      n.coins = e.coins,
      n.gems = e.gems,
      n.sex = e.sex,
      n.ip = e.ip,
      n.enterRoomType = e.servertype,
      n._locate = {},
      n.pid = e.pid,
      n.plv = e.plv,
      n.pflag = e.pflag,
      n.authflag = e.authflag,
      n.cardconfig = e.cardconfig,
      n.phone = e.phone;
      n.token = e.token;
      cc.ss.authorization = e.token;

      try {
          n.propinfo = JSON.parse(e.propinfo)
        } catch (e) {
            console.log(e)
        };
        
        //n.gameServerInfo = e.gameserverinfo,
        
        
        // if (cc.sys.isNative || "fundebug" in window && (fundebug.metaData = {
        //     userInfo: {
        //         name: n.userName,
        //         userId: n.userId
        //     }
        // }), //这里是登录直接进入房间的入口 
        cc.log('进来了直接------------------------------------');  
        //!cc.sys.isNative &&
        //cc.sys.isNative || !cc.browserUA.wechat || a || (console.log("UserMgr readyForWx"), n.wxGetSignTimes = 0, n.readyForWx()), 
        if (null != cc.args.roomid || null != cc.args.userid) {//选择是重连进入 还是直接进入
            cc.log('进来了重连scene'+cc.director.getScene().name);  
            var t = cc.args.userid,
                i = cc.args.roomid;
            null != t && null == i && (e.roomid ? cc.ss.userMgr.enterRoom(e.roomid,
                function (e) {
                    0 != e.errcode && cc.ss.alert.show("提示", e.errmsg)
                }) : "hall" != cc.director.getScene().name && cc.director.loadScene("hall")),
                null != i && (cc.args.roomid = null, cc.ss.userMgr.enterRoom(i,
                    function (t) {
                        0 != t.errcode && (null != e.roomid ? cc.ss.alert.show("房间", "当前房间[" + i + "]不存在，点击确定将进入原来的房间[" + e.roomid + "]",
                            function () {
                                setTimeout(function () {
                                    cc.ss.userMgr.enterRoom(e.roomid,
                                        function (e) {
                                            0 != e.errcode && cc.ss.alert.show("提示", e.errmsg)
                                        })
                                },
                                    100)
                            },
                            !1) : (cc.ss.waitPopStr = t.errmsg, "hall" != cc.director.getScene().name && cc.director.loadScene("hall")))
                    }))
        } else {null != (i = e.roomid) ? cc.ss.userMgr.enterRoom(i,function (e) {0 != e.errcode && cc.ss.alert.show("提示", e.errmsg)}) : "hall" != cc.director.getScene().name && cc.director.loadScene("hall");
        cc.log('进来了直接进入hall'+cc.director.getScene().name);  
     }

        
    },

    showLoginBtn: function (e) {//显示登录按钮 微信|电话|闲聊
        cc.sys.isMobile ? cc.browserUA.wechat ? cc.find("Canvas/btn_weixin").active = e : cc.browserUA.xianliao ?
            (cc.find("Canvas/btn_xianliao").active = e,
                cc.find("Canvas/btn_tel").active = e,
                this.show2btnsPos(cc.find("Canvas/btn_xianliao"),
                    cc.find("Canvas/btn_tel"))) : cc.find("Canvas/btn_tel").active = e :
            cc.sys.os == cc.sys.OS_WINDOWS && (cc.browserUA.wechat ?
                cc.find("Canvas/btn_weixin").active = e : (cc.find("Canvas/btn_weixin").active = e,
                    cc.find("Canvas/btn_tel").active = e,
                    this.show2btnsPos(cc.find("Canvas/btn_weixin"), cc.find("Canvas/btn_tel")))),
            cc.find("Canvas/xieyi").active = e
    },

    enterRoom: function (e, t) {//进入房间登录
        var a = this;
        console.log("enterRoom id=" + e);
        var n = cc.ss.userMgr.bObserver,
            i = !0;
        cc.sys.isNative || (i = "https:" == window.location.protocol.toLowerCase());
        var s = {
            account: cc.ss.userMgr.account,
            sign: cc.ss.userMgr.sign,
            roomid: e
            // isObserver: n,
            // secure: i
        };
       /// cc.ss.wc.show("正在进入房间 " + e),
            cc.ss.http.sendHallReq("/api/enter_private_room", s,
                function (e) {
                    if (0 !== e.errcode) if (cc.ss.wc.hide(), -99 == e.errcode || -97 == e.errcode) null == e.data.roomid ?
                        "hall" != cc.director.getScene().name && cc.director.loadScene("hall") : cc.ss.alert.show("房间", e.errmsg,
                            function () {
                                setTimeout(function () {
                                    cc.ss.userMgr.enterRoom(e.data.roomid,
                                        function (e) {
                                            0 != e.errcode && cc.ss.alert.show("提示", e.errmsg)
                                        })
                                },
                                    100)
                            },
                            !1);
                    else if (- 98 == e.errcode) {
                        var n = e.errmsg ? e.errmsg : "加入房间失败";
                        cc.ss.alert.show("提示", n)
                    } else cc.ss.wc.hide(),
                        t && t(e);
                    else cc.ss.wc.hide(),
                        cc.ss.userMgr.enterRoomType = e.servertype,
                        t && t(e),
                        a.connectGameServer(e.servertype, e)
                })
    },

    createRoom: function (t) {
        var a = this;
        cc.log('创建房间..............');
        // cc.ss.userMgr.enterRoomType = e,
        // cc.ss.userMgr.gameType = e;
        var n = {
            account: cc.ss.userMgr.account,  //Math.round(Math.random()*15),//
            token:cc.ss.authorization,
            sign: cc.ss.userMgr.sign,
            conf: JSON.stringify(t)//开房设置项内容
        };
        console.log(n),
          //  cc.ss.wc.show("正在创建房间"),
            cc.ss.http.sendHallReq("/api/create_private_room", n,
                function (t) {
                    console.log("创建房间返回参数：/create_private_room"+JSON.stringify(n)),
                    0 !== t.errcode ? ( cc.ss.wc.hide(), 2222 == t.errcode ? cc.ss.alert.show("提示", "房卡不够,请先充值后再创建房间") : cc.ss.alert.show("提示", t.errmsg)) : (a.connectGameServer(t))//cc.ss.utils.getUserGems(),
                })
    },

    connectGameServer: function (t) {
        cc.ss.net.ip = "ws://"+t.ip + ":" + t.port+"/bm/game?userid="+t.userid,//后台IP地址是动态返回的
            cc.ss.net.cfg = {
                ip: t.ip,
                port: t.port
            },
            console.log(cc.ss.net.ip),
            console.log(cc.ss.net.cfg),
            console.log("connectGameServer-------------"+JSON.stringify(t));
           //cc.ss.wc.show("正在进入房间"),
            cc.ss.net.connect(function () {
               // cc.ss.userMgr.serverType = e,
                console.log("onConnectOK---------------------");
                var a = cc.director.getScene();
                if (console.log("cur scene is ", a.name), "room" == a.name) {//这里是区分是登录，还是直接进入房间，可能是用于回房后的重连
                    var n = {
                        token: t.token,
                        roomid: t.roomid,
                        time: t.time,
                        sign: t.sign,
                        locate: t.locate
                    };
                       console.log("connectGameServer sendLogin: ----------" + JSON.stringify(n)),
                        cc.ss.net.send("login", n),//这里登录
                        cc.ss.gameNetMgr && (cc.ss.gameNetMgr.login_result_state = "begin")
                } else {
                    cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);///////////后加旋转屏幕
                    cc.find('Canvas').destroy();
                    cc.view.setFrameSize(1280, 720);
                    cc.director.loadScene("room",
                    function () {
                        console.log("load complete!---------------------------------------------------------/////////////////**************"),
                        console.log(t);
                        var e = cc.find("Canvas").getComponent("GameManager");
                        e && (e._loginData = t)//登录后将消息保存到了节点
                    })
                }
            },

            function () {
                console.log("failed.")
                //cc.ss.wc.hide()
            })
    }

 });
