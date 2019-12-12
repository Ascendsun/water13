    // // "function" == typeof Symbol && Symbol.iterator;
    // // var n = require("../Utils/UIHelp"),
    // // i = o(require("../Base/BaseScene")),
    // // s = o(require("fingerprintjs2"));
    // // function o(e) {
    // //     return e && e.__esModule ? e: {
    // //     default:
    // //         e
    // //     }
    // // }
    // require("init");
    // var r = function() {
    //     var e = navigator.userAgent;
    //     return e && e.indexOf && e.match ? {
    //         trident: e.indexOf("Trident") > -1,
    //         presto: e.indexOf("Presto") > -1,
    //         webKit: e.indexOf("AppleWebKit") > -1,
    //         chrome: e.indexOf("Chrome") > -1,
    //         gecko: e.indexOf("Gecko") > -1 && -1 == e.indexOf("KHTML"),
    //         mobile: !!e.match(/AppleWebKit.*Mobile.*/) || !!e.match(/AppleWebKit/),
    //         ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    //         android: e.indexOf("Android") > -1 || e.indexOf("Linux") > -1,
    //         iPhone: e.indexOf("iPhone") > -1 || e.indexOf("Mac") > -1,
    //         iPad: e.indexOf("iPad") > -1,
    //         safari: e.indexOf("Safari") > -1,
    //         webApp: -1 == e.indexOf("Safari"),
    //         xianliao: e.indexOf("XLMessenger") > -1,
    //         wechat: e.indexOf("MicroMessenger") > -1
    //     }: {
    //         trident: !1,
    //         webKit: !1,
    //         chrome: !0,
    //         mobile: !0,
    //         ios: !1,
    //         android: !0,
    //         iPhone: !1,
    //         iPad: !1,
    //         safari: !1,
    //         webApp: !1,
    //         xianliao: !1,
    //         wechat: !1
    //     }
    // };
    // function c() {
    //     void 0 != cc.vv && null != cc.vv || (cc.vv = {}),
    //     cc.vv.CHANNEL = "dy",
    //     cc.vv.GAMENAME = "\u4e1c\u9633\u9ebb\u5c06",
    //     cc.vv.bgmusic = !1,
    //     cc.vv.onlyaa = !0,
    //     cc.vv.waitPopStr = null,
    //     cc.browserUA = {},
    //     cc.sys.isNative || (cc.browserUA = r(), console.log("\u6d4f\u89c8\u5668UA\u6807\u8bc6", cc.browserUA)),
    //     cc.sys.isNative ? cc.vv.protocol = "https://": cc.vv.protocol = window.location.protocol + "//",
    //     Date.prototype.format = function(e) {
    //         var t = {
    //             "M+": this.getMonth() + 1,
    //             "d+": this.getDate(),
    //             "h+": this.getHours(),
    //             "m+": this.getMinutes(),
    //             "s+": this.getSeconds(),
    //             "q+": Math.floor((this.getMonth() + 3) / 3),
    //             S: this.getMilliseconds()
    //         };
    //         /(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    //         for (var a in t) new RegExp("(" + a + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[a] : ("00" + t[a]).substr(("" + t[a]).length)));
    //         return e
    //     };
    //     var t = e("UserMgr");
    //     cc.vv.userMgr = new t;
    //     var a = e("ReplayMgr");
    //     cc.vv.replayMgr = new a,
    //     cc.vv.http = e("HTTP"),
    //     cc.vv.LOGIN_IP_IDX = 0,
    //     cc.sys.localStorage.getItem("LOGIN_IP_IDX") && (cc.vv.LOGIN_IP_IDX = cc.sys.localStorage.getItem("LOGIN_IP_IDX")),
    //     cc.vv.http.setLoginIP();
    //     var i = e("Net");
    //     cc.vv.net = new i;
    //     var o = e("emitter");
    //     cc.vv.emitter = new o;
    //     var c = e("AudioManager");
    //     cc.vv.audioMgr = new c,
    //     cc.vv.audioMgr.init(),
    //     cc.vv.alert = n.UIHelp.alert,
    //     cc.vv.wc = n.UIHelp.wc,
    //     cc.vv.lt = n.UIHelp.lt,
    //     cc.sys.isNative || (cc.vv.url = location.origin, cc.vv.url_channel = location.origin + "?channel=" + cc.vv.CHANNEL, console.log("Appstart cc.vv.protocol = ", cc.vv.protocol));
    //     var h = e("Utils");
    //     cc.vv.utils = new h;
    //     var l = e("GlobalUtils");
    //     cc.vv._g = new l,
    //     cc.vv.isAnalytics = !0,
    //     cc.args = function() {
    //         var e, t, a = {};
    //         if (cc.sys.isNative) return a;
    //         if (null == window.location) return a;
    //         for (var n = window.location.href,
    //         i = n.indexOf("?"), s = n.indexOf("#"), o = (n = s > 0 && s > i + 1 ? n.substr(i + 1, s - i - 1) : n.substr(i + 1)).split("&"), r = 0; r < o.length; r++)(i = o[r].indexOf("=")) > 0 && (e = o[r].substring(0, i), t = o[r].substr(i + 1), a[e] = t);
    //         var c = window.location.hash;
    //         if (null != (c = decodeURIComponent(c)) && void 0 != c && "" != c) {
    //             var h = c.substr(1);
    //             if (h && "" != h) {
    //                 var l = null;
    //                 try {
    //                     l = JSON.parse(h)
    //                 } catch(e) {}
    //                 for (var d in l) l[d] && (a[d] = l[d])
    //             }
    //         }
    //         return a
    //     } (),
    //     console.log("cc.args :", cc.args),
    //     cc.sys.isNative || setTimeout(function() {
    //         s.
    //     default.get(function(e) {
    //             var t = e.map(function(e) {
    //                 return e.value
    //             }),
    //             a = s.
    //         default.x64hash128(t.join(""), 31);
    //             cc.$webfinger = {
    //                 hash: a
    //             },
    //             console.log("webfinger:", cc.$webfinger)
    //         })
    //     },
    //     500)
    // }
    // cc.Class({
    //     extends: i.
    // default,
    //     properties: {
    //         loadingProgess: cc.Label
    //     },
    //     onLoad: function() {
    //         var t = this;
    //         cc.sys.isNative || (e("fundebug-javascript").apikey = "cccfbf08c5d4b30d8f95d5d4c7db36cc88d911091b284e8fba327a7430f4aa57");
    //         c(),
    //         cc.Button.prototype.touchEndedClone = cc.Button.prototype._onTouchEnded,
    //         cc.Button.prototype._soundOn = !0,
    //         cc.Button.prototype.setSoundEffect = function(e) {
    //             this._soundOn = e
    //         },
    //         cc.Button.prototype._onTouchEnded = function(e) {
    //             this.interactable && this.enabledInHierarchy && this._pressed && 1 == this._soundOn && cc.vv.audioMgr.playSFX("show"),
    //             this.touchEndedClone(e)
    //         },
    //         cc.sys.isNative || cc.view.setResizeCallback(function() {
    //             console.log("window.orientation = " + window.orientation),
    //             cc.sys.isMobile && cc.browserUA.wechat && (90 == window.orientation || -90 == window.orientation ? (console.log("\u6a2a\u5c4f\uff01"), cc.vv.lt.show()) : 0 != window.orientation && 180 != window.orientation || (console.log("\u7ad6\u5c4f\uff01"), cc.vv.lt.hide()))
    //         }.bind(this)),
    //         cc.sys.isNative ? setTimeout(function() {
    //             t.node.getComponent("HotUpdate").checkUpdate()
    //         },
    //         300) : cc.loader.loadRes("ver/cv",
    //         function(e, a) {
    //             cc.VERSION = a,
    //             console.log("current core version:" + cc.VERSION),
    //             t.getServerInfo()
    //         })
    //     },
    //     getServerInfo: function() {
    //         this.loadingProgess && (this.loadingProgess.string = "\u6b63\u5728\u8fde\u63a5\u670d\u52a1\u5668"),
    //         cc.vv.http.sendLoginReq("/get_serverinfo", null,
    //         function(e) { (function(e) {
    //                 if (null == e.version) console.log("error.");
    //                 else if (cc.vv.SI = e, e.version > cc.VERSION ? cc.vv.alert.show("\u63d0\u793a", "\u7248\u672c\u8fc7\u65e7\u8bf7\u5237\u65b0\u9875\u9762\uff0c\u5982\u8fd8\u6709\u95ee\u9898\u8bf7\u8054\u7cfb\u5ba2\u670d",
    //                 function() {
    //                     cc.sys.openURL(cc.vv.SI.appweb)
    //                 }) : cc.director.loadScene("login"), e.logger_enabled && 1 == e.logger_enabled) {
    //                     var t = function(e, t) {
    //                         var a = "";
    //                         try {
    //                             var n = !0,
    //                             i = !1,
    //                             s = void 0;
    //                             try {
    //                                 for (var o, r = t[Symbol.iterator](); ! (n = (o = r.next()).done); n = !0) {
    //                                     var c = o.value;
    //                                     a = c instanceof Object ? "" != a ? a + "," + JSON.stringify(c) : JSON.stringify(c) : "" != a ? a + "," + c: c
    //                                 }
    //                             } catch(e) {
    //                                 i = !0,
    //                                 s = e
    //                             } finally {
    //                                 try { ! n && r.
    //                                     return && r.
    //                                     return ()
    //                                 } finally {
    //                                     if (i) throw s
    //                                 }
    //                             }
    //                         } catch(e) {
    //                             a = "log catch err"
    //                         }
    //                         var h = {
    //                             userid: 0,
    //                             level: e,
    //                             log: a
    //                         };
    //                         cc.vv.userMgr.userId && (h.userid = cc.vv.userMgr.userId),
    //                         cc.vv.http.sendLogReq("/setlog", h)
    //                     },
    //                     a = console.log;
    //                     console.log = function() {
    //                         for (var e = arguments.length,
    //                         n = Array(e), i = 0; i < e; i++) n[i] = arguments[i];
    //                         a.apply(void 0, n),
    //                         t("info", arguments)
    //                     };
    //                     var n = console.warn;
    //                     console.warn = function() {
    //                         for (var e = arguments.length,
    //                         a = Array(e), i = 0; i < e; i++) a[i] = arguments[i];
    //                         n.apply(void 0, a),
    //                         t("warn", arguments)
    //                     },
    //                     console.err = function() {
    //                         for (var e = arguments.length,
    //                         n = Array(e), i = 0; i < e; i++) n[i] = arguments[i];
    //                         a.apply(void 0, n),
    //                         t("err", arguments)
    //                     }
    //                 } else console.err = function() {
    //                     var e; (e = console).log.apply(e, arguments)
    //                 }
    //             })(e)
    //         })
    //     }
    // }),