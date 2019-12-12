var ssCommon = require("ssCommon");
cc.Class({
    extends: ssCommon,

    properties: {
        clubnumdata: {
            default: null,
            type: cc.Node
        },
    },

    onLoad: function () {
        this.clubid = new Array();
    },
    onClick: function (event, data) {
        if (data != null) {
            cc.ss.audio.playSFX("btn_click");
            this.clubid.push(data);
            this.disRoomId();
        }
        if (this.clubid.length == 6) {
            if (this.ready()) {
                let socket = this.socket();
                var club = {
                    extparams: {}
                };

                club.extparams.clubid = this.clubid.join("");
                club.extparams.userid = cc.ss.user.id;
                club.extparams.appleid = '';
                socket.exec("joinclub", club);
            }

            // this.loadding();
        }

    },

    disRoomId: function () {
        if (this.clubid.length > 0) {
            this.clubnumdata.opacity = 255;
            this.clubnumdata.color = new cc.color(255,255,255);
            this.clubnumdata.getComponent(cc.RichText).string = this.clubid.join('');
        } else {
            this.clubnumdata.opacity = 110;
            this.clubnumdata.color = new cc.color(156,156,156);
            this.clubnumdata.getComponent(cc.RichText).string = '输入亲友圈番号';
        }
    },
    //删除
    onDeleteClick: function () {
        cc.ss.audio.playSFX("btn_click");
        this.clubid.splice(this.clubid.length - 1, this.clubid.length)
        this.disRoomId();
        // this.onClick();
    },
    //重输
    onCleanClick: function () {
        cc.ss.audio.playSFX("btn_click");
        this.clubid.splice(0, this.clubid.length);
        this.disRoomId();
    },

    start() {

    },

    // update (dt) {},
});
