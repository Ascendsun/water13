var ssCommon = require("ssCommon");
cc.Class({
    extends: ssCommon,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        /**
         * 适配屏幕尺寸
         */
        this.resize();
        this.getroomcard();
    },
    onClickDizhu: function () {
        this.loadding();
        let object = this;
        setTimeout(function () {
            object.scene("dizhu", object);
        }, 200);
    },
    getroomcard: function () {
        if (this.ready()) {
            var club = {
                extparams: {}
            };
            club.extparams.getgold = 'getgold';
            club.extparams.userid = cc.ss.user.id,
                cc.ss.socket.exec("refreshgold", club);
        }
    },
    setroomcard: function(data,content){
        var data = JSON.parse(data);
        console.log('返回大厅参数');
        console.log(data);
        cc.ss.user.goldcoins = data.goldcoins;
        cc.ss.user.diamonds = data.diamonds;
        cc.find('Canvas/global/main/user/goldwai/goldnum').getComponent(cc.Label).string = data.goldcoins;
        cc.find('Canvas/global/main/user/用户栏-房卡底框/card').getComponent(cc.Label).string = data.diamonds;

        if (data.goldcoins > 9999) {
            var num = data.goldcoins / 10000;
            cc.find('Canvas/global/main/user/goldwai/goldnum').getComponent(cc.Label).string = num.toFixed(2) + '万';
        } else {
            cc.find('Canvas/global/main/user/goldwai/goldnum').getComponent(cc.Label).string = data.goldcoins;
        }

        if (data.diamonds > 9999) {
            var num = data.diamonds / 10000;
            cc.find('Canvas/global/main/user/用户栏-房卡底框/card').getComponent(cc.Label).string = num.toFixed(2) + '万';
        } else {
            cc.find('Canvas/global/main/user/用户栏-房卡底框/card').getComponent(cc.Label).string = data.diamonds;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
