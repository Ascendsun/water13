var n = require("sssUtils"),
        i = require("Compare"),
        s = n.PaiType;
cc.Class({
    extends: cc.Component,
    properties: {
        specialType: 0
    },
    onLoad: function () {
        this.node.children;
        this.preBtnTag = 0, this.thisBtnTag = 0, this.Compare = require("Compare")
    }, 
    
    setSpecialType: function (e) {
        this.specialType = e
    }, 
    
    setPaiType: function (e) {
        this._myPai = [];
        for (var t = 0; t < e.length; t++) this._myPai.push(e[t]);
        var a;
        a = this.Compare.getType(e);
        for (var n = 0; n < this.node.children.length; n++) {
            var i = this.node.getChildByName("" + n),
                o = !1;
            if (a)
                for (var r = 0; r < a.length; r++)
                    if (n + 2 === a[r]) {
                        o = !0;
                        break
                    }
            i.active = o
        }
        var c = this.node.parent.getChildByName("shezhipai").getChildByName("teshupaidi");
        if (this.specialType > s.THS) {
            (i = this.node.getChildByName("9")).active = !0, c.active = !0, c.getChildByName("label").active = !0;
            var h = this.getCardTypeLabel(this.specialType);
            c.getChildByName("label").getComponent(cc.Label).string = h, i.getChildByName("label").getComponent(cc.Label).string = h
        } else c.active = !1, c.getChildByName("label").active = !1
    }, 
    
    xianshiteshupai: function (e) {
        var t = this.node.getChildByName("9"),
            a = this.node.parent.getChildByName("shezhipai").getChildByName("teshupaidi");
        a.active = e, 1 == e ? (t.opacity = 255, a.opacity = 255) : (t.opacity = 0, a.opacity = 0)
    }, 
    
    getTypeEx: function (e) {
        var t = [];
        t = i.getType(e);
        for (var a = 0; a < this.node.children.length; a++) {
            (n = this.node.getChildByName("" + a)).active = !1, t && -1 != t.indexOf(a + 2) && (n.active = !0)
        }
        if (this.specialType > s.THS) {
            var n;
            (n = this.node.getChildByName("9")).active = !0;
            var o = this.node.parent.getChildByName("shezhipai").getChildByName("teshupaidi");
            o.active = !0;
            var r = this.getCardTypeLabel(this.specialType);
            o.getChildByName("label").getComponent(cc.Label).string = r, n.getChildByName("label").getComponent(cc.Label).string = r
        }
    }, 
    
    getCardTypeLabel: function (e) {
        var t = "";
        return e == s.STH ? t = "三清" : e == s.SQTHS ? t = "三清+同花顺" : e == s.LDBZD ? t = "六对半+炸弹" : e == s.SSZ ? t = "三顺子" : e == s.LDB ? t = "六对半" : e == s.WDST ? t = "五对三条" : e == s.STST ? t = "四套三条" : e == s.QHEIYH ? t = "全黑一点红" : e == s.QHYHEI ? t = "全红一点黑" : e == s.QX ? t = "全小" : e == s.QD ? t = "全大" : e == s.QHEI ? t = "全黑" : e == s.QHONG ? t = "全红" : e == s.SSTHS ? t = "三顺+同花顺" : e == s.SFTX ? t = "三分天下" : e == s.STHS ? t = "三顺清" : e == s.SEHZ ? t = "十二皇族" : e == s.YTL ? t = "一条龙" : e == s.ZZQL ? t = "至尊清龙" : e == s.WTZ && (t = "五同钻"), t
    }, 
    
    onBtnClicked: function (e) {
        var t = (n = this.node.parent.getComponent("touch")).myPai.getComponent("myPai").getMyPaiData();
        // cc.vv.audioMgr.playSFX("game/sssMusic/fangpai.mp3");
        var pailist = [11,12,13,15,22,36,52,21,2,3,7,41,42];
        console.log((n = this.node.parent.getComponent("touch")))
        var a = parseInt(e.node.name.substr(e.node.name.length - 1,e.node.name.length)) + 2;
        if (a > s.WT) {
            var n;
            if (0 == this.node.getChildByName("9").opacity) return;
            return (n = this.node.parent.getComponent("touch")).shezhiPai.getComponent("shezhipai").reset(), cc.vv.net.send("special_card"), void (this.node.parent.getChildByName("shezhipai").getChildByName("teshupaidi").active = !1)
        }
        switch (a) {
            case s.YD:
                console.log("onBtnClicked type0");
                var i = !1;
                this.thisBtnTag = s.YD, (i = this.thisBtnTag === this.preBtnTag) || (this.Compare.b_obtainType = !0);
                var o = this.Compare.getDuiZi(t, i);
                n.setUp(o), this.preBtnTag = s.YD;
                break;
            case s.ED:
                console.log("onBtnClicked type1");
                i = !1;
                this.thisBtnTag = s.ED, 
                (i = this.thisBtnTag === this.preBtnTag) || (this.Compare.b_obtainType = !0);
                o = this.Compare.getLiangDui(pailist, i);
                n.setUp(o), this.preBtnTag = s.ED;
                break;
            case s.ST:
                console.log("onBtnClicked type2");
                i = !1;
                this.thisBtnTag = s.ST, (i = this.thisBtnTag === this.preBtnTag) || (this.Compare.b_obtainType = !0);
                for (var r = this.Compare.getSanTiao(t, i), c = 0, h = t.length - 1, l = []; c < 2 && h > 0;)
                    if (0 != t[h].type) {
                        for (var d = !0, u = 0; u < 3; u++)
                            if (r[u].value == t[h].value) {
                                d = !1;
                                break
                            }
                        if (0 == d) h--;
                        else {
                            if (l.length > 0 && l[0].value == t[h].value) {
                                h--;
                                continue
                            }
                            l.push(t[h]), h-- , c++
                        }
                    } else h--;
                l.length >= 2 && (r.push(l[l.length - 1]), r.push(l[l.length - 2]), n.setUp(r), this.preBtnTag = s.ST);
                break;
            case s.SZ:
                console.log("onBtnClicked type3");
                i = !1;
                this.thisBtnTag = s.SZ, (i = this.thisBtnTag === this.preBtnTag) || (this.Compare.b_obtainType = !0);
                var g = this.Compare.getShunZi(t, i, !1);
                n.setUp(g), this.preBtnTag = s.SZ;
                break;
            case s.TH:
                console.log("onBtnClicked type4");
                i = !1;
                this.thisBtnTag = s.TH, (i = this.thisBtnTag === this.preBtnTag) || (this.Compare.b_obtainType = !0);
                var v = this.Compare.getTongHua(t, i);
                n.setUp(v), this.preBtnTag = s.TH;
                break;
            case s.HL:
                console.log("onBtnClicked type5");
                i = !1;
                this.thisBtnTag = s.HL, (i = this.thisBtnTag === this.preBtnTag) || (this.Compare.b_obtainType = !0);
                var f = this.Compare.getHuLu(t, i);
                n.setUp(f), this.preBtnTag = s.HL;
                break;
            case s.TZ:
                console.log("onBtnClicked type6");
                i = !1;
                this.thisBtnTag = s.TZ, (i = this.thisBtnTag === this.preBtnTag) || (this.Compare.b_obtainType = !0);
                var p = this.Compare.getTieZhi(t, i);
                n.setUp(p), this.preBtnTag = s.TZ;
                break;
            case s.THS:
                console.log("onBtnClicked type7");
                i = !1;
                this.thisBtnTag = s.THS, (i = this.thisBtnTag === this.preBtnTag) || (this.Compare.b_obtainType = !0);
                var m = this.Compare.getTongHuaShun(t, i);
                n.setUp(m), this.preBtnTag = s.THS;
                break;
            case s.WT:
                console.log("onBtnClicked type8");
                i = !1;
                this.thisBtnTag = s.WT, (i = this.thisBtnTag === this.preBtnTag) || (this.Compare.b_obtainType = !0);
                var _ = this.Compare.getWuTong(t, i);
                n.setUp(_), this.preBtnTag = s.WT
        }

        //  Compare: "Compare",
        //  sssUtils: "sssUtils"
    }

});
