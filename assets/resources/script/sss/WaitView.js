
    var n = function(e) {
        return e && e.__esModule ? e: {
        default:
            e
        }
    } (require("../lib/BaseView"));
    cc.Class({
        extends:
        n.
    default,
        properties: {
            labelContent: cc.Label,
            rotNode: cc.Node
        },
        show: function(e) {
            this.labelContent.string = e
        },
        update: function(e) {
            this.rotNode.rotation = this.rotNode.rotation + 45 * e
        }
    });
