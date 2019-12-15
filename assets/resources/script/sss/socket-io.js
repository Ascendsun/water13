
// "socket-io": [function(e, t, a) { 
    (function(n) {
//     "use strict";
//     cc._RF.push(t, "393290vPc1IIYfh8FrmxcNZ", "socket-io");

var a;
var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
cc.sys.isNative ||
    function (e) {
        if ("object" === (void 0 === a ? "undefined" : i(a)) && void 0 !== t) t.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
            ("undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : this).io = e()
        }
    }(function () {
        return function t(a, n, i) {
            function s(r, c) {
                if (!n[r]) {
                    if (!a[r]) {
                        var h = "function" == typeof e && e;
                        if (!c && h) return h(r, !0);
                        if (o) return o(r, !0);
                        var l = new Error("Cannot find module '" + r + "'");
                        throw l.code = "MODULE_NOT_FOUND",
                        l
                    }
                    var d = n[r] = {
                        exports: {}
                    };
                    a[r][0].call(d.exports,
                        function (e) {
                            var t = a[r][1][e];
                            return s(t || e)
                        },
                        d, d.exports, t, a, n, i)
                }
                return n[r].exports
            }
            for (var o = "function" == typeof e && e,
                r = 0; r < i.length; r++) s(i[r]);
            return s
        }({
            1: [function (e, t, a) {
                t.exports = e("./lib/")
            },
            {
                "./lib/": 2
            }],
            2: [function (e, t, a) {
                t.exports = e("./socket"),
                    t.exports.parser = e("engine.io-parser")
            },
            {
                "./socket": 3,
                "engine.io-parser": 19
            }],
            3: [function (e, t, a) {
                (function (a) {
                    var n = e("./transports"),
                        s = e("component-emitter"),
                        o = e("debug")("engine.io-client:socket"),
                        r = e("indexof"),
                        c = e("engine.io-parser"),
                        h = e("parseuri"),
                        l = e("parsejson"),
                        d = e("parseqs");
                    function u(e, t) {
                        if (!(this instanceof u)) return new u(e, t);
                        t = t || {},
                            e && "object" == (void 0 === e ? "undefined" : i(e)) && (t = e, e = null),
                            e ? (e = h(e), t.hostname = e.host, t.secure = "https" == e.protocol || "wss" == e.protocol, t.port = e.port, e.query && (t.query = e.query)) : t.host && (t.hostname = h(t.host).host),
                            this.secure = null != t.secure ? t.secure : a.location && "https:" == location.protocol,
                            t.hostname && !t.port && (t.port = this.secure ? "443" : "80"),
                            this.agent = t.agent || !1,
                            this.hostname = t.hostname || (a.location ? location.hostname : "localhost"),
                            this.port = t.port || (a.location && location.port ? location.port : this.secure ? 443 : 80),
                            this.query = t.query || {},
                            "string" == typeof this.query && (this.query = d.decode(this.query)),
                            this.upgrade = !1 !== t.upgrade,
                            this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/",
                            this.forceJSONP = !!t.forceJSONP,
                            this.jsonp = !1 !== t.jsonp,
                            this.forceBase64 = !!t.forceBase64,
                            this.enablesXDR = !!t.enablesXDR,
                            this.timestampParam = t.timestampParam || "t",
                            this.timestampRequests = t.timestampRequests,
                            this.transports = t.transports || ["polling", "websocket"],
                            this.readyState = "",
                            this.writeBuffer = [],
                            this.policyPort = t.policyPort || 843,
                            this.rememberUpgrade = t.rememberUpgrade || !1,
                            this.binaryType = null,
                            this.onlyBinaryUpgrades = t.onlyBinaryUpgrades,
                            this.perMessageDeflate = !1 !== t.perMessageDeflate && (t.perMessageDeflate || {}),
                            !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
                            this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
                            this.pfx = t.pfx || null,
                            this.key = t.key || null,
                            this.passphrase = t.passphrase || null,
                            this.cert = t.cert || null,
                            this.ca = t.ca || null,
                            this.ciphers = t.ciphers || null,
                            this.rejectUnauthorized = void 0 === t.rejectUnauthorized || t.rejectUnauthorized;
                        var n = "object" == (void 0 === a ? "undefined" : i(a)) && a;
                        n.global === n && t.extraHeaders && Object.keys(t.extraHeaders).length > 0 && (this.extraHeaders = t.extraHeaders),
                            this.open()
                    }
                    t.exports = u,
                        u.priorWebsocketSuccess = !1,
                        s(u.prototype),
                        u.protocol = c.protocol,
                        u.Socket = u,
                        u.Transport = e("./transport"),
                        u.transports = e("./transports"),
                        u.parser = e("engine.io-parser"),
                        u.prototype.createTransport = function (e) {
                            o('creating transport "%s"', e);
                            var t = function (e) {
                                var t = {};
                                for (var a in e) e.hasOwnProperty(a) && (t[a] = e[a]);
                                return t
                            }(this.query);
                            return t.EIO = c.protocol,
                                t.transport = e,
                                this.id && (t.sid = this.id),
                                new n[e]({
                                    agent: this.agent,
                                    hostname: this.hostname,
                                    port: this.port,
                                    secure: this.secure,
                                    path: this.path,
                                    query: t,
                                    forceJSONP: this.forceJSONP,
                                    jsonp: this.jsonp,
                                    forceBase64: this.forceBase64,
                                    enablesXDR: this.enablesXDR,
                                    timestampRequests: this.timestampRequests,
                                    timestampParam: this.timestampParam,
                                    policyPort: this.policyPort,
                                    socket: this,
                                    pfx: this.pfx,
                                    key: this.key,
                                    passphrase: this.passphrase,
                                    cert: this.cert,
                                    ca: this.ca,
                                    ciphers: this.ciphers,
                                    rejectUnauthorized: this.rejectUnauthorized,
                                    perMessageDeflate: this.perMessageDeflate,
                                    extraHeaders: this.extraHeaders
                                })
                        },
                        u.prototype.open = function () {
                            var e;
                            if (this.rememberUpgrade && u.priorWebsocketSuccess && -1 != this.transports.indexOf("websocket")) e = "websocket";
                            else {
                                if (0 === this.transports.length) {
                                    var t = this;
                                    return void setTimeout(function () {
                                        t.emit("error", "No transports available")
                                    },
                                        0)
                                }
                                e = this.transports[0]
                            }
                            this.readyState = "opening";
                            try {
                                e = this.createTransport(e)
                            } catch (e) {
                                return this.transports.shift(),
                                    void this.open()
                            }
                            e.open(),
                                this.setTransport(e)
                        },
                        u.prototype.setTransport = function (e) {
                            o("setting transport %s", e.name);
                            var t = this;
                            this.transport && (o("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()),
                                this.transport = e,
                                e.on("drain",
                                    function () {
                                        t.onDrain()
                                    }).on("packet",
                                        function (e) {
                                            t.onPacket(e)
                                        }).on("error",
                                            function (e) {
                                                t.onError(e)
                                            }).on("close",
                                                function () {
                                                    t.onClose("transport close")
                                                })
                        },
                        u.prototype.probe = function (e) {
                            o('probing transport "%s"', e);
                            var t = this.createTransport(e, {
                                probe: 1
                            }),
                                a = !1,
                                n = this;
                            function i() {
                                if (n.onlyBinaryUpgrades) {
                                    var i = !this.supportsBinary && n.transport.supportsBinary;
                                    a = a || i
                                }
                                a || (o('probe transport "%s" opened', e), t.send([{
                                    type: "ping",
                                    data: "probe"
                                }]), t.once("packet",
                                    function (i) {
                                        if (!a) if ("pong" == i.type && "probe" == i.data) {
                                            if (o('probe transport "%s" pong', e), n.upgrading = !0, n.emit("upgrading", t), !t) return;
                                            u.priorWebsocketSuccess = "websocket" == t.name,
                                                o('pausing current transport "%s"', n.transport.name),
                                                n.transport.pause(function () {
                                                    a || "closed" != n.readyState && (o("changing transport and sending upgrade packet"), d(), n.setTransport(t), t.send([{
                                                        type: "upgrade"
                                                    }]), n.emit("upgrade", t), t = null, n.upgrading = !1, n.flush())
                                                })
                                        } else {
                                            o('probe transport "%s" failed', e);
                                            var s = new Error("probe error");
                                            s.transport = t.name,
                                                n.emit("upgradeError", s)
                                        }
                                    }))
                            }
                            function s() {
                                a || (a = !0, d(), t.close(), t = null)
                            }
                            function r(a) {
                                var i = new Error("probe error: " + a);
                                i.transport = t.name,
                                    s(),
                                    o('probe transport "%s" failed because of error: %s', e, a),
                                    n.emit("upgradeError", i)
                            }
                            function c() {
                                r("transport closed")
                            }
                            function h() {
                                r("socket closed")
                            }
                            function l(e) {
                                t && e.name != t.name && (o('"%s" works - aborting "%s"', e.name, t.name), s())
                            }
                            function d() {
                                t.removeListener("open", i),
                                    t.removeListener("error", r),
                                    t.removeListener("close", c),
                                    n.removeListener("close", h),
                                    n.removeListener("upgrading", l)
                            }
                            u.priorWebsocketSuccess = !1,
                                t.once("open", i),
                                t.once("error", r),
                                t.once("close", c),
                                this.once("close", h),
                                this.once("upgrading", l),
                                t.open()
                        },
                        u.prototype.onOpen = function () {
                            if (o("socket open"), this.readyState = "open", u.priorWebsocketSuccess = "websocket" == this.transport.name, this.emit("open"), this.flush(), "open" == this.readyState && this.upgrade && this.transport.pause) {
                                o("starting upgrade probes");
                                for (var e = 0,
                                    t = this.upgrades.length; e < t; e++) this.probe(this.upgrades[e])
                            }
                        },
                        u.prototype.onPacket = function (e) {
                            if ("opening" == this.readyState || "open" == this.readyState) switch (o('socket receive: type "%s", data "%s"', e.type, e.data), this.emit("packet", e), this.emit("heartbeat"), e.type) {
                                case "open":
                                    this.onHandshake(l(e.data));
                                    break;
                                case "pong":
                                    this.setPing(),
                                        this.emit("pong");
                                    break;
                                case "error":
                                    var t = new Error("server error");
                                    t.code = e.data,
                                        this.onError(t);
                                    break;
                                case "message":
                                    this.emit("data", e.data),
                                        this.emit("message", e.data)
                            } else o('packet received with socket readyState "%s"', this.readyState)
                        },
                        u.prototype.onHandshake = function (e) {
                            this.emit("handshake", e),
                                this.id = e.sid,
                                this.transport.query.sid = e.sid,
                                this.upgrades = this.filterUpgrades(e.upgrades),
                                this.pingInterval = e.pingInterval,
                                this.pingTimeout = e.pingTimeout,
                                this.onOpen(),
                                "closed" != this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
                        },
                        u.prototype.onHeartbeat = function (e) {
                            clearTimeout(this.pingTimeoutTimer);
                            var t = this;
                            t.pingTimeoutTimer = setTimeout(function () {
                                "closed" != t.readyState && t.onClose("ping timeout")
                            },
                                e || t.pingInterval + t.pingTimeout)
                        },
                        u.prototype.setPing = function () {
                            var e = this;
                            clearTimeout(e.pingIntervalTimer),
                                e.pingIntervalTimer = setTimeout(function () {
                                    o("writing ping packet - expecting pong within %sms", e.pingTimeout),
                                        e.ping(),
                                        e.onHeartbeat(e.pingTimeout)
                                },
                                    e.pingInterval)
                        },
                        u.prototype.ping = function () {
                            var e = this;
                            this.sendPacket("ping",
                                function () {
                                    e.emit("ping")
                                })
                        },
                        u.prototype.onDrain = function () {
                            this.writeBuffer.splice(0, this.prevBufferLen),
                                this.prevBufferLen = 0,
                                0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
                        },
                        u.prototype.flush = function () {
                            "closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (o("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
                        },
                        u.prototype.write = u.prototype.send = function (e, t, a) {
                            return this.sendPacket("message", e, t, a),
                                this
                        },
                        u.prototype.sendPacket = function (e, t, a, n) {
                            if ("function" == typeof t && (n = t, t = void 0), "function" == typeof a && (n = a, a = null), "closing" != this.readyState && "closed" != this.readyState) {
                                (a = a || {}).compress = !1 !== a.compress;
                                var i = {
                                    type: e,
                                    data: t,
                                    options: a
                                };
                                this.emit("packetCreate", i),
                                    this.writeBuffer.push(i),
                                    n && this.once("flush", n),
                                    this.flush()
                            }
                        },
                        u.prototype.close = function () {
                            if ("opening" == this.readyState || "open" == this.readyState) {
                                this.readyState = "closing";
                                var e = this;
                                this.writeBuffer.length ? this.once("drain",
                                    function () {
                                        this.upgrading ? n() : t()
                                    }) : this.upgrading ? n() : t()
                            }
                            function t() {
                                e.onClose("forced close"),
                                    o("socket closing - telling transport to close"),
                                    e.transport.close()
                            }
                            function a() {
                                e.removeListener("upgrade", a),
                                    e.removeListener("upgradeError", a),
                                    t()
                            }
                            function n() {
                                e.once("upgrade", a),
                                    e.once("upgradeError", a)
                            }
                            return this
                        },
                        u.prototype.onError = function (e) {
                            o("socket error %j", e),
                                u.priorWebsocketSuccess = !1,
                                this.emit("error", e),
                                this.onClose("transport error", e)
                        },
                        u.prototype.onClose = function (e, t) {
                            if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
                                o('socket close with reason: "%s"', e);
                                clearTimeout(this.pingIntervalTimer),
                                    clearTimeout(this.pingTimeoutTimer),
                                    this.transport.removeAllListeners("close"),
                                    this.transport.close(),
                                    this.transport.removeAllListeners(),
                                    this.readyState = "closed",
                                    this.id = null,
                                    this.emit("close", e, t),
                                    this.writeBuffer = [],
                                    this.prevBufferLen = 0
                            }
                        },
                        u.prototype.filterUpgrades = function (e) {
                            for (var t = [], a = 0, n = e.length; a < n; a++)~r(this.transports, e[a]) && t.push(e[a]);
                            return t
                        }
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {
                "./transport": 4,
                "./transports": 5,
                "component-emitter": 15,
                debug: 17,
                "engine.io-parser": 19,
                indexof: 23,
                parsejson: 26,
                parseqs: 27,
                parseuri: 28
            }],
            4: [function (e, t, a) {
                var n = e("engine.io-parser"),
                    i = e("component-emitter");
                function s(e) {
                    this.path = e.path,
                        this.hostname = e.hostname,
                        this.port = e.port,
                        this.secure = e.secure,
                        this.query = e.query,
                        this.timestampParam = e.timestampParam,
                        this.timestampRequests = e.timestampRequests,
                        this.readyState = "",
                        this.agent = e.agent || !1,
                        this.socket = e.socket,
                        this.enablesXDR = e.enablesXDR,
                        this.pfx = e.pfx,
                        this.key = e.key,
                        this.passphrase = e.passphrase,
                        this.cert = e.cert,
                        this.ca = e.ca,
                        this.ciphers = e.ciphers,
                        this.rejectUnauthorized = e.rejectUnauthorized,
                        this.extraHeaders = e.extraHeaders
                }
                t.exports = s,
                    i(s.prototype),
                    s.prototype.onError = function (e, t) {
                        var a = new Error(e);
                        return a.type = "TransportError",
                            a.description = t,
                            this.emit("error", a),
                            this
                    },
                    s.prototype.open = function () {
                        return "closed" != this.readyState && "" != this.readyState || (this.readyState = "opening", this.doOpen()),
                            this
                    },
                    s.prototype.close = function () {
                        return "opening" != this.readyState && "open" != this.readyState || (this.doClose(), this.onClose()),
                            this
                    },
                    s.prototype.send = function (e) {
                        if ("open" != this.readyState) throw new Error("Transport not open");
                        this.write(e)
                    },
                    s.prototype.onOpen = function () {
                        this.readyState = "open",
                            this.writable = !0,
                            this.emit("open")
                    },
                    s.prototype.onData = function (e) {
                        var t = n.decodePacket(e, this.socket.binaryType);
                        this.onPacket(t)
                    },
                    s.prototype.onPacket = function (e) {
                        this.emit("packet", e)
                    },
                    s.prototype.onClose = function () {
                        this.readyState = "closed",
                            this.emit("close")
                    }
            },
            {
                "component-emitter": 15,
                "engine.io-parser": 19
            }],
            5: [function (e, t, a) {
                (function (t) {
                    var n = e("xmlhttprequest-ssl"),
                        i = e("./polling-xhr"),
                        s = e("./polling-jsonp"),
                        o = e("./websocket");
                    a.polling = function (e) {
                        var a = !1,
                            o = !1,
                            r = !1 !== e.jsonp;
                        if (t.location) {
                            var c = "https:" == location.protocol,
                                h = location.port;
                            h || (h = c ? 443 : 80),
                                a = e.hostname != location.hostname || h != e.port,
                                o = e.secure != c
                        }
                        if (e.xdomain = a, e.xscheme = o, "open" in new n(e) && !e.forceJSONP) return new i(e);
                        if (!r) throw new Error("JSONP disabled");
                        return new s(e)
                    },
                        a.websocket = o
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {
                "./polling-jsonp": 6,
                "./polling-xhr": 7,
                "./websocket": 9,
                "xmlhttprequest-ssl": 10
            }],
            6: [function (e, t, a) {
                (function (a) {
                    var n = e("./polling"),
                        i = e("component-inherit");
                    t.exports = h;
                    var s, o = /\n/g,
                        r = /\\n/g;
                    function c() { }
                    function h(e) {
                        n.call(this, e),
                            this.query = this.query || {},
                            s || (a.___eio || (a.___eio = []), s = a.___eio),
                            this.index = s.length;
                        var t = this;
                        s.push(function (e) {
                            t.onData(e)
                        }),
                            this.query.j = this.index,
                            a.document && a.addEventListener && a.addEventListener("beforeunload",
                                function () {
                                    t.script && (t.script.onerror = c)
                                },
                                !1)
                    }
                    i(h, n),
                        h.prototype.supportsBinary = !1,
                        h.prototype.doClose = function () {
                            this.script && (this.script.parentNode.removeChild(this.script), this.script = null),
                                this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null),
                                n.prototype.doClose.call(this)
                        },
                        h.prototype.doPoll = function () {
                            var e = this,
                                t = document.createElement("script");
                            this.script && (this.script.parentNode.removeChild(this.script), this.script = null),
                                t.async = !0,
                                t.src = this.uri(),
                                t.onerror = function (t) {
                                    e.onError("jsonp poll error", t)
                                };
                            var a = document.getElementsByTagName("script")[0];
                            a ? a.parentNode.insertBefore(t, a) : (document.head || document.body).appendChild(t),
                                this.script = t,
                                "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function () {
                                    var e = document.createElement("iframe");
                                    document.body.appendChild(e),
                                        document.body.removeChild(e)
                                },
                                    100)
                        },
                        h.prototype.doWrite = function (e, t) {
                            var a = this;
                            if (!this.form) {
                                var n, i = document.createElement("form"),
                                    s = document.createElement("textarea"),
                                    c = this.iframeId = "eio_iframe_" + this.index;
                                i.className = "socketio",
                                    i.style.position = "absolute",
                                    i.style.top = "-1000px",
                                    i.style.left = "-1000px",
                                    i.target = c,
                                    i.method = "POST",
                                    i.setAttribute("accept-charset", "utf-8"),
                                    s.name = "d",
                                    i.appendChild(s),
                                    document.body.appendChild(i),
                                    this.form = i,
                                    this.area = s
                            }
                            function h() {
                                l(),
                                    t()
                            }
                            function l() {
                                if (a.iframe) try {
                                    a.form.removeChild(a.iframe)
                                } catch (e) {
                                    a.onError("jsonp polling iframe removal error", e)
                                }
                                try {
                                    var e = '<iframe src="javascript:0" name="' + a.iframeId + '">';
                                    n = document.createElement(e)
                                } catch (e) {
                                    (n = document.createElement("iframe")).name = a.iframeId,
                                    n.src = "javascript:0"
                                }
                                n.id = a.iframeId,
                                    a.form.appendChild(n),
                                    a.iframe = n
                            }
                            this.form.action = this.uri(),
                                l(),
                                e = e.replace(r, "\\\n"),
                                this.area.value = e.replace(o, "\\n");
                            try {
                                this.form.submit()
                            } catch (e) { }
                            this.iframe.attachEvent ? this.iframe.onreadystatechange = function () {
                                "complete" == a.iframe.readyState && h()
                            } : this.iframe.onload = h
                        }
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {
                "./polling": 8,
                "component-inherit": 16
            }],
            7: [function (e, t, a) {
                (function (a) {
                    var n = e("xmlhttprequest-ssl"),
                        i = e("./polling"),
                        s = e("component-emitter"),
                        o = e("component-inherit"),
                        r = e("debug")("engine.io-client:polling-xhr");
                    function c() { }
                    function h(e) {
                        if (i.call(this, e), a.location) {
                            var t = "https:" == location.protocol,
                                n = location.port;
                            n || (n = t ? 443 : 80),
                                this.xd = e.hostname != a.location.hostname || n != e.port,
                                this.xs = e.secure != t
                        } else this.extraHeaders = e.extraHeaders
                    }
                    function l(e) {
                        this.method = e.method || "GET",
                            this.uri = e.uri,
                            this.xd = !!e.xd,
                            this.xs = !!e.xs,
                            this.async = !1 !== e.async,
                            this.data = void 0 != e.data ? e.data : null,
                            this.agent = e.agent,
                            this.isBinary = e.isBinary,
                            this.supportsBinary = e.supportsBinary,
                            this.enablesXDR = e.enablesXDR,
                            this.pfx = e.pfx,
                            this.key = e.key,
                            this.passphrase = e.passphrase,
                            this.cert = e.cert,
                            this.ca = e.ca,
                            this.ciphers = e.ciphers,
                            this.rejectUnauthorized = e.rejectUnauthorized,
                            this.extraHeaders = e.extraHeaders,
                            this.create()
                    }
                    function d() {
                        for (var e in l.requests) l.requests.hasOwnProperty(e) && l.requests[e].abort()
                    }
                    t.exports = h,
                        t.exports.Request = l,
                        o(h, i),
                        h.prototype.supportsBinary = !0,
                        h.prototype.request = function (e) {
                            return (e = e || {}).uri = this.uri(),
                                e.xd = this.xd,
                                e.xs = this.xs,
                                e.agent = this.agent || !1,
                                e.supportsBinary = this.supportsBinary,
                                e.enablesXDR = this.enablesXDR,
                                e.pfx = this.pfx,
                                e.key = this.key,
                                e.passphrase = this.passphrase,
                                e.cert = this.cert,
                                e.ca = this.ca,
                                e.ciphers = this.ciphers,
                                e.rejectUnauthorized = this.rejectUnauthorized,
                                e.extraHeaders = this.extraHeaders,
                                new l(e)
                        },
                        h.prototype.doWrite = function (e, t) {
                            var a = "string" != typeof e && void 0 !== e,
                                n = this.request({
                                    method: "POST",
                                    data: e,
                                    isBinary: a
                                }),
                                i = this;
                            n.on("success", t),
                                n.on("error",
                                    function (e) {
                                        i.onError("xhr post error", e)
                                    }),
                                this.sendXhr = n
                        },
                        h.prototype.doPoll = function () {
                            r("xhr poll");
                            var e = this.request(),
                                t = this;
                            e.on("data",
                                function (e) {
                                    t.onData(e)
                                }),
                                e.on("error",
                                    function (e) {
                                        t.onError("xhr poll error", e)
                                    }),
                                this.pollXhr = e
                        },
                        s(l.prototype),
                        l.prototype.create = function () {
                            var e = {
                                agent: this.agent,
                                xdomain: this.xd,
                                xscheme: this.xs,
                                enablesXDR: this.enablesXDR
                            };
                            e.pfx = this.pfx,
                                e.key = this.key,
                                e.passphrase = this.passphrase,
                                e.cert = this.cert,
                                e.ca = this.ca,
                                e.ciphers = this.ciphers,
                                e.rejectUnauthorized = this.rejectUnauthorized;
                            var t = this.xhr = new n(e),
                                i = this;
                            try {
                                r("xhr open %s: %s", this.method, this.uri),
                                    t.open(this.method, this.uri, this.async);
                                try {
                                    if (this.extraHeaders) {
                                        t.setDisableHeaderCheck(!0);
                                        for (var s in this.extraHeaders) this.extraHeaders.hasOwnProperty(s) && t.setRequestHeader(s, this.extraHeaders[s])
                                    }
                                } catch (e) { }
                                if (this.supportsBinary && (t.responseType = "arraybuffer"), "POST" == this.method) try {
                                    this.isBinary ? t.setRequestHeader("Content-type", "application/octet-stream") : t.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                                } catch (e) { }
                                "withCredentials" in t && (t.withCredentials = !0),
                                    this.hasXDR() ? (t.onload = function () {
                                        i.onLoad()
                                    },
                                        t.onerror = function () {
                                            i.onError(t.responseText)
                                        }) : t.onreadystatechange = function () {
                                            4 == t.readyState && (200 == t.status || 1223 == t.status ? i.onLoad() : setTimeout(function () {
                                                i.onError(t.status)
                                            },
                                                0))
                                        },
                                    r("xhr data %s", this.data),
                                    t.send(this.data)
                            } catch (e) {
                                return void setTimeout(function () {
                                    i.onError(e)
                                },
                                    0)
                            }
                            a.document && (this.index = l.requestsCount++ , l.requests[this.index] = this)
                        },
                        l.prototype.onSuccess = function () {
                            this.emit("success"),
                                this.cleanup()
                        },
                        l.prototype.onData = function (e) {
                            this.emit("data", e),
                                this.onSuccess()
                        },
                        l.prototype.onError = function (e) {
                            this.emit("error", e),
                                this.cleanup(!0)
                        },
                        l.prototype.cleanup = function (e) {
                            if (void 0 !== this.xhr && null !== this.xhr) {
                                if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = c : this.xhr.onreadystatechange = c, e) try {
                                    this.xhr.abort()
                                } catch (e) { }
                                a.document && delete l.requests[this.index],
                                    this.xhr = null
                            }
                        },
                        l.prototype.onLoad = function () {
                            var e;
                            try {
                                var t;
                                try {
                                    t = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                                } catch (e) { }
                                if ("application/octet-stream" === t) e = this.xhr.response;
                                else if (this.supportsBinary) try {
                                    e = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response))
                                } catch (t) {
                                    for (var a = new Uint8Array(this.xhr.response), n = [], i = 0, s = a.length; i < s; i++) n.push(a[i]);
                                    e = String.fromCharCode.apply(null, n)
                                } else e = this.xhr.responseText
                            } catch (e) {
                                this.onError(e)
                            }
                            null != e && this.onData(e)
                        },
                        l.prototype.hasXDR = function () {
                            return void 0 !== a.XDomainRequest && !this.xs && this.enablesXDR
                        },
                        l.prototype.abort = function () {
                            this.cleanup()
                        },
                        a.document && (l.requestsCount = 0, l.requests = {},
                            a.attachEvent ? a.attachEvent("onunload", d) : a.addEventListener && a.addEventListener("beforeunload", d, !1))
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {
                "./polling": 8,
                "component-emitter": 15,
                "component-inherit": 16,
                debug: 17,
                "xmlhttprequest-ssl": 10
            }],
            8: [function (e, t, a) {
                var n = e("../transport"),
                    i = e("parseqs"),
                    s = e("engine.io-parser"),
                    o = e("component-inherit"),
                    r = e("yeast"),
                    c = e("debug")("engine.io-client:polling");
                t.exports = l;
                var h = null != new (e("xmlhttprequest-ssl"))({
                    xdomain: !1
                }).responseType;
                function l(e) {
                    var t = e && e.forceBase64;
                    h && !t || (this.supportsBinary = !1),
                        n.call(this, e)
                }
                o(l, n),
                    l.prototype.name = "polling",
                    l.prototype.doOpen = function () {
                        this.poll()
                    },
                    l.prototype.pause = function (e) {
                        var t = this;
                        function a() {
                            c("paused"),
                                t.readyState = "paused",
                                e()
                        }
                        if (this.readyState = "pausing", this.polling || !this.writable) {
                            var n = 0;
                            this.polling && (c("we are currently polling - waiting to pause"), n++ , this.once("pollComplete",
                                function () {
                                    c("pre-pause polling complete"),
                                        --n || a()
                                })),
                                this.writable || (c("we are currently writing - waiting to pause"), n++ , this.once("drain",
                                    function () {
                                        c("pre-pause writing complete"),
                                            --n || a()
                                    }))
                        } else a()
                    },
                    l.prototype.poll = function () {
                        c("polling"),
                            this.polling = !0,
                            this.doPoll(),
                            this.emit("poll")
                    },
                    l.prototype.onData = function (e) {
                        var t = this;
                        c("polling got data %s", e);
                        s.decodePayload(e, this.socket.binaryType,
                            function (e, a, n) {
                                if ("opening" == t.readyState && t.onOpen(), "close" == e.type) return t.onClose(),
                                    !1;
                                t.onPacket(e)
                            }),
                            "closed" != this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" == this.readyState ? this.poll() : c('ignoring poll - transport state "%s"', this.readyState))
                    },
                    l.prototype.doClose = function () {
                        var e = this;
                        function t() {
                            c("writing close packet"),
                                e.write([{
                                    type: "close"
                                }])
                        }
                        "open" == this.readyState ? (c("transport open - closing"), t()) : (c("transport not open - deferring close"), this.once("open", t))
                    },
                    l.prototype.write = function (e) {
                        var t = this;
                        this.writable = !1;
                        var a = function () {
                            t.writable = !0,
                                t.emit("drain")
                        };
                        t = this;
                        s.encodePayload(e, this.supportsBinary,
                            function (e) {
                                t.doWrite(e, a)
                            })
                    },
                    l.prototype.uri = function () {
                        var e = this.query || {},
                            t = this.secure ? "https" : "http",
                            a = "";
                        return !1 !== this.timestampRequests && (e[this.timestampParam] = r()),
                            this.supportsBinary || e.sid || (e.b64 = 1),
                            e = i.encode(e),
                            this.port && ("https" == t && 443 != this.port || "http" == t && 80 != this.port) && (a = ":" + this.port),
                            e.length && (e = "?" + e),
                            t + "://" + (- 1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + a + this.path + e
                    }
            },
            {
                "../transport": 4,
                "component-inherit": 16,
                debug: 17,
                "engine.io-parser": 19,
                parseqs: 27,
                "xmlhttprequest-ssl": 10,
                yeast: 30
            }],
            9: [function (e, t, a) {
                (function (a) {
                    var n = e("../transport"),
                        i = e("engine.io-parser"),
                        s = e("parseqs"),
                        o = e("component-inherit"),
                        r = e("yeast"),
                        c = e("debug")("engine.io-client:websocket"),
                        h = a.WebSocket || a.MozWebSocket,
                        l = h;
                    if (!l && "undefined" == typeof window) try {
                        l = e("ws")
                    } catch (e) { }
                    function d(e) {
                        e && e.forceBase64 && (this.supportsBinary = !1),
                            this.perMessageDeflate = e.perMessageDeflate,
                            n.call(this, e)
                    }
                    t.exports = d,
                        o(d, n),
                        d.prototype.name = "websocket",
                        d.prototype.supportsBinary = !0,
                        d.prototype.doOpen = function () {
                            if (this.check()) {
                                var e = this.uri(),
                                    t = {
                                        agent: this.agent,
                                        perMessageDeflate: this.perMessageDeflate
                                    };
                                t.pfx = this.pfx,
                                    t.key = this.key,
                                    t.passphrase = this.passphrase,
                                    t.cert = this.cert,
                                    t.ca = this.ca,
                                    t.ciphers = this.ciphers,
                                    t.rejectUnauthorized = this.rejectUnauthorized,
                                    this.extraHeaders && (t.headers = this.extraHeaders),
                                    this.ws = h ? new l(e) : new l(e, void 0, t),
                                    void 0 === this.ws.binaryType && (this.supportsBinary = !1),
                                    this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "buffer") : this.ws.binaryType = "arraybuffer",
                                    this.addEventListeners()
                            }
                        },
                        d.prototype.addEventListeners = function () {
                            var e = this;
                            this.ws.onopen = function () {
                                e.onOpen()
                            },
                                this.ws.onclose = function () {
                                    e.onClose()
                                },
                                this.ws.onmessage = function (t) {
                                    e.onData(t.data)
                                },
                                this.ws.onerror = function (t) {
                                    e.onError("websocket error", t)
                                }
                        },
                        "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (d.prototype.onData = function (e) {
                            var t = this;
                            setTimeout(function () {
                                n.prototype.onData.call(t, e)
                            },
                                0)
                        }),
                        d.prototype.write = function (e) {
                            var t = this;
                            this.writable = !1;
                            for (var n = e.length,
                                s = 0,
                                o = n; s < o; s++)(function (e) {
                                    i.encodePacket(e, t.supportsBinary,
                                        function (i) {
                                            if (!h) {
                                                var s = {};
                                                if (e.options && (s.compress = e.options.compress), t.perMessageDeflate) ("string" == typeof i ? a.Buffer.byteLength(i) : i.length) < t.perMessageDeflate.threshold && (s.compress = !1)
                                            }
                                            try {
                                                h ? t.ws.send(i) : t.ws.send(i, s)
                                            } catch (e) {
                                                c("websocket closed before onclose event")
                                            } --n || r()
                                        })
                                })(e[s]);
                            function r() {
                                t.emit("flush"),
                                    setTimeout(function () {
                                        t.writable = !0,
                                            t.emit("drain")
                                    },
                                        0)
                            }
                        },
                        d.prototype.onClose = function () {
                            n.prototype.onClose.call(this)
                        },
                        d.prototype.doClose = function () {
                            void 0 !== this.ws && this.ws.close()
                        },
                        d.prototype.uri = function () {
                            var e = this.query || {},
                                t = this.secure ? "wss" : "ws",
                                a = "";
                            return this.port && ("wss" == t && 443 != this.port || "ws" == t && 80 != this.port) && (a = ":" + this.port),
                                this.timestampRequests && (e[this.timestampParam] = r()),
                                this.supportsBinary || (e.b64 = 1),
                                (e = s.encode(e)).length && (e = "?" + e),
                                t + "://" + (- 1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + a + this.path + e
                        },
                        d.prototype.check = function () {
                            return !(!l || "__initialize" in l && this.name === d.prototype.name)
                        }
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {
                "../transport": 4,
                "component-inherit": 16,
                debug: 17,
                "engine.io-parser": 19,
                parseqs: 27,
                ws: void 0,
                yeast: 30
            }],
            10: [function (e, t, a) {
                var n = e("has-cors");
                t.exports = function (e) {
                    var t = e.xdomain,
                        a = e.xscheme,
                        i = e.enablesXDR;
                    try {
                        if ("undefined" != typeof XMLHttpRequest && (!t || n)) return new XMLHttpRequest
                    } catch (e) { }
                    try {
                        if ("undefined" != typeof XDomainRequest && !a && i) return new XDomainRequest
                    } catch (e) { }
                    if (!t) try {
                        return new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (e) { }
                }
            },
            {
                "has-cors": 22
            }],
            11: [function (e, t, a) {
                function n() { }
                t.exports = function (e, t, a) {
                    var i = !1;
                    return a = a || n,
                        s.count = e,
                        0 === e ? t() : s;
                    function s(e, n) {
                        if (s.count <= 0) throw new Error("after called too many times"); --s.count,
                            e ? (i = !0, t(e), t = a) : 0 !== s.count || i || t(null, n)
                    }
                }
            },
            {}],
            12: [function (e, t, a) {
                t.exports = function (e, t, a) {
                    var n = e.byteLength;
                    if (t = t || 0, a = a || n, e.slice) return e.slice(t, a);
                    if (t < 0 && (t += n), a < 0 && (a += n), a > n && (a = n), t >= n || t >= a || 0 === n) return new ArrayBuffer(0);
                    for (var i = new Uint8Array(e), s = new Uint8Array(a - t), o = t, r = 0; o < a; o++ , r++) s[r] = i[o];
                    return s.buffer
                }
            },
            {}],
            13: [function (e, t, a) {
                (function (e) {
                    a.encode = function (t) {
                        var a, n = new Uint8Array(t),
                            i = n.length,
                            s = "";
                        for (a = 0; a < i; a += 3) s += e[n[a] >> 2],
                            s += e[(3 & n[a]) << 4 | n[a + 1] >> 4],
                            s += e[(15 & n[a + 1]) << 2 | n[a + 2] >> 6],
                            s += e[63 & n[a + 2]];
                        return i % 3 == 2 ? s = s.substring(0, s.length - 1) + "=" : i % 3 == 1 && (s = s.substring(0, s.length - 2) + "=="),
                            s
                    },
                        a.decode = function (t) {
                            var a, n, i, s, o, r = .75 * t.length,
                                c = t.length,
                                h = 0;
                            "=" === t[t.length - 1] && (r-- , "=" === t[t.length - 2] && r--);
                            var l = new ArrayBuffer(r),
                                d = new Uint8Array(l);
                            for (a = 0; a < c; a += 4) n = e.indexOf(t[a]),
                                i = e.indexOf(t[a + 1]),
                                s = e.indexOf(t[a + 2]),
                                o = e.indexOf(t[a + 3]),
                                d[h++] = n << 2 | i >> 4,
                                d[h++] = (15 & i) << 4 | s >> 2,
                                d[h++] = (3 & s) << 6 | 63 & o;
                            return l
                        }
                })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
            },
            {}],
            14: [function (e, t, a) {
                (function (e) {
                    var a = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder,
                        n = function () {
                            try {
                                return 2 === new Blob(["hi"]).size
                            } catch (e) {
                                return !1
                            }
                        }(),
                        i = n &&
                            function () {
                                try {
                                    return 2 === new Blob([new Uint8Array([1, 2])]).size
                                } catch (e) {
                                    return !1
                                }
                            }(),
                        s = a && a.prototype.append && a.prototype.getBlob;
                    function o(e) {
                        for (var t = 0; t < e.length; t++) {
                            var a = e[t];
                            if (a.buffer instanceof ArrayBuffer) {
                                var n = a.buffer;
                                if (a.byteLength !== n.byteLength) {
                                    var i = new Uint8Array(a.byteLength);
                                    i.set(new Uint8Array(n, a.byteOffset, a.byteLength)),
                                        n = i.buffer
                                }
                                e[t] = n
                            }
                        }
                    }
                    function r(e, t) {
                        t = t || {};
                        var n = new a;
                        o(e);
                        for (var i = 0; i < e.length; i++) n.append(e[i]);
                        return t.type ? n.getBlob(t.type) : n.getBlob()
                    }
                    function c(e, t) {
                        return o(e),
                            new Blob(e, t || {})
                    }
                    t.exports = n ? i ? e.Blob : c : s ? r : void 0
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {}],
            15: [function (e, t, a) {
                function n(e) {
                    if (e) return function (e) {
                        for (var t in n.prototype) e[t] = n.prototype[t];
                        return e
                    }(e)
                }
                t.exports = n,
                    n.prototype.on = n.prototype.addEventListener = function (e, t) {
                        return this._callbacks = this._callbacks || {},
                            (this._callbacks[e] = this._callbacks[e] || []).push(t),
                            this
                    },
                    n.prototype.once = function (e, t) {
                        var a = this;
                        function n() {
                            a.off(e, n),
                                t.apply(this, arguments)
                        }
                        return this._callbacks = this._callbacks || {},
                            n.fn = t,
                            this.on(e, n),
                            this
                    },
                    n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (e, t) {
                        if (this._callbacks = this._callbacks || {},
                            0 == arguments.length) return this._callbacks = {},
                                this;
                        var a, n = this._callbacks[e];
                        if (!n) return this;
                        if (1 == arguments.length) return delete this._callbacks[e],
                            this;
                        for (var i = 0; i < n.length; i++) if ((a = n[i]) === t || a.fn === t) {
                            n.splice(i, 1);
                            break
                        }
                        return this
                    },
                    n.prototype.emit = function (e) {
                        this._callbacks = this._callbacks || {};
                        var t = [].slice.call(arguments, 1),
                            a = this._callbacks[e];
                        if (a) for (var n = 0,
                            i = (a = a.slice(0)).length; n < i; ++n) a[n].apply(this, t);
                        return this
                    },
                    n.prototype.listeners = function (e) {
                        return this._callbacks = this._callbacks || {},
                            this._callbacks[e] || []
                    },
                    n.prototype.hasListeners = function (e) {
                        return !!this.listeners(e).length
                    }
            },
            {}],
            16: [function (e, t, a) {
                t.exports = function (e, t) {
                    var a = function () { };
                    a.prototype = t.prototype,
                        e.prototype = new a,
                        e.prototype.constructor = e
                }
            },
            {}],
            17: [function (e, t, a) {
                function n() {
                    var e;
                    try {
                        e = a.storage.debug
                    } catch (e) { }
                    return e
                } (a = t.exports = e("./debug")).log = function () {
                    return "object" === ("undefined" == typeof console ? "undefined" : i(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments)
                },
                    a.formatArgs = function () {
                        var e = arguments,
                            t = this.useColors;
                        if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + a.humanize(this.diff), !t) return e;
                        var n = "color: " + this.color,
                            i = 0,
                            s = 0;
                        return (e = [e[0], n, "color: inherit"].concat(Array.prototype.slice.call(e, 1)))[0].replace(/%[a-z%]/g,
                            function (e) {
                                "%%" !== e && "%c" === e && (s = ++i)
                            }),
                            e.splice(s, 0, n),
                            e
                    },
                    a.save = function (e) {
                        try {
                            null == e ? a.storage.removeItem("debug") : a.storage.debug = e
                        } catch (e) { }
                    },
                    a.load = n,
                    a.useColors = function () {
                        return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
                    },
                    a.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function () {
                        try {
                            return window.localStorage
                        } catch (e) { }
                    }(),
                    a.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"],
                    a.formatters.j = function (e) {
                        return JSON.stringify(e)
                    },
                    a.enable(n())
            },
            {
                "./debug": 18
            }],
            18: [function (e, t, a) {
                (a = t.exports = function (e) {
                    function t() { }
                    function s() {
                        var e = s,
                            t = +new Date,
                            o = t - (n || t);
                        e.diff = o,
                            e.prev = n,
                            e.curr = t,
                            n = t,
                            null == e.useColors && (e.useColors = a.useColors()),
                            null == e.color && e.useColors && (e.color = a.colors[i++ % a.colors.length]);
                        var r = Array.prototype.slice.call(arguments);
                        r[0] = a.coerce(r[0]),
                            "string" != typeof r[0] && (r = ["%o"].concat(r));
                        var c = 0;
                        r[0] = r[0].replace(/%([a-z%])/g,
                            function (t, n) {
                                if ("%%" === t) return t;
                                c++;
                                var i = a.formatters[n];
                                if ("function" == typeof i) {
                                    var s = r[c];
                                    t = i.call(e, s),
                                        r.splice(c, 1),
                                        c--
                                }
                                return t
                            }),
                            "function" == typeof a.formatArgs && (r = a.formatArgs.apply(e, r));
                        var h = s.log || a.log || console.log.bind(console);
                        h.apply(e, r)
                    }
                    t.enabled = !1,
                        s.enabled = !0;
                    var o = a.enabled(e) ? s : t;
                    return o.namespace = e,
                        o
                }).coerce = function (e) {
                    return e instanceof Error ? e.stack || e.message : e
                },
                a.disable = function () {
                    a.enable("")
                },
                a.enable = function (e) {
                    a.save(e);
                    for (var t = (e || "").split(/[\s,]+/), n = t.length, i = 0; i < n; i++) t[i] && ("-" === (e = t[i].replace(/\*/g, ".*?"))[0] ? a.skips.push(new RegExp("^" + e.substr(1) + "$")) : a.names.push(new RegExp("^" + e + "$")))
                },
                a.enabled = function (e) {
                    var t, n;
                    for (t = 0, n = a.skips.length; t < n; t++) if (a.skips[t].test(e)) return !1;
                    for (t = 0, n = a.names.length; t < n; t++) if (a.names[t].test(e)) return !0;
                    return !1
                },
                a.humanize = e("ms"),
                a.names = [],
                a.skips = [],
                a.formatters = {};
                var n, i = 0
            },
            {
                ms: 25
            }],
            19: [function (e, t, a) {
                (function (t) {
                    var n = e("./keys"),
                        i = e("has-binary"),
                        s = e("arraybuffer.slice"),
                        o = e("base64-arraybuffer"),
                        r = e("after"),
                        c = e("utf8"),
                        h = navigator.userAgent.match(/Android/i),
                        l = /PhantomJS/i.test(navigator.userAgent),
                        d = h || l;
                    a.protocol = 3;
                    var u = a.packets = {
                        open: 0,
                        close: 1,
                        ping: 2,
                        pong: 3,
                        message: 4,
                        upgrade: 5,
                        noop: 6
                    },
                        g = n(u),
                        v = {
                            type: "error",
                            data: "parser error"
                        },
                        f = e("blob");
                    function p(e, t, a) {
                        for (var n = new Array(e.length), i = r(e.length, a), s = function (e, a, i) {
                            t(a,
                                function (t, a) {
                                    n[e] = a,
                                        i(t, n)
                                })
                        },
                            o = 0; o < e.length; o++) s(o, e[o], i)
                    }
                    a.encodePacket = function (e, n, i, s) {
                        "function" == typeof n && (s = n, n = !1),
                            "function" == typeof i && (s = i, i = null);
                        var o = void 0 === e.data ? void 0 : e.data.buffer || e.data;
                        if (t.ArrayBuffer && o instanceof ArrayBuffer) return function (e, t, n) {
                            if (!t) return a.encodeBase64Packet(e, n);
                            var i = e.data,
                                s = new Uint8Array(i),
                                o = new Uint8Array(1 + i.byteLength);
                            o[0] = u[e.type];
                            for (var r = 0; r < s.length; r++) o[r + 1] = s[r];
                            return n(o.buffer)
                        }(e, n, s);
                        if (f && o instanceof t.Blob) return function (e, t, n) {
                            if (!t) return a.encodeBase64Packet(e, n);
                            if (d) return function (e, t, n) {
                                if (!t) return a.encodeBase64Packet(e, n);
                                var i = new FileReader;
                                return i.onload = function () {
                                    e.data = i.result,
                                        a.encodePacket(e, t, !0, n)
                                },
                                    i.readAsArrayBuffer(e.data)
                            }(e, t, n);
                            var i = new Uint8Array(1);
                            i[0] = u[e.type];
                            var s = new f([i.buffer, e.data]);
                            return n(s)
                        }(e, n, s);
                        if (o && o.base64) return function (e, t) {
                            var n = "b" + a.packets[e.type] + e.data.data;
                            return t(n)
                        }(e, s);
                        var r = u[e.type];
                        return void 0 !== e.data && (r += i ? c.encode(String(e.data)) : String(e.data)),
                            s("" + r)
                    },
                        a.encodeBase64Packet = function (e, n) {
                            var i, s = "b" + a.packets[e.type];
                            if (f && e.data instanceof t.Blob) {
                                var o = new FileReader;
                                return o.onload = function () {
                                    var e = o.result.split(",")[1];
                                    n(s + e)
                                },
                                    o.readAsDataURL(e.data)
                            }
                            try {
                                i = String.fromCharCode.apply(null, new Uint8Array(e.data))
                            } catch (t) {
                                for (var r = new Uint8Array(e.data), c = new Array(r.length), h = 0; h < r.length; h++) c[h] = r[h];
                                i = String.fromCharCode.apply(null, c)
                            }
                            return s += t.btoa(i),
                                n(s)
                        },
                        a.decodePacket = function (e, t, n) {
                            if ("string" == typeof e || void 0 === e) {
                                if ("b" == e.charAt(0)) return a.decodeBase64Packet(e.substr(1), t);
                                if (n) try {
                                    e = c.decode(e)
                                } catch (e) {
                                    return v
                                }
                                var i = e.charAt(0);
                                return Number(i) == i && g[i] ? e.length > 1 ? {
                                    type: g[i],
                                    data: e.substring(1)
                                } : {
                                        type: g[i]
                                    } : v
                            }
                            i = new Uint8Array(e)[0];
                            var o = s(e, 1);
                            return f && "blob" === t && (o = new f([o])),
                                {
                                    type: g[i],
                                    data: o
                                }
                        },
                        a.decodeBase64Packet = function (e, a) {
                            var n = g[e.charAt(0)];
                            if (!t.ArrayBuffer) return {
                                type: n,
                                data: {
                                    base64: !0,
                                    data: e.substr(1)
                                }
                            };
                            var i = o.decode(e.substr(1));
                            return "blob" === a && f && (i = new f([i])),
                                {
                                    type: n,
                                    data: i
                                }
                        },
                        a.encodePayload = function (e, t, n) {
                            "function" == typeof t && (n = t, t = null);
                            var s = i(e);
                            if (t && s) return f && !d ? a.encodePayloadAsBlob(e, n) : a.encodePayloadAsArrayBuffer(e, n);
                            if (!e.length) return n("0:");
                            p(e,
                                function (e, n) {
                                    a.encodePacket(e, !!s && t, !0,
                                        function (e) {
                                            n(null,
                                                function (e) {
                                                    return e.length + ":" + e
                                                }(e))
                                        })
                                },
                                function (e, t) {
                                    return n(t.join(""))
                                })
                        },
                        a.decodePayload = function (e, t, n) {
                            if ("string" != typeof e) return a.decodePayloadAsBinary(e, t, n);
                            var i;
                            if ("function" == typeof t && (n = t, t = null), "" == e) return n(v, 0, 1);
                            for (var s, o, r = "",
                                c = 0,
                                h = e.length; c < h; c++) {
                                var l = e.charAt(c);
                                if (":" != l) r += l;
                                else {
                                    if ("" == r || r != (s = Number(r))) return n(v, 0, 1);
                                    if (r != (o = e.substr(c + 1, s)).length) return n(v, 0, 1);
                                    if (o.length) {
                                        if (i = a.decodePacket(o, t, !0), v.type == i.type && v.data == i.data) return n(v, 0, 1);
                                        if (!1 === n(i, c + s, h)) return
                                    }
                                    c += s,
                                        r = ""
                                }
                            }
                            return "" != r ? n(v, 0, 1) : void 0
                        },
                        a.encodePayloadAsArrayBuffer = function (e, t) {
                            if (!e.length) return t(new ArrayBuffer(0));
                            p(e,
                                function (e, t) {
                                    a.encodePacket(e, !0, !0,
                                        function (e) {
                                            return t(null, e)
                                        })
                                },
                                function (e, a) {
                                    var n = a.reduce(function (e, t) {
                                        var a;
                                        return e + (a = "string" == typeof t ? t.length : t.byteLength).toString().length + a + 2
                                    },
                                        0),
                                        i = new Uint8Array(n),
                                        s = 0;
                                    return a.forEach(function (e) {
                                        var t = "string" == typeof e,
                                            a = e;
                                        if (t) {
                                            for (var n = new Uint8Array(e.length), o = 0; o < e.length; o++) n[o] = e.charCodeAt(o);
                                            a = n.buffer
                                        }
                                        i[s++] = t ? 0 : 1;
                                        var r = a.byteLength.toString();
                                        for (o = 0; o < r.length; o++) i[s++] = parseInt(r[o]);
                                        i[s++] = 255;
                                        for (n = new Uint8Array(a), o = 0; o < n.length; o++) i[s++] = n[o]
                                    }),
                                        t(i.buffer)
                                })
                        },
                        a.encodePayloadAsBlob = function (e, t) {
                            p(e,
                                function (e, t) {
                                    a.encodePacket(e, !0, !0,
                                        function (e) {
                                            var a = new Uint8Array(1);
                                            if (a[0] = 1, "string" == typeof e) {
                                                for (var n = new Uint8Array(e.length), i = 0; i < e.length; i++) n[i] = e.charCodeAt(i);
                                                e = n.buffer,
                                                    a[0] = 0
                                            }
                                            var s = (e instanceof ArrayBuffer ? e.byteLength : e.size).toString(),
                                                o = new Uint8Array(s.length + 1);
                                            for (i = 0; i < s.length; i++) o[i] = parseInt(s[i]);
                                            if (o[s.length] = 255, f) {
                                                var r = new f([a.buffer, o.buffer, e]);
                                                t(null, r)
                                            }
                                        })
                                },
                                function (e, a) {
                                    return t(new f(a))
                                })
                        },
                        a.decodePayloadAsBinary = function (e, t, n) {
                            "function" == typeof t && (n = t, t = null);
                            for (var i = e,
                                o = [], r = !1; i.byteLength > 0;) {
                                for (var c = new Uint8Array(i), h = 0 === c[0], l = "", d = 1; 255 != c[d]; d++) {
                                    if (l.length > 310) {
                                        r = !0;
                                        break
                                    }
                                    l += c[d]
                                }
                                if (r) return n(v, 0, 1);
                                i = s(i, 2 + l.length),
                                    l = parseInt(l);
                                var u = s(i, 0, l);
                                if (h) try {
                                    u = String.fromCharCode.apply(null, new Uint8Array(u))
                                } catch (e) {
                                    var g = new Uint8Array(u);
                                    u = "";
                                    for (d = 0; d < g.length; d++) u += String.fromCharCode(g[d])
                                }
                                o.push(u),
                                    i = s(i, l)
                            }
                            var f = o.length;
                            o.forEach(function (e, i) {
                                n(a.decodePacket(e, t, !0), i, f)
                            })
                        }
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {
                "./keys": 20,
                after: 11,
                "arraybuffer.slice": 12,
                "base64-arraybuffer": 13,
                blob: 14,
                "has-binary": 21,
                utf8: 29
            }],
            20: [function (e, t, a) {
                t.exports = Object.keys ||
                    function (e) {
                        var t = [],
                            a = Object.prototype.hasOwnProperty;
                        for (var n in e) a.call(e, n) && t.push(n);
                        return t
                    }
            },
            {}],
            21: [function (e, t, a) {
                (function (a) {
                    var n = e("isarray");
                    t.exports = function (e) {
                        return function e(t) {
                            if (!t) return !1;
                            if (a.Buffer && a.Buffer.isBuffer(t) || a.ArrayBuffer && t instanceof ArrayBuffer || a.Blob && t instanceof Blob || a.File && t instanceof File) return !0;
                            if (n(t)) {
                                for (var s = 0; s < t.length; s++) if (e(t[s])) return !0
                            } else if (t && "object" == (void 0 === t ? "undefined" : i(t))) {
                                t.toJSON && (t = t.toJSON());
                                for (var o in t) if (Object.prototype.hasOwnProperty.call(t, o) && e(t[o])) return !0
                            }
                            return !1
                        }(e)
                    }
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {
                isarray: 24
            }],
            22: [function (e, t, a) {
                try {
                    t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
                } catch (e) {
                    t.exports = !1
                }
            },
            {}],
            23: [function (e, t, a) {
                var n = [].indexOf;
                t.exports = function (e, t) {
                    if (n) return e.indexOf(t);
                    for (var a = 0; a < e.length; ++a) if (e[a] === t) return a;
                    return - 1
                }
            },
            {}],
            24: [function (e, t, a) {
                t.exports = Array.isArray ||
                    function (e) {
                        return "[object Array]" == Object.prototype.toString.call(e)
                    }
            },
            {}],
            25: [function (e, t, a) {
                var n = 1e3,
                    i = 60 * n,
                    s = 60 * i,
                    o = 24 * s,
                    r = 365.25 * o;
                function c(e, t, a) {
                    if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + a : Math.ceil(e / t) + " " + a + "s"
                }
                t.exports = function (e, t) {
                    return t = t || {},
                        "string" == typeof e ?
                            function (e) {
                                if ((e = "" + e).length > 1e4) return;
                                var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                                if (!t) return;
                                var a = parseFloat(t[1]);
                                switch ((t[2] || "ms").toLowerCase()) {
                                    case "years":
                                    case "year":
                                    case "yrs":
                                    case "yr":
                                    case "y":
                                        return a * r;
                                    case "days":
                                    case "day":
                                    case "d":
                                        return a * o;
                                    case "hours":
                                    case "hour":
                                    case "hrs":
                                    case "hr":
                                    case "h":
                                        return a * s;
                                    case "minutes":
                                    case "minute":
                                    case "mins":
                                    case "min":
                                    case "m":
                                        return a * i;
                                    case "seconds":
                                    case "second":
                                    case "secs":
                                    case "sec":
                                    case "s":
                                        return a * n;
                                    case "milliseconds":
                                    case "millisecond":
                                    case "msecs":
                                    case "msec":
                                    case "ms":
                                        return a
                                }
                            }(e) :
                            t.long ?
                                function (e) {
                                    return c(e, o, "day") || c(e, s, "hour") || c(e, i, "minute") || c(e, n, "second") || e + " ms"
                                }(e) : function (e) {
                                    return e >= o ? Math.round(e / o) + "d" : e >= s ? Math.round(e / s) + "h" : e >= i ? Math.round(e / i) + "m" : e >= n ? Math.round(e / n) + "s" : e + "ms"
                                }(e)
                }
            },
            {}],
            26: [function (e, t, a) {
                (function (e) {
                    var a = /^[\],:{}\s]*$/,
                        n = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                        i = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                        s = /(?:^|:|,)(?:\s*\[)+/g,
                        o = /^\s+/,
                        r = /\s+$/;
                    t.exports = function (t) {
                        return "string" == typeof t && t ? (t = t.replace(o, "").replace(r, ""), e.JSON && JSON.parse ? JSON.parse(t) : a.test(t.replace(n, "@").replace(i, "]").replace(s, "")) ? new Function("return " + t)() : void 0) : null
                    }
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {}],
            27: [function (e, t, a) {
                a.encode = function (e) {
                    var t = "";
                    for (var a in e) e.hasOwnProperty(a) && (t.length && (t += "&"), t += encodeURIComponent(a) + "=" + encodeURIComponent(e[a]));
                    return t
                },
                    a.decode = function (e) {
                        for (var t = {},
                            a = e.split("&"), n = 0, i = a.length; n < i; n++) {
                            var s = a[n].split("=");
                            t[decodeURIComponent(s[0])] = decodeURIComponent(s[1])
                        }
                        return t
                    }
            },
            {}],
            28: [function (e, t, a) {
                var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    i = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
                t.exports = function (e) {
                    var t = e,
                        a = e.indexOf("["),
                        s = e.indexOf("]"); - 1 != a && -1 != s && (e = e.substring(0, a) + e.substring(a, s).replace(/:/g, ";") + e.substring(s, e.length));
                    for (var o = n.exec(e || ""), r = {},
                        c = 14; c--;) r[i[c]] = o[c] || "";
                    return - 1 != a && -1 != s && (r.source = t, r.host = r.host.substring(1, r.host.length - 1).replace(/;/g, ":"), r.authority = r.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), r.ipv6uri = !0),
                        r
                }
            },
            {}],
            29: [function (e, t, a) {
                (function (e) {
                    (function (n) {
                        var s = "object" == (void 0 === a ? "undefined" : i(a)) && a,
                            o = "object" == (void 0 === t ? "undefined" : i(t)) && t && t.exports == s && t,
                            r = "object" == (void 0 === e ? "undefined" : i(e)) && e;
                        r.global !== r && r.window !== r || (n = r);
                        var c, h, l, d = String.fromCharCode;
                        function u(e) {
                            for (var t, a, n = [], i = 0, s = e.length; i < s;)(t = e.charCodeAt(i++)) >= 55296 && t <= 56319 && i < s ? 56320 == (64512 & (a = e.charCodeAt(i++))) ? n.push(((1023 & t) << 10) + (1023 & a) + 65536) : (n.push(t), i--) : n.push(t);
                            return n
                        }
                        function g(e) {
                            if (e >= 55296 && e <= 57343) throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value")
                        }
                        function v(e, t) {
                            return d(e >> t & 63 | 128)
                        }
                        function f(e) {
                            if (0 == (4294967168 & e)) return d(e);
                            var t = "";
                            return 0 == (4294965248 & e) ? t = d(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (g(e), t = d(e >> 12 & 15 | 224), t += v(e, 6)) : 0 == (4292870144 & e) && (t = d(e >> 18 & 7 | 240), t += v(e, 12), t += v(e, 6)),
                                t += d(63 & e | 128)
                        }
                        function p() {
                            if (l >= h) throw Error("Invalid byte index");
                            var e = 255 & c[l];
                            if (l++ , 128 == (192 & e)) return 63 & e;
                            throw Error("Invalid continuation byte")
                        }
                        function m() {
                            var e, t;
                            if (l > h) throw Error("Invalid byte index");
                            if (l == h) return !1;
                            if (e = 255 & c[l], l++ , 0 == (128 & e)) return e;
                            if (192 == (224 & e)) {
                                if ((t = (31 & e) << 6 | p()) >= 128) return t;
                                throw Error("Invalid continuation byte")
                            }
                            if (224 == (240 & e)) {
                                if ((t = (15 & e) << 12 | p() << 6 | p()) >= 2048) return g(t),
                                    t;
                                throw Error("Invalid continuation byte")
                            }
                            if (240 == (248 & e) && (t = (15 & e) << 18 | p() << 12 | p() << 6 | p()) >= 65536 && t <= 1114111) return t;
                            throw Error("Invalid UTF-8 detected")
                        }
                        var _ = {
                            version: "2.0.0",
                            encode: function (e) {
                                for (var t = u(e), a = t.length, n = -1, i = ""; ++n < a;) i += f(t[n]);
                                return i
                            },
                            decode: function (e) {
                                c = u(e),
                                    h = c.length,
                                    l = 0;
                                for (var t, a = []; !1 !== (t = m());) a.push(t);
                                return function (e) {
                                    for (var t, a = e.length,
                                        n = -1,
                                        i = ""; ++n < a;)(t = e[n]) > 65535 && (i += d((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t),
                                            i += d(t);
                                    return i
                                }(a)
                            }
                        };
                        if (s && !s.nodeType) if (o) o.exports = _;
                        else {
                            var y = {}.hasOwnProperty;
                            for (var C in _) y.call(_, C) && (s[C] = _[C])
                        } else n.utf8 = _
                    })(this)
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {}],
            30: [function (e, t, a) {
                var n, i = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
                    s = 64,
                    o = {},
                    r = 0,
                    c = 0;
                function h(e) {
                    var t = "";
                    do {
                        t = i[e % s] + t, e = Math.floor(e / s)
                    } while (e > 0);
                    return t
                }
                function l() {
                    var e = h(+ new Date);
                    return e !== n ? (r = 0, n = e) : e + "." + h(r++)
                }
                for (; c < s; c++) o[i[c]] = c;
                l.encode = h,
                    l.decode = function (e) {
                        var t = 0;
                        for (c = 0; c < e.length; c++) t = t * s + o[e.charAt(c)];
                        return t
                    },
                    t.exports = l
            },
            {}],
            31: [function (e, t, a) {
                var n = e("./url"),
                    s = e("socket.io-parser"),
                    o = e("./manager"),
                    r = e("debug")("socket.io-client");
                t.exports = a = h;
                var c = a.managers = {};
                function h(e, t) {
                    "object" == (void 0 === e ? "undefined" : i(e)) && (t = e, e = void 0),
                        t = t || {};
                    var a, s = n(e),
                        h = s.source,
                        l = s.id,
                        d = s.path,
                        u = c[l] && d in c[l].nsps;
                    return t.forceNew || t["force new connection"] || !1 === t.multiplex || u ? (r("ignoring socket cache for %s", h), a = o(h, t)) : (c[l] || (r("new io instance for %s", h), c[l] = o(h, t)), a = c[l]),
                        a.socket(s.path)
                }
                a.protocol = s.protocol,
                    a.connect = h,
                    a.Manager = e("./manager"),
                    a.Socket = e("./socket")
            },
            {
                "./manager": 32,
                "./socket": 34,
                "./url": 35,
                debug: 39,
                "socket.io-parser": 47
            }],
            32: [function (e, t, a) {
                var n = e("engine.io-client"),
                    s = e("./socket"),
                    o = e("component-emitter"),
                    r = e("socket.io-parser"),
                    c = e("./on"),
                    h = e("component-bind"),
                    l = e("debug")("socket.io-client:manager"),
                    d = e("indexof"),
                    u = e("backo2"),
                    g = Object.prototype.hasOwnProperty;
                function v(e, t) {
                    if (!(this instanceof v)) return new v(e, t);
                    e && "object" == (void 0 === e ? "undefined" : i(e)) && (t = e, e = void 0),
                        (t = t || {}).path = t.path || "/socket.io",
                        this.nsps = {},
                        this.subs = [],
                        this.opts = t,
                        this.reconnection(!1 !== t.reconnection),
                        this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0),
                        this.reconnectionDelay(t.reconnectionDelay || 1e3),
                        this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3),
                        this.randomizationFactor(t.randomizationFactor || .5),
                        this.backoff = new u({
                            min: this.reconnectionDelay(),
                            max: this.reconnectionDelayMax(),
                            jitter: this.randomizationFactor()
                        }),
                        this.timeout(null == t.timeout ? 2e4 : t.timeout),
                        this.readyState = "closed",
                        this.uri = e,
                        this.connecting = [],
                        this.lastPing = null,
                        this.encoding = !1,
                        this.packetBuffer = [],
                        this.encoder = new r.Encoder,
                        this.decoder = new r.Decoder,
                        this.autoConnect = !1 !== t.autoConnect,
                        this.autoConnect && this.open()
                }
                t.exports = v,
                    v.prototype.emitAll = function () {
                        this.emit.apply(this, arguments);
                        for (var e in this.nsps) g.call(this.nsps, e) && this.nsps[e].emit.apply(this.nsps[e], arguments)
                    },
                    v.prototype.updateSocketIds = function () {
                        for (var e in this.nsps) g.call(this.nsps, e) && (this.nsps[e].id = this.engine.id)
                    },
                    o(v.prototype),
                    v.prototype.reconnection = function (e) {
                        return arguments.length ? (this._reconnection = !!e, this) : this._reconnection
                    },
                    v.prototype.reconnectionAttempts = function (e) {
                        return arguments.length ? (this._reconnectionAttempts = e, this) : this._reconnectionAttempts
                    },
                    v.prototype.reconnectionDelay = function (e) {
                        return arguments.length ? (this._reconnectionDelay = e, this.backoff && this.backoff.setMin(e), this) : this._reconnectionDelay
                    },
                    v.prototype.randomizationFactor = function (e) {
                        return arguments.length ? (this._randomizationFactor = e, this.backoff && this.backoff.setJitter(e), this) : this._randomizationFactor
                    },
                    v.prototype.reconnectionDelayMax = function (e) {
                        return arguments.length ? (this._reconnectionDelayMax = e, this.backoff && this.backoff.setMax(e), this) : this._reconnectionDelayMax
                    },
                    v.prototype.timeout = function (e) {
                        return arguments.length ? (this._timeout = e, this) : this._timeout
                    },
                    v.prototype.maybeReconnectOnOpen = function () {
                    !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
                    },
                    v.prototype.open = v.prototype.connect = function (e) {
                        if (l("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
                        l("opening %s", this.uri),
                            this.engine = n(this.uri, this.opts);
                        var t = this.engine,
                            a = this;
                        this.readyState = "opening",
                            this.skipReconnect = !1;
                        var i = c(t, "open",
                            function () {
                                a.onopen(),
                                    e && e()
                            }),
                            s = c(t, "error",
                                function (t) {
                                    if (l("connect_error"), a.cleanup(), a.readyState = "closed", a.emitAll("connect_error", t), e) {
                                        var n = new Error("Connection error");
                                        n.data = t,
                                            e(n)
                                    } else a.maybeReconnectOnOpen()
                                });
                        if (!1 !== this._timeout) {
                            var o = this._timeout;
                            l("connect attempt will timeout after %d", o);
                            var r = setTimeout(function () {
                                l("connect attempt timed out after %d", o),
                                    i.destroy(),
                                    t.close(),
                                    t.emit("error", "timeout"),
                                    a.emitAll("connect_timeout", o)
                            },
                                o);
                            this.subs.push({
                                destroy: function () {
                                    clearTimeout(r)
                                }
                            })
                        }
                        return this.subs.push(i),
                            this.subs.push(s),
                            this
                    },
                    v.prototype.onopen = function () {
                        l("open"),
                            this.cleanup(),
                            this.readyState = "open",
                            this.emit("open");
                        var e = this.engine;
                        this.subs.push(c(e, "data", h(this, "ondata"))),
                            this.subs.push(c(e, "ping", h(this, "onping"))),
                            this.subs.push(c(e, "pong", h(this, "onpong"))),
                            this.subs.push(c(e, "error", h(this, "onerror"))),
                            this.subs.push(c(e, "close", h(this, "onclose"))),
                            this.subs.push(c(this.decoder, "decoded", h(this, "ondecoded")))
                    },
                    v.prototype.onping = function () {
                        this.lastPing = new Date,
                            this.emitAll("ping")
                    },
                    v.prototype.onpong = function () {
                        this.emitAll("pong", new Date - this.lastPing)
                    },
                    v.prototype.ondata = function (e) {
                        this.decoder.add(e)
                    },
                    v.prototype.ondecoded = function (e) {
                        this.emit("packet", e)
                    },
                    v.prototype.onerror = function (e) {
                        l("error", e),
                            this.emitAll("error", e)
                    },
                    v.prototype.socket = function (e) {
                        var t = this.nsps[e];
                        if (!t) {
                            t = new s(this, e),
                                this.nsps[e] = t;
                            var a = this;
                            t.on("connecting", n),
                                t.on("connect",
                                    function () {
                                        t.id = a.engine.id
                                    }),
                                this.autoConnect && n()
                        }
                        function n() {
                        ~d(a.connecting, t) || a.connecting.push(t)
                        }
                        return t
                    },
                    v.prototype.destroy = function (e) {
                        var t = d(this.connecting, e); ~t && this.connecting.splice(t, 1),
                            this.connecting.length || this.close()
                    },
                    v.prototype.packet = function (e) {
                        l("writing packet %j", e);
                        var t = this;
                        t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0, this.encoder.encode(e,
                            function (a) {
                                for (var n = 0; n < a.length; n++) t.engine.write(a[n], e.options);
                                t.encoding = !1,
                                    t.processPacketQueue()
                            }))
                    },
                    v.prototype.processPacketQueue = function () {
                        if (this.packetBuffer.length > 0 && !this.encoding) {
                            var e = this.packetBuffer.shift();
                            this.packet(e)
                        }
                    },
                    v.prototype.cleanup = function () {
                        var e;
                        for (l("cleanup"); e = this.subs.shift();) e.destroy();
                        this.packetBuffer = [],
                            this.encoding = !1,
                            this.lastPing = null,
                            this.decoder.destroy()
                    },
                    v.prototype.close = v.prototype.disconnect = function () {
                        l("disconnect"),
                            this.skipReconnect = !0,
                            this.reconnecting = !1,
                            "opening" == this.readyState && this.cleanup(),
                            this.backoff.reset(),
                            this.readyState = "closed",
                            this.engine && this.engine.close()
                    },
                    v.prototype.onclose = function (e) {
                        l("onclose"),
                            this.cleanup(),
                            this.backoff.reset(),
                            this.readyState = "closed",
                            this.emit("close", e),
                            this._reconnection && !this.skipReconnect && this.reconnect()
                    },
                    v.prototype.reconnect = function () {
                        if (this.reconnecting || this.skipReconnect) return this;
                        var e = this;
                        if (this.backoff.attempts >= this._reconnectionAttempts) l("reconnect failed"),
                            this.backoff.reset(),
                            this.emitAll("reconnect_failed"),
                            this.reconnecting = !1;
                        else {
                            var t = this.backoff.duration();
                            l("will wait %dms before reconnect attempt", t),
                                this.reconnecting = !0;
                            var a = setTimeout(function () {
                                e.skipReconnect || (l("attempting reconnect"), e.emitAll("reconnect_attempt", e.backoff.attempts), e.emitAll("reconnecting", e.backoff.attempts), e.skipReconnect || e.open(function (t) {
                                    t ? (l("reconnect attempt error"), e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", t.data)) : (l("reconnect success"), e.onreconnect())
                                }))
                            },
                                t);
                            this.subs.push({
                                destroy: function () {
                                    clearTimeout(a)
                                }
                            })
                        }
                    },
                    v.prototype.onreconnect = function () {
                        var e = this.backoff.attempts;
                        this.reconnecting = !1,
                            this.backoff.reset(),
                            this.updateSocketIds(),
                            this.emitAll("reconnect", e)
                    }
            },
            {
                "./on": 33,
                "./socket": 34,
                backo2: 36,
                "component-bind": 37,
                "component-emitter": 38,
                debug: 39,
                "engine.io-client": 1,
                indexof: 42,
                "socket.io-parser": 47
            }],
            33: [function (e, t, a) {
                t.exports = function (e, t, a) {
                    return e.on(t, a),
                        {
                            destroy: function () {
                                e.removeListener(t, a)
                            }
                        }
                }
            },
            {}],
            34: [function (e, t, a) {
                var n = e("socket.io-parser"),
                    i = e("component-emitter"),
                    s = e("to-array"),
                    o = e("./on"),
                    r = e("component-bind"),
                    c = e("debug")("socket.io-client:socket"),
                    h = e("has-binary");
                t.exports = u;
                var l = {
                    connect: 1,
                    connect_error: 1,
                    connect_timeout: 1,
                    connecting: 1,
                    disconnect: 1,
                    error: 1,
                    reconnect: 1,
                    reconnect_attempt: 1,
                    reconnect_failed: 1,
                    reconnect_error: 1,
                    reconnecting: 1,
                    ping: 1,
                    pong: 1
                },
                    d = i.prototype.emit;
                function u(e, t) {
                    this.io = e,
                        this.nsp = t,
                        this.json = this,
                        this.ids = 0,
                        this.acks = {},
                        this.receiveBuffer = [],
                        this.sendBuffer = [],
                        this.connected = !1,
                        this.disconnected = !0,
                        this.io.autoConnect && this.open()
                }
                i(u.prototype),
                    u.prototype.subEvents = function () {
                        if (!this.subs) {
                            var e = this.io;
                            this.subs = [o(e, "open", r(this, "onopen")), o(e, "packet", r(this, "onpacket")), o(e, "close", r(this, "onclose"))]
                        }
                    },
                    u.prototype.open = u.prototype.connect = function () {
                        return this.connected ? this : (this.subEvents(), this.io.open(), "open" == this.io.readyState && this.onopen(), this.emit("connecting"), this)
                    },
                    u.prototype.send = function () {
                        var e = s(arguments);
                        return e.unshift("message"),
                            this.emit.apply(this, e),
                            this
                    },
                    u.prototype.emit = function (e) {
                        if (l.hasOwnProperty(e)) return d.apply(this, arguments),
                            this;
                        var t = s(arguments),
                            a = n.EVENT;
                        h(t) && (a = n.BINARY_EVENT);
                        var i = {
                            type: a,
                            data: t,
                            options: {}
                        };
                        return i.options.compress = !this.flags || !1 !== this.flags.compress,
                            "function" == typeof t[t.length - 1] && (c("emitting packet with ack id %d", this.ids), this.acks[this.ids] = t.pop(), i.id = this.ids++),
                            this.connected ? this.packet(i) : this.sendBuffer.push(i),
                            delete this.flags,
                            this
                    },
                    u.prototype.packet = function (e) {
                        e.nsp = this.nsp,
                            this.io.packet(e)
                    },
                    u.prototype.onopen = function () {
                        c("transport is open - connecting"),
                            "/" != this.nsp && this.packet({
                                type: n.CONNECT
                            })
                    },
                    u.prototype.onclose = function (e) {
                        c("close (%s)", e),
                            this.connected = !1,
                            this.disconnected = !0,
                            delete this.id,
                            this.emit("disconnect", e)
                    },
                    u.prototype.onpacket = function (e) {
                        if (e.nsp == this.nsp) switch (e.type) {
                            case n.CONNECT:
                                this.onconnect();
                                break;
                            case n.EVENT:
                            case n.BINARY_EVENT:
                                this.onevent(e);
                                break;
                            case n.ACK:
                            case n.BINARY_ACK:
                                this.onack(e);
                                break;
                            case n.DISCONNECT:
                                this.ondisconnect();
                                break;
                            case n.ERROR:
                                this.emit("error", e.data)
                        }
                    },
                    u.prototype.onevent = function (e) {
                        var t = e.data || [];
                        c("emitting event %j", t),
                            null != e.id && (c("attaching ack callback to event"), t.push(this.ack(e.id))),
                            this.connected ? d.apply(this, t) : this.receiveBuffer.push(t)
                    },
                    u.prototype.ack = function (e) {
                        var t = this,
                            a = !1;
                        return function () {
                            if (!a) {
                                a = !0;
                                var i = s(arguments);
                                c("sending ack %j", i);
                                var o = h(i) ? n.BINARY_ACK : n.ACK;
                                t.packet({
                                    type: o,
                                    id: e,
                                    data: i
                                })
                            }
                        }
                    },
                    u.prototype.onack = function (e) {
                        var t = this.acks[e.id];
                        "function" == typeof t ? (c("calling ack %s with %j", e.id, e.data), t.apply(this, e.data), delete this.acks[e.id]) : c("bad ack %s", e.id)
                    },
                    u.prototype.onconnect = function () {
                        this.connected = !0,
                            this.disconnected = !1,
                            this.emit("connect"),
                            this.emitBuffered()
                    },
                    u.prototype.emitBuffered = function () {
                        var e;
                        for (e = 0; e < this.receiveBuffer.length; e++) d.apply(this, this.receiveBuffer[e]);
                        for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++) this.packet(this.sendBuffer[e]);
                        this.sendBuffer = []
                    },
                    u.prototype.ondisconnect = function () {
                        c("server disconnect (%s)", this.nsp),
                            this.destroy(),
                            this.onclose("io server disconnect")
                    },
                    u.prototype.destroy = function () {
                        if (this.subs) {
                            for (var e = 0; e < this.subs.length; e++) this.subs[e].destroy();
                            this.subs = null
                        }
                        this.io.destroy(this)
                    },
                    u.prototype.close = u.prototype.disconnect = function () {
                        return this.connected && (c("performing disconnect (%s)", this.nsp), this.packet({
                            type: n.DISCONNECT
                        })),
                            this.destroy(),
                            this.connected && this.onclose("io client disconnect"),
                            this
                    },
                    u.prototype.compress = function (e) {
                        return this.flags = this.flags || {},
                            this.flags.compress = e,
                            this
                    }
            },
            {
                "./on": 33,
                "component-bind": 37,
                "component-emitter": 38,
                debug: 39,
                "has-binary": 41,
                "socket.io-parser": 47,
                "to-array": 51
            }],
            35: [function (e, t, a) {
                (function (a) {
                    var n = e("parseuri"),
                        i = e("debug")("socket.io-client:url");
                    t.exports = function (e, t) {
                        var s = e,
                            t = t || a.location;
                        null == e && (e = t.protocol + "//" + t.host);
                        "string" == typeof e && ("/" == e.charAt(0) && (e = "/" == e.charAt(1) ? t.protocol + e : t.host + e), /^(https?|wss?):\/\//.test(e) || (i("protocol-less url %s", e), e = void 0 !== t ? t.protocol + "//" + e : "https://" + e), i("parse %s", e), s = n(e));
                        s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443"));
                        s.path = s.path || "/";
                        var o = -1 !== s.host.indexOf(":") ? "[" + s.host + "]" : s.host;
                        return s.id = s.protocol + "://" + o + ":" + s.port,
                            s.href = s.protocol + "://" + o + (t && t.port == s.port ? "" : ":" + s.port),
                            s
                    }
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {
                debug: 39,
                parseuri: 45
            }],
            36: [function (e, t, a) {
                function n(e) {
                    e = e || {},
                        this.ms = e.min || 100,
                        this.max = e.max || 1e4,
                        this.factor = e.factor || 2,
                        this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0,
                        this.attempts = 0
                }
                t.exports = n,
                    n.prototype.duration = function () {
                        var e = this.ms * Math.pow(this.factor, this.attempts++);
                        if (this.jitter) {
                            var t = Math.random(),
                                a = Math.floor(t * this.jitter * e);
                            e = 0 == (1 & Math.floor(10 * t)) ? e - a : e + a
                        }
                        return 0 | Math.min(e, this.max)
                    },
                    n.prototype.reset = function () {
                        this.attempts = 0
                    },
                    n.prototype.setMin = function (e) {
                        this.ms = e
                    },
                    n.prototype.setMax = function (e) {
                        this.max = e
                    },
                    n.prototype.setJitter = function (e) {
                        this.jitter = e
                    }
            },
            {}],
            37: [function (e, t, a) {
                var n = [].slice;
                t.exports = function (e, t) {
                    if ("string" == typeof t && (t = e[t]), "function" != typeof t) throw new Error("bind() requires a function");
                    var a = n.call(arguments, 2);
                    return function () {
                        return t.apply(e, a.concat(n.call(arguments)))
                    }
                }
            },
            {}],
            38: [function (e, t, a) {
                function n(e) {
                    if (e) return function (e) {
                        for (var t in n.prototype) e[t] = n.prototype[t];
                        return e
                    }(e)
                }
                t.exports = n,
                    n.prototype.on = n.prototype.addEventListener = function (e, t) {
                        return this._callbacks = this._callbacks || {},
                            (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t),
                            this
                    },
                    n.prototype.once = function (e, t) {
                        function a() {
                            this.off(e, a),
                                t.apply(this, arguments)
                        }
                        return a.fn = t,
                            this.on(e, a),
                            this
                    },
                    n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (e, t) {
                        if (this._callbacks = this._callbacks || {},
                            0 == arguments.length) return this._callbacks = {},
                                this;
                        var a, n = this._callbacks["$" + e];
                        if (!n) return this;
                        if (1 == arguments.length) return delete this._callbacks["$" + e],
                            this;
                        for (var i = 0; i < n.length; i++) if ((a = n[i]) === t || a.fn === t) {
                            n.splice(i, 1);
                            break
                        }
                        return this
                    },
                    n.prototype.emit = function (e) {
                        this._callbacks = this._callbacks || {};
                        var t = [].slice.call(arguments, 1),
                            a = this._callbacks["$" + e];
                        if (a) for (var n = 0,
                            i = (a = a.slice(0)).length; n < i; ++n) a[n].apply(this, t);
                        return this
                    },
                    n.prototype.listeners = function (e) {
                        return this._callbacks = this._callbacks || {},
                            this._callbacks["$" + e] || []
                    },
                    n.prototype.hasListeners = function (e) {
                        return !!this.listeners(e).length
                    }
            },
            {}],
            39: [function (e, t, a) {
                arguments[4][17][0].apply(a, arguments)
            },
            {
                "./debug": 40,
                dup: 17
            }],
            40: [function (e, t, a) {
                arguments[4][18][0].apply(a, arguments)
            },
            {
                dup: 18,
                ms: 44
            }],
            41: [function (e, t, a) {
                (function (a) {
                    var n = e("isarray");
                    t.exports = function (e) {
                        return function e(t) {
                            if (!t) return !1;
                            if (a.Buffer && a.Buffer.isBuffer && a.Buffer.isBuffer(t) || a.ArrayBuffer && t instanceof ArrayBuffer || a.Blob && t instanceof Blob || a.File && t instanceof File) return !0;
                            if (n(t)) {
                                for (var s = 0; s < t.length; s++) if (e(t[s])) return !0
                            } else if (t && "object" == (void 0 === t ? "undefined" : i(t))) {
                                t.toJSON && "function" == typeof t.toJSON && (t = t.toJSON());
                                for (var o in t) if (Object.prototype.hasOwnProperty.call(t, o) && e(t[o])) return !0
                            }
                            return !1
                        }(e)
                    }
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {
                isarray: 43
            }],
            42: [function (e, t, a) {
                arguments[4][23][0].apply(a, arguments)
            },
            {
                dup: 23
            }],
            43: [function (e, t, a) {
                arguments[4][24][0].apply(a, arguments)
            },
            {
                dup: 24
            }],
            44: [function (e, t, a) {
                arguments[4][25][0].apply(a, arguments)
            },
            {
                dup: 25
            }],
            45: [function (e, t, a) {
                arguments[4][28][0].apply(a, arguments)
            },
            {
                dup: 28
            }],
            46: [function (e, t, a) {
                (function (t) {
                    var n = e("isarray"),
                        s = e("./is-buffer");
                    a.deconstructPacket = function (e) {
                        var t = [],
                            a = e.data;
                        var o = e;
                        return o.data = function e(a) {
                            if (!a) return a;
                            if (s(a)) {
                                var o = {
                                    _placeholder: !0,
                                    num: t.length
                                };
                                return t.push(a),
                                    o
                            }
                            if (n(a)) {
                                for (var r = new Array(a.length), c = 0; c < a.length; c++) r[c] = e(a[c]);
                                return r
                            }
                            if ("object" == (void 0 === a ? "undefined" : i(a)) && !(a instanceof Date)) {
                                r = {};
                                for (var h in a) r[h] = e(a[h]);
                                return r
                            }
                            return a
                        }(a),
                            o.attachments = t.length,
                            {
                                packet: o,
                                buffers: t
                            }
                    },
                        a.reconstructPacket = function (e, t) {
                            return e.data = function e(a) {
                                if (a && a._placeholder) return t[a.num];
                                if (n(a)) {
                                    for (var s = 0; s < a.length; s++) a[s] = e(a[s]);
                                    return a
                                }
                                if (a && "object" == (void 0 === a ? "undefined" : i(a))) {
                                    for (var o in a) a[o] = e(a[o]);
                                    return a
                                }
                                return a
                            }(e.data),
                                e.attachments = void 0,
                                e
                        },
                        a.removeBlobs = function (e, a) {
                            var o = 0,
                                r = e; (function e(c, h, l) {
                                    if (!c) return c;
                                    if (t.Blob && c instanceof Blob || t.File && c instanceof File) {
                                        o++;
                                        var d = new FileReader;
                                        d.onload = function () {
                                            l ? l[h] = this.result : r = this.result,
                                                --o || a(r)
                                        },
                                            d.readAsArrayBuffer(c)
                                    } else if (n(c)) for (var u = 0; u < c.length; u++) e(c[u], u, c);
                                    else if (c && "object" == (void 0 === c ? "undefined" : i(c)) && !s(c)) for (var g in c) e(c[g], g, c)
                                })(r),
                                    o || a(r)
                        }
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {
                "./is-buffer": 48,
                isarray: 43
            }],
            47: [function (e, t, a) {
                var n = e("debug")("socket.io-parser"),
                    i = e("json3"),
                    s = (e("isarray"), e("component-emitter")),
                    o = e("./binary"),
                    r = e("./is-buffer");
                function c() { }
                function h(e) {
                    var t = "",
                        s = !1;
                    return t += e.type,
                        a.BINARY_EVENT != e.type && a.BINARY_ACK != e.type || (t += e.attachments, t += "-"),
                        e.nsp && "/" != e.nsp && (s = !0, t += e.nsp),
                        null != e.id && (s && (t += ",", s = !1), t += e.id),
                        null != e.data && (s && (t += ","), t += i.stringify(e.data)),
                        n("encoded %j as %s", e, t),
                        t
                }
                function l() {
                    this.reconstructor = null
                }
                function d(e) {
                    this.reconPack = e,
                        this.buffers = []
                }
                function u(e) {
                    return {
                        type: a.ERROR,
                        data: "parser error"
                    }
                }
                a.protocol = 4,
                    a.types = ["CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR"],
                    a.CONNECT = 0,
                    a.DISCONNECT = 1,
                    a.EVENT = 2,
                    a.ACK = 3,
                    a.ERROR = 4,
                    a.BINARY_EVENT = 5,
                    a.BINARY_ACK = 6,
                    a.Encoder = c,
                    a.Decoder = l,
                    c.prototype.encode = function (e, t) {
                        (n("encoding packet %j", e), a.BINARY_EVENT == e.type || a.BINARY_ACK == e.type) ?
                        function (e, t) {
                            o.removeBlobs(e,
                                function (e) {
                                    var a = o.deconstructPacket(e),
                                        n = h(a.packet),
                                        i = a.buffers;
                                    i.unshift(n),
                                        t(i)
                                })
                        }(e, t) : t([h(e)])
                    },
                    s(l.prototype),
                    l.prototype.add = function (e) {
                        var t;
                        if ("string" == typeof e) t = function (e) {
                            var t = {},
                                s = 0;
                            if (t.type = Number(e.charAt(0)), null == a.types[t.type]) return u();
                            if (a.BINARY_EVENT == t.type || a.BINARY_ACK == t.type) {
                                for (var o = "";
                                    "-" != e.charAt(++s) && (o += e.charAt(s), s != e.length););
                                if (o != Number(o) || "-" != e.charAt(s)) throw new Error("Illegal attachments");
                                t.attachments = Number(o)
                            }
                            if ("/" == e.charAt(s + 1)) for (t.nsp = ""; ++s;) {
                                var r = e.charAt(s);
                                if ("," == r) break;
                                if (t.nsp += r, s == e.length) break
                            } else t.nsp = "/";
                            var c = e.charAt(s + 1);
                            if ("" !== c && Number(c) == c) {
                                for (t.id = ""; ++s;) {
                                    var r = e.charAt(s);
                                    if (null == r || Number(r) != r) {
                                        --s;
                                        break
                                    }
                                    if (t.id += e.charAt(s), s == e.length) break
                                }
                                t.id = Number(t.id)
                            }
                            if (e.charAt(++s)) try {
                                t.data = i.parse(e.substr(s))
                            } catch (e) {
                                return u()
                            }
                            return n("decoded %s as %j", e, t),
                                t
                        }(e),
                            a.BINARY_EVENT == t.type || a.BINARY_ACK == t.type ? (this.reconstructor = new d(t), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", t)) : this.emit("decoded", t);
                        else {
                            if (!r(e) && !e.base64) throw new Error("Unknown type: " + e);
                            if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet"); (t = this.reconstructor.takeBinaryData(e)) && (this.reconstructor = null, this.emit("decoded", t))
                        }
                    },
                    l.prototype.destroy = function () {
                        this.reconstructor && this.reconstructor.finishedReconstruction()
                    },
                    d.prototype.takeBinaryData = function (e) {
                        if (this.buffers.push(e), this.buffers.length == this.reconPack.attachments) {
                            var t = o.reconstructPacket(this.reconPack, this.buffers);
                            return this.finishedReconstruction(),
                                t
                        }
                        return null
                    },
                    d.prototype.finishedReconstruction = function () {
                        this.reconPack = null,
                            this.buffers = []
                    }
            },
            {
                "./binary": 46,
                "./is-buffer": 48,
                "component-emitter": 49,
                debug: 39,
                isarray: 43,
                json3: 50
            }],
            48: [function (e, t, a) {
                (function (e) {
                    t.exports = function (t) {
                        return e.Buffer && e.Buffer.isBuffer(t) || e.ArrayBuffer && t instanceof ArrayBuffer
                    }
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {}],
            49: [function (e, t, a) {
                arguments[4][15][0].apply(a, arguments)
            },
            {
                dup: 15
            }],
            50: [function (e, t, a) {
                (function (e) {
                    (function () {
                        var n = {
                            function: !0,
                            object: !0
                        },
                            s = n[void 0 === a ? "undefined" : i(a)] && a && !a.nodeType && a,
                            o = n["undefined" == typeof window ? "undefined" : i(window)] && window || this,
                            r = s && n[void 0 === t ? "undefined" : i(t)] && t && !t.nodeType && "object" == (void 0 === e ? "undefined" : i(e)) && e;
                        function c(e, t) {
                            e || (e = o.Object()),
                                t || (t = o.Object());
                            var a = e.Number || o.Number,
                                s = e.String || o.String,
                                r = e.Object || o.Object,
                                h = e.Date || o.Date,
                                l = e.SyntaxError || o.SyntaxError,
                                d = e.TypeError || o.TypeError,
                                u = e.Math || o.Math,
                                g = e.JSON || o.JSON;
                            "object" == (void 0 === g ? "undefined" : i(g)) && g && (t.stringify = g.stringify, t.parse = g.parse);
                            var v, f, p, m = r.prototype,
                                _ = m.toString,
                                y = new h(- 0xc782b5b800cec);
                            try {
                                y = -109252 == y.getUTCFullYear() && 0 === y.getUTCMonth() && 1 === y.getUTCDate() && 10 == y.getUTCHours() && 37 == y.getUTCMinutes() && 6 == y.getUTCSeconds() && 708 == y.getUTCMilliseconds()
                            } catch (e) { }
                            function C(e) {
                                if (C[e] !== p) return C[e];
                                var n;
                                if ("bug-string-char-index" == e) n = "a" != "a"[0];
                                else if ("json" == e) n = C("json-stringify") && C("json-parse");
                                else {
                                    var i, o = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                                    if ("json-stringify" == e) {
                                        var r = t.stringify,
                                            c = "function" == typeof r && y;
                                        if (c) {
                                            (i = function () {
                                                return 1
                                            }).toJSON = i;
                                            try {
                                                c = "0" === r(0) && "0" === r(new a) && '""' == r(new s) && r(_) === p && r(p) === p && r() === p && "1" === r(i) && "[1]" == r([i]) && "[null]" == r([p]) && "null" == r(null) && "[null,null,null]" == r([p, _, null]) && r({
                                                    a: [i, !0, !1, null, "\0\b\n\f\r\t"]
                                                }) == o && "1" === r(null, i) && "[\n 1,\n 2\n]" == r([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == r(new h(- 864e13)) && '"+275760-09-13T00:00:00.000Z"' == r(new h(864e13)) && '"-000001-01-01T00:00:00.000Z"' == r(new h(- 621987552e5)) && '"1969-12-31T23:59:59.999Z"' == r(new h(- 1))
                                            } catch (e) {
                                                c = !1
                                            }
                                        }
                                        n = c
                                    }
                                    if ("json-parse" == e) {
                                        var l = t.parse;
                                        if ("function" == typeof l) try {
                                            if (0 === l("0") && !l(!1)) {
                                                var d = 5 == (i = l(o)).a.length && 1 === i.a[0];
                                                if (d) {
                                                    try {
                                                        d = !l('"\t"')
                                                    } catch (e) { }
                                                    if (d) try {
                                                        d = 1 !== l("01")
                                                    } catch (e) { }
                                                    if (d) try {
                                                        d = 1 !== l("1.")
                                                    } catch (e) { }
                                                }
                                            }
                                        } catch (e) {
                                            d = !1
                                        }
                                        n = d
                                    }
                                }
                                return C[e] = !!n
                            }
                            if (!C("json")) {
                                var N = "[object Function]",
                                    b = "[object Number]",
                                    w = "[object String]",
                                    S = "[object Array]",
                                    M = C("bug-string-char-index");
                                if (!y) var I = u.floor,
                                    B = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                                    x = function (e, t) {
                                        return B[t] + 365 * (e - 1970) + I((e - 1969 + (t = +(t > 1))) / 4) - I((e - 1901 + t) / 100) + I((e - 1601 + t) / 400)
                                    };
                                if ((v = m.hasOwnProperty) || (v = function (e) {
                                    var t, a = {};
                                    return (a.__proto__ = null, a.__proto__ = {
                                        toString: 1
                                    },
                                        a).toString != _ ? v = function (e) {
                                            var t = this.__proto__,
                                                a = e in (this.__proto__ = null, this);
                                            return this.__proto__ = t,
                                                a
                                        } : (t = a.constructor, v = function (e) {
                                            var a = (this.constructor || t).prototype;
                                            return e in this && !(e in a && this[e] === a[e])
                                        }),
                                        a = null,
                                        v.call(this, e)
                                }), f = function (e, t) {
                                    var a, s, o, r = 0; (a = function () {
                                        this.valueOf = 0
                                    }).prototype.valueOf = 0,
                                        s = new a;
                                    for (o in s) v.call(s, o) && r++;
                                    return a = s = null,
                                        r ? f = 2 == r ?
                                            function (e, t) {
                                                var a, n = {},
                                                    i = _.call(e) == N;
                                                for (a in e) i && "prototype" == a || v.call(n, a) || !(n[a] = 1) || !v.call(e, a) || t(a)
                                            } : function (e, t) {
                                                var a, n, i = _.call(e) == N;
                                                for (a in e) i && "prototype" == a || !v.call(e, a) || (n = "constructor" === a) || t(a); (n || v.call(e, a = "constructor")) && t(a)
                                            } : (s = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], f = function (e, t) {
                                                var a, o, r = _.call(e) == N,
                                                    c = !r && "function" != typeof e.constructor && n[i(e.hasOwnProperty)] && e.hasOwnProperty || v;
                                                for (a in e) r && "prototype" == a || !c.call(e, a) || t(a);
                                                for (o = s.length; a = s[--o]; c.call(e, a) && t(a));
                                            }),
                                        f(e, t)
                                },
                                    !C("json-stringify")) {
                                    var T = {
                                        92: "\\\\",
                                        34: '\\"',
                                        8: "\\b",
                                        12: "\\f",
                                        10: "\\n",
                                        13: "\\r",
                                        9: "\\t"
                                    },
                                        A = function (e, t) {
                                            return ("000000" + (t || 0)).slice(- e)
                                        },
                                        R = function (e) {
                                            for (var t = '"',
                                                a = 0,
                                                n = e.length,
                                                i = !M || n > 10,
                                                s = i && (M ? e.split("") : e); a < n; a++) {
                                                var o = e.charCodeAt(a);
                                                switch (o) {
                                                    case 8:
                                                    case 9:
                                                    case 10:
                                                    case 12:
                                                    case 13:
                                                    case 34:
                                                    case 92:
                                                        t += T[o];
                                                        break;
                                                    default:
                                                        if (o < 32) {
                                                            t += "\\u00" + A(2, o.toString(16));
                                                            break
                                                        }
                                                        t += i ? s[a] : e.charAt(a)
                                                }
                                            }
                                            return t + '"'
                                        };
                                    t.stringify = function (e, t, a) {
                                        var s, o, r, c;
                                        if (n[void 0 === t ? "undefined" : i(t)] && t) if ((c = _.call(t)) == N) o = t;
                                        else if (c == S) {
                                            r = {};
                                            for (var h, l = 0,
                                                u = t.length; l < u; h = t[l++], ((c = _.call(h)) == w || c == b) && (r[h] = 1));
                                        }
                                        if (a) if ((c = _.call(a)) == b) {
                                            if ((a -= a % 1) > 0) for (s = "", a > 10 && (a = 10); s.length < a; s += " ");
                                        } else c == w && (s = a.length <= 10 ? a : a.slice(0, 10));
                                        return function e(t, a, n, s, o, r, c) {
                                            var h, l, u, g, m, y, C, N, M, B, T, P, k, L, E, D;
                                            try {
                                                h = a[t]
                                            } catch (e) { }
                                            if ("object" == (void 0 === h ? "undefined" : i(h)) && h) if ("[object Date]" != (l = _.call(h)) || v.call(h, "toJSON")) "function" == typeof h.toJSON && (l != b && l != w && l != S || v.call(h, "toJSON")) && (h = h.toJSON(t));
                                            else if (h > -1 / 0 && h < 1 / 0) {
                                                if (x) {
                                                    for (m = I(h / 864e5), u = I(m / 365.2425) + 1970 - 1; x(u + 1, 0) <= m; u++);
                                                    for (g = I((m - x(u, 0)) / 30.42); x(u, g + 1) <= m; g++);
                                                    m = 1 + m - x(u, g),
                                                        C = I((y = (h % 864e5 + 864e5) % 864e5) / 36e5) % 24,
                                                        N = I(y / 6e4) % 60,
                                                        M = I(y / 1e3) % 60,
                                                        B = y % 1e3
                                                } else u = h.getUTCFullYear(),
                                                    g = h.getUTCMonth(),
                                                    m = h.getUTCDate(),
                                                    C = h.getUTCHours(),
                                                    N = h.getUTCMinutes(),
                                                    M = h.getUTCSeconds(),
                                                    B = h.getUTCMilliseconds();
                                                h = (u <= 0 || u >= 1e4 ? (u < 0 ? "-" : "+") + A(6, u < 0 ? -u : u) : A(4, u)) + "-" + A(2, g + 1) + "-" + A(2, m) + "T" + A(2, C) + ":" + A(2, N) + ":" + A(2, M) + "." + A(3, B) + "Z"
                                            } else h = null;
                                            if (n && (h = n.call(a, t, h)), null === h) return "null";
                                            if ("[object Boolean]" == (l = _.call(h))) return "" + h;
                                            if (l == b) return h > -1 / 0 && h < 1 / 0 ? "" + h : "null";
                                            if (l == w) return R("" + h);
                                            if ("object" == (void 0 === h ? "undefined" : i(h))) {
                                                for (L = c.length; L--;) if (c[L] === h) throw d();
                                                if (c.push(h), T = [], E = r, r += o, l == S) {
                                                    for (k = 0, L = h.length; k < L; k++) P = e(k, h, n, s, o, r, c),
                                                        T.push(P === p ? "null" : P);
                                                    D = T.length ? o ? "[\n" + r + T.join(",\n" + r) + "\n" + E + "]" : "[" + T.join(",") + "]" : "[]"
                                                } else f(s || h,
                                                    function (t) {
                                                        var a = e(t, h, n, s, o, r, c);
                                                        a !== p && T.push(R(t) + ":" + (o ? " " : "") + a)
                                                    }),
                                                    D = T.length ? o ? "{\n" + r + T.join(",\n" + r) + "\n" + E + "}" : "{" + T.join(",") + "}" : "{}";
                                                return c.pop(),
                                                    D
                                            }
                                        }("", ((h = {})[""] = e, h), o, r, s, "", [])
                                    }
                                }
                                if (!C("json-parse")) {
                                    var P, k, L = s.fromCharCode,
                                        E = {
                                            92: "\\",
                                            34: '"',
                                            47: "/",
                                            98: "\b",
                                            116: "\t",
                                            110: "\n",
                                            102: "\f",
                                            114: "\r"
                                        },
                                        D = function () {
                                            throw P = k = null,
                                            l()
                                        },
                                        O = function () {
                                            for (var e, t, a, n, i, s = k,
                                                o = s.length; P < o;) switch (i = s.charCodeAt(P)) {
                                                    case 9:
                                                    case 10:
                                                    case 13:
                                                    case 32:
                                                        P++;
                                                        break;
                                                    case 123:
                                                    case 125:
                                                    case 91:
                                                    case 93:
                                                    case 58:
                                                    case 44:
                                                        return e = M ? s.charAt(P) : s[P],
                                                            P++ ,
                                                            e;
                                                    case 34:
                                                        for (e = "@", P++; P < o;) if ((i = s.charCodeAt(P)) < 32) D();
                                                        else if (92 == i) switch (i = s.charCodeAt(++P)) {
                                                            case 92:
                                                            case 34:
                                                            case 47:
                                                            case 98:
                                                            case 116:
                                                            case 110:
                                                            case 102:
                                                            case 114:
                                                                e += E[i],
                                                                    P++;
                                                                break;
                                                            case 117:
                                                                for (t = ++P, a = P + 4; P < a; P++)(i = s.charCodeAt(P)) >= 48 && i <= 57 || i >= 97 && i <= 102 || i >= 65 && i <= 70 || D();
                                                                e += L("0x" + s.slice(t, P));
                                                                break;
                                                            default:
                                                                D()
                                                        } else {
                                                            if (34 == i) break;
                                                            for (i = s.charCodeAt(P), t = P; i >= 32 && 92 != i && 34 != i;) i = s.charCodeAt(++P);
                                                            e += s.slice(t, P)
                                                        }
                                                        if (34 == s.charCodeAt(P)) return P++ ,
                                                            e;
                                                        D();
                                                    default:
                                                        if (t = P, 45 == i && (n = !0, i = s.charCodeAt(++P)), i >= 48 && i <= 57) {
                                                            for (48 == i && ((i = s.charCodeAt(P + 1)) >= 48 && i <= 57) && D(), n = !1; P < o && ((i = s.charCodeAt(P)) >= 48 && i <= 57); P++);
                                                            if (46 == s.charCodeAt(P)) {
                                                                for (a = ++P; a < o && ((i = s.charCodeAt(a)) >= 48 && i <= 57); a++);
                                                                a == P && D(),
                                                                    P = a
                                                            }
                                                            if (101 == (i = s.charCodeAt(P)) || 69 == i) {
                                                                for (43 != (i = s.charCodeAt(++P)) && 45 != i || P++ , a = P; a < o && ((i = s.charCodeAt(a)) >= 48 && i <= 57); a++);
                                                                a == P && D(),
                                                                    P = a
                                                            }
                                                            return + s.slice(t, P)
                                                        }
                                                        if (n && D(), "true" == s.slice(P, P + 4)) return P += 4,
                                                            !0;
                                                        if ("false" == s.slice(P, P + 5)) return P += 5,
                                                            !1;
                                                        if ("null" == s.slice(P, P + 4)) return P += 4,
                                                            null;
                                                        D()
                                                }
                                            return "$"
                                        },
                                        H = function (e, t, a) {
                                            var n = G(e, t, a);
                                            n === p ? delete e[t] : e[t] = n
                                        },
                                        G = function (e, t, a) {
                                            var n, s = e[t];
                                            if ("object" == (void 0 === s ? "undefined" : i(s)) && s) if (_.call(s) == S) for (n = s.length; n--;) H(s, n, a);
                                            else f(s,
                                                function (e) {
                                                    H(s, e, a)
                                                });
                                            return a.call(e, t, s)
                                        };
                                    t.parse = function (e, t) {
                                        var a, n;
                                        return P = 0,
                                            k = "" + e,
                                            a = function e(t) {
                                                var a, n;
                                                if ("$" == t && D(), "string" == typeof t) {
                                                    if ("@" == (M ? t.charAt(0) : t[0])) return t.slice(1);
                                                    if ("[" == t) {
                                                        for (a = [];
                                                            "]" != (t = O()); n || (n = !0)) n && ("," == t ? "]" == (t = O()) && D() : D()),
                                                                "," == t && D(),
                                                                a.push(e(t));
                                                        return a
                                                    }
                                                    if ("{" == t) {
                                                        for (a = {};
                                                            "}" != (t = O()); n || (n = !0)) n && ("," == t ? "}" == (t = O()) && D() : D()),
                                                                "," != t && "string" == typeof t && "@" == (M ? t.charAt(0) : t[0]) && ":" == O() || D(),
                                                                a[t.slice(1)] = e(O());
                                                        return a
                                                    }
                                                    D()
                                                }
                                                return t
                                            }(O()),
                                            "$" != O() && D(),
                                            P = k = null,
                                            t && _.call(t) == N ? G(((n = {})[""] = a, n), "", t) : a
                                    }
                                }
                            }
                            return t.runInContext = c,
                                t
                        }
                        if (!r || r.global !== r && r.window !== r && r.self !== r || (o = r), s) c(o, s);
                        else {
                            var h = o.JSON,
                                l = o.JSON3,
                                d = !1,
                                u = c(o, o.JSON3 = {
                                    noConflict: function () {
                                        return d || (d = !0, o.JSON = h, o.JSON3 = l, h = l = null),
                                            u
                                    }
                                });
                            o.JSON = {
                                parse: u.parse,
                                stringify: u.stringify
                            }
                        }
                    }).call(this)
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {})
            },
            {}],
            51: [function (e, t, a) {
                t.exports = function (e, t) {
                    for (var a = [], n = (t = t || 0) || 0; n < e.length; n++) a[n - t] = e[n];
                    return a
                }
            },
            {}]
        },
            {},
            [31])(31)
    });
//         cc._RF.pop()
     }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
// },
// {}], 