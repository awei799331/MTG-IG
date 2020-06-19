import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';
import Home from './components/home';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={ Home } />
        </Switch>
      </Router>
    </>
  );
}

export default App;
