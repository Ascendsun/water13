// cc.Class({
//     extends: cc.Component,
// sssGameResult: [
// function (e, t, a) {
//     "use strict";
//     cc._RF.push(t, "13c4dvGOYBIh75nYANr4UvY", "sssGameResult"),
cc.Class({
    extends: cc.Component,
    properties: {
        _gameresult: null,
        _seats: [],
        _endinfo: null
    },
    onLoad: function () {
        if (null != cc.vv) {
            var e = this;
            this.node.on("game_end", function (t) {
                e._endinfo = t, null != e._gameresult ? e.onGameEnd(t, !1) : e.loadGameResultPrefab(t, !1), console.log("game_end ")
            }), this.node.on("show_result", function (t) {
                null != e._gameresult ? e._gameresult.active = !0 : e.loadGameResultPrefab(e._endinfo, !0), console.log("show_result ")
            }), this.node.on("game_end_force", function (t) {
                e._endinfo = t, console.log("game_end_force 1"), null != e._gameresult ? (e.onGameEnd(t, !0), console.log("game_end_force 2")) : (e.loadGameResultPrefab(t, !0), console.log("game_end_force 3"))
            })
        }
    }, loadGameResultPrefab: function (e, t) {
        null == this._gameresult && cc.loader.loadRes("prefabs/game/sss/game_result", cc.Prefab, function (a, n) {
            if (a) cc.error(a);
            else {
                this._gameresult = cc.instantiate(n), this.node.addChild(this._gameresult), this._gameresult.zIndex = 1;
                var i = this._gameresult.getChildByName("New Node"),
                    s = cc.vv.utils.getCanvasScale();
                i.scaleX = s, i.scaleY = s;
                for (var o = i.getChildByName("seats"), r = 0; r < o.children.length; ++r) o.children[r].active = !1, this._seats.push(o.children[r]);
                var c = i.getChildByName("btnExit");
                c && cc.vv.utils.addClickEvent(c, this.node, "sssGameResult", "onBtnCloseClicked");
                var h = i.getChildByName("btnReturn");
                h && cc.vv.utils.addClickEvent(h, this.node, "sssGameResult", "onBtnCloseClicked");
                var l = i.getChildByName("btnShare");
                l && cc.vv.utils.addClickEvent(l, this.node, "sssGameResult", "onBtnShareClicked");
                e[2];
                this.onGameEnd(e, t)
            }
        }.bind(this))
    }, onGameEnd: function (e, t) {
        for (var a = cc.vv.gameNetMgr.seats, n = -1, i = 0, s = 0; s < a.length; s++) a[s].userid > 0 && i++;
        this._gameresult.active = t;
        var o = this._gameresult.getChildByName("New Node");
        this.fanghao = o.getChildByName("fanghao").getChildByName("number"), this.jushu = o.getChildByName("jushu").getChildByName("number");
        var r = cc.vv.gameNetMgr.numOfGames + "/" + cc.vv.gameNetMgr.conf.maxGames;
        this.jushu.getComponent(cc.Label).string = r, this.fanghao.getComponent(cc.Label).string = cc.vv.gameNetMgr.roomId;
        for (var c = 0, h = 0; h < i; ++h) {
            var l = a[h];
            l.score > n && (n = l.score, c = h)
        }
        for (var d = [cc.color(255, 255, 255, 255), cc.color(136, 82, 46, 255), cc.color(6, 200, 66, 255), cc.color(246, 255, 0, 255), cc.color(254, 110, 17, 255)], u = 0; u < i; ++u) {
            var g = e[u];
            if (1 == g) break;
            var v = a[u].seatindex == cc.vv.gameNetMgr.seatIndex;
            this._seats[u].active = !0;
            var f = v ? d[4] : d[1],
                p = this._seats[u].getChildByName("head");
            if (p) {
                var m = p.getChildByName("username").getComponent(cc.Label);
                m.string = cc.vv.utils.getShortUsername(g.userName), m.node.color = f;
                var _ = p.getChildByName("userid").getComponent(cc.Label);
                _.string = "ID:" + g.userId, _.node.color = f, p.getChildByName("headurl").getComponent("ImageLoader").setUserID(g.userId)
            }
            var y = p.getChildByName("fangzhu");
            y.active = !1, c == u && (y.active = !0), f = v ? d[4] : d[1];
            var C = this._seats[u].getChildByName("score").getComponent(cc.Label);
            C.string = String(g.score), C.node.color = f
        }
        if (this._seats.length > a.length)
            for (var N = a.length; N < this._seats.length; ++N) this._seats[N].active = !1
    }, onBtnCloseClicked: function () {
        cc.vv.replayMgr.isReplay() || (cc.vv.wc.show("正在返回游戏大厅"), cc.director.loadScene("hall"))
    }, onBtnShareClicked: function () {
        cc.vv.replayMgr.isReplay() || (console.log("onBtnShareHaoyou"), "mqqbrowser" == cc.sys.browserType || "wechat" == cc.sys.browserType ? (console.log("H5分享好友"), cc.vv.anysdkMgr.getAccess_token("好玩的棋牌游戏")) : cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS ? (cc.vv.anysdkMgr.shareUrlEvent("0"), console.log("cc.vv.anysdkMgr.shareUrlEvent('0');")) : (console.log("H5分享好友"), cc.vv.anysdkMgr.getAccess_token("好玩的棋牌游戏")))
    }

});

    //         , cc._RF.pop()
    //     }, {}
    // ],
