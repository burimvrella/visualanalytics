import React, { useState } from 'react';
import './settings.css';

export default function Settings(props) {

  const options = [

    { id: 'Trainee', value: 'Trainee developer' },
 
    { id: 'Junior', value: 'Junior developer' },
 
    { id: 'Mid-level', value: 'Mid-level developer' },

    { id: 'Senior', value: 'Senior developer' },
    
  ];
 
  const [value, setValue] = useState(' ');
 
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className='Settings'>

      <h1>Select Settings</h1>

      <div className='Dropdown'>
        <label>Choose your expierence</label>
          <select value={value} onChange={handleChange}>
            {options.map((option) => (
              <option key={option.id} value={option.value}>{option.id}</option>
            ))}
          </select>
      </div>
          <p>Your expierence is {value}!</p>

    </div>
  )
}

