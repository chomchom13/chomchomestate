import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice'; // reducers
import OAuth from '../components/OAuth';

export default function SignIp() {
  var [formData, setFormData] = useState({}); // as the value of this is going to change , we assign this as 'let'/'var' and not 'const'
  var { loading, error } = useSelector((state) => state.user); // <-- using this // var [error, setError] = useState(null); // var [loading, setLoading] = useState(false); ( in place of this )
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
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
      dispatch(signInStart()); // setLoading(true) -> Instead of using this, we will use our reducers that we made using redux
      const res = await fetch('server/auth/signin', { // we set the path to http://localhost:3000/server/auth/signup (look in the vite.config.js)
        method: 'POST', // POST request to http://localhost:3000/server/auth/signup sent
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // we are sending this formData as the data with the POST request
      });
      const data = await res.json(); // we get the response which we set to "User created successfully" in the server (backend)
      if(data.success === false){ // if our signup function in auth.controller.js threw an error, next(error) -> it went to index.js in the middleware where the 'success' property of the error was set to false. so we can check here that if the data that we got has it's success set to false , then it is an error
        dispatch(signInFailure(data.message)); // <-- using this // setError(data.message); // setLoading(false); ( in place of this )
        return;
      }
      dispatch(signInSuccess(data)); // <-- using this // setLoading(false); // setError(null); ( in place of this )
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message)) // <-- using this // setLoading(false); // setError(error.message);
    }
  }
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form id="form" className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        {/* disabled = {loading} -> when loading is true, set the disabled to true! */}
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading? 'Loading...':'Sign In'} </button>
        {/* if we click this OAuth button it will submit the form as well as it is inside the form tag ( button by default type is submit ), so change the type of this OAuth to button */}
        <OAuth /> 
      </form>
      <div className='flex gap-2 mt-5'>
        {/* In Dont , don't add (') as that is going to cause problem in the production later */}
        <p>Dont Have an Account?</p> 
        <Link to='/sign-up'>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {/* if there is an error, show it at the bottom of the page */}
      {error && <p className='text-red-500 mt-5'>{error}</p>} 
    </div>
  )
}
