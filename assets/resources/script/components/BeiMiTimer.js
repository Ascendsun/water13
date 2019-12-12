var ssCommon = require("ssCommon");
var chcode = require("modol");
cc.Class({
    extends: ssCommon,

    properties: {
    },
    onLoad: function () {

    },
    init: function (text, time, target, data, context) {
        let self = this;
        this.remaining = time;
        //定时器
        this.schedule(function () {
            this.remaining = this.remaining - 1;
            if (this.remaining < 0 || chcode.closetime == true) {
                console.log('点击按钮了')
                self.unschedule(this);
            }
        }, 1, time);
    },
    stop: function (target) {
        this.remaining = 0;
    }
});
