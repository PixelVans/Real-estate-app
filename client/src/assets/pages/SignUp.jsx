import {  React,useState } from 'react'
import {Form, Link, useNavigate} from 'react-router-dom'


export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })

  }
  

  const handleSubmit = async (e) => {



    try {
       e.preventDefault();
    setloading(true)
    const res = await fetch('api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
      setloading(false);
      return;
    }
    setloading(false)
      setError(null)
      navigate('/sign-in'); 
    }
    
    catch (error) {
      setError(error.message);
      setloading(false);
      
}


   
   
  }
   
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1
        className='text-3xl text-center font-semibold my-7'>
        Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='enter username'
       className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type="email" placeholder='enter email'
       className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='enter password'
          className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 
        rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
         {loading ? "Loading...." : "Sign Up"}</button>
      </form>
      
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          
          <span className='text-blue-700'>Log in </span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{ error}</p>}
    </div>
  )
}
 