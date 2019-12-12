cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function () {
        this.paiDt = this.paiDt || {
            type: 1,
            value: 1,
            isBB: !1
        }, 
        this.bSetInfo = !1
    },

    setInfo: function (e) {
        void 0 !== e ? (this.paiDt = this.paiDt || {
            type: 1,
            value: 1,
            isBB: !1
        }, this.paiDt.type = e.type,
            this.paiDt.value = e.value,
            this.paiDt.isBB = e.isBB,
            this.drawCard(this.node, e),
            this.bSetInfo = !0) : console.log("setInfo data is undefined")
    },

    setNullInfo: function () {
        this.paiDt = {
            type: 1,
            value: 1,
            isBB: !1
        }, this.node.active = !1, this.bSetInfo = !1
    },

    getData: function () {
        cc.log('getData');
        return this.paiDt ? this.paiDt : (this.paiDt = this.paiDt || {
            type: 1,
            value: 1,
            isBB: !1
        }, this.bSetInfo = !1, this.paiDt)
    },

    getIsSetInfo: function () {
        return this.bSetInfo
    },


    drawCard: function (painode, value) {

     // var cls = new netMgr(arguments);
     cc.ss.gameNetMgr.drawCard(painode, value);

    }


    // }), cc._RF.pop()
    // }, 
    // {
    //     sssUtils: "sssUtils"
    // }
    //],

});
