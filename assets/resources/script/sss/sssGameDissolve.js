cc.Class({
    //  extends: cc.Component,
    // sssGameDissolve: [
    // function (e, t, a) {
    //     "use strict";
    //     cc._RF.push(t, "4b767AJjzlGYoIut1bHq+Fz", "sssGameDissolve");
    //     var n = function (e) {
    //         return e && e.__esModule ? e : {
    //             default: e
    //         }
    //     }(e("../../Base/BaseView"));
    //     cc.Class({
  //  extends: n.default,
    properties: {
        _noticeLabel: null,
        _btnAgree: null,
        _btnReject: null,
        _seats: [],
        _endTime: -1
    },
    onLoad: function () {
        if (null != cc.vv) {
            this._seats = [];
            var e = this.node.getChildByName("New Node");
            this._btnAgree = e.getChildByName("btn_agree"), this._btnReject = e.getChildByName("btn_reject"), this._noticeLabel = e.getChildByName("info").getComponent(cc.Label);
            var t = cc.vv.utils.getCanvasScale();
            t != e.scaleX && e.setScale(t);
            var a = [{
                type: "dissolve_cancel",
                caller: this,
                listener: this.onDissolveCancel
            }];
            this.addListenList(a)
        }
    }, initSeatsInfo: function () {
        if (0 == this._seats.length) {
            for (var e = this.node.getChildByName("New Node").getChildByName("players"), t = cc.vv.gameNetMgr.seats, a = 0, n = 0; n < t.length; n++) t[n].userid > 0 && a++;
            for (var i = 0; i < 6; ++i)
                if (i < a) this._seats.push(e.children[i]);
                else {
                    var s = e.children[i];
                    s.active = !1;
                    for (var o = 0; o < s.childrenCount; o++) s.children[o].active = !1
                }
            for (var r = 0; r < a; r++) {
                var c = cc.vv.gameNetMgr.seats[r];
                if (0 != c.userid) this._seats[r].children[0].getComponent("ImageLoader").setUserID(c.userid), this._seats[r].children[1].getComponent(cc.Label).string = cc.vv.utils.getShortUsername(c.name), this._seats[r].active = !0, this._seats[r].children[2].active = !0, this._seats[r].children[3].active = !1, this._seats[r].children[4].active = !1
            }
        }
    }, onDissolveNotice: function (e) {
        this.showDissolveNotice(e)
    }, onDissolveCancel: function (e) {
        this.closeAll()
    }, onBtnClicked: function (e) {
        var t = e.target.name;
        "btn_agree" == t ? cc.vv.net.send("dissolve_agree") : "btn_reject" == t && cc.vv.net.send("dissolve_reject")
    }, closeAll: function () {
        this._endTime = -1, this.node.active = !1
    }, showDissolveNotice: function (e) {
        this.initSeatsInfo(), this._endTime = Date.now() / 1e3 + e.time;
        for (var t = 1, a = cc.vv.gameNetMgr.seats, n = 0, i = 0; i < a.length; i++) a[i].userid > 0 && n++;
        for (var s = 0; s < n; ++s)
            if (0 == e.states[s]) {
                t = 0;
                break
            }
        if (1 != t) {
            e.states.length;
            for (var o = 0; o < n; o++) e.states[o] ? (this._seats[o].children[2].active = !1, this._seats[o].children[3].active = !0) : (this._seats[o].children[2].active = !0, this._seats[o].children[3].active = !1);
            this.node.active = !0;
            var r = cc.vv.gameNetMgr.seatIndex;
            1 == e.states[r] ? (this._btnAgree.getComponent(cc.Button).interactable = !1, this._btnReject.getComponent(cc.Button).interactable = !1) : (this._btnAgree.getComponent(cc.Button).interactable = !0, this._btnReject.getComponent(cc.Button).interactable = !0)
        } else this.closeAll()
    }, update: function (e) {
        if (this._endTime > 0) {
            var t = this._endTime - Date.now() / 1e3;
            if (t < 0) return cc.vv.net.send("dispress"), this.closeAll(), void cc.director.loadScene("hall");
            var a = Math.floor(t / 60),
                n = Math.ceil(t - 60 * a);
            this._noticeLabel.string = a > 0 ? a + "分" + n + "秒后房间将自动解散" : n + "秒后房间将自动解散"
        }
    }
    //         }), cc._RF.pop()
    //     }, {
    //         "../../Base/BaseView": "BaseView"
    //     }
    // ],
});
