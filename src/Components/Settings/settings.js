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

  const [country, setCountry] = useState("United Kingdome");
  const [programmingLanguage, setProgrammingLanguage] = useState("")
  const [heatmap, setHeatmap] = useState("")
  
  const data = props.data


  useEffect(() => {
    setCountry(country);
  }, [country]);

  if (data.length === 0) {
    return (
    <div className='Settings'>
      <h1>Select Settings</h1>
       <pre>Loading...</pre>
       </div>
       )
  }
  else{

    const handleIncomeInput = (input) => {
      const regex = /^[0-9\b]+$/;
      if ((input.target.value === "" || regex.test(input.target.value)) && (input.target.value < 100)) {
      //TODO 
      }
    }; 
 
    const handleDropdownProgLang = (event) => {
      setProgrammingLanguage(event.target.value);
    };

    const handleDropdownHeatmap = (event) => {
      setHeatmap(event.target.value);
    };
 
    let columns = data.columns
    let countrys = []

    data.forEach(row => {
      countrys.push(row.Country)
    })

    countrys = [...new Set(countrys)]
    
    countrys.forEach(lable => {
      dropdownCountry.push({ id: lable, value: lable })   
    });
  

    columns.forEach(lable => {
      dropdownaxis.push({ id: lable, value: lable })   
    });

    return (
      <div className='Settings'>
        <h1>Select Settings</h1>

        <div className='Dropdown'>
        <label>{'Choosen Country'}: </label>
        <select id='select' onChange={e  => {
          console.log(country)
          setCountry(e.currentTarget.value)}}>
          {dropdownCountry.map((option) => (
              <option key={option.id} value={option.value}>{option.id}</option>
            ))}
        </select>
        </div>

        <div className='Dropdown'>
        <label>{'Choosen Programming Language'}: </label>
          <select id='select' value={country} onChange={handleDropdownProgLang} >
            {dropdownProgLanguage.map((option) => (
              <option key={option.id} value={option.value}>{option.id}</option>
            ))}
          </select>
        </div>

        <div className='Dropdown'>
        <label>{'Choosen Heatmap Visualisation'}: </label>
          <select id='select' value={heatmap} onChange={handleDropdownHeatmap} >
            {dropdownHeatmap.map((option) => (
              <option key={option.id} value={option.value}>{option.id}</option>
            ))}
          </select>
        </div>


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

