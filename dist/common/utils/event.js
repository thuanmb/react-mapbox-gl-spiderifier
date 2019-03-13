import _ from "lodash";
var EVENT_PREFIX = /^on(.+)$/i;
export var extractEventHandlers = function extractEventHandlers(props) {
  return _.reduce(Object.keys(props), function (res, prop) {
    var cb = props[prop];

    if (EVENT_PREFIX.test(prop) && _.isFunction(cb)) {
      var key = prop.replace(EVENT_PREFIX, function (match, p) {
        return "on".concat(p);
      });
      res[key] = cb;
    }

    return res;
  }, {});
};
export var getExactEventHandlerName = function getExactEventHandlerName(event) {
  if (!_.isString(event)) {
    return event;
  }

  return event.replace("on", "").toLowerCase();
};