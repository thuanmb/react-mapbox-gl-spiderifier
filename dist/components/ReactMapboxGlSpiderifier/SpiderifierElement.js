import _objectSpread from "/Users/thuanbui/source_code/react-mapbox-gl-spiderifier/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "/Users/thuanbui/source_code/react-mapbox-gl-spiderifier/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/Users/thuanbui/source_code/react-mapbox-gl-spiderifier/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/Users/thuanbui/source_code/react-mapbox-gl-spiderifier/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/Users/thuanbui/source_code/react-mapbox-gl-spiderifier/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _get from "/Users/thuanbui/source_code/react-mapbox-gl-spiderifier/node_modules/@babel/runtime/helpers/esm/get";
import _inherits from "/Users/thuanbui/source_code/react-mapbox-gl-spiderifier/node_modules/@babel/runtime/helpers/esm/inherits";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import { isReactComponent } from "../../common/utils";
import { MarkerLayer } from "../MarkerLayer";

var SpiderifierElement =
/*#__PURE__*/
function (_MarkerLayer) {
  _inherits(SpiderifierElement, _MarkerLayer);

  function SpiderifierElement(props) {
    var _this;

    _classCallCheck(this, SpiderifierElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpiderifierElement).call(this, props));

    _this.setChildRef = function (childRef) {
      return _this.childRef = _this.childRef || childRef;
    };

    _this.state = {
      animateClass: ""
    };
    return _this;
  }

  _createClass(SpiderifierElement, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var animate = this.props.animate;
      this.setState({
        animateClass: classnames({
          "animate initial": animate
        })
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _get(_getPrototypeOf(SpiderifierElement.prototype), "componentDidMount", this).call(this);

      if (this._animationEnabled()) {
        _.delay(function () {
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

      return _objectSpread({}, style, {
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
      return classnames("spidered-marker", className, animateClass, {
        top: y <= 0,
        bottom: y > 0
      });
    }
  }, {
    key: "getContent",
    value: function getContent(props) {
      var shouldRenderLeg = props.shouldRenderLeg;
      return React.createElement("div", null, React.createElement("div", {
        className: "icon-div"
      }, this._getDecorateChildren(props)), shouldRenderLeg && React.createElement("div", {
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
      return React.Children.map(children, function (child) {
        if (isReactComponent(child)) {
          return React.cloneElement(child, {
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
      return _objectSpread({}, legStyles, {
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
}(MarkerLayer);

SpiderifierElement.displayName = "SpiderifierElement";
SpiderifierElement.propTypes = _objectSpread({}, MarkerLayer.propTypes, {
  angle: PropTypes.number,
  animate: PropTypes.bool,
  legLength: PropTypes.number,
  legStyles: PropTypes.object,
  index: PropTypes.number,
  shouldRenderLeg: PropTypes.bool,
  transitionDelay: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
});
SpiderifierElement.defaultProps = {
  animate: true,
  transitionDelay: 200
};
export default SpiderifierElement;