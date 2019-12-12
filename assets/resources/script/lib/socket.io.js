cc.Class({
    extends: cc.Component,
    properties: {
        ws:null
    },
    connect:function(url ,options,assc,faild){
        let self = this ;

        this.ws = new WebSocket(url);
        //链接成功后回调函数
        this.ws.onopen = function (event) {
            console.log('sio 连接已经打开 Send Text WS was opened.'+JSON.stringify(event));
           // options.sendgamestatus;
           assc();
        },
        //从服务器收到信息时的回调函数
        this.ws.onmessage = function (event) {
            console.log("event in callback：" +JSON.stringify(event));
            var data = self.parse(event.data) ;
            console.log("event in callback：" + event.data);
             if(data!=null && data.event != null){
                cc.ss.event[data.event](event.data);
            }
        },
        //链接失败后的回调函数
        this.ws.onerror = function (event) {
            console.log("Send Text fired an error");
            faild();
        },
        //链接关闭后的回调函数
        this.ws.onclose = function (event) {
            console.log("WebSocket instance closed.");
        };

        return this;
    },
    on:function(command , func){
        cc.ss.event[command] =  func ;
    },
    exec:function(command , data){
        if (this.ws.readyState === WebSocket.OPEN) {
            console.log(command , data);
            data.command = command;
            data.userid = cc.ss.userMgr.userId;
            data.orgi = cc.ss.seckey ;
            data.token = cc.ss.authorization ;
            this.ws.send(JSON.stringify(data));
        }
    },
    emit:function(command , data){
        let param = {
            data : data
        } ;
        this.exec(command , param) ;
    },
    disconnect:function(){
        cc.game.off(cc.game.EVENT_HIDE);
        cc.game.off(cc.game.EVENT_SHOW);
    },
    parse:function(result){
        return JSON.parse(result) ;
    },
});
