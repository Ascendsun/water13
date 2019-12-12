// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


"use strict";
cc.Class({
    extends: cc.Component,
    properties: {
        _isCapturing: !1,
        _isGetPos: !1,
        _isShake: !1,
        _isWechatInstalled: !1
    },
    onLoad: function () { }, init: function () { },

    login: function () {
        var e = this.urlParseCode();
        if (e.code) {
        this.onLoginResp(e.code);
        }else {
            var t = window.location.href;
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx676d92fc6af79cba&redirect_uri=" + t + "&response_type=code&scope=snsapi_userinfo&state=qwe#wechat_redirect"
        }
    },
    loginXianLiao: function () {
        var e = this.urlParseCode();
        e.code && this.onXianLiaoLoginResp(e.code)
    },
    loginZhiFuBao: function () {
        var e = this.urlParseCode();
        if (e.auth_code) {
            var t = cc.sys.localStorage.getItem("zfb_account"),
                n = cc.sys.localStorage.getItem("zfb_sign"),
                i = cc.sys.localStorage.getItem("zfb_login_time");
            if (void 0 !== t && void 0 !== n && null != t && null != n) {
                if (Date.now() - i < 432e5) {
                    var o = {
                        errcode: 0,
                        account: t,
                        sign: n
                    };
                    return void cc.beimi.userMgr.onAuth(o)
                }
                cc.sys.localStorage.removeItem("zfb_account"), 
                cc.sys.localStorage.removeItem("zfb_sign"), 
                cc.sys.localStorage.removeItem("zfb_login_time"), 
                s = (s = "http://hdlgame.ph136g.cn/game_hdl_zfb").replace(/&/g, "AAAAA"), 
                window.location.href = "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019091167187410&scope=auth_user&redirect_uri=" + s
            } else this.onZhiFuBaoLoginResp(e.auth_code)
        } else {
            var s;
            s = (s = "http://hdlgame.ph136g.cn/game_hdl_zfb").replace(/&/g, "AAAAA"), window.location.href = "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019091167187410&scope=auth_user&redirect_uri=" + s
        }
    },
    urlParseCode: function () {
        var e, t, n = {};
        if (null == window.location) return n;
        for (var i = window.location.href,
             o = i.indexOf("?"), 
             s = (i = i.substr(o + 1)).split("&"), 
             a = 0; 
             a < s.length; a++)
             (o = s[a].indexOf("=")) > 0 && (e = s[a].substring(0, o), t = s[a].substr(o + 1), n[e] = t);
        return n
    },
    GetQueryString: function (e) {
        var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
            n = window.location.search.substr(1).match(t);
        return null !== n ? unescape(n[2]) : null
    },
    shareAddGems: function () {

     }, 
     phoneShake: function () { 

     }, 
     phoneCancleShake: function () { 

     }, 
     isShake: function () {
        return this._isShake
    },
    share: function (e, t) { 

    },
     ShareIMGCircleFriends: function (e, t) { 

     },
      shareResult: function () { 

      }, 
      onLoginResp: function (e) {
        cc.beimi.http.sendRequest("/wechat_auth", {
            code: e,
            os: cc.sys.os
        }, function (e) {
            0 == e.errcode && (cc.sys.localStorage.setItem("wx_account", e.account), cc.sys.localStorage.setItem("wx_sign", e.sign)), cc.beimi.userMgr.onAuth(e)
        })
    },
    onXianLiaoLoginResp: function (e) {
        cc.beimi.http.sendRequest("/xianliao_auth", {
            code: e,
            os: cc.sys.os
        }, function (e) {
            0 == e.errcode && (cc.sys.localStorage.setItem("xl_account", e.account), cc.sys.localStorage.setItem("xl_sign", e.sign)), cc.beimi.userMgr.onAuth(e)
        })
    },
    onZhiFuBaoLoginResp: function (e) {
        cc.beimi.http.sendRequest("/zhifubao_auth", {
            code: e,
            os: cc.sys.os
        }, function (e) {
            0 == e.errcode && (e.account && cc.sys.localStorage.setItem("zfb_account", e.account), e.sign && cc.sys.localStorage.setItem("zfb_sign", e.sign), cc.sys.localStorage.setItem("zfb_login_time", Date.now() + "")), cc.beimi.userMgr.onAuth(e)
        })
    },
    onBuyItem: function (e, t) {
        if (cc.beimi.global.isZhiFuBao()) {
            var n = function (e) {
                if (0 !== e.errcode);
                else {
                    var t = e.url;
                    window.location.href = t
                }
            },
                i = {
                    account: cc.beimi.userMgr.account,
                    sign: cc.beimi.userMgr.sign,
                    itemId: e,
                    dealerid: 1e4
                };
            cc.beimi.WxMgr && (i.dealerid = cc.beimi.WxMgr.dealers), cc.beimi.http.sendRequest("/create_jft_order", i, n)
        }
        if (cc.beimi.global.isWeChat()) {
            n = function (e) {
                if (0 !== e.errcode);
                else {
                    var t = e.args;
                    if (cc.beimi.WxMgr) return void cc.beimi.WxMgr.onBridgeReady(t, e.ordernumber)
                }
            }, i = {
                account: cc.beimi.userMgr.account,
                sign: cc.beimi.userMgr.sign,
                itemId: e,
                dealerid: 1e4
            };
            cc.beimi.WxMgr && (i.dealerid = cc.beimi.WxMgr.dealers), cc.beimi.http.sendRequest("/create_wechat_order", i, n)
        }
    }, openGameURL: function (e) { }, verifyAppStoreReceipt: function (e) { }, checkWechatInstallStatus: function () { }, onWechatInstalledChecked: function (e) { }, isWechatInstalledChecked: function () { }, onBuyItemCallback: function (e) { }
})


