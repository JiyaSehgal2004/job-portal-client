import React from 'react'
import {FiMapPin, FiSearch} from "react-icons/fi"

const Banner = ({query, handleInputChange}) => {
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14'>
        <h1 className='text-5xl font-bold text-primary mb-3'>Find your <span className='text-blue'>new job</span> today</h1>
        <p className='text-lg text-black/70 mb-8'>Thousands of jobs in the computer, engineering and technology sectors are waiting for you.</p>

        <form>
            <div className='flex justify-start md:flex-row flex-col md:gap-0 gap-4'>
                <div className='flex md:round-s-md rounded shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full'>
                    <input type="text" id="title" placeholder='What position are you looking for ?' className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6' onChange={handleInputChange} value={query}/>
                    <FiSearch className='absolute mt-2.5 ml-2 text-gray-400'/>
                </div>
                <div className='flex md:round-s-nones rounded shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full'>
                    <input type="text" id="title" placeholder='Location' className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6'/>
                    <FiMapPin className='absolute mt-2.5 ml-2 text-gray-400'/>
                </div>
                <button type='submit' className='bg-blue py-2 px-8 text-white md:rounded-s-none rounded'>Search</button>
            </div>
        </form>
    </div>
  )
}

export default Banner


/*
Setting a value attribute isn't necessary, but it's usually a good idea. Putting a value attribute makes the input controlled, which means that the value in the input will always exactly correspond to what's in the React state, which will make the program's logic easier to reason about.

With a controlled input, if you ever need to set the value to something other than what the user has typed in, you just need to call setName with the value to set, and the input will receive that new custom value.

If you use an uncontrolled component (one without a value), you'll probably want to use a ref to get the value (since having name / setName as stateful doesn't really provide a benefit anymore).
*/

/*
event.target.value and the value attribut in input are same??

ChatGPT
No, event.target.value and the value attribute in the input element are not the same, but they are related.
event.target.value: When you handle an input event in JavaScript (e.g., in a React event handler), event.target refers to the DOM element that triggered the event, and .value retrieves the current value of that element. So, event.target.value gives you the current value of the input field at the time the event occurred.
value attribute in the input element: In HTML, the value attribute sets the initial value of the input field when it's rendered. In React, if you use the value attribute on an input element, you're creating a controlled component where the input's value is controlled by React state. This means that the input's value will always reflect the value specified in React state, 
regardless of user input (unless explicitly changed by updating the state).
So, while they are related in the sense that they both deal with the value of the input field, they serve different purposes. event.target.value retrieves the current value of the input field when an event occurs, while the value attribute in the input element sets the initial value and maintains the controlled state of the input field in a React component.
*/