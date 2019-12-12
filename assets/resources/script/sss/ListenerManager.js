// ListenerManager: [
    // function(e, t, a) {
    // "use strict";
    // cc._RF.push(t, "43b241bDSFGObJwQlfLHMnv", "ListenerManager"),

    var a = new Object();

    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    a.ListenerManager = a.Delegate = void 0;

    var n = function() {
        return function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function(e, t) {
                var a = [],
                n = !0,
                i = !1,
                s = void 0;
                try {
                    for (var o, r = e[Symbol.iterator](); ! (n = (o = r.next()).done) && (a.push(o.value), !t || a.length !== t); n = !0);
                } catch(e) {
                    i = !0,
                    s = e
                } finally {
                    try { ! n && r.
                        return && r.
                        return ()
                    } finally {
                        if (i) throw s
                    }
                }
                return a
            } (e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    } (),
    i = function() {
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
    } (),
    s = require("LogWrap");
    function o(e) {
        if (Array.isArray(e)) {
            for (var t = 0,
            a = Array(e.length); t < e.length; t++) a[t] = e[t];
            return a
        }
        return Array.from(e)
    }
    function r(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var c = a.Delegate = function() {
        function e(t, a) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            r(this, e),
            this.mListener = t,
            this.mArgArray = a,
            this.mIsOnce = n
        }
        return i(e, [{
            key: "listener",
            get: function() {
                return this.mListener
            }
        },
        {
            key: "argArray",
            get: function() {
                return this.mArgArray
            }
        },
        {
            key: "isOnce",
            get: function() {
                return this.mIsOnce
            },
            set: function(e) {
                this.mIsOnce = e
            }
        }]),
        e
    } ();
    a.ListenerManager = function() {
        function e() {
            r(this, e),
            this.mListenerMap = new Map
        }
        return i(e, [{
            key: "has",
            value: function(e, t, a) {
                return null !== this.find(e, t, a)
            }
        },
        {
            key: "trigger",
            value: function(e) {
                if (!e) return console.error("Listener type is null!"),
                !1;
                var t = [],
                a = [],
                n = this.mListenerMap.get(e);
                n && (n.forEach(function(e, i) {
                    var s = !0,
                    o = !1,
                    r = void 0;
                    try {
                        for (var c, h = e[Symbol.iterator](); ! (s = (c = h.next()).done); s = !0) {
                            var l = c.value;
                            t.push(l),
                            a.push(i)
                        }
                    } catch(e) {
                        o = !0,
                        r = e
                    } finally {
                        try { ! s && h.
                            return && h.
                            return ()
                        } finally {
                            if (o) throw r
                        }
                    }
                    for (var d = e.length - 1; d >= 0; --d) e[d].isOnce && e.splice(d, 1);
                    e.length <= 0 && n.delete(i)
                }), n.size <= 0 && this.mListenerMap.delete(e));
                for (var i = t.length,
                s = arguments.length,
                r = Array(s > 1 ? s - 1 : 0), c = 1; c < s; c++) r[c - 1] = arguments[c];
                for (var h = 0; h < i; h++) {
                    var l, d = t[h]; (l = d.listener).call.apply(l, [a[h]].concat(o(d.argArray), r))
                }
                return i > 0
            }
        },
        {
            key: "add",
            value: function(e, t, a) {
                for (var n = arguments.length,
                i = Array(n > 3 ? n - 3 : 0), s = 3; s < n; s++) i[s - 3] = arguments[s];
                this.addListener.apply(this, [e, t, a, !1].concat(i))
            }
        },
        {
            key: "addOnce",
            value: function(e, t, a) {
                for (var n = arguments.length,
                i = Array(n > 3 ? n - 3 : 0), s = 3; s < n; s++) i[s - 3] = arguments[s];
                this.addListener.apply(this, [e, t, a, !0].concat(i))
            }
        },
        {
            key: "remove",
            value: function(e, t, a, n) {
                this.removeBy(function(i, s, o) {
                    return (!e || e === i) && ((!t || t === s) && ((!a || a === o.listener) && !(n && !o.isOnce)))
                })
            }
        },
        {
            key: "removeAll",
            value: function(e) {
                var t = this;
                this.mListenerMap.forEach(function(a, n) {
                    a.delete(e),
                    a.size <= 0 && t.mListenerMap.delete(n)
                })
            }
        },
        {
            key: "addListener",
            value: function(e, t, a, n) {
                var i = this.find(e, t, a);
                if (i) i.isOnce = n;
                else {
                    for (var o = arguments.length,
                    r = Array(o > 4 ? o - 4 : 0), h = 4; h < o; h++) r[h - 4] = arguments[h];
                    var l = new c(a, r, n);
                    this.mListenerMap.get(e).get(t).push(l),
                    s.LogWrap.info("addlistener type:", e, ",caller:", t.constructor.name)
                }
            }
        },
        {
            key: "removeBy",
            value: function(e) {
                if (e) {
                    var t = !0,
                    a = !1,
                    i = void 0;
                    try {
                        for (var s, o = this.mListenerMap[Symbol.iterator](); ! (t = (s = o.next()).done); t = !0) {
                            var r = s.value,
                            c = n(r, 2),
                            h = c[0],
                            l = c[1],
                            d = !0,
                            u = !1,
                            g = void 0;
                            try {
                                for (var v, f = l[Symbol.iterator](); ! (d = (v = f.next()).done); d = !0) {
                                    for (var p = v.value,
                                    m = n(p, 2), _ = m[0], y = m[1], C = y.length - 1; C >= 0; --C) {
                                        e(h, _, y[C]) && y.splice(C, 1)
                                    }
                                    y.length <= 0 && l.delete(_)
                                }
                            } catch(e) {
                                u = !0,
                                g = e
                            } finally {
                                try { ! d && f.
                                    return && f.
                                    return ()
                                } finally {
                                    if (u) throw g
                                }
                            }
                            l.size <= 0 && this.mListenerMap.delete(h)
                        }
                    } catch(e) {
                        a = !0,
                        i = e
                    } finally {
                        try { ! t && o.
                            return && o.
                            return ()
                        } finally {
                            if (a) throw i
                        }
                    }
                }
            }
        },
        {
            key: "find",
            value: function(e, t, a) {
                if (!e) return console.error("Listener type is null!"),
                null;
                if (!t) return console.error("Caller type is null!"),
                null;
                if (!a) return console.error("Listener is null!"),
                null;
                var n = void 0;
                this.mListenerMap.has(e) ? n = this.mListenerMap.get(e) : (n = new Map, this.mListenerMap.set(e, n));
                var i = void 0;
                n.has(t) ? i = n.get(t) : (i = [], n.set(t, i));
                var s = !0,
                o = !1,
                r = void 0;
                try {
                    for (var c, h = i[Symbol.iterator](); ! (s = (c = h.next()).done); s = !0) {
                        var l = c.value;
                        if (l.mListener === a) return l
                    }
                } catch(e) {
                    o = !0,
                    r = e
                } finally {
                    try { ! s && h.
                        return && h.
                        return ()
                    } finally {
                        if (o) throw r
                    }
                }
                return null
            }
        }], [{
            key: "getInstance",
            value: function() {
                return this.instance || (this.instance = new e),
                this.instance
            }
        }]),
        e
    } ();
//     cc._RF.pop()
// },
// {
//     "../Utils/LogWrap": "LogWrap"
// }],