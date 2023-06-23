import React, { useContext } from 'react';
import Dropdown from './dropdown.js';
import './settings.css';
import SettingsContext from '../Settings/settingscontext';



export default function Settings(props) { 

  let dropdownaxis = [];
  let dropdownCountry = [];
  let dropdownProgLanguage = [];
  let dropdownHeatmap = [];
  var infoSettings = useContext(SettingsContext);
  
  const data = props.data

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
        infoSettings.setProgrammingLanguage(event.target.value);
      };
  
      const handleDropdownHeatmap = (event) => {
        infoSettings.setHeatmap(event.target.value);
      };

      const handleDropdownCountry = (event) => {
        infoSettings.setCountry(event.target.value);
        console.log(infoSettings.country)
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
          <select id='select' value={infoSettings.country} onChange={handleDropdownCountry}>
            {dropdownCountry.map((option) => (
                <option key={option.id} value={option.value}>{option.id}</option>
              ))}
          </select>
          </div>
  
          <div className='Dropdown'>
          <label>{'Choosen Programming Language'}: </label>
            <select id='select' value={infoSettings.country} onChange={handleDropdownProgLang} >
              {dropdownProgLanguage.map((option) => (
                <option key={option.id} value={option.value}>{option.id}</option>
              ))}
            </select>
          </div>
  
          <div className='Dropdown'>
          <label>{'Choosen Heatmap Visualisation'}: </label>
            <select id='select' value={infoSettings.heatmap} onChange={handleDropdownHeatmap} >
              {dropdownHeatmap.map((option) => (
                <option key={option.id} value={option.value}>{option.id}</option>
              ))}
            </select>
          </div>
  
  
          <label> {'Choose Income: '} </label>
            <div>
              <input id='income' type="range" min='0' max='150000' step='100' value={infoSettings.income} onChange={handleIncomeInput} />
              <output id='incomelable'>{infoSettings.income} $</output>
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

