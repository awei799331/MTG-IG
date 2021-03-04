import React, { useState } from 'react';
import styled from 'styled-components';
import '../css/App.css';
import '../css/home.css';
import SearchIcon from '../img/search.svg';

function HomeSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchUnique, setSearchUnique] = useState('');

  return(
    <Form
    action="/search">
      <HomeInputText
      autoComplete="off"
      value={ searchQuery }
      type="text"
      name="q"
      onChange={ e => setSearchQuery(e.target.value) }
      />
      <HomeSelect
      name='unique'
      value={ searchUnique }
      onChange={ e => setSearchUnique(e.target.value) }
      >
        <option value='cards'>Cards</option>
        <option value='art'>Artworks</option>
        <option value='prints'>All Printings</option>
      </HomeSelect>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
`;

const HomeInputText = styled.input`
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
  margin: 2% auto 1%;
  outline: none;
  transition: all 500ms linear 0s;

  &:focus {
    border-color: white;
  }

  @media (max-width: 767px) {
    width: unset;
    font-size: 16px;
		height: 25px;
  }
`;

const HomeSelect = styled.select`
  font-size: 14px;
  font-family: Open Sans, sans-serif;
  color: white;
  padding: auto 1px;
  display: block;
  background-color: rgba(255,255,255,0.3);
  border-color: rgba(255,255,255,0.3);
  border-width: 2px;
  border-style: solid;
  margin: 2px auto;
  outline: none;
  transition: all 500ms linear 0s;

  & > option {
    background-color: rgba(102, 102, 102, 1);
  }
`;

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState(props.query ? (props.query.q ? props.query.q : '') : '');
  const [searchUnique, setSearchUnique] = useState(props.query ? (props.query.unique ? props.query.unique : '') : '');

  return(
    <Form2
    action="/search">
      <InputText2
      autoComplete="off"
      value={ searchQuery }
      type="text"
      name="q"
      placeholder="Search for a card"
      onChange={ e => setSearchQuery(e.target.value) }
      />
      <SearchSelect
      name='unique'
      value={ searchUnique }
      onChange={ e => setSearchUnique(e.target.value) }
      >
        <option value='cards'>Cards</option>
        <option value='art'>Artworks</option>
        <option value='prints'>All Printings</option>
      </SearchSelect>
    </Form2>
  );
}

const Form2 = styled.form`
  width: 100%;
  margin: 15px 0;
`;

const InputText2 = styled.input`
  width: 100%;
  max-width: 640px;
  height: 20px;
  font-size: 16px;
  display: block;
  background-color: transparent;
  outline: none;
  font-family: Open Sans, sans-serif;
  border: none;
  border-bottom: 3px solid #b3b3b3;
  transition: 0.35s ease;

  &:focus {
    border-bottom: 3px solid #00c474;
  }

  @media (max-width: 767px) {
    font-size: 16px;
		height: 25px;
  }
`;

const SearchSelect = styled.select`
  background-color: #f2f2fd;
  border: 1px solid #b3b3b3;
`;

export { HomeSearch, SearchBar };