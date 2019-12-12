var ssCommon = require("ssCommon");
cc.Class({
    extends: ssCommon,

    properties: {
    },
    onLoad: function () {

    },
    onClick:function(){
        this.logout();
        this.scene("login", this) ;
    }

});
