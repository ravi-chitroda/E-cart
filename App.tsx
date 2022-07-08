import { Link } from '@material-ui/core';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';

function App() {
  return (  
      <Routes>
      <Route path='/' element = {<Home />} />
      <Route path='/login' element = {<Login  />} />
      <Route path='/signup' element = {<Signup />} />
      </Routes> 
  );
}

export default App;
