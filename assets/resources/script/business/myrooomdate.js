var ssCommon = require("ssCommon");
cc.Class({
    extends: ssCommon,

    properties: {
        roomtag: {
            default: null,
            type: cc.Prefab
        },
        tabletag: {
            default: null,
            type: cc.Prefab
        },

        tabletageight: {
            default: null,
            type: cc.Prefab
        },

        tabletagten: {
            default: null,
            type: cc.Prefab
        },
        myscralldata: null,
        myscrallobject: null,
        myzhanji: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.dangqian = 0;
        this.zuida = 10;
        console.log('进来这个里边了');
        if (this.myscralldata == null) {
            this.loadding();
            var xhr = cc.ss.http.httpGet("/api/myhistory?id=" + cc.ss.user.id, this.sucess, this.error, this);
        }

    },
    
    onGai:function(){
        if(cc.ss.openwin.getChildByName('顶部框').children[0].children[1].children[1].children[0].children[0].getChildByName('loadfont') != null){
            cc.ss.openwin.getChildByName('顶部框').children[0].children[1].children[1].children[0].children[0].getChildByName('loadfont').active = false;
            cc.ss.openwin.getChildByName('顶部框').children[0].children[1].children[1].children[0].children[0].getChildByName('loadfont').destroy();
        }
        if(cc.ss.openwin.getChildByName('顶部框').children[0].children[2].children[1].children[0].children[0].getChildByName('loadfont') != null){
            cc.ss.openwin.getChildByName('顶部框').children[0].children[2].children[1].children[0].children[0].getChildByName('loadfont').active = false;
            cc.ss.openwin.getChildByName('顶部框').children[0].children[2].children[1].children[0].children[0].getChildByName('loadfont').destroy();
        }
        if(this.myzhanji != null){
            cc.ss.openwin.getChildByName('顶部框').getChildByName('胜场').children[0].getComponent(cc.Label).string = this.myzhanji.L;
            cc.ss.openwin.getChildByName('顶部框').getChildByName('局数').children[0].getComponent(cc.Label).string = this.myzhanji.T;
            cc.ss.openwin.getChildByName('顶部框').getChildByName('失败').children[0].getComponent(cc.Label).string = this.myzhanji.W;
        }
    },

    chenghonghou: function (data, object) {
        if (data != null && data.length > 0) {
            this.myscralldata = data;
            this.myscrallobject = object;
            if (data.length < 10) {
                this.zuida = data.length;
            }
            object.userzhanji(data, object);
        } 
    },

    sucess:function(result, object){
        object.closeloadding();
        var data = JSON.parse(result);
        console.log('房间战绩返回参数')
        console.log(data);
        object.chenghonghou(data, object);
    },

    error:function(result, object){
        var bei = new ssCommon();
        bei.closeloadding();
        var node = new cc.Node();
        node.name = 'loadfont';
        node.addComponent(cc.RichText);
        node.getComponent(cc.RichText).fontSize = 30;
        node.color = new cc.color(138,138,138,255);
        node.getComponent(cc.RichText).string = '网络超时请重试...';
        node.parent = cc.ss.openwin.getChildByName('顶部框').children[0].children[0].children[1].children[0].children[0];//view
    },


    userzhanji: function (data, object) {
        if(data[0].result != null){
            this.myzhanji = data[0].result;
        }
        cc.ss.openwin.getChildByName('顶部框').getChildByName('胜场').children[0].getComponent(cc.Label).string = data[0].result.L;
        cc.ss.openwin.getChildByName('顶部框').getChildByName('局数').children[0].getComponent(cc.Label).string = data[0].result.T;
        cc.ss.openwin.getChildByName('顶部框').getChildByName('失败').children[0].getComponent(cc.Label).string = data[0].result.W;
        let xialuwaikuang_node = cc.ss.openwin.children[6].children[0].children[0].children[1].children[0].children[0].children[0]   //这个是context框
        for (let inx = this.dangqian; inx < this.zuida; inx++) {
            let pgnode = cc.instantiate(object.roomtag);   //useritem
            pgnode.active = true;
            pgnode.name = 'zanjiwai' + inx;
            if (data[inx].players == 10 || data[inx].players == 8) {
                pgnode.getChildByName('usertag').getComponent(cc.Layout).spacingX = 5;
            }
            
            for (let inxa = 0; inxa < data[inx].account.length; inxa++) {
                if (data[inx].players == 6) {
                    var tablenode = cc.instantiate(object.tabletag);
                } else if (data[inx].players == 8) {
                    var tablenode = cc.instantiate(object.tabletageight);
                } else if (data[inx].players == 10) {
                    var tablenode = cc.instantiate(object.tabletagten);
                }
                tablenode.active = true;
                tablenode.name = 'zanjiwai' + inxa;
                if(data[inx].account[inxa].playname.length > 3){
                    tablenode.getChildByName('usernameimg').getChildByName('usernamefont').getComponent(cc.Label).string = data[inx].account[inxa].playname.substr(0,3) + '...';
                }else{
                    tablenode.getChildByName('usernameimg').getChildByName('usernamefont').getComponent(cc.Label).string = data[inx].account[inxa].playname;
                }
                tablenode.getChildByName('useridimg').getChildByName('useridnumber').getComponent(cc.Label).string = data[inx].account[inxa].id;
                tablenode.getChildByName('fenshunumber').getComponent(cc.Label).string = data[inx].account[inxa].property;
                let strurl = data[inx].account[inxa].headimg.replace(/\\/g, "/");
                   let userimg = tablenode.getChildByName('userimgzhao').getChildByName('userimg').getComponent(cc.Sprite);
                    cc.loader.load(strurl, function (err,texture) {
                        if (err) {
                            cc.loader.loadRes('images/atlas/morenuserimg', cc.SpriteFrame, function (err, spriteFrame) {
                                userimg.spriteFrame = spriteFrame;
                                // userimg.width = 59;
                                // userimg.height = 52;
                            });
                        }
                        let spritec  = new cc.SpriteFrame(texture);
                        userimg.spriteFrame = spritec
                    });
                //角色图片以及分数颜色
                if (data[inx].account[inxa].property < 0) {
                    var jueseimg = tablenode.getChildByName('jueseimg').getComponent(cc.Sprite);
                    tablenode.getChildByName('fenshunumber').color = new cc.color(112, 149, 80, 255);
                    if (data[inx].players == 6 || data[inx].players == 8) {
                        for (var inq = 0; inq < cc.ss.imgresource.length; inq++) {
                            if ('tuhao' == cc.ss.imgresource[inq].name) {
                                jueseimg.spriteFrame = cc.ss.imgresource[inq];
                                break;
                            }
                        }
                    } else if (data[inx].players == 10) {
                        for (var inw = 0; inw < cc.ss.imgresource.length; inw++) {
                            if ('土豪1' == cc.ss.imgresource[inw].name) {
                                jueseimg.spriteFrame = cc.ss.imgresource[inw];
                                break;
                            }
                        }
                    }

                } else if (data[inx].account[inxa].property > 0 || data[inx].account[inxa].property == 0) {
                    var jueseimg1 = tablenode.getChildByName('jueseimg').getComponent(cc.Sprite);
                    tablenode.getChildByName('fenshunumber').color = new cc.color(190, 78, 41, 255);
                    if (data[inx].players == 6 || data[inx].players == 8) {
                        console.log(data[inx].players)
                        for (var ine = 0; ine < cc.ss.imgresource.length; ine++) {
                            if ('dayingjia' == cc.ss.imgresource[ine].name) {
                                jueseimg1.spriteFrame = cc.ss.imgresource[ine];
                                break;
                            }
                        }
                    } else if (data[inx].players == 10) {
                        for (var inr = 0; inr < cc.ss.imgresource.length; inr++) {
                            if ('大赢家1' == cc.ss.imgresource[inr].name) {
                                jueseimg1.spriteFrame = cc.ss.imgresource[inr];
                                break;
                            }
                        }
                    }
                }
                pgnode.getChildByName('usertag').addChild(tablenode);
            }

            var endtimer = this.formatDate(data[inx].endtime);
            pgnode.getChildByName('taghand').getChildByName('creatartime').getComponent(cc.Label).string = endtimer;
            pgnode.getChildByName('taghand').getChildByName('fangzhufont').getChildByName('fangzhuname').getComponent(cc.Label).string = data[inx].master;
            pgnode.getChildByName('taghand').getChildByName('fonthaofont').getChildByName('fanghaonum').getComponent(cc.Label).string = data[inx].roomid;
            pgnode.getChildByName('taghand').getChildByName('xiangqingbtn').getComponent(cc.Button).clickEvents[0].customEventData = data[inx].details;     //点击详情按钮传details参数
            xialuwaikuang_node.addChild(pgnode);
        }
        object.closeloadding();
    },

    scrollbeyon: function (sender, event) {
        if (event == 1) {
            if (this.dangqian < this.myscralldata.length && this.zuida < this.myscralldata.length) {
                this.dangqian = this.zuida;
                if (this.zuida + 10 < this.myscralldata.length) {
                    this.zuida = this.zuida + 10;
                } else {
                    this.zuida = this.myscralldata.length;
                }
                this.userzhanji(this.myscralldata, this.myscrallobject)

            }
        }
    },
    formatDate: function (datetime) {
        var date = new Date(datetime);
        var year = date.getFullYear(),
            month = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
            day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
            min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
            sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return year + '-' + month + '-' + day + '\t' + hour + ':' + min + ':' + sec;
    },

    // start () {

    // },

    // update (dt) {},
});
