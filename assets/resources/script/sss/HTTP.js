var n = ["http://192.168.8.189"];  //,"http://www.8dyl.cn:81"
var i = 0,
    s = cc.Class({
        extends: cc.Component,
        statics: {
            sessionId: 0,
            userId: 0,
            login_url: n[0],
            hall_url: n[0],
            timeouttimer: null,
            setLoginIP: function () {
                cc.log('网络连接setLoginIP.....');
                var e = 0; (null == cc.ss.LOGIN_IP_IDX || cc.ss.LOGIN_IP_IDX < 0 || cc.ss.LOGIN_IP_IDX >= n.length) && (cc.ss.LOGIN_IP_IDX = 0);
                var t = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var o, r = n[Symbol.iterator](); !(t = (o = r.next()).done); t = !0) {
                        var c = o.value;
                        if (cc.ss.LOGIN_IP_IDX == e) return s.login_url = c,
                            console.log("setLoginIP: url=" + s.login_url),
                            void cc.sys.localStorage.setItem("LOGIN_IP_IDX", cc.ss.LOGIN_IP_IDX);
                        e++
                    }
                } catch (e) {
                    a = !0,
                        i = e
                } finally {
                    try {
                    !t && r.
                        return && r.
                            return()
                    } finally {
                        if (a) throw i
                    }
                }
            },
            // setHallIP: function () {
            //     if (cc.ss.SI.hall) {
            //         var e = 0; (null == cc.ss.HALL_IP_IDX || cc.ss.HALL_IP_IDX < 0 || cc.ss.HALL_IP_IDX >= cc.ss.SI.hall.length) && (cc.ss.HALL_IP_IDX = 0);
            //         var t = !0,
            //             a = !1,
            //             n = void 0;
            //         try {
            //             for (var i, o = cc.ss.SI.hall[Symbol.iterator](); !(t = (i = o.next()).done); t = !0) {
            //                 var r = i.value;
            //                 if (null != cc.ss.HALL_IP_IDX && cc.ss.HALL_IP_IDX == e) return s.hall_url = cc.ss.protocol + r.ip + ":" + r.port,
            //                     console.log("setHallIP: url=" + s.hall_url),
            //                     void cc.sys.localStorage.setItem("HALL_IP_IDX", cc.ss.HALL_IP_IDX);
            //                 e++
            //             }
            //         } catch (e) {
            //             a = !0,
            //                 n = e
            //         } finally {
            //             try {
            //             !t && o.
            //                 return && o.
            //                     return()
            //             } finally {
            //                 if (a) throw n
            //             }
            //         }
            //     }
            // },
            sendLoginReq: function (e, t, a) {
                return i = 3,
                    n && n.length > 1 && (i = 3 * n.length),
                    s.sendRequest(e, t, a, s.login_url)//路径|账号|回调|本地连接
            },
            sendLogReq: function (e, t) {
                return i = 1,
                    s.sendRequest(e, t, null, s.login_url)
            },
            sendHallReq: function (e, t, a) {
                return i = 3,
                   // cc.ss.SI.hall && cc.ss.SI.hall.length > 1 && (i = 3 * cc.ss.SI.hall.length),
                    s.sendRequest(e, t, a, s.hall_url)
            },
            sendRequest: function (e, t, a, o) {
                var r = cc.loader.getXMLHttpRequest();
                r.timeout = 5e3;
                var c = "?";
                for (var h in t) "?" != c && (c += "&"),
                    c += h + "=" + t[h];
                null == o && (o = s.login_url);
                var l = o + e + encodeURI(c),
                    d = false;
                    cc.log(l);
                return s.timeouttimer && clearTimeout(s.timeouttimer),
                    s.timeouttimer = setTimeout(function () {
                        if (d = !0, r.abort(), i && i > 0) {//cc.ss.wc.hide(),
                            i -= 1;
                            var c = o;
                            o == s.hall_url && null != cc.ss.HALL_IP_IDX && cc.ss.SI.hall ? 
                            (cc.ss.HALL_IP_IDX >= cc.ss.SI.hall.length - 1 ? cc.ss.HALL_IP_IDX = 0 : 
                                cc.ss.HALL_IP_IDX = cc.ss.HALL_IP_IDX + 1, s.setHallIP(), c = s.hall_url) :
                                 o == s.login_url && null != cc.ss.LOGIN_IP_IDX && n &&
                                 (cc.ss.LOGIN_IP_IDX >= n.length - 1 ? cc.ss.LOGIN_IP_IDX = 0 : cc.ss.LOGIN_IP_IDX = cc.ss.LOGIN_IP_IDX + 1, 
                                 s.setLoginIP(), c = s.login_url),
                                s.sendRequest(e, t, a, c)
                        }
                    },r.timeout),
                    r.open("GET", l, true),
                 //  r.setRequestHeader("protocol", window.location.protocol),
                //    r.setRequestHeader("channel", cc.ss.CHANNEL),
                    r.onreadystatechange = function () {
                        if (4 === r.readyState && r.status >= 200 && r.status < 300) {
                            if (d) return;
                            s.timeouttimer && clearTimeout(s.timeouttimer);
                            try {
                                var e = JSON.parse(r.responseText);//返回结果直接转换对象
                                null !== a && a(e)
                            } catch (e) { }
                        }
                    },
                    r.send(),
                    r
            }
        }
    });