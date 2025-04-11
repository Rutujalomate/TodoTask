import React, { useState,useEffect } from 'react'
import { Route, Router, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import SignUp from './SignUp';
import Task from './Task';

const RouterCom = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
  return (
    <div>
         <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/> 
          <Routes>
              <Route path='/' element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
              <Route path='/signup' element={<SignUp/>}/>      
              <Route path='/task' element={<Task/>}/>      

          </Routes>
    </div>
  )
}

export default RouterCom;