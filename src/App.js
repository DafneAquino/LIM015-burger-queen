import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import {LoginView} from './components/LoginView';
import {MenuView} from './components/MenuView';
import {ChefView} from './components/ChefView.jsx';
import { NotFound } from './components/NotFound';
import './App.css'

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path = '/' component={LoginView} />
          <Route path = '/waiter' component= {MenuView} />
          <Route path = '/cheff' component= {ChefView} />
          <Route path ='*' component ={NotFound} />
        </Switch>
    </Router>

  );
}

export default App;

