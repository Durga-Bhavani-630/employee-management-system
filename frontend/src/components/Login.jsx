import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';


function Login() 
{
  const [user,setUser] = useState({username:"",password:""});
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit=(e)=>{
      e.preventDefault();

      AuthService.login(user).then(res=>{
        if(res.data === true)
        {
            localStorage.setItem("logged","true");
            navigate("/");
        }
        else
        {
          setError("Invalid Username or Password");
        }
      })
  }

  return (
    <div className='mt-5 pt-5'>
        <div className='card p-5 w-50 offset-3'>
          <h3 className='text-center'> Login </h3>

          <form>
            <label>UserName:</label>
            <input type="text" className='form-control' autoComplete='off'
            value={user.username}
            onChange={(e)=> setUser({...user,username:e.target.value})}/>

            <label>Password:</label>
            <input type="password" className='form-control'
            value={user.password}
            onChange={(e)=> setUser({...user,password:e.target.value})}/>

            {error  && <small className="text-danger">{error}</small>}

            <button className='btn btn-primary w-100 mt-4'
            onClick={handleSubmit}> Login </button>
          </form>
        </div>
    </div>
  )
}

export default Login