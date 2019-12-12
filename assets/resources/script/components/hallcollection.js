var ssCommon = require("ssCommon");
cc.Class({
    extends: ssCommon,
    properties: {
        
    },

    onLoad () {
    },

    initclub: function () {
        let socket = this.socket();
        let self = this;
        if(this.ready()){
            this.map('sign',this.dosign_event);   //点击比赛场参数返回
            
            

            socket.on("command", function (result) {
                if (self.inited == true) {
                    var data = self.parse(result);
                   self.route(data.command)(data, self);
                  
                }
            });

            this.inited = false;
        }
    },

    //点击签到返回
    dosign_event:function(data,context){
        console.log('dosign:'+data);
        console.log(data);
    },

    onClickqiandao:function(){
        var mydate = new Date();
       var day = myDate.getDate();
       var laoutnode = cc.ss.openwin.getChildByName('表格外框').getChildByName('表格图片').getChildByName('laout');
       for(var inx = 0; inx < laoutnode.children.length; inx++){
            if(laoutnode[inx].getChildByName('dayfont').getComponent(cc.Label).string == day){
                laoutnode[inx].getChildByName('duihao').active = true;
            }
        }
    },


    start () {

    },


});
