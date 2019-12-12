
    var n = function(e) {
        return e && e.__esModule ? e: {
        default:
            e
        }
    },
     i = require("ResManager");
    cc.Class({
        extends: cc.Component.
    default,
        properties: {},
        checkSysIsWechat: function() {
            if (!cc.sys.isNative && (cc.sys.browserType == cc.sys.MOBILE_BROWSER || cc.sys.browserType == cc.sys.DESKTOP_BROWSER || cc.sys.browserType == cc.sys.BROWSER_TYPE_CHROME || cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT || cc.sys.browserType == cc.sys.BROWSER_TYPE_MOBILE_QQ || cc.browserUA.xianliao)) {
                var e = cc.visibleRect;
                90 == window.orientation || -90 == window.orientation || e.width > e.height && !cc.sys.isMobile ? cc.find("Canvas").rotation = 0 : cc.find("Canvas").rotation = 180
            }
        },
        checkPopMsg: function() {
            null != cc.ss.waitPopStr && (cc.ss.alert.show("标题", cc.ss.waitPopStr), cc.ss.waitPopStr = null)
        },
        start: function() {
            console.log("BaseScene start()"),
            this.checkSysIsWechat()
        },
        setPreLoadList: function(e) {
            i.ResManager.getInstance().setPreloadingList(e)
        },
        onDestroy: function() {
            i.ResManager.getInstance().clearPreloadingList(),
            n.
        default.prototype.onDestroy.call(this)
        }
    });
 