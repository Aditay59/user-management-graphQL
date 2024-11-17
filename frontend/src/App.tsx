import './styles/App.css';
import React from 'react';
import UserDetails from './components/UserDetails'
import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Navbar from './components/Navbar';
import NotFound from './screens/NotFound';
import Login from './screens/Login';
import Register from './screens/Register';
import { ToastContainer } from 'react-toastify';

const App:React.FC = () => {

  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/users' element={<UserDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
      />
    </React.Fragment>
  )
}

export default App
