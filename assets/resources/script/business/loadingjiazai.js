var ssCommon = require("ssCommon");

cc.Class({
    extends: ssCommon,

    properties: {
        jindutiao: {
            default: null,
            type: cc.ProgressBar
        },

        jindunumber: {
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

         this.jiazai();

    },


    jiazai: function () {
        if (cc.find('Canvas/loginone').isValid == true) {
            let self = this;
            // var mhid = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getUuid", "()Ljava/lang/String;");
            cc.loader.loadResDir('images', cc.SpriteFrame, function (numone, numto, numthree) {
                // self.jindutiao.progress = numone / numto;
                self.jindunumber.string = (numone / numto * 100).toFixed(0) + '%';
            }, function (err, assets, urls) {
                // var ac = '789456';
                // var jiazai = require('loadingjiazai');
                // let jiazajs = new jiazai();
                // var tokenid = cc.sys.localStorage.getItem('tokenid');
                // var xhr = cc.beimi.http.httpGet("/api/find?macid=" + ac + '&token=' +tokenid, jiazajs.acsucess, jiazajs.acerror, jiazajs);  
                cc.beimi.imgresource = assets;
                // console.log(cc.beimi.resource);
                // var node = cc.find('Canvas/loginone');
                // if (cc.sys.os === cc.sys.OS_ANDROID) {
                //     cc.tween(node)
                //         .to(0.6, { opacity: 0 })
                //         .call((node) => {
                //             node.destroy();
                //             var update = require('update');
                //             let updatejs = new update();
                //             updatejs.checkForUpdate();
                //         })
                //         .start();
                // }

            });
        }

    },

    fasonginput: function () {

        // //调用
        var Request = new Object();
        Request = this.GetRequest();
        console.log(Request)
        var macid = cc.find('Canvas/loginone/inputnode').getComponent(cc.EditBox).string;
        var tokenid = cc.sys.localStorage.getItem('tokenid');
        if(Request != null && Request.roomid != null){
            var xhr = cc.beimi.http.httpGet("/api/find?macid=" + macid + '&token=' + tokenid + '&roomid=' + Request.roomid, this.acsucess, this.acerror, this);
        }else{
            var xhr = cc.beimi.http.httpGet("/api/find?macid=" + macid + '&token=' + tokenid, this.acsucess, this.acerror, this);
        }
    },

    GetRequest: function () {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            var stri = '/';
            for (var i = 0; i < strs.length; i++) {
                var inxone = decodeURI(strs[i].split("=")[1]);
                var start = inxone.length - stri.length;
                var arr = inxone.substr(start, stri.length);
                if (arr == stri) {
                    inxone = inxone.substr(0,inxone.length - 1);
                }
                theRequest[strs[i].split("=")[0]] = inxone;
            }
        }
        return theRequest;
    },

    acsucess: function (result, object) {
        let self = this;
        var data = JSON.parse(result);
        console.log('loadding登录:' + data);
        console.log(data);
        if (data.status == false) {
            cc.find('Canvas/loginone').destroy();
        } else {
            if (data.submsg != 'online') {
                //放在全局变量
                object.reset(data, result);
                cc.beimi.gamestatus = data.data.gamestatus;
                object.connect();

                // window.io.on("repeatroom", function (result) {
                //     let data = JSON.parse(result);
                //     if (data.repeat == false) {
                //         object.scene(cc.beimi.gametype, object)
                //     } else if(data.repeat == true){
                //         // chcode.backroom = data;
                //         cc.beimi.gamestatus = "playing";
                //         cc.beimi.backdata = data;
                //         object.scene('douniu', object);
                //     } else if(data.repeat == null){
                //         object.scene(cc.beimi.gametype, object)
                //     }
                // });
            } else {
                console.log('账号已登录');

            }

        }


    },

    acerror: function (object) {
        object.alert("网络异常，服务访问失败");
    },

    // this.count = 0;
    // this.callback = function () {
    //     if (this.count === 10) {
    //         // 在第六次执行回调时取消这个计时器
    //         this.unschedule(this.callback);
    //         console.log('计时结束')
    //     }
    //     // this.doSomething();
    //     this.count++;
    //     console.log(this.count);
    //     // this.yuanxing.
    // }
    // this.schedule(this.callback, 0.01,cc.macro.REPEAT_FOREVER,0);

    onClickmiaobiao: function () {
        var one = cc.tween(this.miaobiao)
            .to(0, { opacity: 255, angle: 0 })
            .to(0.05, { opacity: 255, angle: -15 })
            .to(0.05, { opacity: 255, angle: 15 })
            .to(0.05, { opacity: 255, angle: 0 })
            .start()
        var to = cc.tween(this.xuhua)
            .to(0, { opacity: 0, angle: 0, scale: 1 })
            .to(0.1, { opacity: 130, angle: -40, scale: 1.2 })
            .to(0.1, { opacity: 130, angle: 40, scale: 1.2 })
            .to(0.05, { opacity: 130, angle: 0, scale: 1.2 })
            .to(0.3, { opacity: 0, scale: 1.5 })
            .start()


    },



    // start () {

    // },

    // update (dt) {
    // },
});

