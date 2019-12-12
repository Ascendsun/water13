var ssCommon = require("ssCommon");
var com = require("modol");
cc.Class({
    extends: ssCommon,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        pangguan: {
            default: null,
            type: cc.Node
        },
        pangguanfu: {
            default: null,
            type: cc.Node
        },
        dangqianwanfa: {
            default: null,
            type: cc.Node
        },
        paijuhuigu: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function () {
        if (com.moduleshuju != null && com.moduleshuju.extparams != null && com.moduleshuju.extparams != '') {
            //局数
            this.dangqianwanfa.children[1].children[7].getComponent(cc.Label).string = com.moduleshuju.extparams.current + "局";
            //支付方式
            if (cc.beimi.type != 'clubroom' && com.moduleshuju.extparams.expenditure != null) {
                if (com.moduleshuju.extparams.expenditure != null) {
                    this.dangqianwanfa.children[1].children[8].getComponent(cc.Label).string = com.moduleshuju.extparams.expenditure;
                }
            }
            //分数
            if (com.moduleshuju.extparams.muitpleidx != null) {
                if (com.moduleshuju.extparams.muitpleidx == 1) {
                    this.dangqianwanfa.children[1].children[9].getComponent(cc.Label).string = "1/2/3";

                } else if (com.moduleshuju.extparams.muitpleidx == 2) {
                    this.dangqianwanfa.children[1].children[9].getComponent(cc.Label).string = "2/3/4";

                } else if (com.moduleshuju.extparams.muitpleidx == 3) {
                    this.dangqianwanfa.children[1].children[9].getComponent(cc.Label).string = "4/6/8";

                } else if (com.moduleshuju.extparams.muitpleidx == 4) {
                    this.dangqianwanfa.children[1].children[9].getComponent(cc.Label).string = "7/8/9";

                } else if (com.moduleshuju.extparams.muitpleidx == 5) {
                    this.dangqianwanfa.children[1].children[9].getComponent(cc.Label).string = "6/8/10";

                }
            }

            //闲家推注和高级选项
            var gaojiyanzheng = com.moduleshuju.extparams.high;
            if (gaojiyanzheng != null) {
                if (com.moduleshuju.extparams.leisure == 5) {
                    this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string = "闲家推注（最大5倍）" + "，";
                    if (gaojiyanzheng.indexOf("2") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "新手模式" + "，";

                    } else if (gaojiyanzheng.indexOf("4") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "下注加倍" + "，";

                    } else if (gaojiyanzheng.indexOf("5") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "下注限制" + "，";

                    } else if (gaojiyanzheng.indexOf("6") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "暗抢庄家";

                    }
                } else if (com.moduleshuju.extparams.leisure == 10) {
                    this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string = "闲家推注（最大10倍）" + "，";
                    if (gaojiyanzheng.indexOf("2") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "新手模式" + "，";

                    } else if (gaojiyanzheng.indexOf("4") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "下注加倍" + "，";

                    } else if (gaojiyanzheng.indexOf("5") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "下注限制" + "，";

                    } else if (gaojiyanzheng.indexOf("6") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "暗抢庄家";

                    }
                } else if (com.moduleshuju.extparams.leisure == 15) {
                    this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string = "闲家推注（最大15倍）" + "，";
                    if (gaojiyanzheng.indexOf("2") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "新手模式" + "，";

                    } else if (gaojiyanzheng.indexOf("4") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "下注加倍" + "，";

                    } else if (gaojiyanzheng.indexOf("5") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "下注限制" + "，";

                    } else if (gaojiyanzheng.indexOf("6") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "暗抢庄家";

                    }
                } else if (com.moduleshuju.extparams.leisure == 20) {
                    this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string = "闲家推注（最大20倍）" + "，";
                    if (gaojiyanzheng.indexOf("2") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "新手模式" + "，";

                    } else if (gaojiyanzheng.indexOf("4") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "下注加倍" + "，";

                    } else if (gaojiyanzheng.indexOf("5") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "下注限制" + "，";

                    } else if (gaojiyanzheng.indexOf("6") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "暗抢庄家";

                    }
                } else if (com.moduleshuju.extparams.leisure.indexOf("none") != -1) {
                    if (gaojiyanzheng.indexOf("2") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "新手模式" + "，";

                    }
                    if (gaojiyanzheng.indexOf("4") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "下注加倍" + "，";

                    }
                    if (gaojiyanzheng.indexOf("5") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "下注限制" + "，";

                    }
                    if (gaojiyanzheng.indexOf("6") != -1) {
                        this.dangqianwanfa.children[1].children[10].getComponent(cc.Label).string += "暗抢庄家";

                    }
                }
            }

            //翻倍规则
            if (com.moduleshuju.extparams.double != null) {
                if (com.moduleshuju.extparams.double == 1) {
                    this.dangqianwanfa.children[1].children[11].getComponent(cc.Label).string = "疯狂加倍（倍数等于点数）";

                } else if (com.moduleshuju.extparams.double == 2) {
                    this.dangqianwanfa.children[1].children[11].getComponent(cc.Label).string += "没牛~牛六x1倍   牛七x1倍   牛八x2倍   牛九x2倍   牛牛x3倍";

                } else if (com.moduleshuju.extparams.double == 3) {
                    this.dangqianwanfa.children[1].children[11].getComponent(cc.Label).string += "没牛~牛六x1倍   牛七x2倍   牛八x2倍   牛九x3倍   牛牛x4倍";

                } else if (com.moduleshuju.extparams.double == 4) {
                    this.dangqianwanfa.children[1].children[11].getComponent(cc.Label).string += "没牛~牛六x1倍   牛七x1倍   牛八x2倍   牛九x2倍   牛牛x3倍";

                }
            }

            //特殊牌型
            var teshuyanzheng = com.moduleshuju.extparams.special
            if (teshuyanzheng != null) {
                if (teshuyanzheng.indexOf("1") != -1) {
                    this.dangqianwanfa.children[1].children[12].getComponent(cc.Label).string = "顺子牛x10倍   ";
                }
                if (teshuyanzheng.indexOf("2") != -1) {
                    this.dangqianwanfa.children[1].children[12].getComponent(cc.Label).string += "五小牛x7倍   ";
                }
                if (teshuyanzheng.indexOf("3") != -1) {
                    this.dangqianwanfa.children[1].children[12].getComponent(cc.Label).string += "同花牛x5倍   ";
                }
                if (teshuyanzheng.indexOf("4") != -1) {
                    this.dangqianwanfa.children[1].children[12].getComponent(cc.Label).string += "炸弹牛x9倍   ";
                }
                if (teshuyanzheng.indexOf("5") != -1) {
                    this.dangqianwanfa.children[1].children[12].getComponent(cc.Label).string += "银花牛x6倍   ";
                }
                if (teshuyanzheng.indexOf("6") != -1) {
                    this.dangqianwanfa.children[1].children[12].getComponent(cc.Label).string += "顺子牛x5倍   ";
                }
                if (teshuyanzheng.indexOf("7") != -1) {
                    this.dangqianwanfa.children[1].children[12].getComponent(cc.Label).string += "金花牛x8倍   ";
                }
                if (teshuyanzheng.indexOf("8") != -1) {
                    this.dangqianwanfa.children[1].children[12].getComponent(cc.Label).string += "葫芦牛x6倍   ";
                }
            }


        } else if (com.relativesroom != null && com.relativesroom != '') {
            //翻倍规则
            this.dangqianwanfa.children[1].children[11].getComponent(cc.Label).string = com.relativesroom.doublerule;
            //分数
            this.dangqianwanfa.children[1].children[9].getComponent(cc.Label).string = com.relativesroom.muitpleidx;
            //总局数
            this.dangqianwanfa.children[1].children[7].getComponent(cc.Label).string = com.relativesroom.numofgames;

            if (com.relativesroomlist != null && com.relativesroomlist.length > 0) {  //判断不是房主的情况下
                for (var inx = 0; inx < com.relativesroomlist.length; inx++) { //com.jiaruroomdata.chair
                    if (com.relativesroomlist[inx].sitstatu == 'up') {  //判断房间内的所有用户是否有站起状态的
                        var node = cc.instantiate(this.pangguan);
                        node.name = 'user' + (inx + 1);
                        node.children[2].getComponent(cc.Label).string = com.relativesroomlist[inx].username;
                        node.children[4].getComponent(cc.Label).string = com.relativesroomlist[inx].id.slice(0, 5)
                        this.pangguanfu.addChild(node);
                    }
                }
                this.pangguanfu.children[0].active = false;     //关闭被克隆节点
            }

        }

        this.initclub();
        this.inited = true;
    },
    initclub: function () {
        let socket = this.socket();
        let self = this;
        if (this.ready()) {
            this.map("observe", this.doobserve_event);      //点击旁观按钮回传
            socket.on("command", function (result) {
                if (self.inited == true) {
                    var data = self.parse(result);
                    self.route(data.command)(data, self);

                }
            });

            this.inited = false;
        }
    },

    doobserve_event: function (data, context) {
        console.log('回传参数:' + data);
        console.log(data);
        if (data.observe != null && data.observe.length > 0) {  //判断不是房主的情况下
            for (let inx = 0; inx < data.observe.length; inx++) { //com.jiaruroomdata.chair
                if (data.observe[inx].sitstatu == 'up') {  //判断房间内的所有用户是否有站起状态的
                    let node = cc.instantiate(context.pangguan);
                    node.active = true;
                    node.name = 'user' + (inx + 1);
                    if(data.observe[inx].username.length > 6){
                        node.children[2].getComponent(cc.Label).string = data.observe[inx].username.substr(0,5) + '...';
                    }else{
                        node.children[2].getComponent(cc.Label).string = data.observe[inx].username;
                    }
                    node.children[4].getComponent(cc.Label).string = data.observe[inx].id.slice(0, 5)
                    cc.loader.load(data.observe[inx].headimg, function (err, texture) {
                        if (err) {
                            cc.loader.loadRes('images/atlas/morenuserimg', cc.SpriteFrame, function (err, spriteFrame) {
                                node.children[0].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                                node.children[0].width = 70;
                                node.children[0].height = 70;
                            });
                        }
                        let spritec = new cc.SpriteFrame(texture);
                        node.children[0].getComponent(cc.Sprite).spriteFrame = spritec
                    });
                    context.pangguanfu.addChild(node);
                }
            }
            // context.pangguanfu.children[0].active = false;     //关闭被克隆节点
        }
    }
    // onLoad () {},



    // update (dt) {},
});
