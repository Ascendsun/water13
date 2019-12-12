
var ssCommon = require("ssCommon");
cc.Class({
    extends: ssCommon,
    
    properties: {
        Twinrecord: {
            default: null,
            type: cc.Prefab
        },
        
        //比赛场详情
        ziyouPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        
    },
    onLoad () {
        this.initclub();
    },

    initclub: function () {
        let socket = this.socket();
        let self = this;
        if(this.ready()){
            this.map('stadium',this.dostadium_event);   //点击比赛场参数返回
            this.map('matchapply',this.domatchapply_event);     //点击比赛场报名参数返回
            this.map('matchrecord',this.domatchrecord_event);      //点击比赛场获奖记录参数返回
            

            socket.on("command", function (result) {
                if (self.inited == true) {
                    var data = self.parse(result);
                   self.route(data.command)(data, self);
                  
                }
            });

            this.inited = false;
        }
    },

    //点击比赛场参数返回
    dostadium_event:function(data,context){
        console.log('点击比赛场:'+data);
        console.log(data);
    },

    //点击比赛场里的获奖记录
    onClickTwinrecord:function(){
        var ace = cc.instantiate(this.Twinrecord);
        cc.ss.openwin.parent.addChild(ace);  
        if (this.ready()) {
            cc.ss.socket.emit("matchrecord" , 'matchrecord');
        }
    },

    //关闭获奖记录
    onClickClosetianchuang:function(event,CustomEventData){
        cc.ss.openwin.parent.getChildByName(CustomEventData).destroy();      
    },

    //点击自由赛详情
    onClickziyousai:function(event,CustomEventData){
        if(CustomEventData == 'ziyousai'){
            var ace = cc.instantiate(this.ziyouPrefab);
            console.log('草泥马:'+ace);
            console.log(ace);
            ace.getChildByName('bolidi').getChildByName('huangdi').children[0].children[1].children[0].children[0].getComponent(cc.Label).string = 
            '奖励规则:\n'+
            '大赢家获取取人数减1钻石\n'+
            '领奖时间：实时颁奖，房间结束，直接发放到大赢家游戏ID\n'+
            '赛制详情：满6人开始，一分钟后有2人也开始';
            cc.ss.openwin.parent.addChild(ace);
        }else if(CustomEventData == 'baomingsai'){
            var ace = cc.instantiate(this.ziyouPrefab);
            ace.getChildByName('bolidi').getChildByName('huangdi')
            .children[0].children[1].children[0].children[0].getComponent(cc.Label).string = 
            '1.第一名现金红包6.88\n'+
            '2.第二名现金红包5.88\n'+
            '3.第三名现金红包4.88\n'+
            '4.第四名现金红包3.88\n'+
            '5.第五名现金红包2.88\n'+
            '6.第六名现金红包1.88\n'+
            '领奖时间：实时颁奖，所有房间结束，直接发放到玩家游戏ID\n'+
            '赛制详情：满24人，开4桌，每桌6人，按分数排名1-24名';
            cc.ss.openwin.parent.addChild(ace);
        }else if(CustomEventData == 'huikuisai'){
            var ace = cc.instantiate(this.ziyouPrefab);
            ace.getChildByName('bolidi').getChildByName('huangdi')
            .children[0].children[1].children[0].children[0].getComponent(cc.Label).string = 
            '比赛规则：\n'+
            '1.第一名现金红包68.88\n'+
            '2.第二名现金红包58.88\n'+
            '3.第三名现金红包48.88\n'+
            '4.第四名现金红包38.88\n'+
            '5.第五名现金红包28.88\n'+
            '6.第六名现金红包18.88\n'+
            '领奖时间：赛事结束后，2天内联系客服\n'+
            '赛制详情：\n'+
            '1.每天21：00开赛，非比赛时间都可报名\n'+
            '2.超过36人，第一轮取前36名，第二轮36进6，第三轮排名1-6\n'+
            '3.等于36人，第一轮36进6，第二轮排名1-6\n'+
            '4.小于36人不开赛';
            cc.ss.openwin.parent.addChild(ace);
        }
    },

    //点击报名
    onClickbaoming:function(event,CustomEventData){
        if(CustomEventData == 'ziyousai'){
            if (this.ready()) {
                var club = {
                    extparams : {}
                };
                club.extparams.applytype = 'Free',
                cc.ss.socket.exec("matchapply" , club);
            }
        }else if(CustomEventData == 'baomingsai'){
            if (this.ready()) {
                var club = {
                    extparams : {}
                };
                club.extparams.applytype = 'signupfor',
                cc.ss.socket.exec("matchapply" , club);
            }
        }else if(CustomEventData == 'huikuisai'){
            if (this.ready()) {
                var club = {
                    extparams : {}
                };
                club.extparams.applytype = 'backgame',
                cc.ss.socket.exec("matchapply" , club);
            }
        }
    },

    //点击比赛场报名参数返回
    dostadium_event:function(data,context){
        console.log('dostadium:'+data);
        console.log(data);
    },

    //点击比赛场获奖记录参数返回
    domatchrecord_event:function(data,context){
        console.log('点击比赛场获奖记录:'+data);
        console.log(data);
    },
    




    start () {

    },

    // update (dt) {},
});
