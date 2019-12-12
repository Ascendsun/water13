var ssCommon = require("ssCommon");
cc.Class({
    extends: ssCommon,

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
        //第一
        first: {
            default: null,
            type: cc.Node
        },
        //第二
        second: {
            default: null,
            type: cc.Node
        },
        gamepoint:{
            default: null,
            type: cc.Node
        },
        title:{
            default: null,
            type: cc.Node
        },
        global: {
            default: null,
            type: cc.Node
        },
        playway: {
            default: null,
            type: cc.Prefab
        },
        content: {
            default: null,
            type: cc.Node
        },
        
        
    },

   
});
