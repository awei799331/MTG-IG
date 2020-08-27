import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import './css/App.css';
import Home from './components/home';
import Search from './components/search';
import Card from './components/card';

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/card/:id" component={ Card } />
        </Switch>
      </Router>
    </>
  );
}

function ScrollToTop() {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, []);

  return (null);
}

export default App;
