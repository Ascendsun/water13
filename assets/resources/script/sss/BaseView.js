    var n = require("../lib/ListenerManager"),
    i = require("../lib/UIManager"),
    s = require("LogWrap");

    console.log(i);
    function o(e) {
        if (Array.isArray(e)) {
            for (var t = 0,
            a = Array(e.length); t < e.length; t++) a[t] = e[t];
            return a
        }
        return Array.from(e)
    };
    cc.Class({
        extends: cc.Component,
        properties: {
            _sign: null
        },
        setSign: function(e) {
            this._sign = e
        },
        getSign: function() {
            return this._sign
        },
        openView: function() {
            var e = null,
            t = null,
            a = null,
            n = null,
            o = arguments.length;
            if (o > 0) {
                if (e = arguments[0], o > 2) if ("number" == typeof arguments[1] ? a = arguments[1] : t = arguments[1], o > 3) {
                    if (a = arguments[2], n = arguments[3], o > 4) return void s.LogWrap.warn("arguments length is not correct.")
                } else "function" == typeof arguments[2] ? n = arguments[2] : a = arguments[2];
                else "function" == typeof arguments[1] ? n = arguments[1] : "number" == typeof arguments[1] ? a = arguments[1] : t = arguments[1];
               // i.UIManager.getInstance().showUI(e, t, a, n)
            } else s.LogWrap.warn("arguments length is not correct.")
        },
        addListenList: function(e) {
            for (var t in e) {
                var a = e[t];
                this.addListener(a.type, a.caller, a.listener)
            }
        },
        addListener: function(e, t, a) {
           // for (var i, s = arguments.length,
          //  r = Array(s > 3 ? s - 3 : 0), c = 3; c < s; c++) r[c - 3] = arguments[c]; (i = n.ListenerManager.getInstance()).add.apply(i, [e, t, a].concat(o(r)))
        },
        removeListenList: function(e) {
            for (var t in e) {
                var a = e[t];
                this.removeListener(a.type, a.caller, a.listener, !1)
            }
        },
        removeListener: function(e, t, a, i) {
            n.ListenerManager.getInstance().remove(e, t, a, i)
        },
        trigger: function(e) {
            for (var t, a = arguments.length,
            i = Array(a > 1 ? a - 1 : 0), s = 1; s < a; s++) i[s - 1] = arguments[s]; (t = n.ListenerManager.getInstance()).trigger.apply(t, [e].concat(o(i)))
        },
        onBtnClose: function() {
            cc.ss.audioMgr.playSFX("close"),
            i.UIManager.getInstance().hideUI(this._sign)
        },
        onLoad: function() {},
        start: function() {},
        update: function(e) {},
        onDestroy: function() {
            n.ListenerManager.getInstance().removeAll(this),
            i.UIManager.getInstance().closeUI(this._sign)
        },
        onEnable: function() {},
        onDisable: function() {}
    });
