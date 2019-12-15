 var n = function (e) {
     return e && e.__esModule ? e : {
         default:
             e
     }
 }(require("BaseView"));

 var sssUtils = require("sssUtils");
//   require("gameSeatCard"),
//   require("Compare");

cc.Class({
    extends:  n.default,
    properties: {
        _rootnodeprepare: null,
        preparePrefabs: {
            default:
                null,
            type: cc.Prefab
        },
        cardPrefabs: {
            default:
                null,
            type: cc.Prefab
        },
        shuzi: {
            default:
                null,
            type: cc.SpriteAtlas
        },
        texiao: {
            default:
                null,
            type: cc.SpriteAtlas
        },
        setType: {
            default:
                null,
            type: cc.Node
        },
        _timeLabel: null,
        _voiceMsgQueue: [],
        _lastPlayingSeat: null,
        _playingSeat: null,
        _lastPlayTime: null,
        _gamecount: null,
        preparepai: null,
        startAnim: null,
        compareAnim: null,
        pokernode: null,
        _handCardResArr: [],
        _preparemypai: [],
        _loadfinished: !1,
        _shezhipai: !1,
        _xipai: !1,
        _btnReady: null,
        _btnXiPai: null,
        _btnResult: null,
        _showresult: !1,
        _isfapai: !1,
        baipainode: cc.Node,
        flagoutcard: !1,
        basesuoping: !1
    },
    onLoad: function () {
        cc.ss && (this._rootpath = "Canvas/base",
        this.addComponent("sssRoom"), 
        this.addComponent("gameSeatCard"),
        this.addComponent("sssGameResult"), 
        this.initView(), 
        this.initEventHandlers(),
        cc.ss.utils.addEscEvent(this.node), 
        this.basesuoping = !1, 
        this.initReplayData())
    },
    initReplayData: function () {
        cc.ss.replayMgr.isReplay() && (
            this.baipainode.active = false, 
            cc.ss.gameNetMgr.prepareReplay(),
             this.initWanfaLabel(), 
             this.addComponent("replay"))
    },
    resetView: function () {
        cc.ss.gameNetMgr.resetUserHost(),
            cc.ss.gameNetMgr.clearClock(),
            cc.ss.gameNetMgr.clearWenzi(),
            cc.ss.gameNetMgr.clearCardLeftNum(),
            this._handCardResArr = [],
            this.baipainode.active = false,
            this.flagoutcard = false
    },
    resetData: function () {
        cc.ss.gameNetMgr.hostCards = [],
            cc.ss.gameNetMgr.baseScore = 1,
            cc.ss.gameNetMgr.host = -1
    },
    initView: function () {
            this._prepareNode = cc.find("center/prepare", this.node),
            this._prepareNode.active = false,
            this.node.getChildByName("btns_l").active = !cc.ss.replayMgr.isReplay(),//这俩个可能是语音和消息按钮
            this.node.getChildByName("btns_r").active = !cc.ss.replayMgr.isReplay(),
            this._btnReady = this.node.getChildByName("center").getChildByName("btnReady"),
            this._btnXiPai = this.node.getChildByName("center").getChildByName("btnXiPai"),
            this._btnResult = this.node.getChildByName("center").getChildByName("btnResult"),
            this._btnReady.active = false,
            this._btnXiPai.active = false,
            this._btnResult.active = false,
            this._showresult = false,
            this._isfapai = false,
            cc.ss.gameNetMgr.gamestate > sssUtils.GameState.GAME_PREPARE ? this.baipainode.active = true : this.baipainode.active = false,//////////////这里检查是否打开摆牌节点
            // this.baipainode.active = true,//这里是后加的
            this._shezhipai = false,
            this._loadfinished = false,
            this._handCardResArr = [],
            cc.ss.gameNetMgr.shuzires = this.shuzi,
            cc.ss.gameNetMgr.texiaores = this.texiao,
            this._xipai = false
    },
    showJushu: function () {//显示局数
        var e = cc.ss.gameNetMgr.getJushuText();
        this._btn_zhanji && (this._btn_zhanji.getChildByName("bout").getComponent(cc.Label).string = e)
    },
    showroomNumber: function (e) {//显示房间号
        var t = cc.find("Canvas/base/center");
        t.active = true,
        t.getChildByName("prepare").active = false
    },
    onBtnGPS: function (e) {//gps距离
        this.openView("sssCheckPlayersIP", "prefabs/game/sss/", 0,
            function (e) {
                e.getComponent("sssCheckPlayersIP").setPlayersInfo()
            })
    },
    initMyPai: function () {//初始化我牌
        this.myPaiCom = this._rootnodeprepare.getChildByName("myPai").getComponent("myPai"),
            this.myPaiCom.initDt(),
            this.myPaiCom.game = this
    },
    onBtnBackground: function () {
        this._history_zhanji && (this._history_zhanji.active = !1)
    },
    onBtnChat: function (e) {
        this.openView("Chat", "prefabs/game/common/", 0,
            function (e) {
                e.getComponent("Chat").setQuickChatInfo(i.QuickChatInfo),
                    e.getComponent("Chat").showTabInfo(1)
            })
    },
    onBtnInvite: function () {
        var e = cc.ss.gameNetMgr.getSelfData(),
            t = (cc.ss.gameNetMgr.conf.creator == e.userid ? "【房主】" : "") + (e.name + " 邀请您加入大菠萝房间：") + cc.ss.gameNetMgr.roomId,
            a = "" + cc.ss.gameNetMgr.getWanfa();
        this.openView("ShareView", null, 0,
            function (e) {
                e.shareRoomID(t, a, cc.ss.gameNetMgr.roomId)
            }),
            this.openView("ShareView",
                function (e) {
                    e.shareGame("【宝宝台州麻将】无需下载，点击开战", "快点调来，即开即玩，无需等待，邀您来战", cc.ss.userMgr.userId)
                })
    },
    onBtnSetting: function () {//设置窗口
        this.openView("SetView", null, 0,
            function (e) {
                e.getComponent("SetView").showInGame()
            })
    },
    onBtnRuleOpen: function () {//玩法规则
        this.openView("sssrule", "prefabs/game/sss/", 0,
            function (e) {
                var t = cc.ss.gameNetMgr.getWanfaDetail();
                e.getComponent("sssrule").showWanFaInfo(t)
            })
    },
    onBtnZhangji: function () {//战绩
        cc.ss.net.send("zhan_ji")
    },
    ShowZhanJi: function (e) {//显示战绩
        var t = cc.ss.gameNetMgr.maxplayer;
        this.openView("sssgamezhanji", "prefabs/game/sss/", 0,
            function (a) {
                a.getComponent("sssgamezhanji").showInGame(e, t)
            })
    },
    onBtnReadyClick: function (e) {
        console.log("onBtnReady"),
            cc.ss.net.send("ready"),
            cc.ss.gameNetMgr.reset(),
            this.showreadyBtns(!1, !1)
    },
    onBtnReadyClick1: function (e) {//发送准备按钮；
        console.log("onBtnReady1"),
            cc.ss.net.send("ready"),
            this.node.getChildByName("center").getChildByName("prepare").getChildByName("btnReady").getComponent(cc.Button).interactable = !1
    },
    onBtnXiPai: function () {
        0 == this.CurrentUserXipaiCount ? (cc.ss.net.send("xipai"), this.onBtnReadyClick(null)) : this.openView("xipaitip", "prefabs/game/sss/", 0,
            function (e) {
                e.getComponent("xipaitip").showTip(0)
            })
    },
    onGameXiPai: function () {
        this._xipai = !0
    },
    onBtnTipXiPaiOK: function () {
        cc.ss.userMgr.gems-- ,
            cc.ss.net.send("xipai"),
            this.onBtnReadyClick(null)
    },
    onBtnZhanJi: function () {
        cc.ss.gameNetMgr.dispatchEvent("show_result")
    },
    hidePrepare: function () {
        this._prepareNode && (this._prepareNode.active = !1)
    },
    initBtns: function () {
        this.resetOptionBtns()
    },
    resetOptionBtns: function () {
        this.unschedule(this.setTimeFunc)
    },
    showreadyBtns: function (e, t) {
        this.node.getChildByName("center").active = !0,
            this._btnReady.active = e,
            this._btnXiPai.active = e,
            this._btnResult.active = t,
            t && this.scheduleOnce(this.delayShowResult, 3)
    },
    initEventHandlers: function () {
        cc.ss.gameNetMgr.dataEventHandler = this.node;
        var e = this;
        this.node.on("game_begin",//开始游戏
            function (t) {
                e.resetGame()
            }),
            this.node.on("game_holds",//发牌
                function (t) {
                    console.log("_HaveloadMyPorkers  1 = " + 
                    cc.ss.gameNetMgr._HaveloadMyPorkers + 
                    "  _HaveloadNodeHand = " + 
                    cc.ss.gameNetMgr._HaveloadNodeHand + 
                    " _HaveloadPrepare =  " + 
                    cc.ss.gameNetMgr._HaveloadPrepare + 
                    "  _HaveloadResPorker = " + 
                    cc.ss.gameNetMgr._HaveloadResPorker),

                    0 == cc.ss.gameNetMgr._HaveloadMyPorkers || 0 == cc.ss.gameNetMgr._HaveloadNodeHand || 0 == cc.ss.gameNetMgr._HaveloadPrepare || 0 == cc.ss.gameNetMgr._HaveloadResPorker || e.onGameHolds()
                }),
            this.node.on("game_xipai",//洗牌
                function (t) {
                    e.onGameXiPai()
                }),
            this.node.on("game_baipai",//摆牌
                function (t) {
                    e.onGameBaiPai(t)
                }),
            this.node.on("game_new_join",//新人加入
                function (t) {
                    e.newUserJoinGame(t)
                }),
            this.node.on("self_ready",//自己准备
                function (e) { }),
            this.node.on("other_ready",//其他人准备
                function (e) { }),
            this.node.on("game_mapai",//我的牌
                function (t) {
                    e.showMaPai()
                }),
            this.node.on("compare_result",//比牌结果
                function (t) {
                    e.showResultData(t)
                }),
            this.node.on("shezhipai",//设置牌
                function (t) {
                    e.doSheZhiMyCard()
                }),
            this.node.on("game_result_Notify",//设置总结果通知
                function (t) {
                    e.setTotalResult(t)
                }),
            this.node.on("quick_swing_notify",//快速交换牌通知
                function (t) {
                    e.quickSwing(t)
                }),
            this.node.on("player_outCard_notify",//亮牌通知
                function (t) {
                    e.playerOutCardNotify(t)
                }),
            this.node.on("out_maxPai_Notify",//最大牌通知
                function (t) {
                    e.outMaxPai()
                }),
            this.node.on("set_lastTime",//计时时长
                function (t) {
                    e.setLastTime(t)
                }),
            this.node.on("user_state_offline",//在线状态
                function (t) {
                    e.offline(t)
                }),
            this.node.on("set_lixianTime",//离线时间
                function (t) {
                    e.setlixianTime(t)
                }),
            this.node.on("show_zhanji",//战绩
                function (t) {
                    e.ShowZhanJi(t)
                }),
            this.node.on("game_sync",  //游戏同步
                function (t) {
                    t.state > 0 && e.showroomNumber(!1),
                        0 == t.state ? 0 == e.flagoutcard ? (e.showreadyBtns(!0, !1), console.log("-----1----showreadyBtns(true)    ==")) : (e.showreadyBtns(!1, !1), console.log("-----1----showreadyBtns(false)    ==")) : e.showreadyBtns(!1, !1),
                        console.log("game_sysc=============="),
                        e.loadHandCardPrefab(),
                        e.loadpreparescreen(),
                        e.LoadPokerRes(),
                        0 == cc.ss.gameNetMgr._HaveloadCards && cc.ss.seatcard.seatscard.length > 0 && (cc.ss.gameNetMgr._HaveloadCards = !0)
                }),
            this.node.on("game_state",//游戏状态
                function (t) {
                    e.loadHandCardPrefab(),
                        e.loadpreparescreen(),
                        e.LoadPokerRes()
                }),
            this.node.on("show_prepare",//显示准备
                function (e) { }),
            this.node.on("game_reset",//游戏复位
                function (t) {
                    e.cleargame()
                }),
            this.node.on("UserXiPai",//洗牌
                function (t) {
                    e.onBtnTipXiPaiOK()
                }),
            this.node.on("user_ready",//准备
                function (t) {
                    if (t.userid == cc.ss.userMgr.userId) {
                        var a = cc.find("center/prepare/btnReady", e.node),
                            n = cc.find("center/prepare/btn_invite", e.node);
                        1 == t.ready ? (a.active = !1, n.x = 0) : (a.active = !0, n.x = 130)
                    }
                }),
            this.node.on("UserBaiPai",//摆牌
                function (t) {
                    e.onBaipai()
                }),
            this.node.on("login_result",//显示结果
                function () {
                    cc.ss.audioMgr.playBGM("bgFight"),
                       // e.shareRoomID(),
                        e.initWanfaLabel(),
                        e.showRoomNO()
                }),
            this.node.on("init_replay",//冲放
                function (t) {
                    e.loadHandCardPrefab(),
                        cc.ss.replayMgr.setLoadResFinished(!0),
                        e.showreadyBtns(!1, !1),
                        e.node.getChildByName("Z_backgroud").active = !1,
                        e.node.getChildByName("infobar").active = !1
                }),
            this.node.on("game_over",//游戏结束
                function (t) {
                    e._isfapai = !1,
                        e.flagoutcard = !1;
                    var a = t.userInfo,
                        n = 0;
                    e.CurrentUserXipaiCount = 0;
                    for (var i = cc.ss.gameNetMgr.seats,
                        s = 0; s < i.length; s++) if (i[s].userid == cc.ss.userMgr.userId) {
                            e.CurrentUserXipaiCount = i[s].xipaicount;
                            break
                        }
                    for (var o = 0; o < a.length; o++) if (a[o].userId == cc.ss.userMgr.userId) {
                        n = a[o].score;
                        break
                    }
                    if (1 == e._showresult) e.showreadyBtns(!1, e._showresult);
                    else {
                        e.showreadyBtns(!0, !1),
                            console.log("---2------showreadyBtns(true)    ==");
                        var r = e.node.getChildByName("myselfcard");
                        r.active = !1;
                        for (var c = 0; c < 13; c++) r.children[c].active = !1;
                        e.btnxipaistate(e.CurrentUserXipaiCount, n)
                    }
                }),
            this.node.on("game_end",//显示游戏结果
                function (t) {
                    e._showresult = !0
                })
    },
    initWanfaLabel: function () {//初始化玩法
        cc.find(this._rootpath + "/infobar/wanfa").getComponent(cc.Label).string = cc.ss.gameNetMgr.getWanfa()
    },
    showRoomNO: function () {//显示房间号
        cc.ss.gameNetMgr.roomId ? (this._prepareNode.active = 0 == cc.ss.gameNetMgr.numOfGames, cc.ss.replayMgr.isReplay() && (this._prepareNode.active = !1)) : this._prepareNode.active = !1
    },
    newUserJoinGame: function (e) {//新玩家加入房间
        console.log("newUserJoinGame ====================");
        var t = cc.find("center/prepare", this.node);
        t.active = 1 != e,
            1 == this._btnReady.active && this.showreadyBtns(!1, !1)
    },
    btnxipaistate: function (e, t) {//洗牌状态
        this._btnXiPai.active = !0;
        var a = this._btnXiPai.getChildByName("price");
        t < 0 ? 0 == e ? (a.getComponent(cc.Label).string = "免费x1", this._btnXiPai.getComponent(cc.Button).interactable = !0) : (1 == cc.ss.gameNetMgr.GemsCheck(1) ? this._btnXiPai.getComponent(cc.Button).interactable = !0 : this._btnXiPai.getComponent(cc.Button).interactable = !1, a.getComponent(cc.Label).string = "房卡x1") : (this._btnXiPai.getComponent(cc.Button).interactable = !1, 0 == e ? (a.getComponent(cc.Label).string = "免费x1", this._btnXiPai.getComponent(cc.Button).interactable = !1) : (1 == cc.ss.gameNetMgr.GemsCheck(1) ? this._btnXiPai.getComponent(cc.Button).interactable = !0 : this._btnXiPai.getComponent(cc.Button).interactable = !1, a.getComponent(cc.Label).string = "房卡x1"))
    },
    getHolds: function () {//
    !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        var e = cc.ss.gameNetMgr.myHandCard.holds;
        return e && e.length > 0 ? e : (console.log(" getHolds   []     index ================  " + cc.ss.gameNetMgr.seatIndex), [])
    },
    loadpreparescreen: function () {//准备场景
        console.log("load   prepare----------------- "),
            null == this._rootnodeprepare ? cc.loader.loadRes("prefab/prepare", cc.Prefab,
                function (e, t) {
                    if (e) return cc.error(e),
                        void console.log(" load  prepare error");
                    this._rootnodeprepare = cc.instantiate(t),
                        this._rootnodeprepare.active = !1,
                        this.node.addChild(this._rootnodeprepare),
                        this.preparepai = this._rootnodeprepare.getChildByName("myPai");
                    var a = this._rootnodeprepare.getChildByName("shezhipai");
                    this.shezhiPaiCom = a.getComponent("shezhipai"),
                        this.shezhiPaiCom.game = this,
                        this.initMyPai(),
                        this._myPaiPos = [],
                        cc.ss.gameNetMgr._HaveloadPrepare = !0,
                        console.log("load prepare 1  -------------")
                }.bind(this)) : cc.ss.gameNetMgr._HaveloadPrepare = !0
    },

    playAnimStartXiPaiBiPai: function (e) {// 玩家开始洗牌动画
        null == this.stnode || this.playAnimByName(e)
    },

    playAnimByName: function (e) {//开始游戏动画名称
        var t = this.stnode;
        if (t) {
            if (t.active = !0, "start" == e) {//开始游戏动画
                t.active = !0;
                var a = t.getChildByName("StartGame");
                a.active = !0;
                var n = a.getChildByName("StartGame");
                return n.active = !0,
                    void n.getComponent(cc.Animation).play()
            }
            if ("xipai" == e) {
                var i = t.getChildByName("XiPai");//洗牌动画
                i.active = !0,
                    i.getComponent(cc.Animation).play("XiPai")
            } else if ("bipai" == e) {
                var s = t.getChildByName("StartComparing");//摆牌动画
                s.active = !0,
                    s.getComponent(cc.Animation).play("StartComparing")
            }
        }
    },
    loadHandCardPrefab: function () {//载入手牌预制
        var e = this;
        console.log("load   porker ----------------- "),
            !0 !== cc.ss.gameNetMgr._HaveloadResPorker && cc.loader.loadResDir("timages/atlas/pokernew", cc.SpriteFrame,
                function (t, a, n) {
                    e._cardUrls = n,
                        e._cardAssets = a,
                        cc.ss.gameNetMgr._cardRes = [];
                    for (var i = 0; i < e._cardUrls.length; i++) e._cardUrls[i] && (cc.ss.gameNetMgr._cardRes[e._cardUrls[i]] = e._cardAssets[i]);
                    this._loadfinished = !0,
                        cc.ss.gameNetMgr._HaveloadResPorker = !0,
                        console.log("load   poker--1---------------- ")
                }.bind(this))
    },
    LoadPokerRes: function () {//载入扑克资源
        console.log("load   res ----------------- "),
            null == this.pokerprefab ? cc.loader.loadRes("prefab/node_handcard", cc.Prefab,
                function (e, t) {
                    e ? cc.error(e) : (this.pokerprefab = t, this.loadMyselfCard(), console.log("load   res  1----------------- "), cc.ss.gameNetMgr._HaveloadNodeHand = !0)
                }.bind(this)) : cc.ss.gameNetMgr._HaveloadNodeHand = !0
    },
    loadMyselfCard: function () {//载入我自己拍
        var e = this.node.getChildByName("myselfcard");
        e.active = !0,
            this._handCardResArr = [];
        for (var t = 0; t < 13; t++) if (null != this.pokerprefab) {
            var a = cc.instantiate(this.pokerprefab);
            a.x = 80 * t - 120,
                a.y = 0,
                a.active = !1,
                a.parent = e,
                a.getChildByName("shadow").active = !1,
                this._handCardResArr.push(a)
        }
        cc.ss.gameNetMgr._HaveloadMyPorkers = !0
    },
    showHolds: function () {//显示对手牌
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
            t = this.node.getChildByName("myselfcard");
        t.active = !0;
        for (var a = 0; a < 13; a++) t.children[a].active = !1;
        for (var n = this.getHolds(e), i = 0; i < n.length; i++) {
            var s = t.children[i];
            s.active = !0,
                cc.ss.gameNetMgr.drawCard(s, n[i])
        }
    },
    showMyPai: function () {//显示我的牌
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
            t = this._rootnodeprepare.getChildByName("myPai");
        t.getComponent("myPai").setInfo();
        for (var a = 0; a < 13; a++) t.children[a].active = !1;
        var n = this.getHolds(e);
        t.getComponent("myPai").setMyPaiData(n);
        for (var i = 0; i < n.length; i++) {
            var s = t.children[i];
            s.active = !0,
                cc.ss.gameNetMgr.drawCard(s, n[i])
        }
        var o = this._rootnodeprepare.getComponent("touch");
        o.reset(),
            o.cancelWD(),
            o.cancelZD(),
            o.cancelTD(),
            o.refreshMyPai()
    },
    onBtnGameExit: function (e) {//退出游戏时间
        if (1 == (0 == cc.ss.gameNetMgr.numOfGames)) cc.ss.gameNetMgr.conf.creator == cc.ss.userMgr.userId ? cc.ss.alert.show("解散房间", "您是否请求解散房间？(第一局未结算，解散房间不扣房卡)",
            function () {
                cc.ss.net.send("dispress")
            },
            !0) : cc.ss.alert.show("离开房间", "是否确定离开房间？",
                function () {
                    cc.ss.net.send("exit")
                },
                !0);
        else {
            var t = cc.ss.gameNetMgr.getSelfData();
            if (t.drcooltime) {
                var a = Date.now();
                if (console.log("剩余时间：", t.drcooltime - a), a <= t.drcooltime) return void cc.ss.alert.show("解散房间", "操作过于频繁,请稍后再试")
            }
            cc.ss.alert.show("解散房间", "是否确定申请解散房间？",
                function () {
                    cc.ss.net.send("dissolve_request")
                },
                !0)
        }
    },
    resetGame: function () {//开始游戏 清理桌面
            this.showroomNumber(false),
            this.zjId && this.zjbiaoshi(this.zjId),
            this.showreadyBtns(false, false),
            this.initWanfaLabel(),
            this.loadHandCardPrefab(),
            this.loadpreparescreen(),
            this.LoadPokerRes()
    },
    cleargame: function () {//清理游戏
        this.showreadyBtns(!1, !1)
    },
    playerOutCardNotify: function (e) {//出牌通知
        this._isfapai = !1,
            this.flagoutcard = !0,
            this.showreadyBtns(!1, !1);
        for (var t = cc.ss.userMgr.userId,
            a = e.data,
            n = 0; n < a.length; n++) if (a[n].userId) {
                if (0 == a[n].userId) continue;
                a[n].userId == t && a[n].isChuPai && (this.baipainode.active = !0, this.baipainode.getChildByName("Button").getComponent(cc.Button).active = !0, this._rootnodeprepare.active = !1)
            }
    },
    delayShowResult: function () {//延迟显示结果
        cc.ss.gameNetMgr.dispatchEvent("show_result")
    },
    outMaxPai: function () {//输出最大牌
        this.shezhiPaiCom.reset(),
            this.unschedule(this.setkaishi),
            this.unschedule(this.setAnimation)
    },
    onGameHolds: function () {//发牌
        if (this.flagoutcard = true, 1 != this._isfapai) {
            if (this._isfapai = true, 
            this._rootnodeprepare.active = false,
            1 == cc.ss.gameNetMgr.GemsCheck(1) ? 
            this.baipainode.getChildByName("Button").getComponent(cc.Button).interactable = true : //按钮点击有效
            this.baipainode.getChildByName("Button").getComponent(cc.Button).interactable = false, //按钮点击无效
            this.showreadyBtns(false, false), //显示准备按钮
            null != this.stnode) return 
            this.playAnimStartXiPaiBiPai("start"),//播放开始动画
            void this.playfapaiAnimation(1);//播放发牌动画
            cc.loader.loadRes("prefabs/Start", cc.Prefab,
                function (e, t) {
                    e ? cc.error(e) : (
                     this.stnode = cc.instantiate(t),
                     this.node.addChild(this.stnode), 
                     this.playAnimStartXiPaiBiPai("start"), 
                     this.playfapaiAnimation(1))
                }.bind(this))
        }
    },
    playfapaiAnimation: function (e) {//发牌动画
        this.setAnimation = function () {
            cc.ss.gameNetMgr.dispatchEvent("game_ustatus"),
                this.fapaiAnimateNew()
        },
            this.setkaishi = function () {
                this.setAnimation(),
                    this.startAnimHide(),
                    this.xipaiAnimHide()
            },
            1 == this._xipai ? (this.scheduleOnce(this.xipaiAnimPlay, 1), this.scheduleOnce(this.setkaishi, 4)) : this.scheduleOnce(this.setkaishi, e)
    },
    onGameBaiPai: function (e) {//摆牌
    (0 == e || null == e) && 1 == cc.ss.gameNetMgr.GemsCheck(1) ? this.baipainode.getChildByName("Button").getComponent(cc.Button).interactable = !0 : this.baipainode.getChildByName("Button").getComponent(cc.Button).interactable = !1
    },
    onSendBaipai: function (e) {//发送摆牌
        this.openView("xipaitip", "prefabs/game/sss/", 0,
            function (e) {
                e.getComponent("xipaitip").showTip(1)
            })
    },
    onBaipai: function () {
        3 != cc.ss.gameNetMgr.gamestate && 2 != cc.ss.gameNetMgr.gamestate && (cc.ss.seatcard.cardnode.active = !1, this._rootnodeprepare.active = !0, console.log(" onBaipai 设置 牌  "), this.showMyPai(!0), cc.ss.userMgr.gems = cc.ss.userMgr.gems - 1, cc.ss.net.send("baipai"))
    },
    onResetAllSeat: function () {//复位全部座位
        this.resetALLSeat()
    },
    initSetType: function () {
        this.setType = this.setType.getComponent("setType"),
            this.setType.game = this
    },
    compareAnimPlay: function () {
        this.playAnimStartXiPaiBiPai("bipai")
    },
    compareAnimHide: function () {
        var e = this.stnode;
        e && (e.active = !1, e.getChildByName("StartComparing").active = !1)
    },
    xipaiAnimPlay: function () {
        this.playAnimStartXiPaiBiPai("xipai"),
            this._xipai = !1
    },
    xipaiAnimHide: function () {
        var e = this.stnode;
        e && (e.getChildByName("XiPai").active = !1)
    },
    startAnimHide: function () {
        var e = this.stnode;
        if (e) {
            var t = e.getChildByName("StartGame");
            t.active = !1,
                t.getChildByName("StartGame").active = !1
        }
    },
    showMaPai: function () {
        console.log("setMaPai")
    },
    showResultData: function (e) {
        console.log("setResultData : " + e),
            this.compareAnimPlay(),
            this.scheduleOnce(this.compareAnimHide, 1),
            this.baipainode.active = !1,
            cc.ss.audioMgr.playSFX("game/sssMusic/begin_pokercmp.mp3")
    },
    setZhuang: function () {
        this.setZhuangNode.active = !0;
        for (var e = cc.ss.gameNetMgr.seats,
            t = 0; t < 4; t++) {
            var a = this.setZhuangNode.getChildByName("name" + t),
                n = a.getChildByName("Label").getComponent(cc.Label);
            e[t].imgLoader = a.getComponent("ImageLoader"),
                n.string = e[t].name,
                a.tag = e[t].userid,
                e[t].imgLoader && e[t].userid && e[t].imgLoader.setUserID(e[t].userid)
        }
    },
    zjbiaoshi: function (e) {
        this.zjId = e;
        for (var t = cc.ss.gameNetMgr.seats,
            a = 0; a < t.length; a++) if (t[a].userid === e) cc.ss.gameNetMgr.getLocalIndex(t[a].seatindex)
    },
    fapaiAnimateNew: function () {//发牌动画
        console.log(" ------------------ fapaiAnimateNew");
        var e = this.getHolds(),
            t = this;
        t.node.getChildByName("myselfcard").active = !0;
        for (var a = 0; a < 13; a++) {
            t._handCardResArr[a].active = !1
        }
        cc.loader.loadRes("textures/sk/pokernew/pokerback", cc.SpriteFrame,
            function (a, n) {
                var i = new cc.Node("dealnode");
                i.addComponent(cc.Sprite).spriteFrame = n,
                    t.node.addChild(i),
                    i.setPosition(cc.p(0, 0)),
                    i.scale = 1.7;
                for (var s = cc.ss.gameNetMgr.seats,
                    o = (cc.ss.gameNetMgr.maxplayer, t.node.getChildByName("seats")), r = cc.ss.gameNetMgr.getLocalSeats(), c = function () {
                        for (var e = 0; e < s.length; ++e) if (0 != s[e].userid && !(cc.ss.gameNetMgr.fapaiusers.length > 0 && -1 == cc.ss.gameNetMgr.fapaiusers.indexOf(s[e].userid))) {
                            var t = cc.ss.gameNetMgr.getLocalIndex(e),
                                a = r[t];
                            if (0 != a) o.getChildByName("seat" + a).getChildByName("cardnum").active = !1
                        }
                    }.bind(this), h = function (a) {
                        if (0 == s[a].userid) return "continue";
                        if (cc.ss.gameNetMgr.fapaiusers.length > 0 && -1 == cc.ss.gameNetMgr.fapaiusers.indexOf(s[a].userid)) return "continue";
                        var n = cc.ss.gameNetMgr.getLocalIndex(a),
                            h = r[n],
                            l = cc.p(0, 0);
                        if (0 != h) {
                            var d = o.getChildByName("seat" + h),
                                u = d.getChildByName("pokerback");
                            d.getChildByName("cardnum").active = !0;
                            var g = u.parent.convertToWorldSpaceAR(u.position);
                            l = t.node.convertToNodeSpaceAR(g)
                        }
                        var v = 0;
                        t.scheduleOnce(function () {
                            for (var n = 0,
                                o = function (o) {
                                    t.scheduleOnce(function () {
                                        var r = cc.instantiate(i);
                                        r.parent = t.node;
                                        var d = cc.scaleTo(.3, 1);
                                        if (0 == h) {
                                            var u = t._handCardResArr[v],
                                                g = u.position,
                                                f = u.parent.convertToWorldSpaceAR(g);
                                            l = t.node.convertToNodeSpaceAR(f),
                                                d = cc.scaleTo(.3, 2)
                                        }
                                        var p = cc.moveTo(.3, l),
                                            m = cc.callFunc(function () {
                                                r.removeFromParent(!0),
                                                    n++ ,
                                                    0 == h ? (t.drawCardValue(t._handCardResArr[o], e[o]), t._handCardResArr[o].active = !0) : (s[a].holds_count = o + 1, cc.ss.gameNetMgr.dispatchEvent("holds_count", s[a])),
                                                    n >= 13 && (s[a].holds_count = n, t.doShowDealCard(s[a]), c())
                                            }),
                                            _ = cc.spawn(p, d),
                                            y = cc.sequence(_, m);
                                        r.runAction(y),
                                            0 == h && v++
                                    },
                                        o / 13)
                                },
                                r = 0; r < 13; r++) o(r)
                        })
                    },
                    l = 0; l < s.length; ++l) h(l)
            })
    },
    doShowDealCard: function (e) {//显示发牌
        if ((1 == cc.ss.gameNetMgr._HaveloadCards && cc.ss.seatcard.ResetView(), e.seatindex == cc.ss.gameNetMgr.seatIndex) && (this.node.getChildByName("myselfcard").active = !1, 13 == e.holds_count)) {
            var t = this.node.getChildByName("dealnode");
            t && t.removeFromParent(!0),
                this._rootnodeprepare.active = !0,
                console.log(" doShowDealCard 设置 牌  "),
                this.showMyPai(!0)
        }
    },
    doSheZhiMyCard: function () {
        if (this._shezhipai = !0, 0 != this._loadfinished && 1 != this._isfapai) {
            this._rootnodeprepare.active = !0,
                console.log(" doSheZhiMyCard 设置 牌  "),
                this.showMyPai(!0)
        }
    },
    onDealFinished: function () {//发牌结束
        console.log("onDealFinished  showHolds ------------------------------"),
            this.showHolds();
        var e = this.node.getChildByName("dealnode");
        e && e.removeFromParent(!0)
    },
    drawCardValue: function (e, t) {
        cc.ss.gameNetMgr.drawCard(e, t)
    },
    onShowOtherHandCard: function (e) { },
    showOver: function () { },
    setTotalResult: function (e) {
        console.log("setTotalResult: " + e),
            this.totalData = e,
            cc.ss.gameNetMgr.numOfGames < cc.ss.gameNetMgr.maxNumOfGames && this.showTotalResult()
    },
    showTotalResult: function () {
        return !!this.totalData && (this.gameOverNode.active = !1, this.sssGameResultNode.active = !0, this.sssGameResult.showResult(this.totalData), !0)
    },
    quickSwing: function (e) {//交换牌
        console.log("quickSwing ----"),
            cc.instantiate(this.preparePrefabs).getComponent("touch").quickSwing(e)
    },
    onNameBtnClick: function (e) {
        console.log("onNameBtnClick event.target.tag:" + e.target.tag);
        var t = e.target.tag;
        cc.ss.net.send("assign_zj", t),
            this.setZhuangNode.active = !1
    },
    shareUrl: function (e, t, a, n, i) {//分享
        console.log("分享URL: "),
            console.log("title: " + e),
            console.log("text: " + t),
            console.log("url: " + a),
            console.log("imagePath: " + n),
            console.log("to: " + i);
        var s = {
            title: e,
            text: t,
            url: a,
            mediaType: "2",
            shareTo: i,
            imagePath: n,
            thumbImage: jsb.fileUtils.getWritablePath() + "icon.png"
        };
        this.share_plugin.share(s)
    },
    setLastTime: function (e) {
        var t = e;
        this._rootnodeprepare.getComponent("touch").setCountdown(t)
    },
    setlixianTime: function (e) {
        var t = e.userId,
            a = cc.ss.gameNetMgr.seats;
        if (a) for (var n = 0; n < a.length; n++) if (0 !== a[n].userid && a[n].userid === t) {
            var i = cc.ss.gameNetMgr.getLocalIndex(a[n].seatindex);
            this.seatsCom.seatComs[i].setCountdown(99),
                this.gameSeatsCom.seatComs[i].setCountdown(99)
        }
    },
    resetALLSeat: function () {
        for (var e = cc.ss.gameNetMgr.seats,
            t = 0; t < e.length; t++) if (e[t].userid <= 0) cc.ss.gameNetMgr.getLocalIndex(e[t].seatindex);
            else cc.ss.gameNetMgr.getLocalIndex(e[t].seatindex)
    },
    resetGameSeats: function () {
        if (this.seatComs) for (var e = 0; e < this.seatComs.length; e++) this.seatComs[e].resetGameSeat()
    },
    onBtnHeadInfo: function (e, t) {
        var a = this,
            n = parseInt(t);
        this.openView("UserInfo", "prefabs/game/sss/", 0,
            function (e) {
                var t = a.node.getChildByName("seats").children[n].getComponent("sssSeat");
                e.showUserInfo(t._userName, t._userId, t._score)
            })
    }
});
//     cc._RF.pop()
// },
// {
//     "../../Base/BaseView": "BaseView",
//     Compare: "Compare",
//     sssUtils: "sssUtils"
// }],