import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin,FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';

const Card = ({ data }) => {
  const {_id,
    companyName,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    employmentType,
    postingDate,
    description,
    jobTitle,
  } = data;
  return (
    <section className="card">
      <Link to={`/job/${_id}`} className="flex gap-4 flex-col  sm:flex-row items-start">
        <img src={companyLogo} alt="" className="h-20"/>
        <div>
          <h1 className="text-primary mb-1">{companyName}</h1>
          <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>
          <div className="flex gap-2 text-primary/70 text-base flex-wrap mb-2">
            <span className="flex items-center gap-2"><FiMapPin/> {jobLocation}</span>
            <span className="flex items-center gap-2"><FiClock /> {employmentType}</span>
            <span className="flex items-center gap-2"><FiDollarSign/> {minPrice}-{maxPrice}k</span>
            <span className="flex items-center gap-2"><FiCalendar/> {postingDate}</span>
          </div>
          <p className="text-base text-primary/70">{description}</p>
        </div>
      </Link>
    </section>
  );
};

export default Card;

/*
// <Link>: This is a component provided by React Router for creating hyperlinks to different routes within your application. It prevents the default behavior of an anchor (<a>) tag and allows client-side navigation without a full page reload.
// to={/job/${_id}}': This sets the destination URL for the hyperlink. It uses template literals (${}) to include the _id of the job dynamically in the URL. So, when you click on this link, it will navigate to a route like /job/6568ccd388d5d6b135c8ade8, where 6568ccd388d5d6b135c8ade8is the _id of the job.
// className="flex gap-4 flex-col sm:flex-row items-start": This sets the CSS classes for styling the hyperlink. It applies Flexbox layout properties to arrange the child elements horizontally on small screens (sm:flex-row) and vertically on larger screens (flex-col). gap-4 adds a gap of 1rem between the child elements, and items-start aligns the child elements at the start of the flex container.
// Overall, this line of code creates a hyperlink that, when clicked, navigates to the job details page corresponding to the _id of the job, with specific styling applied to the layout of the elements within the link.


// In your current implementation, clicking anywhere within the <Link> component, including the image, will navigate to the specified URL. The entire area covered by the <Link> (which wraps around the image and the div containing text) is clickable and will trigger navigation.
// If you want only the image to be clickable and navigate to the link, you need to move the <Link> component inside the image tag

//const Card = ({ data }) => {: Defines a functional React component named Card that takes data as a prop.

//  const {
//   _id,
//   companyName,
//   companyLogo,
//   minPrice,
//   maxPrice,
//   salaryType,
//   jobLocation,
//   employmentType,
//   postingDate,
//   description,
//   jobTitle,
// } = data;


//Destructures the data object to extract specific properties for easier access within the component.

//<Link to={/job/${_id}} ... >: Uses the Link component to create a navigable link to a job detail page using the job's _id.


In this context, you are using destructuring to assign values from a data object to local variables.
data is an object, and you are creating local variables (_id, companyName, etc.) and assigning them the corresponding values from data.
The = data part is essential here because it specifies the object from which the properties are being extracted.

The = data part indicates which object you are destructuring. Without specifying the object (data), JavaScript wouldn’t know where to get the values from.



handleChange function(Event Object) :=>
The e in the handleChange function is an event object that is automatically passed to event handler functions in JavaScript when an event is triggered. In this case, handleChange is likely used as an event handler for a form element like a <select> dropdown or an <input> field. Here’s a detailed explanation of what the event object (e) is and what it contains:

Event Object (e)
When a user interacts with a webpage (e.g., by clicking a button, typing in an input field, or selecting an option from a dropdown), the browser generates an event object that contains information about the interaction. This event object is then passed to the event handler function as an argument.

Structure of the Event Object
The event object contains a variety of properties and methods that provide information about the event and allow you to manipulate it. Some key properties and methods include:

type: The type of the event (e.g., "click", "change", "input").
target: A reference to the element that triggered the event. This is often the most important property when handling form input events.



Example in the Context of handleChange:
e: The event object automatically passed by the browser when the change event is triggered.
e.target: The element that triggered the event. If this handler is attached to a <select> element, e.target will refer to that <select> element.
e.target.value: The current value of the form element that triggered the event. For a <select> element, this is the value of the selected option.


Event Generation: The browser is responsible for generating the event object whenever an event occurs. This object is standard across all browsers and follows the DOM Event interface specification.
React's Role:
Synthetic Events: In React, events are wrapped in something called a "SyntheticEvent". This is a cross-browser wrapper around the browser’s native event. The SyntheticEvent object has the same interface as the native event, including the properties and methods, ensuring that the events work consistently across all browsers.


Flow of Event Handling
Rendering Home Component:

The Home component renders the Location component.
The handleChange function from Home is passed as a prop to Location.
Rendering Location Component:

The Location component receives handleChange as a prop and assigns it to the onChange event handlers of various radio buttons and the InputField components.
Here, each radio button and InputField have onChange={handleChange}.
Event Triggered in Location:

When a user interacts with any of the radio buttons or InputField components in Location, the onChange event is triggered.
This event calls the handleChange function passed down from Home.
Handling Event in Home:

The handleChange function in Home receives the event object e from the interaction in Location.
Inside handleChange, setSelectedCategory(e.target.value) is called, which updates the selectedCategory state in Home based on the value of the selected radio button or input field.
Example Flow:
User Action: A user selects the "London" radio button in the Location component.
Event Trigger: The onChange event for that radio button is triggered.
Event Handler Execution:
The handleChange function in Home is called with the event object e.
Inside handleChange, e.target.value is "london".
setSelectedCategory(e.target.value) updates the selectedCategory state in Home to "london".

Summary:
The handleChange function defined in Home is passed as a prop to the Location component.
When an event (e.g., onChange) is triggered in Location, the handleChange function from Home is invoked with the event object.
The event object provides information about the interaction, such as the value of the selected radio button.
handleChange updates the state in Home based on the event, allowing Home to react to changes made in Location.




*/
