// gameSeatCard: [function(e, t, a) {
//     "use strict";
//     cc._RF.push(t, "032f0tfuHFM3Ia5822QeOT0", "gameSeatCard");
var n = require("sssUtils"),
    i = require("Compare"),
    s = n.PaiType;
cc.Class({
    extends: cc.Component,
    properties: {
        allScore: [],
        cardnode: null,
        pokerprefab: null,
        mySelfPai: [],
        tdCards: [],
        zdCards: [],
        wdCards: [],
        _loadcard: !1,
        _showPai: !1,
        _peipaidata: null,
        _showPeiPai: !1,
        suoping: !1,
        seatscard: []
    },
    onLoad: function () {
            this._loadcard = !1,
            this._showPai = !1,
            this._showPeiPai = !1,
            this._peipaidata = null,
            this.seatscard = [],
            this.initView(),
            this.initEventHandlers(),
            cc.ss.seatcard = this,
            console.log(" card node    onLoad======================")
    },
    initView: function () {
        this.loadCardNode();
    },
    initEventHandlers: function () {
        var e = this;
        this.node.on("holds_count",
            function (e) { }),
            this.node.on("user_ready",
                function (t) {
                    console.log("gameseat user_ready-----"),
                        t.userid == cc.ss.userMgr.userId && (e.loadHandcardNode(), e.ResetView())
                }),
            this.node.on("game_begin",
                function (t) {
                    e.loadSeatsCardNode(false)
                }),
            this.node.on("game_sync",
                function (t) {
                    null != e.pokerprefab && void 0 != e.pokerprefab || e.loadHandcardNode(),
                        0 == e.seatscard.length ? e.loadSeatsCardNode(true) : cc.ss.gameNetMgr._HaveloadCards = true
                }),
            this.node.on("game_over",
                function (e) { }),
            this.node.on("game_reset",
                function (e) {
                    console.log("gameseat game_reset-----")
                }),
            this.node.on("player_outCard_notify",
                function (t) {
                    0 != cc.ss.gameNetMgr._HaveloadCards && (console.log("gameseat outcard-----"), e.usersPeiPai(t))
                }),
            this.node.on("compare_result",
                function (t) {
                    0 != cc.ss.gameNetMgr._HaveloadCards && (console.log("gameseat compare_result-----"), e.setResultData(t))
                })
    },
    playercomebackpai: function (e) {
        if (e) {
            for (var t = 0; t < e[0].length; t++) this.tdCards.push(e[0][t]);
            for (var a = 0; a < e[1].length; a++) this.zdCards.push(e[1][a]);
            for (var n = 0; n < e[2].length; n++) this.wdCards.push(e[2][n])
        }
    },

    loadCardNode: function () {
        return null != this.cardnode ? this.cardnode : (cc.loader.loadRes("prefab/card", cc.Prefab,
            function (e, t) {
                if (e) cc.error(e);
                else if (null == this.cardnode) {
                        this._loadcard = true,
                        this.cardnode = cc.instantiate(t),
                        this.cardnode.active = true,
                        this.node.addChild(this.cardnode);
                    for (var a = 0; a < 6; a++) {
                        var n = "seat" + a;
                        this.cardnode.getChildByName(n).active = false
                    }
                    console.log(" load  card ===1 ################################")
                }
            }.bind(this)), null)
    },

    getrealplayers: function () {//得到真正的玩家人数
        for (var e = 0,
            t = cc.ss.gameNetMgr.seats,
            a = 0; a < t.length; a++) 0 != t[a].userid && e++;
        return e
    },
    loadSeatsCardNode: function (e) {
        return console.log(" load  SeatsCard ################################"),
            this.prefabseatcard ? (console.log("inituserseatcard ---1"), 
            this.inituserseatcard(), 
            this.loadCompareCard(), 
            0 == e && (console.log("1 -- -ResetView"), 
            this.ResetView()), 
            void (cc.ss.gameNetMgr._HaveloadCards = !0)) : (cc.loader.loadRes("prefabs/game/sss/seatcard", cc.Prefab,
                function (e, t) {
                    e ? cc.error(e) : (this.prefabseatcard = t, console.log("inituserseatcard ---2"), 
                    this.inituserseatcard(), 
                    this.loadCompareCard(), 
                    this.loadGunNode(), 
                    this.ResetView(), 
                    console.log("2 -- -ResetView"), cc.ss.gameNetMgr._HaveloadCards = !0, console.log(" load  SeatsCard ===1 ################################"))
                }.bind(this)), null)
    },
    loadHandcardNode: function () {
        if (console.log(" load  hand  card   ################################"), null != this.pokerprefab) return this.pokerprefab;
        cc.loader.loadRes("prefabs/game/sss/node_handcard", cc.Prefab,
            function (e, t) {
                return e ? (cc.error(e), null) : null != this.pokerprefab ? this.pokerprefab : (this.pokerprefab = t, void console.log(" load  handcard ===1################################"))
            }.bind(this))
    },
    loadGunNode: function () {
        if (console.log(" load  gun node  ################################"), !this.prefabgun) return cc.loader.loadRes("prefabs/game/sss/GunEffect", cc.Prefab,
            function (e, t) {
                e ? cc.error(e) : (this.prefabgun = t, this.initGunNode(), console.log(" load  gun node  ===1################################"))
            }.bind(this)),
            null;
        this.initGunNode()
    },
    initGunNode: function () {
        for (var e = 0; e < this.seatscard.length; e++) {
            var t = cc.instantiate(this.prefabgun);
            t.active = !1;
            var a = this.seatscard[e].getChildByName("GunEffect");
            null != a && void 0 != a || this.seatscard[e].addChild(t)
        }
    },
    loadCompareCard: function () {
        console.log(" load  bi pai card   ################################");
        for (var e = 0; e < this.seatscard.length; e++) {
            var t = this.seatscard[e].getChildByName("seatcard");
            t.active = !1;
            var a = t.getChildByName("comparPai");
            a.active = !1;
            var n = a.getChildByName("tdPai");
            n.active = !1;
            var i = a.getChildByName("zdPai");
            i.active = !1;
            var s = a.getChildByName("wdPai");
            s.active = !1;
            for (var o = 0; o < 3; o++) if (null != this.pokerprefab) {
                var r = cc.instantiate(this.pokerprefab);
                r.active = !1,
                    r.getChildByName("shadow").active = !1,
                    n.addChild(r)
            } else cc.loader.loadRes("prefabs/game/sss/node_handcard", cc.Prefab,
                function (e, t) {
                    if (e) return cc.error(e),
                        null;
                    if (null != this.pokerprefab) return this.pokerprefab;
                    this.pokerprefab = t;
                    var a = cc.instantiate(t);
                    a.active = !1,
                        a.getChildByName("shadow").active = !1,
                        n.addChild(a)
                }.bind(this));
            for (var c = 0; c < 5; c++) if (null != this.pokerprefab) {
                var h = cc.instantiate(this.pokerprefab);
                h.active = !1,
                    h.getChildByName("shadow").active = !1,
                    i.addChild(h)
            } else cc.loader.loadRes("prefabs/game/sss/node_handcard", cc.Prefab,
                function (e, t) {
                    if (e) return cc.error(e),
                        null;
                    if (null != this.pokerprefab) return this.pokerprefab;
                    this.pokerprefab = t;
                    var a = cc.instantiate(t);
                    a.active = !1,
                        a.getChildByName("shadow").active = !1,
                        i.addChild(a)
                }.bind(this));
            for (var l = 0; l < 5; l++) if (null != this.pokerprefab) {
                var d = cc.instantiate(this.pokerprefab);
                d.active = !1,
                    d.getChildByName("shadow").active = !1,
                    s.addChild(d)
            } else cc.loader.loadRes("prefabs/game/sss/node_handcard", cc.Prefab,
                function (e, t) {
                    if (e) return cc.error(e),
                        null;
                    if (null != this.pokerprefab) return this.pokerprefab;
                    this.pokerprefab = t;
                    var a = cc.instantiate(t);
                    a.active = !1,
                        a.getChildByName("shadow").active = !1,
                        s.addChild(a)
                }.bind(this))
        }
    },
    inituserseatcard: function () {
        console.log("inituserseatcard ---");
        var e = this.getrealplayers(),//的到真正的玩家人数
            t = cc.ss.gameNetMgr.getLocalSeats();//得到几个玩家的位置号
        if (this.seatscard = [], this.prefabseatcard) 
        for (var a = 0; a < e; a++) {
            var n = cc.instantiate(this.prefabseatcard),//克隆位置牌节点
                i = "seat" + t[a],
                s = this.cardnode.getChildByName(i);
                s.active = false;
            var o = s.getChildByName("seatcard");
            null != o && void 0 != o || s.addChild(n),
            this.seatscard.push(s)//安装玩家人压入牌
        }
    },
    drawBackCard: function (e) {
        e.getChildByName("xiaowang").active = false,
            e.getChildByName("dawang").active = false,
            e.getChildByName("val").active = false,
            e.getChildByName("color").active = false,
            e.getChildByName("shadow").active = false;
        var t = e.getChildByName("bg");
        t.active = !0;
        this.drawCardSprite(t.getComponent(cc.Sprite), "textures/sk/pokernew/pokerback")
    },
    drawCard: function (e, t) {
        var a = e.getChildByName("bg");
        a.active = true;
        this.drawCardSprite(a.getComponent(cc.Sprite), "textures/sk/pokernew/bg"),
            cc.ss.gameNetMgr.drawCard(e, t)
    },
    drawCardSprite: function (e, t) {
        cc.ss.gameNetMgr._cardRes[t] && (e.spriteFrame = cc.ss.gameNetMgr._cardRes[t])
    },
    ResetView: function () {
        if (console.log("ResetView ---------------1"), this.seatscard.length > 0) {
            console.log("ResetView ---------------2");
            for (var e = 0; e < this.seatscard.length; e++) {
                var t = this.seatscard[e],
                    a = t.getChildByName("seatcard");
                a.active = !1;
                var n = a.getChildByName("comparPai");
                n.active = !1;
                for (var i = 0; i < n.childrenCount; i++) n.children[i].active = !1;
                var s = a.getChildByName("lipai");
                s.active = !1;
                for (var o = 0; o < s.childrenCount; o++) s.children[o].active = !1;
                a.getChildByName("teshupaixing").active = !1;
                var r = t.getChildByName("GunEffect");
                r && (r.active = !1),
                    a.getChildByName("lipai").active = !1,
                    this.allScore[e] = 0
            }
            this._FstScore = [],
                this._SecScore = [],
                this._ThdScore = [],
                this.tdCards = [],
                this.zdCards = [],
                this.wdCards = []
        }
    },
    resetALLSeat: function () {
        for (var e = cc.ss.gameNetMgr.seats,
            t = 0; t < e.length; t++) if (e[t].userid <= 0) {
                var a = cc.ss.gameNetMgr.getLocalIndex(e[t].seatindex);
                this.seatComs[a].setInfo(e[t]),
                    this.seatComs[n].setReady(!1)
            } else {
                var n = cc.ss.gameNetMgr.getLocalIndex(e[t].seatindex);
                this.seatComs[n].setInfo(e[t]),
                    this.seatComs[n].setReady(e[t].ready)
            }
    },
    showOthersPaiBei: function (e) {
        var t = cc.ss.gameNetMgr.getLocalSeats()[cc.ss.gameNetMgr.getLocalIndex(e)],
            a = "seat" + t,
            n = this.getSeatCardNodeByName(a);
        if (null != n) {
            n.active = !0;
            var i = n.getChildByName("seatcard"),
                s = i.getChildByName("comparPai");
            s.active = !0,
                i.getChildByName("lipai").active = !1,
                console.log("showOthersPaiBei  lipai  ====  false     stindex = " + e + " seatindex = " + t);
            var o = s.getChildByName("zhengScore");
            o.active = !1;
            for (var r = 0; r < o.childrenCount; r++) o.children[r].active = !1;
            var c = s.getChildByName("FuScore");
            c.active = !1;
            for (var h = 0; h < c.childrenCount; h++) c.children[h].active = !1;
            s.getChildByName("texiao").active = !1;
            var l = s.getChildByName("fuhao");
            l.active = !1;
            for (var d = 0; d < l.childrenCount; d++) l.children[d].active = !1;
            var u = s.getChildByName("tdPai"),
                g = s.getChildByName("zdPai"),
                v = s.getChildByName("wdPai");
            u.active = !0,
                g.active = !0,
                v.active = !0;
            for (var f = 0; f < 3; f++) {
                var p = u.children[f];
                p.active = !0,
                    this.drawBackCard(p)
            }
            for (var m = 0; m < 5; m++) {
                var _ = g.children[m];
                _.active = !0,
                    this.drawBackCard(_)
            }
            for (var y = 0; y < 5; y++) {
                var C = v.children[y];
                C.active = !0,
                    this.drawBackCard(C)
            }
        }
    },
    showMyPai: function (e) {
        var t = e[0],
            a = e[1],
            n = e[2];
        this.cardnode.active = !0,
            console.log("showMyPai  ---------------");
        var i = this.getSeatCardNodeByName("seat0");
        if (null != i) {
            var s = i.getChildByName("seatcard");
            i.active = !0,
                s.active = !0;
            var o = s.getChildByName("comparPai");
            o.active = !0,
                s.getChildByName("lipai").active = !1;
            var r = o.getChildByName("zhengScore");
            r.active = !1;
            for (var c = 0; c < r.childrenCount; c++) r.children[c].active = !1;
            var h = o.getChildByName("FuScore");
            h.active = !1;
            for (var l = 0; l < h.childrenCount; l++) h.children[l].active = !1;
            o.getChildByName("texiao").active = !1;
            var d = o.getChildByName("fuhao");
            d.active = !1;
            for (var u = 0; u < d.childrenCount; u++) d.children[u].active = !1;
            var g = o.getChildByName("tdPai"),
                v = o.getChildByName("zdPai"),
                f = o.getChildByName("wdPai");
            g.active = !0,
                v.active = !0,
                f.active = !0;
            for (var p = 0; p < 3; p++) {
                var m = g.children[p];
                m.active = !0,
                    this.drawCard(m, t[p])
            }
            for (var _ = 0; _ < 5; _++) {
                var y = v.children[_];
                y.active = !0,
                    this.drawCard(y, a[_])
            }
            for (var C = 0; C < 5; C++) {
                var N = f.children[C];
                N.active = !0,
                    this.drawCard(N, n[C])
            }
        }
    },
    setResultData: function (e) {
        var t = [];
        this._FstScore = [],
            this._SecScore = [],
            this._ThdScore = [],
            this.HidePeiPaiZi();
        var a = e.compareResult;
        this.showPaibei();
        var n = a.tdRes.concat(),
            i = a.zdRes.concat(),
            s = a.wdRes.concat();
        this.showCompareResult(t, n, i, s);
        var o = e.shootResult;
        this.showShootResult(t, o);
        var r = e.TSPResult;
        r && r.length > 0 && this.showTSPResult(t, r);
        var c = function (e, t) {
            var a = cc.ss.gameNetMgr.getLocalSeats();
            this.hideAllTypeName(t.TSPResult);
            for (var n = t.userInfo,
                i = 0; i < n.length; i++) {
                var s = n[i].userId,
                    o = n[i].score,
                    r = cc.ss.gameNetMgr.getSeatIndexByID(s),
                    c = a[cc.ss.gameNetMgr.getLocalIndex(r)];
                this.setAllScore(c, o, 2)
            }
        }.bind(this);
        t.push(cc.delayTime(1)),
            t.push(cc.callFunc(c, this.node, e));
        var h = function (e, t) {
            var a = t.TSPResult;
            this.hideAllTypeName(a),
                this.mySelfPai = [],
                cc.ss.gameNetMgr.doGameOver(t)
        }.bind(this);
        t.push(cc.delayTime(1)),
            t.push(cc.callFunc(h, this.node, e));
        var l = cc.sequence(t);
        this.node.runAction(l)
    },
    hideAllTypeName: function (e) {
        for (var t = [], a = 0; a < e.length; a++) {
            var n = cc.ss.gameNetMgr.getSeatIndexByID(e[a].userId);
            t.push(n)
        }
        for (var i = 0; i < cc.ss.gameNetMgr.maxplayer; i++) {
            cc.ss.gameNetMgr.getLocalSeats()[cc.ss.gameNetMgr.getLocalIndex(i)];
            var s = this.seatscard[i].getChildByName("seatcard");
            s.getChildByName("tdtype").active = !1,
                s.getChildByName("zdtype").active = !1;
            var o = s.getChildByName("teshupaixing");
            t.length > 0 ? -1 == t.indexOf(i) ? o.active = !1 : o.active = !0 : o.active = !1
        }
    },
    setAllScoreResult: function (e) {
        for (var t = e.length,
            a = 0; a < t; a++) {
            var n = e[a].userId,
                i = cc.ss.gameNetMgr.getSeatIndexByID(n),
                s = cc.ss.gameNetMgr.getLocalIndex(i);
            if (!this.seatComs[s]) return;
            this.seatComs[s].setTotalScore(e[a].allScore)
        }
    },
    showTSPResultEx: function (e, t) {
        if (t && !(t.length < 1)) for (var a = 0; a < t.length; a++) {
            var n = t[a].holds,
                i = t[a].userId,
                s = t[a].type,
                o = cc.ss.gameNetMgr.getSeatIndexByID(i),
                r = {};
            r.holds = n,
                r.type = s,
                r.index = o;
            var c = function (e, t) {
                this.showSpecialResult(t.index, t.holds, t.type)
            }.bind(this);
            e.push(cc.delayTime(1)),
                e.push(cc.callFunc(c, this.node, r)),
                e.push(cc.delayTime(2))
        }
    },
    showTSPResult: function (e, t) {
        if (t && !(t.length < 1)) for (var a = 0; a < t.length; a++) {
            var n = t[a].holds,
                i = t[a].userId,
                s = t[a].type,
                o = t[a].specialdata;
            n.sort(function (e, t) {
                return e.value - t.value
            });
            var r = [],
                c = [],
                h = [],
                l = {
                    arrPai: o[0],
                    userId: i
                },
                d = {
                    arrPai: o[1],
                    userId: i
                },
                u = {
                    arrPai: o[2],
                    userId: i
                };
            r.push(l),
                c.push(d),
                h.push(u),
                this.showTSPCompareResult(e, r, c, h);
            var g = cc.ss.gameNetMgr.getSeatIndexByID(i);
            this.showSpecialResult(g, n, s)
        }
    },
    showShootResult: function (e, t) {
        if (t.shootInfo && !(t.shootInfo.length < 1)) {
            var a = t.shootInfo;
            for (var n in a) {
                var i = n;
                if (t.swatUserId != i) for (var s = a[n], o = 0; o < s.length; o++) {
                    var r = s[o],
                        c = cc.ss.gameNetMgr.getSeatIndexByID(i),
                        h = cc.ss.gameNetMgr.getLocalIndex(c),
                        l = cc.ss.gameNetMgr.getSeatIndexByID(r),
                        d = cc.ss.gameNetMgr.getLocalIndex(l),
                        u = {};
                    u.index0 = h,
                        u.index1 = d;
                    var g = function (e, t) {
                    !t.index1 && t.index1 > cc.ss.gameNetMgr.maxplayer || !t.index0 && t.index0 > cc.ss.gameNetMgr.maxplayer || this.showShoot(t.index0, t.index1)
                    }.bind(this);
                    e.push(cc.delayTime(2.3)),
                        e.push(cc.callFunc(g, this.node, u))
                }
            }
            var v = function (e, t) {
                for (var a = cc.ss.gameNetMgr.getLocalSeats(), n = 0; n < t.length; n++) {
                    var i = t[n].userId,
                        s = t[n].score,
                        o = cc.ss.gameNetMgr.getSeatIndexByID(i),
                        r = a[cc.ss.gameNetMgr.getLocalIndex(o)];
                    this.setAllScore(r, s, 2)
                }
            }.bind(this);
            if (e.push(cc.delayTime(1)), e.push(cc.callFunc(v, this.node, t.shootScore)), t.swatUserId > 0) {
                var f = function (e, a) {
                    var n = cc.ss.gameNetMgr.seats,
                        i = cc.ss.gameNetMgr.getLocalSeats();
                    cc.ss.audioMgr.playSFX("game/sssMusic/quanleda.mp3");
                    for (var s = 0; s < n.length; s++) {
                        var o = n[s].userid;
                        if (0 != o && !(cc.ss.gameNetMgr.fapaiusers.length > 0 && -1 == cc.ss.gameNetMgr.fapaiusers.indexOf(o))) {
                            var r = i[cc.ss.gameNetMgr.getLocalIndex(s)],
                                c = "seat" + r;
                            if (o == t.swatUserId) {
                                var h = this.getSeatCardNodeByName(c);
                                if (null == h) return;
                                var l = h.getChildByName("GunEffect");
                                if (l) {
                                    l.active = !0;
                                    var d = l.getChildByName("Attack");
                                    l.getChildByName("Hit").active = !1,
                                        d.active = !0,
                                        1 == r || 2 == r ? (d.setScale(- 1, 1), d.x = 120) : d.x = -50,
                                        d.y = 150,
                                        d.getComponent(cc.Animation).play("AttackGatlin")
                                }
                            } else {
                                var u = this.getSeatCardNodeByName(c);
                                if (null == u) return;
                                var g = u.getChildByName("GunEffect");
                                if (g) {
                                    g.active = !0;
                                    var v = g.getChildByName("Attack"),
                                        f = g.getChildByName("Hit");
                                    v.active = !1,
                                        f.active = !0,
                                        f.y = 150,
                                        f.getComponent(cc.Animation).play()
                                }
                            }
                        }
                    }
                    cc.ss.audioMgr.playSFX("game/sssMusic/Common/jiqiang.mp3")
                }.bind(this);
                e.push(cc.delayTime(1)),
                    e.push(cc.callFunc(f, this.node, u))
            }
        }
    },
    showTSPCompareResult: function (e, t, a, n) {
        if (!(t.length < 1 || a.length < 1 || n.length < 1)) {
            for (var i = cc.ss.gameNetMgr.getLocalSeats(), s = 0; s < t.length; s++) {
                var o = {},
                    r = 0,
                    c = 0;
                if (t[s]) {
                    r = t[s].userId;
                    var h = t[s].arrPai,
                        l = c = cc.ss.gameNetMgr.getSeatIndexByID(r)
                }
                var d = "seat" + i[cc.ss.gameNetMgr.getLocalIndex(c)],
                    u = this.getSeatCardNodeByName(d);
                if (null == u) return;
                if (u.getChildByName("seatcard").active = !0, u.active = !0, o.comIndex = l, o.arrPai = h, o.comIndex > cc.ss.gameNetMgr.maxplayer) return;
                this.showTSPTD(o.comIndex, o.arrPai)
            }
            for (var g = 0; g < a.length; g++) {
                o = {};
                var v = 0,
                    f = 0;
                if (a[g]) {
                    v = a[g].userId;
                    h = a[g].arrPai;
                    f = cc.ss.gameNetMgr.getSeatIndexByID(v)
                }
                if (o.comIndex = f, o.arrPai = h, o.comIndex > cc.ss.gameNetMgr.maxplayer) return;
                this.showTSPZD(o.comIndex, o.arrPai)
            }
            for (var p = 0; p < n.length; p++) {
                o = {};
                e.push(cc.delayTime(1));
                var m = 0,
                    _ = 0;
                if (n[p]) {
                    m = n[p].userId;
                    h = n[p].arrPai;
                    _ = cc.ss.gameNetMgr.getSeatIndexByID(m)
                }
                if (o.comIndex = _, o.arrPai = h, o.comIndex > cc.ss.gameNetMgr.maxplayer) return;
                this.showTSPWD(o.comIndex, o.arrPai)
            }
        }
    },
    showCompareResult: function (e, t, a, n) {
        if (!(t.length < 1 || a.length < 1 || n.length < 1)) {
            var i = cc.ss.gameNetMgr.getLocalSeats();
            e.push(cc.delayTime(1));
            var s = function (e) {
                for (var a = 0; a < t.length; a++) {
                    var n = {},
                        s = 0,
                        o = 0;
                    if (t[a]) {
                        s = t[a].userId;
                        var r = t[a].score,
                            c = t[a].arrPai,
                            h = this.getPaiType(c),
                            l = this.getRealType(h, 0),
                            d = o = cc.ss.gameNetMgr.getSeatIndexByID(s)
                    }
                    var u = cc.ss.gameNetMgr.getLocalIndex(o),
                        g = "seat" + i[u],
                        v = this.getSeatCardNodeByName(g);
                    if (null == v) return;
                    if (v.getChildByName("seatcard").active = !0, v.active = !0, n.comIndex = d, n.arrPai = c, n.score = r, n.paiType = l, n.comIndex > cc.ss.gameNetMgr.maxplayer) return;
                    this.showTD(n.comIndex, n.arrPai, n.score, n.paiType)
                }
            }.bind(this);
            e.push(cc.callFunc(s, this.node)),
                e.push(cc.delayTime(1));
            var o = function (e) {
                for (var t = 0; t < a.length; t++) {
                    var n = {},
                        s = 0,
                        o = 0;
                    if (a[t]) {
                        s = a[t].userId;
                        var r = a[t].score,
                            c = a[t].arrPai,
                            h = this.getPaiType(c),
                            l = this.getRealType(h, 1),
                            d = o = cc.ss.gameNetMgr.getSeatIndexByID(s)
                    }
                    var u = cc.ss.gameNetMgr.getLocalIndex(o),
                        g = "seat" + i[u],
                        v = this.getSeatCardNodeByName(g);
                    if (null == v) return;
                    if (v.getChildByName("seatcard").active = !0, v.active = !0, n.comIndex = d, n.arrPai = c, n.score = r, n.paiType = l, n.comIndex > cc.ss.gameNetMgr.maxplayer) return;
                    this.showZD(n.comIndex, n.arrPai, n.score, n.paiType)
                }
            }.bind(this);
            e.push(cc.callFunc(o, this.node)),
                e.push(cc.delayTime(1));
            var r = function (t) {
                for (var a = 0; a < n.length; a++) {
                    var s = {};
                    e.push(cc.delayTime(1));
                    var o = 0,
                        r = 0;
                    if (n[a]) {
                        o = n[a].userId;
                        var c = n[a].score,
                            h = n[a].arrPai,
                            l = this.getPaiType(h),
                            d = this.getRealType(l, 2),
                            u = r = cc.ss.gameNetMgr.getSeatIndexByID(o)
                    }
                    var g = cc.ss.gameNetMgr.getLocalIndex(r),
                        v = "seat" + i[g],
                        f = this.getSeatCardNodeByName(v);
                    if (null == f) return;
                    if (f.getChildByName("seatcard").active = !0, f.active = !0, s.comIndex = u, s.arrPai = h, s.score = c, s.paiType = d, s.comIndex > cc.ss.gameNetMgr.maxplayer) return;
                    this.showWD(s.comIndex, s.arrPai, s.score, s.paiType)
                }
            }.bind(this);
            e.push(cc.callFunc(r, this.node))
        }
    },
    showTSPTD: function (e, t) {
        var a = "seat" + cc.ss.gameNetMgr.getLocalSeats()[cc.ss.gameNetMgr.getLocalIndex(e)],
            n = this.getSeatCardNodeByName(a);
        if (null != n) {
            n.active = !0;
            var i = n.getChildByName("seatcard");
            i.active = !0;
            var s = i.getChildByName("comparPai");
            s.active = !0;
            var o = s.getChildByName("tdPai");
            o.active = !0;
            for (var r = t,
                c = 0; c < 3; c++) {
                var h = o.children[c];
                this.drawCard(h, r[c])
            }
        }
    },
    showTSPZD: function (e, t, a, n) {
        var i = "seat" + cc.ss.gameNetMgr.getLocalSeats()[cc.ss.gameNetMgr.getLocalIndex(e)],
            s = this.getSeatCardNodeByName(i);
        if (null != s) {
            s.active = !0;
            var o = s.getChildByName("seatcard");
            o.active = !0;
            var r = o.getChildByName("comparPai");
            r.active = !0;
            var c = r.getChildByName("zdPai");
            c.active = !0;
            for (var h = t,
                l = 0; l < 5; l++) {
                var d = c.children[l];
                this.drawCard(d, h[l])
            }
        }
    },
    showTSPWD: function (e, t, a, n) {
        var i = "seat" + cc.ss.gameNetMgr.getLocalSeats()[cc.ss.gameNetMgr.getLocalIndex(e)],
            s = this.getSeatCardNodeByName(i);
        if (null != s) {
            s.active = !0;
            var o = s.getChildByName("seatcard");
            o.active = !0;
            var r = o.getChildByName("comparPai");
            r.active = !0;
            var c = r.getChildByName("wdPai");
            c.active = !0;
            for (var h = t,
                l = 0; l < 5; l++) {
                var d = c.children[l];
                this.drawCard(d, h[l])
            }
        }
    },
    showTD: function (e, t, a, n) {
        this.showDaoTypeName(e, 0, n);
        var i = cc.ss.gameNetMgr.getLocalSeats()[cc.ss.gameNetMgr.getLocalIndex(e)],
            s = "seat" + i,
            o = this.getSeatCardNodeByName(s);
        if (null != o) {
            o.active = !0;
            var r = o.getChildByName("seatcard");
            r.active = !0;
            var c = r.getChildByName("comparPai");
            c.active = !0;
            var h = c.getChildByName("tdPai");
            h.active = !0;
            for (var l = t,
                d = 0; d < 3; d++) {
                var u = h.children[d];
                this.drawCard(u, l[d])
            }
            var g = c.getChildByName("FuScore");
            g.active = !1;
            var v = c.getChildByName("zhengScore");
            v.active = !1;
            var f = Math.abs(a);
            a < 0 ? (g.active = !0, g.children[0].active = !0, v.children[0].active = !1, g.children[0].getComponent(cc.Label).string = f) : (v.active = !0, g.children[0].active = !1, v.children[0].active = !0, v.children[0].getComponent(cc.Label).string = f),
                c.getChildByName("fuhao").children[0].active = !0,
                c.getChildByName("texiao").children[0].active = !0,
                this.setFuHao(i, a, 0),
                this.addAllScore(i, a),
                this.showAllScore(i, 0),
                this.paiTexiaoTD(i, n)
        }
    },
    showZD: function (e, t, a, n) {
        this.showDaoTypeName(e, 1, n);
        var i = cc.ss.gameNetMgr.getLocalSeats()[cc.ss.gameNetMgr.getLocalIndex(e)],
            s = "seat" + i,
            o = this.getSeatCardNodeByName(s);
        if (null != o) {
            var r = o.getChildByName("seatcard");
            r.active = !0,
                o.active = !0;
            var c = r.getChildByName("comparPai");
            c.active = !0;
            var h = c.getChildByName("zdPai");
            h.active = !0;
            for (var l = t,
                d = 0; d < 5; d++) {
                var u = h.children[d];
                this.drawCard(u, l[d])
            }
            var g = c.getChildByName("FuScore");
            g.active = !1;
            var v = c.getChildByName("zhengScore");
            v.active = !1;
            var f = Math.abs(a);
            a < 0 ? (g.active = !0, g.children[1].active = !0, v.children[1].active = !1, g.children[1].getComponent(cc.Label).string = f) : (v.active = !0, g.children[1].active = !1, v.children[1].active = !0, v.children[1].getComponent(cc.Label).string = f),
                c.getChildByName("fuhao").children[1].active = !0,
                c.getChildByName("texiao").children[1].active = !0,
                this.setFuHao(i, a, 1),
                this.addAllScore(i, a),
                this.showAllScore(i, 1)
        }
    },
    showWD: function (e, t, a, n) {
        this.showDaoTypeName(e, 2, n);
        var i = cc.ss.gameNetMgr.getLocalSeats()[cc.ss.gameNetMgr.getLocalIndex(e)],
            s = "seat" + i,
            o = this.getSeatCardNodeByName(s);
        if (null != o) {
            o.active = !0;
            var r = o.getChildByName("seatcard");
            r.active = !0;
            var c = r.getChildByName("comparPai");
            c.active = !0;
            var h = c.getChildByName("wdPai");
            h.active = !0;
            for (var l = t,
                d = 0; d < 5; d++) {
                var u = h.children[d];
                this.drawCard(u, l[d])
            }
            var g = c.getChildByName("FuScore");
            g.active = !1;
            var v = c.getChildByName("zhengScore");
            v.active = !1;
            var f = Math.abs(a);
            a < 0 ? (g.active = !0, g.children[2].active = !0, v.children[2].active = !1, g.children[2].getComponent(cc.Label).string = f) : (v.active = !0, g.children[2].active = !1, v.children[2].active = !0, v.children[2].getComponent(cc.Label).string = f),
                c.getChildByName("fuhao").children[2].active = !0,
                c.getChildByName("texiao").children[2].active = !0,
                this.setFuHao(i, a, 2),
                this.addAllScore(i, a),
                this.showAllScore(i, 1)
        }
    },
    playSoundByType: function (e) {
        var t = (1 == cc.ss.userMgr.sex ? "game/sssMusic/Male/celltype" : "game/sssMusic/Female/celltype") + e + ".mp3";
        cc.ss.audioMgr.playSFX(t)
    },
    addAllScore: function (e, t) {
        this.allScore[e] += t
    },
    setAllScore: function (e, t, a) {
        this.allScore[e] = t,
            this.showAllScore(e, a)
    },
    showAllScore: function (e, t) {
        var a = e,
            n = "seat" + a,
            i = this.getSeatCardNodeByName(n);
        if (null != i) {
            var s = i.getChildByName("seatcard");
            s.active = !0;
            var o = s.getChildByName("comparPai");
            o.active = !0;
            var r = o.getChildByName("zhengScore"),
                c = o.getChildByName("FuScore"),
                h = o.getChildByName("fuhao"),
                l = o.getChildByName("Sum");
            if (r.active = !0, c.active = !0, h.active = !0, 2 == t) {
                l.active = !0;
                var d = Math.abs(this.allScore[a]);
                this.allScore[a] < 0 ? (c.children[3].active = !0, r.children[3].active = !1, c.children[3].getComponent(cc.Label).string = d) : (c.children[3].active = !1, r.children[3].active = !0, r.children[3].getComponent(cc.Label).string = d),
                    h.children[3].active = !0,
                    this.setFuHao(a, this.allScore[a], 3)
            }
        }
    },
    arrSort: function (e, t) {
        var a = e.length;
        if (a < 2) t.push(e[0]);
        else for (var n = !1,
            i = 0; i < a; i++) {
            n = !1;
            for (var s = 0; s < a; s++) {
                if (i !== s) 1 === this.comparePai(e[i].arrPai, e[s].arrPai) && (n = !0)
            }
            if (!n) {
                t.push(e[i]),
                    e.splice(i, 1),
                    this.arrSort(e, t);
                break
            }
        }
    },
    getRealType: function (e, t) {
        switch (t) {
            case 0:
                e === s.ST && (e = 4);
                break;
            case 1:
                e === s.WT ? e = 10 : e === s.THS ? e = 9 : e === s.HL ? e = 7 : e === s.TZ && (e = 8)
        }
        return e
    },
    getshuzisprite: function (e) {
        return cc.ss.gameNetMgr.shuzires.getSpriteFrame(e)
    },
    gettexiaosprite: function (e) {
        return cc.ss.gameNetMgr.texiaores.getSpriteFrame(e)
    },
    setFuHao: function (e, t, a) {
        var n = "seat" + e,
            i = this.getSeatCardNodeByName(n);
        if (null != i) {
            var s = i.getChildByName("seatcard");
            s.active = !0,
                s.getChildByName("comparPai").active = !0;
            var o = s.getChildByName("comparPai").getChildByName("fuhao");
            if (o.active = !0, o.children[a].active = !0, t < 0) {
                var r = this.getshuzisprite("fuhao");
                o.children[a].getComponent(cc.Sprite).spriteFrame = r
            } else {
                r = this.getshuzisprite("zhenghao");
                o.children[a].getComponent(cc.Sprite).spriteFrame = r
            }
            0 == a ? this._FstScore[e] = t : 1 == a ? this._SecScore[e] = t : 2 == a && (this._ThdScore[e] = t)
        }
    },
    paiTexiaoTD: function (e, t) { },
    paiTexiaoZD: function (e, t) { },
    paiTexiaoWD: function (e, t) { },
    showShoot: function (e, t) {
        cc.ss.audioMgr.playSFX("game/sssMusic/daqiang.mp3");
        var a = cc.ss.gameNetMgr.getLocalSeats(),
            n = cc.ss.gameNetMgr.getLocalIndex(e),
            i = a[cc.ss.gameNetMgr.getLocalIndexSEx(n)],
            s = cc.ss.gameNetMgr.getLocalIndex(t),
            o = a[cc.ss.gameNetMgr.getLocalIndexSEx(s)],
            r = "seat" + i,
            c = this.getSeatCardNodeByName(r);
        if (null != c) {
            var h = c.getChildByName("GunEffect");
            if (h) {
                h.active = !0;
                var l = h.getChildByName("Attack");
                h.getChildByName("Hit").active = !1,
                    l.active = !0,
                    1 == i || 2 == i ? (l.setScale(- 1, 1), l.x = 120) : l.x = -50,
                    l.y = 150,
                    l.getComponent(cc.Animation).play("AttackAK")
            }
            cc.ss.audioMgr.playSFX("game/sssMusic/Common/jiqiang.mp3");
            var d = "seat" + o,
                u = this.getSeatCardNodeByName(d);
            if (null != u) {
                var g = u.getChildByName("GunEffect");
                if (g) {
                    g.active = !0;
                    var v = g.getChildByName("Attack"),
                        f = g.getChildByName("Hit");
                    v.active = !1,
                        f.active = !0,
                        f.y = 150,
                        f.getComponent(cc.Animation).play()
                }
            }
        }
    },
    hideShoot: function () {
        for (var e = 0; e < cc.ss.gameNetMgr.maxplayer; e++) {
            var t = "seat" + cc.ss.gameNetMgr.getLocalSeats()[cc.ss.gameNetMgr.getLocalIndex(e)],
                a = this.getSeatCardNodeByName(t);
            if (null == a) return;
            var n = a.getChildByName("GunEffect");
            n && (n.active = !1)
        }
    },
    setDaQiangPosition: function (e, t) {
        1 === cc.ss.gameNetMgr.wanfa ? 0 === t ? e.setPosition(- 120, -160) : 1 === t ? e.setPosition(320, 0) : 2 === t ? e.setPosition(- 50, 150) : 3 === t && e.setPosition(- 410, 0) : 0 === t ? e.setPosition(- 33, -141) : 5 === t ? e.setPosition(375, -141) : 3 === t ? e.setPosition(375, 190) : 1 === t ? e.setPosition(- 33, 190) : 2 === t ? e.setPosition(- 487, 190) : 4 === t && e.setPosition(- 487, -141)
    },
    setQiangDir: function (e, t, a) {
        1 === cc.ss.gameNetMgr.wanfa ? 0 === t ? 1 === a ? (e.setScale(- 1, 1), e.setRotation(30)) : 2 === a ? (e.setScale(- 1, 1), e.setRotation(- 20)) : 3 === a && (e.setScale(1, 1), e.setRotation(- 20)) : 1 === t ? 0 === a ? (e.setScale(1, 1), e.setRotation(- 80)) : 2 === a ? (e.setScale(1, 1), e.setRotation(- 20)) : 3 === a && (e.setScale(1, 1), e.setRotation(- 40)) : 2 === t ? 0 === a ? (e.setScale(1, 1), e.setRotation(- 120)) : 1 === a ? (e.setScale(- 1, 1), e.setRotation(70)) : 3 === a && (e.setScale(1, 1), e.setRotation(- 70)) : 3 === t && (0 === a ? (e.setScale(- 1, 1), e.setRotation(90)) : 1 === a ? (e.setScale(- 1, 1), e.setRotation(40)) : 2 === a && (e.setScale(- 1, 1), e.setRotation(20))) : 0 == t ? 1 == a ? (e.setScale(1, 1), e.setRotation(40)) : 2 == a ? (e.setScale(1, 1), e.setRotation(0)) : 3 == a ? (e.setScale(- 1, 1), e.setRotation(0)) : 4 == a ? (e.setScale(1, 1), e.setRotation(- 40)) : 5 == a && (e.setScale(- 1, 1), e.setRotation(40)) : 1 == t ? 0 == a ? (e.setScale(1, 1), e.setRotation(- 140)) : 2 == a ? (e.setScale(1, 1), e.setRotation(- 40)) : 3 == a ? (e.setScale(- 1, 1), e.setRotation(40)) : 4 == a ? (e.setScale(1, 1), e.setRotation(- 80)) : 5 == a && (e.setScale(- 1, 1), e.setRotation(90)) : 2 == t ? 0 == a || 5 == a ? (e.setScale(- 1, 1), e.setRotation(90)) : 1 == a || 3 == a ? (e.setScale(- 1, 1), e.setRotation(40)) : 4 == a && (e.setScale(1, 1), e.setRotation(- 140)) : 3 == t ? 0 == a || 4 == a ? (e.setScale(1, 1), e.setRotation(- 80)) : 1 == a || 2 == a ? (e.setScale(1, 1), e.setRotation(- 40)) : 5 == a && (e.setScale(1, 1), e.setRotation(- 140)) : 4 == t ? 0 == a || 5 == a ? (e.setScale(- 1, 1), e.setRotation(40)) : 1 == a || 3 == a ? (e.setScale(- 1, 1), e.setRotation(0)) : 2 == a && (e.setScale(1, 1), e.setRotation(40)) : 5 == t && (0 == a || 4 == a ? (e.setScale(1, 1), e.setRotation(- 40)) : 1 == a || 2 == a ? (e.setScale(1, 1), e.setRotation(0)) : 3 == a && (e.setScale(1, 1), e.setRotation(40)))
    },
    showDaoTypeName: function (e, t, a) {
        var n = "seat" + cc.ss.gameNetMgr.getLocalSeats()[cc.ss.gameNetMgr.getLocalIndex(e)],
            i = this.getSeatCardNodeByName(n);
        if (null != i) {
            var o = i.getChildByName("seatcard");
            o.active = !0;
            var r = o.getChildByName("tdtype");
            r.active = !1;
            var c = o.getChildByName("zdtype");
            c.active = !1;
            var h = o.getChildByName("teshupaixing");
            h.active = !1;
            var l = null;
            0 == t ? (r.active = !0, l = r.getChildByName("typename")) : 1 == t ? (c.active = !0, l = c.getChildByName("typename")) : 2 == t && (h.active = !0, console.log("showDaoTypeName teshupaixing -----------   show --------- "), l = h.getChildByName("typename")),
                a == s.WL ? l.getComponent(cc.Label).string = "\u4e4c\u9f99" : a == s.YD ? l.getComponent(cc.Label).string = "\u4e00\u5bf9" : a == s.ED ? l.getComponent(cc.Label).string = "\u4e8c\u5bf9" : a == s.ST ? l.getComponent(cc.Label).string = "\u4e09\u6761" : a == s.SZ ? l.getComponent(cc.Label).string = "\u987a\u5b50" : a == s.TH ? l.getComponent(cc.Label).string = "\u540c\u82b1" : a == s.HL ? l.getComponent(cc.Label).string = "\u846b\u82a6" : a == s.TZ ? l.getComponent(cc.Label).string = "\u70b8\u5f39" : a == s.THS ? l.getComponent(cc.Label).string = "\u540c\u82b1\u987a" : a == s.WT && (l.getComponent(cc.Label).string = "\u4e94\u540c"),
                this.playSoundByType(a)
        }
    },
    showSpecialResult: function (e, t, a) {
        if (!(a < 9)) {
            var n = "seat" + cc.ss.gameNetMgr.getLocalSeats()[cc.ss.gameNetMgr.getLocalIndex(e)],
                i = this.getSeatCardNodeByName(n);
            if (null != i) {
                var o = i.getChildByName("seatcard");
                o.active = !0;
                var r = o.getChildByName("teshupaixing");
                r.active = !0,
                    console.log("showSpecialResult teshupaixing -----------   show --------- ");
                var c = r.getChildByName("typename");
                a == s.STH ? (c.getComponent(cc.Label).string = "\u4e09\u6e05", this.playSoundByType(13)) : a == s.SQTHS ? c.getComponent(cc.Label).string = "\u4e09\u6e05+\u540c\u82b1\u987a" : a == s.LDBZD ? c.getComponent(cc.Label).string = "\u516d\u5bf9\u534a+\u70b8\u5f39" : a == s.SSZ ? (c.getComponent(cc.Label).string = "\u4e09\u987a", this.playSoundByType(14)) : a == s.LDB ? (c.getComponent(cc.Label).string = "\u516d\u5bf9\u534a", this.playSoundByType(15)) : a == s.WDST ? (c.getComponent(cc.Label).string = "\u4e94\u5bf9\u4e09\u6761", this.playSoundByType(18)) : a == s.STST ? (c.getComponent(cc.Label).string = "\u56db\u5957\u4e09\u6761", this.playSoundByType(21)) : a == s.QX ? (c.getComponent(cc.Label).string = "\u5168\u5c0f", this.playSoundByType(24)) : a == s.QD ? (c.getComponent(cc.Label).string = "\u5168\u5927", this.playSoundByType(25)) : a == s.QHEI ? c.getComponent(cc.Label).string = "\u5168\u9ed1" : a == s.QHONG ? c.getComponent(cc.Label).string = "\u5168\u7ea2" : a == s.SSTHS ? c.getComponent(cc.Label).string = "\u4e09\u987a+\u540c\u82b1\u987a" : a == s.QHYHEI ? (c.getComponent(cc.Label).string = "\u5168\u7ea2\u4e00\u70b9\u9ed1", this.playSoundByType(19)) : a == s.QHEIYH ? (c.getComponent(cc.Label).string = "\u5168\u9ed1\u4e00\u70b9\u7ea2", this.playSoundByType(20)) : a == s.SFTX ? (c.getComponent(cc.Label).string = "\u4e09\u5206\u5929\u4e0b", this.playSoundByType(26)) : a == s.STHS ? (c.getComponent(cc.Label).string = "\u4e09\u987a\u6e05", this.playSoundByType(11)) : a == s.YTL ? (c.getComponent(cc.Label).string = "\u4e00\u6761\u9f99", this.playSoundByType(28)) : a == s.ZZQL ? (c.getComponent(cc.Label).string = "\u81f3\u5c0a\u4e00\u6761\u9f99", this.playSoundByType(30)) : a == s.SEHZ && (c.getComponent(cc.Label).string = "\u5341\u4e8c\u7687\u65cf", this.playSoundByType(29))
            }
        }
    },
    getPaiType: function (e) {
        return e.sort(function (e, t) {
            return t.value - e.value
        }),
            i.getType(e)[0]
    },
    comparePai: function (e, t) {
        var a = this.getPaiType(e),
            n = this.getPaiType(t);
        return a > n ? 1 : a === n ? i.compareSameType(e, t, a) : -1
    },
    showPaibei: function () {
        if (this._showPai = !0, 0 != this._loadcard) {
            this.cardnode.active = !0;
            cc.ss.gameNetMgr.getLocalSeats();
            for (var e = cc.ss.gameNetMgr.seats,
                t = 0; t < e.length; t++) {
                var a = e[t].userid;
                if (0 != a && !(cc.ss.gameNetMgr.fapaiusers.length > 0 && -1 == cc.ss.gameNetMgr.fapaiusers.indexOf(a))) {
                    var n = cc.ss.gameNetMgr.getSeatIndexByID(a),
                        i = cc.ss.gameNetMgr.getLocalIndex(n);
                    if (console.log("showPaibei   i == " + t + "  uid=  " + a + "  iid=  " + n + "  localIndex==  " + i), a == cc.ss.userMgr.userId) continue;
                    else this.showOthersPaiBei(n)
                }
            }
        }
    },
    usersPeiPai: function (e) {
        var t = e.chupaiid,
            a = e.data;
        console.log("usersPeiPai -----------");
        for (var n = 0; n < a.length; n++) if (0 != a[n].userId && a[n].userId == cc.ss.userMgr.userId && 0 == a[n].isChuPai) return;
        if (console.log("usersPeiPai ---------1--"), this._peipaidata = e, this._showPeiPai = !0, 0 != this._loadcard) {
            console.log("usersPeiPai ---------3--");
            for (var i = 0; i < a.length; i++) if (a[i].userId == cc.ss.userMgr.userId) if (3 == cc.ss.gameNetMgr.myComebackCardData.length) {
                if (this.showMyPai(cc.ss.gameNetMgr.myComebackCardData), a[i].userId == t) {
                    var s = cc.ss.gameNetMgr.getSeatIndexByID(a[i].userId);
                    this.showSpecialResult(s, null, cc.ss.gameNetMgr.specialType)
                }
            } else if (0 == this.mySelfPai.length) {
                var o = cc.ss.gameNetMgr.myHandCard.specialData;
                if (o.length > 0) {
                    if (this.showMyPai(o), a[i].userId == t) {
                        s = cc.ss.gameNetMgr.getSeatIndexByID(a[i].userId);
                        this.showSpecialResult(s, null, cc.ss.gameNetMgr.myHandCard.type)
                    }
                } else {
                    for (var r = cc.ss.gameNetMgr.myHandCard.holds,
                        c = [], h = [], l = 0; l < 3; l++) c.push(r[12 - l]);
                    h.push(c),
                        c = [];
                    for (var d = 0; d < 5; d++) c.push(r[9 - d]);
                    h.push(c),
                        c = [];
                    for (var u = 0; u < 5; u++) c.push(r[4 - u]);
                    h.push(c),
                        this.showMyPai(h)
                }
            } else this.showMyPai(this.mySelfPai);
            else this.showOthersPeiPai(a[i].userId, a[i].isChuPai)
        }
    },
    showOthersPeiPai: function (e, t) {
        var a = cc.ss.gameNetMgr.getLocalSeats(),
            n = cc.ss.gameNetMgr.getSeatIndexByID(e),
            i = a[cc.ss.gameNetMgr.getLocalIndex(n)],
            s = "seat" + i,
            o = this.getSeatCardNodeByName(s);
        if (null != o) {
            var r = o.getChildByName("seatcard");
            r.active = !0,
                o.active = !0;
            var c = r.getChildByName("comparPai");
            c.active = !0,
                c.getChildByName("tdPai").active = !1,
                c.getChildByName("zdPai").active = !1,
                c.getChildByName("wdPai").active = !1;
            var h = r.getChildByName("lipai");
            h.active = !0,
                console.log("showOthersPeiPai == status =" + t),
                console.log("showOthersPeiPai ==2 stindex =" + n + " seatindex= " + i),
                1 == t ? (h.getChildByName("peipaidi").active = !1, h.getChildByName("finished").active = !0, h.getChildByName("peipaifinish").active = !0, h.getChildByName("PeiPaiZhong").active = !1) : (h.getChildByName("finished").active = !1, h.getChildByName("peipaifinish").active = !1, h.getChildByName("peipaidi").active = !0, h.getChildByName("PeiPaiZhong").active = !0, h.getChildByName("PeiPaiZhong").getComponent(cc.Animation).play("PeiPaiZhong"))
        }
    },
    HidePeiPaiZi: function () {
        this.cardnode.active = !0;
        for (var e = cc.ss.gameNetMgr.seats,
            t = cc.ss.gameNetMgr.getLocalSeats(), a = 0; a < e.length; a++) {
            var n = e[a].userid;
            if (0 != n && !(cc.ss.gameNetMgr.fapaiusers.length > 0 && -1 == cc.ss.gameNetMgr.fapaiusers.indexOf(n))) {
                console.log("HidePeiPaiZi == ==========uid =" + n);
                var i = cc.ss.gameNetMgr.getSeatIndexByID(n),
                    s = "seat" + t[cc.ss.gameNetMgr.getLocalIndex(i)],
                    o = this.getSeatCardNodeByName(s);
                if (null != o) {
                    var r = o.getChildByName("seatcard").getChildByName("lipai");
                    r.active = !1;
                    for (var c = 0; c < r.childrenCount; c++) r.children[c].active = !1
                }
            }
        }
    },
    testdaqiang: function () {
        this.showShoot(0, 3)
    },
    getSeatCardNodeByName: function (e) {
        if (this.seatscard.length > 0) for (var t = 0; t < this.seatscard.length; t++) {
            var a = this.seatscard[t];
            if (a.name == e) return a
        }
        return null
    }
});
//     cc._RF.pop()
// },
// {
//     Compare: "Compare",
//     sssUtils: "sssUtils"
// }],