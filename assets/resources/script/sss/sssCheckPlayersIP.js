
cc.Class({
        extends: cc.Component,
    // sssCheckPlayersIP: [
    //     function (e, t, a) {
    //         "use strict";
    //         cc._RF.push(t, "f4bf2k22q1OAaxOJQODNjCc", "sssCheckPlayersIP");
    //         var n = function (e) {
    //             return e && e.__esModule ? e : {
    //                 default: e
    //             }
    //         }(e("../../Base/BaseView"));
  //  extends: n.default,
    properties: {
        gpsAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        _seats: [],
        _lines: null
    },
    getGpsSpriteFrame: function (e) {
        return this.gpsAtlas.getSpriteFrame(e)
    }, onLoad: function () {
        var e = cc.vv.utils.getCanvasScale();
        this.node.setScale(e);
        var t = this.node.getChildByName("check"),
            a = 0;
        this._seats = [];
        for (var n = 0; n < 6; n++) this._seats[n] = t.children[n], this._seats[n].active = !1, a++;
        this._lines = {};
        for (var i = 0; i < 15; i++) {
            var s = t.children[a + i];
            s.active = !1, this._lines[s.name] = s
        }
        var o = [{
            type: "check_ip",
            caller: this,
            listener: this.onCheckIP
        }];
        this.addListenList(o)
    }, onCheckIP: function (e) {
        var t = e;
        this.updatePlayersInfo(t, !0)
    }, setPlayersInfo: function () {
        if (cc.vv.gameNetMgr.seats) {
            for (var e = cc.vv.gameNetMgr.getLocalSeats(), t = cc.vv.gameNetMgr.seats.length, a = 0; a < t; a++) {
                var n = e[cc.vv.gameNetMgr.getLocalIndex(a)];
                e.push(n), this._seats[n].active = !0, this._seats[n].getChildByName("head").active = !1, this._seats[n].getChildByName("name").active = !1
            }
            if (2 == t) this._lines.line03.active = !0;
            else if (3 == t) this._lines.line02.active = !0, this._lines.line04.active = !0, this._lines.line24.active = !0;
            else if (4 == t) this._lines.line02.active = !0, this._lines.line03.active = !0, this._lines.line04.active = !0, this._lines.line23.active = !0, this._lines.line24.active = !0, this._lines.line34.active = !0;
            else if (5 == t) this._lines.line01.active = !0, this._lines.line02.active = !0, this._lines.line04.active = !0, this._lines.line05.active = !0, this._lines.line12.active = !0, this._lines.line14.active = !0, this._lines.line15.active = !0, this._lines.line24.active = !0, this._lines.line25.active = !0, this._lines.line45.active = !0;
            else
                for (var i in this._lines) this._lines[i].active = !0;
            this.updatePlayersInfo()
        }
    }, updatePlayersInfo: function (e, t) {
        if (e) {
            var a = cc.vv.gameNetMgr.getLocalSeats()[cc.vv.gameNetMgr.getLocalIndex(e.seatindex)],
                n = this._seats[a].getChildByName("head").getComponent("ImageLoader"),
                i = this._seats[a].getChildByName("name");
            0 != e.userid ? (n.setUserID(e.userid), n.node.active = !0, i.active = !0, i.getComponent(cc.Label).string = e.name) : (n.node.active = !1, i.active = !1), this.updatePlayersDistance(e, t)
        } else
            for (var s = cc.vv.gameNetMgr.seats, o = 0; o < s.length; o++) this.updatePlayersInfo(s[o], !1)
    }, updatePlayersDistance: function (e, t) {
        for (var a = cc.vv.gameNetMgr.getLocalSeats(), n = a[cc.vv.gameNetMgr.getLocalIndex(e.seatindex)], i = function (t, a) {
            if (null != t) {
                var n = t.children[0].getComponent(cc.Sprite),
                    i = t.children[1].getComponent(cc.Label);
                if (e.locate && e.locate.longitude && a.locate && a.locate.longitude) {
                    var s = cc.vv.utils.getGpsDistance(e.locate.longitude, e.locate.latitude, a.locate.longitude, a.locate.latitude);
                    s > .1 ? (n.spriteFrame = this.getGpsSpriteFrame("line_green"), i.string = s >= 1 ? Math.round(s) + "km" : Math.round(1e3 * s) + "m") : (n.spriteFrame = this.getGpsSpriteFrame("line_red"), i.string = Math.round(1e3 * s) + "m")
                } else n.spriteFrame = this.getGpsSpriteFrame("line_gray"), i.string = "?"
            }
        }.bind(this), s = cc.vv.gameNetMgr.seats, o = 0; o < s.length; o++) {
            var r = s[o];
            if (r.seatindex != e.seatindex) {
                var c = a[cc.vv.gameNetMgr.getLocalIndex(r.seatindex)],
                    h = "line" + n + c;
                i(this._lines[h], r), t && (h = "line" + c + n, i(this._lines[h], r))
            }
        }
    }
    // "../../Base/BaseView": "BaseView"
});
