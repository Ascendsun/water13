


cc.Class({
    extends: cc.Component,
    properties: {
        tdNode: {
            type: cc.Node,
            default: null
        },
        zdNode: {
            type: cc.Node,
            default: null
        },
        wdNode: {
            type: cc.Node,
            default: null
        },
        tipnode: null,

    },

    onLoad: function () {
      //  this.emitter = cc.vv.emitter, 
        this.paiObjs = {}, this.tdPai = [], this.zdPai = [], this.wdPai = [];
        for (var t = 1; t <= 3; t++) {
            var a = "paiNode" + t,
                n = this.tdNode.getChildByName(a).getChildByName("pai");
            this.tdPai.push(n)
        }
        for (t = 1; t <= 5; t++) {
            a = "paiNode" + t, n = this.zdNode.getChildByName(a).getChildByName("pai");
            this.zdPai.push(n)
        }
        for (t = 1; t <= 5; t++) {
            a = "paiNode" + t, n = this.wdNode.getChildByName(a).getChildByName("pai");
            this.wdPai.push(n)
        }
        this.tipnode = this.node.getChildByName("tip"), this.tipnode.active = false 

       // this.Compare = e("Compare")
        //  var comp = require('Compare');
        // this.Compare = comp;
        //cc.log(this.Compare);

            // this.__initProps__(this.Compare);
            // try{
            // var cs=this.Compare.__ctors__;
            // cs[0].apply(this,arguments);
            // cs[1].apply(this,arguments);
            // }catch(e){
            // cc._throw(e);
            // }

    }, 

    reset: function () {
        if (this.node.parent.active = !1, this.wdPai)
            for (var e = 0; e < this.wdPai.length; e++) {
                this.wdPai[e].getComponent("pai").setNullInfo()
            }
        if (this.tdPai)
            for (var t = 0; t < this.tdPai.length; t++) {
                this.tdPai[t].getComponent("pai").setNullInfo()
            }
        if (this.zdPai)
            for (var a = 0; a < this.zdPai.length; a++) {
                this.zdPai[a].getComponent("pai").setNullInfo()
            }
        this.hildBtn()
    },

     onBtnOk: function () {
         cc.log('onBtnOk');
        for (var e = [], t = [], a = [], n = [], i = 0; i < this.tdPai.length; i++) {
            if ((s = this.tdPai[i].getComponent("pai")).getIsSetInfo()) (o = {}).type = s.paiDt.type, o.value = s.paiDt.value, t.push(o)
        }
        for (i = 0; i < this.zdPai.length; i++) {
            if ((s = this.zdPai[i].getComponent("pai")).getIsSetInfo()) (o = {}).type = s.paiDt.type, o.value = s.paiDt.value, a.push(o)
        }
        for (i = 0; i < this.wdPai.length; i++) {
            var s, o;
            if ((s = this.wdPai[i].getComponent("pai")).getIsSetInfo()) (o = {}).type = s.paiDt.type, o.value = s.paiDt.value, n.push(o)
        }
        n.length < 5 || a.length < 5 || t.length < 3 ? console.log("手牌需要满足13张") : (e.push(t), e.push(a), e.push(n), cc.vv.net.send("compare", e), cc.vv.seatcard.mySelfPai = e, this.reset())
    }, 

    onCheckDaoShui: function () {
        cc.log('onCheckDaoShui');
        for (var e = [], t = [], a = [], n = 0; n < this.tdPai.length; n++) {
            if ((i = this.tdPai[n].getComponent("pai")).getIsSetInfo()) (s = {}).type = i.paiDt.type, s.value = i.paiDt.value, e.push(s)
        }
        for (n = 0; n < this.zdPai.length; n++) {
            if ((i = this.zdPai[n].getComponent("pai")).getIsSetInfo()) (s = {}).type = i.paiDt.type, s.value = i.paiDt.value, t.push(s)
        }
        for (n = 0; n < this.wdPai.length; n++) {
            var i, s;
            if ((i = this.wdPai[n].getComponent("pai")).getIsSetInfo()) (s = {}).type = i.paiDt.type, s.value = i.paiDt.value, a.push(s)
        }


         cc.log(e+'   '+t+'   '+a+'   ');//

         var o = this.Compare.getType(e),
            r = this.Compare.getType(t),
            c = this.Compare.getType(a);
            // var o = this.Compare.getType([1,2,3]),
            // r = this.Compare.getType([4,5,6,7,8]),
            // c = this.Compare.getType([9,10,11,12,13]);


        if (o[0] > r[0]) {
            console.log("必须要头道xiao于中道xiao于尾道"), this.node.parent.getComponent("touch").cancelTD(), this.hildBtn();
            return this.tipnode.active = !0, this.tipnode.getChildByName("tipinfo").getComponent(cc.Label).string = "头道不能比中道大", this.scheduleOnce(this.hidetipinfo, 1), !1
        }
        if (r[0] > c[0]) {
            this.node.parent.getComponent("touch").cancelZD(), this.hildBtn(), console.log("必须要头道xiao于中道xiao于尾道");
            return this.tipnode.active = !0, this.tipnode.getChildByName("tipinfo").getComponent(cc.Label).string = "中道不能比尾道大", this.scheduleOnce(this.hidetipinfo, 1), !1
        }
        if (o[0] == r[0]) {
            if (1 == o[0]) {
                var h = this.MaxNum(e),
                    l = this.MaxNum(t);
                if (h.value > l.value) {
                    this.node.parent.getComponent("touch").cancelTD(), this.hildBtn();
                    return this.tipnode.active = !0, this.tipnode.getChildByName("tipinfo").getComponent(cc.Label).string = "头道不能比中道大", this.scheduleOnce(this.hidetipinfo, 1), !1
                }
            }
            if (this.Compare.compareSameType(e, t, o[0]) > 0) {
                this.node.parent.getComponent("touch").cancelTD(), this.hildBtn();
                return this.tipnode.active = !0, this.tipnode.getChildByName("tipinfo").getComponent(cc.Label).string = "头道不能比中道大", this.scheduleOnce(this.hidetipinfo, 1), !1
            }
        }
        if (r[0] == c[0] && this.Compare.compareSameType(t, a, r[0]) > 0) {
            this.node.parent.getComponent("touch").cancelZD(), this.hildBtn();
            return this.tipnode.active = !0, this.tipnode.getChildByName("tipinfo").getComponent(cc.Label).string = "中道不能比尾道大", this.scheduleOnce(this.hidetipinfo, 1), !1
        }
        return !0
    }, 

    MaxNum: function (e) {
        for (var t = e[0], a = 1; a < e.length; a++) e[a] > t && (t = e[a]);
        cc.log('MaxNum:'+t);
        return t
    }, 

    onBtnAllCancel: function () {
        cc.log('onBtnAllCancel');
        this.onBtnCancelTD(), this.onBtnCancelZD(), this.onBtnCancelWD()
    }, 
    
    onBtnCancelTD: function () {
        cc.log('onBtnCancelTD');
        cc.vv.audioMgr.playSFX("game/sssMusic/fangpai.mp3"), this.node.parent.getComponent("touch").cancelTD(), this.hildBtn()
    },
    
    onBtnCancelZD: function () {
        cc.log('onBtnCancelZD');
        cc.vv.audioMgr.playSFX("game/sssMusic/fangpai.mp3"), this.node.parent.getComponent("touch").cancelZD(), this.hildBtn()
    },
    
    onBtnCancelWD: function () {
        cc.log('onBtnCancelWD');
        cc.vv.audioMgr.playSFX("game/sssMusic/fangpai.mp3"), this.node.parent.getComponent("touch").cancelWD(), this.hildBtn()
    }, 
    
    onBtnQuickSwing: function () {
        cc.log('onBtnQuickSwing');
        cc.vv.net.send("quick_swing_request")
    }, 
    
    hildBtn: function () {
        cc.log('hildBtn');
        var e = this.node.getChildByName("btn_Cancel"),
            t = this.node.getChildByName("btn_Ok");
        e.active = !1, t.active = !1
    }, 
    
    compareSameType: function (e, t, a) {
        cc.log('compareSameType');
        if (6 === a) {
            for (var n = 0; n < e.length; n++) {
                if (e[n].value > t[n].value) return 1;
                if (e[n].value < t[n].value) return -1
            }
            return 0
        }
        var i = this.analysePai(e),
            s = this.analysePai(t),
            o = i.tongPai,
            r = s.tongPai;
        o.sort(function (e, t) {
            return t.count - e.count
        }), r.sort(function (e, t) {
            return t.count - e.count
        });
        var c = i.sanPai,
            h = s.sanPai,
            l = 0,
            d = o.length;
        if (d === r.length)
            for (var u = 0; u < d; u++)
                if (0 !== (l = this.comparDX(o[u].value, r[u].value))) return l;
        var g = c.length;
        if (g === h.length)
            for (u = 0; u < g; u++)
                if (0 !== (l = this.comparDX(c[u].value, h[u].value))) return l;
        return 0
    }, 
    
    analysePai: function (e) {
        cc.log('analysePai');
        for (var t = e.length, a = {
            sanPai: [],
            tongPai: []
        }, n = 0, i = 1, s = 0; s < t; ++s) {
            if (s >= t - 1) {
                if (i > 1) (o = {}).value = e[n].value, o.count = i, a.tongPai.push(o);
                break
            }
            if (e[n].value === e[s + 1].value)++i;
            else {
                var o;
                if (i > 1) (o = {}).value = e[n].value, o.count = i, a.tongPai.push(o);
                n = s + 1, i = 1
            }
        }
        for (s = 0; s < t; ++s) {
            for (var r = a.tongPai.length, c = !1, h = 0; h < r; ++h)
                if (e[s].value === a.tongPai[h].value) {
                    c = !0;
                    break
                }
            c || a.sanPai.push(e[s])
        }
        return a
    }, 
    
    comparDX: function (e, t) {
        cc.log('comparDX');
        return e > t ? 1 : e === t ? 0 : -1
    }, 
    
    hidetipinfo: function () {
        cc.log('hidetipinfo');
        this.tipnode.active = !1
    }
     
});



