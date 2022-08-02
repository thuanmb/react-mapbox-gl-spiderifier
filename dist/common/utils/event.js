"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExactEventHandlerName = exports.extractEventHandlers = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

const EVENT_PREFIX = /^on(.+)$/i;

const extractEventHandlers = props => {
  return _lodash.default.reduce(Object.keys(props), (res, prop) => {
    const cb = props[prop];

    if (EVENT_PREFIX.test(prop) && _lodash.default.isFunction(cb)) {
      const key = prop.replace(EVENT_PREFIX, (match, p) => "on".concat(p));
      res[key] = cb;
    }

    return res;
  }, {});
};

exports.extractEventHandlers = extractEventHandlers;

const getExactEventHandlerName = event => {
  if (!_lodash.default.isString(event)) {
    return event;
  }

  return event.replace("on", "").toLowerCase();
};

exports.getExactEventHandlerName = getExactEventHandlerName;