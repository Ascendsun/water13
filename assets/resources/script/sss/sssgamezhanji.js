cc.Class({
     extends: cc.Component,
    // sssgamezhanji: [
    //     function (e, t, a) {
    //         "use strict";
    //         cc._RF.push(t, "6eaa0AgyodEsrGxFGLLalF7", "sssgamezhanji");
    //         var n = function (e) {
    //             return e && e.__esModule ? e : {
    //                 default: e
    //             }
    //         }(e("../../Base/BaseView"));
    //         cc.Class({
   // extends: n.default,
    properties: {
        nodeHide: cc.Node,
        seats: cc.Node,
        userinfo: cc.Node,
        scoreinfo: cc.Node,
        result: null,
        retFlag: [],
        scrollview: cc.Node
    },

    onLoad: function () {
        null != cc.vv && cc.vv.utils.setScrollview(this.scrollview.getComponent(cc.ScrollView))
    }, getDetailItem: function (e) {
        var t = this.userinfo;
        if (t.childrenCount > e) return t.children[e];
        var a = cc.instantiate(this.scoreinfo);
        return t.addChild(a), a
    }, showInGame: function (e, t) {
        this.nodeHide.active = !0;
        var a = e,
            n = (a.maxGames, a.roomId, a.allRet);
        this.result = a.allRet;
        var i = this.nodeHide.getChildByName("New Node").getChildByName("bg3"),
            s = i.getChildByName("fanghao").getChildByName("number"),
            o = i.getChildByName("jushu").getChildByName("number"),
            r = cc.vv.gameNetMgr.numOfGames + "/" + cc.vv.gameNetMgr.conf.maxGames;
        o.getComponent(cc.Label).string = r, s.getComponent(cc.Label).string = cc.vv.gameNetMgr.roomId;
        for (var c = 0; c < n.length; c++) this.retFlag[c] = !1;
        for (var h = 0; h < n.length; h++)
            for (var l = 0; l < 6; l++)
                if (l < n[h].length) {
                    var d = n[h][l];
                    this.seats.children[l].active = !0;
                    var u = this.seats.children[l].getChildByName("head");
                    if (u) u.getChildByName("username").getComponent(cc.Label).string = cc.vv.utils.getShortUsername(d.userName), u.getChildByName("headurl").getComponent("ImageLoader").setUserID(d.userId), u.getChildByName("headurl").getChildByName("fangzhu").active = !1
                } else this.seats.children[l].active = !1;
        for (var g = 0; g < n.length; g++) {
            var v = this.getDetailItem(g);
            v.idx = g, v.height = 50, v.getChildByName("index").getComponent(cc.Label).string = g + 1;
            for (var f = v.getChildByName("scores"), p = v.getChildByName("pai"), m = 0; m < 6; m++) {
                var _ = n[g][m],
                    y = f.children[m];
                m < n[g].length ? (y.active = !0, y.getComponent(cc.Label).string = _.score) : y.active = !1, p.children[m].active = !1
            }
        }
    }, onContentClick: function (e) {
        var t = this.nodeHide.getChildByName("New Node").getChildByName("bg3").getChildByName("jushu").getChildByName("number"),
            a = e.currentTarget,
            n = a.idx,
            i = this.result[n],
            s = n + 1 + "/" + cc.vv.gameNetMgr.conf.maxGames;
        t.getComponent(cc.Label).string = s, 0 == this.retFlag[n] ? this.retFlag[n] = !0 : this.retFlag[n] = !1;
        for (var o = 0; o < this.userinfo.childrenCount; o++) {
            var r = this.userinfo.children[o];
            r.height = 50, r.getChildByName("pai").active = !1
        }
        if (1 == this.retFlag[n]) {
            a.height = 150;
            var c = a.getChildByName("pai");
            c.active = !0;
            for (var h = 0; h < c.childrenCount; h++)
                if (h < i.length) {
                    c.children[h].active = !0;
                    var l = c.children[h].getChildByName("tdPai"),
                        d = c.children[h].getChildByName("zdPai"),
                        u = c.children[h].getChildByName("wdPai"),
                        g = i[h].arrPai,
                        v = g[0],
                        f = g[1],
                        p = g[2];
                    i[h].tshPai && i[h].tshPai.length > 0 && (v = i[h].tshPai[0].concat(), f = i[h].tshPai[1].concat(), p = i[h].tshPai[2].concat());
                    for (var m = 0; m < 3; m++) {
                        var _ = l.children[m];
                        cc.vv.gameNetMgr.drawCard(_, v[m])
                    }
                    for (var y = 0; y < 5; y++) {
                        var C = d.children[y];
                        cc.vv.gameNetMgr.drawCard(C, f[y])
                    }
                    for (var N = 0; N < 5; N++) {
                        var b = u.children[N];
                        cc.vv.gameNetMgr.drawCard(b, p[N])
                    }
                } else c.children[h].active = !1
        }
    }

    //         }), cc._RF.pop()
    //     }, {
    //         "../../Base/BaseView": "BaseView"
    //     }
    // ],
});
