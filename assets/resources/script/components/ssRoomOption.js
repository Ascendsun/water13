var ssCommon = require("ssCommon");
var ccp = require("modol");
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

        playway: {
            default: null,
            type: cc.Node
        },
        playwayc: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.inited = false;
        this.initfonc();
    },

    initfonc: function () {
        let self = this;
        if (this.ready()) {
            let socket = this.socket();
            this.map("usersetup", this.dousersetup_event);

            socket.on("command", function (result) {
                if (self.inited == true) {
                    var data = self.parse(result);
                    self.route(data.command)(data, self);
                }
            });
        }
    },

    dousersetup_event: function (data, content) {
        console.log(data);
        var extparams = JSON.parse(data.userSetup);
        console.log(extparams);

        if (extparams != null) {


            cc.ss.roomcalldata = 1;
            cc.ss.fuwufei = 1;
            cc.ss.zuidaqiangzhuang = 1;
            cc.ss.jushu = 1;
            cc.ss.renshu = 1;
            cc.ss.fanbeiguize = 1;
            cc.ss.roomextparams = extparams;

            ccp.nugames = extparams.current;
            ccp.nupeople = extparams.nupeople;//几人场
            ccp.seoptable = extparams.start;
            ccp.maxhog = extparams.banker;
            ccp.sptype = extparams.double;


            //判断分数
            if (extparams.muitpleidx == '1') {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '1/2/3';
            } else if (extparams.muitpleidx == '2') {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '2/3/4';
                cc.ss.openwin.getChildByName('分数select').active = true;
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[0].getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[1].getComponent(cc.Toggle).check();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[2].getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[3].getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[4].getComponent(cc.Toggle).uncheck();
            } else if (extparams.muitpleidx == '3') {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '4/6/8';
                cc.ss.openwin.getChildByName('分数select').active = true;
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[0].getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[1].getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[2].getComponent(cc.Toggle).check();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[3].getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[4].getComponent(cc.Toggle).uncheck();
            } else if (extparams.muitpleidx == '4') {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '7/8/9';
                cc.ss.openwin.getChildByName('分数select').active = true;
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[0].getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[1].getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[2].getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[3].getComponent(cc.Toggle).check();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[4].getComponent(cc.Toggle).uncheck();
            } else if (extparams.muitpleidx == '5') {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '6/8/10';
                cc.ss.openwin.getChildByName('分数select').active = true;
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[0].getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[1].getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[2].getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[3].getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('分数select').children[0].children[0].children[4].getComponent(cc.Toggle).check();
            }

            //翻倍规则
            if (extparams.double == 1) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_four').children[1].getChildByName('sevenClick').getChildByName('选项font').getComponent(cc.Label).string = '疯狂加倍，点子牛，倍数等于点数，牛牛10倍';
            } else if (extparams.double == 2) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_four').children[1].getChildByName('sevenClick').getChildByName('选项font').getComponent(cc.Label).string = '牛七2倍，牛八3倍，牛九4倍，牛牛5倍';
            } else if (extparams.double == 3) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_four').children[1].getChildByName('sevenClick').getChildByName('选项font').getComponent(cc.Label).string = '牛七2倍，牛八2倍，牛九3倍，牛牛4倍';
            } else if (extparams.double == 4) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_four').children[1].getChildByName('sevenClick').getChildByName('选项font').getComponent(cc.Label).string = '牛七1倍，牛八2倍，牛九2倍，牛牛3倍';
            }

            if (extparams.double != 1) {
                var list = ['同花顺10倍', '炸弹牛9倍', '金花牛8倍', '五小牛7倍', '银花牛6倍', '葫芦牛6倍', '同花牛5倍', '顺子牛5倍'];
                for (var inx = 0; inx < cc.ss.openwin.getChildByName('option_group').getChildByName('group_five').getChildByName('选项框长one').getChildByName('Layout布局').children.length; inx++) {
                    cc.ss.openwin.getChildByName('option_group').getChildByName('group_five').getChildByName('选项框长one').getChildByName('Layout布局').children[inx].getComponent(cc.Label).string = list[inx];
                }

                cc.ss.openwin.getChildByName('特殊牌型select').children[0].children[0].children[2].getComponent(cc.Label).string = '同花顺10倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[0].children[0].children[3].getComponent(cc.Label).string = '同花顺10倍';

                cc.ss.openwin.getChildByName('特殊牌型select').children[1].children[0].children[2].getComponent(cc.Label).string = '五小牛7倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[1].children[0].children[3].getComponent(cc.Label).string = '五小牛7倍';

                cc.ss.openwin.getChildByName('特殊牌型select').children[2].children[0].children[2].getComponent(cc.Label).string = '同花牛5倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[2].children[0].children[3].getComponent(cc.Label).string = '同花牛5倍';

                cc.ss.openwin.getChildByName('特殊牌型select').children[3].children[0].children[2].getComponent(cc.Label).string = '炸弹牛9倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[3].children[0].children[3].getComponent(cc.Label).string = '炸弹牛9倍';

                cc.ss.openwin.getChildByName('特殊牌型select').children[4].children[0].children[2].getComponent(cc.Label).string = '银花牛6倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[4].children[0].children[3].getComponent(cc.Label).string = '银花牛6倍';

                cc.ss.openwin.getChildByName('特殊牌型select').children[5].children[0].children[2].getComponent(cc.Label).string = '顺子牛5倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[5].children[0].children[3].getComponent(cc.Label).string = '顺子牛5倍';

                cc.ss.openwin.getChildByName('特殊牌型select').children[6].children[0].children[2].getComponent(cc.Label).string = '金花牛8倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[6].children[0].children[3].getComponent(cc.Label).string = '金花牛8倍';

                cc.ss.openwin.getChildByName('特殊牌型select').children[7].children[0].children[2].getComponent(cc.Label).string = '葫芦牛6倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[7].children[0].children[3].getComponent(cc.Label).string = '葫芦牛6倍';
            } else {
                var list = ['同花顺20倍', '炸弹牛19倍', '金花牛18倍', '五小牛17倍', '银花牛16倍', '葫芦牛15倍', '同花牛13倍', '顺子牛12倍'];
                for (var inx = 0; inx < cc.ss.openwin.getChildByName('option_group').getChildByName('group_five').getChildByName('选项框长one').getChildByName('Layout布局').children.length; inx++) {
                    cc.ss.openwin.getChildByName('option_group').getChildByName('group_five').getChildByName('选项框长one').getChildByName('Layout布局').children[inx].getComponent(cc.Label).string = list[inx];
                }

                cc.ss.openwin.getChildByName('特殊牌型select').children[0].children[0].children[2].getComponent(cc.Label).string = '同花顺20倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[0].children[0].children[3].getComponent(cc.Label).string = '同花顺20倍';

                cc.ss.openwin.getChildByName('特殊牌型select').children[1].children[0].children[2].getComponent(cc.Label).string = '五小牛17倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[1].children[0].children[3].getComponent(cc.Label).string = '五小牛17倍';

                cc.ss.openwin.getChildByName('特殊牌型select').children[2].children[0].children[2].getComponent(cc.Label).string = '同花牛13倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[2].children[0].children[3].getComponent(cc.Label).string = '同花牛13倍';

                cc.ss.openwin.getChildByName('特殊牌型select').children[3].children[0].children[2].getComponent(cc.Label).string = '炸弹牛19倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[3].children[0].children[3].getComponent(cc.Label).string = '炸弹牛19倍';

                cc.ss.openwin.getChildByName('特殊牌型select').children[4].children[0].children[2].getComponent(cc.Label).string = '银花牛16倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[4].children[0].children[3].getComponent(cc.Label).string = '银花牛16倍';

                cc.ss.openwin.getChildByName('特殊牌型select').children[5].children[0].children[2].getComponent(cc.Label).string = '顺子牛12倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[5].children[0].children[3].getComponent(cc.Label).string = '顺子牛12倍';

                cc.ss.openwin.getChildByName('特殊牌型select').children[6].children[0].children[2].getComponent(cc.Label).string = '金花牛18倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[6].children[0].children[3].getComponent(cc.Label).string = '金花牛18倍';

                cc.ss.openwin.getChildByName('特殊牌型select').children[7].children[0].children[2].getComponent(cc.Label).string = '葫芦牛15倍';
                cc.ss.openwin.getChildByName('特殊牌型select').children[7].children[0].children[3].getComponent(cc.Label).string = '葫芦牛15倍';
            }


            //判断特殊牌型
            if (extparams.special.indexOf('1') != -1) {
                cc.ss.openwin.getChildByName('特殊牌型select').children[0].children[0].getComponent(cc.Toggle).check();
            } else {
                cc.ss.openwin.getChildByName('特殊牌型select').children[0].children[0].getComponent(cc.Toggle).uncheck();
            }


            if (extparams.special.indexOf('2') != -1) {
                cc.ss.openwin.getChildByName('特殊牌型select').children[1].children[0].getComponent(cc.Toggle).check();
            } else {
                cc.ss.openwin.getChildByName('特殊牌型select').children[1].children[0].getComponent(cc.Toggle).uncheck();
            }


            if (extparams.special.indexOf('3') != -1) {
                cc.ss.openwin.getChildByName('特殊牌型select').children[2].children[0].getComponent(cc.Toggle).check();
            } else {
                cc.ss.openwin.getChildByName('特殊牌型select').children[2].children[0].getComponent(cc.Toggle).uncheck();
            }


            if (extparams.special.indexOf('4') != -1) {
                cc.ss.openwin.getChildByName('特殊牌型select').children[3].children[0].getComponent(cc.Toggle).check();
            } else {
                cc.ss.openwin.getChildByName('特殊牌型select').children[3].children[0].getComponent(cc.Toggle).isChecked = false;
            }


            if (extparams.special.indexOf('5') != -1) {
                cc.ss.openwin.getChildByName('特殊牌型select').children[4].children[0].getComponent(cc.Toggle).check();
            } else {
                cc.ss.openwin.getChildByName('特殊牌型select').children[4].children[0].getComponent(cc.Toggle).uncheck();
            }


            if (extparams.special.indexOf('6') != -1) {
                cc.ss.openwin.getChildByName('特殊牌型select').children[5].children[0].getComponent(cc.Toggle).check();
            } else {
                cc.ss.openwin.getChildByName('特殊牌型select').children[5].children[0].getComponent(cc.Toggle).uncheck();
            }


            if (extparams.special.indexOf('7') != -1) {
                cc.ss.openwin.getChildByName('特殊牌型select').children[6].children[0].getComponent(cc.Toggle).check();
            } else {
                cc.ss.openwin.getChildByName('特殊牌型select').children[6].children[0].getComponent(cc.Toggle).uncheck();
            }


            if (extparams.special.indexOf('8') != -1) {
                cc.ss.openwin.getChildByName('特殊牌型select').children[7].children[0].getComponent(cc.Toggle).check();
            } else {
                cc.ss.openwin.getChildByName('特殊牌型select').children[7].children[0].getComponent(cc.Toggle).uncheck();
            }


            // //判断高级选项
            if (extparams.high.indexOf('1') != -1) {
                cc.ss.openwin.getChildByName('高级选项select').children[0].children[0].getComponent(cc.Toggle).check();
            } else {
                cc.ss.openwin.getChildByName('高级选项select').children[0].children[0].getComponent(cc.Toggle).uncheck();
            }
            // if (extparams.high.indexOf('2') != -1) {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Lableto').active = true;
            // } else {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Lableto').active = false;
            // }
            // if (extparams.high.indexOf('3') != -1) {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelthree').active = true;
            // } else {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelthree').active = false;
            // }
            // if (extparams.high.indexOf('4') != -1) {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelfour').active = true;
            // } else {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelfour').active = false;
            // }
            // if (extparams.high.indexOf('5') != -1) {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelfive').active = true;
            // } else {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelfive').active = false;
            // }
            // if (extparams.high.indexOf('6') != -1) {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelsix').active = true;
            // } else {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelsix').active = false;
            // }

            //判断几人场的
            if (extparams.nupeople == 6) {
                cc.ss.openwin.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle1').getComponent(cc.Toggle).check();
                cc.ss.openwin.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle2').getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle3').getComponent(cc.Toggle).uncheck();
            } else if (extparams.nupeople == 8) {
                cc.ss.openwin.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle1').getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle2').getComponent(cc.Toggle).check();
                cc.ss.openwin.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle3').getComponent(cc.Toggle).uncheck();
            } else if (extparams.nupeople == 10) {
                cc.ss.openwin.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle1').getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle2').getComponent(cc.Toggle).uncheck();
                cc.ss.openwin.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle3').getComponent(cc.Toggle).check();
            }

            //判断自动开桌
            cc.ss.openwin.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = extparams.start;

            // if (extparams.start == 1) {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '手动开桌';
            // } else if (extparams.start == 3) {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '满3人开';
            // } else if (extparams.start == 4) {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '满4人开';
            // } else if (extparams.start == 5) {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '满5人开';
            // } else if (extparams.start == 6) {
            //     cc.ss.openwin.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '满6人开';
            // }

            //最大抢庄
            if (extparams.banker == 1) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_three').children[5].getChildByName('sixClick').getChildByName('选项font').getComponent(cc.Label).string = '1倍';
            } else if (extparams.banker == 2) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_three').children[5].getChildByName('sixClick').getChildByName('选项font').getComponent(cc.Label).string = '2倍';
            } else if (extparams.banker == 3) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_three').children[5].getChildByName('sixClick').getChildByName('选项font').getComponent(cc.Label).string = '3倍';
            } else if (extparams.banker == 4) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_three').children[5].getChildByName('sixClick').getChildByName('选项font').getComponent(cc.Label).string = '4倍';
            }

            //判断局数
            if (extparams.current == 10) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_one').children[3].getChildByName('toClick').getChildByName('选项font').getComponent(cc.Label).string = '10局';
            } else if (extparams.current == 20) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_one').children[3].getChildByName('toClick').getChildByName('选项font').getComponent(cc.Label).string = '20局';
            } else if (extparams.current == 30) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_one').children[3].getChildByName('toClick').getChildByName('选项font').getComponent(cc.Label).string = '30局';
            }

            //判断闲家推注
            if (extparams.leisure == 'none') {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '无';
            } else if (extparams.leisure == 5) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '5';
            } else if (extparams.leisure == 10) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '10';
            } else if (extparams.leisure == 15) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '15';
            } else if (extparams.leisure == 20) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '20';
            }


            //判断服务费
            if (extparams.expenditure != null) {
                cc.ss.openwin.getChildByName('option_group').getChildByName('group_to').children[1].getChildByName('threeClick').getChildByName('选项font').getComponent(cc.Label).string = extparams.expenditure;
            }
        }



    },


    onClick: function (one, to) {

        cc.loader.loadRes('prefab/room/roomoption', cc.Prefab, function (err, prefab) {
            var gametype = cc.ss.game.type(to);
            ccp.playway = gametype.id;
            cc.sys.localStorage.setItem("cacaca", gametype.id);
            let roomplayway = cc.instantiate(prefab);

            var param = {
                userid: cc.ss.user.id,
            };
            cc.ss.socket.exec("usersetup", param);
            cc.ss.openwin = roomplayway;
            //查找Canvas节点赋值给cc.ss.openwin.parent  Node | null
            cc.ss.openwin.parent = cc.find('Canvas');

            if (cc.ss.openwin.getChildByName('sprite_splash').getComponent(cc.Widget) != null) {
                cc.ss.openwin.getChildByName('sprite_splash').getComponent(cc.Widget).target = cc.find('Canvas');
                cc.ss.openwin.getChildByName('sprite_splash').getComponent(cc.Widget).isAlignLeft = true;
                cc.ss.openwin.getChildByName('sprite_splash').getComponent(cc.Widget).isAlignRight = true;
            } else {
                cc.ss.openwin.getChildByName('sprite_splash').addComponent(cc.Widget);
                cc.ss.openwin.getChildByName('sprite_splash').getComponent(cc.Widget).target = cc.find('Canvas');
                cc.ss.openwin.getChildByName('sprite_splash').getComponent(cc.Widget).isAlignLeft = true;
                cc.ss.openwin.getChildByName('sprite_splash').getComponent(cc.Widget).isAlignRight = true;
            }

        });
        cc.ss.audio.playSFX("btn_click");
    },

    onDestroy: function () {
        this.inited = false;
        this.cleanmap();
    },

    // update (dt) {},
});
