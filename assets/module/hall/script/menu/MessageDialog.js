
cc.Class({
    extends: cc.Component,

    properties: {
        title_message: {
            default: null,
            type: cc.Node
        },
        title_contact: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad : function() {
        this.title_contact.active = false ;

        this.title_message.active = true ;
        /**
         * 从远程加载数据，如果加载数据失败，则显示提示消息，并注册拖动刷新事件
         */
    },
    onContacts:function(){
        this.title_contact.active = true ;

        this.title_message.active = false ;
    },
    onMessage:function(){
        this.title_contact.active = false ;

        this.title_message.active = true ;
    }


    // update (dt) {},
});
