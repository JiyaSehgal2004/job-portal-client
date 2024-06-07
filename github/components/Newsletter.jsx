import React, {useState} from 'react'
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa6'

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    // console.log("handleSubscribe called");
    
    if (!email) {
      setMessage('Please enter a valid email.');
      console.log(message);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (result.status) {
        setMessage('Subscribed successfully!');
      } else {
        setMessage('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
        {/* 1st Part */}
        <div>
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'><FaEnvelopeOpenText /> Email me for jobs </h3>
            <p className='text-primary/75 text-base mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, sit. Vitae, doloribus nam. Sunt, ipsum.</p>
            <div className='w-full space-y-4'>
                <input type="email" name="email" id="email" placeholder='name@mail.com' className='w-full block py-2 pl-3 border focus:outline:none' />
                <input type="submit" value="Subcribe" onClick={handleSubscribe} className='w-full block py-2 pl-3 border focus:outline: bg-blue rounded-sm text-white cursor-pointer font-semibold' />
            </div>
        </div>

        {/* 2nd Part */}
        <div className='mt-20'>
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'><FaRocket /> Get noticed faster </h3>
            <p className='text-primary/75 text-base mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, sit. Vitae, doloribus nam. Sunt, ipsum.</p>
            <div className='w-full space-y-4'>
                <input type="email" name="email" id="email" placeholder='name@mail.com' className='w-full block py-2 pl-3 border focus:outline:none' />
                <input type="submit" value={"Upload your resume"} className='w-full block py-2 pl-3 border focus:outline: bg-blue rounded-sm text-white cursor-pointer font-semibold' />
            </div>
        </div>
    </div>
  )
}

export default Newsletter

/*
Form Submission: When a form is submitted, the name attribute of the input field is used as the key in the key-value pair sent to the server. This allows the server to identify and process the form data correctly.
*/


/*
FormData Object: When using the FormData API in JavaScript to manually handle form submissions, the name attribute is used to append the correct data.
*/