import React, { useState, useEffect } from 'react';
import Dropdown from './dropdown.js';
import './settings.css';


export default function Settings(props) { 
  let dropdownaxis = [];
  let dropdownCountry = [];
  let dropdownProgLanguage = [];
  let dropdownHeatmap = [];
  

  const [xAxis, setxAxis] = useState("");
  const [yAxis, setyAxis] = useState("");

  const [incomefrom, setIncomeFrom] = useState(0);
  const [incometo, setIncometo] = useState(0);

  const [country, setCountry] = useState("")
  const [programmingLanguage, setProgrammingLanguage] = useState("")
  const [heatmap, setHeatmap] = useState("")

  const data = props.data


  if (!data) {
    return (<pre>Loading...</pre>)
  }
  else{

    const handleIncomeInput = (input) => {
      
      const regex = /^[0-9\b]+$/;
      if ((input.target.value === "" || regex.test(input.target.value)) && (input.target.value < 100)) {
      //TODO 
      }
    }; 

    console.log(data)
    console.log(data.columns)
    /*(data.columns).forEach(column => {
      dropdownaxis.push({ id: column, value: column })   
    });*/

    return (
      <div className='Settings'>
        <h1>Select Settings</h1>
        
        <div><Dropdown data={dropdownCountry} lable={'Choosen Country: '} onChange={" "}/></div>
        <div><Dropdown data={dropdownProgLanguage} lable={'Choosen Programming Language: '} onChange={" "}/></div>
        <div><Dropdown data={dropdownHeatmap} lable={'Choosen Heatmap Visualisation: '} onChange={" "}/></div>

        <label> {'Choose Income: '} </label>
          <div>
            <input id='income' type="range" min='0' max='150000' step='100' value={incomefrom} onChange={handleIncomeInput} />
            <output id='incomelable'>{incomefrom} $</output>
          </div>
  
        <div className='scattersettings'>
        <h2>Scatterplot Settings</h2>
        <Dropdown data={dropdownaxis} lable={'Choose X-Axes'} />
        <Dropdown data={dropdownaxis} lable={'Choose Y-Axes'} />
        </div>
  
      </div>
    )
  }
}

