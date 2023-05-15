import React from 'react';
import './App.css';
import Settings from './Components/Settings/settings.js';
import Worldmap from './Components/Worldmap/worldmap.js';
import Treemap from './Components/Treemap/treemap.js';
import Scatter from './Components/Scatterplot/scatterplot.js';

const data = [
  {
    x: 2,
    y: 4
  },
  {
    x: 8,
    y: 5
  }
]

function App() {
  return (
    <div className="App">
      <Settings />
      <Worldmap />
      <Treemap />
      <Scatter data={data} />
      </div>
  );
}

export default App;
