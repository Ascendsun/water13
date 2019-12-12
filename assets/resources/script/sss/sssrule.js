
cc.Class({
     extends: cc.Component,
    // sssrule: [
    //  function (e, t, a) {
    //"use strict";
    //cc._RF.push(t, "39c25rPEiJEcaeMu5LQdU1L", "sssrule");
    //   var n = function (e) {
    //       return e && e.__esModule ? e : {
    //           default: e
    //       }
    //   }(e("../../Base/BaseView"));
    //  cc.Class({
   // extends: n.default,
    properties: {
        label1: cc.RichText,
        label2: cc.RichText
    },
    onLoad: function () { }, showWanFaInfo: function (e) {
        for (var t = [], a = [], n = 0; n < e.length; n++) parseInt(n) < 3 ? t.push(e[n]) : a.push(e[n]);
        if (a.length > 0) {
            var i = t.join(" "),
                s = a.join(" ");
            this.label1.string = i, this.label2.string = s
        } else {
            var o = t.join(" ");
            this.label1.string = o, this.label2.active = !1
        }
    }
    //   }), cc._RF.pop()
    //  }, {
    //       "../../Base/BaseView": "BaseView"
    //  }
    //],
});
