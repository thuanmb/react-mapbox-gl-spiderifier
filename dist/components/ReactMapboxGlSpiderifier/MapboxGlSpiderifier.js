"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _utils = require("../../common/utils");
var _SpiderifierElement = _interopRequireDefault(require("./SpiderifierElement"));
var _constants = require("./constants");
require("./MapboxGlSpiderifier.css");
class MapboxGlSpiderifier extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      spiderParams: this._generateSpiderParams(props)
    };
  }
  componentDidUpdate(prevProps) {
    this._updateSpiderParams(prevProps);
  }
  _generateCircleParams(props) {
    const count = this._getMarkersCount(props);
    const {
      circleFootSeparation
    } = props;
    let circumference = circleFootSeparation * (2 + count);
    let legLength = circumference / _constants.TwoPi; // = radius from circumference
    let angleStep = _constants.TwoPi / count;
    return _lodash.default.times(count, index => {
      const angle = index * angleStep;
      return {
        ...this._getSpiderPosition(props, legLength, angle),
        index,
        transitionDelay: this._getTransitionDelay(props, index)
      };
    });
  }
  _generateSpiderParams() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
    const {
      circleSpiralSwitchover,
      animate,
      animationSpeed,
      showingLegs
    } = props;
    const count = this._getMarkersCount(props);
    if (!count) {
      return null;
    }
    const shouldRenderLeg = count > 1 || showingLegs;
    const markersProps = count >= circleSpiralSwitchover ? this._generateSpiralParams(props) : this._generateCircleParams(props);
    return markersProps.map(markerProp => ({
      ...markerProp,
      animate,
      animationSpeed,
      shouldRenderLeg
    }));
  }
  _generateSpiralParams(props) {
    const count = this._getMarkersCount(props);
    const {
      spiralFootSeparation,
      spiralLengthFactor,
      spiralLengthStart
    } = props;
    let angle = 0;
    let legLength = spiralLengthStart;
    return _lodash.default.times(count, index => {
      angle = angle + (spiralFootSeparation / legLength + index * 0.0005);
      legLength = legLength + _constants.TwoPi * spiralLengthFactor / angle;
      return {
        ...this._getSpiderPosition(props, legLength, angle),
        index,
        transitionDelay: this._getTransitionDelay(props, index),
        style: {
          zIndex: count - index
        }
      };
    });
  }
  _getNotNullChildren() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
    const {
      children
    } = props;
    return _react.Children.toArray(children).filter(child => child !== null);
  }
  _getMarkersCount(props) {
    const children = this._getNotNullChildren(props);
    return children.length;
  }
  _getSpiderifierMarkers() {
    const {
      spiderParams
    } = this.state;
    if (!spiderParams) {
      return null;
    }
    const {
      coordinates
    } = this.props;
    const eventHanders = (0, _utils.extractEventHandlers)(this.props);
    return this._getNotNullChildren().map((child, index) => {
      const params = spiderParams[index];
      const {
        legStyles
      } = child.props;
      if (params) {
        return /*#__PURE__*/_react.default.createElement(_SpiderifierElement.default, Object.assign({
          key: index,
          coordinates: coordinates,
          legStyles: legStyles
        }, params, eventHanders), child);
      }
      return null;
    });
  }
  _getSpiderPosition(props, legLength, angle) {
    const {
      transformSpiderLeft,
      transformSpiderTop
    } = props;
    return {
      angle,
      legLength: legLength - transformSpiderLeft,
      x: legLength * Math.cos(angle) + transformSpiderLeft,
      y: legLength * Math.sin(angle) + transformSpiderTop
    };
  }
  _getTransitionDelay(props, index) {
    const markersCount = this._getMarkersCount(props);
    const {
      animationSpeed
    } = props;
    return animationSpeed / 1000 / markersCount * index;
  }
  _updateSpiderParams(prevProps) {
    if ((0, _utils.checkPropsChange)(this.props, prevProps, ["children", "circleFootSeparation", "circleSpiralSwitchover", "spiralFootSeparation", "spiralLengthStart", "spiralLengthFactor", "transformSpiderLeft", "showingLegs"], _lodash.default.isEqual)) {
      this.setState({
        spiderParams: this._generateSpiderParams(this.props)
      });
    }
  }
  render() {
    return this._getSpiderifierMarkers();
  }
}
MapboxGlSpiderifier.displayName = "MapboxGlSpiderifier";
MapboxGlSpiderifier.defaultProps = {
  circleSpiralSwitchover: 9,
  circleFootSeparation: 90,
  spiralFootSeparation: 80,
  spiralLengthStart: 60,
  spiralLengthFactor: 5,
  animate: true,
  animationSpeed: 500,
  transformSpiderLeft: 0,
  transformSpiderTop: 0,
  showingLegs: false
};
var _default = exports.default = MapboxGlSpiderifier;