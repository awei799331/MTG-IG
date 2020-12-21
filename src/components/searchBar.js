import React, { useState, useRef } from 'react';
import '../css/App.css';
import '../css/home.css';

function HomeSearch() {
  const [cardQuery, setCardQuery] = useState('');
  const searchRef = useRef();

  return(
    <form className="form" action="search">
      <input
      autoComplete="off"
      value={ cardQuery }
      ref= { searchRef }
      type="text"
      name="q"
      className="inputText"
      onChange={ e => setCardQuery(e.target.value) }
      placeholder='Do you have the gut to search "black lotus?"'
      required
      />
    </form>
  );
}

export { HomeSearch as default };