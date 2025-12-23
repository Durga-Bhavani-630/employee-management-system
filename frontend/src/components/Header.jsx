import React from 'react'
import {useNavigate} from 'react-router-dom';
function Header() 
{

  const navigate = useNavigate();

  const handleLogout = (e)=>{
    e.preventDefault();
    localStorage.removeItem("logged");
    navigate("/login");
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light fixed-top'>
        <div className='container'>
            <a href="" className='navbar-brand fw-bold'> BridgeSoft </a>
            {
                localStorage.getItem("logged") && 
                <button className='btn btn-primary' onClick={handleLogout}>
                    Logout
                </button>
            }
        </div>
    </nav>
  )
}

export default Header;

