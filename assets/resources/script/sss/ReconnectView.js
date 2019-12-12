// ReconnectView: [function(e, t, a) {
//     "use strict";
//     cc._RF.push(t, "ed0few/QnFBZKlM9zHxFNnX", "ReconnectView");
var n = function (e) {
    return e && e.__esModule ? e : {
        default:
            e
    }
}(require("BaseView"));
cc.Class({
    extends:n.default,
    properties: {
        rotNode: cc.Node,
        rotImage: cc.Node,
        _timer: null
    },
    onLoad: function () {
        this.node.zIndex = 2
    },
    init: function () {
        var e = this;
        console.log("reconnect view init !");
        var t = function (t) {
            console.log("reconnectview fn"),
                e.rotNode.active = !0,
                function t() {
                    var a = cc.ss.net,
                        n = cc.ss.gameNetMgr;
                    console.log("reconnect  onLoad -------------11111-----"),
                        a.test(function (a) {
                            if (a) {
                                e._timer && clearTimeout(e._timer);
                                var i = n.roomId;
                                null != i && (console.log("reconnectview net ret roomId=" + i), cc.ss.userMgr.oldRoomId = null, cc.ss.userMgr.enterRoom(i,
                                    function (e) {
                                        cc.ss.gameNetMgr && (cc.ss.gameNetMgr.reconnect = 1),
                                            0 != e.errcode && (n.roomId = null, cc.director.loadScene("hall"))
                                    }))
                            } else e._timer && clearTimeout(e._timer),
                                console.log("reconnectview setTimeout fnTestServerOn"),
                                e._timer = setTimeout(t, 3e3)
                        })
                }()
        };
        this.addListener("disconnect", this, t),
            this.rotNode.active = !1,
            this.addListener("login_finished", this,
                function (a) {
                    e.addListener("disconnect", e, t),
                        e.rotNode.active = !1
                }),
            this.addListener("kick_user_push", this,
                function (e) { }),
            this.addListener("game_over_push", this,
                function (a) {
                    e.removeListener("disconnect", e, t),
                        console.log("game_over_push   ======================disconnect ")
                })
    },
    update: function (e) {
        //1 == this.rotNode.active && (this.rotImage.rotation = this.rotImage.rotation - 45 * e)//重连转圈圈
    }
});
//     ,
//     cc._RF.pop()
// },