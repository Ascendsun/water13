module.exports = {
  plays_num: 5,//玩家桌位数
  mycards: null,//头4张
  lastfive: null,//后1张
  bankerflag: null,//跳出标记
  goldnumber: null,//倍率金币计数
  banker_node: null,//庄节点小图标
  bankerId: null,//庄ID
  banker_heart: null,//庄头像节点

  flay_addindx: null,//累加器
  five_addidx:null,//最后翻牌累加器
  fapai_addidx:null,//发牌累加器
  bp_fanpai_addidx:null,//比牌翻累加器
  niuniu_idx_out:false,//翻牌列队开关
  s:null,//自己翻累加器

  flay_add:null,//闲家赢统计
  flay_dec:null,//闲家输统计
  flay_xy: null,//庄家飞金币坐标
  flay_pock:null,//


  flay_gold:
    [[null, null, 0, 0, 0],//false：状态开关，null：用户头像飞行坐标，0：得分值；0：玩家id
    [null, null, 0, 0, 0],
    [null, null, 0, 0, 0],
    [null, null, 0, 0, 0],
    [null, null, 0, 0, 0],
    [null, null, 0, 0, 0],
    [null, null, 0, 0, 0],
    [null, null, 0, 0, 0],
    [null, null, 0, 0, 0],
    [null, null, 0, 0, 0]],//飞金币节点坐标；



  back_cards: [[false, null],
  [false, null],
  [false, null],
  [false, null],
  [false, null],
  [false, null],
  [false, null],
  [false, null],
  [false, null],
  [false, null]],//返回牌data数组 官挂载点


  set_back_cards: function () {//初始化返回牌数组 设置金币动画坐标
    this.back_cards[0][0] = false;//1-6个位置返回牌挂区
    this.back_cards[0][1] = null;//1-6个位置返回牌挂区
    this.back_cards[1][0] = false;
    this.back_cards[1][1] = null;
    this.back_cards[2][0] = false;
    this.back_cards[2][1] = null;
    this.back_cards[3][0] = false;
    this.back_cards[3][1] = null;
    this.back_cards[4][0] = false;
    this.back_cards[4][1] = null;
    this.back_cards[5][0] = false;
    this.back_cards[5][1] = null;
    this.back_cards[6][0] = false;
    this.back_cards[6][1] = null;
    this.back_cards[7][0] = false;
    this.back_cards[7][1] = null;
    this.back_cards[8][0] = false;
    this.back_cards[8][1] = null;
    this.back_cards[9][0] = false;
    this.back_cards[9][1] = null;
  },

  bt_Array:
    [["座位【1】", -469, -284, 1,null,null],
    ["座位【2】", -443, -21, 2,null,null],
    ["座位【3】", -386, 227, 3,null,null],
    ["座位【4】", 1, 287, 4,null,null],
    ["座位【5】", 387, 227, 5,null,null],
    ["座位【6】", 443, -21, 6,null,null],
    ["座位【7】", 0, 0, 7,null,null],
    ["座位【8】", 0, 0, 8,null,null],
    ["座位【9】", 0, 0, 9,null,null],
    ["座位【10】", 0, 0, 10,null,null]],

  banker_xy://抢庄小图标坐标
    [[0, -124, -25],
    [1, -372, -228],
    [2, -478, 73],
    [3, -341, 267],
    [4, 44, 327],
    [5, 442, 267],
    [6, 571, 73]],

  bankereight_xy:
    [[0, -124, -25],
    [1, -372, -228],
    [2, -509, 0],
    [3, -437, 175],
    [4, -185, 290],
    [5, 85, 315],
    [6, 345, 285],
    [7, 510, 175],
    [8, 580, 5]],

  bankerten_xy:
    [[0, -124, -25],
    [1, -354, -228],
    [2, -520, -75],
    [3, -515, 68],
    [4, 343, 191],
    [5, -140, 295],
    [6, 65, 330],
    [7, 264, 292],
    [8, 467, 192],
    [9, 573, 64],
    [10, 573, -72]],

  /////////////金币飞行的目标点/////////////////
  gold_xy:
    [[0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]],

};

