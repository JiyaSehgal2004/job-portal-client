import React from 'react'
import Button from './Button';
import InputField from './../components/InputField';

const Salary = ({handleClick, handleChange}) => {
  return (
    <div>
        <h4 className='text-lg font-medium mb-2'>Salary</h4>
        <div className='mb-4'>
          <Button onClickHandler={handleClick} value="Hourly" title="Hourly" />
          <Button onClickHandler={handleClick} value="Monthly" title="Monthly" />
          <Button onClickHandler={handleClick} value="Yearly" title="Yearly" />
        </div>

        <div>
        <label className='sidebar-label-container'>
                <input type="radio" name="test" id="test" value="" onChange={handleChange}
                />
                <span className='checkmark'></span>All
            </label>

            <InputField handleChange={handleChange} value={30} title="< 30000k" name="test2"/>
            <InputField handleChange={handleChange} value={50} title="< 50000k" name="test2"/>
            <InputField handleChange={handleChange} value={80} title="< 80000k" name="test2"/>
            <InputField handleChange={handleChange} value={100} title="< 100000k" name="test2"/>
        </div>
    </div>
  )
}

export default Salary


/*
In the provided Salary component, there are two sections: one for selecting salary frequency (Hourly, Monthly, Yearly) and another for selecting salary range (e.g., < 30000k, < 50000k).

Let's break down the component:

Imports:

React: Required for defining React components.
Button and InputField: Components imported for rendering buttons and input fields.
Props:

handleClick: Function passed as a prop to handle click events. It's expected to update the state based on the selected salary frequency.
handleChange: Function passed as a prop to handle change events. It's expected to update the state based on the selected salary range.
Rendering:

The return statement renders JSX elements representing the salary filters.
There are two sections:
Salary Frequency:
Three buttons are rendered for selecting the salary frequency (Hourly, Monthly, Yearly). Each button triggers the handleClick function when clicked.
Salary Range:
Four input fields are rendered for selecting the salary range. Each input field represents a salary range (e.g., < 30000k). 
The value prop represents the percentage of the salary range (30%, 50%, 80%, 100%). These input fields trigger the handleChange function when their value changes.
*/