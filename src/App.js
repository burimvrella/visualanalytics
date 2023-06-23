import React, {useState, useEffect} from 'react';
import './App.css';
import Settings from './Components/Settings/settings.js';
import Worldmap from './Components/Worldmap/worldmap.js';
import Treemap from './Components/Treemap/treemap.js';
import Scatter from './Components/Scatterplot/scatterplot.js';
import {useData} from './Components/Worldmap/useData.js';
import SettingsContext from './Components/Settings/settingscontext';
import * as d3 from 'd3';
import surveydata from './data/surveydata_v5.csv';

function App() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState();
  const [xAxis, setxAxis] = useState("");
  const [yAxis, setyAxis] = useState("");

  const [income, setIncome] = useState([]);


  const [programmingLanguage, setProgrammingLanguage] = useState("")
  const [heatmap, setHeatmap] = useState("")

  useEffect(() => {
    d3.csv(surveydata).then(data => {
      setData(data)
    });
  }, []);


  const geoJson = useData();

  return (
    <div className="App">
      <SettingsContext.Provider value={{
        country,
        xAxis,
        yAxis,
        income,
        programmingLanguage,
        heatmap,
        setxAxis,
        setyAxis,
        setIncome,
        setProgrammingLanguage,
        setHeatmap,
        setCountry
        }}>

        <Settings data={data}/>
        <Worldmap geoJson={geoJson} data={data}/>
        <Treemap data={data}/>
        <Scatter data={data}/>

      </SettingsContext.Provider>
    </div>
  );
}

export default App;
