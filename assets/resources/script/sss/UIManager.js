// UIManager: [function(e, t, a) {
//     "use strict";
//     cc._RF.push(t, "945e9k13yFCnat9uxg0NNcg", "UIManager"),
var a = new Object();
Object.defineProperty(a, "__esModule", {
    value: !0
}),
    a.UIManager = void 0;
var n = function () {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
        }
    }
    return function (t, a, n) {
        return a && e(t.prototype, a),
            n && e(t, n),
            t
    }
}(),
    i = require("ResManager");
a.UIManager = function () {
    function e() {
        (function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        })(this, e),
        this.uiList = []
    }
    return n(e, [{
        key: "openUI",
        value: function (e, t, a, n) {
            var s = this;
            i.ResManager.getInstance().loadPrefabsByName(e, t,
                function (t) {
                    var i = s.getUI(e);
                    if (i) n && n(i);
                    else {
                        var o = cc.instantiate(t);
                        o.parent = cc.find("Canvas"),
                            a && (o.zIndex = a);
                        var r = o.getComponent(e);
                        r.setSign(e),
                            s.uiList.push(r),
                            n && n(r)
                    }
                })
        }
    },
    {
        key: "closeUI",
        value: function (e) {
            for (var t = 0; t < this.uiList.length; ++t) if (this.uiList[t].getSign() === e) return this.uiList[t].node.destroy(),
                void this.uiList.splice(t, 1)
        }
    },
    {
        key: "showUI",
        value: function (e, t, a, n) {
            var i = this.getUI(e);
            i ? (i.node.active = !0, a && (i.node.zIndex = a), n && n(i)) : this.openUI(e, t, a,
                function (e) {
                    n && n(e)
                })
        }
    },
    {
        key: "hideUI",
        value: function (e) {
            var t = this.getUI(e);
            t && (t.node.active = !1)
        }
    },
    {
        key: "getUI",
        value: function (e) {
            for (var t = 0; t < this.uiList.length; ++t) if (this.uiList[t].getSign() === e) return this.uiList[t];
            return null
        }
    }], [{
        key: "getInstance",
        value: function () {
            return this.instance || (this.instance = new e),
                this.instance
        }
    }]),
        e
}();
//     cc._RF.pop()
// },
// {
//     "./ResManager": "ResManager"
// }],