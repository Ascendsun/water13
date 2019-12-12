cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function () {
        this.setupSpriteFrame()
    },
    setUserID: function (e, t) {
        var a = this;
        e && (console.log("setUserID" + e),
            function (e, t) {
                null == cc.vv.baseInfoMap && (cc.vv.baseInfoMap = {}),
                    null != cc.vv.baseInfoMap[e] ? t(cc.vv.baseInfoMap[e]) : cc.vv.http.sendLoginReq("/base_info", {
                        userid: e
                    },
                        function (a) {
                            var n = null;
                            a.headimgurl && (n = a.headimgurl, console.log("userid = " + e + " head img rul : " + a.headimgurl));
                            var i = {
                                name: a.name,
                                sex: a.sex,
                                url: n
                            };
                            cc.vv.baseInfoMap[e] = i,
                                t(i)
                        })
            }(e,
                function (e) {
                    e && e.url && (t && t(e.url),
                        function (e, t) {
                            cc.loader.load({
                                url: e,
                                type: "png"
                            },
                                function (e, a) {
                                    if (e) return console.log("loadImage err:"),
                                        void console.log(e);
                                    var n = new cc.SpriteFrame(a, cc.Rect(0, 0, a.width, a.height));
                                    t(n)
                                })
                        }(e.url,
                            function (e) {
                                a._spriteFrame = e,
                                    a.setupSpriteFrame()
                            }))
                }))
    },
    setupSpriteFrame: function () {
        if (this._spriteFrame && this.node) {
            var e = this.getComponent(cc.Sprite);
            e && (e.spriteFrame = this._spriteFrame)
        }
    }
});
