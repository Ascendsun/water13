var com = require('sssUtils');
//var Base64 = require("Base64");
//var chcode = require("modol");

cc.Class({
    extends:
        cc.Component,

    properties: {
        _rootpath: '',
        _rootnode: null
    },

    onLoad: function () { //加载时候设置默认属性
        null != cc.ss && (
            this._rootpath = "Canvas/base/seats",
            this._rootnode = cc.find(this._rootpath)
        ),
            this.set_bt_Array(5); //设置5人座位
    },

    off_all_lanse: function () {
        for (var i = 0; i < n.plays_num; i++) {//单击自己位置不执行动画 但需要去掉蓝色边框
            //  var usernode = cc.find('Seats');
            cc.find('seats/user' + (i + 1) + '/seat/lanse', this._rootnode).active = false;
            // usernode.getChildByName('user'+(i+1)).getChildByName(seat).getChildByName('lanse').active = false;
        }
    },

    on_all_lanse: function () {
        for (var i = 0; i < n.plays_num; i++) {//单击自己位置不执行动画 但需要去掉蓝色边框
            cc.find('seats/user' + (i + 1) + '/seat/lanse', this._rootnode).active = true;
            // usernode.children[i].children[0].getChildByName('lanse').active = true;
        }
    },

    // find_xy: function (sitx) {//传入位置号；
    //     this.anim_end();//保存当前节点号
    //     chcode.numbersum = 0;
    //     for (var j = 0; j < n.plays_num; j++) {//通过用户名称节点判断按钮位置 决定用哪一个动画
    //         var sitname = cc.find('seats/user' + (j + 1) + '/seat/label',this._rootnode).getComponent(cc.Label).string;
    //         if (sitname.slice(3, sitname.length - 1) == sitx.sitnumber) {
    //             var btn_node = cc.find('seats/user' + (j + 1),this._rootnode);
    //             for (var i = 0; i < n.plays_num; i++) {//通过用户名称节点判断按钮位置 决定用哪一个动画
    //                 if ((btn_node.x - n.bt_Array[i][1] > -3) && (btn_node.x - n.bt_Array[i][1] < 3) && (btn_node.y - n.bt_Array[i][2] < 3) && (btn_node.y - n.bt_Array[i][2] > -3)) {
    //                     //var idx = i;

    //                     switch (n.plays_num) {
    //                         case 6: {
    //                             this.amini_sit_6(i);
    //                         }
    //                             break;
    //                         case 8: {
    //                             this.amini_sit_8(i);
    //                         }
    //                             break;
    //                         case 10: {
    //                             this.amini_sit_10(i);
    //                         }
    //                             break;
    //                     }

    //                     //this.off_all_lanse();///关闭所有蓝色框

    //                 }
    //             }
    //         }
    //     }
    // },

    touchButton(event, customEventData) {
        var node = event.target;
        if (node.getChildByName('lanse').active == true) {
            var sitname = node.getChildByName('label').getComponent(cc.Label).string;
            // this.sdown(parseInt(sitname.slice(3, sitname.length - 1)));//
            this.amini_sit(parseInt(sitname.slice(3, sitname.length - 1)));//本地临时测试接口

            this.get_position_sit(parseInt(sitname.slice(3, sitname.length - 1)));
            cc.log(cc.ss.offline);
            //cc.log(sitname);
        } else {
            // console.log('蓝色开关关闭未发送任何数据！');
        }
    },

    fly_node_sit: function (s_n1, d_n2) {
        // cc.log(d_n2);
        // cc.log(s_n1);
        if (s_n1 != null && d_n2 != null && s_n1.position != null && d_n2.position != null) {

            if (s_n1.name == 'usercode') {
                s_n1.getComponent(cc.Sprite).spriteFrame = d_n2.getComponent(cc.Sprite).spriteFrame;//这个是交换了蓝色框
            }

            cc.tween(s_n1)
                .to(0.5, { position: d_n2.position, width: d_n2.width, height: d_n2.height })//easing: 'sineOutIn'
                .call(() => {

                    if (s_n1.name == 'username') {
                        s_n1.getComponent(cc.Label).fontSize = d_n2.getComponent(cc.Label).fontSize;
                        s_n1.getComponent(cc.Label).lineHeight = d_n2.getComponent(cc.Label).lineHeight;
                    }

                    if (s_n1.name == 'shengchang') {
                        s_n1.getComponent(cc.Label).fontSize = d_n2.getComponent(cc.Label).fontSize;
                        s_n1.getComponent(cc.Label).lineHeight = d_n2.getComponent(cc.Label).lineHeight;
                    }

                })
                .start();

        }

    },


    set_sit: function (sid, did) { //输入源节点ID 和目标节点ID
        //  cc.log('进入了初始化-------------------------------------');
        var user_s = cc.find('seats/user' + sid, this._rootnode);
        var user_d = n.bt_Array[did][4];

        this.fly_node_sit(user_s, user_d);

        var usercode_s = cc.find('seats/user' + sid + '/usercode', this._rootnode);
        var usercode_d = user_d.getChildByName('usercode');
        this.fly_node_sit(usercode_s, usercode_d);

        var userimg_s = cc.find('seats/user' + sid + '/usercode/userimg', this._rootnode);//头像
        var userimg_d = user_d.getChildByName('usercode').getChildByName('userimg');
        this.fly_node_sit(userimg_s, userimg_d);

        var zhunbei_s = cc.find('seats/user' + sid + '/usercode/userimg/zhunbei', this._rootnode);//准备
        var zhunbei_d = user_d.getChildByName('usercode').getChildByName('userimg').getChildByName('zhunbei');
        this.fly_node_sit(zhunbei_s, zhunbei_d);

        var tuoguan_s = cc.find('seats/user' + sid + '/usercode/userimg/tuoguan', this._rootnode);//托管
        var tuoguan_d = user_d.getChildByName('usercode').getChildByName('userimg').getChildByName('tuoguan');
        this.fly_node_sit(tuoguan_s, tuoguan_d);

        var nosinger_s = cc.find('seats/user' + sid + '/usercode/userimg/nosinger', this._rootnode);//信号
        var nosinger_d = user_d.getChildByName('usercode').getChildByName('userimg').getChildByName('nosinger');
        this.fly_node_sit(nosinger_s, nosinger_d);

        var username_s = cc.find('seats/user' + sid + '/usercode/username', this._rootnode);//用户名
        var username_d = user_d.getChildByName('usercode').getChildByName('username');
        this.fly_node_sit(username_s, username_d);

        var shengchang_s = cc.find('seats/user' + sid + '/usercode/shengchang', this._rootnode);//分数
        var shengchang_d = user_d.getChildByName('usercode').getChildByName('shengchang');
        this.fly_node_sit(shengchang_s, shengchang_d);

        var lanse_s = cc.find('seats/user' + sid + '/seat/lanse', this._rootnode);//蓝色框放大
        var lanse_d = user_d.getChildByName('seat').getChildByName('lanse');
        this.fly_node_sit(lanse_s, lanse_d);

        var seat_s = cc.find('seats/user' + sid + '/seat', this._rootnode);
        var seat_d = user_d.getChildByName('seat');
        this.fly_node_sit(seat_s, seat_d);

    },


    amini_sit: function (sit_dix) {//输入座位置号
        switch (sit_dix) {
            case 1:
                {
                    cc.log(1);
                    this.set_sit(n.bt_Array[0][3], 0);
                    this.set_sit(n.bt_Array[1][3], 1);
                    this.set_sit(n.bt_Array[2][3], 2);
                    this.set_sit(n.bt_Array[3][3], 3);
                    this.set_sit(n.bt_Array[4][3], 4);
                }
                break
            case 2:
                {
                    cc.log(2);
                    this.set_sit(n.bt_Array[0][3], 4);
                    this.set_sit(n.bt_Array[1][3], 0);
                    this.set_sit(n.bt_Array[2][3], 1);
                    this.set_sit(n.bt_Array[3][3], 2);
                    this.set_sit(n.bt_Array[4][3], 3);
                }
                break
            case 3:
                {
                    cc.log(3);
                    this.set_sit(n.bt_Array[0][3], 3);
                    this.set_sit(n.bt_Array[1][3], 4);
                    this.set_sit(n.bt_Array[2][3], 0);
                    this.set_sit(n.bt_Array[3][3], 1);
                    this.set_sit(n.bt_Array[4][3], 2);
                }
                break
            case 4:
                {
                    cc.log(4);
                    this.set_sit(n.bt_Array[0][3], 2);
                    this.set_sit(n.bt_Array[1][3], 3);
                    this.set_sit(n.bt_Array[2][3], 4);
                    this.set_sit(n.bt_Array[3][3], 0);
                    this.set_sit(n.bt_Array[4][3], 1);

                }
                break
            case 5:
                {
                    cc.log(5);

                    this.set_sit(n.bt_Array[0][3], 1);
                    this.set_sit(n.bt_Array[1][3], 2);
                    this.set_sit(n.bt_Array[2][3], 3);
                    this.set_sit(n.bt_Array[3][3], 4);
                    this.set_sit(n.bt_Array[4][3], 0);
                }
                break
        }
    },




    getoffline: function () {
        var rootnode = cc.find('Canvas');
        cc.log(rootnode);
        this.get_node_xy(rootnode);
        // cc.log(cc.ss.offline);
    },


    get_node_xy: function (rootnode) { //遍历所有节点
        for (var i in rootnode.children) {
            if (rootnode.children[i]) {
                //  cc.log(rootnode.children[i].name+':=='+rootnode.children[i].uuid);
                var obj = {
                    'uuid': rootnode.children[i].uuid,
                    'name': rootnode.children[i].name,
                    'active': rootnode.children[i].active,
                    'position': rootnode.children[i].position
                }
                cc.ss.offline.push(obj);
                this.get_node_xy(rootnode.children[i]);
            }
        }
    },


    get_uuid_node: function (rootnode, uuid) { //传入跟节点和uuid返回找到的节点；
        var node = null;
        for (var i in rootnode.children) {
            if (rootnode.children[i]) {
                if (rootnode.children[i].uuid == uuid) {
                    return node;
                }
                this.get_uuid_node(rootnode.children[i], rootnode.children[i].name);
                //   cc.log(rootnode.children[i].name+':=='+rootnode.children[i].uuid);
            }
        }
    },




    get_swif_seat_node: function (snode, dnode) { //遍历树
        //  cc.log(snode);
        for (var i in snode.children) {
            if (snode.children[i]) {
                //cc.log(roosnodetnode.children[i].name+':=='+rootnode.children[i].uuid);
                var obj = {
                    'uuid': snode.children[i].uuid,
                    'name': snode.children[i].name,
                    'active': snode.children[i].active,
                    'position': dnode.children[i].position
                }
                this.check_push_update(obj);//检测更新列表存在就更新
                this.get_swif_seat_node(snode.children[i], dnode.children[i]);
            }
        }
    },

    check_push_update: function (obj) {//检测更新列表存在就更新

        // cc.log( cc.ss.offline.uuid +':::::::::::::::'+obj.uuid);
        if (cc.ss.offline) {
            for (var i in cc.ss.offline) {
                if (cc.ss.offline[i].uuid == obj.uuid) {//找到对象更新

                    cc.log(cc.ss.offline[i].position + ':::::::' + obj.name + '::::::::' + obj.position);
                    cc.ss.offline[i].name = obj.name;
                    cc.ss.offline[i].active = obj.active;
                    cc.ss.offline[i].position = obj.position;

                    // cc.ss.offline.name =' obj.name';
                    // cc.ss.offline.active = 'obj.active';
                    // cc.ss.offline.position = 'obj.position';
                }
            }
        }
    },

    get_swif_seat_self: function (snode, dnode) { //
        var obj = {
            'uuid': snode.uuid,
            'name': snode.name,
            'active': snode.active,
            'position': dnode.position
        }
        this.check_push_update(obj);//检测更新列表存在就更新
        this.get_swif_seat_node(snode, dnode);
    },


    get_position_sit: function (sit_dix) {//输入座位号得座位数据；
        switch (sit_dix) {
            case 1:
                {
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[0][3], this._rootnode), n.bt_Array[0][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[1][3], this._rootnode), n.bt_Array[1][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[2][3], this._rootnode), n.bt_Array[2][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[3][3], this._rootnode), n.bt_Array[3][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[4][3], this._rootnode), n.bt_Array[4][4]);
                }
                break
            case 2:
                {
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[0][3], this._rootnode), n.bt_Array[4][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[1][3], this._rootnode), n.bt_Array[0][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[2][3], this._rootnode), n.bt_Array[1][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[3][3], this._rootnode), n.bt_Array[2][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[4][3], this._rootnode), n.bt_Array[3][4]);
                }
                break
            case 3:
                {
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[0][3], this._rootnode), n.bt_Array[3][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[1][3], this._rootnode), n.bt_Array[4][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[2][3], this._rootnode), n.bt_Array[0][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[3][3], this._rootnode), n.bt_Array[1][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[4][3], this._rootnode), n.bt_Array[2][4]);
                }
                break
            case 4:
                {
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[0][3], this._rootnode), n.bt_Array[2][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[1][3], this._rootnode), n.bt_Array[3][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[2][3], this._rootnode), n.bt_Array[4][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[3][3], this._rootnode), n.bt_Array[0][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[4][3], this._rootnode), n.bt_Array[1][4]);

                }
                break
            case 5:
                {
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[0][3], this._rootnode), n.bt_Array[1][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[1][3], this._rootnode), n.bt_Array[2][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[2][3], this._rootnode), n.bt_Array[3][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[3][3], this._rootnode), n.bt_Array[4][4]);
                    this.get_swif_seat_self(cc.find('seats/user' + n.bt_Array[4][3], this._rootnode), n.bt_Array[0][4]);
                }
                break
        }
    },

    sdown: function (snum) { //坐下；
        //  for (var i = 0; i < n.plays_num; i++) {//遍历返回全部玩家；
        let value = snum;//提取座位号
        cc.log('座位号' + snum);
        //  var sitnode = 

        cc.log(this._rootnode);
        cc.find('seats/user' + value + '/seat/lanse', this._rootnode).active = false;
        cc.find('seats/user' + value + '/seat', this._rootnode).active = false;
        cc.find('seats/user' + value + '/usercode', this._rootnode).active = true;

        // if (sitx[i].username.length > 4) {
        //     var username = (sitx[i].username.substr(0, 4)) + '...';
        // } else {
        //     var username = sitx[i].username;
        // }

        cc.find('seats/user' + value + '/usercode/username', this._rootnode).getComponent(cc.Label).string = 'username';//添加用户名称；
        cc.find('seats/user' + value + '/usercode/shengchang', this._rootnode).getComponent(cc.Label).string = '0';
        cc.find('seats/user' + value + '/usercode/userid', this._rootnode).getComponent(cc.Label).string = '123456';//sitx[i].id;//添加用户ID；

        // cc.loader.load(sitx[i].headimg, function (err, texture) {
        //     let spritec = new cc.SpriteFrame(texture);
        //     cc.find('Seats/user'+ value+'/usercode/userimg').getComponent(cc.Sprite).spriteFrame = spritec
        // });

        // if (cc.beimi.user.sit == sitx[i].sitnumber) {
        //     if (gamebeging == null || gamebeging != true) {
        // this.find_xy(snum);
        this.amini_sit(parseInt(snum));//本地临时测试接口
        this.off_all_lanse();
        // cc.find('Canvas/script/NiuniuAnimiBtn').getComponent('NiuniuAnimiBtn').find_xy(sitx[i]);//开启执行动画；传入位置名称。
        // cc.find('Canvas/script/NiuniuAnimiBtn').getComponent('NiuniuAnimiBtn').off_all_lanse();//开启执行动画；传入位置名称。
        //    }
        // }
        //        }
    },



    copsit: function (sitx, gamebeging) {//匹配座位

        for (var i = 0; i < sitx.length; i++) {//遍历返回全部玩家；

            let value = parseInt(sitx[i].sitnumber);//提取座位号
            if (chcode.backroom == null) {
                if (sitx[i].sitstatu == 'down') {
                    console.log(sitx[i]);
                    cc.find('Canvas/global/main/StandUp/user' + value + '/seat/lanse').active = false;
                    cc.find('Canvas/global/main/StandUp/user' + value + '/seat').active = false;
                    cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').active = true;
                    if (sitx[i].username.length > 4) {
                        var username = (sitx[i].username.substr(0, 4)) + '...';
                    } else {
                        var username = sitx[i].username;
                    }
                    cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[1].getComponent(cc.Label).string = username;//添加用户名称；
                    cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[2].getComponent(cc.Label).string = '0';
                    cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[3].getComponent(cc.Label).string = sitx[i].id;//添加用户ID；
                    cc.loader.load(sitx[i].headimg, function (err, texture) {
                        let spritec = new cc.SpriteFrame(texture);
                        cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[0].getComponent(cc.Sprite).spriteFrame = spritec
                    });
                    if (cc.beimi.user.sit == sitx[i].sitnumber) {
                        if (gamebeging == null || gamebeging != true) {
                            cc.find('Canvas/script/NiuniuAnimiBtn').getComponent('NiuniuAnimiBtn').find_xy(sitx[i]);//开启执行动画；传入位置名称。
                            cc.find('Canvas/script/NiuniuAnimiBtn').getComponent('NiuniuAnimiBtn').off_all_lanse();//开启执行动画；传入位置名称。
                        }
                    }


                } else
                    if (sitx[i].sitstatu == 'up') {
                        if (cc.beimi.user.sit == sitx[i].sitnumber) {
                            cc.find('Canvas/global/main/StandUp/user' + value + '/seat').active = true;
                            cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').active = false;
                            cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[1].getComponent(cc.Label).string = '';//清空用户名称;
                            cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[2].getComponent(cc.Label).string = '0';//清空分数
                            cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[3].getComponent(cc.Label).string = '';//清空用户ID 
                            cc.find('Canvas/script/NiuniuAnimiBtn').getComponent('NiuniuAnimiBtn').on_all_lanse();//开启执行动画；传入位置名称。
                            cc.beimi.user.sit = null;
                        } else {

                            if (cc.beimi.user.sit in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
                                cc.find('Canvas/global/main/StandUp/user' + value + '/seat/lanse').active = false;
                            } else {
                                cc.find('Canvas/global/main/StandUp/user' + value + '/seat/lanse').active = true;
                            }
                            cc.find('Canvas/global/main/StandUp/user' + value + '/seat').active = true;
                            cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').active = false;
                            cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[1].getComponent(cc.Label).string = '';//清空用户名称;
                            cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[2].getComponent(cc.Label).string = '0';//清空分数
                            cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[3].getComponent(cc.Label).string = '';//清空用户ID
                        }
                    } else if (sitx[i].sitstatu == 'wait') {
                        cc.beimi.gamebegingsit = sitx[i];
                        cc.find('Canvas/global/main/StandUp/user' + value + '/seat/lanse').active = false;
                        cc.find('Canvas/global/main/StandUp/user' + value + '/seat').active = false;
                        cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').active = true;
                        if (sitx[i].username.length > 4) {
                            var username = (sitx[i].username.substr(0, 4)) + '...';
                        } else {
                            var username = sitx[i].username;
                        }
                        cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[0].children[0].active = false;
                        cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[1].getComponent(cc.Label).string = username;//添加用户名称；
                        cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[2].getComponent(cc.Label).string = '0';
                        cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[3].getComponent(cc.Label).string = sitx[i].id;//添加用户ID；
                        cc.find('Canvas/script/NiuniuAnimiBtn').getComponent('NiuniuAnimiBtn').off_all_lanse();//关闭所有的座位亮框
                        var node = new cc.Node();
                        node.name = 'dengdai';
                        node.addComponent(cc.Sprite);
                        for (var inxa = 0; inxa < cc.beimi.imgresource.length; inxa++) {
                            if ('dengdai' == cc.beimi.imgresource[inxa].name) {
                                node.getComponent(cc.Sprite).spriteFrame = cc.beimi.imgresource[inxa];
                                node.width = cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[0].children[0].width;
                                node.height = cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[0].children[0].height;
                                node.parent = cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[0];
                                break;
                            }
                        }
                        cc.loader.load(sitx[i].headimg, function (err, texture) {
                            let spritec = new cc.SpriteFrame(texture);
                            cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[0].getComponent(cc.Sprite).spriteFrame = spritec
                        });
                    }
            } else {
                console.log(sitx[i])
                if (value != null && sitx[i].sitstatu == 'down') {
                    console.log(cc.find('Canvas/global/main/StandUp'));
                    cc.find('Canvas/global/main/StandUp/user' + value + '/seat/lanse').active = false;
                    cc.find('Canvas/global/main/StandUp/user' + value + '/seat').active = false;
                    cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').active = true;
                    cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[1].getComponent(cc.Label).string = sitx[i].playname;//添加用户名称；
                    cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[2].getComponent(cc.Label).string = sitx[i].property;
                    cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[3].getComponent(cc.Label).string = sitx[i].playuser;//添加用户ID；
                    cc.loader.load(sitx[i].headimg, function (err, texture) {
                        if (err) {
                            cc.loader.loadRes('images/atlas/morenuserimg', cc.SpriteFrame, function (err, spriteFrame) {
                                cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[0].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                            });
                        }
                        let spritec = new cc.SpriteFrame(texture);
                        cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[0].getComponent(cc.Sprite).spriteFrame = spritec
                    });
                    if (sitx[i].auto == true && sitx[i].playuser != cc.beimi.user.id) {
                        cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[0].getChildByName('tuoguan').active = true;//开启托管图片
                    }
                    if (sitx[i].leavestatus == 'leave' && sitx[i].playuser != cc.beimi.user.id) {
                        cc.find('Canvas/global/main/StandUp/user' + value + '/usercode').children[0].getChildByName('nosinger').active = true;//开启托管图片
                    }
                    if (cc.beimi.user.id == sitx[i].playuser) {
                        var anibtn = require('NiuniuAnimiBtn');
                        let anibtnjs = new anibtn();
                        if (gamebeging == null || gamebeging != true) {
                            anibtnjs.find_xy(sitx[i]);//开启执行动画；传入位置名称。
                            anibtnjs.off_all_lanse();//开启执行动画；传入位置名称。
                        }
                    }
                } else if (value == null && sitx[i].sitstatu == 'up') {
                    for (var sit = 0; sit < chcode.personsum; sit++) {
                        if (cc.find('Canvas/global/main/StandUp').children[sit].children[1].children[3].getComponent(cc.Label).string == sitx[i].userid) {
                            cc.find('Canvas/global/main/StandUp').children[sit].children[0].children[1].active = true;
                            cc.find('Canvas/global/main/StandUp').children[sit].children[0].active = true;
                            cc.find('Canvas/global/main/StandUp').children[sit].children[1].active = false;
                            cc.find('Canvas/global/main/StandUp').children[sit].children[1].children[1].getComponent(cc.Label).string = '';
                            cc.find('Canvas/global/main/StandUp').children[sit].children[1].children[2].getComponent(cc.Label).string = '';
                            cc.find('Canvas/global/main/StandUp').children[sit].children[1].children[3].getComponent(cc.Label).string = '';
                        }
                    }
                }
            }
        }

    },
        //cc.find('Seats/user'+ value+'/usercode/userimg').getComponent(cc.Sprite)
        set_bt_Array: function (v) {//根据座位个数设置座位坐标
            for (var i = 0; i < v; i++) {
                // cc.find('seats/user' + (i + 1),this._rootnode).active = true;
                n.bt_Array[i][1] = cc.find('seats/user' + (i + 1), this._rootnode).x;
                n.bt_Array[i][2] = cc.find('seats/user' + (i + 1), this._rootnode).y;
                n.bt_Array[i][3] = parseInt(i + 1);
                var node = cc.instantiate(cc.find('seats/user' + (i + 1), this._rootnode));
                n.bt_Array[i][4] = node; //保存座位节点坐标数据；
                cc.log('初始化座位节点....')
            }
            n.plays_num = v;//标记几家玩法
        }


});
