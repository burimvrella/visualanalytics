import React from 'react';
import Dropdown from './dropdown.js';
import './settings.css';

export default function Settings(props) {

  const expierence = [
    { id: 'Trainee', value: 'Trainee developer' },
    { id: 'Junior', value: 'Junior developer' },
    { id: 'Mid-level', value: 'Mid-level developer' },
    { id: 'Senior', value: 'Senior developer' },
  ];

  const gender = [
    { id: 'man', value: 'Male' },
    { id: 'woman', value: 'Female' },
  ];
 
  return (
    <div className='Settings'>

      <h1>Select Settings</h1>
      <Dropdown data={expierence} lable={'Expierence Level'} />
      <Dropdown data={gender} lable={'Gender'} />
    </div>
  )
}

