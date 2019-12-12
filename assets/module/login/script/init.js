cc.Class({
    extends: cc.Component,

    properties: {
        _progress: 0.0,
        _splash: null,
        _isLoading: false,//是否成功加载

        loaddingPrefab: {
            default: null,
            type: cc.Prefab
        },
        alertPrefab: {
            default: null,
            type: cc.Prefab
        },

        // hall:{
        //     default:null,
        //     type:cc.Prefab
        // },

        // fivepersion:{
        //     default:null,
        //     type:cc.Prefab
        // }
    },

    onLoad: function () {
        if (!cc.sys.isNative && cc.sys.isMobile) {
            var canvas = this.node.getComponent(cc.Canvas);
            canvas.fitHeight = true;
            canvas.fitWidth = true;
        } else {
            cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
        }
        //通过设置设计分辨率和匹配模式来进行游戏画面的屏幕适配(视图的宽,视图的高,整个应用程序在指定的区域内的可见位置);;作用就是屏幕自适应
        let win = cc.winSize;
        cc.view.setDesignResolutionSize(win.width, win.height, cc.ResolutionPolicy.EXACT_FIT);
        this.initMgr();
    },

    
    start: function () { },
    initMgr: function () {
        if (cc.ss == null) {

            cc.ss = {};
            cc.ss.routes = {};
            cc.ss.event = {};
            cc.ss.gameNetMgr={};
            cc.ss.seatcard={};
            cc.ss.offline= null;
            cc.ss.seckey = "beimi";
            cc.ss.CHANNEL ="sss";
            
            cc.ss.http = require("HTTP");
            cc.ss.authorization = ""; //TOKEN
            cc.ss.gamestatus = "none";//可选值：ready|notready|playing

            var s = require("socket.io");
            cc.ss.io = new s(); 
   
            cc.log('创建了gamenetmgr');
            var t = require("UserMgr");
            cc.ss.userMgr = new t;

            var r = require("ReplayMgr");
            cc.ss.replayMgr= new r;
            cc.log('创建了ReplayMgr');

            cc.ss.http = require("HTTP");
            cc.ss.LOGIN_IP_IDX = 0,
            cc.sys.localStorage.getItem("LOGIN_IP_IDX") && (cc.ss.LOGIN_IP_IDX = cc.sys.localStorage.getItem("LOGIN_IP_IDX")),
            cc.ss.http.setLoginIP();

            var s = require("Net");
            cc.ss.net = new s();  

            var h = require("Utils");
            cc.ss.utils = new h();
            cc.log('创建了Utils');

            cc.args = function() {
                var e, t, a = {};
                if (cc.sys.isNative) return a;
                if (null == window.location) return a;
                for (var n = window.location.href,
                i = n.indexOf("?"), s = n.indexOf("#"), o = (n = s > 0 && s > i + 1 ? n.substr(i + 1, s - i - 1) : n.substr(i + 1)).split("&"), r = 0; r < o.length; r++)(i = o[r].indexOf("=")) > 0 && (e = o[r].substring(0, i), t = o[r].substr(i + 1), a[e] = t);
                var c = window.location.hash;
                if (null != (c = decodeURIComponent(c)) && void 0 != c && "" != c) {
                    var h = c.substr(1);
                    if (h && "" != h) {
                        var l = null;
                        try {
                            l = JSON.parse(h)
                        } catch(e) {}
                        for (var d in l) l[d] && (a[d] = l[d])
                    }
                }
                return a
            } (),

            
            cc.ss.audiolist = new Array();
            var Audio = require("Audio");
            cc.ss.audio = new Audio();
            cc.ss.audio.init();


            cc.ss.alert = new cc.NodePool();    //创建对象缓存池
            cc.ss.alert.put(cc.instantiate(this.alertPrefab)); // 创建节点
            cc.ss.gameRoom = {gametity : '10局',playahand : '30秒',horsecard : '黑桃A',onlooker : '允许围观'};
            cc.ss.openwin_to = null; //弹出的二级菜单
            cc.ss.openwin_three = null; //弹出的三级菜单
            cc.ss.loadding = new cc.NodePool();  
            cc.ss.loadding.put(cc.instantiate(this.loaddingPrefab)); 
            let enemy =cc.ss.loadding.get();
            enemy.parent = cc.find("start"); //载入  入口 

            
            // cc.ss.loadding = new cc.NodePool(); //游戏大厅
            // cc.ss.loadding.put(cc.instantiate(this.hall)); 
            // cc.ss.dialog = null;   //弹出的提示对话框，  alert
            // load.parent=cc.instantiate(this.loaddingPrefab);
            // load.active= true;
            // enemy = cc.instantiate(this.loaddingPrefab);
            // enemy.parent = this; // 将生成的敌人加入节点树
            // enemy.getComponent('init').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
            // }
            //load.getComponent("start").init();
            //cc.ss.gameNetMgr = {};
            // cc.ss.reconnect = false;           
            //cc.ss.audiostatus = false;
            // cc.ss.openwin = null;  //弹出的对话窗口，    设置、玩法、战绩等等
            //cc.ss.openwinto = null; //弹出的二级菜单
            //cc.ss.loginment = null;
            //cc.ss.imgresource = [];
            //cc.ss.peipai = new cc.NodePool();
            //cc.ss.peipai.put(cc.instantiate(this.peipai));
            //cc.ss.dialog = new cc.NodePool();    //创建对象缓存池
            //cc.ss.dialog.put(cc.instantiate(this.alertPrefab)); // 创建节点
            // var node = require("sssGameNetMgr"); 
            // var nodejs = new node;
            // cc.beimi.gameNetMgr = nodejs ;  
            // var node = require("Compare"); 
            // var nodejs = new node();
            // cc.beimi.Compare = nodejs ;  
            // cc.beimi.agora = null;
            // this.loginFormPool = new cc.NodePool();
            // this.loginFormPool.put(cc.instantiate(this.prefab)); // 创建节点
            // cc.beimi.game = {
            //     model: null,
            //     playway: null,
            //     type: function (name) {
            //         var temp;
            //         if (cc.beimi.games != null) {
            //             for (var i = 0; i < cc.beimi.games.length; i++) {
            //                 var gamemodel = cc.beimi.games[i];
            //                 for (var inx = 0; inx < gamemodel.types.length; inx++) {
            //                     var type = gamemodel.types[inx];
            //                     if (type.code == name) {
            //                         temp = type;
            //                     }
            //                 }
            //             }
            //         }
            //         return temp;
            //     }
            // };
            // cc.ss.audio.playBGM("audio/ox_bgm_game1");
        }
    }

});

