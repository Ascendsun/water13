var chcode = require('modol')
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
    },
    /**
     * @param self              调用的源
     * @param timernode         计时器所在的节点
     * @param atlas             计时器图集
     * @param timer_first       计时器首个计时字母
     * @param timer_sec         计时器第二个数字
     * @param times             计时器执行次数
     */
    runtimer:function(source , timernode  , atlas, timer_first , timer_sec , times , context , timersrc , qz){

        let self = this ;
        this.remaining = times ;
        if(timer_first.isValid == true){
            if(qz == 1){
                timer_first.getComponent(cc.Label).string = '抢庄:'+times ;
            }else if(qz == 2){
                timer_first.getComponent(cc.Label).string = '请选择下注分数:'+times ;
            }else if(qz == 3){
                timer_first.getComponent(cc.Label).string = '查看手牌:'+times ;
            }else if(qz == 4){
                timer_first.getComponent(cc.Label).string = '开始比牌:'+times ;
            }else if(qz == 5){
                timer_first.getComponent(cc.Label).string = '下一局即将开始:'+times ;
            }else if(qz == 6){
                timer_first.getComponent(cc.Label).string = '正在回复数据请稍后:'+times ;
            }
        }
        // if(timernode){
        //     timernode.active = true ;
        // }

        this.timersrc = function() {
            self.remaining = self.remaining - 1 ;
            if(self.remaining == 3){
                cc.beimi.audio.playSFX('ox_time_count');
            }else if(self.remaining == 2){
                cc.beimi.audio.playSFX('ox_time_count');
            }else if(self.remaining == 1){
                cc.beimi.audio.playSFX('ox_time_count');
            }

            if(self.remaining < 0 || chcode.closetime == true){
                source.unscheduleAllCallbacks(this);
                chcode.closetime = false;
            }else{
                if(timer_first.isValid == true){
                if(qz == 1){
                    timer_first.getComponent(cc.Label).string = '抢庄:'+self.remaining  ;
                }else if(qz == 2){
                    timer_first.getComponent(cc.Label).string = '请选择下注分数:'+self.remaining  ;
                }else if(qz == 3){
                    timer_first.getComponent(cc.Label).string = '查看手牌:'+self.remaining  ;
                }else if(qz == 4){
                    timer_first.getComponent(cc.Label).string = '开始比牌:'+self.remaining   ;
                }else if(qz == 5){
                    timer_first.getComponent(cc.Label).string = '下一局即将开始:'+self.remaining   ;
                }else if(qz == 6){
                    timer_first.getComponent(cc.Label).string = '正在回复数据请稍后:'+self.remaining   ;
                }
            }
        }
            
        } ;
        source.schedule(this.timersrc, 1 , times , 0);
        return this.timersrc ;
    },
    stoptimer:function(source , timernode , timer){
        if(timernode){
            timernode.active = false ;
        }
        let self = this ;
        self.remaining = 0;
        // if(timer){
            source.unscheduleAllCallbacks();
        // }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
