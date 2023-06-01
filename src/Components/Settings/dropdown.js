import React, {useState} from 'react'
import './dropdown.css'

export default function Dropdown(props) {
  const [value, setValue] = useState(' ');
 
  const handleDropdown = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className='Dropdown'>
        <label>{props.lable}: </label>
          <select id='select' value={value} onChange={handleDropdown}>
            {props.data.map((option) => (
              <option key={option.id} value={option.value}>{option.id}</option>
            ))}
          </select>
      </div>
  )
}
