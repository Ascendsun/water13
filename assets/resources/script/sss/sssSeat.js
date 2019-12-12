cc.Class({
    extends: cc.Component,
    properties: {
        _sideName: null,
        _sprIcon: null,
        _ready: null,
        _mask: null,
        _offline: null,
        _lblName: null,
        _lblScore: null,
        _scoreBg: null,
        _voicemsg: null,
        _userchatNode: null,
        _chatBubble: null,
        _chatBubbleSize: null,
        _emoji: null,
        _lastChatTime: -1,
        _userName: "",
        _score: 0,
        _dayingjia: !1,
        _isOffline: !1,
        _isReady: !1,
        _userId: null,
        _rootnode: null
    },
    onLoad: function () {
       
        null != cc.ss && (
            this._sprIcon = this.node.getChildByName("seat").getChildByName("userimg").getComponent("ImageLoader"),
            this._lblName = this.node.getChildByName("seat").getChildByName("username").getComponent(cc.Label),
            this._lblScore = this.node.getChildByName("seat").getChildByName("fenshu").getComponent(cc.Label),
            this._sprIcon && this._sprIcon.getComponent(cc.Button) && cc.ss.utils.addClickEvent(this._sprIcon, this.node, "sssSeat", "onIconClicked"),//给头型添加单击监听事件
            this._offline = this.node.getChildByName("seat").getChildByName("userimg").getChildByName("nosinger"),
            this._ready = this.node.getChildByName("seat").getChildByName("userimg").getChildByName("zhunbei"),
            this._mask = this.node.getChildByName("seat").getChildByName("mask"),
            this._scoreBg = this.node.getChildByName("seat").getChildByName("score_bg"),
            this.refresh(),
            this._sprIcon && this._userId && this._sprIcon.setUserID(this._userId))
    },

    setChatNode: function (e) {
        this._userchatNode = e, this._emoji = this._userchatNode.getChildByName("emoji"), null != this._emoji && (this._emoji.active = !1)
    },

    setHoldsCount: function (e) {
        if (e && e > 0) {
            var t = this.node.getChildByName("cardnum"),
                a = this.node.getChildByName("pokerback");
            if (t && a) {
                t.active = !0, a.active = !0;
                var n = t.getComponent(cc.Label);
                n && (n.string = e)
            }
        }
    },

    setcomparepai: function () {
        this.node.getChildByName("cardnum").active = !1, this.node.getChildByName("pokerback").active = !1, this.node.getChildByName("ready").active = !1
    },

    onIconClicked: function () {//点击用户头像
        cc.log('点击了头像.............');
        if (!cc.ss.replayMgr.isReplay()) {
            var e = this._sprIcon.node.getComponent(cc.Sprite);
            if (null != this._userId && this._userId > 0) {
                var t = cc.ss.gameNetMgr.getSeatByID(this._userId),
                    a = 0;
                if (cc.ss.baseInfoMap) {
                    var n = cc.ss.baseInfoMap[this._userId];
                    n && (a = n.sex)
                }
                var i = this;
                cc.find("Canvas/base").getComponent("sssGameBase").openView("GameUserInfo", "prefabs/game/common/", 0, function (n) {
                    n.getComponent("GameUserInfo").showUserInfo(t.name, t.userid, e, a, t.ip, t.gpsData, t.locate);
                    var s = cc.ss.gameNetMgr.getLocalIndex(t.seatindex);
                    n.setUserinfoPos(s, i.node)
                })
            }
        }
    },

    initSeatInfo: function () {
        this.setInfo("", 0), this.setOffline(!1), this.setID(0), this.voiceMsg(!1), this.setReady(!1)
    },

    refresh: function () { //刷新头像
        if (null != this._lblName && null != this._userName && (this._lblName.string = cc.ss.utils.getShortUsername(this._userName)),
            null != this._lblScore && (null == this._score && (this._score = 0), this._lblScore.string = this._score),
            this._offline && (this._offline.active = this._isOffline && "" != this._userName),
            this._ready && (this._ready.active = this._isReady, this._mask.active = this._ready.active),
            this._sprIcon) {
            var e = this.node.getChildByName("seat").getChildByName("userimg").getComponent(cc.Sprite),
                t = this._sprIcon.getComponent(cc.Sprite);
            e.spriteFrame = t.spriteFrame
        }
       // this.node.active = null != this._userName && "" != this._userName, this._userchatNode && (this._userchatNode.active = this.node.active)
    },

    setInfo: function (e, t, a) {
        this._userName = e,
            this._score = t,
            null == this._score && (this._score = 0),
            this._dayingjia = a,
            null != this._scoreBg && (this._scoreBg.active = null != this._score),
            null != this._lblScore && (this._lblScore.node.active = null != this._score),
            this.refresh()
    },

    setReady: function (e) {
        this._isReady = e, 
        this._ready && (this._ready.active = this._isReady, this._mask.active = this._ready.active)
    },

    setID: function (e) {
        var t = this.node.getChildByName("id");
        t && (t.getComponent(cc.Label).string = "ID:" + e);
        this._userId = e, this._sprIcon && this._sprIcon.setUserID(e)
    },

    setOffline: function (e) {
        this._isOffline = e, this._offline && (this._offline.active = this._isOffline && "" != this._userName)
    },

    updateChatBubbleChildren: function (e) {
        this._userchatNode && console.log("_userchatNode: active=" + this._userchatNode.active), this._emoji.active = 2 == e
    },

    chat: function (e) { }, emoji: function (e) {
        null != this._emoji && (console.log(e),
        this.updateChatBubbleChildren(2), 
        this._emoji.getComponent(cc.Animation).play(e), 
        this.scheduleOnce(this.stopAnimation, 2))
    },

    voiceMsg: function (e) {
        this._voicemsg && (e ? (this.updateChatBubbleChildren(3), this._chatBubble.setContentSize(100, 50)) : this._chatBubble.active = !1)
    },

    stopAnimation: function () {
        this._emoji.active = !1, 
        this._emoji.getComponent(cc.Animation).stop()
    }
});
