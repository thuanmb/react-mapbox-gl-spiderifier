"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../../common/utils");

var _MarkerLayer = require("../MarkerLayer");

class SpiderifierElement extends _MarkerLayer.MarkerLayer {
  constructor(props) {
    super(props);

    this.setChildRef = childRef => this.childRef = this.childRef || childRef;

    const {
      animate
    } = props;
    this.state = {
      animateClass: (0, _classnames.default)({
        "animate initial": animate
      })
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_lodash.default.isEqual(this.props, nextProps) || !_lodash.default.isEqual(this.state, nextState);
  }

  componentDidMount() {
    super.componentDidMount();

    if (this._animationEnabled()) {
      _lodash.default.delay(() => this.setState({
        animateClass: "animate"
      }), 0);
    }
  }

  componentDidUpdate() {
    this.attachChildren();
  }

  getStyle(props) {
    const {
      shouldRenderLeg,
      x,
      y,
      style
    } = props;
    let marginLeft = "";
    let marginTop = "";
    let transitionDelay = "";

    if (shouldRenderLeg) {
      marginLeft = "".concat(x, "px");
      marginTop = "".concat(y, "px");
      transitionDelay = this._getTransitionDelay(props);
    }

    return { ...style,
      marginLeft,
      marginTop,
      transitionDelay
    };
  }

  getContainerClassName(props) {
    const {
      animateClass
    } = this.state;
    const {
      className,
      y
    } = props;
    return (0, _classnames.default)("spidered-marker", className, animateClass, {
      top: y <= 0,
      bottom: y > 0
    });
  }

  getContent(props) {
    const {
      shouldRenderLeg
    } = props;
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      className: "icon-div"
    }, this._getDecorateChildren(props)), shouldRenderLeg && /*#__PURE__*/_react.default.createElement("div", {
      className: "line-div",
      style: this._getLegStyles(props)
    }));
  }

  getOffset() {
    const {
      shouldRenderLeg,
      x,
      y
    } = this.props;
    return shouldRenderLeg ? [x, y] : [0, 0];
  }

  getProperties() {
    if (this.props.children) {
      return this.props.children.props.properties;
    }

    return {};
  }

  _animationEnabled() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
    const {
      animate
    } = props;
    return animate;
  }

  _getDecorateChildren(props) {
    const {
      children,
      coordinates
    } = props;
    return _react.default.Children.map(children, child => {
      if ((0, _utils.isReactComponent)(child)) {
        return /*#__PURE__*/_react.default.cloneElement(child, {
          coordinates,
          offset: this.getOffset(),
          ref: this.setChildRef,
          mapBox: this.getMapInstance()
        });
      }

      return child;
    });
  }

  _getLegStyles(props) {
    const {
      legLength,
      angle,
      legStyles
    } = props;
    return { ...legStyles,
      height: legLength,
      transform: "rotate(".concat(angle - Math.PI / 2, "rad)"),
      transitionDelay: this._getTransitionDelay(props)
    };
  }

  _getTransitionDelay(props) {
    const {
      animate,
      transitionDelay
    } = props;
    return animate ? "".concat(transitionDelay, "s") : "";
  }

}

SpiderifierElement.displayName = "SpiderifierElement";
SpiderifierElement.propTypes = { ..._MarkerLayer.MarkerLayer.propTypes,
  angle: _propTypes.default.number,
  animate: _propTypes.default.bool,
  legLength: _propTypes.default.number,
  legStyles: _propTypes.default.object,
  index: _propTypes.default.number,
  shouldRenderLeg: _propTypes.default.bool,
  transitionDelay: _propTypes.default.number,
  x: _propTypes.default.number,
  y: _propTypes.default.number
};
SpiderifierElement.defaultProps = {
  animate: true,
  transitionDelay: 200
};
var _default = SpiderifierElement;
exports.default = _default;