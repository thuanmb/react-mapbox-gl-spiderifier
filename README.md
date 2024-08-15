# react-mapboxgl-spiderifier

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/thuanmb/react-mapbox-gl-spiderifier/blob/master/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/react-mapbox-gl-spiderifier.svg)](https://www.npmjs.com/package/react-mapbox-gl-spiderifier)

Rendering the spiderifier into `react-mapbox-gl` as `React` component.

Spiral/Circle positioning logic taken from and credits goes to https://github.com/jawj/OverlappingMarkerSpiderfier.

## Examples:

- https://github.com/thuanmb/react-mapbox-gl-spiderifier/blob/master/src/App.js

![Demo Spiderifier.](./demo/demo.gif)

## Usage:

#### Simple spiderfication

Please note that the `ReactMapboxGlSpiderifier` should be used together with the `React` wrapper of `mapbox-gl` e.g. `react-mapbox-gl`.
https://github.com/alex3165/react-mapbox-gl

```js
import ReactMapboxGl from 'react-mapbox-gl';
import { ReactMapboxGlSpiderifier } from 'react-mapbox-gl-spiderifier';

const Map = ReactMapboxGl({
  accessToken: '...',
});

const mapProps = {
  style: 'mapbox://styles/mapbox/streets-v8',
};

class App extends Component {
  onStyleLoad = (map) => {
    this.map = map;
  };

  renderPopup(properties, coordinates, offset) {
    if (this.currentPopup) {
      this.currentPopup.remove();
    }

    setTimeout(() => {
      this.currentPopup = new MapboxGl.Popup({ offset })
        .setLngLat(coordinates)
        .setHTML(`Some description for node ${properties.value}`)
        .addTo(this.map);
    });
  }

  renderSpiderifierContent(key, value) {
    return (
      <div className="spiderifier-marker-content" key={key} properties={{ value }}>
        <div>{value}</div>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <Map {...mapProps} onStyleLoad={this.onStyleLoad}>
          <ReactMapboxGlSpiderifier
            coordinates={[-0.2268, 51.5361]}
            onClick={(properties, coords, offset) => this.renderPopup(properties, coords, offset)}
           >
            {[100, 200, 300, 400, 500].((n, index) => this.renderSpiderifierContent(index, n))}
          </ReactMapboxGlSpiderifier>
        </Map>
      </div>
    );
  }
}
```

## Documentation

#### Properties

- `coordinates ([number, number])`
  Display the Spiderifier at the given position

- `circleSpiralSwitchover (number)`
  Show spiral instead of circle from this marker count upwards, 0 -> always spiral; Infinity -> always circle

- `circleFootSeparation (number)`
  Related to circumference of circle

- `spiralFootSeparation (number)`
  Related to size of spiral

- `spiralLengthStart (number)`
  Related to size of spiral

- `spiralLengthFactor (number)`
  Related to size of spiral

- `animate (bool)`
  To enable animate the spiral

- `animationSpeed (number)`
  Animation speed in milliseconds

- `transformSpiderLeft (number)`
  The margin in left side of each spider

- `transformSpiderTop (number)`
  The margin in top of each spider

- `showingLegs (bool)`
  Indicate if the legs should be shown even when the spiderifier only have one spider element

#### Events

- `onClick (function)`
  The click event handler

- `onMouseDown (function)`
  The mouse down event handler

- `onMouseEnter (function)`
  The mouse enter event handler

- `onMouseLeave (function)`
  The mouse leave event handler

- `onMouseMove (function)`
  The mouse move event handler

- `onMouseOut (function)`
  The mouse out event handler

- `onMouseOver (function)`
  The mouse over event handler

- `onMouseUp (function)`
  The mouse up event handler

## ChangeLog:

### 1.12.0

- Bump dependencies version

### 1.11.1

- Bump dependencies version

### 1.11.0

- Bump dependencies version

### 1.10.0

- Bump dependencies version

### 1.9.0

- Bump dependencies version

### 1.6.0

- Refactoring

### 1.5.0

- Migrating the componentWill*

### 1.4.0

- Upgrading packages

### 1.3.0

- Upgrading packages

### 1.2.0

- Upgrading packages

### 1.1.0

- Upgrading packages

### 1.0.2

- Fix bundling issue

### 1.0.1

- Upgrading the depedencies version.

### 0.2.0 [BREAKING CHANGES]

- Upgrade all packages to latest version. These packages include: `react`, `mapbox-gl`, `react-mapbox-gl`,...

## Development

### Starting the server in local
- Adding the `.env` file
- Adding the key `REACT_APP_MAPBOX_GL_TOKEN` into the `.env` file
- Starting the server by: `yarn start`

## Upgrading dependencies checklist
- Pull the latest code
- Create a new branch
- Upgrading the dependencies
```
yarn upgrade-interactive --latest
```
- Test if the app works after upgrading: `yarn start`
- Build the package: `yarn build`
- Increasing the package version in the `package.json`
- Adding the release note in the `README`
- Push the change into Github
- Publish the package into npmjs: `npm publish`
