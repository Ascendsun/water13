    cc.Class({
        extends: cc.Component,
        properties: {
            bgmVolume: 1,
            sfxVolume: 1,
            bgmAudioID: -1,
            sfxAudioClip: [],
            isBackground: !1
        },
        init: function() {
            var e = this,
            t = cc.sys.localStorage.getItem("bgmVolume");
            null != t && (this.bgmVolume = parseFloat(t));
            var a = cc.sys.localStorage.getItem("sfxVolume");
            null != a && (this.sfxVolume = parseFloat(a)),
            cc.game.on(cc.game.EVENT_HIDE,
            function() {
                console.log("cc.audioEngine.pauseAll"),
                e.isBackground = !0,
                cc.audioEngine.pauseAll()
            }),
            cc.game.on(cc.game.EVENT_SHOW,
            function() {
                console.log("cc.audioEngine.resumeAll"),
                e.isBackground = !1,
                cc.audioEngine.resumeAll()
            })
        },
        getUrl: function(e) {
            return cc.url.raw("resources/audio/" + e)
        },
        playBGM: function(e) {
            var t = this;
            cc.loader.loadRes("audio/" + e, cc.AudioClip,
            function(e, a) {
                e ? console.log(e) : (t.bgmAudioID >= 0 && cc.audioEngine.stop(t.bgmAudioID), 0 == t.isBackground && (t.bgmAudioID = cc.audioEngine.play(a, !0, t.bgmVolume)))
            })
        },
        playSFX: function(e, t) {
            var a = this;
            if (null == this.sfxAudioClip && (this.sfxAudioClip = []), null != this.sfxAudioClip[e]) {
                if (this.sfxVolume > 0 && 0 == this.isBackground) {
                    var n = cc.audioEngine.play(this.sfxAudioClip[e], !1, this.sfxVolume);
                    return t && t(n),
                    n
                }
                return t && t( - 1),
                -1
            }
            cc.loader.loadRes("audio/" + e, cc.AudioClip,
            function(n, i) {
                if (!n) {
                    if (a.sfxAudioClip[e] = i, a.sfxVolume > 0 && 0 == a.isBackground) {
                        var s = cc.audioEngine.play(i, !1, a.sfxVolume);
                        return t && t(s),
                        s
                    }
                    return t && t( - 1),
                    -1
                }
                console.log(n)
            })
        },
        stopSFX: function(e) { - 1 != e && cc.audioEngine.stop(e)
        },
        setSFXVolume: function(e) {
            this.sfxVolume != e && (cc.sys.localStorage.setItem("sfxVolume", e), this.sfxVolume = e)
        },
        setBGMVolume: function(e, t) {
            this.bgmAudioID >= 0 && (e > 0 ? cc.audioEngine.resume(this.bgmAudioID) : cc.audioEngine.pause(this.bgmAudioID)),
            (this.bgmVolume != e || t) && (cc.sys.localStorage.setItem("bgmVolume", e), this.bgmVolume = e, cc.audioEngine.setVolume(this.bgmAudioID, e))
        },
        pauseAll: function() {
            cc.audioEngine.pauseAll()
        },
        resumeAll: function() {
            cc.audioEngine.resumeAll()
        }
    });