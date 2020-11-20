"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExactEventHandlerName = exports.extractEventHandlers = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var EVENT_PREFIX = /^on(.+)$/i;

var extractEventHandlers = function extractEventHandlers(props) {
  return _lodash.default.reduce(Object.keys(props), function (res, prop) {
    var cb = props[prop];

    if (EVENT_PREFIX.test(prop) && _lodash.default.isFunction(cb)) {
      var key = prop.replace(EVENT_PREFIX, function (match, p) {
        return "on".concat(p);
      });
      res[key] = cb;
    }

    return res;
  }, {});
};

exports.extractEventHandlers = extractEventHandlers;

var getExactEventHandlerName = function getExactEventHandlerName(event) {
  if (!_lodash.default.isString(event)) {
    return event;
  }

  return event.replace("on", "").toLowerCase();
};

exports.getExactEventHandlerName = getExactEventHandlerName;