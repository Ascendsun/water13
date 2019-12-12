var chcode = require("modol");
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
        music: {
            default: null,
            type: cc.Sprite
        },
        musicSlider: {
            default: null,
            type: cc.Slider
        },
        sound: {
            default: null,
            type: cc.Sprite
        },
        soundSlider: {
            default: null,
            type: cc.Slider
        },
        musicon: {
            default: null,
            type: cc.Node
        },
        musicoff: {
            default: null,
            type: cc.Node
        },
        soundon: {
            default: null,
            type: cc.Node
        },
        soundoff: {
            default: null,
            type: cc.Node
        },
        zhuobunode: {
            default: null,
            type: cc.Node
        },
        audioarr: {
            default: null,
            type: cc.Node
        },
        qumukuang: {
            default: null,
            type: cc.Node
        },
        qumuselect: {
            default: null,
            type: cc.Node
        },
        rubcardnode: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        console.log(cc.ss.audio.bgsoundVolume);
        this.musicSlider.progress = cc.ss.audio.bgVolume;
        this.music.fillRange = cc.ss.audio.bgVolume;
        this.soundSlider.progress = cc.ss.audio.bgsoundVolume;
        this.sound.fillRange = cc.ss.audio.bgsoundVolume;
        if (cc.ss.audio.getState() == cc.audioEngine.AudioState.PLAYING) {
            this.musicon.active = true;
            this.musicoff.active = false;
        } else {
            this.musicon.active = false;
            this.musicoff.active = true
        }

        if (this.soundSlider.progress == 0 && this.sound.fillRange == 0) {
            this.soundon.active = false;
            this.soundoff.active = true;
        } else {
            this.soundon.active = true;
            this.soundoff.active = false;
        }

        if (cc.ss.usersetting.cloth == 1) {
            this.zhuobunode.getChildByName('toggle1').getComponent(cc.Toggle).check();
            this.zhuobunode.getChildByName('toggle2').getComponent(cc.Toggle).uncheck();
        } else if (cc.ss.usersetting.cloth == 2) {
            this.zhuobunode.getChildByName('toggle2').getComponent(cc.Toggle).check();
            this.zhuobunode.getChildByName('toggle1').getComponent(cc.Toggle).uncheck();
        }


        if (cc.ss.usersetting.bgmusic == 0) {
            this.qumukuang.getChildByName('audioname').getComponent(cc.Label).string = '曲目1';
        } else {
            for (var inxu = 0; inxu < this.audioarr.children.length; inxu++) {
                if (this.audioarr.children[inxu].getChildByName('New Label').getComponent(cc.Label).string == cc.ss.usersetting.bgmusic) {
                    this.qumukuang.getChildByName('audioname').getComponent(cc.Label).string = this.audioarr.children[inxu].getChildByName('New Label').getComponent(cc.Label).string;
                }
            }
        }


        if (cc.ss.usersetting.rubcard == false) {
            this.rubcardnode.getChildByName('toggle1').getComponent(cc.Toggle).uncheck();
            this.rubcardnode.getChildByName('toggle2').getComponent(cc.Toggle).check();
        } else {
            this.rubcardnode.getChildByName('toggle1').getComponent(cc.Toggle).check();
            this.rubcardnode.getChildByName('toggle2').getComponent(cc.Toggle).uncheck();
        }

        // this.qumuselect.children[0].children[1].on('click',this.fun, this);

    },
    //音乐
    onMusicSlide: function (slider) {
        console.log("音量传出" + slider);
        console.log(slider);
        this.music.fillRange = slider.progress;
        cc.ss.audio.setBGMVolume(slider.progress);
        this.musicon.active = true;
        this.musicoff.active = false;
    },
    //音效
    onSoundSlide: function (slider) {
        console.log('音效音量:' + slider);
        console.log(slider)
        this.sound.fillRange = slider.progress;
        cc.ss.audio.setSoundVolume(slider.progress);
        this.soundon.active = true;
        this.soundoff.active = false;
    },
    onMusiceBtnClick: function () {
        if (cc.ss.audio.getState() == cc.audioEngine.AudioState.PLAYING) {
            this.musicon.active = false;
            this.musicoff.active = true;
            cc.ss.audio.pausebg();
        } else {
            this.musicon.active = true;
            this.musicoff.active = false;
            cc.ss.audio.resumebg();
        }
    },
    onSoundBtnClick: function () {
        // if(cc.ss.audio.getuState() == cc.audioEngine.AudioState.PLAYING){
        //     this.soundon.active = false ;
        //     this.soundoff.active =  true;
        //     cc.ss.audio.pausesound();
        // }else{
        //     this.soundon.active = true ;
        //     this.soundoff.active =  false;
        //     cc.ss.audio.resumsound();
        // }
        console.log('进来这个方法了');
        if (this.soundon.active == true) {
            cc.ss.audio.setSoundVolume(0);
            this.soundon.active = false;
            this.soundoff.active = true;
        } else {
            cc.ss.audio.setSoundVolume(this.soundSlider.fillRange);
            this.soundon.active = true;
            this.soundoff.active = false;
        }
    },

    //更换游戏桌布
    bgimgupdata: function (event, CustomEventData) {
        if (CustomEventData == 1) {
            if (cc.find('Canvas/global/main/poker') == null) {
                cc.ss.usersetting.cloth = 1;
                /* 在这里把个人设置写入数据文件*/
            } else {
                /* 在这里把个人设置写入数据文件*/
                cc.ss.usersetting.cloth = 1;
                let sprite = cc.find('Canvas/global/main/bg').getComponent(cc.Sprite);
                cc.loader.loadRes('images/atlas/chuli', cc.SpriteFrame, function (err, spriteFrame) {
                    sprite.spriteFrame = spriteFrame;
                })
            }
        } else if (CustomEventData == 2) {
            if (cc.find('Canvas/global/main/poker') == null) {
                cc.ss.usersetting.cloth = 2;
                /* 在这里把个人设置写入数据文件*/
            } else {
                /* 在这里把个人设置写入数据文件*/
                cc.ss.usersetting.cloth = 2;
                let sprite = cc.find('Canvas/global/main/bg').getComponent(cc.Sprite);
                cc.loader.loadRes('images/atlas/chuli2', cc.SpriteFrame, function (err, spriteFrame) {
                    sprite.spriteFrame = spriteFrame;
                })
            }
        }
    },

    updatabgmusic: function (event, CustomEventData) {
        console.log('点击的:' + event);
        console.log(event)
        if (CustomEventData == 1) {
            cc.ss.usersetting.bgmusic = event.node.getChildByName('New Label').getComponent(cc.Label).string;
            this.qumukuang.getChildByName('audioname').getComponent(cc.Label).string = event.node.getChildByName('New Label').getComponent(cc.Label).string;
            cc.ss.audio.playBGM(cc.ss.audiolist[0]);
        } else if (CustomEventData == 2) {
            cc.ss.usersetting.bgmusic = event.node.getChildByName('New Label').getComponent(cc.Label).string;
            this.qumukuang.getChildByName('audioname').getComponent(cc.Label).string = event.node.getChildByName('New Label').getComponent(cc.Label).string;
            cc.ss.audio.playBGM(cc.ss.audiolist[1]);
        } else if (CustomEventData == 3) {
            cc.ss.usersetting.bgmusic = event.node.getChildByName('New Label').getComponent(cc.Label).string;
            this.qumukuang.getChildByName('audioname').getComponent(cc.Label).string = event.node.getChildByName('New Label').getComponent(cc.Label).string;
            cc.ss.audio.playBGM(cc.ss.audiolist[2]);
        } else if (CustomEventData == 4) {
            cc.ss.usersetting.bgmusic = event.node.getChildByName('New Label').getComponent(cc.Label).string;
            this.qumukuang.getChildByName('audioname').getComponent(cc.Label).string = event.node.getChildByName('New Label').getComponent(cc.Label).string;
            cc.ss.audio.playBGM(cc.ss.audiolist[3]);
        } else if (CustomEventData == 5) {
            cc.ss.usersetting.bgmusic = event.node.getChildByName('New Label').getComponent(cc.Label).string;
            this.qumukuang.getChildByName('audioname').getComponent(cc.Label).string = event.node.getChildByName('New Label').getComponent(cc.Label).string;
            cc.ss.audio.playBGM(cc.ss.audiolist[4]);
        } else if (CustomEventData == 6) {
            cc.ss.usersetting.bgmusic = event.node.getChildByName('New Label').getComponent(cc.Label).string;
            this.qumukuang.getChildByName('audioname').getComponent(cc.Label).string = event.node.getChildByName('New Label').getComponent(cc.Label).string;
            cc.ss.audio.playBGM(cc.ss.audiolist[5]);
        }
    },

    //搓牌选项
    oncuopai: function (event, CustomEventData) {
        if (CustomEventData == 1) {
            cc.ss.usersetting.rubcard = true;
        } else if (CustomEventData == 2) {
            cc.ss.usersetting.rubcard = false;
        }
    },

    onClickqumu: function () {
        if (this.qumuselect.active == false) {
            this.qumuselect.active = true;
            for (var i = 0; i < this.qumuselect.children[0].children.length; i++) {
                if (this.qumuselect.children[0].children[i].getChildByName('New Label').getComponent(cc.Label).string == this.qumukuang.children[0].getComponent(cc.Label).string) {
                    this.qumuselect.children[0].children[i].getComponent(cc.Toggle).check();
                }
            }
        } else {
            this.qumuselect.active = false;

        }
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
