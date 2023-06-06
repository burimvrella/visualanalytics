import React, {useState} from 'react';
import './App.css';
import Settings from './Components/Settings/settings.js';
import Worldmap from './Components/Worldmap/worldmap.js';
import Treemap from './Components/Treemap/treemap.js';
import Scatter from './Components/Scatterplot/scatterplot.js';
import {useData} from './Components/Worldmap/useData.js';
import  {LoadTreeMapData} from './Components/Treemap/LoadTreeMapData.js';
import SettingsContext from './Components/Settings/settingscontext';

function App() {
  const [data] = useState([[90, 20], [20, 100], [66, 44], [53, 80], [24, 182], [80, 72], [10, 76], [33, 150], [100, 15]]);
  const geoJson = useData();
  const treemapData = LoadTreeMapData();

  return (
    <div className="App">
      <Settings data={data}/>
      <Worldmap geoJson={geoJson}/>
      <Treemap data={treemapData}/>
      <Scatter data={data}/>
    </div>
  );
}

export default App;
