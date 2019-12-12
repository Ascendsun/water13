
var ssCommon = require("ssCommon");

cc.Class({
  extends: ssCommon,
    properties: {

    },
    start () {},
    initgame: function () {
        console.log('进来begin的initgame了')
        let self = this;
        if (this.ready()) {
            let socket = this.socket();
            this.map("joinroom", this.joinroom_event);                   //房主加入房价
            this.map("players", this.players_event);                     //接受玩家列表
            this.map("bankerresult", this.bankerresult_event);           //最终抢到地主的玩家
            this.map("lasthands", this.lasthands_event);                 //最后一张牌发下来
            this.map("dobanker", this.dobanker_event);                   //抢庄
            this.map("takecards", this.takecards_event);                 //出牌信息
            this.map("ratio", this.ratio_event);                         //倍率
            this.map("play", this.play_event);                           //开始游戏,牌是从这个指令发下来的
            this.map("allcards", this.allcards_event);                   //我出的牌
            this.map("cardtips", this.cardtips_event);                   //提示
            this.map("roomready", this.roomready_event);                 //提示
            this.map("playeready", this.playeready_event);               //玩家点击了开始游戏 ， 即准备就绪    //无用
            this.map("cardtips", this.cardtips_event);                   //提示
            this.map("recovery", this.recovery_event);                   //恢复牌局数据
            this.map("sitdown", this.userjinru);                         //坐下，玩家加入房间回传
            this.map("chat", this.chat_event);                           //聊天
            this.map("domuitple", this.beishu_event);                    //倍率
            this.map("doplaycard", this.doPlayCards_event);              //亮牌
            this.map("overmsg", this.playover_event);                    //比牌结果
            this.map("ready", this.player_ready_event);                  //准备按钮     
            this.map("history", this.history_event);                     //战绩
            this.map("playauto", this.trust_event);                      //托管返回
            this.map("searchroom", this.searchroom_event);
            this.map("join", this.dojoin_event);                         //有玩家加入房间同步消息
            this.map("searchstatus", this.dosearchstatus_event);
            this.map("raisehand", this.raisehand_event);                 //解散房间
            this.map("leave", this.doleave_event);                       //离开房间同步消息
            this.map('playinfo', this.doplayinfo_event);                 //用户详情
            this.map('kicking', this.dokicking_event);                   //踢人回调
            this.map('timer', this.detimer_event);                       //时间同步
            this.map('repeatoff', this.dorepeatoff_event);               //玩家返回房间
            this.map('autosetup', menujs.tuoguanfonc);
            this.map('goldverify', this.dogoldverify_event);            //资产是否足够游戏
            socket.on("command", function (result) {
                if (self.inited == true) {
                    var data = self.parse(result);
                    self.route(data.command)(data, self);
                }
            });

        }
          // if (cc.beimi.jiaru == 1) {
            //     this.joinroom_user();
            //     cc.beimi.jiaru = null;
            // } else {
            //     if (cc.beimi.extparams != null && chcode.backroom == null && cc.beimi.type != 'clubroom') {
            //         var param = {
            //             orgi: cc.beimi.user.orgi,
            //             extparams: cc.beimi.extparams
            //         };
            //         socket.exec("joinroom", param);
            //     }
            // }
            // this.inited = true;
        // cc.loader.loadRes('images/puketypeto/poke', cc.SpriteAtlas, function (err, atlas) {
        //     cc.beimi.cuopaiimg = atlas;
        // });
    },

});
