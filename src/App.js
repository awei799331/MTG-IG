import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';
import Home from './components/home';
import Search from './components/search';
import Card from './components/card';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/card/:id" component={ Card } />
        </Switch>
      </Router>
    </>
  );
}

export default App;
