import _objectSpread from "/Users/thuanbui/source_code/react-mapbox-gl-spiderifier/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "/Users/thuanbui/source_code/react-mapbox-gl-spiderifier/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/Users/thuanbui/source_code/react-mapbox-gl-spiderifier/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/Users/thuanbui/source_code/react-mapbox-gl-spiderifier/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/Users/thuanbui/source_code/react-mapbox-gl-spiderifier/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/Users/thuanbui/source_code/react-mapbox-gl-spiderifier/node_modules/@babel/runtime/helpers/esm/inherits";
import React, { Children, Component } from "react";
import _ from "lodash";
import { checkPropsChange, extractEventHandlers } from "../../common/utils";
import SpiderifierElement from "./SpiderifierElement";
import { TwoPi } from "./constants";
import "./MapboxGlSpiderifier.css";

var MapboxGlSpiderifier =
/*#__PURE__*/
function (_Component) {
  _inherits(MapboxGlSpiderifier, _Component);

  function MapboxGlSpiderifier(props) {
    var _this;

    _classCallCheck(this, MapboxGlSpiderifier);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MapboxGlSpiderifier).call(this, props));
    _this.state = {
      spiderParams: null
    };
    return _this;
  }

  _createClass(MapboxGlSpiderifier, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        spiderParams: this._generateSpiderParams()
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this._updateSpiderParams(nextProps);
    }
  }, {
    key: "_generateCircleParams",
    value: function _generateCircleParams(props) {
      var _this2 = this;

      var count = this._getMarkersCount(props);

      var circleFootSeparation = props.circleFootSeparation;
      var circumference = circleFootSeparation * (2 + count);
      var legLength = circumference / TwoPi; // = radius from circumference

      var angleStep = TwoPi / count;
      return _.times(count, function (index) {
        var angle = index * angleStep;
        return _objectSpread({}, _this2._getSpiderPosition(props, legLength, angle), {
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
        return _objectSpread({}, markerProp, {
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
      return _.times(count, function (index) {
        angle = angle + (spiralFootSeparation / legLength + index * 0.0005);
        legLength = legLength + TwoPi * spiralLengthFactor / angle;
        return _objectSpread({}, _this3._getSpiderPosition(props, legLength, angle), {
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
      return Children.toArray(children).filter(function (child) {
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
      var eventHanders = extractEventHandlers(this.props);
      return this._getNotNullChildren().map(function (child, index) {
        var params = spiderParams[index];
        var legStyles = child.props.legStyles;

        if (params) {
          return React.createElement(SpiderifierElement, Object.assign({
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
    value: function _updateSpiderParams(nextProps) {
      if (checkPropsChange(this.props, nextProps, ["children", "circleFootSeparation", "circleSpiralSwitchover", "spiralFootSeparation", "spiralLengthStart", "spiralLengthFactor", "transformSpiderLeft", "showingLegs"], _.isEqual)) {
        this.setState({
          spiderParams: this._generateSpiderParams(nextProps)
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
}(Component);

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
export default MapboxGlSpiderifier;