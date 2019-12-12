// ResManager: [function(e, t, a) {
//     "use strict";
//     cc._RF.push(t, "6cc88/N9GVMo49y/RkprjFz", "ResManager"),

var a = new Object();
Object.defineProperty(a, "__esModule", {
    value: !0
}),
    a.ResManager = void 0;
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
}();
require("LogWrap");
var i = 2,
    s = "prefab/hall/";
a.ResManager = function () {
    function e() {
        (function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        })(this, e),
        this._searchPath = s,
        this.resList = [],
        this._preloadingList = [],
        this._startTime = 0
    }
    return n(e, [{
        key: "setPreloadingList",
        value: function (e) {
            this._preloadingList = e,
                this.startPreloadingRes()
        }
    },
    {
        key: "clearPreloadingList",
        value: function () {
            this._preloadingList = []
        }
    },
    {
        key: "startPreloadingRes",
        value: function () {
            var e = this,
                t = this.getNextPreloadingData();
            t && this.loadPrefabs(t.name, t.path,
                function () {
                    e.startPreloadingRes()
                })
        }
    },
    {
        key: "loadPrefabsByName",
        value: function (e, t, a) {
            this.loadPrefabs(e, t, a)
        }
    },
    {
        key: "loadPrefabs",
        value: function (e, t, a, n) {
            var s = this,
                o = this.getRes(e);
            null == o ? (this._startTime = Date.now(), t = t || this._searchPath, cc.loader.loadRes(t + e,
                function (e, t, a) {
                    n && n(e, t, a)
                },
                function (t, n) {
                    if (t) cc.log(t);
                    else {
                        var o = {};
                        o.name = e,
                            o.status = i,
                            o.res = n;
                        Date.now(),
                            s._startTime;
                        s.resList.push(o),
                            a && a(n)
                    }
                })) : a && a(o.res)
        }
    },
    {
        key: "getNextPreloadingData",
        value: function () {
            for (var e = 0; e < this._preloadingList.length; e++) {
                var t = this._preloadingList[e];
                if (!this.getRes(t.name)) return t
            }
            return null
        }
    },
    {
        key: "getRes",
        value: function (e) {
            for (var t = 0; t < this.resList.length; ++t) if (this.resList[t].name === e) return this.resList[t];
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
//     "../Utils/LogWrap": "LogWrap"
// }],