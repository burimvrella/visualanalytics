import React, { useContext, useState } from 'react';
import Slider from 'react-slider';
import './settings.css';
import SettingsContext from '../Settings/settingscontext';

/*
Description:
  Handles all the settings component and user Inputs
Params:
  props -> variables given from App.js includes the data variable
*/
export default function Settings(props) { 

  let dropdownaxis = [];
  let dropdownCountry = [];
  let dropdownProgLanguage = [];
  let dropdownHeatmap = [{ id: 'EdLevel per Country', value: 'EdLevelCountry' },{ id: 'Yearly Compenstation per Country', value: 'CompYearCountry' },{ id: 'Numbers of Programmers per Country', value: 'NumProgCountry' }];
  const data = props.data
  var incomeyearly = []
  let min = 0
  let max = 2000000

  var timeout;

  var infoSettings = useContext(SettingsContext);
  const [incomes, setIncomes] = useState([min,max]);
  

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
 

      //Handler function that set states to use in other react components
      const handleDropdownProgLang = (event) => {
        infoSettings.setProgrammingLanguage(event.target.value);
      };
  
      const handleDropdownHeatmap = (event) => {
        infoSettings.setHeatmap(event.target.value);
      };

      const handleDropdownCountry = (event) => {
        infoSettings.setCountry(event.target.value.replace(/\./g, ''));
      };
      
      const handleDropdownXaxis = (event) => {
        infoSettings.setxAxis(event.target.value);
      };

      const handleDropdownYaxis = (event) => {
        infoSettings.setyAxis(event.target.value);
      };

      const handleDropdownScatterplotCountry = (event) => {
        console.log(event.target.value)
        infoSettings.setScatterplotCountry(event.target.value);
        var xAxis = document.getElementById("xaxis")
        var yAxis = document.getElementById("yaxis")
        if(event.target.value !== "")
        {
          xAxis.hidden = false
          yAxis.hidden = false
        }
      };

      function handleIncome(value) {
        setIncomes([value[0],value[1]])
      };

      function handleIncomeOnCommitted(value) {
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
      console.log('change');
      infoSettings.setIncome([value[0],value[1]]); 
    }, 1000);};
    

    //Initalisation of the Dropdown options
      data.forEach(row => {
        countrys.push(row.Country)
        incomeYearly.push(row.CompYearEur)
      })
      
      countrys = [...new Set(countrys)]
      
      countrys.forEach(lable => {
        dropdownCountry.push({ id: lable, value: lable })   
      });

      columns.forEach(lable => {
        if (!lable.includes("#")) {
          if(lable === 'Country')
          {
            dropdownaxis.push({ id: 'ID', value: 'ID' })
          }
          else{
            dropdownaxis.push({ id: lable, value: lable })
          }  
        } else {
          dropdownProgLanguage.push({ id: lable, value: lable })
        }
      });

      //Returning the Settings HTML code
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

            <div className='Dropdown'>
                <label>Select Country for Axis:  </label><br/>
                <select id='select' value={infoSettings.scatterplotCountry} onChange={handleDropdownScatterplotCountry}>
                  {dropdownCountry.map((option) => (
                      <option key={option.id} value={option.value}>{option.id}</option>
                    ))}
                </select>
              </div>

              <div className='Dropdown' id="xaxis" hidden>
              <label>{'Choose Scatterplot X-Axis'}: </label><br/>
                <select className="xaxis" id='select' value={infoSettings.xAxis} onChange={handleDropdownXaxis} >
                  {dropdownaxis.map((option) => (
                    <option key={option.id} value={option.value}>{option.id}</option>
                  ))}
                </select>
              </div>

              <div className='Dropdown' id="yaxis" hidden>
              <label>{'Choose Scatterplot Y-Axis'}: </label><br/>
                <select className="yaxis" id='select' value={infoSettings.yAxis} onChange={handleDropdownYaxis} >
                  {dropdownaxis.map((option) => (
                    <option key={option.id} value={option.value}>{option.id}</option>
                  ))}
                </select>
              </div>

          </div>
    
        </div>
      )
    }
}


