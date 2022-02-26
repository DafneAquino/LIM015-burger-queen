import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import './App.css'
import {KitchenView} from './components/KitchenView.jsx';
import {LoginView} from './components/LoginView';
import {MenuView} from './components/MenuView';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path = '/' component={LoginView} />
          <Route path = '/waiter' component= {MenuView} />
          <Route path = '/cheff' component={KitchenView} />
          <Route path ='*' component ={NotFound} />
        </Switch>
    </Router>

  );
}

export default App;

