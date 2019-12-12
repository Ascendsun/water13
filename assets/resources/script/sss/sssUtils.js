var sssUtils = {


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
    
    ACTION_CHUPAI: 1,
    GAME_PLAYER: 6,
    PaiValue: {
        VAL_KING_SMALL: 15,
        VAL_KING_BIG: 16,
        VAL_2: 2,
        VAL_3: 3,
        VAL_10: 10,
        VAL_J: 11,
        VAL_Q: 12,
        VAL_K: 13,
        VAL_A: 14
    },
    GameState: {
        GAME_PREPARE: 0,
        GAME_START: 1,
        GAME_OVER: 2,
        GAME_COMPARE: 3,
        GAME_REPLAY: 4
    },
    GameType: {
        GAME_CLASSIC: 0,
        GAME_FUNNY: 1,
        GAME_LAIZI: 2
    },
    CardColor: {
        CARD_COLOR_KING: 0,
        CARD_COLOR_HEI: 1,
        CARD_COLOR_HONG: 2,
        CARD_COLOR_MEI: 3,
        CARD_COLOR_FANG: 4
    },
    PaiType: {
        NONE: 0,
        WL: 1,
        YD: 2,
        ED: 3,
        ST: 4,
        SZ: 5,
        TH: 6,
        HL: 7,
        TZ: 8,
        THS: 9,
        WT: 10,
        STH: 11,
        SSZ: 12,
        LDB: 13,
        WDST: 14,
        STST: 15,
        QHYHEI: 16,
        QX: 17,
        QD: 18,
        QHEIYH: 19,
        SFTX: 20,
        STHS: 21,
        SEHZ: 22,
        YTL: 23,
        ZZQL: 24,
        QHEI: 25,
        QHONG: 26,
        WTZ: 27,
        SSTHS: 28,
        SQTHS: 29,
        LDBZD: 30
    },
    PaiTypeSound: {
        0 : null,
        1 : "single",
        2 : "pair",
        3 : "triple",
        4 : "tripleappend1",
        5 : "tripleappend2",
        6 : "singlelink",
        7 : "pairlink",
        8 : "triplelink",
        9 : "triplelinkappend",
        10 : "triplelinkappend",
        11 : "bomb",
        12 : "fourappend",
        13 : "fourappend",
        14 : "rocket"
    },
    QuickChatInfo: [],
   


};
module.exports = sssUtils
