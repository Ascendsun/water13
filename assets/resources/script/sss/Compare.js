// Compare: [function(e, t, a) {
//     "use strict";
//     cc._RF.push(t, "273c1I6VVFPg63gmysKDdIF", "Compare");
    "function" == typeof Symbol && Symbol.iterator;
    var n = require("sssUtils").PaiType,
    i = {
        Index: -1,
        b_obtainType: !1
    },
    s = function(e, t) {
        var a = e.length;
        if (parseInt(a) < 0) return ! 1;
        for (var n = 0,
        i = 0; i < a; i++) e[i].value == t.value && n++;
        return parseInt(n) > 1
    },
    o = function(e, t) {
        if (e) for (var a = 0; a < e.length; a++) if (e[a].value == t) return ! 0;
        return ! 1
    };
    i.getTypePai = function(e, t, a) {
        var s = [];
        switch (t) {
        case n.YD:
            return s = i.getDuiZi(e, a);
        case n.ED:
            return s = i.getLiangDui(e, a);
        case n.ST:
            return s = i.getSanTiao(e, a);
        case n.SZ:
            return s = i.getShunZi(e, a, !1);
        case n.TH:
            return s = i.getTongHua(e, a);
        case n.HL:
            return s = i.getHuLu(e, a);
        case n.TZ:
            return s = i.getTieZhi(e, a);
        case n.THS:
            return s = i.getTongHuaShun(e, a);
        case n.WT:
            return s = i.getWuTong(e, a);
        default:
            return s
        }
    },
    i.getDuiZi = function(e, t) {
        for (var a = [], n = [], s = [], o = 0; o < e.length; o++) 0 == e[o].type ? n.push(e[o]) : s.push(e[o]);
        if (i.b_obtainType) {
            i.b_obtainType = !1;
            var c; (c = i.DZdeleteType(e)) && a.push(c)
        }
        var h = 0;
        if (n.length > 0) {
            var l = [];
            if (l.push(n[0]), n.length > 1) for (var d = n[0].value, u = 0; u < n.length; u++) if (n[u].value != d) {
                l.push(n[u]);
                break
            }
            for (var g = r(s).arrTongPai, v = 0; v < g.length; v++) { (y = []).push(g[v][0]),
                y.push(g[v][1]),
                a.push(y),
                h++
            }
            for (var f = 0; f < l.length; f++) for (var p = 0; p < s.length; p++) { (y = []).push(l[f]),
                y.push(s[p]),
                a.push(y),
                h++
            }
        } else for (var m = r(e).arrTongPai, _ = 0; _ < m.length; _++) {
            var y; (y = []).push(m[_][0]),
            y.push(m[_][1]),
            a.push(y),
            h++
        }
        return t ? i.Index++:i.Index = 0,
        0 == h && (h = 1),
        a[i.Index % h]
    },
    i.DZdeleteType = function(e) {
        for (var t = 10; t > 3; t--) for (var a = i.getTypePai(e, t, !1), n = i.getTypePai(e, t, !0), s = 0; s < 2; s++) {
            if (0 === s) var o = a;
            else if (1 === s) o = n;
            if (o) {
                for (var c = [], h = 0; h < e.length; h++) {
                    for (var l = !1,
                    d = 0; d < o.length; d++) if (e[h] === o[d]) {
                        delete o[d],
                        l = !0;
                        break
                    }
                    l || c.push(e[h])
                }
                if (!c) return null;
                var u = r(c).arrTongPai;
                if (u.length > 0) {
                    var g = [];
                    return g.push(u[0][0]),
                    g.push(u[0][1]),
                    g
                }
            }
        }
        return null
    },
    i.getSanPai = function(e) {
        for (var t = [], a = r(e).sanPai, n = 0; n < a.length; n++) t.push(a[n]);
        return t
    },
    i.getLiangDui = function(e, t) {
        for (var a = [], n = 0, o = 0, c = 0; c < e.length; c++) 16 == e[c].value && n++,
        15 == e[c].value && o++;
        var h = r(e),
        l = h.arrTongPai,
        d = h.sanPai,
        u = 0;
        if (l.length < 2) return null;
        for (var g = 0; g < l.length; g++) {
            var v = l[g].length - 1,
            f = [];
            if (0 != l[g][v].type) {
                for (; 0 == l[g][v].type && 0 != v;) {
                    v--;
                    break
                }
                f.push(l[g][v]),
                v > 0 ? f.push(l[g][v - 1]) : f.push(l[g][v + 1]);
                for (var p = g + 1; p < l.length; p++) {
                    for (var m = l[p].length - 1; 0 == l[p][m].type && 0 != m;) {
                        m--;
                        break
                    }
                    var _ = [];
                    if (_.push(f[0]), _.push(f[1]), f[0].value != l[p][m].value && (_.push(l[p][m]), m > 0 ? _.push(l[p][m - 1]) : _.push(l[p][m + 1]), _[0].value != _[2].value && _[1].value != _[3].value)) {
                        for (var y = 0,
                        C = 0,
                        N = 0; N < 4; N++) 16 == _[N].value && C++,
                        15 == _[N].value && y++;
                        if (! (C > n || y > o)) if (d.length > 0) for (var b = d.length - 1; b >= 0; b--) {
                            _.push(d[b]),
                            a.push(_),
                            u++;
                            break
                        } else for (var w = e.length - 1; w >= 0; w--) {
                            for (var S = !0,
                            M = 0; M < 4; M++) _[M].value == e[w].value && (S = !1);
                            if (S) {
                                _.push(e[w]),
                                a.push(_),
                                u++;
                                break
                            }
                        }
                    }
                }
            }
        }
        var I = [],
        B = 0;
        if (a.length > 1) {
            for (var x = 0; x < a.length - 1; x++) {
                var T = !1,
                A = a[x];
                if (1 != s(e, A[4])) {
                    if (0 == T) {
                        I = a[B = x].concat();
                        break
                    }
                } else T = !0
            }
            if (parseInt(B) > 0) {
                var R = [];
                if (R = a[0].concat(), I.length > 0) a[0] = [],
                a[0] = I.concat(),
                a[B] = [],
                a[B] = R.concat();
                else {
                    var P = a.length - 1,
                    k = a[P].concat();
                    a[0] = [],
                    a[0] = k.concat(),
                    a[P] = [],
                    a[P] = R.concat()
                }
            }
        }
        return 0 == u && (u = 1),
        t ? i.Index++:i.Index = 0,
        a[i.Index % u]
    },
    i.getSanTiao = function(e, t) {
        var a = [];
        if (i.b_obtainType) {
            i.b_obtainType = !1;
            var n; (n = i.STdeleteType(e)) && (a.push(n), o++)
        }
        for (var s = r(e).arrTongPai, o = 0, c = 0; c < s.length; c++) {
            var h = [];
            if (3 === s[c].length) h.push(s[c][0]),
            h.push(s[c][1]),
            h.push(s[c][2]),
            a.push(h),
            o++;
            else if (4 == s[c].length) h.push(s[c][0]),
            h.push(s[c][1]),
            h.push(s[c][2]),
            a.push(h),
            o++;
            else if (5 == s[c].length) {
                var l = i.getTongHua(e, !1);
                if (h.push(s[c][0]), h.push(s[c][1]), h.push(s[c][2]), l) for (var d = 0; d < l.length; d++) for (var u = 0; u < h.length; u++) l[d] === h[u] && (h[u] = s[c][3])
            }
        }
        return t ? i.Index++:i.Index = 0,
        a[i.Index % o]
    },
    i.STdeleteType = function(e) {
        for (var t = 10; t > 4; t--) for (var a = i.getTypePai(e, t, !1), n = i.getTypePai(e, t, !0), s = 0; s < 2; s++) {
            if (0 === s) var o = a;
            else if (1 === s) o = n;
            if (o) {
                for (var c = [], h = 0; h < e.length; h++) {
                    for (var l = !1,
                    d = 0; d < o.length; d++) if (e[h] === o[d]) {
                        delete o[d],
                        l = !0;
                        break
                    }
                    l || c.push(e[h])
                }
                if (!c) return null;
                var u = r(c).arrTongPai;
                for (h = 0; h < u.length; h++) {
                    var g = [];
                    if (3 === u[h].length) return g.push(u[h][0]),
                    g.push(u[h][1]),
                    g.push(u[h][2]),
                    g;
                    if (u[h].length > 3) {
                        var v = i.getTongHua(e, !1);
                        if (g.push(u[h][0]), g.push(u[h][1]), g.push(u[h][2]), v) for (s = 0; s < v.length; s++) for (var f = 0; f < g.length; f++) v[s] === g[f] && (g[f] = u[h][3]);
                        return g
                    }
                }
            }
        }
        return null
    },
    i.isSanShunZi = function(e, t) {
        if (e.sort(function(e, t) {
            return t.value - e.value
        }), 13 !== e.length) return ! 1;
        var a, n = function(e, t) {
            for (var a = t.length,
            n = 0; n < a; ++n) for (var i = e.length,
            s = 0; s < i; ++s) if (t[n].type === e[s].type && t[n].value === e[s].value) {
                e.splice(s, 1);
                break
            }
            return e
        },
        i = function(e) {
            for (var t = [], a = [], n = [], i = 0, s = 0, o = 0; o < e.length; o++) 0 == e[o].type ? (a.push(e[o]), 16 == e[o].value ? i++:s++) : n.push(e[o]);
            if (a.length > 0) {
                n.sort(function(e, t) {
                    return t.value - e.value
                });
                for (var r = a.length,
                c = n.length - 1,
                h = 0; h < c; h++) {
                    var l = [];
                    l.push(n[h]);
                    for (var d = 0,
                    u = h + 1; u <= c; u++) {
                        var g = l.length;
                        if (5 == l.length) {
                            t.push(l);
                            break
                        }
                        var v = l[g - 1].value;
                        if (0 != Math.abs(v - n[u].value)) {
                            var f = Math.abs(v - n[u].value);
                            if (1 == f) l.push(n[u]);
                            else {
                                var p = f - 1;
                                if (p > r - d) break;
                                for (var m = 0,
                                _ = 0; _ < p && d <= r;) {
                                    if (5 == l.length) {
                                        t.push(l),
                                        m = 1;
                                        break
                                    }
                                    l.push(a[d]),
                                    d++,
                                    _++
                                }
                                if (1 == m) break;
                                if (5 == l.length) {
                                    t.push(l);
                                    break
                                }
                                l.push(n[u])
                            }
                        }
                    }
                    if (l[0].value <= 5) {
                        for (var y = 0,
                        C = 0,
                        N = 0; N < l.length; N++) l[N].type > 0 ? y++:C++;
                        if (y + a.length >= 5) {
                            for (var b = C; b + l.length < 5; b++) l.push(a[b]);
                            t.push(l)
                        }
                        if (y + a.length == 4) for (var w = 0; w < n.length; w++) if (14 == n[w].value) {
                            l.push(n[w]);
                            for (var S = C; S + l.length < 5; S++) l.push(a[S]);
                            t.push(l)
                        }
                    }
                    if (4 == l.length) {
                        for (var M = 0,
                        I = 0,
                        B = 0; B < 4; B++) 16 == l[B].value && I++,
                        15 == l[B].value && M++;
                        if (I < i) {
                            l.push({
                                type: 0,
                                value: 16
                            }),
                            t.push(l)
                        }
                        if (M < s) {
                            l.push({
                                type: 0,
                                value: 15
                            }),
                            t.push(l)
                        }
                    }
                }
            } else for (var x = 0; x < e.length; x++) {
                var T = [];
                T.push(e[x]);
                for (var A = x; A < e.length; A++) {
                    if (1 === Math.abs(e[A].value - T[T.length - 1].value)) {
                        if (T.push(e[A]), 5 === T[0].value && 4 === T.length) for (var R = 0; R < e.length; R++) if (14 == e[R].value) {
                            T.push(e[R]);
                            break
                        }
                        if (T.length >= 5) {
                            if (t[0] && 5 === T[0].value && 14 === T[4].value && 14 === t[0][0].value) {
                                var P = t[1];
                                t[1] = T,
                                t.push(P);
                                break
                            }
                            if (t[0] && 5 === T[0].value && 14 === T[4].value) {
                                P = t[0];
                                t[0] = T,
                                t.push(P);
                                break
                            }
                            t.push(T);
                            break
                        }
                    }
                    if (e[A].value - T[T.length - 1].value > 1) {
                        T = [];
                        break
                    }
                }
            }
            return t
        },
        s = function(e) {
            for (var t = [], a = [], n = 0; n < e.length; n++) 0 == e[n].type ? t.push(e[n]) : a.push(e[n]);
            return t.length > 1 || (1 == t.length && 2 == a.length && (2 == Math.abs(a[0].value - a[1].value) || 1 == Math.abs(a[0].value - a[1].value)) || 3 == a.length && 1 == Math.abs(a[0].value - a[1].value) && 1 == Math.abs(a[1].value - a[2].value))
        },
        o = [],
        r = i(a = e.concat());
        if (! (r.length > 0)) return ! 1;
        for (var c = 0; c < r.length; c++) {
            var h = r[c],
            l = n(a, h),
            d = i(l);
            if (! (d.length > 0)) return ! 1;
            for (var u = 0; u < d.length; u++) {
                var g = d[u],
                v = n(l, g);
                if (1 == s(v)) return o.push(v),
                o.push(g),
                o.push(h),
                o,
                !0
            }
        }
    },
    i.getSanQing = function(e) {
        e.sort(function(e, t) {
            return t.type - e.type
        });
        var t = e.length;
        if (13 !== t) return ! 1;
        for (var a = [], n = [], i = [], s = [], o = [], r = [], c = 0; c < t; c++) 0 == e[c].type && n.push(e[c]),
        1 == e[c].type && i.push(e[c]),
        2 == e[c].type && s.push(e[c]),
        3 == e[c].type && o.push(e[c]),
        4 == e[c].type && r.push(e[c]);
        var h = [];
        i.length > 0 && h.push(i),
        s.length > 0 && h.push(s),
        o.length > 0 && h.push(o),
        r.length > 0 && h.push(r);
        for (var l = 0,
        d = 0,
        u = [], g = [], v = 0; v < 3; v++) if (3 != h[v].length || 0 != d) if (5 != h[v].length) if (h[v].length < 3 && 0 == d) {
            for (var f = 3 - h[v].length, p = 0; p < f; p++) h[v].push(n[l]),
            l++;
            d = 1,
            u.push(h[v])
        } else if (h[v].length < 5) {
            for (var m = 5 - h[v].length, _ = 0; _ < m; _++) h[v].push(n[l]),
            l++;
            g.push(h[v])
        } else;
        else g.push(h[v]);
        else u.push(h[v]),
        d = 1;
        return a.push(u),
        a.push(g[0]),
        a.push(g[1]),
        a
    },
    i.HaveOneTongHuaShun = function(e) {
        e.sort(function(e, t) {
            return t.value - e.value
        });
        var t = e.length;
        if (! (parseInt(t) >= 5)) {
            var a = function(e) {
                for (var t = [], a = [], n = [], s = 0, o = 0, r = 0; r < e.length; r++) 0 == e[r].type ? (a.push(e[r]), 15 == e[r].value ? o++:s++) : n.push(e[r]);
                if (a.length > 0) {
                    n.sort(function(e, t) {
                        return t.value - e.value
                    });
                    for (var c = a.length,
                    h = n.length - 1,
                    l = 0; l < h; l++) {
                        var d = [];
                        d.push(n[l]);
                        for (var u = 0,
                        g = l + 1; g <= h; g++) {
                            var v = d.length;
                            if (5 == d.length) {
                                1 == i.istonghua(d) && t.push(d);
                                break
                            }
                            var f = d[v - 1].value;
                            if (d[0].type == d[v - 1].type) {
                                if (0 == Math.abs(f - n[g].value)) continue;
                                var p = Math.abs(f - n[g].value);
                                if (1 == p) d.push(n[g]);
                                else {
                                    var m = p - 1;
                                    if (m > c - u) break;
                                    for (var _ = 0,
                                    y = 0; y < m && u <= c;) {
                                        if (5 == d.length) {
                                            t.push(d),
                                            _ = 1;
                                            break
                                        }
                                        d.push(a[u]),
                                        u++,
                                        y++
                                    }
                                    if (1 == _) break;
                                    d.push(n[g])
                                }
                            }
                        }
                        if (5 == d.length) {
                            1 == i.istonghua(d) && t.push(d);
                            break
                        }
                        if (d[0].value <= 5) {
                            for (var C = 0,
                            N = 0,
                            b = 0; b < d.length; b++) d[b].type > 0 ? C++:N++;
                            if (C + a.length >= 5) {
                                for (var w = N; w + d.length < 5; w++) d.push(a[w]);
                                1 == i.istonghua(d) && t.push(d)
                            }
                            if (C + a.length == 4) for (var S = 0; S < n.length; S++) if (14 == n[S].value) {
                                d.push(n[S]);
                                for (var M = N; M + d.length < 5; M++) d.push(a[M]);
                                1 == i.istonghua(d) && t.push(d)
                            }
                        }
                        if (4 == d.length) {
                            for (var I = 0,
                            B = 0,
                            x = 0; x < 4; x++) 16 == d[x].value && B++,
                            15 == d[x].value && I++;
                            B < s && (d.push({
                                type: 0,
                                value: 16
                            }), 1 == i.istonghua(d) && t.push(d)),
                            I < o && (d.push({
                                type: 0,
                                value: 15
                            }), 1 == i.istonghua(d) && t.push(d))
                        }
                    }
                } else for (var T = 0; T < e.length; T++) {
                    var A = [];
                    A.push(e[T]);
                    for (var R = T; R < e.length; R++) if (A[0].type == e[R].type) {
                        if (1 === Math.abs(e[R].value - A[A.length - 1].value)) {
                            if (A.push(e[R]), 5 === A[0].value && 4 === A.length) for (var P = 0; P < e.length; P++) if (14 == e[P].value) {
                                A.push(e[P]);
                                break
                            }
                            if (A.length >= 5) {
                                if (5 === A[0].value && 14 === A[4].value) {
                                    var k = [A[4], A[3], A[2], A[1], A[0]];
                                    t.push(k)
                                } else t.push(A);
                                break
                            }
                        }
                        if (e[R].value - A[A.length - 1].value > 1) {
                            A = [];
                            break
                        }
                    }
                }
                return t
            } (e.concat());
            return a.length > 0 ? a: void 0
        }
    },
    i.istonghua = function(e) {
        if (e) for (var t = 0; t < e.length; t++) if (0 != e[t].type) {
            for (var a = e[t].type, n = 0; n < e.length; n++) if (0 != e[n].type && a != e[n].type) return ! 1;
            return ! 0
        }
        return ! 1
    },
    i.isshunzi = function(e) {
        e.sort(function(e, t) {
            return t.value - e.value
        });
        for (var t = 0,
        a = 0; a < e.length - 1; a++) e[a].type > 0 && e[a].value == e[a + 1].value && t++;
        if (t > 0) return ! 1;
        for (var n = [], i = [], s = 0; s < e.length; s++) 0 == e[s].type ? n.push(e[s]) : i.push(e[s]);
        if (14 == i[0].value && i[1].value <= 5 && i.length + n.length == 5) return ! 0;
        if (i[0].value <= 5 && i.length + n.length == 5) return ! 0;
        var o = [];
        o.push(i[0]);
        for (var r = 0,
        c = !1,
        h = 1; h < i.length; h++) {
            var l = o[o.length - 1].value,
            d = Math.abs(l - i[h].value);
            if (0 == d) return ! 1;
            if (1 == d) o.push(i[h]);
            else {
                var u = d - 1;
                if (u > n.length - r) return ! 1;
                for (var g = 0; g < u && r < n.length;) o.push(n[r]),
                r++,
                g++,
                c = !0;
                o.push(i[h])
            }
        }
        return o.length < 5 && o.length + n.length - r == 5 || (5 == o.length || n.length > 0 && o.length > 1 && 0 == c)
    },
    i.getShunZi = function(e, t, a) {
        for (var n = [], s = 0; s < e.length; s++) n.push(e[s]);
        if (n.length < 5) return null;
        n.sort(function(e, t) {
            return t.value - e.value
        });
        var r, c = 0;
        if (i.b_obtainType) {
            i.b_obtainType = !1;
            var h; (h = i.SZdeleteType(n, a)) && ([].push(h), c++)
        }
        return 0 == (c = (r = function(e) {
            for (var t = [], a = [], n = [], i = 0; i < e.length; i++) 0 == e[i].type ? (a.push(e[i]), e[i].value) : n.push(e[i]);
            if (a.length > 0) {
                n.sort(function(e, t) {
                    return t.value - e.value
                });
                for (var s = a.length,
                r = n.length - 1,
                c = 0; c < r; c++) {
                    var h = [];
                    h.push(n[c]);
                    for (var l = 0,
                    d = c + 1; d <= r; d++) {
                        var u = h.length;
                        if (5 == h.length) {
                            t.push(h);
                            break
                        }
                        var g = h[u - 1].value;
                        if (0 != Math.abs(g - n[d].value)) {
                            var v = Math.abs(g - n[d].value);
                            if (1 == v) h.push(n[d]);
                            else {
                                var f = v - 1;
                                if (f > s - l) break;
                                for (var p = 0,
                                m = 0; m < f && l <= s;) {
                                    if (5 == h.length) {
                                        t.push(h),
                                        p = 1;
                                        break
                                    }
                                    h.push(a[l]),
                                    l++,
                                    m++
                                }
                                if (1 == p) break;
                                if (5 == h.length) {
                                    t.push(h);
                                    break
                                }
                                if (h.push(n[d]), 5 == h.length) {
                                    t.push(h);
                                    break
                                }
                            }
                        }
                    }
                    if (h[0].value <= 5) {
                        var _ = 0,
                        y = 0;
                        14 == n[0].value && h.push(n[0]);
                        for (var C = 0; C < h.length; C++) h[C].type > 0 ? _++:y++;
                        if (_ + a.length >= 5) {
                            for (var N = y; N + h.length < 5; N++) h.push(a[N]);
                            t.push(h)
                        }
                        if (_ + a.length == 4 && 0 == o(h, 14)) for (var b = 0; b < n.length; b++) if (14 == n[b].value) {
                            h.push(n[b]);
                            for (var w = y; w + h.length < 5; w++) h.push(a[w]);
                            t.push(h)
                        }
                    }
                    if (parseInt(h.length + a.length) >= 5) {
                        var S = 5 - h.length;
                        if (0 == S) {
                            t.push(h);
                            continue
                        }
                        for (var M = 0,
                        I = 0; I < h.length; I++) 0 == h[I].type && M++;
                        var B = a.length - M;
                        if (parseInt(B) >= parseInt(S)) {
                            for (var x = 0; x < S; x++) h.push(a[M]),
                            M++;
                            if (5 == h.length) {
                                t.push(h);
                                continue
                            }
                        }
                    }
                }
            } else for (var T = 0; T < e.length; T++) {
                var A = [];
                A.push(e[T]);
                for (var R = T; R < e.length; R++) {
                    if (1 === Math.abs(e[R].value - A[A.length - 1].value)) {
                        if (A.push(e[R]), 5 === A[0].value && 4 === A.length) for (var P = 0; P < e.length; P++) if (14 == e[P].value) {
                            A.push(e[P]);
                            break
                        }
                        if (A.length >= 5) {
                            if (t[0] && 5 === A[0].value && 14 === A[4].value && 14 === t[0][0].value) {
                                var k = t[1];
                                t[1] = A,
                                t.push(k);
                                break
                            }
                            if (t[0] && 5 === A[0].value && 14 === A[4].value) {
                                k = t[0],
                                t[0] = A,
                                t.push(k);
                                break
                            }
                            t.push(A);
                            break
                        }
                    }
                    if (e[R].value - A[A.length - 1].value > 1) {
                        A = [];
                        break
                    }
                }
            }
            return t
        } (n)).length) && (c = 1),
        t ? i.Index++:i.Index = 0,
        r[i.Index % c]
    },
    i.get5ShunZiTongHua = function(e) {
        for (var t = [], a = [], n = [], s = 0; s < e.length; s++) 0 == e[s].type ? (a.push(e[s]), 15 == e[s].value ? 0 : 0) : n.push(e[s]);
        if (a.length > 0) {
            n.sort(function(e, t) {
                return t.value - e.value
            });
            for (var o = a.length,
            r = n.length - 1,
            c = 0; c < r; c++) {
                var h = [];
                h.push(n[c]);
                for (var l = 0,
                d = c + 1; d <= r; d++) {
                    var u = h.length;
                    if (5 == h.length) {
                        1 == i.istonghua(h) && t.push(h);
                        break
                    }
                    var g = h[u - 1].value;
                    if (h[0].type == n[d].type) {
                        if (0 == Math.abs(g - n[d].value)) continue;
                        var v = Math.abs(g - n[d].value);
                        if (1 == v) h.push(n[d]);
                        else {
                            var f = v - 1;
                            if (f > o - l) break;
                            for (var p = 0,
                            m = 0; m < f && l <= o;) {
                                if (5 == h.length) {
                                    1 == i.istonghua(h) && t.push(h),
                                    p = 1;
                                    break
                                }
                                h.push(a[l]),
                                l++,
                                m++
                            }
                            if (1 == p) break;
                            if (5 == h.length) {
                                1 == i.istonghua(h) && t.push(h);
                                break
                            }
                            h.push(n[d])
                        }
                    }
                }
                if (h[0].value <= 5) {
                    for (var _ = 0,
                    y = 0,
                    C = 0,
                    N = 0; N < h.length; N++) h[N].type > 0 ? _++:y++,
                    14 == h[N].value && (C = 1);
                    if (0 == C && 4 == h.length) for (var b = 0; b < n.length; b++) if (14 == n[b].value && n[b].type == h[0].type) {
                        h.push(n[b]),
                        _++,
                        t.push(h);
                        break
                    }
                    if (5 == h.length) continue;
                    if (_ + a.length >= 5) {
                        for (var w = y; w + h.length < 5; w++) h.push(a[w]);
                        t.push(h)
                    }
                    if (5 == h.length) continue;
                    if (_ + a.length == 4) {
                        for (var S = 0; S < n.length; S++) if (0 == C && 14 == n[S].value && n[S].type == h[0].type) {
                            h.push(n[S]);
                            for (var M = y; M + h.length < 5; M++) h.push(a[M]);
                            t.push(h)
                        }
                        if (5 == h.length) continue
                    }
                }
                if (parseInt(h.length + a.length) >= 5) {
                    var I = 5 - h.length;
                    if (0 == I) {
                        t.push(h);
                        continue
                    }
                    for (var B = 0,
                    x = 0; x < h.length; x++) 0 == h[x].type && B++;
                    var T = a.length - B;
                    if (parseInt(T) >= parseInt(I)) {
                        for (var A = 0; A < I; A++) h.push(a[B]),
                        B++;
                        1 == i.istonghua(h) && t.push(h)
                    }
                }
            }
        } else for (var R = 0; R < e.length; R++) {
            var P = [];
            P.push(e[R]);
            for (var k = R; k < e.length; k++) if (P[0].type == e[k].type) {
                if (1 === Math.abs(e[k].value - P[P.length - 1].value)) {
                    if (P.push(e[k]), 5 === P[0].value && 4 === P.length) for (var L = 0; L < e.length; L++) if (14 == e[L].value) {
                        P.push(e[L]);
                        break
                    }
                    if (P.length >= 5) {
                        if (0 == i.istonghua(P)) break;
                        if (5 === P[0].value && 14 === P[4].value) {
                            var E = [P[4], P[3], P[2], P[1], P[0]];
                            t.push(E)
                        } else t.push(P);
                        break
                    }
                }
                if (e[k].value - P[P.length - 1].value > 1) {
                    P = [];
                    break
                }
            }
        }
        return t
    },
    i.getTongHuaShun = function(e, t) {
        var a = 0,
        n = i.get5ShunZiTongHua(e);
        return 0 == (a = n.length) && (a = 1),
        t ? i.Index++:i.Index = 0,
        n[i.Index % a]
    },
    i.SZdeleteType = function(e, t) {
        for (var a = 10; a > 3; a--) {
            if (t) {
                if (9 === a) continue
            } else if (!t && 5 === a) continue;
            for (var n = i.getTypePai(e, a, !1), s = i.getTypePai(e, a, !0), o = 0; o < 2; o++) {
                if (0 === o) var r = n;
                else if (1 === o) r = s;
                if (r) {
                    var c = i.getSZ(e, r, t);
                    if (c) return c
                }
            }
        }
        return null
    },
    i.getSZ = function(e, t, a) {
        for (var n = [], i = 0; i < e.length; i++) {
            for (var s = !1,
            o = 0; o < t.length; o++) if (e[i] === t[o]) {
                delete t[o],
                s = !0;
                break
            }
            s || n.push(e[i])
        }
        if (!n) return null;
        r(n);
        for (var c = 0; c < n.length; c++) {
            var h = [];
            h.push(n[c]);
            for (var l = c; l < n.length; l++) {
                if (1 === Math.abs(n[l].value - h[h.length - 1].value)) {
                    if (a ? h[0].type === n[l].type && h.push(n[l]) : h.push(n[l]), 5 === h[0].value && 4 === h.length) for (var d = 0; d < n.length; d++) if (14 == n[d].value) {
                        if (!a) {
                            h.push(n[d]);
                            break
                        }
                        if (h[0].type === n[d].type) {
                            h.push(n[d]);
                            break
                        }
                    }
                    if (h.length >= 5) return h
                }
                if (n[l].value - h[h.length - 1].value > 1) {
                    h = [];
                    break
                }
            }
        }
    },
    i.getTongHua = function(e, t) {
        var a = [];
        if (i.b_obtainType) {
            i.b_obtainType = !1;
            var n = []; (n = i.THdeleteType(e)) && (a.push(n), o++)
        }
        for (var s, o = 0,
        r = e.length,
        c = [], h = [], l = [], d = [], u = 0; u < r; u++) 0 === e[u].type && (c.push(e[u]), h.push(e[u]), l.push(e[u]), d.push(e[u])),
        1 === e[u].type && c.push(e[u]),
        2 === e[u].type && h.push(e[u]),
        3 === e[u].type && l.push(e[u]),
        4 === e[u].type && d.push(e[u]);
        if (c.length > 4) for (var g = 0; g < c.length - 4; g++) {
            for (var v = [], f = 0; f < 5; f++) v.push(c[f + g]);
            a.push(v),
            o++
        }
        if (h.length > 4) for (var p = 0; p < h.length - 4; p++) {
            v = [];
            for (var m = 0; m < 5; m++) v.push(h[m + p]);
            a.push(v),
            o++
        }
        if (l.length > 4) for (var _ = 0; _ < l.length - 4; _++) {
            v = [];
            for (var y = 0; y < 5; y++) v.push(l[y + _]);
            a.push(v),
            o++
        }
        if (d.length > 4) for (var C = 0; C < d.length - 4; C++) {
            v = [];
            for (var N = 0; N < 5; N++) v.push(d[N + C]);
            a.push(v),
            o++
        }
        if (t ? i.Index++:i.Index = 0, s = i.Index % o, !n && a.length > 1) for (var b = 1; b < a.length; b++) for (var w = 0; w < a[0].length && !(a[0][w].value > a[b][w].value); w++) if (a[0][w].value < a[b][w].value) {
            var S = a[b];
            a[b] = a[0],
            a[0] = S;
            break
        }
        return a[s]
    },
    i.THdeleteType = function(e) {
        for (var t = 10; t > 3; t--) if (6 !== t) for (var a = i.getTypePai(e, t, !1), n = i.getTypePai(e, t, !0), s = 0; s < 2; s++) {
            if (0 === s) var o = a;
            else if (1 === s) o = n;
            if (o) {
                var r = i.getTH(e, o);
                if (r) return r
            }
        }
        return null
    },
    i.getTH = function(e, t) {
        for (var a = [], n = 0; n < e.length; n++) {
            for (var i = !1,
            s = 0; s < t.length; s++) if (e[n] === t[s]) {
                delete t[s],
                i = !0;
                break
            }
            i || a.push(e[n])
        }
        if (!a) return null;
        var o = a.length,
        r = [],
        c = [],
        h = [],
        l = [];
        for (n = 0; n < o; n++) 1 === a[n].type && r.push(a[n]),
        2 === a[n].type && c.push(a[n]),
        0 === a[n].type && h.push(a[n]),
        3 === a[n].type && l.push(a[n]);
        if (r.length > 4) for (n = 0; n < r.length - 4; n++) {
            var d = [];
            for (s = 0; s < 5; s++) d.push(r[s + n]);
            return d
        }
        if (c.length > 4) for (n = 0; n < c.length - 4; n++) {
            for (d = [], s = 0; s < 5; s++) d.push(c[s + n]);
            return d
        }
        if (h.length > 4) for (n = 0; n < h.length - 4; n++) {
            for (d = [], s = 0; s < 5; s++) d.push(h[s + n]);
            return d
        }
        if (l.length > 4) for (n = 0; n < l.length - 4; n++) {
            for (d = [], s = 0; s < 5; s++) d.push(l[s + n]);
            return d
        }
    },
    i.getHuLu = function(e, t) {
        var a = [],
        n = 0,
        s = function(e, t) {
            for (var a = 0; a < e.length; a++) if (e[a].value == t.value) return ! 0;
            return ! 1
        };
        e.sort(function(e, t) {
            return t.value - e.value
        });
        var o;
        o = e.concat();
        for (var c = [], h = [], l = 0; l < o.length; l++) 0 == o[l].type ? c.push(o[l]) : h.push(o[l]);
        for (var d = [], u = r(h).arrTongPai, g = [], v = 0; v < u.length; v++) if (2 == u[v].length) {
            var f = [];
            f.push(u[v][0]),
            f.push(u[v][1]),
            g.push(f)
        }
        if (0 == g.length) for (var p = 0; p < u.length; p++) if (u[p].length > 2) {
            var m = [];
            m.push(u[p][0]),
            m.push(u[p][1]),
            g.push(m)
        }
        for (var _ = 0; _ < u.length; _++) if (u[_].length >= 3) if (g.length > 0) for (var y = g.length - 1; y >= 0; y--)(d = []).push(u[_][0]),
        d.push(u[_][1]),
        d.push(u[_][2]),
        0 == s(d, g[y][0]) && (d.push(g[y][0]), d.push(g[y][1]), a.push(d), n++);
        else if (c.length > 0) { (d = []).push(u[_][0]),
            d.push(u[_][1]),
            d.push(u[_][2]),
            d.push(c[0]);
            for (var C = h.length - 1; C >= 0; C--) 0 == s(d, h[C]) && (d.push(h[C]), a.push(d), n++)
        }
        if (c.length >= 1 && g.length > 1) for (var N = 0; N < g.length; N++) for (var b = g.length - 1; b >= 0; b--) N != b && ((d = []).push(g[N][0]), d.push(g[N][1]), d.push(g[b][0]), d.push(g[b][1]), d.push(c[0]), a.push(d), n++);
        return t ? i.Index++:i.Index = 0,
        a[i.Index % n]
    },
    i.HLAdjust = function(e, t) {
        for (var a = 10; a > 3; a--) if (7 !== a) for (var n = 0; n < t.length; n++) {
            for (var s = [], o = 0; o < e.length; o++) {
                for (var r = !1,
                c = 0; c < t[n].length; c++) if (e[o] === t[n][c]) {
                    r = !0;
                    break
                }
                r || s.push(e[o])
            }
            if (!s) return null;
            for (var h = i.getTypePai(s, a, !1), l = i.getTypePai(s, a, !0), d = 0; d < 2; d++) {
                if (0 === d) var u = h;
                else if (1 === d) u = l;
                if (u) {
                    var g = t[0];
                    return t[0] = t[n],
                    t[n] = g,
                    t
                }
            }
        }
        return t
    },
    i.HLdeleteType = function(e) {
        for (var t = 10; t > 4; t--) if (7 !== t) for (var a = i.getTypePai(e, t, !1), n = i.getTypePai(e, t, !0), s = 0; s < 2; s++) {
            if (0 === s) var o = a;
            else if (1 === s) o = n;
            if (o) {
                for (var c = [], h = 0; h < e.length; h++) {
                    for (var l = !1,
                    d = 0; d < o.length; d++) if (e[h] === o[d]) {
                        delete o[d],
                        l = !0;
                        break
                    }
                    l || c.push(e[h])
                }
                if (!c) return null;
                var u = r(c).arrTongPai,
                g = [];
                for (h = 0; h < u.length; h++) if (3 === u[h].length) {
                    for (d = 0; d < u.length; d++) if (h !== d) {
                        if (g.push(u[h][0]), g.push(u[h][1]), g.push(u[h][2]), u[d].length > 1) return g.push(u[d][0]),
                        g.push(u[d][1]),
                        g;
                        g = []
                    }
                } else if (u[h].length > 3) for (d = 0; d < u.length; d++) if (h !== d) {
                    var v = i.getTongHua(e, !1);
                    if (g.push(u[h][0]), g.push(u[h][1]), g.push(u[h][2]), v) for (var f = 0; f < v.length; f++) for (var p = 0; p < g.length; p++) v[f] === g[p] && (g[p] = u[h][3]);
                    if (u[d].length > 1) return g.push(u[d][0]),
                    g.push(u[d][1]),
                    g;
                    g = []
                }
            }
        }
        return null
    },
    i.getTieZhi = function(e, t) {
        e.sort(function(e, t) {
            return t.value - e.value
        });
        for (var a = [], n = [], s = 0; s < e.length; s++) 0 == e[s].type ? a.push(e[s]) : n.push(e[s]);
        var o = [];
        if (i.b_obtainType) {
            i.b_obtainType = !1;
            i.TZdeleteType(e) && u++
        }
        var c = r(n),
        h = c.arrTongPai,
        l = c.sanPai,
        d = null;
        l.length > 0 && (d = l[l.length - 1]);
        for (var u = 0,
        g = [], v = 0; v < h.length; v++) 4 === h[v].length ? (g.push(h[v][0]), g.push(h[v][1]), g.push(h[v][2]), g.push(h[v][3]), d && g.push(d), o.push(g), u++, g = []) : 3 === h[v].length ? a.length > 0 && (g.push(h[v][0]), g.push(h[v][1]), g.push(h[v][2]), g.push(a[0]), d && (g.push(d), o.push(g), u++), g = []) : 2 === h[v].length && a.length > 1 && (g.push(h[v][0]), g.push(h[v][1]), g.push(a[0]), g.push(a[1]), d && (g.push(d), o.push(g), u++), g = []);
        return t ? i.Index++:i.Index = 0,
        o[i.Index % u]
    },
    i.TZdeleteType = function(e) {
        for (var t = 10; t > 3; t--) if (8 !== t) for (var a = i.getTypePai(e, t, !1), n = i.getTypePai(e, t, !0), s = 0; s < 2; s++) {
            if (0 === s) var o = a;
            else if (1 === s) o = n;
            if (o) {
                for (var c = [], h = 0; h < e.length; h++) {
                    for (var l = !1,
                    d = 0; d < o.length; d++) if (e[h] === o[d]) {
                        delete o[d],
                        l = !0;
                        break
                    }
                    l || c.push(e[h])
                }
                if (!c) return null;
                var u = r(c).arrTongPai,
                g = [];
                for (h = 0; h < u.length; h++) if (4 === u[h].length) return g.push(u[h][0]),
                g.push(u[h][1]),
                g.push(u[h][2]),
                g.push(u[h][3]),
                g
            }
        }
        return null
    },
    i.getWuTong = function(e, t) {
        var a = [];
        if (i.b_obtainType) {
            i.b_obtainType = !1;
            var n; (n = i.WTdeleteType(e)) && (a.push(n), d++)
        }
        e.sort(function(e, t) {
            return t.value - e.value
        });
        var s;
        s = e.concat();
        for (var o = [], c = [], h = 0; h < s.length; h++) 0 == s[h].type ? o.push(s[h]) : c.push(s[h]);
        for (var l = r(c).arrTongPai, d = 0, u = [], g = 0; g < l.length; g++) 5 === l[g].length && (u.push(l[g][0]), u.push(l[g][1]), u.push(l[g][2]), u.push(l[g][3]), u.push(l[g][4]), a.push(u), d++, u = []),
        o.length > 0 && 4 === l[g].length && ((u = []).push(l[g][0]), u.push(l[g][1]), u.push(l[g][2]), u.push(l[g][3]), u.push(o[0]), a.push(u), d++),
        o.length > 1 && (4 == l[g].length && ((u = []).push(l[g][0]), u.push(l[g][1]), u.push(l[g][2]), u.push(l[g][3]), u.push(o[0]), a.push(u), d++), 3 == l[g].length && ((u = []).push(l[g][0]), u.push(l[g][1]), u.push(l[g][2]), u.push(o[0]), u.push(o[1]), a.push(u), d++)),
        o.length > 2 && (4 == l[g].length && ((u = []).push(l[g][0]), u.push(l[g][1]), u.push(l[g][2]), u.push(l[g][3]), u.push(o[0]), a.push(u), d++), 3 == l[g].length && ((u = []).push(l[g][0]), u.push(l[g][1]), u.push(l[g][2]), u.push(o[0]), u.push(o[1]), a.push(u), d++), 2 == l[g].length && ((u = []).push(l[g][0]), u.push(l[g][1]), u.push(o[0]), u.push(o[1]), u.push(o[2]), a.push(u), d++));
        if (o.length > 3) for (var v = 0; v < c.length; v++)(u = []).push(o[0]),
        u.push(o[1]),
        u.push(o[2]),
        u.push(o[3]),
        u.push(c[v]),
        a.push(u),
        d++;
        return t ? i.Index++:i.Index = 0,
        a[i.Index % d]
    },
    i.WTdeleteType = function(e) {
        for (var t = 10; t > 3; t--) if (10 !== t) for (var a = i.getTypePai(e, t, !1), n = i.getTypePai(e, t, !0), s = 0; s < 2; s++) {
            if (0 === s) var o = a;
            else if (1 === s) o = n;
            if (o) {
                for (var c = [], h = 0; h < e.length; h++) {
                    for (var l = !1,
                    d = 0; d < o.length; d++) if (e[h] === o[d]) {
                        delete o[d],
                        l = !0;
                        break
                    }
                    l || c.push(e[h])
                }
                if (!c) return null;
                var u = r(c).arrTongPai,
                g = [];
                for (h = 0; h < u.length; h++) if (5 === u[h].length) return g.push(u[h][0]),
                g.push(u[h][1]),
                g.push(u[h][2]),
                g.push(u[h][3]),
                g.push(u[h][4]),
                g
            }
        }
        return null
    },
    i.getType = function(e) {
        for (var t = [], a = 0; a < e.length; a++) t.push(e[a]);
        t.sort(function(e, t) {
            return t.value - e.value
        });
        var s = [],
        o = r(t),
        c = o.tongPai,
        h = o.sanPai;
        o.paiValue,
        t.length,
        c.length,
        h.length;
        return i.getWuTong(t, !1) && (n.WT, s.push(n.WT)),
        i.getTongHuaShun(t, !1) && (n.THS, s.push(n.THS)),
        i.getTieZhi(t, !1) && (n.TZ, s.push(n.TZ)),
        i.getHuLu(t, !1) && (n.HL, s.push(n.HL)),
        i.getTongHua(t, !1) && (n.TH, s.push(n.TH)),
        i.getShunZi(t, !1, !1) && (n.SZ, s.push(n.SZ)),
        i.getSanTiao(t, !1) && (n.ST, s.push(n.ST)),
        c.length > 1 && (n.ED, s.push(n.ED)),
        i.getDuiZi(t, !1) ? (n.YD, s.push(n.YD)) : (n.WL, s.push(n.WL)),
        s
    },
    i.getTypeEx = function(e) {
        for (var t = [], a = 0; a < e.length; a++) t.push(e[a]);
        t.sort(function(e, t) {
            return t.value - e.value
        });
        var s = r(t),
        o = s.tongPai,
        c = s.sanPai;
        s.paiValue,
        t.length,
        o.length,
        c.length;
        return i.getWuTong(t, !1) ? n.WT: i.getTongHuaShun(t, !1) ? n.THS: i.getTieZhi(t, !1) ? n.TZ: i.getHuLu(t, !1) ? n.HL: i.getTongHua(t, !1) ? n.TH: i.getShunZi(t, !1, !1) ? n.SZ: i.getSanTiao(t, !1) ? n.ST: s.tongPai.length > 1 ? n.ED: s.tongPai.length > 0 ? n.YD: n.WL
    };
    var r = function(e) {
        e.sort(function(e, t) {
            return t.value - e.value
        });
        for (var t = e.length,
        a = {
            sanPai: [],
            tongPai: [],
            arrTongPai: [],
            paiValue: []
        },
        n = 0, i = 1, s = [], o = [], r = [], c = 0; c < t; c++) 0 == e[c].type ? o.push(e[c]) : r.push(e[c]);
        for (var h = o.length,
        l = r.length,
        d = 0; d < l; ++d) {
            if (d >= l - 1) {
                if (i > 1)(N = {}).value = r[n].value,
                N.count = i,
                a.tongPai.push(N);
                break
            }
            if (r[n], r[n].value === r[d + 1].value)++i;
            else {
                if (i > 1)(N = {}).value = r[n].value,
                N.count = i,
                a.tongPai.push(N);
                n = d + 1,
                i = 1
            }
        }
        var u = a.tongPai.length;
        for (d = 0; d < u; d++) {
            for (var g = 0; g < t; g++) e[g].value === a.tongPai[d].value && s.push(e[g]);
            s.length > 0 && (a.arrTongPai.push(s), s = [])
        }
        if (h > 0) if (5 == t || 3 == t) if ((1 == a.tongPai.length || a.tongPai.length > 2) && (a.tongPai[0].count += h), 2 == a.tongPai.length && (a.tongPai[0].value > a.tongPai[1].value ? a.tongPai[0].count += h: a.tongPai[1].count += h), a.arrTongPai.length > 0) for (var v = a.arrTongPai[0], f = 0; f < h; f++) v.push(o[f]);
        else {
            var p = [];
            p.push(r[0]);
            for (var m = 0; m < h; m++) p.push(o[m]);
            a.arrTongPai.push(p),
            (N = {}).value = r[0].value,
            N.count = h + 1,
            a.tongPai.push(N)
        } else {
            var _ = [];
            if (a.arrTongPai.length > 0) for (var y = 0; y < a.arrTongPai.length; y++) {
                for (var C = a.arrTongPai[y], N = [], b = 0; b < C.length; b++) N.push(C[b]);
                for (var w = 0; w < h; w++) N.push(o[w]);
                _.push(N)
            }
            for (var S = 0; S < r.length; S++) {
                N = [];
                for (var M = 0; M < o.length; M++) N.push(o[M]);
                N.push(r[S]),
                _.push(N)
            }
            if (_.length > 0) for (var I = 0; I < _.length; I++) a.arrTongPai.push(_[I])
        }
        for (d = 0; d < t; ++d) {
            u = a.tongPai.length;
            var B = !1;
            for (g = 0; g < u; ++g) if (e[d].value === a.tongPai[g].value) {
                B = !0;
                break
            }
            B || a.sanPai.push(e[d])
        }
        for (d = 0; d < t; d++) {
            var x = !1;
            for (g = 0; g < a.paiValue.length; g++) a.paiValue[g].value === e[d].value && (x = !0);
            x || a.paiValue.push(e[d])
        }
        return a
    };
    i.compareSameType = function(e, t, a) {
        if (6 === a) {
            for (var n = 0; n < e.length; n++) {
                if (0 == e[n].type) {
                    if (14 == t[n].value) continue;
                    return 1
                }
                if (0 == t[n].type) {
                    if (14 == e[n].value) continue;
                    return - 1
                }
                if (e[n].value > t[n].value) return 1;
                if (e[n].value < t[n].value) return - 1
            }
            return 0
        }
        if (5 === a || 9 === a) {
            for (var i = [], s = [], o = 0; o < e.length; o++) e[o].type > 0 && i.push(e[o]);
            for (var h = 0; h < t.length; h++) t[h].type > 0 && s.push(t[h]);
            var l = i.length;
            if (l > s.length && (l = s.length), 5 == i[0].value || 5 == s[0].value) {
                if (5 == i[0].value && 14 != s[0].value) return 1;
                if (5 == s[0].value && 14 != i[0].value) return - 1;
                if (5 == s[0].value && 14 == i[0].value) return 1;
                if (5 == i[0].value && 14 == s[0].value) return - 1
            }
            for (var d = 0; d < l; d++) {
                if (0 != d && i[0].value == s[0].value) {
                    if (i[d].value > s[d].value) return 1;
                    if (i[d].value < s[d].value) return - 1
                }
                if (i[d].value > s[d].value) return 1;
                if (i[d].value < s[d].value) return - 1
            }
            for (var u = 0; u < l; u++) {
                if (i[u].type > s[u].type) return - 1;
                if (i[u].type < s[u].type) return 1
            }
            return i.length > s.length ? 1 : i.length < s.length ? -1 : 0
        }
        var g = r(e),
        v = r(t),
        f = g.tongPai,
        p = v.tongPai;
        f.sort(function(e, t) {
            return t.count - e.count
        }),
        p.sort(function(e, t) {
            return t.count - e.count
        });
        var m = g.sanPai,
        _ = v.sanPai,
        y = 0,
        C = f.length;
        if (C === p.length) for (var N = 0; N < C; N++) if (0 !== (y = c(f[N].value, p[N].value))) return y;
        var b = m.length,
        w = _.length;
        if (parseInt(b) < parseInt(w) && (w = b), b === w) {
            for (var S = [], M = [], I = 0, B = 0, x = 0; x < b; x++) m[x].type > 0 && (S.push(m[x]), I++),
            _[x].type > 0 && (M.push(_[x]), B++);
            I > B && (I = B);
            for (N = 0; N < I; N++) if (0 !== (y = c(S[N].value, M[N].value))) return y
        }
        return 0
    };
    var c = function(e, t) {
        return e > t ? 1 : e === t ? 0 : -1
    };

    module.exports = i
//     cc._RF.pop()
// },
// {
//     sssUtils: "sssUtils"
// }],