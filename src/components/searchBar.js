import React, { useState } from 'react';
import styled from 'styled-components';
import '../css/App.css';
import '../css/home.css';
import SearchIcon from '../img/search.svg';

function HomeSearch() {
  const [cardQuery, setCardQuery] = useState('');

  return(
    <Form action="search">
      <InputText
      autoComplete="off"
      value={ cardQuery }
      type="text"
      name="q"
      onChange={ e => setCardQuery(e.target.value) }
      />
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
`;

const InputText = styled.input`
  width: 100%;
  max-width: 720px;
  height: 50px;
  font-size: 32px;
  font-family: Open Sans, sans-serif;
  color: white;
  padding: 5px 20px 5px 48px;
  display: block;
  background: url(${SearchIcon});
  background-color: rgba(255,255,255,0.3);
  background-repeat: no-repeat;
  background-position: 10px center;
  border-color: rgba(255,255,255,0.3);
  border-width: 3px;
  border-style: solid;
  margin: 2% auto 5%;
  outline: none;
  transition: all 500ms linear 0s;

  &:focus {
    border-color: white;
  }

  @media (max-width: 767px) {
    font-size: 16px;
		height: 25px;
  }
`;

function SearchBar() {
  const [cardQuery, setCardQuery] = useState('');

  return(
    <Form2 action="search">
      <InputText2
      autoComplete="off"
      value={ cardQuery }
      type="text"
      name="q"
      placeholder="Search for a card"
      onChange={ e => setCardQuery(e.target.value) }
      />
    </Form2>
  );
}

const Form2 = styled.form`
  width: 100%;
  margin: 15px 0;
`;

const InputText2 = styled.input`
  width: 100%;
  max-width: 720px;
  height: 20px;
  font-size: 16px;
  padding: 5px;
  display: block;
  background-color: #f6f6ff;
  background-repeat: no-repeat;
  background-position: 10px center;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  outline: none;
  font-family: Open Sans, sans-serif;

  &:focus {
    border-color: #00c474;
  }

  @media (max-width: 767px) {
    font-size: 16px;
		height: 25px;
  }
`;

export { HomeSearch, SearchBar };