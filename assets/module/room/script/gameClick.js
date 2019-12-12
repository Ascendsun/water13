
cc.Class({
    extends: cc.Component,

    properties: {
    },


    //单击扑克牌
    onClickcard:function(){
        
    },

    onClickSetPeiPai: function () {
        if (cc.beimi.peipai.size() > 0) {
            this.peipai = cc.beimi.peipai.get();
            this.peipai.parent = cc.find("Canvas");
            console.log(this.peipai.getChildByName('script').getComponent('sssGameBase').loadHandCardPrefab())
        }
    },

    //单击配牌footer按钮
    onClickfooterbtn:function(){

    },

    start () {

    },

    // update (dt) {},
});
