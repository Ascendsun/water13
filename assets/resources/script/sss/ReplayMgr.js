cc.Class({
    extends: cc.Component,
    properties: {
        _lastAction: null,
        _actionRecords: null,
        _currentIndex: 0,
        _replayData: null,
        _loadResFinished: !1
    },
    onLoad: function () { },
    clear: function () {
        this._lastAction = null,
            this._actionRecords = null,
            this._currentIndex = 0,
            this._loadResFinished = !1
    },
    setLoadResFinished: function (e) {
        this._loadResFinished = e,
            cc.ss.wc.hide()
    },
    isReplay: function () {
        return null != this._replayData && null != this._replayData.action_records
    },
    getNextAction: function () {
        if (this._currentIndex >= this._replayData.action_records.length) return null;
        var e = this._replayData.action_records[this._currentIndex++];
        return {
            si: e[0],
            type: e[1],
            pai: e[2]
        }
    },
    takeAction: function () {
        if (!this._loadResFinished) return 1;
        var e = this.getNextAction();
        return cc.ss.gameNetMgr.takeAction(e)
    }
});
