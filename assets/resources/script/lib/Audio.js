cc.Class({
    extends: cc.Component,

    properties: {
        bgVolume:1.0,           // 背景音量
        deskVolume:1.0,         //   房间 房间音量
        bgAudioID:-1,            //   背景 音乐  id
        bgsoundVolume:1.0,      //音效音量
        soundID:-1,              //音效 id
    },

    // use this for initialization
    init: function () {

        cc.ss.audiolist[0] = 'audio/ox_bgm_game1';
        cc.ss.audiolist[1] = 'audio/ox_bgm';
        cc.ss.audiolist[2] = 'audio/ox_bgm_game2';
        cc.ss.audiolist[3] = 'audio/ox_bgm_game4';
        cc.ss.audiolist[4] = 'audio/ox_bgm_game5';
        cc.ss.audiolist[5] = 'audio/ox_bgm_game3';

        var userSetting = cc.sys.localStorage.getItem('userSetting');
         userSetting = JSON.parse(userSetting);
         if(userSetting != null && userSetting.bgmusic_vol > 1 || userSetting != null && userSetting.sound_vol > 1){
            cc.sys.localStorage.removeItem('userSetting');
         }else
        if (userSetting != null && userSetting != '') {
            cc.ss.usersetting = {
                bgmusic_vol: userSetting.bgmusic_vol,
                bgmusic_state: userSetting.bgmusic_state,
                sound_vol: userSetting.sound_vol,
                sound_state: userSetting.sound_state,
                cloth: userSetting.cloth,
                rubcard: userSetting.rubcard,
                bgmusic: userSetting.bgmusic
            };

        
        } else {
            cc.ss.usersetting = {
                bgmusic_vol: 0.5,
                bgmusic_state: true,
                sound_vol: 0.5,
                sound_state: true,
                cloth: 1,
                rubcard: true,
                bgmusic: '曲目1'
            };
        }

        cc.Button.prototype.touchEndedClone = cc.Button.prototype._onTouchEnded;
        cc.Button.prototype._soundOn = true;
        cc.Button.prototype.setSoundEffect = function (on) {
            this._soundOn = on;
        }

        // cc.Button.prototype._onTouchEnded = function (event) {
            // if (this.interactable && this.enabledInHierarchy && this._pressed && this._soundOn == true) {
            //     /**
            //      * 播放声效
            //      */
            //     // cc.beimi.audio.playSFX("select.mp3");
            // }
        //     this.touchEndedClone(event);
        // }

        var t = cc.sys.localStorage.getItem("bgVolume");
        if(t != null){
            this.bgVolume = parseFloat(t);    
        }

        var t = cc.sys.localStorage.getItem("bgsoundVolume");
        if(t != null){
            this.bgsoundVolume = parseFloat(t);
        }
        
        var t = cc.sys.localStorage.getItem("deskVolume");
        if(t != null){
            this. deskVolume = parseFloat(t);    
        }
        
        cc.game.on(cc.game.EVENT_HIDE, function () {
            cc.audioEngine.pauseAll();
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            cc.audioEngine.resumeAll();
        });
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    getUrl:function(url){
        return cc.url.raw("audio/" + url);
    },
    //游戏音乐
    playBGM:function(url){
        let self = this;
        cc.loader.loadRes(url , cc.AudioClip, function (err, AudioClip) {
          let audioid = cc.audioEngine.play(AudioClip,true,self.bgVolume);   
          cc.beimi.audiostatus = true;
            if(self.bgAudioID >= 0){
              cc.audioEngine.stop(self.bgAudioID);
            }
              self.bgAudioID = audioid;
         })
                                    //播放音频(音频剪辑,音乐是否循环,音乐体积)
    },
    //游戏特效
    playSFX:function(url){
        // var audioUrl = this.getUrl(url);
        let self = this;
        cc.loader.loadRes('audio/'+url , cc.AudioClip, function (err, AudioClip) {
           cc.audioEngine.play(AudioClip,false,self.bgsoundVolume);   
        })
        // if(this.sfxVolume > 0){
            
        // }
    },
    //设置特效体积
    setSFXVolume:function(v){
        if(this.sfxVolume != v){
            cc.sys.localStorage.setItem("deskVolume",v);
            this.deskVolume = v;
        }
    },

    getState:function(){
        return cc.audioEngine.getState(this.bgAudioID);
    },

    getuState:function(){
        return cc.audioEngine.getState(this.soundID);
    },
    //设置游戏音乐
    setBGMVolume:function(v,force){
        if(this.bgAudioID >= 0){
            if(v > 0 && cc.audioEngine.getState(this.bgAudioID) === cc.audioEngine.AudioState.PAUSED){
                cc.audioEngine.resume(this.bgAudioID);
            }else if(v == 0){
                cc.audioEngine.pause(this.bgAudioID);
            }
        }
        if(this.bgVolume != v || force){
            cc.sys.localStorage.setItem("bgVolume",v);
            this.bgmVolume = v;
            cc.audioEngine.setVolume(this.bgAudioID,v);
        }
        cc.beimi.audio.bgVolume = v;
    },

    //设置游戏音效
    setSoundVolume:function(v,force){
        console.log(v,force)
        if(this.soundID >= 0){
            if(v > 0 && cc.audioEngine.getState(this.soundID) === cc.audioEngine.AudioState.PAUSED){
                cc.audioEngine.resume(this.soundID);
            }else if(v == 0){
                cc.audioEngine.pause(this.soundID);
            }
        }
        if(this.bgsoundVolume != v || force){
            cc.sys.localStorage.setItem("bgsoundVolume",v);
            this.playSoundVolume = v;
            cc.audioEngine.setVolume(this.soundID,v);
        }
         cc.beimi.audio.bgsoundVolume = v;
    },


    //暂停所有
    pauseAll:function(){
        cc.audioEngine.pauseAll();
    },
    //继续所有
    resumeAll:function(){
        cc.audioEngine.resumeAll();
    },
//-----------以上两个方法暂时无处用到------------------


    //背景音乐暂停
    pausebg:function(){
        cc.audioEngine.pause(this.bgAudioID);
        cc.beimi.usersetting.bgmusic_state = false;
    },
    //背景音乐继续
    resumebg:function(){
        cc.audioEngine.resume(this.bgAudioID);
        cc.beimi.usersetting.bgmusic_state = true;
    },
    //音效暂停
    pausesound:function(){
        cc.audioEngine.pause(this.soundID);
    },
    //音效继续
    resumsound:function(){
        cc.audioEngine.resume(this.soundID);
    }
});
