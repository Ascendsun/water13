var n = function (e) {
    return e && e.__esModule ? e : {
        default:
            e
    }
}(require("BaseScene")),
i = require("ListenerManager");

cc.Class({
    extends: n.default,  //cc.Component,

    properties: {
        lblName: cc.RichText,
        lblGems: cc.RichText,
        lblID: cc.RichText,
        sprHeadImg: cc.Sprite,
        imgTureName: cc.Sprite,
        sprTureName: cc.SpriteFrame
    },
    onLoad: function () {
        this.setPreLoadList([{
            name: "CreateRoomView"
        },
        {
            name: "JoinRoomView"
        },
        {
            name: "ActivityView"
        },
        {
            name: "ShopView"
        },
        {
            name: "SetView"
        },
        {
            name: "GameRecordView"
        },
        {
            name: "GameRuleView"
        },
        {
            name: "UserInfoView"
        },
        {
            name: "BindView"
        },
        {
            name: "KefuView"
        },
        {
            name: "ShareView"
        }]),
            this.initUserInfo(),
            this.playBGM(),
            cc.vv.utils.addEscEvent(this.node);
        var e = [{
            type: "bindSFZSuccess",
            caller: this,
            listener: this.onBindSFZSuccess
        },
        {
            type: "updateGems",
            caller: this,
            listener: this.updateGems
        },
        {
            type: "wxSdkReady",
            caller: this,
            listener: this.initShare
        },
        {
            type: "bindPhoneSuccess",
            caller: this,
            listener: this.updateBindButton
        }];
        this.addListenList(e),
            this.checkRecordId(),
            this.checkPopMsg(),
            this.initShare(),
            cc.vv.utils.getUserGems(),
            this.updateBindButton(),
            this.updateDayCardBtn(),
            this.setWebFingle(),
            i.ListenerManager.getInstance().trigger("dissolve_cancel")
    },

    setWebFingle: function () {
        if (cc.$webfinger) {
            var e = {
                userid: cc.vv.userMgr.userId,
                account: cc.vv.userMgr.account,
                sign: cc.vv.userMgr.sign,
                webfinger: cc.$webfinger.hash
            };
            cc.vv.http.sendHallReq("/set_web_finger", e)
        }
    },
    onEnable: function () {
        this.checkDebugRoom()
    },
    checkDebugRoom: function () { },
    playBGM: function () {
        cc.vv.bgmusic && this.scheduleOnce(function () {
            cc.vv.audioMgr.playBGM("bgMain")
        },
            5)
    },
    initShare: function () {
        console.log("主动初始化分享内容!");
        var e = "【宝宝" + cc.vv.GAMENAME + "】无需下载，点击开战";
        cc.vv.utils.shareGame(e, "快点调来，即开即玩，无需等待，邀您来战", cc.vv.userMgr.userId)
    },
    checkRecordId: function () {
        var e = cc.args.recordid;
        cc.args.recordid = null,
            null != e && this.openView("GameRecordView",
                function (t) {
                    t.getReplayDataByCode(e)
                })
    },
    onBindSFZSuccess: function () {
        console.log("大厅 刷新用户实名认证!"),
            this.imgTureName.spriteFrame = this.sprTureName
    },
    updateGems: function () {
        this.lblGems && (this.lblGems.string = cc.vv.utils.getBoldRichString(cc.vv.userMgr.gems))
    },
    initUserInfo: function () {
        var e = cc.vv.userMgr.userName;
        if (e.length > 8) {
            var t = e.substring(0, 8);
            this.lblName.string = cc.vv.utils.getBoldRichString(t + "...")
        } else this.lblName.string = cc.vv.utils.getBoldRichString(e);
        this.lblGems && (this.lblGems.string = cc.vv.utils.getBoldRichString(cc.vv.userMgr.gems)),
            this.lblID.string = cc.vv.utils.getBoldRichString("ID:" + cc.vv.userMgr.userId),
            this.sprHeadImg.node.getComponent("ImageLoader").setUserID(cc.vv.userMgr.userId,
                function (e) {
                    cc.vv.userMgr.headimgurl = e,
                        console.log("mine head image url = ", cc.vv.userMgr.headimgurl)
                }),
            20 == cc.vv.userMgr.authflag && (this.imgTureName.spriteFrame = this.sprTureName)
    },
    onBtnShare: function () {
        this.openView("ShareView",
            function (e) {
                var t = "【宝宝" + cc.vv.GAMENAME + "】无需下载，点击开战";
                e.shareGame(t, "快点调来，即开即玩，无需等待，邀您来战", cc.vv.userMgr.userId)
            })
    },
    updateBindButton: function () {
        0 != cc.vv.userMgr.phone ? cc.find("righttop/btnBindPhone", this.node).active = !1 : cc.find("righttop/btnBindPhone", this.node).active = !0
    },
    updateDayCardBtn: function () {
        cc.vv.SI && cc.vv.SI.channel_conf && 1 == cc.vv.SI.channel_conf.show_day_card ? cc.find("righttop/btnDaycard", this.node).active = !0 : cc.find("righttop/btnDaycard", this.node).active = !1
    },
    onBtnDayCard: function () {
        this.openView("DayCardView")
    },
    onBtnBindPhone: function () {
        this.openView("BindPhoneView", 1,
            function (e) {
                e.setCustomerView()
            })
    },
    onBtnYule: function () {
        cc.vv.alert.show("提示", "暂未开放!")
    },
    onBtnUserinfo: function () {
        var e = this;
        this.openView("UserInfoView",
            function (t) {
                t.show(e.sprHeadImg)
            })
    },
    onBtnActivity: function () {
        this.openView("ActivityView")
    },
    onBtnGameRecord: function () {
        this.openView("GameRecordView")
    },
    onCreateRoomClicked: function () {
        this.openView("CreateRoomView")
    },
    onBtnJoinRoomClicked: function () {
        this.openView("JoinRoomView")
    },
    onBtnShopClicked: function () {
        this.openView("ShopView")
    },
    onBtnKefuClicked: function () {
        this.openView("KefuView")
    },
    onBtnSet: function () {
        this.openView("SetView")
    },
    onBtnBind: function () {
        this.openView("BindView")
    }
});