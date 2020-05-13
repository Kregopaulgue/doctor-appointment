import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import Login from './components/login/Login.js';
import Appointments from './components/appointments/Appointments.js';

function App() {
  return (
    <div className="App">
        <Switch>
            <Route 
                exact 
                path='/login' 
                component={Login}
            />

            <Route 
                exact 
                path='/appointments' 
                component={Appointments}
            />
        </Switch>
    </div>
  );
}

export default App;
