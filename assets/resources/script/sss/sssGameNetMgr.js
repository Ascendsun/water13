var n;
// var i = require("../../Manager/ListenerManager");
function s(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a,
    e
}
var utils = require("sssUtils");
cc.Class((s(n = {
    extends: cc.Component,
    properties: {
        dataEventHandler: null,
        roomId: null,
        numOfGames: 0,
        seatIndex: -1,
        seats: null,
        turn: -1,
        host: -1,
        throw: -1,
        chupai: -1,
        gamestate: 0,
        isOver: !1,
        dissoveData: null,
        maxplayer: 6,
        serverVersion: null,
        wanfa: null,
        wanfa1: null,
        reconnect: 0,
        myHandCard: null,
        baipaiOk: !1,
        _msgCacheQueue: [],
        _HaveloadNodeHand: !1,
        _HaveloadResPorker: !1,
        _HaveloadMyPorkers: !1,
        _HaveloadPrepare: !1,
        _HaveloadCards: !1,
        myComebackCardData: [],
        fapaiusers: [],
        flagoutcard: !1
    },
    onLoad: function() {

          null != cc.ss && (
            this._msgCacheQueue = [],
             this._HaveloadNodeHand = false, 
             this._HaveloadResPorker = false, 
             this._HaveloadMyPorkers = false, 
             this._HaveloadPrepare = false, 
             this._HaveloadCards = false, 
             this.myComebackCardData = [], //回来的牌的保存位置
             cc.log('初始化了onLoadsssgamenetmgr挂载到全局节点.........................................'),
             cc.ss.gameNetMgr = this, 
             this.initHandlers(),//添加commend and evert
             this.gamestate = utils.GameState.GAME_PREPARE)    
             console.log('进入到这个load完成');
    },
    reset: function(e) {
        if (this.turn = -1, this.chupai = -1, this.host = -1, this.gamestate = utils.GameState.GAME_PREPARE, this.wanfa = null, this.wanfa1 = null, this.myHandCard = null, this.reconnect = 0, this._msgCacheQueue = [], this.myComebackCardData = [], e) this.seats = null,
        this.roomId = null,
        this.numOfGames = 0;
        else if (this.seats) for (var t = 0; t < this.seats.length; ++t) {
            var a = this.seats[t];
            a.seatindex = t,
            a.holds = [],
            a.holds_count = 0,
            a.ready = !1,
            cc.ss.userMgr.userId == a.userid && (this.seatIndex = t)
        }
    },
    clear: function() {
        this.dataEventHandler = null,
        null != this.isOver && 0 != this.isOver || this.reset(!0)
    },
    getAdaptationScale: function() {
        var e = (1280 / 720).toFixed(3),
        t = (cc.winSize.width / cc.winSize.height).toFixed(3);
        return e >= t ? t / e: e / t
    },
    dispatchEvent: function(e, t) {
        this.dataEventHandler && this.dataEventHandler.emit(e, t)
    },
    getSeatIndexByID: function(e) {
        if (this.seats) for (var t = 0; t < this.seats.length; ++t) {
            if (this.seats[t].userid == e) return t
        }
        return - 1
    },
    isOwner: function() {
        return 0 == this.seatIndex
    },
    getSeatByID: function(e) {
        var t = this.getSeatIndexByID(e);
        return - 1 == t ? null: this.seats[t]
    },
    getSelfData: function() {
        return this.seats[this.seatIndex]
    },
    getLocalSeats: function() {
        return 2 == this.maxplayer ? [0, 3] : //2个人玩
               3 == this.maxplayer ? [0, 2, 4] : //3个人玩
               4 == this.maxplayer ? [0, 2, 3, 4] : //4个人玩
               5 == this.maxplayer ? [0, 1, 2, 4, 5] : //5个人玩
               [0, 1, 2, 3, 4, 5]//6个人玩
    },
    getLocalIndex: function(e) {
        if (this.seats) {
            switch (this.maxplayer) {
            case 0:
                break;
            case 1:
                var t = (e - this.seatIndex + 1) % 1;
                break;
            case 2:
                t = (e - this.seatIndex + 2) % 2;
                break;
            case 3:
                t = (e - this.seatIndex + 3) % 3;
                break;
            case 4:
                t = (e - this.seatIndex + 4) % 4;
                break;
            case 5:
                t = (e - this.seatIndex + 5) % 5;
                break;
            case 6:
            default:
                t = (e - this.seatIndex + 6) % 6
            }
            return t
        }
    },
    getLocalIndexSEx: function(e) {
        if (this.seats) {
            var t = this.maxplayer;
            return (e + this.seatIndex) % t
        }
    },
    getLocalIndexEx: function(e) {
        var t = this.getLocalSeats(),
        a = this.getLocalIndex(e);
        return t[this.getLocalIndexSEx(a)]
    },
    prepareReplay: function() {
        var e = cc.ss.replayMgr._replayData,
        t = e.room_info,
        a = e.base_info;
        this._lastAction = null,
        cc.ss.gameNetMgr.gamestate = utils.GameState.GAME_REPLAY,
        this.roomId = t.id,
        this.seats = [];
        for (var n = 0; n < t.seats.length; n++) t.seats[n].userid > 0 && this.seats.push(t.seats[n]);
        this.maxplayer = a.players,
        this.numOfGames = a.numOfGames;
        for (var i = 0; i < this.seats.length; ++i) {
            var s = this.seats[i];
            s.seatindex = i,
            s.score = null,
            s.holds = a.game_seats[i],
            s.holds_count = 0,
            s.xipaicount = 0,
            s.online = !0,
            cc.ss.userMgr.userId == s.userid && (this.seatIndex = i)
        }
        this.conf = a.conf,
        console.log('this.conf');
        console.log(this.conf)
        null == this.conf.type && this.conf.type,
        this.dispatchEvent("init_replay")
    },
    takeAction: function(e) {
        if (e.type != utils.ACTION_CHUPAI);
        else {
            var t = this.convertReplayDataToResults(e.pai);
            this.dispatchEvent("set_data", t)
        }
    },
    convertReplayDataToResults: function(e) {
        if (null != e) {
            var t = e[1].length,
            a = {
                mapai: null,
                userinfo: []
            };
            a.mapai = {};
            for (var n = 0; n < t; n++) {
                var i = {
                    userId: 0,
                    userName: [],
                    allScore: 0,
                    score: 0,
                    tdPai: [],
                    zdPai: [],
                    wdPai: [],
                    tdScore: 0,
                    zdScore: 0,
                    wdScore: 0,
                    daqiang: 0,
                    dan: 0,
                    quanleida: !1,
                    teshuPaiType: 0
                },
                s = e[1][n];
                i.userId = s[0],
                i.userName = s[1],
                i.allScore = s[2],
                i.score = s[3];
                for (var o = 0; o < 3; o++) i.tdPai.push(s[4][o]);
                for (var r = 0; r < 5; r++) i.zdPai.push(s[5][r]);
                for (var c = 0; c < 5; c++) i.wdPai.push(s[6][c]);
                s[7] && (i.tdScore = s[7]),
                s[8] && (i.zdScore = s[8]),
                s[9] && (i.wdScore = s[9]),
                s[10] && (i.daqiang = s[10]),
                s[11] && (i.dan = s[11]),
                s[12] && (i.quanleida = s[12]),
                s[13] && (i.teshuPaiType = s[13]),
                a.userinfo.push(i)
            }
            return a
        }
    },
    showReplay: function(e) {},
    getWanfaEx: function() {
        if (console.log("getWanfaEx ========  =  " + this.conf), this.conf) {
            var e = this.conf;
            if (e.mapai > 0) {
                var t = {
                    type: 1,
                    value: [0, 14, 5, 10][e.mapai]
                };
                e.mapai > 0 && (this.maCard = t)
            }
            var a = [],
            n = "房间号：" + cc.ss.gameNetMgr.roomId + ",";
            a.push(n);
            a.push(["6人", "5人", "4人", "3人", "2人"][e.renshu]),
            2 == e.zhifu ? a.push("赢家支付   ") : 1 == e.zhifu ? a.push("房主支付   ") : a.push("AA支付   "),
            this.wanfa = a.join(" ")
        }
        return this.wanfa ? this.wanfa: ""
    },
    getWanfaDetail: function() {
        console.log("getWanfaDetail ========  =  " + this.conf);
        var e = [];
        if (this.conf) {
            var t = this.conf,
            a = [];
            if (1 == t.wanfa ? a.push("经典，") : 0 == t.wanfa ? a.push("特殊无百变，") : 2 == t.wanfa ? a.push("特殊百变，") : 3 == t.wanfa && a.push("台州版，"), e.push(a), a = [], 1 == t.wanfa || 3 == t.wanfa);
            else {
                if (2 == t.wanfa && (0 == t.jiawang ? a.push("1王, ") : 1 == t.jiawang ? a.push("2王, ") : 2 == t.jiawang && a.push("4王, "), e.push(a), a = []), t.mapai > 0) {
                    var n = "马牌：" + ["无马", "黑桃A", "黑桃5", "黑桃10"][t.mapai] + " ";
                    a.push(n),
                    e.push(a),
                    a = [];
                    var i = {
                        type: 1,
                        value: [0, 14, 5, 10][t.mapai]
                    };
                    t.mapai > 0 && (this.maCard = i)
                }
                if (t.renshu < 2) {
                    var s = ["无加色", "黑桃", "红桃", "梅花", "方块"],
                    o = [];
                    o = t.jiase1 == t.jiase2 ? "加色：" + s[t.jiase1] + " ": "加色：" + s[t.jiase1] + "  " + s[t.jiase2] + " ",
                    a.push(o),
                    e.push(a),
                    a = []
                } else if (2 == t.renshu) {
                    var r = [];
                    t.jiase1 > 0 && (r = "加色：" + ["无加色", "黑桃", "红桃", "梅花", "方块"][t.jiase1] + " ", a.push(r), e.push(a), a = [])
                }
            }
            a.push(["无黑波浪，", "有黑波浪，"][t.bolang]),
            e.push(a),
            a = [];
            var c = ["不限时", "60秒", "90秒"][t.peipai];
            a.push(c),
            e.push(a),
            a = [],
            this.wanfa1 = e
        }
        return e
    },
    getWanfa: function() {
        var e = "";
        return this.conf && (e = this.getWanfaEx() + this.getJushuText()),
        e
    },
    getJushuText: function() {
        var e = cc.ss.gameNetMgr.numOfGames;
        0 == e && (e = 1);
        return e + "/" + cc.ss.gameNetMgr.conf.maxGames + "局  "
    },

    initHandlers: function() {
        var e = this,
        t = 0;
        cc.log("login_result302");
        cc.ss.net.addHandler("login_result",//监听登录结果
        function(a) {//这是返回数据
            if (console.log("login_result -----------------------" + a), 0 === a.errcode) {
                a = a.data;
                t = a.dissolveRequest,
                e.roomId = a.roomid,
                e.conf = a.conf,
                e.numOfGames = a.numofgames,
                e.maxplayer = a.conf.players,
                e.seats = [];
                for (var n = 0; n < e.maxplayer; n++) a.seats[n].xipaicount = 0,
                e.seats.push(a.seats[n]);
                e.seatIndex = e.getSeatIndexByID(cc.ss.userMgr.userId),
                -1 == e.seatIndex && cc.director.loadScene("hall"),
                e.isOver = !1,
                null == e.myHandCard && (console.log("login_result--------- self.myHandCard - ---------"), e.getHandCardMsg());
                var i = {
                    msg: "login_result",
                    data: a
                };
                e.doThrowMsg(i),
                console.log("login_result--------- self.seatIndex - ---------", e.seatIndex)
            } else console.log("conf err " + a.errmsg);
            e.dispatchEvent("login_result"),
            0 == t && e.dispatchEvent("dissolve_notice_hide")
        }),
        cc.ss.net.addHandler("login_finished",
        function(t) {
            e.dispatchEvent("login_finished"),
            i.ListenerManager.getInstance().trigger("login_finished")
        }),
        cc.ss.net.addHandler("game_new_join_push",
        function(t) {
            e.dispatchEvent("game_new_join", t)
        }),
        cc.ss.net.addHandler("exit_result",
        function(t) {
            e.reconnect = null,
            e.roomId = null
        }),
        cc.ss.net.addHandler("exit_notify_push",
        function(t) {
            var a = t,
            n = e.getSeatByID(a);
            null != n && (n.userid = 0, n.name = "", e.dispatchEvent("user_state_changed", n), i.ListenerManager.getInstance().trigger("check_ip", n))
        }),
        cc.ss.net.addHandler("dispress_push",
        function(t) {
            e.roomId = null,
            e.turn = -1,
            e.seats = null,
            e.reconnect = null,
            cc.ss.alert.show("离开房间", "房间已解散",
            function() {
                cc.ss.wc.show("正在返回游戏大厅"),
                cc.director.loadScene("hall")
            })
        }),
        cc.ss.net.addHandler("disconnect",
        function(t) {
            null == e.roomId ? (cc.ss.wc.show("正在返回游戏大厅..."), i.ListenerManager.getInstance().trigger("game_over_push"), cc.director.loadScene("hall"), console.log("disconnect**************3******")) : (cc.ss.userMgr.oldRoomId = e.roomId, e.dispatchEvent("disconnect"))
        }),
        cc.ss.net.addHandler("new_user_comes_push",
        function(t) {
            var a = t.seatindex,
            n = !1;
            e.seats[a].userid > 0 ? (e.seats[a].online = !0, e.seats[a].ip != t.ip && (e.seats[a].ip = t.ip, n = !0)) : (t.online = !0, e.seats[a] = t, n = !0),
            2 == e.gamestate || 0 == e.gamestate ? e.seats[a].ready = t.ready: e.seats[a].ready = !1,
            e.dispatchEvent("new_user", e.seats[a]),
            n && e.dispatchEvent("check_ip", e.seats[a])
        }),
        cc.ss.net.addHandler("user_state_push",
        function(t) {
            var a = t.userid,
            n = e.getSeatByID(a);
            n.online = t.online,
            n && (1 != e.gamestate && 3 != e.gamestate || (n.ready = !1), e.dispatchEvent("user_state_changed", n))
        }),
        cc.ss.net.addHandler("game_version_push",
        function(t) {
            e.serverVersion = t.version
        }),
        cc.ss.net.addHandler("chat_push",
        function(t) {
            e.dispatchEvent("chat_push", t)
        }),
        cc.ss.net.addHandler("quick_chat_push",
        function(t) {
            e.dispatchEvent("quick_chat_push", t)
        }),
        cc.ss.net.addHandler("emoji_push",
        function(t) {
            e.dispatchEvent("emoji_push", t)
        }),
        cc.ss.net.addHandler("updata_fapaiwanjia_push",
        function(t) {
            e.fapaiusers = [],
            console.log("updata_fapaiwanjia_push88888888888888888888"),
            t && (e.fapaiusers = t.concat()),
            console.warn(e.fapaiusers)
        }),
        cc.ss.net.addHandler("dissolve_notice_push",
        function(t) {
            t.drcooltime && (e.getSelfData().drcooltime = t.drcooltime),
            e.dispatchEvent("dissolve_notice", t)
        }),
        cc.ss.net.addHandler("dissolve_fail_push",
        function(t) {
            e.dispatchEvent("dissolve_fail", t)
        }),
        cc.ss.net.addHandler("dissolve_cancel_push",
        function(e) {
            i.ListenerManager.getInstance().trigger("dissolve_cancel", e)
        }),
        cc.ss.net.addHandler("voice_msg_push",
        function(t) {
            e.dispatchEvent("voice_msg", t)
        }),
        cc.ss.net.addHandler("show_zhanji_push",
        function(t) {
            e.dispatchEvent("show_zhanji", t)
        }),
        cc.ss.net.addHandler("game_xxxxx_push",
        function(t) {
            e.enableHappyMahs = t,
            e.dispatchEvent("game_xxxxx", t)
        }),
        cc.ss.net.addHandler("client_xxxxx_push",
        function(t) {
            e.dispatchEvent("client_xxxxx", t)
        }),
        cc.ss.net.addHandler("out_card_lastTime",
        function(t) {
            var a = t,
            n = {
                msg: "set_lastTime",
                data: a
            };
            e.doThrowMsg(n),
            1 == e._HaveloadPrepare && e.dispatchEvent("set_lastTime", a)
        }),
        cc.ss.net.addHandler("out_lixianTime",
        function(t) {
            var a = t;
            e.dispatchEvent("set_lixianTime", a)
        }),
        cc.ss.net.addHandler("out_dissolutionTime",
        function(t) {
            var a = t;
            e.dispatchEvent("set_dissolutionTime", a)
        }),
        cc.ss.net.addHandler("user_ready_push",
        function(t) {
            var a = t.userid,
            n = e.getSeatByID(a);
            n && (n.ready = t.ready, n.online = !0, e.dispatchEvent("user_state_changed", n)),
            e.dispatchEvent("user_ready", t)
        }),
        cc.ss.net.addHandler("game_mapai_push",
        function(t) {
            e.maPaiData = t,
            e.dispatchEvent("game_mapai", t)
        }),
        cc.ss.net.addHandler("game_num_push",
        function(t) {
            e.numOfGames = t
        }),
        cc.ss.net.addHandler("show_prepare_push",
        function(e) {}),
        cc.ss.net.addHandler("game_holds_push",// 发牌
        function(t) {
            cc.log('发牌返回的消息'+JSON.stringify(t));
            var a = e.seats[e.seatIndex];
            e.specialData = [],
            a.holds = t.holds,
            e.myHandCard = t,
            e.specialType = t.type,
            e.specialData = t.specialData.concat(),
            1 != e.conf.wanfa && 3 != e.conf.wanfa || (e.specialData = [], e.specialType = 0);
            for (var n = 0; n < e.seats.length; ++n) {
                var i = e.seats[n];
                if (0 != i.userid) {
                    i.ready = !1;
                    var s = {
                        msg: "user_state_changed",
                        data: i
                    };
                    e.doThrowMsg(s)
                }
            }
            e.dispatchEvent("game_holds", t.holds);
            var o = {
                msg: "game_holds",
                data: t.holds
            };
            e.doThrowMsg(o)
        }),
        cc.ss.net.addHandler("compare_result_push",
        function(t) {
            e.gamestate = utils.GameState.GAME_COMPARE;
            var a = {
                msg: "compare_result",
                data: t
            };
            e.doThrowMsg(a),
            1 == e._HaveloadCards && e.dispatchEvent("compare_result", t),
            e.singleReset()
        }),
        cc.ss.net.addHandler("user_xipai_count",
        function(t) {
            for (var a = 0; a < e.seats.length; ++a) {
                var n = e.seats[a];
                if (n.userid == t.userid) {
                    n.xipaicount = t.xipaicount;
                    break
                }
            }
        }),
        cc.ss.net.addHandler("out_maxPai_push",
        function(t) {
            e.dispatchEvent("out_maxPai_Notify")
        }),
        cc.ss.net.addHandler("game_start",
        function(e) {}),
        cc.ss.net.addHandler("player_outCard",
        function(t) {
            if (1 == e._HaveloadPrepare && 1 == e._HaveloadCards) e.dispatchEvent("player_outCard_notify", t);
            else {
                var a = {
                    msg: "player_outCard_notify",
                    data: t
                };
                e.doThrowMsg(a)
            }
        }),
        cc.ss.net.addHandler("quick_swing_push",
        function(t) {
            e.dispatchEvent("quick_swing_notify", t)
        }),
        cc.ss.net.addHandler("quick_swing_card_data",
        function(t) {
            e.myComebackCardData = [],
            e.myComebackCardData = t.concat()
        }),
        cc.ss.net.addHandler("game_begin_push",
        function(t) {
            e.gamestate = utils.GameState.GAME_START,
            e.dispatchEvent("game_begin")
        }),
        cc.ss.net.addHandler("game_sync_push",
        function(t) {
            console.log("game_sync_push-----------ssss--- state= " + t.state),
            e._HaveloadCards = !1,
            e.dispatchEvent("game_sync", t);
            var a = e.seats[e.seatIndex];
            console.log(t),
            e.myHandCard = {//牌结构
                holds: [],
                specialData: [],
                type: 0
            },
            e.gamestate = t.state;
            for (var n = 0; n < e.maxplayer; n++) 3 != t.state && 1 != t.state || (e.seats[n].ready = !1),
            0 != e.seats[n].userid && e.dispatchEvent("user_state_changed", e.seats[n]);
            if (0 != t.state) {
                if (0 == e.conf.wanfa || 2 == e.conf.wanfa) {
                    if (!t.holds) return;
                    e.myHandCard.specialData = t.holds.specialData,
                    e.myHandCard.type = t.holds.type,
                    cc.ss.gameNetMgr.specialType = t.holds.type
                }
                if (e.myHandCard.holds = t.holds.cards, a.holds = [], a.holds = t.holds.cards, e.wanfa = t.wanfa, e.maxNumOfGames = t.maxGames, e.numOfGames = t.numOfGames, t.zjID && (e.zjID = t.zjID), 3 === e.wanfa && t.mapaiData.value > 0 ? e.maPaiData = t.mapaiData: e.maPaiData = null, 3 === t.state && (e.isBiPai = !0, e.chupaidata = t.chupaidata, t.chupaidata)) {
                    a.result = t.result;
                    var i = t.comparePai;
                    if (t.holds.specialData.length > 0) e.myComebackCardData = [],
                    e.myComebackCardData = t.holds.specialData.concat();
                    else for (var s = 0; s < i.length; s++) cc.ss.userMgr.userId == i[s].userId && (e.myComebackCardData = [], e.myComebackCardData = i[s].data.concat());
                    for (var o = !0,
                    r = 0; r < t.chupaidata.length; r++) 0 == t.chupaidata[r].isChuPai && (o = !1);
                    if (1 == o && t.result) {
                        var c = {
                            msg: "compare_result",
                            data: t
                        };
                        return e.doThrowMsg(c),
                        1 == e._HaveloadCards && e.dispatchEvent("compare_result", t),
                        void e.singleReset()
                    }
                    for (var h = 0; h < t.chupaidata.length; h++) if (t.chupaidata[h].userId == cc.ss.userMgr.userId) if (1 == t.chupaidata[h].isChuPai) {
                        var l = {
                            chupaiid: cc.ss.userMgr.userId,
                            data: t.chupaidata
                        };
                        if (1 == e._HaveloadPrepare && 1 == e._HaveloadCards) e.dispatchEvent("player_outCard_notify", l);
                        else {
                            var d = {
                                msg: "player_outCard_notify",
                                data: l
                            };
                            e.doThrowMsg(d)
                        }
                    } else {
                        e.doThrowMsg({
                            msg: "shezhipai",
                            data: null
                        }),
                        1 == e._HaveloadPrepare && e.dispatchEvent("shezhipai")
                    }
                } else {
                    if (a.result = t.result, 2 == t.state) return t.result && e.dispatchEvent("game_over", t.result),
                    void(t.totalResult && (a.totalResult = t.totalResult, e.dispatchEvent("game_result", t.totalResult)));
                    if (t.state <= 1 && a.holds && a.holds.length > 0 && t.state < 3) {
                        e.doThrowMsg({
                            msg: "shezhipai",
                            data: null
                        }),
                        1 == e._HaveloadPrepare && e.dispatchEvent("shezhipai")
                    }
                }
            }
        }),
        cc.ss.net.addHandler("game_over_push",
        function(t) {
            e.overdata = {},
            e.overdata = t,
            e.gamestate = utils.GameState.GAME_OVER;
            for (var a = t,
            n = 0; n < e.seats.length; n++) for (var i = 0; i < a.length; i++) a[i].userId === e.seats[n].userid && (e.seats[n].score += a[i].allScore)
        }),
        cc.ss.net.addHandler("game_state_push",
        function(t) {
            console.log("game_state_push *************** "),
            e.dispatchEvent("game_state")
        }),
        cc.ss.net.addHandler("game_result",
        function(t) {
            e.resultdata = {},
            e.resultdata = t,
            t[t.length - 1] ? e.dispatchEvent("game_end_force", t) : e.dispatchEvent("game_end", t),
            i.ListenerManager.getInstance().trigger("game_over_push")
        }),
        cc.ss.net.addHandler("game_xipai_push",
        function(t) {
            e.dispatchEvent("game_xipai")
        }),
        cc.ss.net.addHandler("game_baipai_push",
        function(t) {
            e.dispatchEvent("game_baipai", t)
        }),
        cc.ss.net.addHandler("stopEndTime",
        function(t) {
            e.dispatchEvent("stopEndTime")
        })
    },
    doChupai: function(e, t) {
        this.chupai = t;
        var a = this.seats[e];
        if (a.holds) {
            var n = a.holds.indexOf(t);
            a.holds.splice(n, 1)
        }
        this.dispatchEvent("game_chupai_notify", {
            seatData: a,
            pai: t
        })
    },
    doTurnChange: function(e) {
        var t = {
            last: this.turn,
            turn: e
        };
        this.turn = e,
        this.dispatchEvent("game_chupai", t)
    },
    getHandCardMsg: function() {
        cc.log('初始化发送了同步--------------------------------getsync')
        cc.ss.net && cc.ss.net.send("getsync")
    },
    clearClock: function() {
        for (var e = 0; e < this.seats.length; ++e) this.seats[e].seatindex != this.seatIndex && this.dispatchEvent("clear_clock", this.seats[e])
    },
    clearAlarm: function() {
        for (var e = 0; e < this.seats.length; ++e) this.seats[e].seatindex != this.seatIndex && this.dispatchEvent("clear_alarm", this.seats[e])
    }
},"doChupai", function(e, t) {
    this.chupai = t;
    var a = this.seats[e];
    if (a.holds) {
        var n = a.holds.indexOf(t);
        a.holds.splice(n, 1)
    }
    this.dispatchEvent("game_chupai_notify", {
        seatData: a,
        pai: t
    }),
    this.dispatchEvent("game_timeout")
}), 

s(n, "doGameOver",function(e) {
    this.dispatchEvent("game_over", e);
    for (var t = 0; t < this.seats.length; t++) 0 != this.seats[t].userid && this.dispatchEvent("user_state_changed", this.seats[t])
}), 

s(n, "singleReset",function() {
    for (var e = 0; e < this.seats.length; ++e) this.seats[e].holds = [],
    this.seats[e].ready = !1,
    this.seats[e].score = 0
}), 

s(n, "getOutSortWeight",function(e) {
    if (null == e) return 0;
    var t = Math.abs(e.value);
    return t > 2 && t < 15 ? t: 2 == t ? 29 : 15 == t || 16 == t ? t + 229 : void 0
}), 

s(n, "sortHolds",function(e) {
    for (var t in e) for (var a in e) if (t.value < a.value) {
        var n = t;
        t = a,
        a = n
    }
    return e
}), 

s(n, "getcardresindex",function(e, t) {
    return t > 20 ? "back": t + 13 * e - 1
}), 

s(n, "sortOuts",function(e) {
    var t = this,
    a = e.concat();
    return a.sort(function(e, a) {
        var n = t.getOutSortWeight(e),
        i = t.getOutSortWeight(a);
        return n > i ? -1 : n < i ? 1 : 0
    }),
    a
}),

s(n, "playSoundBySex",function(e, t) {
    var a = 1,
    n = cc.ss.baseInfoMap[e];
    n && (a = n.sex);
    var i = 1 == a ? "game/sssMusic/Male/celltype/": "game/sssMusic/Female/celltype/";
    i += "{0}.mp3".format(t),
    cc.ss.audioMgr.playSFX(i)
}),

s(n, "playSoundCommon",function(e) {
    var t = "game/sssMusic/Common/";
    t += "{0}.mp3".format(e),
    cc.ss.audioMgr.playSFX(t)
}),

s(n, "playPhraseSound",function(e, t) {
    if (! (t < 0 || t >= 16)) {
        var a = 1,
        n = cc.ss.baseInfoMap[e];
        n && (a = n.sex);
        var i = 1 == a ? "game/ddz/phrase/man/": "game/ddz/phrase/woman/";
        i += "{0}.mp3".format(t + 1),
        cc.ss.audioMgr.playSFX(i)
    }
}),

s(n, "onDestroy",function() {
    cc.ss.net.removeAllHandler()
}),

s(n, "randomBetween",function(e, t) {
    return Math.floor(Math.random() * (t - e + 1) + e)
}),

s(n, "playCommonSound",function(e) {
    var t = "game/ddz/common/" + e + ".mp3";
    cc.ss.audioMgr.playSFX(t)
}),

s(n, "drawCard",function(e, t) {
    console.log("cardinfo 什么鬼-----");
    var 
    a = e.parent.getChildByName("xiaowang"),
    n = e.parent.getChildByName("dawang"),
    i = e.parent.getChildByName("val"),
    s = e.parent.getChildByName("color");
    a.active = false,
    n.active = false,
    i.active = true,    
    s.active = true,
    t || console.log("cardinfo error");
    var r = Math.abs(t.value),
    c = t.type;//牌类型这里应该是 红|黑|方|花
    // if (this.conf.mapai > 0) {
    //     var h = e.parent.getChildByName("shadow");
    //     h.active = !1,
    //     this.maCard && this.maCard.type == c && this.maCard.value == r && (h.active = !0)
    // }
  //  cc.log('------------------------------')
 
    cc.log(c);//=1.2.3.4
    var l = "images/atlas/pokernew/c" + c;
    var d = "";
    c == utils.CardColor.CARD_COLOR_KING ? (s.active = !1, i.active = !1, 
    t.value == utils.PaiValue.VAL_KING_SMALL ? a.active = !0 : t.value == utils.PaiValue.VAL_KING_BIG && (n.active = !0)) : c == utils.CardColor.CARD_COLOR_HEI || c == utils.CardColor.CARD_COLOR_MEI ? "" == d && (d = "images/atlas/pokernew/r" + r) : c != utils.CardColor.CARD_COLOR_HONG && c != utils.CardColor.CARD_COLOR_FANG || "" == d && (d = "images/atlas/pokernew/b" + r),
    "" != d && this.drawCardSprite(i.getComponent(cc.Sprite), d),
     "" != l && (this.drawCardSprite(s.getComponent(cc.Sprite), l), 
     cc.log(s.getChildByName("color")),
   this.drawCardSprite(s.getChildByName("color").getComponent(cc.Sprite), l))
}),

s(n, "drawCardSprite",function(e, t) {
    console.log(t)
    console.log(cc.ss.gameNetMgr);
    cc.ss.gameNetMgr._cardRes[t] && (e.spriteFrame = cc.ss.gameNetMgr._cardRes[t])
}),

s(n, "GemsCheck",function(e) {
    var t = this.conf.players,
    a = this.conf.zhifu,
    n = 1;
    20 == this.conf.maxGames ? n = 1.7 : 30 == this.conf.maxGames && (n = 2.5);
    var i = 0;
    0 == a ? i = n: 1 == a ? this.conf.creator == cc.ss.userMgr.userId && (i = n * t) : 2 == a && (i = n * t);
    var s = cc.ss.userMgr.gems;
    return parseInt(i + e) <= parseInt(s)
}),

s(n, "doThrowMsg",function(e) {
    if (console.log(" -------- doThrowMsg  msg " + e.msg), 
    0 == this._HaveloadMyPorkers || 0 == this._HaveloadNodeHand || 0 == this._HaveloadPrepare || 0 == this._HaveloadResPorker || 0 == this._HaveloadCards || !cc.ss.gameNetMgr.seats) 
    return console.log(" doThrowMsg  msg " + e.msg)
    void this._msgCacheQueue.push(e)
}),

s(n, "update",function() {
    if (this._msgCacheQueue && this._msgCacheQueue.length > 0) {
        if (1 == this._HaveloadPrepare && 1 == this._HaveloadCards) {
            var e = this._msgCacheQueue[0];
            if (e && "player_outCard_notify" == e.msg) return console.log(" update  dispatchEvent11  msg " + e.msg),
            this._msgCacheQueue.splice(0, 1),
            void this.dispatchEvent(e.msg, e.data)
        }
        if (1 == this._HaveloadMyPorkers && 1 == this._HaveloadNodeHand && 1 == this._HaveloadPrepare && 1 == this._HaveloadResPorker) {
            var t = this._msgCacheQueue[0];
            if (t) {
                if ("player_outCard_notify" == t.msg) return;
                console.log(" update  dispatchEvent  msg " + t.msg),
                this._msgCacheQueue.splice(0, 1),
                this.dispatchEvent(t.msg, t.data)
            }
        }
    }
}), n))
