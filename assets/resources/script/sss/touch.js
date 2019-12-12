var n = [];
cc.Class({
    extends: cc.Component,
    properties: {
        shezhiPai: {
            type: cc.Node,
            default: null
        },
        myPai: {
            type: cc.Node,
            default: null
        },
        _timeChild: null,
        _tempHoldData: null,
        numAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        _btnOk: null,
        _btnCancer: null,
        _tdLabel: null,
        _zdLabel: null,
        _wdLabel: null,
        tdPaiArr: [],
        zdPaiArr: [],
        wdPaiArr: [],
        sortflag: !1,
        btnSortzi: null,
        endTime: 0
    },

    onLoad: function () {
        //cc.log('load进来了几次呢');

        //document.getElementsByTagName("title")[0].innerText = '需要设置的值';

        //document.title = '快回来~页面崩溃了';


            // cc.loader.loadRes('http://www.8dyl.cn:7456/img/1/.jpg', cc.AudioClip, function (err, clip) {

            //     var audioID = cc.audioEngine.play(clip, false, 0.5);

            // });

            //  cc.loader.loadRes('audio/13daqiang', cc.AudioClip, function(err, clip) {
            //      //cc.beimi.audio.playSFX();
            //     cc.audioEngine.play(clip,false,0.5);   
            //     //sound_manager.play_music(clip, true);
            // });

            this.addY = 60,
            this.norY = 0,
              // this.addY = -60,
            // this.norY = -110,

            this.initSheZhi(),
            this.initMyPai(),
            this.arrUpPai = [],
            this.TDIndex = 0,
            this.ZDIndex = 0,
            this.WDIndex = 0,
            this.arrUpPaiIndex = [],

            this.Compare = require("Compare"),
            //this.gameNetMgr=require('sssGameNetMgr'),
            this._timeChild = this.node.getChildByName("time"),//计时器节点
            this.sortflag = !1,
            this._timeChild.active = !0;//控制计时器是否显示、这里需要后台传递参数；
        //0 == this.gameNetMgr.conf.peipai ? this._timeChild.active = !1 : this._timeChild.active = !0;
        var t = this.node.getChildByName("sort");
        this.btnSortzi = t.getChildByName("Label"),
            this.timenumber = this._timeChild.getChildByName("timeer"),
            // this._curTurn = this.gameNetMgr.turn, 
            this.bUpPai = !0,
            this._tdLabel = this.node.getChildByName("shezhipai").getChildByName("taodao").getChildByName("Label"),
            this._zdLabel = this.node.getChildByName("shezhipai").getChildByName("zhongdao").getChildByName("Label"),
            this._wdLabel = this.node.getChildByName("shezhipai").getChildByName("weidao").getChildByName("Label"),
            this._tdLabel.active = !1,
            this._zdLabel.active = !1,
            this._wdLabel.active = !1,
            n.push("zheng0"),
            n.push("zheng1"),
            n.push("zheng2"),
            n.push("zheng3"),
            n.push("zheng4"),
            n.push("zheng5"),
            n.push("zheng6"),
            n.push("zheng7"),
            n.push("zheng8"),
            n.push("zheng9")
    },

    initHandler: function () {
        this.endTime = 0
    },

    setCountdown: function (e) {
        this.endTime = e
    },

    reset: function () {
        this.arrUpPai = [],
            this.TDIndex = 0,
            this.ZDIndex = 0,
            this.WDIndex = 0,
            this.arrUpPaiIndex = [],
            this.setAllDown(),
            this._tdLabel.active = !1,
            this._zdLabel.active = !1,
            this._wdLabel.active = !1,
            this.tdPaiArr = [],
            this.zdPaiArr = [],
            this.wdPaiArr = []
    },

    initMyPai: function () {
        this.arrMyPai = [], this.arrMyPaiPos = [];
        for (var e = 1; e <= 13; e++) {
            var t = "pai" + e,
                a = this.myPai.getChildByName(t);
            // a.scale = .65,
            // a.y = -110,
            // a.x = 100 * e - 750,
            a.scale = 1,//牌的排列顺序大小；
                a.y = 0,
                a.x = 100 * e - 750,
                this.arrMyPaiPos.push(a.position),
                this.arrMyPai.push(a)
        }
        this.addTouch()
    },

    initSheZhi: function () {
        this.arrTDPai = [],
            this.arrZDPai = [],
            this.arrWDPai = [],
            this.arrSheZhiPai = [];
        // console.log(this);
        // cc.log(this.shezhiPai.getChildByName("toudaoNode"));
        var t = this.shezhiPai.getChildByName("toudaoNode"),
            z = this.shezhiPai.getChildByName("zhongdaoNode"),
            w = this.shezhiPai.getChildByName("weidaoNode");

        (this.tempPaiNode = this.shezhiPai.getChildByName("tempPai"),
            this.tempPaiNode.active = !1,
            this.jsShezhipai = this.shezhiPai.getComponent("shezhipai"),//挂载脚本
            this._btnOk = this.shezhiPai.getChildByName("btn_Ok"),
            this._btnCancer = this.shezhiPai.getChildByName("btn_Cancel")
            //2 === cc.vv.gameNetMgr.wanfa
        ) && (this.shezhiPai.getChildByName("btn_Baipai").active = !1);//是否显示摆牌按钮

        for (var n = 1; n <= 3; n++) {
            var i = "paiNode" + n,
                s = (o = t.getChildByName(i)).getChildByName("pai");
            this.arrTDPai.push(s),
                this.arrSheZhiPai.push(o)
        }

        for (n = 1; n <= 5; n++) {
            i = "paiNode" + n, 
            s = (o = z.getChildByName(i)).getChildByName("pai");
            this.arrZDPai.push(s),
                this.arrSheZhiPai.push(o)
        }

        for (n = 1; n <= 5; n++) {
            var o;
            i = "paiNode" + n, s = (o = w.getChildByName(i)).getChildByName("pai");
            this.arrWDPai.push(s),
                this.arrSheZhiPai.push(o)
        }
    },

    addTouch: function () {//添加点击
        cc.log('点击了添加到')
        for (var e = 0; e < 13; e++) this.myPai.children[e].on(cc.Node.EventType.TOUCH_START,//自己13张牌的监听事件
            this.onTouchStart, this),
            this.myPai.children[e].on(cc.Node.EventType.TOUCH_MOVE,
                this.onTouchMove, this),
            this.myPai.children[e].on(cc.Node.EventType.TOUCH_END,
                this.onTouchEnd,
                this);

        for (var t = this.shezhiPai.getChildByName("toudaoNode"), a = 1; a <= 3; a++) {//头道监听事件
            var n = t.getChildByName("paiNode" + a);
            console.log(n);
            n.on(cc.Node.EventType.TOUCH_START, this.onSheZhiTouchStart, this),
                n.on(cc.Node.EventType.TOUCH_MOVE,
                    this.onSheZhiTouchMove, this),
                n.on(cc.Node.EventType.TOUCH_END,
                    this.onSheZhiTouchEnd, this),
                n.on(cc.Node.EventType.TOUCH_CANCEL,
                    this.onSheZhiTouchCancel,
                    this)
            cc.log('点击了t添加到')
        }

        for (var i = this.shezhiPai.getChildByName("zhongdaoNode"), s = 1; s <= 5; s++) {//中道监听事件
            var o = i.getChildByName("paiNode" + s);
            o.on(cc.Node.EventType.TOUCH_START,
                this.onSheZhiTouchStart, this),
                o.on(cc.Node.EventType.TOUCH_MOVE,
                    this.onSheZhiTouchMove, this),
                o.on(cc.Node.EventType.TOUCH_END,
                    this.onSheZhiTouchEnd, this),
                o.on(cc.Node.EventType.TOUCH_CANCEL,
                    this.onSheZhiTouchCancel, this)
            cc.log('点击了z添加到')
        }

        for (var r = this.shezhiPai.getChildByName("weidaoNode"), c = 1; c <= 5; c++) { ////尾道监听事件
            var h = r.getChildByName("paiNode" + c);
            h.on(cc.Node.EventType.TOUCH_START,
                this.onSheZhiTouchStart, this),
                h.on(cc.Node.EventType.TOUCH_MOVE,
                    this.onSheZhiTouchMove, this),
                h.on(cc.Node.EventType.TOUCH_END,
                    this.onSheZhiTouchEnd, this),
                h.on(cc.Node.EventType.TOUCH_CANCEL,
                    this.onSheZhiTouchCancel, this)
            cc.log('点击了w添加到')
        }
    },

    onSheZhiTouchCancel: function (e) {//设置为取消状态
        var t = e.target,
            a = t.getChildByName("pai").getComponent("pai"),
            n = a.getData(),
            i = e.getLocation();
        this.tempPaiNode.active = !1;
        for (var s = 0; s < this.arrSheZhiPai.length; s++) {
            var o = this.arrSheZhiPai[s],
                r = o.parent.convertToNodeSpaceAR(i),
                c = o.position;
            if (new cc.rect(c.x - o.width / 2, c.y - o.height / 2, o.width, o.height).contains(r)) {
                var h = o.getChildByName("pai").getComponent("pai"),
                    l = h.getData();
                if (1 === l.value) a.setNullInfo(), h.setInfo(n),
                    "toudaoNode" == t.parent.name ? this.TDIndex-- : "zhongdaoNode" == t.parent.name ? this.ZDIndex-- : "weidaoNode" == t.parent.name && this.WDIndex-- ,
                    s < 3 ? this.TDIndex++ : s < 8 ? this.ZDIndex++ : s < 13 && this.WDIndex++ ,
                    3 === this.arrTDPai.length && this.sortPaiData(this.arrTDPai),
                    5 === this.arrZDPai.length && this.sortPaiData(this.arrZDPai),
                    5 === this.arrWDPai.length && this.sortPaiData(this.arrWDPai);
                else {
                    var d = {};
                    d.type = n.type,
                        d.value = n.value,
                        d.isBB = n.isBB,
                        a.setInfo(l),
                        h.setInfo(d),
                        3 === this.arrTDPai.length && this.sortPaiData(this.arrTDPai),
                        5 === this.arrZDPai.length && this.sortPaiData(this.arrZDPai),
                        5 === this.arrWDPai.length && this.sortPaiData(this.arrWDPai)
                }
                return
            }
        }
        1 !== n.value && (n.isBB ? this.setArrMyPai(n, !1, !0) : this.setArrMyPai(n, !1), "toudaoNode" == t.parent.name ? this.TDIndex-- : "zhongdaoNode" == t.parent.name ? this.ZDIndex-- : "weidaoNode" == t.parent.name && this.WDIndex-- , this._btnCancer.active = !1, this._btnOk.active = !1, a.setNullInfo(), console.log("onSheZhiTouchCancel refreshMyPai "), this.refreshMyPai())
    },


    sortPaiData: function (e) {//数据排序
        for (var t = [], a = 0; a < e.length; a++) {
            var n = e[a].getComponent("pai").getData();
            if (n) {
                var i = {};
                i.value = n.value, i.type = n.type, i.isBB = n.isBB, t.push(i)
            }
        }
        this.myPai.getComponent("myPai").sortPai(t);
        for (var s = 0; s < t.length; s++) e[s].getComponent("pai").setInfo(t[s])
    },

    sortPaiColor: function () {//排序方法
        var e = this.myPai.getComponent("myPai"),
            t = e.getMyPaiData();
        if (0 !== t.length) {
            var a = e.arrPai;
            if (0 == this.sortflag) {
                this.btnSortzi.getComponent(cc.Label).string = "大小排序";
                var n = e.sortPaiHuaSe(t);
                t = [], t = n, this.sortflag = !0
            } else this.btnSortzi.getComponent(cc.Label).string = "花色排序", e.sortPai(t), this.sortflag = !1;
            for (var i = 0; i < t.length; i++) a[i].getComponent("pai").setInfo(t[i])
        }
    },

    onSheZhiTouchEnd: function (e) {
        cc.log('2-----------------------------------');
        cc.log(this.myPai.getComponent("myPai"))
        this.tempPaiNode.active = !1,0 === this.myPai.getComponent("myPai").getMyPaiData().length && (this.jsShezhipai ? 1 == this.jsShezhipai.onCheckDaoShui() && (this._btnCancer.active = !0, this._btnOk.active = !0) : (this._btnCancer.active = !0, this._btnOk.active = !0));
        var t = e.target,
            a = t.getChildByName("pai").getComponent("pai"),
            n = a.getData();
        this.bUpPai && this.automaticPai(), null == n || 1 === n.value || this.bUpPai || (n.isBB ? this.setArrMyPai(n, !1, !0) : this.setArrMyPai(n, !1), "toudaoNode" == t.parent.name ? this.TDIndex-- : "zhongdaoNode" == t.parent.name ? this.ZDIndex-- : "weidaoNode" == t.parent.name && this.WDIndex-- , this._btnCancer.active = !1, this._btnOk.active = !1, a.setNullInfo(), this.refreshMyPai()), this.bUpPai = !1
    },

    onSheZhiTouchMove: function (e) {
        cc.log('1');
        e.target;
        var t = e.getLocation(),
            a = this.shezhiPai.convertToNodeSpaceAR(t);
        this.tempPaiNode.position = a
    },

    onSheZhiTouchStart: function (e) {
       // cc.log('0');
        var t = e.target,
            a = this.getUpPaiData();
        if (a.length < 1) {

            cc.log('-----------------e.target------------------------');
            cc.log((t = e.target).getComponent("pai"));
            var n = (t = e.target).getComponent("pai").getData();
            if (n && n.value > 1) {
                var i = e.getLocation(),
                    s = this.shezhiPai.convertToNodeSpaceAR(i);
                this.tempPaiNode.getComponent("pai").setInfo(n), this.tempPaiNode.active = !1, this.tempPaiNode.position = s
            }
        }
        var o = t.parent;
        if ("weidaoNode" === o.name) {
            if (this.WDIndex > 4) return;
            for (var r = 0; r < a.length && !(this.WDIndex > 4); r++) {
                for (var c = 0; c < this.arrWDPai.length; c++) {
                    var h = this.arrWDPai[c];
                    h.active = !0;
                    var l = h.getComponent("pai").getData();
                    if (null == l || l.value <= 1) {
                        var d = this.arrWDPai[c];
                        break
                    }
                }
                if (!d) return;
                d.getComponent("pai").setInfo(a[r]), this.wdPaiArr.push(a[r]), this.setArrMyPai(a[r], !0), this.WDIndex++ , this.bUpPai = !0
            }
            for (var u = [], g = 0; g < this.arrWDPai.length; g++) {

                cc.log('-----------------arrWDPai------------------------');
                cc.log(this.arrWDPai);
                var v = this.arrWDPai[g].getComponent("pai").getData();

                if (v && 1 != v.value) {
                    var f = {
                        type: v.type,
                        value: v.value
                    };
                    u.push(f)
                }
            }
            if (5 == u.length) 0 !== (I = this.Compare.getTypeEx(u)) && this.SetDaoPaiXing(this._wdLabel, I);
            else this.SetDaoPaiXing(this._wdLabel, 0)
        } else if ("zhongdaoNode" === o.name) {
            if (this.ZDIndex > 4) return;
            for (this.node.getChildByName("setType").getComponent("setType").preBtnTag, r = 0; r < a.length && !(this.ZDIndex > 4); r++) {
                for (var p = 0; p < this.arrZDPai.length; p++) {
                    var m = this.arrZDPai[p];
                    m.active = !0;
                    var _ = m.getComponent("pai").getData();
                    if (null == _ || _.value <= 1) {
                        d = this.arrZDPai[p];
                        break
                    }
                }
                if (!d) return;
                d.getComponent("pai").setInfo(a[r]), this.zdPaiArr.push(a[r]), this.setArrMyPai(a[r], !0), this.ZDIndex++ , this.bUpPai = !0
            }
            for (var y = [], C = 0; C < this.arrZDPai.length; C++) {
                console.log('要查看的参数')
                console.log(this.arrZDPai[C])
                var N = this.arrZDPai[C].getComponent("pai").getData();
                if (N && 1 != N.value) {
                    var b = {
                        type: N.type,
                        value: N.value
                    };
                    y.push(b)
                }
            }
            if (5 == y.length) 0 !== (I = this.Compare.getTypeEx(y)) && this.SetDaoPaiXing(this._zdLabel, I);
            else this.SetDaoPaiXing(this._zdLabel, 0)
        } else if ("toudaoNode" === o.name) {
            if (this.TDIndex > 2) return;
            this.node.getChildByName("setType").getComponent("setType").preBtnTag;
            if (a.length > 3) return;
            for (r = 0; r < a.length && !(this.TDIndex > 2); r++) {
                for (var w = 0; w < this.arrTDPai.length; w++) {
                    var S = this.arrTDPai[w];
                    S.active = !0;
                    var M = S.getComponent("pai").getData();
                    if (null == M || M.value <= 1) {
                        d = this.arrTDPai[w];
                        break
                    }
                }
                if (!d) return;
                d.getComponent("pai").setInfo(a[r]), this.tdPaiArr.push(a[r]), this.setArrMyPai(a[r], !0), this.TDIndex++ , this.bUpPai = !0
            }
            for (var I, B = [], x = 0; x < this.arrTDPai.length; x++) {
                var T = this.arrTDPai[x].getComponent("pai").getData();
                if (T && 1 != T.value) {
                    var A = {
                        type: T.type,
                        value: T.value
                    };
                    B.push(A)
                }
            }
            if (3 == B.length) 0 !== (I = this.Compare.getTypeEx(B)) && this.SetDaoPaiXing(this._tdLabel, I);
            else this.SetDaoPaiXing(this._tdLabel, 0)
        }
        console.log("onSheZhiTouchStart refreshMyPai "), this.refreshMyPai();
        var R = !1;
        for (r = 1; r < 14; r++) {
            var P = "pai" + r;
            if ((d = this.myPai.getChildByName(P)).active) break;
            R = !0;
            break
        }
        // this._btnCancer.active = R, this._btnOk.active = R
    },

    onTouchStart: function (e) {
        this.node.getChildByName("setType").getComponent("setType").preBtnTag = 0;
        var t = e.getLocation();
        this.startPos = t,
        this.movecount = 0,
        this.movecount1 = 0, 
        this.startPos.y > 100 ? this.bTouchPai = !1 : this.bTouchPai = !0
      //  cc.log('Y:'+t);
    },

    onTouchMove: function (e) {
        e.target;
        var t = e.getLocation();
        this.endPos = t;
        for (var a = this.arrMyPai.length, n = 0; n < a; n++) {
            var i = this.arrMyPai[n],
                s = i.position,
                o = this.myPai.convertToNodeSpaceAR(this.startPos),
                r = this.myPai.convertToNodeSpaceAR(this.endPos),
                c = new cc.rect(s.x, s.y, .65 * i.width, .65 * i.height);
            if (c.contains(o) || c.contains(r)) {
                this.arrMyPai[n].y <= this.norY ? (this.arrMyPai[n].y = this.addY, this.movecount1++) : this.movecount++;
                break
            }
        }
    },

    onTouchEnd: function (e) {
      //  cc.log('2');
        e.target;
        var t = e.getLocation();
        this.endPos = t;
        for (var a = this.arrMyPai.length, n = 0; n < a; n++) {
            var i = (l = this.arrMyPai[n]).position,
                s = this.myPai.convertToNodeSpaceAR(this.startPos),
                o = this.myPai.convertToNodeSpaceAR(this.endPos),
                r = {};
            (h = {}).x = s.x, h.y = s.y, r.x = o.x, r.y = o.y;
            var c = new cc.rect(i.x-(.5*l.width), i.y, .5*l.width, .65*l.height);
            if (c.contains(h) || c.contains(r)) {
                if (this.arrMyPai[n].y <= this.norY) this.arrMyPai[n].y = this.addY;
                else {
                    if (1 == this.movecount1) break;
                    if (this.arrMyPai[n].y === this.addY && (this.arrMyPai[n].y = this.norY, console.log("===4===========2")), 0 == this.movecount) break;
                    this.arrMyPai[n].y = this.norY, console.log("===4===========1")
                }
                break
            }
        }
        for (n = 0; n < a; n++) {
            var h, l = this.arrMyPai[n];
            s = this.myPai.convertToNodeSpaceAR(this.startPos), o = this.myPai.convertToNodeSpaceAR(this.endPos), r = {};
            (h = {}).x = s.x, h.y = s.y, r.x = o.x, r.y = o.y, (this.arrMyPaiPos[n].x > h.x && this.arrMyPaiPos[n].x < r.x || this.arrMyPaiPos[n].x < h.x && this.arrMyPaiPos[n].x > r.x) && (this.arrMyPai[n].y <= this.norY ? (this.arrMyPai[n].y = this.addY, console.log("=======================================1=============================================")) : (this.arrMyPai[n].y = this.norY, console.log("======================================2=============================================")))
        }
    },

    quickSwing: function (e) {
        this.initSheZhi(), this.arrMyPai = [], this.arrMyPaiPos = [];
        for (var t = 1; t <= 13; t++) {
            var a = "pai" + t;
            (c = this.myPai.getChildByName(a)).scale = .65, c.y = -110, c.x = 100 * t - 750, this.arrMyPaiPos.push(c.position), this.arrMyPai.push(c)
        }
        var n = this.myPai.getComponent("myPai");
        n.initDt(), n.setInfo(), this._tempHoldData = e;
        var i = e[0],
            s = e[1],
            o = e[2];
        o.sort(function (e, t) {
            return t.value - e.value
        }), s.sort(function (e, t) {
            return t.value - e.value
        }), i.sort(function (e, t) {
            return t.value - e.value
        }), this.cancelWD(), this.cancelZD(), this.cancelTD();
        for (t = 0; t < o.length && !(this.WDIndex > 4); t++) {
            (c = this.arrWDPai[this.WDIndex]).active = !0, c.getComponent("pai").setInfo(o[t]), this.setArrMyPai(o[t], !0), this.WDIndex++
        }
        for (t = 0; t < s.length && !(this.ZDIndex > 4); t++) {
            (c = this.arrZDPai[this.ZDIndex]).active = !0, c.getComponent("pai").setInfo(s[t]), this.setArrMyPai(s[t], !0), this.ZDIndex++
        }
        for (t = 0; t < i.length && !(this.TDIndex > 2); t++) {
            (c = this.arrTDPai[this.TDIndex]).active = !0, c.getComponent("pai").setInfo(i[t]), this.setArrMyPai(i[t], !0), this.TDIndex++
        }
        this.refreshQuickMyPai();
        var r = !1;
        for (t = 1; t < 14; t++) {
            var c;
            a = "pai" + t;
            if ((c = this.myPai.getChildByName(a)).active) break;
            r = !0;
            break
        }
        this._btnCancer.active = r, this._btnOk.active = r, this.bUpPai = !1
    },

    setAllDown: function () {
        if (this.arrMyPai)
            for (var e = 0; e < this.arrMyPai.length; e++) this.arrMyPai[e].y = this.norY
    },

    setUp: function (e) {//设置；
        if (null != e) {
            this.setAllDown();
            for (var t = [], a = 0; a < this.arrMyPai.length; a++) t.push(this.arrMyPai[a]);
            for (a = 0; a < e.length; a++)
                for (var n = e[a].type, i = e[a].value, s = 0; s < t.length; s++) {
                    var o = t[s].getComponent("pai").getData();
                    if (o.type === n && o.value === i) {
                        t[s].y = this.addY, t.splice(s, 1);
                        break
                    }
                }
        }
    },

    getUpPaiData: function () {//得到选中牌
        this.arrUpPai = [], this.arrUpPaiIndex = [];
        console.log(this.arrMyPai)
        for (var e = 0; e < this.arrMyPai.length; e++) {
            var t = this.arrMyPai[e].getComponent("pai").getData();
            this.arrMyPai[e].y === this.addY && 1 == this.arrMyPai[e].active && (this.arrUpPai.push(t), this.arrUpPaiIndex.push(e))
        }
        return this.arrUpPai
    },

    setArrMyPai: function (e, t) {//设置牌数组
        if (1 !== e.value) {
            var a = this.myPai.getComponent("myPai").getMyPaiData();
            if (t)
                for (var n = 0; n < a.length; n++) {
                    var i = a[n];
                    if (i.type === e.type && i.value === e.value) return void a.splice(n, 1)
                } else {
                var s = {};
                s.type = e.type, s.value = e.value, a.push(s)
            }
        }
    },

    refreshMyPai: function () {//
        var e = this.myPai.getComponent("myPai"),
            t = e.getMyPaiData();
        if (null != t) {
            if (cc.vv.gameNetMgr.specialType > 10) {
                var a = this.node.getChildByName("setType").getComponent("setType");
                13 == t.length ? (console.log("teshupai  显示"), a.xianshiteshupai(!0)) : (console.log("teshupai  隐藏"), a.xianshiteshupai(!1))
            }
            var n = 13 - t.length;
            e.sortPai(t);
            for (var i = 0; i < t.length; i++) this.arrMyPai[i].getComponent("pai").setInfo(t[i]), this.arrMyPai[i].active = !0;
            for (i = 0; i < n; i++) this.arrMyPai[i + t.length].getComponent("pai").setNullInfo(), this.arrMyPai[i + t.length].active = !1;
            this.setAllDown(), (a = this.node.getChildByName("setType").getComponent("setType")).setSpecialType(cc.vv.gameNetMgr.specialType), a.setPaiType(t)
        }
    },

    refreshQuickMyPai: function (e) {//刷新快速配牌
        var t = this.myPai.getComponent("myPai"),
            a = e;
        if (null == a) {
            var n = cc.vv.gameNetMgr.myHandCard.holds;
            seats[cc.vv.gameNetMgr.seatIndex];
            if (!(n && n.length > 0)) return;
            a = n
        }
        var i = 13 - a.length;
        t.sortPai(a);
        for (var s = 0; s < a.length; s++) this.arrMyPai[s].getComponent("pai").setInfo(a[s]), this.arrMyPai[s].active = !0;
        for (s = 0; s < i; s++) this.arrMyPai[s + a.length].getComponent("pai").setNullInfo(), this.arrMyPai[s + a.length].active = !1;
        this.setAllDown(), this.node.getChildByName("setType").getComponent("setType").getTypeEx(a)
    },

    automaticPai: function () {//自动摆牌
        for (var e = this.myPai.getComponent("myPai").getMyPaiData(), t = 0, a = 0, n = 0, i = 0; i < this.arrWDPai.length; i++) {

            // (r = this.arrWDPai[i]).getComponent("pai").setInfo({type: 1, value: i, isBB: false});  //设置数据

            (h = (c = (r = this.arrWDPai[i]).getComponent("pai")).getData()) && h.value > 1 && t++
            cc.log((r = this.arrWDPai[i]).getComponent("pai").getData());
        }
        for (i = 0; i < this.arrZDPai.length; i++) {
            (h = (c = (r = this.arrZDPai[i]).getComponent("pai")).getData()) && h.value > 1 && a++
        }
        for (i = 0; i < this.arrTDPai.length; i++) {
            (h = (c = (r = this.arrTDPai[i]).getComponent("pai")).getData()) && h.value > 1 && n++
        }
        if (!(parseInt(t) < 5 && parseInt(a) < 5 || parseInt(t) < 5 && parseInt(n) < 3 || parseInt(a) < 5 && parseInt(n) < 3) && (5 == e.length || e.length <= 3) && e.length > 0) {
            var s = 0;
            this.tdPaiArr = [], this.zdPaiArr = [], this.wdPaiArr = [];
            for (i = 0; i < this.arrWDPai.length && !(this.WDIndex > 4); i++) {
                if (null == (h = (c = (r = this.arrWDPai[i]).getComponent("pai")).getData()) || h.value <= 1) {
                    if (null == e[s].type) continue;
                    r.active = !0, h.value = e[s].value, h.type = e[s].type, h.isBB = !0, c.setInfo(h), this.WDIndex++ , s++
                }
                this.wdPaiArr.push(h)
            }
            if (5 == this.wdPaiArr.length) {
                var o = this.Compare.getTypeEx(this.wdPaiArr);
                this.SetDaoPaiXing(this._wdLabel, o)
            }
            for (i = 0; i < this.arrZDPai.length && !(this.ZDIndex > 4); i++) {
                if (null == (h = (c = (r = this.arrZDPai[i]).getComponent("pai")).getData()) || h.value <= 1) {
                    if (null == e[s].type) continue;
                    r.active = !0, h.value = e[s].value, h.type = e[s].type, h.isBB = !0, c.setInfo(h), this.ZDIndex++ , s++
                }
                this.zdPaiArr.push(h)
            }
            if (5 == this.zdPaiArr.length) {
                o = this.Compare.getTypeEx(this.zdPaiArr);
                this.SetDaoPaiXing(this._zdLabel, o)
            }
            for (i = 0; i < this.arrTDPai.length && !(this.TDIndex > 2); i++) {
                var r, c, h;
                if ((r = this.arrTDPai[i]).active = !0, null == (h = (c = r.getComponent("pai")).getData()) || h.value <= 1) {
                    if (null == e[s].type) continue;
                    h.value = e[s].value, h.type = e[s].type, h.isBB = !0, c.setInfo(h), this.TDIndex++ , s++
                }
                this.tdPaiArr.push(h)
            }
            if (3 == this.tdPaiArr.length) {
                o = this.Compare.getTypeEx(this.tdPaiArr);
                this.SetDaoPaiXing(this._tdLabel, o)
            }
            for (i = 0; i < 5; i++) e[0] && this.setArrMyPai(e[0], !0);
            3 === this.arrTDPai.length && this.sortPaiData(this.arrTDPai), 5 === this.arrZDPai.length && this.sortPaiData(this.arrZDPai), 5 === this.arrWDPai.length && this.sortPaiData(this.arrWDPai), this.refreshMyPai(), 0 === (e = this.myPai.getComponent("myPai").getMyPaiData()).length && (this.jsShezhipai ? 1 == this.jsShezhipai.onCheckDaoShui() && (this._btnCancer.active = !0, this._btnOk.active = !0) : (this._btnCancer.active = !0, this._btnOk.active = !0))
        }
    },

    cancelWD: function () {
        if (this.arrWDPai) {
            for (var e = !1, t = 4; t >= 0; t--) {
                var a = this.arrWDPai[t];
                if (null == a) {
                    console.log("取消尾道牌 ==   有空值    =");
                    break
                }
                var n = a.getComponent("pai");
                if (n.getIsSetInfo()) {
                    e = !0;
                    var i = n.getData();
                    i.isBB ? this.setArrMyPai(i, !1, !0) : this.setArrMyPai(i, !1), n.setNullInfo()
                } else n.setNullInfo()
            }
            this.WDIndex = 0, 1 == e && this.refreshMyPai()
        }
        this.SetDaoPaiXing(this._wdLabel, 0), this.wdPaiArr = []
    },

    cancelZD: function () {
        if (this.arrZDPai) {
            for (var e = !1, t = 4; t >= 0; t--) {
                var a = this.arrZDPai[t].getComponent("pai");
                if (a.getIsSetInfo()) {
                    e = !0;
                    var n = a.getData();
                    n.isBB ? this.setArrMyPai(n, !1, !0) : this.setArrMyPai(n, !1), a.setNullInfo()
                } else a.setNullInfo()
            }
            this.ZDIndex = 0, 1 == e && this.refreshMyPai()
        }
        this.SetDaoPaiXing(this._zdLabel, 0), this.zdPaiArr = []
    },

    cancelTD: function () {
        if (this.arrTDPai) {
            for (var e = !1, t = 2; t >= 0; t--) {
                var a = this.arrTDPai[t].getComponent("pai");
                if (a.getIsSetInfo()) {
                    e = !0;
                    var n = a.getData();
                    n.isBB ? this.setArrMyPai(n, !1, !0) : this.setArrMyPai(n, !1), a.setNullInfo()
                } else a.setNullInfo()
            }
            this.TDIndex = 0, 1 == e && this.refreshMyPai()
        }
        this.SetDaoPaiXing(this._tdLabel, 0), this.tdPaiArr = []
    },

    getNumSpriteByNum: function (e) {
        for (var t = 0; t < 10; t++)
            if (e === t) return n[t]
    },

    SetDaoPaiXing: function (e, t) {
        var a = "";
        switch (t) {
            case 1:
                a = "乌龙";
                break;
            case 2:
                a = "1对";
                break;
            case 3:
                a = "2对";
                break;
            case 4:
                a = "三条";
                break;
            case 5:
                a = "顺子";
                break;
            case 6:
                a = "同花";
                break;
            case 7:
                a = "葫芦";
                break;
            case 8:
                a = "铁支";
                break;
            case 9:
                a = "同花顺";
                break;
            case 10:
                a = "五同"
        }
        cc.log(e.parent);
        e.active = !0, e.getComponent(cc.Label).string = a
    },

    update: function (e) {
        // if (0 != cc.vv.gameNetMgr.conf.peipai && this.endTime > 0) {
        //     if (this.endTime = this.endTime - e, this.endTime < 0) return void (this.timenumber.getComponent(cc.Label).string = "00");
        //     if (this.timenumber) {
        //         var t = 0;
        //         t = this.endTime < 10 ? "0" + parseInt(this.endTime) : "" + parseInt(this.endTime), this.timenumber.getComponent(cc.Label).string = t
        //     }
        // }
    }

    //{
    //      Compare: "Compare"
    // update (dt) {},
});
