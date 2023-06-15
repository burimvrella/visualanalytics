import React, {useState} from 'react';
import './App.css';
import Settings from './Components/Settings/settings.js';
import Worldmap from './Components/Worldmap/worldmap.js';
import Treemap from './Components/Treemap/treemap.js';
import Scatter from './Components/Scatterplot/scatterplot.js';
import {useData} from './Components/Worldmap/useData.js';
import  {LoadTreeMapData} from './Components/Treemap/LoadTreeMapData.js';
import SettingsContext from './Components/Settings/settingscontext';
import * as d3 from 'd3';

function App() {
  const [data, setData] = useState([]);

  React.useEffect(() => {

    d3.csv("./data/surveydata.csv").then((d) => {
      console.log(d)
      setData(d);
    });
    return () => undefined;
  }, []);

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
