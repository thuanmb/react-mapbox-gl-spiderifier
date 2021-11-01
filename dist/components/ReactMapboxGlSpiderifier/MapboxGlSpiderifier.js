"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../../common/utils");

var _SpiderifierElement = _interopRequireDefault(require("./SpiderifierElement"));

var _constants = require("./constants");

require("./MapboxGlSpiderifier.css");

var MapboxGlSpiderifier = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(MapboxGlSpiderifier, _Component);

  var _super = (0, _createSuper2.default)(MapboxGlSpiderifier);

  function MapboxGlSpiderifier(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MapboxGlSpiderifier);
    _this = _super.call(this, props);
    _this.state = {
      spiderParams: _this._generateSpiderParams(props)
    };
    return _this;
  }

  (0, _createClass2.default)(MapboxGlSpiderifier, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this._updateSpiderParams(prevProps);
    }
  }, {
    key: "_generateCircleParams",
    value: function _generateCircleParams(props) {
      var _this2 = this;

      var count = this._getMarkersCount(props);

      var circleFootSeparation = props.circleFootSeparation;
      var circumference = circleFootSeparation * (2 + count);
      var legLength = circumference / _constants.TwoPi; // = radius from circumference

      var angleStep = _constants.TwoPi / count;
      return _lodash.default.times(count, function (index) {
        var angle = index * angleStep;
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, _this2._getSpiderPosition(props, legLength, angle)), {}, {
          index: index,
          transitionDelay: _this2._getTransitionDelay(props, index)
        });
      });
    }
  }, {
    key: "_generateSpiderParams",
    value: function _generateSpiderParams() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var circleSpiralSwitchover = props.circleSpiralSwitchover,
          animate = props.animate,
          animationSpeed = props.animationSpeed,
          showingLegs = props.showingLegs;

      var count = this._getMarkersCount(props);

      if (!count) {
        return null;
      }

      var shouldRenderLeg = count > 1 || showingLegs;
      var markersProps = count >= circleSpiralSwitchover ? this._generateSpiralParams(props) : this._generateCircleParams(props);
      return markersProps.map(function (markerProp) {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, markerProp), {}, {
          animate: animate,
          animationSpeed: animationSpeed,
          shouldRenderLeg: shouldRenderLeg
        });
      });
    }
  }, {
    key: "_generateSpiralParams",
    value: function _generateSpiralParams(props) {
      var _this3 = this;

      var count = this._getMarkersCount(props);

      var spiralFootSeparation = props.spiralFootSeparation,
          spiralLengthFactor = props.spiralLengthFactor,
          spiralLengthStart = props.spiralLengthStart;
      var angle = 0;
      var legLength = spiralLengthStart;
      return _lodash.default.times(count, function (index) {
        angle = angle + (spiralFootSeparation / legLength + index * 0.0005);
        legLength = legLength + _constants.TwoPi * spiralLengthFactor / angle;
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, _this3._getSpiderPosition(props, legLength, angle)), {}, {
          index: index,
          transitionDelay: _this3._getTransitionDelay(props, index),
          style: {
            zIndex: count - index
          }
        });
      });
    }
  }, {
    key: "_getNotNullChildren",
    value: function _getNotNullChildren() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var children = props.children;
      return _react.Children.toArray(children).filter(function (child) {
        return child !== null;
      });
    }
  }, {
    key: "_getMarkersCount",
    value: function _getMarkersCount(props) {
      var children = this._getNotNullChildren(props);

      return children.length;
    }
  }, {
    key: "_getSpiderifierMarkers",
    value: function _getSpiderifierMarkers() {
      var spiderParams = this.state.spiderParams;

      if (!spiderParams) {
        return null;
      }

      var coordinates = this.props.coordinates;
      var eventHanders = (0, _utils.extractEventHandlers)(this.props);
      return this._getNotNullChildren().map(function (child, index) {
        var params = spiderParams[index];
        var legStyles = child.props.legStyles;

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
  }, {
    key: "_getSpiderPosition",
    value: function _getSpiderPosition(props, legLength, angle) {
      var transformSpiderLeft = props.transformSpiderLeft,
          transformSpiderTop = props.transformSpiderTop;
      return {
        angle: angle,
        legLength: legLength - transformSpiderLeft,
        x: legLength * Math.cos(angle) + transformSpiderLeft,
        y: legLength * Math.sin(angle) + transformSpiderTop
      };
    }
  }, {
    key: "_getTransitionDelay",
    value: function _getTransitionDelay(props, index) {
      var markersCount = this._getMarkersCount(props);

      var animationSpeed = props.animationSpeed;
      return animationSpeed / 1000 / markersCount * index;
    }
  }, {
    key: "_updateSpiderParams",
    value: function _updateSpiderParams(prevProps) {
      if ((0, _utils.checkPropsChange)(this.props, prevProps, ["children", "circleFootSeparation", "circleSpiralSwitchover", "spiralFootSeparation", "spiralLengthStart", "spiralLengthFactor", "transformSpiderLeft", "showingLegs"], _lodash.default.isEqual)) {
        this.setState({
          spiderParams: this._generateSpiderParams(this.props)
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this._getSpiderifierMarkers();
    }
  }]);
  return MapboxGlSpiderifier;
}(_react.Component);

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
var _default = MapboxGlSpiderifier;
exports.default = _default;