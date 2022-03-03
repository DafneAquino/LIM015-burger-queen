import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import {LoginView} from './components/LoginView';
import {WaiterView} from './components/WaiterView';
import {ChefView} from './components/ChefView.jsx';
import { NotFound } from './components/NotFound';
import './App.css'

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path = '/' component={LoginView} />
          <Route path = '/waiter' component= {WaiterView} />
          <Route path = '/chef' component= {ChefView} />
          <Route path ='*' component ={NotFound} />
        </Switch>
    </Router>

  );
}

export default App;

