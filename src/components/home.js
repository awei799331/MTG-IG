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
              <strong>MTG Investor's Grail</strong>{' '}
              is the first{' '}
              <strong>deep learning</strong>{' '}
              based
              <br />
              <strong>Magic: The Gathering</strong>{' '}
              card price predictor
          </h1>
          <HomeSearch />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export { Home as default };