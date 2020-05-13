import _ from "lodash";

const EVENT_PREFIX = /^on(.+)$/i;

export const extractEventHandlers = props => {
	return _.reduce(
		Object.keys(props),
		(res, prop) => {
			const cb = props[prop];
			if (EVENT_PREFIX.test(prop) && _.isFunction(cb)) {
				const key = prop.replace(EVENT_PREFIX, (match, p) => `on${p}`);
				res[key] = cb;
			}
			return res;
		},
		{}
	);
};

export const getExactEventHandlerName = event => {
	if (!_.isString(event)) {
		return event;
	}

	return event.replace("on", "").toLowerCase();
};
