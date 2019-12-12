cc.Class({

    extends: cc.Component,


    properties: {

        marqueeLabel: cc.RichText,

        mask: cc.Node

    },


    onLoad: function () {

        this.desc1 = "是由上市公司开发的朋友圈精品游戏。安全承诺：绝对无外挂！游戏建议反馈请联系官方QQ群客服：123456789";

        this.desc2 = "是由上市公司开发的朋友圈精品游戏。安全承诺：绝对无外挂！游戏建议反馈请联系官方QQ群客服：123456789";

        this.desc3 = "是由上市公司开发的朋友圈精品游戏。安全承诺：绝对无外挂！游戏建议反馈请联系官方QQ群客服：123456789";

        this.descs = []

        this.descs.unshift(this.desc1)

        this.descs.unshift(this.desc2)

        this.descs.unshift(this.desc3)



        this.marqeeIndex = 0;

        this.marqueeBg = this.node;

        this.marqueeBg.opacity = 0;

    },


    update: function () {

        try {

            var endIndex = this.descs.length - 1

            var desc = this.descs[endIndex]

            if (desc) {

                this.runMarqeeBar(desc)

                this.descs[endIndex] = null;

            }

        } catch (e) {

        }

    },



    runMarqeeBar: function (desc) {

        this.marqueeBg.opacity = 255;

        this.marqueeLabel.node.x = this.mask.width;

        this.marqueeLabel.string = desc;

        this.marqueeLabel.node.runAction(cc.sequence(

            cc.moveTo(20, -this.marqueeLabel.node.width, 0),

            cc.callFunc(() => {

                this.descs.pop();

                if (!this.isExistContent()) {

                    this.descs.unshift(this.desc1)

                    // this.marqueeBg.opacity = 0;

                }

            }, this, this)))

    },



    isExistContent: function () {

        if (this.descs[this.descs.length - 1]) {

            return true;

        }

        return false;

    }

});