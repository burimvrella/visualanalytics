import React, {useState} from 'react'

export default function Dropdown(props) {
  console.log(props)
  const [value, setValue] = useState(' ');
 
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className='Dropdown'>
        <label>{props.lable}: </label>
          <select value={value} onChange={handleChange}>
            {props.data.map((option) => (
              <option key={option.id} value={option.value}>{option.id}</option>
            ))}
          </select>
          <p>Choosen {props.lable} {value}!</p>
      </div>
  )
}
