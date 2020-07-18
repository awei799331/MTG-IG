import React from 'react';
import '../css/App.css';
import '../css/home.css';
import HomeSearch from './searchBar';
import NavBar from './navbar';
import Footer from './footer';
import BG from './background';

function Home() {
  return (
    <div className="wrapper">
      <BG />
      <div className="content home">
        <NavBar />
        <div className="flex">
          <h1 className="title">
              <b>
                MTG Investor's Grail
              </b>
              &nbsp;is the first&nbsp;
              <b>
                deep learning
              </b>
              &nbsp;based
              <br />
              <b>
                Magic: The Gathering
              </b>
              &nbsp;card price predictor
          </h1>
          <HomeSearch />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export { Home as default };
