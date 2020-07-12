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
      required
      />
    </form>
  );
}

export { HomeSearch as default };