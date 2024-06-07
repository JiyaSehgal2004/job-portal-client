import { useState } from 'react';
import { auth } from '../firebase/firebase.config.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUser } from '../store/usersSlice';

function Login() {
  const dispatch = useDispatch();
  const [loginType, setLoginType] = useState('signup'); // Default to signup
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({ id: user.uid, email: user.email }));
    } else {
      dispatch(setUser(null));
    }
  });

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  function handleSignUp(e) {
    setError("");
    e.preventDefault();
    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        dispatch(setUser({ id: userCredential.user.uid, email: userCredential.user.email }));
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handleLogin(e) {
    setError("");
    e.preventDefault();
    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        dispatch(setUser({ id: userCredential.user.uid, email: userCredential.user.email }));
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handlePasswordReset() {
    const email = prompt('Please enter your email');
    sendPasswordResetEmail(auth, email);
    alert('Email sent! Check your inbox for password reset instructions.');
  }

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor: '#fff', padding: '20px' }}>
        <h1 style={{ fontSize: '2em', marginBottom: '20px', fontWeight: 'bold' }}>Job Portal</h1>
        <h2 style={{ fontSize: '1.5em', marginBottom: '10px' }}>{loginType === 'signup' ? 'Sign Up' : 'Login'} to Your Account</h2>
        <form style={{ maxWidth: '300px', margin: '0 auto', backgroundColor: '#4070f4', padding: '20px', borderRadius: '10px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '1em', marginBottom: '5px', display: 'block' }}>Email *</label>
            <input
              onChange={(e) => handleCredentials(e)}
              type="text"
              name="email"
              placeholder="Enter your email"
              style={{ width: '100%', padding: '15px', borderRadius: '10px', border: 'none', marginBottom: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '1em', marginBottom: '5px', display: 'block' }}>Password *</label>
            <input
              onChange={(e) => handleCredentials(e)}
              type="password"
              name="password"
              placeholder="Enter your password"
              style={{ width: '100%', padding: '15px', borderRadius: '10px', border: 'none' }}
            />
          </div>
          <button onClick={loginType === 'signup' ? handleSignUp : handleLogin} className="btn" style={{ width: '100%', padding: '15px', backgroundColor: '#007bff', color: '#fff', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '1.2em' }}>{loginType === 'signup' ? 'Sign Up' : 'Login'}</button>
        </form>
        {loginType === 'signup' ? (
          <p onClick={() => setLoginType('login')} style={{ marginTop: '10px', cursor: 'pointer', textDecoration: 'underline', fontSize: '1em' }}>Already have an account? Log In</p>
        ) : (
          <>
            <p onClick={() => setLoginType('signup')} style={{ marginTop: '10px', cursor: 'pointer', textDecoration: 'underline', fontSize: '1em' }}>Don't have an account? Sign Up</p>
            <p onClick={handlePasswordReset} style={{ marginTop: '10px', cursor: 'pointer', textDecoration: 'underline', fontSize: '1em' }}>Forgot Password?</p>
          </>
        )}
        {error && <div style={{ color: 'red', marginTop: '10px', fontSize: '1em' }}>{error}</div>}
      </div>
    </>
  );
}

export default Login;

/*
// const auth = getAuth();
// Here's what each part does:

// getAuth():

// getAuth() is a function provided by the Firebase Authentication SDK.
// It's used to obtain an instance of the authentication service associated with the default Firebase App.
// This function initializes and returns an Auth object, which is the primary interface for interacting with Firebase Authentication services.
// const auth = ...:

// const is a keyword in JavaScript used to declare a constant variable.
// auth is the name of the constant variable being declared.
// It's common to name this variable auth as it represents the authentication service.
// So, in summary, this line of code initializes the Firebase Authentication service by obtaining an instance of the Auth object using getAuth(), and stores it in the constant variable auth. This auth variable can then be used throughout the application to perform authentication-related tasks like signing users in, signing them out, managing user accounts, and more.


// new GoogleAuthProvider():

// GoogleAuthProvider is a class provided by Firebase Authentication SDK, specifically designed for authentication using Google accounts.
// When we use the new keyword followed by GoogleAuthProvider(), we are creating a new instance of the GoogleAuthProvider class.
// This instance represents the authentication provider for Google sign-in.
// const googleProvider = ...:

// const is a JavaScript keyword used to declare a constant variable. Once assigned, the value of a constant cannot be changed.
// googleProvider is the variable name chosen by the developer to store the instance of the Google authentication provider.
// By using const, we ensure that googleProvider remains immutable once assigned. This is a good practice because the authentication provider instance shouldn't be re-assigned to another value during the execution of the program.
// Assignment:

// The result of calling new GoogleAuthProvider() is assigned to the googleProvider variable. This result is an instance of the GoogleAuthProvider class, specifically tailored to facilitate Google sign-in authentication within Firebase projects.
// In essence, const googleProvider = new GoogleAuthProvider(); creates a new instance of the GoogleAuthProvider class, which serves as the authentication provider for Google sign-in within the Firebase Authentication system. This instance is then stored in the googleProvider variable, allowing us to use it to configure authentication methods, handle sign-in requests, and integrate Google authentication functionality into our application.




// Certainly! Let's break down const googleProvider = new GoogleAuthProvider();:

// new GoogleAuthProvider():

// GoogleAuthProvider is a class provided by the Firebase Authentication SDK.
// This class represents an authentication provider specifically tailored for Google sign-in.
// When we use the new keyword followed by GoogleAuthProvider(), we are creating a new instance of the GoogleAuthProvider class.
// const googleProvider = ...:

// const is a JavaScript keyword used to declare a constant variable. Constants cannot be re-assigned or re-declared within the same scope.
// googleProvider is the variable name chosen by the developer to store the instance of the Google authentication provider.
// By using const, we ensure that googleProvider remains immutable once assigned. This is a good practice because the authentication provider instance shouldn't be modified or reassigned after initialization.
// Assignment:

// The result of new GoogleAuthProvider() creates a new instance of the GoogleAuthProvider class, specifically for handling authentication with Google accounts.
// This instance, referred to as googleProvider, encapsulates methods and configurations necessary for initiating Google sign-in flows, handling user authentication, and obtaining user profile information.
// In summary, const googleProvider = new GoogleAuthProvider(); initializes a constant variable named googleProvider with a new instance of the GoogleAuthProvider class, which is responsible for managing authentication with Google accounts within the Firebase Authentication system. This instance is then used to integrate Google sign-in functionality into the application.



// Certainly! Let's delve into const navigate = useNavigate();:

// useNavigate():

// useNavigate is a custom hook provided by React Router.
// This hook returns a navigate function that allows programmatically navigating to different routes within a React application.
// It is typically used within functional components that are rendered by a <BrowserRouter> or <HashRouter> component higher up in the component tree.
// const navigate = ...:

// const is a JavaScript keyword used to declare a constant variable. Constants cannot be re-assigned or re-declared within the same scope.
// navigate is the variable name chosen by the developer to store the navigate function returned by the useNavigate() hook.
// By using const, we ensure that navigate remains immutable once assigned. This is a good practice because the navigate function should not be modified or reassigned after initialization.
// Assignment:

// useNavigate() is called within a functional component to obtain the navigate function.
// The navigate function obtained from useNavigate() allows the component to programmatically navigate to different routes within the application without directly relying on browser history or URL changes.
// This function provides a clean and declarative way to handle navigation within React Router applications, enabling developers to navigate users between different views or pages based on certain conditions or user interactions.
// In summary, const navigate = useNavigate(); initializes a constant variable named navigate with the navigate function obtained from the useNavigate() hook provided by React Router. This function facilitates programmatic navigation within a React application, enabling components to navigate between different routes without relying on direct manipulation of browser history or URLs.




// Sure, let's break down the handleLogin function line by line:

// const handleLogin=()=>{:

// This line declares a function named handleLogin using arrow function syntax.
// signInWithPopup(auth,googleProvider):

// This function initiates the authentication process with Firebase Authentication's signInWithPopup method.
// It opens a pop-up window for the user to sign in using the Google authentication provider specified by googleProvider.
// .then((result) => {:

// This part signifies a promise chain. When the authentication process is successful, the code inside the then block will execute.
// const user = result.user;:

// Here, we extract the user object from the result of the authentication process.
// The user object contains information about the authenticated user, such as their display name, email, etc.
// navigate("/"):

// This line uses the navigate function, likely provided by a router library such as React Router.
// It redirects the user to the root route (i.e., "/") of the application after successful authentication.
// alert(Welcome ${user.displayName}, You're Signed In):

// This line displays a browser alert with a welcome message to the authenticated user.
// It uses string interpolation to include the user's display name in the message.
// So, in summary, the handleLogin function handles the logic for initiating the Google sign-in process, processing the result, redirecting the user upon successful authentication, and displaying a welcome message.

// User
// signInWithPopup(auth,googleProvider) wht is actually this line doing
// ChatGPT
// The line signInWithPopup(auth, googleProvider) is calling the signInWithPopup method provided by Firebase Authentication.

// Here's what it does:

// auth: This is an instance of Firebase Authentication obtained using getAuth() method. It represents the Firebase Authentication service.

// googleProvider: This is an instance of GoogleAuthProvider obtained by instantiating new GoogleAuthProvider(). It specifies that the sign-in should be performed using Google's authentication service.

// signInWithPopup(auth, googleProvider): This function initiates the sign-in process using a pop-up window. It opens a pop-up window where the user can authenticate with Google. Once the user signs in successfully, Firebase returns a result containing user information.

// So, in summary, this line triggers the sign-in process using Google authentication in a pop-up window. Once the user completes the sign-in process successfully, the authentication result is returned, which includes information about the authenticated user.



// .catch((error) => {
//     const errorMessage = error.message;
//     const email = error.customData.email;
//     const credential = GoogleAuthProvider.credentialFromError(error);
//   }); explain line by line code
// ChatGPT
// Certainly! Let's break down each line in the .catch block:

// const errorMessage = error.message;: This line extracts the error message from the error object. In Firebase Authentication, error.message typically contains a descriptive error message that can be shown to the user to explain what went wrong during the sign-in process.

// const email = error.customData.email;: This line attempts to access the email associated with the error from the customData property of the error object. However, it seems like a custom implementation or assumption, as Firebase Authentication errors typically do not have a customData property by default. If custom data is attached to the error object elsewhere in the application, this line might retrieve the email address associated with the error for further handling or logging purposes.

// const credential = GoogleAuthProvider.credentialFromError(error);: This line attempts to extract credential data from the error object using the credentialFromError method provided by GoogleAuthProvider. This method is used when handling scenarios where the error indicates that the user's sign-in attempt was linked to an existing account. It attempts to construct a credential object based on the error information. This credential can then be used to handle specific scenarios, such as linking accounts or signing in with the provided credential, depending on your application's logic.

// Overall, these lines aim to extract relevant information from the error object returned by the authentication process to provide meaningful feedback to the user or to handle specific error scenarios within the application logic.

/*
Error Handling:

When an authentication error occurs during the sign-in process using Google authentication with Firebase, Firebase Authentication provides an error object containing details about the error.
Error Object:

The error object usually contains information such as the error code, error message, and additional details specific to the type of error encountered.
Credential Extraction:

In some cases, when an error occurs during Google authentication, the error object may also contain credential information.
This credential information can be extracted from the error object using methods provided by Firebase Authentication. However, there isn't a specific method named credentialFromError in Firebase's GoogleAuthProvider. 
*/
