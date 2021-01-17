import React from 'react';
import './App.css';
import Login from './components/login.component.js';
import Scans from './components/scans.component.js'
import Image from './components/images.component.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Route,Switch, Router} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Route exact path='/images' component={Image}></Route>
     <Route exact path='/scans' component={Scans}></Route>
     <Route exact path='/' component={Login}></Route>
    </div>
    </BrowserRouter>
  );
}

export default App;