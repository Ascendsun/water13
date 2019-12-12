
cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad() {
        let self = this;
        this.schedule(function () {
                self.node.getComponent(cc.ProgressBar).progress = cc.sys.getBatteryLevel();
                if (cc.sys.getBatteryLevel() <= 0.4) {
                    self.node.children[0].color = new cc.color(255, 38, 29, 255)
                } else if (cc.sys.getBatteryLevel() >= 0.5 && cc.sys.getBatteryLevel() <= 0.7) {
                    self.node.children[0].color = new cc.color(255, 192, 29, 255)
                } else if (cc.sys.getBatteryLevel() >= 0.8 && cc.sys.getBatteryLevel() <= 1) {
                    self.node.children[0].color = new cc.color(92, 255, 29, 255)
                }
        }, 60 , cc.macro.REPEAT_FOREVER , 0);
    }
});
