import React, { useState, useEffect, useRef } from 'react';
import '../css/App.css';
import '../css/home.css';
import '../css/animations.css'

function HomeSearch() {
  const [cardQuery, setCardQuery] = useState('');
  const searchRef = useRef();

  useEffect(() => {
    const node = searchRef.current;

    node.addEventListener("focusin", (e) => {
      node.classList.remove("searchBorderUnfocused");
      node.classList.add("searchBorderHighlighted");
    })
    node.addEventListener("focusout", (e) => {
      node.classList.remove("searchBorderHighlighted");
      node.classList.add("searchBorderUnfocused");
    })
  }, []);

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