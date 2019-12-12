module.exports = {
        score : null,//分数
        secharge : null,//服务费
        seoptable : null,//自动开桌
        doublerules : null,//特殊牌型
        maxhog : null,//最大抢庄
        sptype : null,//翻倍规则
        adoption : null,//高级选项
        nupeople : null,//几人场
        playway : null,//playwayid
        nugames : null,//局数
        pnhome : null,//闲家开注

        moduleshuju : null,
        fangjiahuichuan : null,
        jiarufangjian : null,
        jisuandepai : [],
        playtime : null,
        playtimeriqi : null,
        playtimeshijian : null,
        jiarufangjian : null,

        dianjizhihou : null,//坐下，站起，用户同步
        kaiju : null,  //是否已经开局
        anpai : [],    //后台传来有牛的三张牌
        bgimg : null, //游戏背景图片
        backroom : null,    //返回房间的参数
        audiolist : [],     //音频文件
        relativesroom : null,  //亲友圈房间信息
        relativesroomlist : [], //亲友圈房间成员数组
        personsum : null,       //几人房
        playersnum : [],        //座位内容
        jiaruroomdata : null,   //加入房间参数
        pangguandata : null,
        qinyouroomdata : [],    //亲友圈房间数据
        yanshitime : 0.5,       //用于设置缓动时间
        numbersum : 0,          //用于数据重连缓动判断用
        jishiceshi : false,
        jishi : 0,
        stuas : false,
        maikepox : null,         //麦克风定位x
        maikepoy : null,         //麦克风定位y

        qiangzhuangselect : null,   //智能托管里的抢庄选项
        tuizhuselect : null,    //智能托管里的推注选项
        xiazhuselect : null,    //只能托管里的下注选项
        multipleselct : null,   //智能托管里的抢庄倍数 
        userjiarudata : null,
        huandong : null,        //房卡模式聊天缓动
        liangtiandata : [],     //房卡模式聊天数据

        clubdata : null,      //俱乐部数据
        clubliaotian : [],    //聊天数据
        joinclubxinxi : [],    //加入俱乐部请求数据
        clubzhuid : null,      //作用为操作拒绝加入俱乐部的人id
        juleburoom : null,      //判断是否由俱乐部打开的创建房间
        clubid : null,          //离开房间的时候用作判断是否是由俱乐部创建的房间，是的话返回游戏方法信息到，俱乐部房间板块
        clubmember : null,      //俱乐部成员
        clubshezhi : [],         //俱乐部里设置用作判断时候是管理员

        relativesdata : null,   //进入亲友场里边的参数
        relativespaiju : null,  //亲友场里边的的牌局
        thisroomdata : null,    //本桌的数据
        pangguansign : null,    //亲友场里的观战标记
        lookroomdata : null,    //lookroom指令返回参数

        reconnectdata : [],   //用户重连
        closetime : false,

        clublistdata: null,     //亲友圈列表参数
    };