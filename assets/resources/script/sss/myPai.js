
cc.Class({
    extends: cc.Component,
    properties: {
        baiBianPaiAtlas: {
            default: null,
            type: cc.SpriteAtlas
        }
    },

    onLoad: function () { 
   
    },

    initDt: function () {
        this.arrPai = [];
        for (var e = 1; e <= 13; e++) {
            var t = "pai" + e,
                a = this.node.getChildByName(t);
            this.arrPai.push(a)//13张牌放到数据列队
        }

        this.setInfo();
    },

    setInfo: function () {
       //if (cc.vv.gameNetMgr.seats) {
               
                //  myHandCard = {
                //     holds: [],
                //     specialData: [],
                //     type: 0
                // },
        
           // var e = cc.vv.gameNetMgr.myHandCard.holds;//取到手牌本剧

           var allpai=[];
           for ( var i=0;i<13;i++ ){
                allpai[i] = {
                    type: 1,
                    value: i+2,
                    isBB: false
                }
           }
 
            if (allpai.length < 1) return false;
            var t = this.arrPai.length;
            this.myPaiData = [];//我的牌数据
            for (var a = 0; a < t; a++) {
                cc.ss.gameNetMgr.drawCard(this.arrPai[a], allpai[a]),//这里是处理界面显示状态
               // cc.log(allpai[a]);
                this.arrPai[a].getComponent("pai").setInfo(allpai[a]),//写入牌数据
                this.myPaiData.push(allpai[a]), 
                this.arrPai[a].active = true 
            }
            return !0
     // }
    },

    getMyPaiData: function () {
        console.log('mypaiData:'+this.myPaiData);//得到我的牌数据,没有数据获取到数据这里变成了null
        return this.myPaiData
    },

    setMyPaiData: function (e) {
        this.myPaiData = [];
        for (var t = 0; t < e.length; t++) this.myPaiData.push(e[t])
        console.log('mypaidata')
        console.log(this.myPaiData)
    },

    sortPai: function (e) {
        e && e.sort(function (e, t) {
            var a = t.value - e.value,
                n = e.type - t.type;
            return 0 != parseInt(a) ? a : n
        })
    },

    sortPaiHuaSe: function (e) {
        for (var t = [], a = [], n = 0; n < e.length; n++) t.push(e[n]);
        t.sort(function (e, t) {
            return t.value - e.value
        });
        for (var i = 0; i <= 4; i++)
            for (var s = 0; s < t.length; s++) t[s].type == i && a.push(t[s]);
        return a
    }
    // update (dt) {},
});
