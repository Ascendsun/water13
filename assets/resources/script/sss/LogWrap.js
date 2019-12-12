// LogWrap: [function(e, t, a) {
//     "use strict";
//     cc._RF.push(t, "f2917HpfEtIC5A6VXUf2xjO", "LogWrap"),

    var a = new Object();

    Object.defineProperty(a, "__esModule", {
        value: !0
    });

    var n = function() {
        function e(e, t) {
            for (var a = 0; a < t.length; a++) {
                var n = t[a];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, a, n) {
            return a && e(t.prototype, a),
            n && e(t, n),
            t
        }
    } ();
    a.LogWrap = function() {
        function e() { (function(e, t) {
                if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
            })(this, e)
        }
        return n(e, null, [{
            key: "getDateString",
            value: function() {
                var e = new Date,
                t = e.getHours().toString(),
                a = "";
                return a += (1 == t.length ? "0" + t: t) + ":",
                a += (1 == (t = e.getMinutes().toString()).length ? "0" + t: t) + ":",
                a += (1 == (t = e.getSeconds().toString()).length ? "0" + t: t) + ":",
                1 == (t = e.getMilliseconds().toString()).length && (t = "00" + t),
                2 == t.length && (t = "0" + t),
                a = "[" + (a += t) + "]"
            }
        },
        {
            key: "stack",
            value: function(e) {
                var t = (new Error).stack.split("\n");
                t.shift();
                var a = [];
                t.forEach(function(e) {
                    var t = (e = e.substring(7)).split(" ");
                    t.length < 2 ? a.push(t[0]) : a.push(function(e, t, a) {
                        return t in e ? Object.defineProperty(e, t, {
                            value: a,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[t] = a,
                        e
                    } ({},
                    t[0], t[1]))
                });
                var n = [];
                if (e < a.length - 1) for (var i in a[e]) n.push(i);
                var s = n[0].split(".");
                return s[0] + ".js->" + s[1] + ": "
            }
        },
        {
            key: "log",
            value: function() {
                for (var e = arguments.length,
                t = Array(e), a = 0; a < e; a++) t[a] = arguments[a]; (console.log || cc.log).call(this, "%s%s:" + cc.js.formatStr.apply(cc, arguments), this.stack(2), this.getDateString())
            }
        },
        {
            key: "info",
            value: function() {
                for (var e = arguments.length,
                t = Array(e), a = 0; a < e; a++) t[a] = arguments[a]; (console.log || cc.log).call(this, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments), "color:#00CD00;", this.stack(2), this.getDateString())
            }
        },
        {
            key: "warn",
            value: function() {
                for (var e = arguments.length,
                t = Array(e), a = 0; a < e; a++) t[a] = arguments[a]; (console.log || cc.log).call(this, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments), "color:#ee7700;", this.stack(2), this.getDateString())
            }
        },
        {
            key: "err",
            value: function() {
                for (var e = arguments.length,
                t = Array(e), a = 0; a < e; a++) t[a] = arguments[a]; (console.log || cc.log).call(this, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments), "color:red", this.stack(2), this.getDateString())
            }
        }]),
        e
    } ();
//     cc._RF.pop()
// },
// {}],