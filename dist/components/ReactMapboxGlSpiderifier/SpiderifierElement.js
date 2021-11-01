"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../../common/utils");

var _MarkerLayer2 = require("../MarkerLayer");

var SpiderifierElement = /*#__PURE__*/function (_MarkerLayer) {
  (0, _inherits2.default)(SpiderifierElement, _MarkerLayer);

  var _super = (0, _createSuper2.default)(SpiderifierElement);

  function SpiderifierElement(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SpiderifierElement);
    _this = _super.call(this, props);

    _this.setChildRef = function (childRef) {
      return _this.childRef = _this.childRef || childRef;
    };

    var animate = props.animate;
    _this.state = {
      animateClass: (0, _classnames.default)({
        "animate initial": animate
      })
    };
    return _this;
  }

  (0, _createClass2.default)(SpiderifierElement, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !_lodash.default.isEqual(this.props, nextProps) || !_lodash.default.isEqual(this.state, nextState);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      (0, _get2.default)((0, _getPrototypeOf2.default)(SpiderifierElement.prototype), "componentDidMount", this).call(this);

      if (this._animationEnabled()) {
        _lodash.default.delay(function () {
          return _this2.setState({
            animateClass: "animate"
          });
        }, 0);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.attachChildren();
    }
  }, {
    key: "getStyle",
    value: function getStyle(props) {
      var shouldRenderLeg = props.shouldRenderLeg,
          x = props.x,
          y = props.y,
          style = props.style;
      var marginLeft = "";
      var marginTop = "";
      var transitionDelay = "";

      if (shouldRenderLeg) {
        marginLeft = "".concat(x, "px");
        marginTop = "".concat(y, "px");
        transitionDelay = this._getTransitionDelay(props);
      }

      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
        marginLeft: marginLeft,
        marginTop: marginTop,
        transitionDelay: transitionDelay
      });
    }
  }, {
    key: "getContainerClassName",
    value: function getContainerClassName(props) {
      var animateClass = this.state.animateClass;
      var className = props.className,
          y = props.y;
      return (0, _classnames.default)("spidered-marker", className, animateClass, {
        top: y <= 0,
        bottom: y > 0
      });
    }
  }, {
    key: "getContent",
    value: function getContent(props) {
      var shouldRenderLeg = props.shouldRenderLeg;
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "icon-div"
      }, this._getDecorateChildren(props)), shouldRenderLeg && /*#__PURE__*/_react.default.createElement("div", {
        className: "line-div",
        style: this._getLegStyles(props)
      }));
    }
  }, {
    key: "getOffset",
    value: function getOffset() {
      var _this$props = this.props,
          shouldRenderLeg = _this$props.shouldRenderLeg,
          x = _this$props.x,
          y = _this$props.y;
      return shouldRenderLeg ? [x, y] : [0, 0];
    }
  }, {
    key: "getProperties",
    value: function getProperties() {
      if (this.props.children) {
        return this.props.children.props.properties;
      }

      return {};
    }
  }, {
    key: "_animationEnabled",
    value: function _animationEnabled() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var animate = props.animate;
      return animate;
    }
  }, {
    key: "_getDecorateChildren",
    value: function _getDecorateChildren(props) {
      var _this3 = this;

      var children = props.children,
          coordinates = props.coordinates;
      return _react.default.Children.map(children, function (child) {
        if ((0, _utils.isReactComponent)(child)) {
          return /*#__PURE__*/_react.default.cloneElement(child, {
            coordinates: coordinates,
            offset: _this3.getOffset(),
            ref: _this3.setChildRef,
            mapBox: _this3.getMapInstance()
          });
        }

        return child;
      });
    }
  }, {
    key: "_getLegStyles",
    value: function _getLegStyles(props) {
      var legLength = props.legLength,
          angle = props.angle,
          legStyles = props.legStyles;
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, legStyles), {}, {
        height: legLength,
        transform: "rotate(".concat(angle - Math.PI / 2, "rad)"),
        transitionDelay: this._getTransitionDelay(props)
      });
    }
  }, {
    key: "_getTransitionDelay",
    value: function _getTransitionDelay(props) {
      var animate = props.animate,
          transitionDelay = props.transitionDelay;
      return animate ? "".concat(transitionDelay, "s") : "";
    }
  }]);
  return SpiderifierElement;
}(_MarkerLayer2.MarkerLayer);

SpiderifierElement.displayName = "SpiderifierElement";
SpiderifierElement.propTypes = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, _MarkerLayer2.MarkerLayer.propTypes), {}, {
  angle: _propTypes.default.number,
  animate: _propTypes.default.bool,
  legLength: _propTypes.default.number,
  legStyles: _propTypes.default.object,
  index: _propTypes.default.number,
  shouldRenderLeg: _propTypes.default.bool,
  transitionDelay: _propTypes.default.number,
  x: _propTypes.default.number,
  y: _propTypes.default.number
});
SpiderifierElement.defaultProps = {
  animate: true,
  transitionDelay: 200
};
var _default = SpiderifierElement;
exports.default = _default;