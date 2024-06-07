import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux'; // Import Provider
import store from './store/store';
import Router from './Router/Router'; // Import Router component

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}> {/* Ensure Provider wraps around Router */}
          <Router />
        </Provider>
    </React.StrictMode>
);


/* import React from 'react'
This line imports the React library, which is the fundamental library for building user interfaces in React applications.
javascript
Copy code
import ReactDOM from 'react-dom/client'
This line imports the ReactDOM module from the 'react-dom/client' package. ReactDOM provides methods for rendering React components into the DOM (Document Object Model).
javascript
Copy code
import './index.css'
This line imports a CSS file named 'index.css'. It's likely used to apply styles to the elements of the React application.
javascript
Copy code
import { RouterProvider } from 'react-router-dom'
This line imports the RouterProvider component from the 'react-router-dom' package. RouterProvider is a component provided by React Router, a library used for handling routing in React applications.
javascript
Copy code
import router from './Router/Router.jsx'
This line imports a router object from the file './Router/Router.jsx'. This router object is likely configured with routing information for the application.
javascript
Copy code
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
This block of code is where the main rendering of the React application occurs.
ReactDOM.createRoot() is a method introduced in React 18 for creating a new root in the React tree. It takes an HTML element as an argument where the React application will be rendered.
document.getElementById('root') selects an HTML element with the id 'root', presumably defined in the HTML file where the React application is mounted.
.render() is a method that renders React elements into the DOM. Inside it, there's JSX code wrapped in <React.StrictMode>. <React.StrictMode> is a component used for identifying potential problems in the code by running additional checks and warnings.
<RouterProvider> is a component provided by React Router. It wraps around the entire application, providing routing functionality to its child components. It takes router as a prop, which presumably contains routing configuration.
So, this code renders the React application, ensuring it runs in strict mode and is provided with routing functionality using React Router.
*/


/* 
React application is mounted. explain in detail
ChatGPT
When we say a React application is "mounted," it refers to the process of attaching the React component tree to a specific HTML element in the DOM (Document Object Model). Let's break down this process in detail:

HTML file with a mount point: Typically, in a React application, there is an HTML file (often named index.html) that serves as the entry point. Inside this HTML file, there is a <div> element or any other suitable container element with an id attribute. This element serves as the mount point where the React application will be attached.

html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
    <!-- Other meta tags, stylesheets, or scripts may also be included here -->
</head>
<body>
    <div id="root"></div>
    <!-- This is the mount point for the React application -->
</body>
</html>
Entry point JavaScript file: In the JavaScript part of the React application, there is typically an entry point file (often named index.js or App.js) where the ReactDOM.render() function is called. This function attaches the React component tree to the mount point in the HTML file.

javascript
Copy code
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the root component of your application

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root') // Mount point in the HTML file
);
Here, ReactDOM.render() takes two arguments:

The first argument is the root component of the React application (<App /> in this example).
The second argument is the DOM element where the React application will be mounted. It's usually obtained using document.getElementById('root')
*/


/*
React Fiber is an ongoing reimplementation of React's core algorithm. It is the culmination of over two years of research by the React team.

The goal of React Fiber is to increase its suitability for areas like animation, layout, and gestures. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames.

Other key features include the ability to pause, abort, or reuse work as new updates come in; the ability to assign priority to different types of updates; and new concurrency primitives.

About this document
Fiber introduces several novel concepts that are difficult to grok solely by looking at code. This document began as a collection of notes I took as I followed along with Fiber's implementation in the React project. As it grew, I realized it may be a helpful resource for others, too.

I'll attempt to use the plainest language possible, and to avoid jargon by explicitly defining key terms. I'll also link heavily to external resources when possible.

Please note that I am not on the React team, and do not speak from any authority. This is not an official document. I have asked members of the React team to review it for accuracy.

This is also a work in progress. Fiber is an ongoing project that will likely undergo significant refactors before it's completed. Also ongoing are my attempts at documenting its design here. Improvements and suggestions are highly welcome.

My goal is that after reading this document, you will understand Fiber well enough to follow along as it's implemented, and eventually even be able to contribute back to React.

Prerequisites
I strongly suggest that you are familiar with the following resources before continuing:

React Components, Elements, and Instances - "Component" is often an overloaded term. A firm grasp of these terms is crucial.
Reconciliation - A high-level description of React's reconciliation algorithm.
React Basic Theoretical Concepts - A description of the conceptual model of React without implementation burden. Some of this may not make sense on first reading. That's okay, it will make more sense with time.
React Design Principles - Pay special attention to the section on scheduling. It does a great job of explaining the why of React Fiber.
Review
Please check out the prerequisites section if you haven't already.

Before we dive into the new stuff, let's review a few concepts.

What is reconciliation?
reconciliation
The algorithm React uses to diff one tree with another to determine which parts need to be changed.
update
A change in the data used to render a React app. Usually the result of setState. Eventually results in a re-render.
The central idea of React's API is to think of updates as if they cause the entire app to re-render. This allows the developer to reason declaratively, rather than worry about how to efficiently transition the app from any particular state to another (A to B, B to C, C to A, and so on).

Actually re-rendering the entire app on each change only works for the most trivial apps; in a real-world app, it's prohibitively costly in terms of performance. React has optimizations which create the appearance of whole app re-rendering while maintaining great performance. The bulk of these optimizations are part of a process called reconciliation.

Reconciliation is the algorithm behind what is popularly understood as the "virtual DOM." A high-level description goes something like this: when you render a React application, a tree of nodes that describes the app is generated and saved in memory. This tree is then flushed to the rendering environment — for example, in the case of a browser application, it's translated to a set of DOM operations. When the app is updated (usually via setState), a new tree is generated. The new tree is diffed with the previous tree to compute which operations are needed to update the rendered app.

Although Fiber is a ground-up rewrite of the reconciler, the high-level algorithm described in the React docs will be largely the same. The key points are:

Different component types are assumed to generate substantially different trees. React will not attempt to diff them, but rather replace the old tree completely.
Diffing of lists is performed using keys. Keys should be "stable, predictable, and unique."
Reconciliation versus rendering
The DOM is just one of the rendering environments React can render to, the other major targets being native iOS and Android views via React Native. (This is why "virtual DOM" is a bit of a misnomer.)

The reason it can support so many targets is because React is designed so that reconciliation and rendering are separate phases. The reconciler does the work of computing which parts of a tree have changed; the renderer then uses that information to actually update the rendered app.

This separation means that React DOM and React Native can use their own renderers while sharing the same reconciler, provided by React core.

Fiber reimplements the reconciler. It is not principally concerned with rendering, though renderers will need to change to support (and take advantage of) the new architecture.
*/


/*
If you directly use the App component instead of the RouterProvider, it would depend on how your App component is structured and whether it handles routing internally or not.

If your App component includes routing logic internally (perhaps using a different routing library or custom routing implementation), then using <App> directly would be appropriate.

However, if your application relies on a specific routing library like React Router, it's generally a good practice to use the appropriate components provided by that library for routing. In this case, using <RouterProvider> from React Router is the preferred approach as it integrates the routing functionality seamlessly into your application and follows best practices for routing in React applications.

Using <RouterProvider> also helps to keep your codebase consistent with React Router conventions, making it easier for other developers to understand and maintain the code in the future.
*/
