cc.Class({
    extends: cc.Component,
    properties: {
        _gameover: null,
        _seats: [],
        replaydata: null
    },
    onLoad: function () {
        if (null != cc.ss) {
            var e = this;
            this.loadGameResultPrefab(),
                this.node.on("set_data", function (t) { e.replaydata = t, null != e._gameover && e.onGameEnd() })
        }
    },

    loadGameResultPrefab: function () {
        null == this._gameover && cc.loader.loadRes("prefabs/game/sss/game_over", cc.Prefab, function (e, t) {
            if (e) cc.error(e);
            else {
                this._gameover = cc.instantiate(t), 
                this.node.addChild(this._gameover), this._gameover.zIndex = 1;
                var a = this._gameover.getChildByName("New Node"),
                    n = cc.ss.utils.getCanvasScale();
                a.scaleX = n, a.scaleY = n;
                for (var i = a.getChildByName("seats"), s = 0; s < i.children.length; ++s) {
                    var o = i.children[s];
                    o.active = !1;
                    for (var r = o.getChildByName("qiang"), c = 0; c < r.children.length; c++) r.children[c].active = !1;
                    for (var h = o.getChildByName("dan"), l = 0; l < h.children.length; l++) h.children[l].active = !1;
                    o.getChildByName("teshudi").active = !1, 
                    this._seats.push(i.children[s])
                }
                var d = a.getChildByName("btnExit");
                d && cc.ss.utils.addClickEvent(d, this.node, "replay", "onBtnCloseClicked"), this.onGameEnd()
            }
        }.bind(this))
    },

    onGameEnd: function () {
        for (var e = cc.ss.gameNetMgr.seats, t = -1, a = 0; a < e.length; a++) e[a].userid > 0 && 0;
        this._gameover.active = !0;
        var n = this._gameover.getChildByName("New Node").getChildByName("bg3");
        this.fanghao = n.getChildByName("fanghao").getChildByName("number"), 
        this.jushu = n.getChildByName("jushu").getChildByName("number");
        var i = cc.ss.gameNetMgr.numOfGames + "/" + cc.ss.gameNetMgr.conf.maxGames;
        if (this.jushu.getComponent(cc.Label).string = i, 
        this.fanghao.getComponent(cc.Label).string = cc.ss.gameNetMgr.roomId, null != this.replaydata) {
            this.replaydata.shootinfo;
            for (var s = this.replaydata.userinfo, 
                o = (this.replaydata.mapai, 0); o < s.length; ++o) {
                var r = e[o];
                r.score > t && (t = r.score, o)
            }
            for (var c = 0; c < s.length; ++c) {
                var h = s[c];
                if (1 == h) break;
                e[c].seatindex, cc.ss.gameNetMgr.seatIndex;
                this._seats[c].active = !0;
                var l = this._seats[c].getChildByName("head");
                if (l) l.getChildByName("uid").getComponent(cc.Label).string = "ID:" + h.userId, 
                l.getChildByName("username").getComponent(cc.Label).string = cc.ss.utils.getShortUsername(h.userName), 
                l.getChildByName("headurl").getComponent("ImageLoader").setUserID(h.userId);
                l.getChildByName("headurl").getChildByName("fangzhu").active = !1, 
                this._seats[c].getChildByName("score").getComponent(cc.Label).string = String(h.score);
                for (var d = this._seats[c].getChildByName("pai").getChildByName("tdPai"), 
                u = this._seats[c].getChildByName("pai").getChildByName("zdPai"),
                g = this._seats[c].getChildByName("pai").getChildByName("wdPai"), 
                v = h.tdPai, f = h.zdPai, p = h.wdPai, m = 0; m < 3; m++) {
                    var _ = d.children[m];
                    cc.ss.gameNetMgr.drawCard(_, v[m])
                }
                for (var y = 0; y < 5; y++) {
                    var C = u.children[y];
                    cc.ss.gameNetMgr.drawCard(C, f[y])
                }
                for (var N = 0; N < 5; N++) {
                    var b = g.children[N];
                    cc.ss.gameNetMgr.drawCard(b, p[N])
                }
                var w = this._seats[c].getChildByName("pai").getChildByName("daoScore"),
                    S = this._seats[c].getChildByName("teshudi");
                if (0 == h.tdScore && 0 == h.zdScore && 0 == h.wdScore) {
                    if (w.active = !1, S.active = !1, parseInt(h.teshuPaiType) > 8) {
                        S.active = !0;
                        var M = this.getteshupaixing(h.teshuPaiType);
                        S.getChildByName("teshu").getComponent(cc.Label).string = M
                    }
                } else S.active = !1, w.active = !0, w.children[0].getComponent(cc.Label).string = h.tdScore, w.children[1].getComponent(cc.Label).string = h.zdScore, w.children[2].getComponent(cc.Label).string = h.wdScore;
                var I = this._seats[c].getChildByName("qiang"),
                    B = this._seats[c].getChildByName("dan"),
                    x = h.daqiang,
                    T = h.dan;
                if (1 == h.quanleida) I.children[4].active = !0;
                else
                    for (var A = 0; A < x; A++) I.children[A].active = !0;
                for (var R = 0; R < T; R++) B.children[R].active = !0
            }
            if (this._seats.length > e.length)
                for (var P = e.length; P < this._seats.length; ++P) this._seats[P].active = !1
        }
    },

    getteshupaixing: function (e) {
        var t = null;
        if (!(e < 9)) return e == n.STH ? t = "三清" : e == n.SQTHS ? t = "三清+同花顺" : e == n.LDBZD ? t = "六对半+炸弹" : e == n.SSZ ? t = "三顺" : e == n.LDB ? t = "六对半" : e == n.WDST ? t = "五对三条" : e == n.STST ? t = "四套三条" : e == n.QX ? t = "全小" : e == n.QD ? t = "全大" : e == n.QHEI ? t = "全黑" : e == n.QHONG ? t = "全红" : e == n.SSTHS ? t = "三顺+同花顺" : e == n.QHYHEI ? t = "全红一点黑" : e == n.QHEIYH ? t = "全黑一点红" : e == n.SFTX ? t = "三分天下" : e == n.STHS ? t = "三顺清" : e == n.YTL ? t = "一条龙" : e == n.ZZQL ? t = "至尊一条龙" : e == n.SEHZ && (t = "十二皇族"), t
    },

    onBtnCloseClicked: function () {
        cc.ss.replayMgr.isReplay()
    }
});
