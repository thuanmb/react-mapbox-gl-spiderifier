import React, { Component } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import _ from 'lodash';
import { ReactMapboxGlSpiderifier } from './node_modules';
import './App.css';

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_GL_TOKEN
});

const mapProps = {
  style: 'mapbox://styles/mapbox/streets-v8',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getRandomData(),
    };
  }

  componentDidMount() {
    setInterval(
      () => this.setState({ data: this.getRandomData() }),
      3000
    );
  }

  getRandomData() {
    const n = this.randomNumber(5, 30);
    console.log(`Rendering new spiral with ${n} elements`);
    return _.times(n, (index) => this.randomNumber(100, 10000));
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  renderSpiderifierContent(key, text) {
    return (
      <div className="spiderifier-marker-content" key={key}>
        <div>{text}</div>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <Map {...mapProps}>
          <ReactMapboxGlSpiderifier coordinates={[-0.2268, 51.5361]}>
            {this.state.data.map((n, index) => this.renderSpiderifierContent(index, n))}
          </ReactMapboxGlSpiderifier>
        </Map>
      </div>
    );
  }
}

export default App;
