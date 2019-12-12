
//    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
//    function(e) {
//        return typeof e
//    }: function(e) {
//        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
//    },
//    i = function(e) {
//        return e && e.__esModule ? e: {
//        default:
//            e
//        }
//    } (require("../lib/BaseScene"));
//    String.prototype.format = function(e) {
//        if (arguments.length > 0) {
//            var t = this;
//            if (1 == arguments.length && "object" == (void 0 === e ? "undefined": n(e))) for (var a in e) {
//                var i = new RegExp("({" + a + "})", "g");
//                t = t.replace(i, e[a])
//            } else for (var s = 0; s < arguments.length; s++) {
//                if (void 0 == arguments[s]) return "";
//                var o = new RegExp("({[" + s + "]})", "g");
//                t = t.replace(o, arguments[s])
//            }
//            return t
//        }
//        return this
//    };

var ssCommon = require("ssCommon");
//var Base64 = require("Base64");

cc.Class({
    extends: ssCommon,
    properties: {
        jindutiao: {
            default: null,
            type: cc.ProgressBar
        },

        jindunumber: {
            default: null,
            type: cc.Label
        },

        public: {
            default: null,
            type: cc.Label
        },

        btnGuest: cc.Node,
        xyToggle: cc.Toggle,
        sprLogo: cc.Sprite,
        desklogin: cc.Node
    },
  
    onLoad() {
    // this.setPreLoadList([{
    //     name: "ProtocolView"
    // }]),
    //cc.find("Canvas/btn_weixin").active = false,
    // cc.find("btn_xianliao",this).active = false,
    // this.jquery = window.jQuery,
    // this.APPID = cc.ss.SI.appid,
    // this.NETAPPID = cc.ss.SI.netappid
    this.testloading();
    }, 

    testloading: function () {////////////////////////////////////////////测试登录入口
       cc.log('发送登录请求...');
       // var macid =Math.floor(Math.random() * (16 - 1)) + 1;;//随机测试登录
       // var tokenid = cc.sys.localStorage.getItem('tokenid');
       // cc.ss.http.sendRequest("/api/find?macid=" + macid + '&token=' + tokenid, this.acsucess, this.acerror, this);
      cc.ss.userMgr.guestAuth();
    },

   acsucess: function (result, object) {
        console.log('------------------------------------------------------------');
        console.log(result);
        var data = JSON.parse(result);
        cc.log(data);
        if (data.status == false) {
            cc.log('登录失败');
            cc.find('start/login').destroy();//释放登录
        } else {
            if (data.submsg != 'online') {
                //放在全局变量
                object.reset(data, result);//复位连接数据
                cc.ss.gamestatus = data.data.gamestatus;
                cc.log('开始加载大厅 登录状态----------'+cc.ss.gamestatus);
               // object.connect();

            //    cc.director.preloadScene(name, function () {
            //     if (cc.ss) {
                  //  self.closeloadding(self.loaddingDialog);
                // }
               cc.director.loadScene('hall');
            //   });
              
                //object.loadding();
            } else {
                cc.log('登录');
                object.alert('账号已登录');
            }

        }
    },

    acerror: function (object) {
        object.closeloadding();
        object.alert("网络异常，服务访问失败");
    },

});


// start: function() {
//     this.checkSysIsWechat();
//     var e = this,
//     t = cc.args.code,
//     a = cc.args.state;
//     if (1 == cc.sys.localStorage.getItem("changeaccount")) return cc.sys.localStorage.removeItem("changeaccount"),
//     void e.setBtnState(!0);
//     cc.sys.isNative || history.length <= 1 && (t = null);
//     var n = cc.sys.localStorage.getItem("wx_last_code");
//     if (t && n == t && (t = null), console.log("login-start-url", window.location.href), a) {
//         var i = {};
//         try {
//             i = JSON.parse(decodeURIComponent(a))
//         } catch(e) {
//             var s = cc.args.extra;
//             try {
//                 var o = decodeURIComponent(s);
//                 i = JSON.parse(o)
//             } catch(e) {}
//         }
//         console.log("state extraparam=" + JSON.stringify(i)),
//         i.roomid && !cc.args.roomid && (cc.args.roomid = i.roomid),
//         i.userid && !cc.args.userid && (cc.args.userid = i.userid),
//         i.recordid && !cc.args.recordid && (cc.args.recordid = i.recordid)
//     } else if (cc.args.extra) {
//         var r = {};
//         try {
//             var c = decodeURIComponent(cc.args.extra);
//             r = JSON.parse(c)
//         } catch(e) {}
//         console.log("extraparam=" + JSON.stringify(r)),
//         r.roomid && !cc.args.roomid && (cc.args.roomid = r.roomid),
//         r.userid && !cc.args.userid && (cc.args.userid = r.userid),
//         r.recordid && !cc.args.recordid && (cc.args.recordid = r.recordid)
//     }
//     if (cc.args.userid && cc.sys.localStorage.setItem("pid", cc.args.userid), null == t || "" == t) {
//         var h = cc.args.account,
//         l = null;
//         if (null == h && (h = cc.sys.localStorage.getItem("wx_account"), l = cc.sys.localStorage.getItem("wx_sign")), null != h && h && null != l && l) {
//             console.log("读取到本地[微信/闲聊]账号:" + h + "密码" + l),
//             this.setBtnState(!1);
//             var d = {
//                 errcode: 0,
//                 account: h,
//                 sign: l
//             };
//             cc.ss.userMgr.onAuth(d)
//         } else {
//             console.log("读取不到本地[微信/闲聊]账号密码或者url里指定了account字段");
//             var u = {
//                 account: cc.ss.userMgr.account,
//                 sign: cc.ss.userMgr.sign,
//                 type: "control",
//                 version: cc.VERSION
//             };
//             cc.ss.http.sendLoginReq("/get_message", u,
//             function(t) {
//                 0 !== t.errcode ? console.log(t.errmsg) : e.setBtnState(!0)
//             }.bind(this))
//         }
//     } else {
//         console.log("[微信/闲聊]请求code返回:", t),
//         console.log("重置URL!"),
//         cc.args.code = null,
//         cc.sys.localStorage.setItem("wx_last_code", t),
//         this.setBtnState(!1);
//         var g = cc.sys.localStorage.getItem("pid");
//         cc.browserUA.xianliao ? this.H5_XLGetToken(t, g) : this.H5_WXGetToken(t, g)
//     }
// },

// GetRequest: function () {
//     var url = location.search; //获取url中"?"符后的字串
//     var theRequest = new Object();
//     if (url.indexOf("?") != -1) {
//         var str = url.substr(1);
//         var strs = str.split("&");
//         var stri = '/';
//         for (var i = 0; i < strs.length; i++) {
//             var inxone = decodeURI(strs[i].split("=")[1]);
//             var start = inxone.length - stri.length;
//             var arr = inxone.substr(start, stri.length);
//             if (arr == stri) {
//                 inxone = inxone.substr(0, inxone.length - 1);
//             }
//             theRequest[strs[i].split("=")[0]] = inxone;
//         }
//     }
//     return theRequest;
// },


    //this.jiazai();
    // jiazai: function () {
    //     if (cc.find('Canvas/loginone').isValid == true) {
    //         let self = this;
    //         cc.loader.loadResDir('images/pukepaiimg', cc.SpriteFrame, function (numone, numto, numthree) {
    //             if ((numone / numto * 100).toFixed(0) > 1) {
    //                 self.jindunumber.string = (numone / numto * 100).toFixed(0) + '%';
    //             }
    //         }, function (err, assets, urls) {
    //             cc.ss.imgresource = assets;
    //           });
    //     }
    // },

    // account: function () {
    //     var Request = new Object();
    //     Request = this.GetRequest();
    //     var date = new Date();
    //     var seperator1 = "-";
    //     var seperator2 = ":";
    //     //外国的月份都是从0开始的，所以+1
    //     var month = date.getMonth() + 1;
    //     var strDate = date.getDate();
    //     var miao = date.getSeconds();
    //     //1-9月用0补位
    //     if (month >= 1 && month <= 9) {
    //         month = "0" + month;
    //     }
    //     //1-9日用0补位
    //     if (strDate >= 0 && strDate <= 9) {
    //         strDate = "0" + strDate;
    //     }

    //     if (miao >= 0 && miao <= 9) {
    //         miao = "0" + miao;
    //     }
    //     //获取当前时间 yyyy-MM-dd HH:mm:ss
    //     var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + miao;

    //     var roomidnode = {
    //         roomid: Request.roomid
    //     }
    //     if (Request.auth_code != null && Request.app_id != null) {
    //         var data = {
    //             'app_id': Request.app_id,
    //             'charset': 'GBK',
    //             'code': Request.auth_code,
    //             'grant_type': 'authorization_code',
    //             'method': 'alipay.system.oauth.token',
    //             'sign_type': 'RSA2',
    //             'timestamp': currentdate,
    //             'version': '1.0',
    //             'biz_content': JSON.stringify(roomidnode)
    //         }
    //         var singinfo = Base64.base64encode(JSON.stringify(data));
    //         var xhr = cc.ss.http.httpGet("/api/alipaysign?signinfo=" + singinfo, this.ZiFuBaoCallBack, this.ZiFuBaoError, this);
    //     }else{
    //         this.alert('登录失败,请重新登录', 'program');
    //     }
    // },

        // ZiFuBaoCallBack: function (result, object) {
    //     var data = JSON.parse(result);
    //     if (data.user_id != null && data.user_id != '') {
    //         var Request = new Object();
    //         Request = object.GetRequest();
    //         if (Request != null && Request.roomid != null) {
    //             object.loadding();
    //             var xhr = cc.ss.http.sendRequest("/api/find?macid=" + data.user_id + '&token=' + '&roomid=' + Request.roomid, object.acsucess, object.acerror, object);
    //         } else {
    //             object.loadding();
    //             var xhr = cc.ss.http.sendRequest("/api/find?macid=" + data.user_id + '&token=', object.acsucess, object.acerror, object);
    //         }
    //     } else {
    //         object.alert('登录失败,请重新登录', 'program');
    //     }
    // },

    // ZiFuBaoError: function (result, object) {
    //     console.log('userid返回失败')
    //     result.alert('登录失败,请重新登录', 'program');
    // },

        // ZiFuBaoCallBack: function (result, object) {
    //     var data = JSON.parse(result);
    //     if (data.user_id != null && data.user_id != '') {
    //         var Request = new Object();
    //         Request = object.GetRequest();
    //         if (Request != null && Request.roomid != null) {
    //             object.loadding();
    //             var xhr = cc.ss.http.sendRequest("/api/find?macid=" + data.user_id + '&token=' + '&roomid=' + Request.roomid, object.acsucess, object.acerror, object);
    //         } else {
    //             object.loadding();
    //             var xhr = cc.ss.http.sendRequest("/api/find?macid=" + data.user_id + '&token=', object.acsucess, object.acerror, object);
    //         }
    //     } else {
    //         object.alert('登录失败,请重新登录', 'program');
    //     }
    // },

    // ZiFuBaoError: function (result, object) {
    //     console.log('userid返回失败')
    //     result.alert('登录失败,请重新登录', 'program');
    // },