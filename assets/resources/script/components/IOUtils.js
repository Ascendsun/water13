cc.Class({
    extends: cc.Component,

    properties: {

    },

    statics:{
        get:function(key){
            console.log(cc.sys.localStorage.getItem(key)+"这个是get方法返回的参数")
            return cc.sys.localStorage.getItem(key) ;
        },
        put:function(key , value){
            cc.sys.localStorage.setItem(key, value) ;
        },
        remove:function(key){
            cc.sys.localStorage.removeItem(key) ;
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
