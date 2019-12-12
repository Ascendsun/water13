// Utils: [function(e, t, a) {
//     "use strict";
//     cc._RF.push(t, "b717fzww0hNzIqvNbb1t9wx", "Utils");./Manager/
    var n = require("ListenerManager");
    cc.Class({
        extends: cc.Component,
        properties: {
            _title: null,
            _desc: null,
            _param: null,
            _isWxReady: !1
        },
        addClickEvent: function(e, t, a, n) {
            console.log(a + ":" + n);
            var i = new cc.Component.EventHandler;
            i.target = t,
            i.component = a,
            i.handler = n,
            e.getComponent(cc.Button).clickEvents.push(i)
        },
        addSlideEvent: function(e, t, a, n) {
            var i = new cc.Component.EventHandler;
            i.target = t,
            i.component = a,
            i.handler = n,
            e.getComponent(cc.Slider).slideEvents.push(i)
        },
        addEscEvent: function(e) {
            cc.log('进来没utils')
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,
            function(e) {
                e.keyCode == cc.macro.KEY.back && cc.vv.alert.show("提示", "确定要退出游戏吗？",
                function() {
                    cc.game.end()
                },
                !0)
            })
        },
        getBoldRichString: function(e) {
            return "<b>" + e + "</b>"
        },
        getShortUsername: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4;
            if (null != e) {
                for (var a = 0,
                n = 0; n < e.length; n++) {
                    var i = e.charCodeAt(n);
                    if ((a += i >= 0 && i <= 128 ? .5 : 1) > t) return e.substr(0, n) + "..."
                }
                return e
            }
        },
        showWordCMD: function(e, t, a, n) {
            var i = this,
            s = "【" + e + "，房间号#" + a + "#，房主#" + t + "#, <<" + n + ">>】复制这条信息后打开【" + cc.vv.GAMENAME + "】即可加入房间";
            cc.vv.alert.show("标题", s,
            function() {
                i.webCopyString(s)
            })
        },
        getStringRealLength: function(e) {
            for (var t = 0,
            a = e.length,
            n = -1,
            i = 0; i < a; i++) t += (n = e.charCodeAt(i)) >= 0 && n <= 128 ? 1 : 2;
            return t
        },
        getCanvasScale: function() {
            var e = cc.find("Canvas").getComponent(cc.Canvas),
            t = Math.min(e.node.width / e.designResolution.width, e.node.height / e.designResolution.height).toFixed(2);
            return parseFloat(t)
        },
        getGpsDistance: function(e, t, a, n) {
            var i = function(e) {
                return Math.PI * e / 180
            },
            s = i(t),
            o = i(n),
            r = s - o,
            c = i(e) - i(a),
            h = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(r / 2), 2) + Math.cos(s) * Math.cos(o) * Math.pow(Math.sin(c / 2), 2)));
            return h *= 6378.137
        },
        shareGame: function(e, t, a) {
            if (this._title = e, this._desc = t, this._param = "?userid=" + a + "&channel=" + cc.vv.CHANNEL, cc.browserUA.xianliao) {
                var n = {
                    userid: a
                };
                window.location.hash = encodeURIComponent(JSON.stringify(n))
            }
            this.initShare()
        },
        shareRoomID: function(e, t, a) {
            if (this._title = e, this._desc = t, this._param = "?roomid=" + a + "&userid=" + cc.vv.userMgr.userId + "&channel=" + cc.vv.CHANNEL, cc.browserUA.xianliao) {
                var n = {
                    userid: cc.vv.userMgr.userId,
                    roomid: a
                };
                window.location.hash = encodeURIComponent(JSON.stringify(n))
            }
            this.initShare()
        },
        shareRecordID: function(e, t, a) {
            if (this._title = e, this._desc = t, this._param = "?recordid=" + a + "&channel=" + cc.vv.CHANNEL, cc.browserUA.xianliao) {
                var n = {
                    userid: cc.vv.userMgr.userId,
                    recordid: a
                };
                window.location.hash = encodeURIComponent(JSON.stringify(n))
            }
            this.initShare()
        },
        initShare: function() {
            var e = cc.vv.url + "/",
            t = this._title,
            a = this._desc,
            n = this._param;
            console.log("utils initShare cc.vv.url = " + cc.vv.url),
            console.log("utils initShare url = " + e),
            this._isWxReady && cc.browserUA.wechat && wx.onMenuShareAppMessage({
                title: t,
                desc: a,
                link: e + n,
                imgUrl: "http://www.8dyl.cn:7456/img",
                success: function() {
                    console.log("1分享给朋友success")
                },
                cancel: function() {
                    console.log("1分享给朋友cancel")
                },
                fail: function(e) {
                    console.log("1分享给朋友fail", e)
                }
            })
        },
        getBaseInfo: function(e, t) {
            null == cc.vv.baseInfoMap && (cc.vv.baseInfoMap = {}),
            null != cc.vv.baseInfoMap[e] ? t(cc.vv.baseInfoMap[e]) : cc.vv.http.sendLoginReq("/base_info", {
                userid: e
            },
            function(a) {
                var n = null;
                a.headimgurl && (n = a.headimgurl, console.log("userid = " + e + " head img rul : " + a.headimgurl));
                var i = {
                    name: a.name,
                    sex: a.sex,
                    url: n
                };
                cc.vv.baseInfoMap[e] = i,
                t(i)
            })
        },
        setScrollview: function(e) {
            e._handleMoveLogic = function(e) {
                var t = e.getDelta();
                if (180 == cc.find("Canvas").rotation) {
                    var a = cc.v2( - t.x, -t.y);
                    this._processDeltaMove(a)
                } else this._processDeltaMove(t)
            }
        },
        setPageView: function(e) {
            cc.Enum({
                Horizontal: 0,
                Vertical: 1
            });
            e._autoScrollToPage = function() {
                var e = this._startBounceBackIfNeeded(),
                t = this._touchBeganPosition.sub(this._touchEndPosition);
                if (180 == cc.find("Canvas").rotation && (t = cc.v2( - t.x, -t.y)), e) {
                    var a = this._getDragDirection(t);
                    if (0 === a) return;
                    this._curPageIdx = a > 0 ? this._pages.length - 1 : 0,
                    this.indicator && this.indicator._changedState()
                } else {
                    var n = this._curPageIdx,
                    i = n + this._getDragDirection(t),
                    s = this.pageTurningSpeed * Math.abs(n - i);
                    if (i < this._pages.length) {
                        if (this._isScrollable(t, n, i)) return void this.scrollToPage(i, s);
                        var o = this._calculateTouchMoveVelocity();
                        if (this._isQuicklyScrollable(o)) return void this.scrollToPage(i, s)
                    }
                    this.scrollToPage(n, s)
                }
            }
        },
        showWebPay: function(e) {
            var t = "https://bbzj.baobaogames.com/h5pay/wx_h5.html?",
            a = cc.vv.userMgr.userId,
            n = "xl";
            cc.browserUA.xianliao ? n = "xl": cc.browserUA.safari ? n = "safari": cc.browserUA.chrome && (n = "chrome");
            var i = Date.parse(new Date);
            t = t + "userid=" + a + "&payid=" + e + "&platform=" + n + "&url=" + encodeURIComponent(location.href) + "&t=" + i.toString(),
            location.href = t
        },
        shareScreenshot: function(e, t, a) {
            cc.vv.wc.show("截图中..."),
            cc.find("Canvas").rotation = 0;
            var n = new cc.RenderTexture,
            i = cc.game._renderContext;
            n.initWithSize(cc.visibleRect.width, cc.visibleRect.height, i.STENCIL_INDEX8),
            t.targetTexture = n,
            e.scheduleOnce(function() {
                cc.vv.wc.hide();
                var i = n.width,
                s = n.height,
                o = document.createElement("canvas");
                o.width = i,
                o.height = s;
                var r = o.getContext("2d");
                t.render(),
                cc.find("Canvas").rotation = 180;
                for (var c = n.readPixels(), h = 4 * i, l = 0; l < s; l++) {
                    var d = s - 1 - l,
                    u = new Uint8ClampedArray(c.buffer, Math.floor(d * i * 4), h),
                    g = new ImageData(u, i, 1);
                    r.putImageData(g, 0, l)
                }
                var v = o.toDataURL("image/png"),
                f = document.createElement("img");
                f.src = v,
                f.style.position = "absolute",
                f.style.display = "block",
                f.style.transform = "rotate(-90deg)",
                f.style.transformOrigin = "40% 70%",
                f.style.width = "130%",
                f.style.height = "40%",
                f.style.margin = "auto",
                f.style.top = "0px",
                f.style.left = "0px",
                f.style.bottom = "0px",
                f.style.right = "0px",
                f.zIndex = 100;
                var p = document.body.appendChild(f);
                a(p),
                e.scheduleOnce(function() {
                    o.getContext("2d").clearRect(0, 0, o.width, o.height)
                },
                3)
            },
            1)
        },
        webCopyString: function(e) {
            console.log("复制");
            var t = e + "",
            a = document.createElement("textarea");
            a.value = t,
            a.setAttribute("readonly", ""),
            a.style.contain = "strict",
            a.style.position = "absolute",
            a.style.left = "-9999px",
            a.style.fontSize = "12pt";
            var n = getSelection(),
            i = !1;
            n.rangeCount > 0 && (i = n.getRangeAt(0)),
            document.body.appendChild(a),
            a.select(),
            a.selectionStart = 0,
            a.selectionEnd = t.length;
            var s = !1;
            try {
                s = document.execCommand("copy")
            } catch(e) {}
            return document.body.removeChild(a),
            i && (n.removeAllRanges(), n.addRange(i)),
            s
        },
        getUserGems: function() {
            var e = {
                account: cc.vv.userMgr.account,
                sign: cc.vv.userMgr.sign
            };
            cc.vv.http.sendHallReq("/get_user_status", e,
            function(e) {
                0 !== e.errcode ? console.log(e.errmsg) : null != e.gems && (cc.vv.userMgr.gems = e.gems, n.ListenerManager.getInstance().trigger("updateGems"))
            })
        },
        checkPhone: function(e) {
            return !! /^1\d{10}$/.test(e)
        }
    });

//     cc._RF.pop()
// },
// {
//     "./Manager/ListenerManager": "ListenerManager"
// }],