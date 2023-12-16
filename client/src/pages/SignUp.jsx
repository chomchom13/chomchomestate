import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  var [formData, setFormData] = useState({}); // as the value of this is going to change , we assign this as 'let' and not 'const'
  var [error, setError] = useState(null);
  var [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id] : e.target.value,
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents refreshing the page when we try to submit the form 
    try { // try catch block was neccessary otherwise there were some problems with ( Loading forever if there was an error )
      setLoading(true);
      const res = await fetch('server/auth/signup', { // we set the path to http://localhost:3000/server/auth/signup (look in the vite.config.js)
        method: 'POST', // POST request to http://localhost:3000/server/auth/signup sent
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // we are sending this formData as the data with the POST request
      });
      const data = await res.json(); // we get the response which we set to "User created successfully" in the server (backend)
      if(data.success === false){ // if our signup function in auth.controller.js threw an error, next(error) -> it went to index.js in the middleware where the 'success' property of the error was set to false. so we can check here that if the data that we got has it's success set to false , then it is an error
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in')
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form id="form" className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        {/* disabled = {loading} -> when loading is true, set the disabled to true! */}
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading? 'Loading...':'Sign Up'} </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an Account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {/* if there is an error, show it at the bottom of the page */}
      {error && <p className='text-red-500 mt-5'>{error}</p>} 
    </div>
  )
}
