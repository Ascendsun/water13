var ssCommon = require("ssCommon");
var chcode = require("modol");
cc.Class({
    extends: ssCommon,

    properties: {
    },

    // use this for initialization
    onLoad: function () {

    },

    onClick: function (event) {
        event.stopPropagation();
    },

    onCloseClick: function () {
        if (cc.ss.openwin.parent.getChildByName('clubzhanji') == null) {
            this.closeOpenWin();
            cc.ss.audio.playSFX("btn_click");
        } else {
            cc.ss.openwin.parent.getChildByName('bbs').destroy();
        }

    },

    onCloseopenwin: function(){
        cc.ss.audio.playSFX("btn_click");
        if(cc.ss.openwin != null){
            cc.ss.openwin.destroy();
            cc.ss.openwin = null;
        }
    },

    onShare_chart: function () {

        if (cc.ss.openwin.parent.getChildByName('clubzhanji') == null) {
            this.closeOpenWin();
            cc.ss.audio.playSFX("btn_click"); // 分享到好友聊天

            if (cc.sys.isBrowser) {
                cc.log('网页端不支持微信分享~');
                return;
            }
            var share_link = 'www.ascendsun.com';
            var title = '明牌牛牛';
            var desc = '全世界人民最喜好的牛牛游戏，承诺安全无外挂.';
            this.ShareToFriend(share_link, title, desc)
        }
    },

    onShare_friend: function () {
        if (cc.ss.openwin.parent.getChildByName('clubzhanji') == null) {
            this.closeOpenWin();
            cc.ss.audio.playSFX("btn_click");
            if (cc.sys.isBrowser) {
                cc.log('网页端不支持微信分享~');
                return;
            }
            var share_link = 'www.ascendsun.com';
            var title = '明牌牛牛';
            var desc = '全世界人民最喜好的牛牛游戏，承诺安全无外挂.';
            this.ShareToFriendCircle(share_link, title, desc)// 分享到朋友圈
        }
    },

    // 分享到好友聊天
    // @share_link 分享链接
    // @title 标题
    // @desc 分享内容
    ShareToFriend: function (share_link, title, desc) {
        var ANDROID_CLASS_NAME = "org/cocos/unkchess/wxapi/WXEntryActivity"
        var JAVA_STRING = "Ljava/lang/String;"
        var _type = 1 // 1:聊天分享  2:朋友圈分享
        var _methond_name = "ShareLinkToWeChat"
        var _methond_singnature = "(" + JAVA_STRING + JAVA_STRING + JAVA_STRING + "I)Z"
        jsb.reflection.callStaticMethod(ANDROID_CLASS_NAME, _methond_name, _methond_singnature, share_link, title, desc, _type)
    },

    // 分享到朋友圈
    // @share_link 分享链接
    // @title 标题
    // @desc 分享内容
    ShareToFriendCircle: function (share_link, title, desc) {
        var ANDROID_CLASS_NAME = "org/cocos/unkchess/wxapi/WXEntryActivity"
        var JAVA_STRING = "Ljava/lang/String;"
        this.Log("ShareToFriendCircle")
        var _type = 2 // 1:聊天分享  2:朋友圈分享
        var _methond_name = "ShareLinkToWeChat"
        var _methond_singnature = "(" + JAVA_STRING + JAVA_STRING + JAVA_STRING + "I)Z"
        jsb.reflection.callStaticMethod(ANDROID_CLASS_NAME, _methond_name, _methond_singnature, share_link, title, desc, _type)
    },


    onClosejiesan: function () {
        if (this.ready()) {
            var club = {
                extparams: {}
            };
            club.extparams.userid = cc.ss.user.id,
            club.extparams.roomid = chcode.moduleshuju.roomid;
            club.extparams.diss = 'noagree';
            cc.ss.socket.exec("raisehand", club);
        }
    },

    onClosejiesanyes: function(){
        if (this.ready()) {
            var club = {
                extparams: {}
            };
            club.extparams.userid = cc.ss.user.id,
            club.extparams.roomid = chcode.moduleshuju.roomid;
            club.extparams.diss = 'agree';
            cc.ss.socket.exec("raisehand", club);
        }
    },

    onCloseOpenwinto: function(){
        cc.ss.audio.playSFX("btn_click");
        if(cc.ss.openwinto != null){
            cc.ss.openwinto.destroy();
            cc.ss.openwinto = null;
        }
    }
});
