var ssCommon = require("ssCommon");
cc.Class({
    extends: ssCommon,

    properties: {
        username: {
            default: null,
            type: cc.Label
        },
        goldcoins: {
            default: null,
            type: cc.Label
        },
        cards: {
            default: null,
            type: cc.Label
        }
        ,
        girl: {
            default: null,
            type: cc.Node
        },
        userid: {
            default: null,
            type: cc.Label
        },
        userimg: {
            default: null,
            type: cc.Node
        },
        seximg: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        if (cc.ss.audiostatus != true && cc.ss.usersetting.bgmusic_state == true) {
            cc.ss.audio.playBGM("audio/ox_bgm_game1");
        }
        cc.ss.type = 'hall';
        if (this.ready()) {
            if (cc.ss.user.username.length > 6) {
                this.username.string = cc.ss.user.username.substr(0, 6);
            } else {
                this.username.string = cc.ss.user.username;
            }

            //用户头像
            let strurl = cc.ss.user.headimg.replace(/\\/g, "/");
            let sprite = this.userimg.getComponent(cc.Sprite);
            cc.loader.load(strurl, function (err, texture) {
                if (err) {
                    cc.loader.loadRes('images/atlas/headimg', cc.SpriteFrame, function (err, spriteFrame) {
                        sprite.spriteFrame = spriteFrame;
                    });
                }
                let spritec = new cc.SpriteFrame(texture);
                sprite.spriteFrame = spritec
            });



            var sexsprite = this.seximg.getComponent(cc.Sprite);
            if (cc.ss.user.sex == 0) {
                for (var inxa = 0; inxa < cc.ss.imgresource.length; inxa++) {
                    if ('sexwomen' == cc.ss.imgresource[inxa].name) {
                        sexsprite.spriteFrame = cc.ss.imgresource[inxa];
                    }
                }
            } else if (cc.ss.user.sex == 1) {
                for (var inxa = 0; inxa < cc.ss.imgresource.length; inxa++) {
                    if ('sexmen' == cc.ss.imgresource[inxa].name) {
                        sexsprite.spriteFrame = cc.ss.imgresource[inxa];
                    }
                }
            }

            this.userid.string = cc.ss.user.id;

            this.pva_format(cc.ss.user.goldcoins, cc.ss.user.diamonds)
        }

        if (cc.ss.usersign == false && cc.find('Canvas').getChildByName('signhint') == null) {
            cc.loader.loadRes('images/atlas/ico_new', cc.SpriteFrame, function (err, spriteFrame) {
                var node = new cc.Node();
                node.name = 'signhint';
                node.active = true;
                node.addComponent(cc.Sprite);
                node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                node.width = 15;
                node.height = 15;
                node.x = -10;
                node.y = -297;
                cc.find('Canvas').addChild(node);
            });
        }

        if (cc.ss.usermsg == true && cc.find('Canvas/global/main/useryou/消息/usermsgtag') == null) {
            cc.loader.loadRes('images/atlas/ico_new', cc.SpriteFrame, function (err, spriteFrame) {
                var node = new cc.Node();
                node.name = 'usermsgtag';
                node.active = true;
                node.addComponent(cc.Sprite);
                node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                node.width = 15;
                node.height = 15;
                node.x = 21;
                node.y = 31;
                cc.find('Canvas/global/main/useryou/消息').addChild(node);
            });
        } else if (cc.ss.usermsg == false && cc.find('Canvas/global/main/useryou/消息/usermsgtag') != null) {
            cc.find('Canvas/global/main/useryou/消息/usermsgtag').active = false;
            cc.find('Canvas/global/main/useryou/消息/usermsgtag').destroy();
        }
    },
    pva_format: function (goldcoins, diamonds) {
        if (goldcoins > 9999) {
            var num = goldcoins / 10000;
            this.goldcoins.string = num.toFixed(2) + '万';
        } else {
            this.goldcoins.string = goldcoins;
        }

        if (diamonds > 9999) {
            var num = diamonds / 10000;
            this.cards.string = num.toFixed(2) + '万';
        } else {
            this.cards.string = diamonds;
        }
    },
    // playToLeft: function () {
    //     //播放动画组件
    //     this._girlAnimCtrl = this.girl.getComponent(cc.Animation);
    //     this._girlAnimCtrl.play("girl_to_left");
    // },
    // playToRight: function () {
    //     this._girlAnimCtrl = this.girl.getComponent(cc.Animation);
    //     this._girlAnimCtrl.play("girl_to_right");
    // },
    onDestroy: function () {
        this.cleanpvalistener();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
