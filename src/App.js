import React, { Component } from 'react';
import ReactMapboxGl from "react-mapbox-gl";
import { ReactMapboxGlSpiderifier } from './node_modules';
import './App.css';

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_GL_TOKEN
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map style="mapbox://styles/mapbox/streets-v8">
          <ReactMapboxGlSpiderifier />
        </Map>
      </div>
    );
  }
}

export default App;
