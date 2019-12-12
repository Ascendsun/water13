var ssCommon = require("ssCommon");

cc.Class({
    extends: ssCommon,

    properties: {
       
    },

 
    onLoad () {
        this.initlist();
    },

    initlist: function(){
        cc.ss.gamestatus = null;
        if (this.ready()) {
            cc.loader.loadRes('prefab/chengyuanclub', function (err, prefab) {
                var prendoe = cc.instantiate(prefab);
                prendoe.parent = cc.find('Canvas');
                cc.find('Canvas/chengyuanclub/sprite_splash').getComponent(cc.Widget).target = cc.find('Canvas');
                cc.find('Canvas/chengyuanclub/sprite_splash').getComponent(cc.Widget).isAlignLeft = true;
                cc.find('Canvas/chengyuanclub/sprite_splash').getComponent(cc.Widget).isAlignRight = true;

                // cc.find('Canvas/chengyuanclub/clubhalldata').x = (-(cc.find('Canvas').width / 2));
                cc.find('Canvas/chengyuanclub/clubhalldata').x = cc.find('Canvas/chengyuanclub/clubhalldata').x + cc.find('Canvas/chengyuanclub/clubhalldata').width + 20;
                cc.find('Canvas/chengyuanclub/clubhalldata').y = cc.find('Canvas/content/first/club/kclub').y + (cc.find('Canvas/chengyuanclub/clubhalldata').height / 2);

                var lnode = cc.find('Canvas/chengyuanclub/clubhalldata/loadingimg');//载入转圈
                var opa = cc.tween(lnode)
                    .to(0, { angle: 0 })
                    .to(1, { angle: 360 });
                //   var px =  cc.find('Canvas').width/2;
                //   var pxt = px - (px-cc.find('Canvas/chengyuanclub/clubhalldata').width);

                // cc.tween(cc.find('Canvas/chengyuanclub/clubhalldata'))
                //     .to(0.3, { position: cc.v2(cc.find('Canvas/chengyuanclub/clubhalldata').x + cc.find('Canvas/chengyuanclub/clubhalldata').width + 20, cc.find('Canvas/content/first/club/kclub').y + (cc.find('Canvas/chengyuanclub/clubhalldata').height / 2)) })//划入右边侧边栏
                //     .call(() => {
                        var club = {
                            extparams: {}
                        };
                        club.extparams.userid = cc.ss.user.id;
                        club.extparams.clubtype = 'pclub';
                        cc.ss.socket.exec("clublist", club);
                        cc.tween()
                            .then(opa)
                            .repeat(10)//循环播放转圈；
                            .call(() => {
                                var node = cc.find('Canvas/chengyuanclub/clubhalldata/loadingimg');
                                if (node == null) { return };
                                if (node.active == true) {//转动10秒没有被关闭认定为本地检查超时
                                    node.active = false;
                                    console.log('请求超时：5');
                                }
                            })
                            .start();
                    })
            //         .start();
            // })
        }
    }

    // start () {

    // },

    // update (dt) {},
});
