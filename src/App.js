import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';
import Home from './components/home';
import Search from './components/search';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/search" component={ Search } />
        </Switch>
      </Router>
    </>
  );
}

export default App;
