import React, { useState } from 'react';
import Dropdown from './dropdown.js';
import './settings.css';

export default function Settings(props) { 

  const [age, setAge] = useState("");
  const [income, setIncome] = useState(1);

  const expierence = [
    { id: 'Trainee', value: 'Trainee developer' },
    { id: 'Junior', value: 'Junior developer' },
    { id: 'Mid-level', value: 'Mid-level developer' },
    { id: 'Senior', value: 'Senior developer' },
  ];

  const gender = [
    { id: 'Male', value: 'Male' },
    { id: 'Female', value: 'Female' },
  ];

  const country = [
    { id: 'Austria', value: 'Austria' },
    { id: 'Cape Verde', value: 'Cape Verde' },
    { id: 'Germany', value: 'Germany' },
  ];

  const Axis = [
    { id: 'Income', value: 'Income' },
    { id: 'Country', value: 'Country' },
  ];


  const handleNummericInput = (e) => {
    const regex = /^[0-9\b]+$/;
    if ((e.target.value === "" || regex.test(e.target.value)) && (e.target.value < 100)) {
      setAge(e.target.value);
    }
  };

  const handleIncomeInput = (e) => {
    setIncome(e.target.value);
  };
 
  return (
    <div className='Settings'>
      <h1>Select Settings</h1>

      <div className='gensettings'>
      <h2>General Settings</h2>
      <Dropdown data={expierence} lable={'Expierence Level'} />
      <Dropdown data={gender} lable={'Choose Gender'} />
      <label> {'Enter you age: '}
        <input id='age' type="text" value={age} onChange={handleNummericInput} />
      </label>
      </div>

      <div className='wordsettings'>
      <h2>Worldmap Settings</h2>
        <label> {'Choose Income: '} </label>
        <div>
          <input id='income' type="range" min='0' max='150000' step='100' value={income} onChange={handleIncomeInput} />
          <output id='incomelable'>{income} $</output>
        </div>
      </div>

      <div className='treesettings'>
      <h2>Treemap Settings</h2>
      <Dropdown data={country} lable={'Choosen Country'} />
      </div>

      <div className='scattersettings'>
      <h2>Scatterplot Settings</h2>
      <Dropdown data={Axis} lable={'Choose X-Axes'} />
      <Dropdown data={Axis} lable={'Choose Y-Axes'} />
      </div>

    </div>
  )
}

