var ssCommon = require("ssCommon");

cc.Class({
    extends: ssCommon,

    properties: {

        //大厅
        datingnode: {
            default: null,
            type: cc.Node,
            tooltip: '大厅的节点'
        },

        //开房
        openroom: {
            default: null,
            type: cc.Node,
            tooltip: '开房的节点'
        },

        //充值
        recharge: {
            default: null,
            type: cc.Node,
            tooltip: '充值的节点'
        },

        //签到
        sign: {
            default: null,
            type: cc.Node,
            tooltip: '签到的节点'
        },

        //发现
        discover: {
            default: null,
            type: cc.Node,
            tooltip: '发现的节点'
        },

        //我的
        Mymessage: {
            default: null,
            type: cc.Node,
            tooltip: '我的'
        },

        //意见反馈
        feedback: {
            default: null,
            type: cc.Node,
            tooltip: '意见反馈节点'
        },

        //服务条款
        terms: {
            default: null,
            type: cc.Node,
            tooltip: '服务条款节点'
        },

        //联系客服
        callservice: {
            default: null,
            type: cc.Node,
            tooltip: '联系客服节点'
        },

        //战绩
        standings: {
            default: null,
            type: cc.Node,
            tooltip: '战绩的节点'
        },

        //战绩二级页面
        standings_second: {
            default: null,
            type: cc.Prefab,
            tooltip: '战绩二级页面'
        },

        //战绩三级页面
        standings_three: {
            default: null,
            type: cc.Prefab,
            tooltip: '战绩三级页面'
        }


    },


    // use this for initialization
    onLoad: function () {

    },

    //战绩
    onClick_exploits: function () {
        var data = [
            {
                roomid: '123456',
                integral: '99',
                time: '2019-10-11 14:14:14',
                content:
                {
                    roomid: '123456',
                    gamesum: '10',
                    persionsum: '5',
                    sparrow: '黑桃A',
                    content: [
                        {
                            gamesum: '第一局',
                            result: [
                                {
                                    username: '就是这样',
                                    score: '10',
                                }
                            ],
                            content: {

                                gamesum: '第一局',
                                result: [
                                    {
                                        username: '就是这样',
                                        toudao: [1, 2, 3],
                                        zhongdao: [4, 5, 6, 7, 8],
                                        weidao: [9, 10, 11, 12, 13],
                                        toutype: '-9',
                                        zhongtype: '-10',
                                        weitype: '11',
                                        score: '10'
                                    }
                                ]

                            }
                        }
                    ]
                }

            }
        ]
        cc.log(JSON.stringify(data));
        this.standings.children[2].children[0].children[1].children[1].children[0].children[0].children[0].active = false;
        for (var inx = 0; inx < data.length; inx++) {
            var node = cc.instantiate(this.standings.children[2].children[0].children[1].children[1].children[0].children[0].children[0]);
            node.getChildByName('fh_num').getComponent(cc.Label).string = data[inx].roomid;
            node.getChildByName('jf_num').getComponent(cc.Label).string = data[inx].integral;
            node.getChildByName('sj_num').getComponent(cc.Label).string = data[inx].time;
            var nodec = new cc.Node();
            nodec.name = 'content';
            nodec.active = false;
            nodec.addComponent(cc.Label);
            nodec.getComponent(cc.Label).string = JSON.stringify(data[inx].content);
            nodec.parent = node;
            node.active = true;
            node.parent = this.standings.children[2].children[0].children[1].children[1].children[0].children[0];
        }

        this.onClicktoggle_closenode();
        this.standings.active = true;
    },

    //大厅
    onClick_hall: function () {
        this.onClicktoggle_closenode();
        this.datingnode.active = true;
    },

    //开房
    onClick_checkin: function () {
        this.onClicktoggle_closenode();
        this.openroom.active = true;
        // this.addAlter();
        // this.addLoadding();
    },

    //充值
    onClickfooter_recharge: function () {
        this.onClicktoggle_closenode();
        this.recharge.active = true;
    },

    //点击签到
    onClicksign: function () {
        this.onClicktoggle_closenode();
        this.sign.active = true;
    },

    //发现
    onClick_discover: function () {
        this.onClicktoggle_closenode();
        this.discover.active = true;
    },

    //我的
    onClick_mine: function () {
        this.onClicktoggle_closenode();
        this.Mymessage.active = true;
    },

    //点击意见反馈
    onClick_feedback: function () {
        this.Mymessage.active = false;
        this.feedback.active = true;
    },

    //点击服务条款
    onClick_terms: function () {
        this.terms.active = true;
        this.Mymessage.active = false;
    },

    //点击联系客服
    onClick_callservice: function () {
        this.callservice.active = true;
        this.Mymessage.active = false;
    },

    //返回上一级菜单
    onClick_Backup: function (event) {
        event.target.parent.active = false;
        this.Mymessage.active = true;
    },

    //点击战绩里边的详情
    onClick_second: function (event) {

        var content = JSON.parse(event.currentTarget.getChildByName('content').getComponent(cc.Label).string);
        console.log(content);
        var node = cc.instantiate(this.standings_second);
        node.children[1].children[1].getChildByName('fh_num').getComponent(cc.Label).string = content.roomid;
        node.children[1].children[1].getChildByName('js_num').getComponent(cc.Label).string = content.gamesum;
        node.children[1].children[1].getChildByName('rs_num').getComponent(cc.Label).string = content.persionsum;
        node.children[1].children[1].getChildByName('mq_num').getComponent(cc.Label).string = content.sparrow;

        for (var inx = 0; inx < content.content.length; inx++) {
            var newlist = cc.instantiate(node.children[1].children[5].children[0].children[0].children[0]);
            newlist.active = true;
            newlist.getChildByName('inning_font').getComponent(cc.Label).string = content.content[inx].gamesum;
            var xinnode = new cc.Node();
            xinnode.name = 'content';
            xinnode.addComponent(cc.Label);
            xinnode.getComponent(cc.Label).string = JSON.stringify(content.content[inx].content);
            xinnode.parent = newlist;
            newlist.parent = node.children[1].children[5].children[0].children[0];
            for (var inxc = 0; inxc < content.content[inx].result.length; inxc++) {
                var newnode = cc.instantiate(node.children[1].children[3].children[0].children[0]);
                newnode.active = true;
                newnode.children[0].getComponent(cc.Label).string = content.content[inx].result[inxc].username;
                newnode.parent = node.children[1].children[3].children[0];
                var newsco = cc.instantiate(newlist.children[2].children[0]);
                newsco.active = true;
                newsco.children[0].getComponent(cc.Label).string = content.content[inx].result[inxc].score;
                newsco.parent = newlist.children[2];
            }

        }
        cc.ss.openwin_to = node;
        cc.ss.openwin_to.parent = cc.find('Canvas');
        this.Adaptive(cc.ss.openwin_to);
    },

    //点击战绩二级菜单里边的详情
    onClick_three: function (event) {
        var content = JSON.parse(event.currentTarget.getChildByName('content').getComponent(cc.Label).string);
        console.log(content);
        var node = cc.instantiate(this.standings_three);
        node.children[1].children[1].getComponent(cc.Label).string = content.gamesum;
        for(var inx = 0; inx < content.result.length; inx++){
            var newnode = cc.instantiate(node.children[1].children[3].children[0].children[0].children[0]);
            newnode.active = true;
            newnode.getChildByName('username').getComponent(cc.Label).string = content.result[inx].username;
            for(let inxa = 0; inxa < content.result[inx].toudao.length; inxa++){
                cc.loader.loadRes('images/atlas/node_handcard1/poke'+content.result[inx].toudao[inxa],cc.SpriteFrame,function(err,SpriteFrame){
                    newnode.children[1].getChildByName('toudao').children[inxa].getComponent(cc.Sprite).spriteFrame = SpriteFrame;
                });
            }
            for(let inxb = 0; inxb < content.result[inx].zhongdao.length; inxb++){
                cc.loader.loadRes('images/atlas/node_handcard1/poke'+content.result[inx].zhongdao[inxb],cc.SpriteFrame,function(err,SpriteFrame){
                    newnode.children[1].getChildByName('zhongdao').children[inxb].getComponent(cc.Sprite).spriteFrame = SpriteFrame;
                });
            }
            for(let inxc = 0; inxc < content.result[inx].weidao.length; inxc++){
                cc.loader.loadRes('images/atlas/node_handcard1/poke'+content.result[inx].weidao[inxc],cc.SpriteFrame,function(err,SpriteFrame){
                    newnode.children[1].getChildByName('weidao').children[inxc].getComponent(cc.Sprite).spriteFrame = SpriteFrame;
                });
            }

            newnode.getChildByName('tou_type').getComponent(cc.Label).string = content.result[inx].toutype;
            newnode.getChildByName('zhong_type').getComponent(cc.Label).string = content.result[inx].zhongtype;
            newnode.getChildByName('wei_type').getComponent(cc.Label).string = content.result[inx].weitype;
            newnode.getChildByName('defen').getComponent(cc.Label).string = content.result[inx].score;
            newnode.parent = node.children[1].children[3].children[0].children[0];
        }
        cc.ss.openwin_three = node;
        cc.ss.openwin_three.parent = cc.find('Canvas');
        this.Adaptive(cc.ss.openwin_three);
    },

    //关闭二级，三级菜单
    onCloseOpenWin: function (event, content) {
        if (content == 1) {
            cc.ss.openwin_to && cc.ss.openwin_to.destroy();
        } else if (content == 2) {
            cc.ss.openwin_three && cc.ss.openwin_three.destroy();
        }
    },

    //点击footer内的按钮关闭datingnode and openroom
    onClicktoggle_closenode: function () {
        this.datingnode.active = false;
        this.openroom.active = false;
        this.recharge.active = false;
        this.sign.active = false;
        this.discover.active = false;
        this.Mymessage.active = false;
        this.standings.active = false;
    },

    //cc.ss.openwin 里边适配用
    //cc.ss.alert 里边适配用
    Adaptive: function (event, content) {
        if (content == null) {
            if (event) {
                if (event.getChildByName('block').getComponent(cc.Widget) != null) {
                    event.getChildByName('block').getComponent(cc.Widget).target = cc.find('Canvas');
                    event.getChildByName('block').getComponent(cc.Widget).isAlignLeft = true;
                    event.getChildByName('block').getComponent(cc.Widget).isAlignTop = true;
                    event.getChildByName('block').getComponent(cc.Widget).isAlignRight = true;
                    event.getChildByName('block').getComponent(cc.Widget).isAlignBottom = true;
                } else {
                    event.getChildByName('block').getComponent(cc.Widget);
                    event.getChildByName('block').getComponent(cc.Widget).target = cc.find('Canvas');
                    event.getChildByName('block').getComponent(cc.Widget).isAlignLeft = true;
                    event.getChildByName('block').getComponent(cc.Widget).isAlignTop = true;
                    event.getChildByName('block').getComponent(cc.Widget).isAlignRight = true;
                    event.getChildByName('block').getComponent(cc.Widget).isAlignBottom = true;
                }
            }
        } else if (content == 'alter') {
            event.getComponent(cc.Widget).target = cc.find('Canvas');
            event.getComponent(cc.Widget).isAlignLeft = true;
            event.getComponent(cc.Widget).isAlignRight = true;
            event.getComponent(cc.Widget).isAlignTop = true;
            event.getComponent(cc.Widget).isAlignBottom = true;
            event.getComponent(cc.Widget).updateAlignment();
            event.getChildByName('block').getComponent(cc.Widget).target = cc.find('Canvas');
            event.getChildByName('block').getComponent(cc.Widget).isAlignLeft = true;
            event.getChildByName('block').getComponent(cc.Widget).isAlignTop = true;
            event.getChildByName('block').getComponent(cc.Widget).isAlignBottom = true;
            event.getChildByName('block').getComponent(cc.Widget).isAlignRight = true;
            event.getChildByName('block').getComponent(cc.Widget).updateAlignment();
        }
    },

    //弹出alter
    addAlter: function (message, func) {
        if (cc.ss.alert.size() > 0) {
            this.alertdialog = cc.ss.alert.get();
            this.alertdialog.parent = cc.find("Canvas");
            let node = this.alertdialog.children[1].children[0].getChildByName("message");
            if (node != null && node.getComponent(cc.Label)) {
                node.getComponent(cc.Label).string = message;
            }
            this.Adaptive(this.alertdialog, 'alter');
        }
    },

    //弹出loadding
    addLoadding: function () {
        if (cc.ss.loadding.size() > 0) {
            this.loaddingDialog = cc.ss.loadding.get();
            this.loaddingDialog.parent = cc.find("Canvas");
            this.Adaptive(this.loaddingDialog, 'alter');
        }
    },

    //关闭loadding
    closeLoadding: function () {
        if (cc.find("Canvas/loadding")) {
            cc.ss.loadding.put(cc.find("Canvas/loadding"));
        }
    },

    //创建房间局数
    onClick_JuShu: function (event, content) {
        if (content == '1') {
            cc.ss.gameRoom.gametity = '10局';
        } else if (content == '2') {
            cc.ss.gameRoom.gametity = '20局';
        }
    },

    //创建房间出牌
    onClick_ChuPai: function (event, content) {
        if (content == '1') {
            cc.ss.gameRoom.playahand = '30秒';
        } else if (content == '2') {
            cc.ss.gameRoom.playahand = '60秒';
        } else if (content == '3') {
            cc.ss.gameRoom.playahand = '90秒';
        }
    },

    //创建房间马牌
    onClick_MaPai: function (event, content) {
        if (content == '1') {
            cc.ss.gameRoom.horsecard = '黑桃A';
        } else if (content == '2') {
            cc.ss.gameRoom.horsecard = '黑桃10';
        } else if (content == '3') {
            cc.ss.gameRoom.horsecard = '无';
        }
    },

    //创建房间围观
    onClick_WeiGuan: function (event, content) {
        if (content == '1') {
            cc.ss.gameRoom.onlooker = '允许围观';
        } else if (content == '2') {
            cc.ss.gameRoom.onlooker = '禁止围观';
        }
    },

    //开房按钮
    onClick_KaiFang: function () {
        // cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
        // cc.find('Canvas').destroy();
        // cc.view.setFrameSize(1280, 720);
        // cc.director.loadScene("room");

        var e = this;
        if (1 != this.btnCreateClicked) {
            this.btnCreateClicked = !0,
                setTimeout(function () {
                    e.btnCreateClicked = !1
                },
                    8e3);
            var n = this.constructRuleConf();
            cc.ss.userMgr.createRoom(n),
                this.saveRoominfoLocal()
        }
    },

    ceshipush:function(){
        // cc.ss.net.send("text", 'sss');
        var data = {
            userimg : '',
            username : '张三',
            ishouse : true,
            begintime : '2019-10-11 11:11:11',
            overtime : '2019-11-11 11:11:11',
            content : [
                {
                    userid: '123456',
                    username: '张三',
                    score: '-10',
                    shoot: '0',
                    bewanted: '10',
                    specialcard: '10',
                    victory: '5'

                },
                {
                    userid: '123456',
                    username: '撒地方',
                    score: '999',
                    shoot: '9',
                    bewanted: '16',
                    specialcard: '12',
                    victory: '8'

                },
                {
                    userid: '123456',
                    username: '人体的',
                    score: '99',
                    shoot: '101',
                    bewanted: '109',
                    specialcard: '105',
                    victory: '50'

                }
            ]
        }
        cc.loader.loadRes('prefab/room/game_account',cc.Prefab,function(err,prefab){
            var node = cc.instantiate(prefab);
            node.getChildByName('username').getComponent(cc.Label).string = data.username;
           if(data.ishouse)node.getChildByName('house_tag').active = true; 
           node.children[4].getChildByName('begintime_num').getComponent(cc.Label).string = data.begintime;
           node.children[4].getChildByName('overtime_num').getComponent(cc.Label).string = data.overtime;
           for(var inx = 0; inx < data.content.length; inx++){
               if(data.content[inx].score >= 0){
                   var list = cc.instantiate(node.children[6].children[0]);
               }else if(data.content[inx].score < 0){
                   var list = cc.instantiate(node.children[6].children[1]);
               }
               list.active = true;
               list.getChildByName('username').getComponent(cc.Label).string = data.content[inx].username;
               list.getChildByName('score').getComponent(cc.Label).string = data.content[inx].score;
               list.getChildByName('dq_num').getComponent(cc.Label).string = data.content[inx].shoot;
               list.getChildByName('bdq_num').getComponent(cc.Label).string = data.content[inx].bewanted;
               list.getChildByName('tsp_num').getComponent(cc.Label).string = data.content[inx].specialcard;
               list.getChildByName('sl_num').getComponent(cc.Label).string = data.content[inx].victory;
               list.parent = node.children[6];
           }

           node.parent = cc.find('Canvas');   
        });
    },

    constructRuleConf: function () {//这里需要读取开房设置参数
        if (null == cc.ss.gameRoom) return "";
        var e = {};
        for (var t in cc.ss.gameRoom) cc.ss.gameRoom[t] && (1 == cc.ss.gameRoom[t].length ? e[t] = cc.ss.gameRoom[t][0] : e[t] = cc.ss.gameRoom[t].concat());
        return e
    },

    saveRoominfoLocal: function () {//保存开房间信息到本地
        if (null != cc.ss.gameRoom) {
            cc.sys.localStorage.setItem('gameroomdate', JSON.stringify(cc.ss.gameRoom));
        }
    },




    //  //创建房间
    //  onClick_creatroom:function(event){


    // },



});
