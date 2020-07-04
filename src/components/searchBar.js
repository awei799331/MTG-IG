import React, { useState, useEffect } from 'react';
import '../css/App.css';
import '../css/home.css';
import '../css/animations.css'

function HomeSearch() {
  const [cardQuery, setCardQuery] = useState('');

  useEffect(() => {
    const searchBarId = document.getElementById('search');

    searchBarId.addEventListener("focusin", (e) => {
      searchBarId.classList.remove("searchBorderUnfocused");
      searchBarId.classList.add("searchBorderHighlighted");
    })
    searchBarId.addEventListener("focusout", (e) => {
      searchBarId.classList.remove("searchBorderHighlighted");
      searchBarId.classList.add("searchBorderUnfocused");
    })
  }, []);

  return(
    <form className="form" action="search">
      <input
      value={ cardQuery }
      id="search"
      type="text"
      name="cardName"
      className="inputText"
      onChange={ e => setCardQuery(e.target.value) }
      required
      />
    </form>
  );
}

export { HomeSearch as default };