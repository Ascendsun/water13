
cc.Class({
    extends: cc.Component,

    properties: {
        // Sprite: {
        //     default:null,
        //     type: cc.sprite
        // },
        _rootnode: null,
        _rootpath: "",
        _seats2: [],
        _timeLabel: null,
        _voiceMsgQueue: [],
        _lastPlayingSeat: null,
        _playingSeat: null,
        _lastPlayTime: null,
        _xianshitaoxiang: !0
    },
    onLoad: function () {

        !cc.ss ? cc.error('加载失败cc.ss--' + cc.ss) : cc.warn('根节点加载成功cc.ss--' + cc.ss);
        cc.ss && (this._rootpath = "Canvas/base",
            this._rootnode = cc.find(this._rootpath),
            this.initView(),
            this.initEventHandlers()
        );
        //this.getoffline();
        //this.testcode();
    },
    imageLoadTool(url, callback) {
        var dirpath = jsb.fileUtils.getWritablePath() + 'customHeadImage/';
        //console.log("dirpath ->",dirpath);
        //  let md5URL = md(url);
        var filepath = dirpath + 'md5URL' + '.jpg';
        console.log("filepath ->", filepath);
        function loadEnd() {
            cc.loader.load(filepath, function (err, tex) {
                if (err) {
                    cc.error(err);
                } else {
                    var spriteFrame = new cc.SpriteFrame(tex);
                    if (spriteFrame) {
                        spriteFrame.retain();
                        callback(spriteFrame);
                    }
                }
            });
        }
        if (jsb.fileUtils.isFileExist(filepath)) {
            cc.log('Remote is find' + filepath);
            loadEnd();
            return;
        }
        var saveFile = function (data) {
            if (typeof data !== 'undefined') {
                if (!jsb.fileUtils.isDirectoryExist(dirpath)) {

                    jsb.fileUtils.createDirectory(dirpath);
                } else {
                    console.log("路径exist");
                }

                // new Uint8Array(data) writeDataToFile  writeStringToFile
                if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
                    cc.log('Remote write file succeed.');
                    loadEnd();
                } else {
                    cc.log('Remote write file failed.');
                }
            } else {
                cc.log('Remote download file failed.');
            }
        };
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            cc.log("xhr.readyState  " + xhr.readyState);
            cc.log("xhr.status  " + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    //responseType一定要在外面设置
                    // xhr.responseType = 'arraybuffer'; 
                    saveFile(xhr.response);
                } else {
                    saveFile(null);
                }
            }
        }.bind(this);
        //responseType一定要在外面设置
        xhr.responseType = 'arraybuffer';
        xhr.open("GET", url, true);
        xhr.send();
    },



    testcode: function () {

        PannerNode = cc.find('Canvas');
        var node = new cc.Node('driwbox');
        var sp = node.addComponent(cc.Sprite);

        cc.loader.load('http://www.8dyl.cn:7456/img/1/1.jpg', function (err, texture) {
            let spritec = new cc.SpriteFrame(texture);
            sp.spriteFrame = spritec
        });

        node.parent = PannerNode;
        node.setPosition(0, 0);
    },

    initView: function () {
        var e = this._rootnode.getChildByName("seats");
        for (var t in e.children) e.children[t].active = true;// 这里是后加大 ，打开节点
        var a = this._rootnode.getChildByName("seatChat");
        a.zIndex = 2, a.active = !0;
        for (var n in a.children) a.children[n].active = false;
        this.refreshBtns();
    },

    refreshBtns: function () { },


    initEventHandlers: function () {//初始化头
        var e = this;
        this.node.on("login_result", function (t) {
            e.initSeats()
        }),

            this.node.on("new_user", function (t) {
                e.updateSingleSeat(t)
            }),

            this.node.on("user_state_changed", function (t) {
                e.updateSingleSeat(t)
            }),

            this.node.on("holds_count", function (t) {
                e.updateHoldsCount(t)
            }),

            this.node.on("game_ustatus", function () {//座位人数大于1人
                if (e._seats2.length > 1)
                    for (var t = 0; t < cc.ss.gameNetMgr.maxplayer; t++) e._seats2[t].setReady(false) //关闭准备按钮
            }),

            this.node.on("game_begin", function (t) {
                cc.ss.replayMgr.isReplay() && e.initSeats(), e.refreshBtns()//如果游戏开始初始化座位并刷新按钮
            }),

            this.node.on("game_reset", function (e) { }), //复位

            this.node.on("player_outCard_notify", function (t) { //玩家亮牌
                if (e._seats2.length > 1)
                    for (var a = 0; a < cc.ss.gameNetMgr.maxplayer; a++) e._seats2[a].setcomparepai()//翻开玩家座位下的牌
            }),

            this.node.on("voice_msg", function (t) {//播放语音
                e._voiceMsgQueue.push(t), e.playVoice()
            }),

            this.node.on("chat_push", function (t) {//聊天
                var a = cc.ss.gameNetMgr.getSeatIndexByID(t.sender),
                    n = cc.ss.gameNetMgr.getLocalIndex(a);
                e._seats2[n].chat(t.content)
            }),

            this.node.on("quick_chat_push", function (t) {//固定文职聊天
                var a = cc.ss.gameNetMgr.getSeatIndexByID(t.sender),
                    i = cc.ss.gameNetMgr.getLocalIndex(a),
                    s = t.content,
                    o = n.QuickChatInfo[s];
                e._seats2[i].chat(o), cc.ss.gameNetMgr.playPhraseSound(t.sender, s)
            }),

            this.node.on("emoji_push", function (t) {//表情
                var a = cc.ss.gameNetMgr.getSeatIndexByID(t.sender),
                    n = cc.ss.gameNetMgr.getLocalIndex(a);
                e._seats2[n].emoji(t.content)
            }),

            this.node.on("show_seats", function (t) {//显示座位
                var a = t;
                e._xianshitaoxiang = a,
                    e.showAllSeat(a)
            }),

            this.node.on("dissolve_notice", function (e) {//sssGameBase下的方法 打开解散房间
                cc.ss.replayMgr.isReplay() || cc.find("Canvas/base").getComponent("sssGameBase").openView("sssGameDissolve", "prefabs/game/sss/", 0, function (t) {
                    t.getComponent("sssGameDissolve").showDissolveNotice(e)
                })
            }),

            this.node.on("dissolve_notice_hide", function (e) {//sssGameBase下的方法关闭
                cc.ss.replayMgr.isReplay() || cc.find("Canvas/base").getComponent("sssGameBase").openView("sssGameDissolve", "prefabs/game/sss/", 0, function (e) {
                    e.getComponent("sssGameDissolve").closeAll()
                })
            }),

            this.node.on("dissolve_fail_push", function (e) {//失败显示错误弹窗
                0 !== e.errcode && cc.ss.alert.show("", e.errmsg)
            })
    },

    initSeats: function () {//初始化座位
        if (-1 != cc.ss.gameNetMgr.seatIndex) {
            for (var e = this._rootnode.getChildByName("seats"), t = this._rootnode.getChildByName("seatChat"), a = cc.ss.gameNetMgr.conf.players, n = cc.ss.gameNetMgr.getLocalSeats(), i = 0; i < n.length; ++i) {
                var s = "seat" + n[i],
                    o = t.getChildByName(s),
                    r = e.getChildByName(s).getComponent("sssSeat");
                r.setChatNode(o), this._seats2.length < a && this._seats2.push(r)
            }
            var c = cc.ss.gameNetMgr.seats;
            for (i = 0; i < c.length; ++i) this.updateSingleSeat(c[i])
        }
    },

    initSingleSeat: function (e) {//座位简单初始化
        var t = cc.ss.gameNetMgr.getLocalIndex(e.seatindex);
        this._seats2[t].initSeatInfo(), this._seats2[t].active = !0
    },

    updateHoldsCount: function (e) {
        var t = cc.ss.gameNetMgr.getLocalIndex(e.seatindex);
        this._seats2[t].setHoldsCount(e.holds_count)
    },

    updateSingleSeat: function (e) {//刷新座位消息
        if (0 == this._seats2.length) return !1;
        var t = cc.ss.gameNetMgr.getLocalIndex(e.seatindex);
        if (0 == e.userid) return this._seats2[t].node.active = !1, !1;
        3 == cc.ss.gameNetMgr.gamestate && (e.ready = !1);
        var a = !e.online;
        this._seats2[t].setInfo(e.name, e.score), this._seats2[t].setOffline(a), this._seats2[t].setID(e.userid), this._seats2[t].voiceMsg(!1), this._seats2[t].setReady(e.ready), 0 == this._xianshitaoxiang ? this._seats2[t].node.active = !1 : this._seats2[t].node.active = !0
    },

    onBtnBackClicked: function () {
        cc.ss.alert.show("返回大厅", "返回大厅房间仍会保留，快去邀请大伙来玩吧！", function () {
            cc.ss.wc.show("正在返回游戏大厅"), cc.director.loadScene("hall")
        }, !0)
    },

    onBtnWeichatClicked: function () {
        var e = "<大菠萝>";
        if ("SSS" == cc.ss.gameNetMgr.conf.type) e = "<大菠萝>";
        cc.ss.anysdkMgr.share("大菠萝" + e, "房号:" + cc.ss.gameNetMgr.roomId + " 玩法:" + cc.ss.gameNetMgr.getWanfa())
    },

    onBtnDissolveClicked: function () {
        cc.ss.alert.show("解散房间", "您是否请求解散房间？(第一局未结算，解散房间不扣房卡)", function () {
            cc.ss.net.send("dispress")
        }, !0)
    },

    onBtnExit: function () {
        cc.ss.net.send("exit")
    },

    playVoice: function () { },

    showAllSeat: function (e) {
        if (0 == this._seats2.length) return !1;
        for (var t = cc.ss.gameNetMgr.seats, a = 0; a < t.length; ++a) { //cc.ss.gameNetMgr.seats座位数组，
            var n = t[a],
                i = cc.ss.gameNetMgr.getLocalIndex(n.seatindex);
            0 != n.userid ? this._seats2[i].node.active = e : this._seats2[i].node.active = !1//匹配名称，匹配上了就显示座位
        }
    },

    update: function (e) {
        null != this._lastPlayTime ? Date.now() > this._lastPlayTime + 200 && (this.onPlayerOver(), this._lastPlayTime = null) : this.playVoice()
    },

    onPlayerOver: function () {
        cc.ss.audioMgr.resumeAll();
        var e = this._playingSeat;
        this._playingSeat = null, this._seats2[e].voiceMsg(false)//关闭语音图标
    },

    onDestroy: function () { },


});

