"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SubscriptionListener = /*#__PURE__*/function () {
  function SubscriptionListener() {
    _classCallCheck(this, SubscriptionListener);
    this.listenerMap = {};
    this.lastTriggerValueMap = {};
    this.triggeredKeys = {};
  }
  _createClass(SubscriptionListener, [{
    key: "listenTo",
    value: function listenTo(key, callback) {
      var _this = this;
      var useLastValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (typeof callback !== 'function') throw "expected a function in listenTo() second argument \"".concat(callback, "\"");
      if (typeof useLastValue !== 'boolean') throw "expected a boolean in listenTo() third argument but got \"".concat(useLastValue, "\"");
      if (!this.listenerMap[key]) this.listenerMap[key] = {
        ite: 0,
        triggers: {}
      };
      var node = "".concat(++this.listenerMap[key].ite);
      var hasCancelled;
      this.listenerMap[key].triggers[node] = callback;
      if (useLastValue) setTimeout(function () {
        if (!hasCancelled) callback === null || callback === void 0 ? void 0 : callback.apply(void 0, _toConsumableArray(_this.lastTriggerValueMap[key] || []));
      }, 1);
      return function () {
        if (!hasCancelled) {
          delete _this.listenerMap[key].triggers[node];
          if (!Object.keys(_this.listenerMap[key].triggers).length) delete _this.listenerMap[key];
        }
        hasCancelled = true;
      };
    }
  }, {
    key: "hasDispatched",
    value: function hasDispatched(key) {
      return !!this.triggeredKeys[key];
    }
  }, {
    key: "deleteDispatch",
    value: function deleteDispatch(key) {
      if (this.lastTriggerValueMap[key]) delete this.lastTriggerValueMap[key];
      if (this.triggeredKeys[key]) delete this.triggeredKeys[key];
    }
  }, {
    key: "dispatch",
    value: function dispatch() {
      var _this$listenerMap$key,
        _this2 = this;
      var param = _toConsumableArray(arguments || []),
        key = param[0],
        value = param.filter(function (_, i) {
          return i;
        });
      if (!key) throw "expected a string in trigger() first argument but got \"".concat(key, "\"");
      Object.keys(((_this$listenerMap$key = this.listenerMap[key]) === null || _this$listenerMap$key === void 0 ? void 0 : _this$listenerMap$key.triggers) || {}).forEach(function (e) {
        var _this2$listenerMap$ke, _this2$listenerMap$ke2, _this2$listenerMap$ke3;
        (_this2$listenerMap$ke = _this2.listenerMap[key]) === null || _this2$listenerMap$ke === void 0 || (_this2$listenerMap$ke2 = (_this2$listenerMap$ke3 = _this2$listenerMap$ke.triggers)[e]) === null || _this2$listenerMap$ke2 === void 0 ? void 0 : _this2$listenerMap$ke2.call.apply(_this2$listenerMap$ke2, [_this2$listenerMap$ke3].concat(_toConsumableArray(value)));
      });
      this.lastTriggerValueMap[key] = value;
      this.triggeredKeys[key] = true;
    }
  }]);
  return SubscriptionListener;
}();
exports["default"] = SubscriptionListener;
;