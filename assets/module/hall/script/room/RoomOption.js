var ssCommon = require("ssCommon");
cc.Class({
    extends: ssCommon,
    properties: {
        createroom:{
            default:null ,
            type : cc.Node
        },
        fenshuselect:{
            default:null,
            type:cc.Node
        }
        
        
    },

    // use this for initialization
    onLoad: function () {
        let self = this ;
        console.log(self);
        console.log("self的值")
        this.group = new Array();
        this.node.on('createroom', function (event) {
            /**
             * 把参数 汇总一下， 然后转JSON以后序列化成字符串，发送 创建房间的请求
             */
            var extparams = {} ;
            let values = new Array();
            for(var inx=0 ; inx<self.group.length ; inx++){
                let groupitem = self.group[inx] ;
                let value = "" ;
                for(var j=0 ; j<groupitem.groupoptions.length ; j++){
                    let option = groupitem.groupoptions[j] ;
                    if(option.checked == true){
                        if(value != ""){
                            value = value + "," ;
                        }
                        value = value + option.item.value ;
                    }
                }
                extparams[groupitem.data.code] = value ;
            }
            event.stopPropagation() ;
            self.preload(extparams , self) ;
        });
    },
});
