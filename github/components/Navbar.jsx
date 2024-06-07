import React, { useState } from "react";
import Logo from "/images/Logo.png";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import {signOut} from "firebase/auth"
import { auth } from '../firebase/firebase.config.js'
import {useDispatch} from 'react-redux'; 
import {setUser} from '../store/usersSlice'

// In summary, while both Link and NavLink are used for navigation, NavLink provides additional features for styling links based on their active state. 
// If you need simple navigation without any styling based on the current route, Link is sufficient. But if you want to apply styles to the active link, NavLink is the preferred choice.

const Navbar = () => {
  const dispatch =  useDispatch();
  function handleSignOut(){
    if(confirm('Are you sure you want to Log Out?')){
    signOut(auth).then(() => {
    dispatch(setUser(null));
      }).catch((error) => {
    console.log(error)
      });
    }
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post a Job" },
  ];
  
  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <img src={Logo} alt="logo" className="h-20" />
          <span>GetHired</span>
        </a>
        {/* Nav items for large devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
              {title}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Sign up and Log in Button */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {/* <Link to="/login" className="py-2 px-5 border rounded">
            Log in
          </Link>
          <Link
            to="/sign-up"
            className="py-2 px-5 border rounded bg-blue text-white"
          >
            Sign up
          </Link> */}
          <Link   
              onClick={(e) => { handleSignOut(e) }}
              className="active btn btn-block">
              LogOut
          </Link>
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* Navitems for mobile */}
      <div
        className={`px-4 bg-black py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        } lg:hidden`}
      >
        <ul className="">
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li className="text-white py-1">
            <Link to="/login" className="mr-5">
              Log in
            </Link>
            <Link
              to="/sign-up"
              className=""
            >
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;


/* 
wht is benefit of navlink if i can add classes in link
ChatGPT
The main benefits of NavLink over Link are related to its additional features for handling active states and styling based on the current route:

Active State Styling: NavLink provides a way to style the link differently when it matches the current route. This is helpful for indicating to users which page they are currently on. You can specify an activeClassName or activeStyle prop to apply specific styles to the active link.

Active State Condition: NavLink automatically applies the active state based on whether the link's to prop matches the current route. You don't have to handle this logic manually, as NavLink takes care of it for you.

Accessibility: NavLink supports accessibility by providing built-in active states. This ensures that users navigating your site using assistive technologies can easily identify which page they are currently on.

Convenience: While you can manually add classes to Link components for styling, using NavLink with its built-in active state handling can be more convenient and less error-prone, especially in larger applications where managing active states manually might become cumbersome.

Overall, while you can achieve similar functionality with both Link and NavLink, NavLink provides a more streamlined approach for handling active states and styling based on the current route, leading to cleaner and more maintainable code, especially in larger projects.
*/


/*
const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post a Job" },
  ];
An array navItems is defined containing objects representing navigation links with their respective paths and titles.
*/


/*
<li key={path} className="text-base text-primary"> why key used here
ChatGPT
The key attribute is used in React whenever you render a list of elements dynamically using the map() function, as in the provided code snippet.

Each child in a list should have a unique key prop. React uses these keys to efficiently update the DOM when the list changes. When a list is re-rendered, React compares the keys of the new elements with the keys of the existing elements. This allows React to determine which elements have been added, removed, or modified.

In the code snippet you provided, the key={path} attribute is set to the path property of each item in the navItems array. Presumably, the path property is unique for each navigation item. This ensures that each list item has a unique identifier, which helps React efficiently update the list when it changes.

It's important to note that the key prop is not passed down to the component as a prop; it's a special attribute used by React internally. So, in this case, the key prop is not accessible within the li component or any of its children. Its purpose is solely for React's internal reconciliation process.
*/


/*
In React, the key prop is a special attribute that plays a crucial role in the framework's internal reconciliation process, which is how React updates the DOM to match the current state of the component tree. Understanding the key prop requires a deep dive into how React handles rendering and updating components.

The Purpose of key
When you render a list of elements in React, each element needs a unique identifier, which is provided by the key prop. This helps React differentiate between elements and manage updates efficiently. For example, when mapping over an array to create a list of elements

Identity in Reconciliation: During the reconciliation process, React compares the virtual DOM (a lightweight copy of the actual DOM) with the previous version of the virtual DOM. The key prop helps React determine whether a particular element in the list has changed, been added, or removed. This is crucial for efficient updates:

If an element has the same key as before, React assumes it is the same element and reuses it.
If an element's key is new, React creates a new DOM node.
If an element's key is missing in the new list, React removes the corresponding DOM node.

Performance Optimization: By using key, React can minimize the number of DOM manipulations. Without key, React might re-render the entire list or incorrectly assume that elements have shifted positions, leading to inefficient updates.

Internal Mechanism:
Internally, React uses the key prop to build a map of elements. This map allows React to quickly locate and update elements without having to traverse the entire list:

Initial Render: When React first renders the list, it stores each element's key and associated DOM node.
Subsequent Renders: On subsequent renders, React uses the key to find the corresponding element in its internal data structure. This lookup process is much faster than comparing every property of every element.

Accessibility of key:
The key prop is used internally by React and is not passed down to the component as a prop. This means that within the component, you cannot access key via props
*/

/* 
In the context of isActive in the className attribute, it's expected to be a boolean property, not a function. This property is commonly provided by routing libraries such as React Router to indicate whether the NavLink corresponds to the currently active route.

Here's the corrected explanation:

jsx
Copy code
<NavLink
    to={path}
    className={({ isActive }) => (isActive ? "active" : "")}
>
className={({ isActive }) => (isActive ? "active" : "")}: This is an inline function used to conditionally assign the CSS class based on the value of the isActive boolean property.
In most routing libraries, isActive is a boolean property that indicates whether the NavLink corresponds to the currently active route. If the NavLink is active, isActive is true; otherwise, it's false.

So, in this context, isActive is expected to be a boolean property rather than a function. It's used to conditionally apply the "active" class to the NavLink when it corresponds to the active route.
*/


/*
NavLink Components: When you use NavLink components to create navigation links, React Router internally compares the to prop 
of each NavLink with the current URL. If there's a match, React Router applies the "active" class to that NavLink, indicating that it 
represents the current page or location within the application.
*/

/*
md:hidden 

Class:
Purpose: The md:hidden class applies the hidden utility at the md (medium) breakpoint and above.
Effect: This hides the element on medium and larger screens.
Breakpoints: In Tailwind CSS, the md breakpoint corresponds to a screen width of 768px and above.
Usage: It hides the element when the screen width is 768px or larger.
*/