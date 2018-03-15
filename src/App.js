import React, { Component } from 'react';
import { ReactMapboxGlSpiderifier } from './node_modules';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactMapboxGlSpiderifier />
      </div>
    );
  }
}

export default App;
