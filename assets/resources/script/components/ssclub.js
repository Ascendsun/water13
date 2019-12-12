
var ssCommon = require("ssCommon");
var chcode = require("modol");
cc.Class({
    extends: ssCommon,
    properties: {
        creatorinput: {
            default: null,
            type: cc.Node
        },
        joininput: {
            default: null,
            type: cc.Node
        },
        xiaojiahao:{
            default:null,
            type:cc.Node
        } ,
        changjianjulebu:{
            default:null,
            type:cc.Node
        },
        jiarujulebu:{
            default:null,
            type:cc.Node
        },
        tabletag:{
            default:null,
            type:cc.Prefab
        },
        jifenbang:{
            default:null,
            type:cc.Prefab
        },
        updateclubname:{
            default:null,
            type:cc.Prefab
        },
        jiesanclub:{
            default:null,
            type:cc.Prefab
        },
        roomoptionprefab:{
            default:null,
            type:cc.Prefab
        },
        clubzhajji: {
            default: null,
            type: cc.Prefab
        },
    },

    // onLoad () {},

    //创建俱乐部
    creatorclub: function () {
        if(this.creatorinput.getComponent(cc.EditBox).string != "" && this.creatorinput.getComponent(cc.EditBox).string != null){
            if (this.ready()) {
                var club = {
                    extparams : {}
                };
                club.extparams.userid = cc.ss.user.id,
                club.extparams.name = this.creatorinput.getComponent(cc.EditBox).string,
                cc.ss.socket.exec("creatclub" , club);
            }
        }else{
            var node = cc.find('Canvas/ckp/bolidi/huangbeijing/table');
            node.getChildByName('tishi').active = true;
        }
    },

    //加入俱乐部
    joinculb: function () {
        if(this.joininput.getComponent(cc.EditBox).string != "" && this.creatorinput.getComponent(cc.EditBox).string != null){
            console.log('加入')
            if (this.ready()) {
                var club = {
                    extparams : {}
                };
                club.extparams.userid = cc.ss.user.id,
                club.extparams.clubid = this.joininput.getComponent(cc.EditBox).string,
                cc.ss.socket.exec("joinclub" , club);
            }
        }else{
            var node = cc.find('Canvas/ckp/bolidi/huangbeijing/table1');
            node.getChildByName('tishi').active = true;
        }
    },

    //输入框获取焦点
    inputgetfocus: function (event) {
        event.node.parent.getChildByName('tishi').active = false;      
    },

    //输入框失去焦点
    inputlosefocus: function (event) {

        if(event.node.getComponent(cc.EditBox).string != "" && event.node.getComponent(cc.EditBox).string != null){
        }else{
            event.node.parent.getChildByName('tishi').active = true;
        }
    },

    //小加号
    onClickxiaojiahao:function(){
        if(this.xiaojiahao.active == false){
            this.xiaojiahao.active = true;
        }else{
            this.xiaojiahao.active = false;
        }
        
    },

    //小加号里的创建俱乐部
    onClickcreatejulebu:function(){
        var node = cc.find('Canvas/ckp/bolidi/huangbeijing/table2');
        var node2 = cc.find('Canvas/ckp/bolidi/huangbeijing/table2/view/danxuan');
        if(node2.children.length != null && node2.children.length > 0){
            for(var inx = 0; inx < node2.children.length; inx++){
                node2.children[inx].destroy();
            }
        }
        if(node.active == true){
            node.active = false;
        }
        if(this.jiarujulebu.active == true){
            this.jiarujulebu.active = false;
            this.changjianjulebu.active = true;
        }else{
            this.changjianjulebu.active = true;
        }
        if(this.xiaojiahao.active == true){
            this.xiaojiahao.active = false;
        }
        
    },

    //小加号里的加入俱乐部
    onClickjiarujulebu:function(){
        var node = cc.find('Canvas/ckp/bolidi/huangbeijing/table2');
        var node2 = cc.find('Canvas/ckp/bolidi/huangbeijing/table2/view/danxuan');
        if(node2.children.length != null && node2.children.length > 0){
            for(var inx = 0; inx < node2.children.length; inx++){
                node2.children[inx].destroy();
            }
        }
        if(node.active == true){
            node.active = false;
        }
        if(this.changjianjulebu.active == true){
            this.changjianjulebu.active = false;
            this.jiarujulebu.active = true;
        }else{
            this.jiarujulebu.active = true;
        }
        if(this.xiaojiahao.active == true){
            this.xiaojiahao.active = false;
        }
    },

    //创建与加入里边的取消按钮
    onClickClosequxiao: function(event){
        var node = cc.find('Canvas/ckp/bolidi/huangbeijing');
        node.getChildByName('table').active = false;
        node.getChildByName('table1').active = false;
        var node = cc.find('Canvas/ckp/bolidi/huangbeijing');
        var youkuang = cc.find('Canvas/ckp/bolidi/youdi')
        if(chcode.clubdata.club.length > 0 && chcode.clubdata.club != null){
            node.getChildByName('table2').active = true;
            for(var inx = 0; inx < chcode.clubdata.club.length; inx++){    
                //克隆俱乐部列表预制
                var tagnode = cc.instantiate(this.tabletag);
                tagnode.name = 'tagnode'+inx;
                tagnode.getChildByName('item').getChildByName('culbname').getComponent(cc.Label).string = chcode.clubdata.club[inx].name;
                tagnode.getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string = chcode.clubdata.club[inx].id;
                tagnode.getChildByName('checkmark').getChildByName('itemto').getChildByName('culbname').getComponent(cc.Label).string = chcode.clubdata.club[inx].name;
                tagnode.getChildByName('item').getChildByName('peoplenu').getComponent(cc.Label).string = '人数（'+chcode.clubdata.club[inx].num+"）";
                tagnode.getChildByName('checkmark').getChildByName('itemto').getChildByName('peoplenu').getComponent(cc.Label).string = '人数（'+chcode.clubdata.club[inx].num+"）";
                node.getChildByName('table2').getChildByName('view').getChildByName('danxuan').addChild(tagnode);
            }
            var tabnode = node.getChildByName('table2').getChildByName('view').getChildByName('danxuan');
            for(var inxb = 0; inxb < tabnode.children.length; inxb++){
                if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                    youkuang.getChildByName('shangdi').getChildByName('laout').getChildByName('roomname').getComponent(cc.Label).string = tabnode.children[inxb].getChildByName('item').getChildByName('culbname').getComponent(cc.Label).string;
                    youkuang.getChildByName('shangdi').getChildByName('laout').getChildByName('roomid').getComponent(cc.Label).string = '（ID:'+tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string+"）";
                   
                }
            }
        }else if(chcode.clubdata.club.length <= 0){
            if(node.getChildByName('dikuang').active == false){
                node.getChildByName('dikuang').active = true;
            }
        }
        
    },

    //点击俱乐部列表
    onClicktable: function (event) {
        console.log(event)
        var node = cc.find('Canvas/ckp/bolidi/huangbeijing');
        var youkuang = cc.find('Canvas/ckp/bolidi/youdi');
        var shangdik = cc.find('Canvas/ckp/bolidi/youdi/shangdi');
        var tabnode = node.getChildByName('table2').getChildByName('view').getChildByName('danxuan');
            for(var inxb = 0; inxb < tabnode.children.length; inxb++){
                if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                    tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string
                    var julebuid = tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string;
                    shangdik.getChildByName('laout').getChildByName('roomname').getComponent(cc.Label).string = event.node.getChildByName('item').getChildByName('culbname').getComponent(cc.Label).string;
                    shangdik.getChildByName('laout').getChildByName('roomid').getComponent(cc.Label).string = "（ID:"+event.node.getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string+"）";
                    if(tabnode.children[inxb].getChildByName('item').getChildByName('masterid').getComponent(cc.Label).string != cc.ss.user.id){
                        shangdik.getChildByName('youtag').getChildByName('heimingdan').active = false;
                        shangdik.getChildByName('youtag').getChildByName('youjian').active = false;
                    }else{
                        shangdik.getChildByName('youtag').getChildByName('heimingdan').active = true;
                        shangdik.getChildByName('youtag').getChildByName('youjian').active = true;
                    }
                    if(chcode.joinclubxinxi != null && chcode.joinclubxinxi.length != 0){
                        for(var inxp = 0; inxp < chcode.joinclubxinxi.length; inxp++){
                            if(tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string == chcode.joinclubxinxi[inxp].joinMsg.clubid){
                                youkuang.getChildByName('shangdi').getChildByName('youtag').getChildByName('youjian').getChildByName('tishihongdian').active = true;
                            }else{
                                youkuang.getChildByName('shangdi').getChildByName('youtag').getChildByName('youjian').getChildByName('tishihongdian').active = false;
                            }
                         }
                    }
                }
            }
             var liaotiannr = youkuang.getChildByName('danxuananniu').getChildByName('toggle1').getChildByName('checkmark').getChildByName('liaotianneirong').getChildByName('view').getChildByName('content');
            console.log(liaotiannr);
            
             if(liaotiannr.children.length >= 2){
                for(var inxf = 2; inxf < liaotiannr.children.length; inxf++){
                        liaotiannr.children[inxf].destroy();
                    
                }
           } 
        if(chcode.clubliaotian != null && chcode.clubliaotian != ''){
            for(var inxc = 0; inxc < chcode.clubliaotian.length; inxc++){
                if(julebuid == chcode.clubliaotian[inxc][1][0]){

                     if(chcode.clubliaotian[inxc][3][0] != cc.ss.user.id){
                             var liaotinaneirong = cc.ss.openwin.getChildByName('bolidi').getChildByName('youdi').getChildByName('danxuananniu').getChildByName('toggle1').getChildByName('checkmark').getChildByName('liaotianneirong').getChildByName('view').getChildByName('content').getChildByName('item2');
                             var kelong = cc.instantiate(liaotinaneirong);
                             kelong.active = true;
                             kelong.name = 'itemcopy2';
                             kelong.getChildByName('username').getComponent(cc.Label).string = chcode.clubliaotian[inxc][2][0];
                             //关闭第一个item节点
                             var tagbb = cc.ss.openwin.getChildByName('bolidi').getChildByName('youdi').getChildByName('danxuananniu').getChildByName('toggle1').getChildByName('checkmark').getChildByName('liaotianneirong').getChildByName('view').getChildByName('content');
                             if(tagbb.children[0].name == 'item'){
                                 tagbb.children[0].active = false;
                             }
                             if(chcode.clubliaotian[inxc][0][0] != 'nofont_xi' &&
                             chcode.clubliaotian[inxc][0][0] != 'nofont_nu' &&
                             chcode.clubliaotian[inxc][0][0] != 'nofont_cui' &&
                             chcode.clubliaotian[inxc][0][0] != 'nofont_bai' &&
                             chcode.clubliaotian[inxc][0][0] != 'nofont_le' &&
                             chcode.clubliaotian[inxc][0][0] != 'nofont_shuai'){
                             //计算俱乐部输入框字符串长度
                             kelong.getChildByName('userimg').getChildByName('zitiwai').getChildByName('ziwaikuang').getComponent(cc.Label).string = chcode.clubliaotian[inxc][0][0];
                             var len = 0;
                             var code = 0;
                             for(var i = 0; i <  chcode.clubliaotian[inxc][0][0].length; i++){
                              code =  chcode.clubliaotian[inxc][0][0].charCodeAt(i);
                      
                              if(code >= 0 && code <= 127){
                                  len += 1;
                              }else{
                                  len += 2;
                              }
                             }
                             //字体数量乘单个体积
                             kelong.getChildByName('userimg').getChildByName('zitiwai').width = len * 11.12;
                             kelong.getChildByName('userimg').getChildByName('zuokuang').x = kelong.getChildByName('userimg').getChildByName('zitiwai').x;        //聊天框中间的x轴坐标赋值给右边的框
                             kelong.getChildByName('userimg').getChildByName('youkuang').x = kelong.getChildByName('userimg').getChildByName('zitiwai').x + kelong.getChildByName('userimg').getChildByName('zitiwai').width;     //聊天框中间的x轴坐标减长度赋值给左边的框
                           
                         }else{
                             for(var inxd = 0; inxd < kelong.getChildByName('userimg').children.length; inxd++){
                                 kelong.getChildByName('userimg').children[inxd].active = false;
                             }
                             kelong.getChildByName('biaoqing').active = true;
                             var sprite = kelong.getChildByName('biaoqing').getComponent(cc.Sprite);
                             cc.loader.loadRes('images/atlas/'+chcode.clubliaotian[inxc][0][0],cc.SpriteFrame,function(err,spriteFrame){
                             sprite.spriteFrame = spriteFrame;
                         })
                         }
                             cc.ss.openwin.getChildByName('bolidi').getChildByName('youdi').getChildByName('danxuananniu').getChildByName('toggle1').getChildByName('checkmark').getChildByName('liaotianneirong').getChildByName('view').getChildByName('content').addChild(kelong);
                     }else{
                         var liaotinaneirong = cc.ss.openwin.getChildByName('bolidi').getChildByName('youdi').getChildByName('danxuananniu').getChildByName('toggle1').getChildByName('checkmark').getChildByName('liaotianneirong').getChildByName('view').getChildByName('content').getChildByName('item');
                             var kelong = cc.instantiate(liaotinaneirong);
                             kelong.active = true;
                             kelong.name = 'itemcopy1';
                             kelong.getChildByName('username').getComponent(cc.Label).string = chcode.clubliaotian[inxc][2][0];
                             //关闭第一个item节点
                             var tagbb = cc.ss.openwin.getChildByName('bolidi').getChildByName('youdi').getChildByName('danxuananniu').getChildByName('toggle1').getChildByName('checkmark').getChildByName('liaotianneirong').getChildByName('view').getChildByName('content');
                             console.log(tagbb);
                             if(tagbb.children[0].name == 'item'){
                                 tagbb.children[0].active = false;
                             }
                             if(chcode.clubliaotian[inxc][0][0] != 'nofont_xi' &&
                             chcode.clubliaotian[inxc][0][0] != 'nofont_nu' &&
                             chcode.clubliaotian[inxc][0][0] != 'nofont_cui' &&
                             chcode.clubliaotian[inxc][0][0] != 'nofont_bai' &&
                             chcode.clubliaotian[inxc][0][0] != 'nofont_le' &&
                             chcode.clubliaotian[inxc][0][0] != 'nofont_shuai'){
                                 console.log('不是表情');
                             //计算俱乐部输入框字符串长度
                             kelong.getChildByName('userimg').getChildByName('zitiwai').getChildByName('ziwaikuang').getComponent(cc.Label).string = chcode.clubliaotian[inxc][0][0];
                             var len = 0;
                             var code = 0;
                             for(var i = 0; i <  chcode.clubliaotian[inxc][0][0].length; i++){
                              code =  chcode.clubliaotian[inxc][0][0].charCodeAt(i);
                      
                              if(code >= 0 && code <= 127){
                                  len += 1;
                              }else{
                                  len += 2;
                              }
                             }
                             //字体数量乘单个体积
                             kelong.getChildByName('userimg').getChildByName('zitiwai').width = len * 11.12;
                             kelong.getChildByName('userimg').getChildByName('youkuang').x = kelong.getChildByName('userimg').getChildByName('zitiwai').x;        //聊天框中间的x轴坐标赋值给右边的框
                             kelong.getChildByName('userimg').getChildByName('zuokuang').x = kelong.getChildByName('userimg').getChildByName('zitiwai').x - kelong.getChildByName('userimg').getChildByName('zitiwai').width;     //聊天框中间的x轴坐标减长度赋值给左边的框度赋值给左边的框
                           
                         }else{
                             for(var inxd = 0; inxd < kelong.getChildByName('userimg').children.length; inxd++){
                                 kelong.getChildByName('userimg').children[inxd].active = false;
                             }
                             kelong.getChildByName('biaoqing').active = true;
                             console.log(chcode.clubliaotian[inxc]);
                             var sprite = kelong.getChildByName('biaoqing').getComponent(cc.Sprite);
                             var bqimg = chcode.clubliaotian[inxc][0][0];
                             cc.loader.loadRes('images/atlas/'+bqimg,cc.SpriteFrame,function(err,spriteFrame){
                                 sprite.spriteFrame = spriteFrame;
                             })
     
                         }
                         cc.ss.openwin.getChildByName('bolidi').getChildByName('youdi').getChildByName('danxuananniu').getChildByName('toggle1').getChildByName('checkmark').getChildByName('liaotianneirong').getChildByName('view').getChildByName('content').addChild(kelong);
 
 
                     }
                 }
             }
         }


    },

    //发送表情
    onClickbiaoqing: function(event,CustomEventData) {
        var liaotinaneirong = cc.ss.openwin.getChildByName('bolidi').getChildByName('youdi').getChildByName('danxuananniu').getChildByName('toggle1').getChildByName('checkmark').getChildByName('liaotianneirong').getChildByName('view').getChildByName('content').getChildByName('item');
        var kelong = cc.instantiate(liaotinaneirong);
        kelong.active = true;
        kelong.name = 'itemcopy2';
        kelong.getChildByName('username').getComponent(cc.Label).string = cc.ss.user.username;
        //关闭第一个item节点
        var tagbb = cc.ss.openwin.getChildByName('bolidi').getChildByName('youdi').getChildByName('danxuananniu').getChildByName('toggle1').getChildByName('checkmark').getChildByName('liaotianneirong').getChildByName('view').getChildByName('content');
        if(tagbb.children[0].name == 'item'){
            tagbb.children[0].active = false;
        }
        for(var inx = 0; inx < kelong.getChildByName('userimg').children.length; inx++){
            kelong.getChildByName('userimg').children[inx].active = false;
        }
        kelong.getChildByName('biaoqing').active = true;
        var sprite = kelong.getChildByName('biaoqing').getComponent(cc.Sprite);
        cc.loader.loadRes('images/atlas/'+CustomEventData,cc.SpriteFrame,function(err,spriteFrame){
            sprite.spriteFrame = spriteFrame;
        })
        var tabnode = cc.ss.openwin.getChildByName('bolidi').getChildByName('huangbeijing').getChildByName('table2').getChildByName('view').getChildByName('danxuan');
       for(var inxb = 0; inxb < tabnode.children.length; inxb++){
        if(tabnode.children[inxb].getChildByName('checkmark').active == true){
            var julebuid = tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string;
        }
    }
        if (this.ready()) {
            var club = {
                extparams : {}
            };
            
            club.extparams.userid = cc.ss.user.id,
            club.extparams.context = CustomEventData,
            club.extparams.clubid = julebuid,
            cc.ss.socket.exec("message" , club);
        }
       
        cc.ss.openwin.getChildByName('bolidi').getChildByName('youdi').getChildByName('danxuananniu').getChildByName('toggle1').getChildByName('checkmark').getChildByName('liaotianneirong').getChildByName('view').getChildByName('content').addChild(kelong)
    },

    //点击俱乐部积分榜
    onClickjifenbang:function(event){
        console.log('积分榜:'+event);
        console.log(event)
        var node = cc.instantiate(this.jifenbang);
        cc.ss.openwin.parent.addChild(node)
    },

    //关闭俱乐部积分榜
    onnodeClosejifenbang:function(event,CustomEventData){
        cc.ss.openwin.parent.getChildByName(CustomEventData).destroy();
    },

    //点击俱乐部战绩
    onClickclubzhanji:function(){
        var tabnode = cc.ss.openwin.getChildByName('bolidi').getChildByName('huangbeijing').getChildByName('table2').getChildByName('view').getChildByName('danxuan');
        for(var inxb = 0; inxb < tabnode.children.length; inxb++){
            if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                var julebuid = tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string;
            }
        }

        if (this.ready()) {
            var club = {
                extparams : {}
            };
            club.extparams.clubid = julebuid,
            cc.ss.socket.exec("historyclub" , club);
        }

        var node = cc.instantiate(this.clubzhajji);
        cc.ss.openwin.parent.addChild(node);
    },

    //关闭俱乐部战绩
    onCloseclubzhanji:function(){
        cc.ss.openwin.parent.getChildByName('clubzhanji').destroy();
    },

    //打开俱乐部右边框里上方tag弹窗
    onClickopentag:function(event,CustomEventData){
        if(CustomEventData == 'heimingdan'){
            if(cc.ss.openwin.getChildByName('bolidi').getChildByName('heimingdan').active == true){
                cc.ss.openwin.getChildByName('bolidi').getChildByName('heimingdan').active = false;
                console.log('heimingdan')
            }else{
                cc.ss.openwin.getChildByName('bolidi').getChildByName('heimingdan').active = true;
                var tabnode = cc.ss.openwin.getChildByName('bolidi').getChildByName('huangbeijing').getChildByName('table2').getChildByName('view').getChildByName('danxuan');
                    for(var inxb = 0; inxb < tabnode.children.length; inxb++){
                        if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                            var julebuid = tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string;
                        }
                    }
                    console.log('进来黑名单里了')
                if (this.ready()) {
                    var club = {
                        extparams : {}
                    };
                    club.extparams.clubid = julebuid,
                    cc.ss.socket.exec("blackclub" , club);
                }
            }
        }else if(CustomEventData == 'youjian'){
            var emilselect = cc.ss.openwin.getChildByName('bolidi').getChildByName('xiaoxi').getChildByName('xinxiselect').getChildByName('view').getChildByName('content');
            if(cc.ss.openwin.getChildByName('bolidi').getChildByName('xiaoxi').active == true){
                cc.ss.openwin.getChildByName('bolidi').getChildByName('xiaoxi').active = false;
            }else{
                cc.ss.openwin.getChildByName('bolidi').getChildByName('xiaoxi').active = true;
                if(chcode.joinclubxinxi != null){
                    console.log('加入俱乐部:'+chcode.joinclubxinxi);
                    console.log(chcode.joinclubxinxi)
                   var node = cc.find('Canvas/ckp/bolidi/huangbeijing');
                   var tabnode = node.getChildByName('table2').getChildByName('view').getChildByName('danxuan');
                   for(var inxb = 0; inxb < tabnode.children.length; inxb++){
                       for(var inx = 0; inx < chcode.joinclubxinxi.length; inx++){
                            if(tabnode.children[inxb].getChildByName('checkmark').active == true && tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string == chcode.joinclubxinxi[inx].joinMsg.clubid){
                                var node = cc.instantiate(emilselect.getChildByName('item'));
                                node.active = true;
                                node.name = 'tag'+inx;
                                node.getChildByName('username').getComponent(cc.Label).string = chcode.joinclubxinxi[inx].joinMsg.applename;
                                node.getChildByName('userid').getComponent(cc.Label).string = 'ID:'+chcode.joinclubxinxi[inx].joinMsg.userid;
                                node.getChildByName('faqirenid').getComponent(cc.Label).string = chcode.joinclubxinxi[inx].joinMsg.appleid;
                                node.getChildByName('clubid').getComponent(cc.Label).string = chcode.joinclubxinxi[inx].joinMsg.clubid;
                                node.getChildByName('id').getComponent(cc.Label).string = chcode.joinclubxinxi[inx].joinMsg.id;
                                 emilselect.addChild(node);
                            }  
                         }
                     }
                }
            }
        }else if(CustomEventData == 'shezhi'){
            if(chcode.clubshezhi != null && chcode.clubshezhi.length > 0){
            var tabnode = cc.ss.openwin.getChildByName('bolidi').getChildByName('huangbeijing').getChildByName('table2').getChildByName('view').getChildByName('danxuan');
            for(var inxb = 0; inxb < tabnode.children.length; inxb++){
                if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                    console.log(tabnode.children[inxb].getChildByName('item').getChildByName('masterid').getComponent(cc.Label).string)
                    if(tabnode.children[inxb].getChildByName('item').getChildByName('masterid').getComponent(cc.Label).string != cc.ss.user.id){
                        if(cc.ss.openwin.getChildByName('bolidi').getChildByName('feizhushezhi').active == true){
                            cc.ss.openwin.getChildByName('bolidi').getChildByName('feizhushezhi').active = false;
                        }else{
                        cc.ss.openwin.getChildByName('bolidi').getChildByName('feizhushezhi').active = true;
                    }
                    }else{
                        if(cc.ss.openwin.getChildByName('bolidi').getChildByName('shezhi').active == true){
                            cc.ss.openwin.getChildByName('bolidi').getChildByName('shezhi').active = false;
                            console.log('zhezhi')
                        }else{
                            cc.ss.openwin.getChildByName('bolidi').getChildByName('shezhi').active = true;
                        }
                    }
                }
            }
        }else{
            if(cc.ss.openwin.getChildByName('bolidi').getChildByName('shezhi').active == true){
                cc.ss.openwin.getChildByName('bolidi').getChildByName('shezhi').active = false;
                console.log('zhezhi')
            }else{
                cc.ss.openwin.getChildByName('bolidi').getChildByName('shezhi').active = true;
            }
        }
        }else if(CustomEventData == 'chengyuan'){
            if(cc.ss.openwin.getChildByName('bolidi').getChildByName('chengyuan').active == true){
            }else{
                cc.ss.openwin.getChildByName('bolidi').getChildByName('chengyuan').active = true;
                var tabnode = cc.ss.openwin.getChildByName('bolidi').getChildByName('huangbeijing').getChildByName('table2').getChildByName('view').getChildByName('danxuan');
                    for(var inxb = 0; inxb < tabnode.children.length; inxb++){
                        if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                            var julebuid = tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string;
                        }
                    }
                    console.log('这个是快点:'+julebuid);
                    console.log(julebuid)
                if (this.ready()) {
                    var club = {
                        extparams : {}
                    };
                    club.extparams.clubid = julebuid,
                    cc.ss.socket.exec("userclub" , club);
                }

            }
            
        }else if(CustomEventData == 'bianji'){
            var emilselect = cc.ss.openwin.getChildByName('bolidi').getChildByName('chengyuan').getChildByName('xiala').getChildByName('view').getChildByName('content');
            if(cc.ss.openwin.getChildByName('bolidi').getChildByName('chengyuan').getChildByName('bianjiimg').getChildByName('ifstatus').getComponent(cc.Label).string == 'false'){
                if(emilselect != undefined && emilselect.children.length > 1){ 
                     for(var inxo = 1; inxo < emilselect.children.length; inxo++){
                        emilselect.children[inxo].getChildByName('userstatus').active = false;
                        if(emilselect.children[inxo].getChildByName('guanliyuanimg').active == false){
                            emilselect.children[inxo].getChildByName('shanchu').active = true;
                        }
                                
                    }
                    cc.ss.openwin.getChildByName('bolidi').getChildByName('chengyuan').getChildByName('bianjiimg').getChildByName('ifstatus').getComponent(cc.Label).string = 'true';
                }
        }else{
                if(emilselect != undefined && emilselect.children.length > 1){
                    for(var inxo = 1; inxo < emilselect.children.length; inxo++){
                        emilselect.children[inxo].getChildByName('userstatus').active = true;
                        emilselect.children[inxo].getChildByName('shanchu').active = false;
                    }
                }
                cc.ss.openwin.getChildByName('bolidi').getChildByName('chengyuan').getChildByName('bianjiimg').getChildByName('ifstatus').getComponent(cc.Label).string = 'false';
        }

        }
    },

    //关闭俱乐部右边框里上方tag弹窗
    onClickclosetag:function(event,CustomEventData){
        cc.ss.openwin.getChildByName('bolidi').getChildByName(CustomEventData).active = false;
        if(CustomEventData == 'heimingdan'){
            var emilselect = cc.ss.openwin.getChildByName('bolidi').getChildByName('heimingdan').getChildByName('xiala').getChildByName('view').getChildByName('content');
        }else if(CustomEventData == 'xiaoxi'){
            var emilselect = cc.ss.openwin.getChildByName('bolidi').getChildByName('xiaoxi').getChildByName('xinxiselect').getChildByName('view').getChildByName('content');
            console.log('表格:'+emilselect);
            console.log(emilselect);
        }else if(CustomEventData == 'chengyuan'){
            var emilselect = cc.ss.openwin.getChildByName('bolidi').getChildByName('chengyuan').getChildByName('xiala').getChildByName('view').getChildByName('content');
        }   
        if(emilselect != undefined && emilselect.children.length > 1){
            for(var inxa = 1; inxa < emilselect.children.length; inxa++){
                emilselect.children[inxa].destroy();
            }
        }
    },

    //打开俱乐部设置里的更改俱乐部名
    onClickupdateclubname:function(){
        var node = cc.instantiate(this.updateclubname);
        cc.ss.openwin.parent.addChild(node)
    },

    //判断更俱乐部名输入框是否为空
    inputdataisnull:function(){
        if(cc.ss.openwin.parent.getChildByName('updateclubname').getChildByName('base2').getChildByName('huangdi').getChildByName('inputkuang').getComponent(cc.EditBox).string == null ||
        cc.ss.openwin.parent.getChildByName('updateclubname').getChildByName('base2').getChildByName('huangdi').getChildByName('inputkuang').getComponent(cc.EditBox).string == ""){
            cc.ss.openwin.parent.getChildByName('updateclubname').getChildByName('base2').getChildByName('huangdi').getChildByName('tishi').active = true;
        }else{
            cc.ss.openwin.parent.getChildByName('updateclubname').getChildByName('base2').getChildByName('huangdi').getChildByName('tishi').active = false;
        }
    },

    //确认发送更改俱乐部名
    onClickfasongupdateclubname:function(){
        if(cc.ss.openwin.parent.getChildByName('updateclubname').getChildByName('base2').getChildByName('huangdi').getChildByName('inputkuang').getComponent(cc.EditBox).string == null ||
        cc.ss.openwin.parent.getChildByName('updateclubname').getChildByName('base2').getChildByName('huangdi').getChildByName('inputkuang').getComponent(cc.EditBox).string == ""){
            cc.ss.openwin.parent.getChildByName('updateclubname').getChildByName('base2').getChildByName('huangdi').getChildByName('tishi').active = true;
        }else{
            cc.ss.openwin.parent.getChildByName('updateclubname').getChildByName('base2').getChildByName('huangdi').getChildByName('tishi').active = false;

            var tabnode = cc.ss.openwin.getChildByName('bolidi').getChildByName('huangbeijing').getChildByName('table2').getChildByName('view').getChildByName('danxuan');
            for(var inxb = 0; inxb < tabnode.children.length; inxb++){
                if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                    var julebuid = tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string;
                }
            }
            if (this.ready()) {
                var club = {
                    extparams : {}
                };
                
                club.extparams.userid = cc.ss.user.id,
                club.extparams.name = cc.ss.openwin.parent.getChildByName('updateclubname').getChildByName('base2').getChildByName('huangdi').getChildByName('inputkuang').getComponent(cc.EditBox).string,
                club.extparams.clubid = julebuid,
                cc.ss.socket.exec("renameclub" , club);
            }
            cc.ss.openwin.parent.getChildByName('updateclubname').destroy();
        }

    },

    //解散俱乐部
    onClickjiesanclub:function(){
        var node = cc.instantiate(this.jiesanclub);
        cc.ss.openwin.parent.addChild(node)
    },

    //确认发送解散俱乐部
    onClickjiesanclubqueren:function(){

        var tabnode = cc.ss.openwin.getChildByName('bolidi').getChildByName('huangbeijing').getChildByName('table2').getChildByName('view').getChildByName('danxuan');
            for(var inxb = 0; inxb < tabnode.children.length; inxb++){
                if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                    var julebuid = tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string;
                }
            }
        if (this.ready()) {
            var club = {
                extparams : {}
            };
            
            club.extparams.userid = cc.ss.user.id,
            club.extparams.clubid = julebuid,
            cc.ss.socket.exec("dissclub" , club);
        }
        cc.ss.openwin.parent.getChildByName('jiesanclub').destroy();
    },

    //关闭弹窗除了更改俱乐部名字
    onClickClosetianchuang:function(event,CustomEventData){
        cc.ss.openwin.parent.getChildByName(CustomEventData).destroy();      
    },

    //接收用户加入俱乐部
    onClickjieshoujiaruclub:function(event){
        if (this.ready()) {
            var club = {
                extparams : {}
            };
            
            club.extparams.userid = event.target.parent.getChildByName('faqirenid').getComponent(cc.Label).string,
            club.extparams.clubid = event.target.parent.getChildByName('clubid').getComponent(cc.Label).string,
            club.extparams.id = event.target.parent.getChildByName('id').getComponent(cc.Label).string,
            club.extparams.flag = 'yes',
            cc.ss.socket.exec("passclub" , club);
        }
        for(var inx = 0; inx < chcode.joinclubxinxi.length; inx++){
            if(chcode.joinclubxinxi[inx].joinMsg.appleid == event.target.parent.getChildByName('faqirenid').getComponent(cc.Label).string){
                chcode.joinclubxinxi.splice(inx,1);
            }
        }
        chcode.clubzhuid = cc.ss.user.id;
        event.target.parent.destroy();
    },

    //拒绝用户加入俱乐部
    onClickjujiejiaruclub:function(event){
        if (this.ready()) {
            var club = {
                extparams : {}
            };
            
            club.extparams.userid = event.target.parent.getChildByName('faqirenid').getComponent(cc.Label).string,
            club.extparams.clubid = event.target.parent.getChildByName('clubid').getComponent(cc.Label).string,
            club.extparams.id = event.target.parent.getChildByName('id').getComponent(cc.Label).string,
            club.extparams.flag = 'no',
            cc.ss.socket.exec("passclub" , club);
        }
        for(var inx = 0; inx < chcode.joinclubxinxi.length; inx++){
            if(chcode.joinclubxinxi[inx].joinMsg.appleid == event.target.parent.getChildByName('faqirenid').getComponent(cc.Label).string){
                chcode.joinclubxinxi.splice(inx,1);
            }
        }
        chcode.clubzhuid = cc.ss.user.id;
        event.target.parent.destroy();
    },

    //屏蔽用户
    onClickpingbiuser:function(event){
        if (this.ready()) {
            var club = {
                extparams : {}
            };
            
            club.extparams.userid = event.target.parent.getChildByName('faqirenid').getComponent(cc.Label).string,
            club.extparams.clubid = event.target.parent.getChildByName('clubid').getComponent(cc.Label).string,
            club.extparams.id = event.target.parent.getChildByName('id').getComponent(cc.Label).string,
            club.extparams.flag = 'shield',
            cc.ss.socket.exec("passclub" , club);
        }
        for(var inx = 0; inx < chcode.joinclubxinxi.length; inx++){
            if(chcode.joinclubxinxi[inx].joinMsg.appleid == event.target.parent.getChildByName('faqirenid').getComponent(cc.Label).string){
                chcode.joinclubxinxi.splice(inx,1);
            }
        }
        chcode.clubzhuid = cc.ss.user.id;
        event.target.parent.destroy();
    },

    //俱乐部里的创建房间
    onClicksetroom:function(){
        var tabnode = cc.ss.openwin.getChildByName('bolidi').getChildByName('huangbeijing').getChildByName('table2').getChildByName('view').getChildByName('danxuan');
        for(var inxb = 0; inxb < tabnode.children.length; inxb++){
            if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                var julebuid = tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string;
            }
        }
        chcode.clubid = julebuid;
        var node = cc.instantiate(this.roomoptionprefab);
        var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node //这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = "niuniuclubsend";//这个是代码文件名
            clickEventHandler.handler = 'callback';
            var button = node.getChildByName('close').getComponent(cc.Button);
            button.clickEvents[0] = null;
            button.clickEvents[0] = clickEventHandler;
            cc.ss.openwin.parent.addChild(node);
            chcode.juleburoom = true;
            var writeable_path = jsb.fileUtils.getWritablePath();
            var new_dir = writeable_path + "new_dir";
            if(!jsb.fileUtils.isDirectoryExist(new_dir) && !jsb.fileUtils.isFileExist(new_dir + '/game_room_data.txt')) {
                console.log("new_dir 和 game_room_data.txt 不存在")
             }
             else {
                 console.log("dir is 已存在!!!");
                 console.log("game_room_data.txt 文件已存在");
                 var str_data = jsb.fileUtils.getStringFromFile(writeable_path + "new_dir" + "/game_room_data.txt"); 
                 var extparams = JSON.parse(str_data);
                 if(extparams != null){
                     //判断服务费
                     if(extparams.expenditure == 'master'){
                         node.getChildByName('option_group').getChildByName('group_to').children[1].getChildByName('threeClick').getChildByName('选项font').getComponent(cc.Label).string = 'AA支付(2钻石)';
                     }else if(extparams.expenditure == 'average'){
                         node.getChildByName('option_group').getChildByName('group_to').children[1].getChildByName('threeClick').getChildByName('选项font').getComponent(cc.Label).string = '房主支付(6钻石)';
                     }
     
                     //判断分数
                     if(extparams.point == 1){
                         node.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '1/2/3';
                     }else if(extparams.point == 2){
                         node.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '2/3/4';
                     }else if(extparams.point == 3){
                         node.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '4/6/8';
                     }else if(extparams.point == 4){
                         node.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '7/8/9';
                     }else if(extparams.point == 5){
                         node.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '6/8/10';
                     }
     
                     //判断特殊牌型
                     if(extparams.special.indexOf('1') != -1){
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Lableone').active = true;
                     }else {
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Lableone').active = false;
                     }
                     if(extparams.special.indexOf('2') != -1){
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Lableto').active = true;
                     }else {
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Lableto').active = false;
                     }
                     if(extparams.special.indexOf('3') != -1){
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelthree').active = true;
                     }else {
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelthree').active = false;
                     }
                     if(extparams.special.indexOf('4') != -1){
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelfour').active = true;
                     }else {
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelfour').active = false;
                     }
                     if(extparams.special.indexOf('5') != -1){
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelfive').active = true;
                     }else {
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelfive').active = false;
                     }
                     if(extparams.special.indexOf('6') != -1){
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelsix').active = true;
                     }else {
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelsix').active = false;
                     }
                     if(extparams.special.indexOf('7') != -1){
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelseven').active = true;
                     }else {
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelseven').active = false;
                     }
                     if(extparams.special.indexOf('8') != -1){
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labeleight').active = true;
                     }else {
                         node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labeleight').active = false;
                     }
     
                     //判断高级选项
                     if(extparams.high.indexOf('1') != -1){
                         node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Lableone').active = true;
                     }else{
                         node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Lableone').active = false;
                     }
                     if(extparams.high.indexOf('2') != -1){
                         node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Lableto').active = true;
                     }else{
                         node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Lableto').active = false;
                     }
                     if(extparams.high.indexOf('3') != -1){
                         node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelthree').active = true;
                     }else{
                         node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelthree').active = false;
                     }
                     if(extparams.high.indexOf('4') != -1){
                         node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelfour').active = true;
                     }else{
                         node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelfour').active = false;
                     }
                     if(extparams.high.indexOf('5') != -1){
                         node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelfive').active = true; 
                     }else{
                         node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelfive').active = false; 
                     }
                     if(extparams.high.indexOf('6') != -1){
                         node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelsix').active = true; 
                     }else{
                         node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelsix').active = false; 
                     }
     
                     //判断几人场的
                     if(extparams.nupeople == 6){
                         console.log('6人')
                         node.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle1').getComponent(cc.Toggle).check();
                         // node.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle2').getChildByName('checkmark').active = false; 
                         // node.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle3').getChildByName('checkmark').active = false; 
                     }else if(extparams.nupeople == 8){
                         console.log('8人')
                         node.getChildByName('tag').getChildByName('toggleContainer').children[0].getComponent(cc.Toggle).uncheck(); 
                         node.getChildByName('tag').getChildByName('toggleContainer').children[1].getComponent(cc.Toggle).check(); 
                         node.getChildByName('tag').getChildByName('toggleContainer').children[2].getComponent(cc.Toggle).uncheck(); 
                     }else if(extparams.nupeople == 10){
                         console.log('10人');
                         // node.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle1').getChildByName('checkmark').active = false; 
                         // node.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle2').getChildByName('checkmark').active = false; 
                         node.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle3').getComponent(cc.Toggle).check(); 
                     }
     
                     //判断自动开桌
                     if(extparams.start == 1){
                         node.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '手动开桌';
                     }else if(extparams.start == 3){
                         node.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '满3人开';
                     }else if(extparams.start == 4){
                         node.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '满4人开';
                     }else if(extparams.start == 5){
                         node.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '满5人开';
                     }else if(extparams.start == 6){
                         node.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '满6人开';
                     }
     
                     //最大抢庄
                     if(extparams.banker == 1){
                         node.getChildByName('option_group').getChildByName('group_three').children[5].getChildByName('sixClick').getChildByName('选项font').getComponent(cc.Label).string = '1倍';
                     }else if(extparams.banker == 2){
                         node.getChildByName('option_group').getChildByName('group_three').children[5].getChildByName('sixClick').getChildByName('选项font').getComponent(cc.Label).string = '2倍';
                     }else if(extparams.banker == 3){
                         node.getChildByName('option_group').getChildByName('group_three').children[5].getChildByName('sixClick').getChildByName('选项font').getComponent(cc.Label).string = '3倍';
                     }else if(extparams.banker == 4){
                         node.getChildByName('option_group').getChildByName('group_three').children[5].getChildByName('sixClick').getChildByName('选项font').getComponent(cc.Label).string = '4倍';
                     }
                     
                     //翻倍规则
                     if(extparams.double == 1){
                         node.getChildByName('option_group').getChildByName('group_four').children[1].getChildByName('sevenClick').getChildByName('选项font').getComponent(cc.Label).string = '疯狂加倍，点子牛，倍数等于点数，牛牛10倍';
                     }else if(extparams.double == 2){
                         node.getChildByName('option_group').getChildByName('group_four').children[1].getChildByName('sevenClick').getChildByName('选项font').getComponent(cc.Label).string = '牛七2倍，牛八3倍，牛九4倍，牛牛5倍';
                     }else if(extparams.double == 3){
                         node.getChildByName('option_group').getChildByName('group_four').children[1].getChildByName('sevenClick').getChildByName('选项font').getComponent(cc.Label).string = '牛七2倍，牛八2倍，牛九3倍，牛牛4倍';
                     }else if(extparams.double == 4){
                         node.getChildByName('option_group').getChildByName('group_four').children[1].getChildByName('sevenClick').getChildByName('选项font').getComponent(cc.Label).string = '牛七1倍，牛八2倍，牛九2倍，牛牛3倍';
                     }
     
                     //判断局数
                     if(extparams.current == 10){
                         node.getChildByName('option_group').getChildByName('group_one').children[3].getChildByName('toClick').getChildByName('选项font').getComponent(cc.Label).string = '10局';
                     }else if(extparams.current == 20){
                         node.getChildByName('option_group').getChildByName('group_one').children[3].getChildByName('toClick').getChildByName('选项font').getComponent(cc.Label).string = '20局';
                     }else if(extparams.current == 30){
                         node.getChildByName('option_group').getChildByName('group_one').children[3].getChildByName('toClick').getChildByName('选项font').getComponent(cc.Label).string = '30局';
                     }
     
                     //判断闲家推注
                     if(extparams.leisure == 'none'){
                         node.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '无';
                     }else if(extparams.leisure == 5){
                         node.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '5';
                     }else if(extparams.leisure == 10){
                         node.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '10';
                     }else if(extparams.leisure == 15){
                         node.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '15';
                     }else if(extparams.leisure == 20){
                         node.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '20';
                     }
     
                    }
             }
    },

    //关闭俱乐部里的创建房间
    callback: function (event, customEventData) {
        cc.ss.openwin.parent.getChildByName('room').destroy();
    },

    //俱乐部里的快速创建房间
    onClickkuaisu:function(){
        cc.ss.user.nupeople = chcode.nupeople;
        let self = this;
        var wxuser=cc.sys.localStorage.getItem("cacaca");
        chcode.playway = wxuser;
        var tabnode = cc.ss.openwin.getChildByName('bolidi').getChildByName('huangbeijing').getChildByName('table2').getChildByName('view').getChildByName('danxuan');
        for(var inxb = 0; inxb < tabnode.children.length; inxb++){
            if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                var julebuid = tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string;
            }
        }
        var writeable_path = jsb.fileUtils.getWritablePath();
            var new_dir = writeable_path + "new_dir";
            if(!jsb.fileUtils.isFileExist(new_dir + '/game_clubroom_data.txt')) {
                console.log('请先设置游戏玩法');
            }else{
                let self = this;
                var str_data = jsb.fileUtils.getStringFromFile(new_dir + '/game_clubroom_data.txt'); 
                var extparams = JSON.parse(str_data);
                if(extparams != null && extparams != ""){
                    self.preload(extparams , self) ;
                }
            }
        console.log(str_data);
        extparams.club = julebuid;
        self.preload(extparams,self);
    },

    //俱乐部里的设置玩法
    onClickshezhiwanfa:function(){
        var node = cc.instantiate(this.roomoptionprefab);

        var writeable_path = jsb.fileUtils.getWritablePath();
        var new_dir = writeable_path + "new_dir";
        if(!jsb.fileUtils.isFileExist(new_dir + '/game_clubroom_data.txt')) {
            console.log('没有这个txt文件')
        }else{
            var str_data = jsb.fileUtils.getStringFromFile(new_dir + '/game_clubroom_data.txt'); 
            var extparams = JSON.parse(str_data);
            if(extparams != null && extparams != ""){
                //判断服务费
                if(extparams.expenditure == 'master'){
                    node.getChildByName('option_group').getChildByName('group_to').children[1].getChildByName('threeClick').getChildByName('选项font').getComponent(cc.Label).string = 'AA支付(2钻石)';
                }else if(extparams.expenditure == 'average'){
                    node.getChildByName('option_group').getChildByName('group_to').children[1].getChildByName('threeClick').getChildByName('选项font').getComponent(cc.Label).string = '房主支付(6钻石)';
                }

                //判断分数
                if(extparams.point == 1){
                    node.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '1/2/3';
                }else if(extparams.point == 2){
                    node.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '2/3/4';
                }else if(extparams.point == 3){
                    node.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '4/6/8';
                }else if(extparams.point == 4){
                    node.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '7/8/9';
                }else if(extparams.point == 5){
                    node.getChildByName('option_group').getChildByName('group_one').children[1].getChildByName('oneClick').getChildByName('选项font').getComponent(cc.Label).string = '6/8/10';
                }

                //判断特殊牌型
                if(extparams.special.indexOf('1') != -1){
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Lableone').active = true;
                }else {
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Lableone').active = false;
                }
                if(extparams.special.indexOf('2') != -1){
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Lableto').active = true;
                }else {
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Lableto').active = false;
                }
                if(extparams.special.indexOf('3') != -1){
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelthree').active = true;
                }else {
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelthree').active = false;
                }
                if(extparams.special.indexOf('4') != -1){
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelfour').active = true;
                }else {
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelfour').active = false;
                }
                if(extparams.special.indexOf('5') != -1){
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelfive').active = true;
                }else {
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelfive').active = false;
                }
                if(extparams.special.indexOf('6') != -1){
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelsix').active = true;
                }else {
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelsix').active = false;
                }
                if(extparams.special.indexOf('7') != -1){
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelseven').active = true;
                }else {
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labelseven').active = false;
                }
                if(extparams.special.indexOf('8') != -1){
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labeleight').active = true;
                }else {
                    node.getChildByName('option_group').getChildByName('group_five').children[1].getChildByName('Layout布局').getChildByName('Labeleight').active = false;
                }

                //判断高级选项
                if(extparams.high.indexOf('1') != -1){
                    node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Lableone').active = true;
                }else{
                    node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Lableone').active = false;
                }
                if(extparams.high.indexOf('2') != -1){
                    node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Lableto').active = true;
                }else{
                    node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Lableto').active = false;
                }
                if(extparams.high.indexOf('3') != -1){
                    node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelthree').active = true;
                }else{
                    node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelthree').active = false;
                }
                if(extparams.high.indexOf('4') != -1){
                    node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelfour').active = true;
                }else{
                    node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelfour').active = false;
                }
                if(extparams.high.indexOf('5') != -1){
                    node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelfive').active = true; 
                }else{
                    node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelfive').active = false; 
                }
                if(extparams.high.indexOf('6') != -1){
                    node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelsix').active = true; 
                }else{
                    node.getChildByName('option_group').getChildByName('group_six').children[1].getChildByName('Layout布局高级选项').getChildByName('Labelsix').active = false; 
                }

                //判断几人场的
                if(extparams.nupeople == 6){
                    console.log('6人')
                    node.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle1').getComponent(cc.Toggle).check();
                    // node.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle2').getChildByName('checkmark').active = false; 
                    // node.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle3').getChildByName('checkmark').active = false; 
                }else if(extparams.nupeople == 8){
                    console.log('8人')
                    node.getChildByName('tag').getChildByName('toggleContainer').children[0].getComponent(cc.Toggle).uncheck(); 
                    node.getChildByName('tag').getChildByName('toggleContainer').children[1].getComponent(cc.Toggle).check(); 
                    node.getChildByName('tag').getChildByName('toggleContainer').children[2].getComponent(cc.Toggle).uncheck(); 
                }else if(extparams.nupeople == 10){
                    console.log('10人');
                    // node.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle1').getChildByName('checkmark').active = false; 
                    // node.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle2').getChildByName('checkmark').active = false; 
                    node.getChildByName('tag').getChildByName('toggleContainer').getChildByName('toggle3').getComponent(cc.Toggle).check(); 
                }

                //判断自动开桌
                if(extparams.start == 1){
                    node.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '手动开桌';
                }else if(extparams.start == 3){
                    node.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '满3人开';
                }else if(extparams.start == 4){
                    node.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '满4人开';
                }else if(extparams.start == 5){
                    node.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '满5人开';
                }else if(extparams.start == 6){
                    node.getChildByName('option_group').getChildByName('group_to').children[5].getChildByName('fourClick').getChildByName('选项font').getComponent(cc.Label).string = '满6人开';
                }

                //最大抢庄
                if(extparams.banker == 1){
                    node.getChildByName('option_group').getChildByName('group_three').children[5].getChildByName('sixClick').getChildByName('选项font').getComponent(cc.Label).string = '1倍';
                }else if(extparams.banker == 2){
                    node.getChildByName('option_group').getChildByName('group_three').children[5].getChildByName('sixClick').getChildByName('选项font').getComponent(cc.Label).string = '2倍';
                }else if(extparams.banker == 3){
                    node.getChildByName('option_group').getChildByName('group_three').children[5].getChildByName('sixClick').getChildByName('选项font').getComponent(cc.Label).string = '3倍';
                }else if(extparams.banker == 4){
                    node.getChildByName('option_group').getChildByName('group_three').children[5].getChildByName('sixClick').getChildByName('选项font').getComponent(cc.Label).string = '4倍';
                }
                
                //翻倍规则
                if(extparams.double == 1){
                    node.getChildByName('option_group').getChildByName('group_four').children[1].getChildByName('sevenClick').getChildByName('选项font').getComponent(cc.Label).string = '疯狂加倍，点子牛，倍数等于点数，牛牛10倍';
                }else if(extparams.double == 2){
                    node.getChildByName('option_group').getChildByName('group_four').children[1].getChildByName('sevenClick').getChildByName('选项font').getComponent(cc.Label).string = '牛七2倍，牛八3倍，牛九4倍，牛牛5倍';
                }else if(extparams.double == 3){
                    node.getChildByName('option_group').getChildByName('group_four').children[1].getChildByName('sevenClick').getChildByName('选项font').getComponent(cc.Label).string = '牛七2倍，牛八2倍，牛九3倍，牛牛4倍';
                }else if(extparams.double == 4){
                    node.getChildByName('option_group').getChildByName('group_four').children[1].getChildByName('sevenClick').getChildByName('选项font').getComponent(cc.Label).string = '牛七1倍，牛八2倍，牛九2倍，牛牛3倍';
                }

                //判断局数
                if(extparams.current == 10){
                    node.getChildByName('option_group').getChildByName('group_one').children[3].getChildByName('toClick').getChildByName('选项font').getComponent(cc.Label).string = '10局';
                }else if(extparams.current == 20){
                    node.getChildByName('option_group').getChildByName('group_one').children[3].getChildByName('toClick').getChildByName('选项font').getComponent(cc.Label).string = '20局';
                }else if(extparams.current == 30){
                    node.getChildByName('option_group').getChildByName('group_one').children[3].getChildByName('toClick').getChildByName('选项font').getComponent(cc.Label).string = '30局';
                }

                //判断闲家推注
                if(extparams.leisure == 'none'){
                    node.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '无';
                }else if(extparams.leisure == 5){
                    node.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '5';
                }else if(extparams.leisure == 10){
                    node.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '10';
                }else if(extparams.leisure == 15){
                    node.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '15';
                }else if(extparams.leisure == 20){
                    node.getChildByName('option_group').getChildByName('group_three').children[1].getChildByName('fiveClick').getChildByName('选项font').getComponent(cc.Label).string = '20';
                }

               }
        }

        var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node //这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = "niuniuclubsend";//这个是代码文件名
            clickEventHandler.handler = 'callback';
            var button = node.getChildByName('close').getComponent(cc.Button);
            button.clickEvents[0] = null;
            button.clickEvents[0] = clickEventHandler;
            var sprite = node.getChildByName('游戏').getChildByName('按钮').getChildByName('createroom').children[0].getComponent(cc.Sprite);
            cc.loader.loadRes('images/atlas/baocun',cc.SpriteFrame,function(err,spriteFrame){
                sprite.spriteFrame = spriteFrame;
            })

            var clickEventHandlerto = new cc.Component.EventHandler();
            clickEventHandlerto.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandlerto.component = "niuniuclubsend";//这个是代码文件名
            clickEventHandlerto.handler = 'onclickbaocun';
            var buttonbaocun = node.getChildByName('游戏').getChildByName('按钮').getChildByName('createroom').children[0].getComponent(cc.Button);
            buttonbaocun.clickEvents[0] = null;
            buttonbaocun.clickEvents[0] = clickEventHandlerto;
            cc.ss.openwin.parent.addChild(node);
    },

    //俱乐部设置玩法按钮函数
    onclickbaocun:function(){
        console.log('modol参数:'+beiMiCommon.maxhog);
        console.log(beiMiCommon.maxhog)
        cc.ss.user.nupeople = beiMiCommon.nupeople;
        var wxuser=cc.sys.localStorage.getItem("cacaca");
        chcode.playway = wxuser;
        var extparams = {};
        extparams.expenditure = beiMiCommon.secharge;
        extparams.point = beiMiCommon.score;
        extparams.special = beiMiCommon.doublerules;
        extparams.high = beiMiCommon.adoption;
        extparams.nupeople = beiMiCommon.nupeople;
        extparams.start = beiMiCommon.seoptable;
        extparams.banker = beiMiCommon.maxhog;
        extparams.double = beiMiCommon.sptype;
        extparams.gamemodel = 'room';
        extparams.gametype = 'douniu';
        extparams.current = beiMiCommon.nugames;
        extparams.leisure = beiMiCommon.pnhome;

        var writeable_path = jsb.fileUtils.getWritablePath();
        // 要在可写的路径先创建一个文件夹
        var new_dir = writeable_path + "new_dir";
        if(!jsb.fileUtils.isDirectoryExist(new_dir)) {
            jsb.fileUtils.createDirectory(new_dir);
        }
        else {
            // 读写文件我们分两种,文本文件, 二进制文件;
            // (1)文本文件的读,返回的是一个string对象
            var str_data = jsb.fileUtils.getStringFromFile(new_dir + "/game_clubroom_read.txt"); 
            console.log(str_data);
            str_data = JSON.stringify(extparams);
            //写文件数据
            jsb.fileUtils.writeStringToFile(str_data, new_dir + "/game_clubroom_data.txt");
        }

        cc.ss.openwin.parent.getChildByName('room').destroy();
    },

    //俱乐部里的删除成员
    onClickshanchuchengyuan:function(event){
        var tabnode = cc.ss.openwin.getChildByName('bolidi').getChildByName('huangbeijing').getChildByName('table2').getChildByName('view').getChildByName('danxuan');
        for(var inxb = 0; inxb < tabnode.children.length; inxb++){
            if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                var julebuid = tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string;
            }
        }

        if (this.ready()) {
            var club = {
                extparams : {}
            };
            club.extparams.clubid = julebuid,
            club.extparams.userid = event.target.parent.getChildByName('userid').getComponent(cc.Label).string,
            cc.ss.socket.exec("removeclub" , club);
        }
    },

    //黑名单里的小叉
    onClickyichuheimingdan:function(event){
        var tabnode = cc.ss.openwin.getChildByName('bolidi').getChildByName('huangbeijing').getChildByName('table2').getChildByName('view').getChildByName('danxuan');
        for(var inxb = 0; inxb < tabnode.children.length; inxb++){
            if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                var julebuid = tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string;
            }
        }

        if (this.ready()) {
            var club = {
                extparams : {}
            };
            club.extparams.clubid = julebuid,
            club.extparams.userid = event.target.parent.getChildByName('userid').getComponent(cc.Label).string,
            cc.ss.socket.exec("undockclub" , club);
        }
    },

    //积分榜里的总积分
    onClickzongjifen:function(){
        var tabnode = cc.ss.openwin.getChildByName('bolidi').getChildByName('huangbeijing').getChildByName('table2').getChildByName('view').getChildByName('danxuan');
        for(var inxb = 0; inxb < tabnode.children.length; inxb++){
            if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                var julebuid = tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string;
            }
        }

        if (this.ready()) {
            var club = {
                extparams : {}
            };
            club.extparams.noticetype = 'all',
            club.extparams.clubid = julebuid,
            cc.ss.socket.exec("pointclub" , club);
        }
    },

    //积分榜里的今日积分
    onClickjinrijifen:function(){
        var tabnode = cc.ss.openwin.getChildByName('bolidi').getChildByName('huangbeijing').getChildByName('table2').getChildByName('view').getChildByName('danxuan');
        for(var inxb = 0; inxb < tabnode.children.length; inxb++){
            if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                var julebuid = tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string;
            }
        }
        //当前日期
        var myDate = new Date();
        var nian = myDate.getFullYear();
        var yue = myDate.getMonth();
        var ri = myDate.getDate();  
        if (this.ready()) {
            var club = {
                extparams : {}
            };
            club.extparams.noticetype = 'today',
            club.extparams.clubid = julebuid,
            // club.extparams.thisdate = nian + "-" + yue + "-" + ri;
            club.extparams.thisdate = '2019-5-30'
            cc.ss.socket.exec("pointclub" , club);
        }
    },

    //积分榜里的昨日积分
    onClickzuorijifen:function(){
        var tabnode = cc.ss.openwin.getChildByName('bolidi').getChildByName('huangbeijing').getChildByName('table2').getChildByName('view').getChildByName('danxuan');
        for(var inxb = 0; inxb < tabnode.children.length; inxb++){
            if(tabnode.children[inxb].getChildByName('checkmark').active == true){
                var julebuid = tabnode.children[inxb].getChildByName('item').getChildByName('culbid').getComponent(cc.Label).string;
            }
        }
        //前一天日期
        var time=(new Date).getTime()-24*60*60*1000;
        var yesday=new Date(time);
        yesday=yesday.getFullYear() + "-" + (yesday.getMonth()> 9 ? (yesday.getMonth() + 1) : "0" + (yesday.getMonth() + 1)) + "-" +(yesday.getDate()> 9 ? (yesday.getDate()) : "0" + (yesday.getDate()));
  
        if (this.ready()) {
            var club = {
                extparams : {}
            };
            club.extparams.noticetype = 'yesterday',
            club.extparams.clubid = julebuid,
            club.extparams.thisdate = yesday,
            cc.ss.socket.exec("pointclub" , club);
        }
    },

    //从配置文件读取开放数据更改样式，选项的小点
    roomoptionpeizhi:function(context){
        
    },

    ceshiyong:function(event){
        console.log('单选按钮:'+event);
        console.log(event);
       var ace = cc.ss.openwin.getChildByName('bolidi').getChildByName('youdi').getChildByName('danxuananniu').getComponent(cc.ToggleContainer);
       console.log(ace)
    },

    onClickyuyin:function(event){
    //    var ace = require('js-agora');
    //    ace.createEngine('66f1f36a0ff44d4fb68e26ee2e0ac236');
    //    agora.init("66f1f36a0ff44d4fb68e26ee2e0ac236");  //初始化，里边是appid
    //    agora.setChannelProfile(0);  //设置频道属性  ,0为通信模式，1为直播模式
    //    agora.setDefaultAudioRouteToSpeakerphone(true);  //默认的语音路由，当前为扬声器
    // //    agora.leaveChannel();      //离开频道  成功的话返回0
    //    agora.enableAudio();       //打开音频
    // //    agora.disableAudio();      //关闭音频
    // //    agora.muteRemoteAudioStream("UID", true);       //静音指定用户音频 ，true为停止接收和播放，false为开启接收和播放
    //    agora.adjustPlaybackSignalVolume(100)        //调节播放信号音量 0 为静音  100为原始音量   400: 最大可为原始音量的 4 倍(自带溢出保护)
    if(event.target.parent.getChildByName('shuruinput').active == true){
        event.target.parent.getChildByName('shuruinput').active = false;
        event.target.parent.getChildByName('yuyinbtn').active = true;
    }else{
        event.target.parent.getChildByName('shuruinput').active = true;
        event.target.parent.getChildByName('yuyinbtn').active = false;
    }
        
    },

    //点击语音录制
    onClickVoice:function(){

    }


    


    








    // start () {

    // },

    // update (dt) {},
});
