
// cc.Class({
//     emitter: [
//         function (e, t, a) {
//             "use strict";

//             function n(e) {
//                 if (e) return function (e) {
//                     for (var t in n.prototype) e[t] = n.prototype[t];
//                     return e
//                 }(e)
//             }
//             cc._RF.push(t, "f1e34Y26+FNzo6c55pK9agM", "emitter"), t.exports = n, n.prototype.on = n.prototype.addEventListener = function (e, t) {
//                 return this._callbacks = this._callbacks || {}, (this._callbacks[e] = this._callbacks[e] || []).push(t), this
//             }, n.prototype.once = function (e, t) {
//                 var a = this;

//                 function n() {
//                     a.off(e, n), t.apply(this, arguments)
//                 }
//                 return this._callbacks = this._callbacks || {}, n.fn = t, this.on(e, n), this
//             }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (e, t) {
//                 if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
//                 var a, n = this._callbacks[e];
//                 if (!n) return this;
//                 if (1 == arguments.length) return delete this._callbacks[e], this;
//                 for (var i = 0; i < n.length; i++)
//                     if ((a = n[i]) === t || a.fn === t) {
//                         n.splice(i, 1);
//                         break
//                     }
//                 return this
//             }, n.prototype.emit = function (e) {
//                 this._callbacks = this._callbacks || {};
//                 var t = [].slice.call(arguments, 1),
//                     a = this._callbacks[e];
//                 if (a)
//                     for (var n = 0, i = (a = a.slice(0)).length; n < i; ++n) a[n].apply(this, t);
//                 return this
//             }, n.prototype.listeners = function (e) {
//                 return this._callbacks = this._callbacks || {}, this._callbacks[e] || []
//             }, n.prototype.hasListeners = function (e) {
//                 return !!this.listeners(e).length
//             }, cc._RF.pop()
//         }, {}
//     ],
// });
