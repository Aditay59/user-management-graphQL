import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar:React.FC = () => {

  const [storageChange, setStorageChange] = useState(localStorage.getItem('user'));

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    setStorageChange(null);
    navigate('/');
  };

  useEffect(() => {
   
    const hadleStorageChange = () => {
    setStorageChange(localStorage.getItem('user'));
   };
   
   window.addEventListener('storage', hadleStorageChange);
   
   const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, Array.from(arguments) as [string, string]);
      hadleStorageChange();
    };
   
   return () => {
    window.removeEventListener('storage', hadleStorageChange);
   }
  },[storageChange]);

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark position-sticky top-0 z-2'>
        <div className='container'>
            <Link to={'/'} className='navbar-brand'>My App</Link>
            <ul className='navbar-nav mr-auto'>
              {
                localStorage.getItem("user")?
                <button onClick={handleClick} className='btn btn-outline-danger btn-sm' type="button">Logout</button>:
                <div className='d-flex gap-2'>
                  <li className='nav-item'><Link to={'/login'} className='nav-link'>Login</Link></li>
                  <li className='nav-item'><Link to={'/register'} className='nav-link'>Register</Link></li>
                </div>
              }
              {
                localStorage.getItem("user")?
                <div className='d-flex gap-2'>
                  <li className='nav-item'><Link to={'/dashboard'} className='nav-link'>Dashboard</Link></li>
                  <li className='nav-item'><Link to={'/users'} className='nav-link'>Users</Link></li>
                </div>:""
              }
            </ul>
        </div>
    </nav>
  )
}

export default Navbar;