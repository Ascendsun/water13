"use strict";
cc._RF.push(module, '6cec81E6xpJha9kLGshjdk8', 'ActionEvent');
// module/game/majiang/script/event/ActionEvent.js

"use strict";

var beiMiCommon = require("BeiMiCommon");

cc.Class({
    extends: beiMiCommon,

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
    },

    // use this for initialization
    onLoad: function onLoad() {},
    onClick: function onClick(event, data) {
        this.node.dispatchEvent(new cc.Event.EventCustom(data, true));
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();