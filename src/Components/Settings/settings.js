import React, { useContext, useState } from 'react';
import Dropdown from './dropdown.js';
import Slider from 'react-slider';
import './settings.css';
import SettingsContext from '../Settings/settingscontext';



export default function Settings(props) { 

  let dropdownaxis = [];
  let dropdownCountry = [];
  let dropdownProgLanguage = [];
  let dropdownHeatmap = [{ id: 'EdLevel per Country', value: 'EdLevelCountry' },{ id: 'Yearly Compenstation per Country', value: 'CompYearCountry' },{ id: 'Numbers of Programmers per Country', value: 'NumProgCountry' }];
  let min = 0
  let max = 2500
  var timeout;

  var infoSettings = useContext(SettingsContext);
  const [incomes, setIncomes] = useState([min,max]);
  
  
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
      
      let columns = data.columns
      let countrys = []
      let incomeYearly = []
 
   
      const handleDropdownProgLang = (event) => {
        infoSettings.setProgrammingLanguage(event.target.value);
      };
  
      const handleDropdownHeatmap = (event) => {
        infoSettings.setHeatmap(event.target.value);
      };

      const handleDropdownCountry = (event) => {
        infoSettings.setCountry(event.target.value);
      };
      
      function handleIncome(value) {
        setIncomes([value[0],value[1]])
      };

      function handleIncomeOnCommitted(value) {
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
      console.log('change');
      infoSettings.setIncome([value[0],value[1]]); 
    }, 5000);};


      data.forEach(row => {
        countrys.push(row.Country)
        incomeYearly.push(row.CompYearEur)
      })

      //max = Math.max(...incomeYearly)
      //min = Math.min(...incomeYearly)
      
      countrys = [...new Set(countrys)]
      
      countrys.forEach(lable => {
        dropdownCountry.push({ id: lable, value: lable })   
      });

      columns.forEach(lable => {
        if (!lable.includes("#")) {
          dropdownaxis.push({ id: lable, value: lable })   
        } else {
          dropdownProgLanguage.push({ id: lable, value: lable })
        }
      });
  
      return (
        <div className='Settings'>

          <h1>Select Settings</h1>

          <div className='Dropdown'>
          <label>{'Choosen Country'}:  </label><br/>
          <select id='select' value={infoSettings.country} onChange={handleDropdownCountry}>
            {dropdownCountry.map((option) => (
                <option key={option.id} value={option.value}>{option.id}</option>
              ))}
          </select>
          </div>
  
          <div className='Dropdown'>
          <label>{'Choosen Programming Language'}: </label><br/>
            <select id='select' value={infoSettings.programmingLanguage} onChange={handleDropdownProgLang} >
              {dropdownProgLanguage.map((option) => (
                <option key={option.id} value={option.value}>{option.id}</option>
              ))}
            </select>
          </div>
  
          <div className='Dropdown'>
          <label>{'Choosen Heatmap Visualisation'}: </label><br/>
            <select id='select' value={infoSettings.heatmap} onChange={handleDropdownHeatmap} >
              {dropdownHeatmap.map((option) => (
                <option key={option.id} value={option.value}>{option.id}</option>
              ))}
            </select>
          </div>
  
  
          <label> {'Choose Yearly Income: '} </label>
            <Slider className='slider' 
              onChange={(e) => {
                handleIncome(e)
                handleIncomeOnCommitted(e)
              }}
              value={incomes}
              min={min}
              max={max}
            />
          <div className='values'>{incomes[0]}€ - {incomes[1]}€</div>  
          <small>Current Range: {incomes[1] - incomes[0]}€</small>

          <div className='scattersettings'>
          <h2>Scatterplot Settings</h2>
          <Dropdown data={dropdownaxis} lable={'Choose X-Axes'} />
          <Dropdown data={dropdownaxis} lable={'Choose Y-Axes'} />
          </div>
    
        </div>
      )
    }
}


