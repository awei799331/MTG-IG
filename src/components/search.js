import React, { useState, useEffect } from 'react';
import { BrowserRouter as Route, Redirect } from 'react-router-dom'; // eslint-disable-line
import axios from 'axios';
import queryString from 'query-string';
import '../css/App.css';
import '../css/search.css';
import NavBar from './navbar';
import Footer from './footer';
import BG from './background';

function Search(props) {
  const [redir, setRedir] = useState(false);
  const [response, setResponse] = useState({});
  const [renderType, setRenderType] = useState('loading');
  const [page, setPage] = useState(1);
  useEffect(() => {
    const query = queryString.parse(props.location.search);
    if (!query.cardName.trim()) {
      setRedir(true);
    } else {
      axios.get('https://api.scryfall.com/cards/search', {
        params: {
          order: 'name',
          unique: 'cards',
          q: query.cardName,
          page: page
        }
        })
        .then(res => {
          setResponse(res.data);
          return res.data;
        })
        .then(res => {
          if (res.object === 'list' && res.data.length > 1) {
            setRenderType('multi');
          } else if (res.object === 'list' && res.data.length === 1) {
            setRenderType('single');
          } else {
            setRenderType('none');
          }
        })
        .catch(e => {
          setRenderType('none');
          console.log(e);
        });
    }
  }, [props.location.search, page]);

  return(
    <>
      <div className="wrapper">
        <BG />
        <div className="content">
          <NavBar />

          { renderType === 'loading' ?
            <div style={{ fontSize: '4em' }}>
              Loading
            </div> :

            redir ?
            <Redirect to='/' /> :

            renderType === 'multi' ?
            <MultiSearch data={ response } /> :

            renderType === 'single' ?
            <div style={{ fontSize: '4em' }}>
              Single card
            </div> :

            renderType === 'none' ?
            <div style={{ fontSize: '4em' }}>
              None
            </div> :

            <div />
          }

        </div>
        <Footer />
      </div>
    </>
  );
}

function MultiSearch(props) {
  const cardArray = useState(props.data.data);

  const multiSearchItem = cardArray[0].map((card) => 
    <div key={ card.id }>
      { card.image_uris ?
        <img alt="" src={ card.image_uris.small } /> :

        card.card_faces ?
        <img alt="" src={ card.card_faces[0].image_uris.small } /> :

        <img alt="" src="https://cdn.download.ams.birds.cornell.edu/api/v1/asset/59953131/1800" />
      }
    </div>
  );

  return(
    <div className="multiSearch">
      { multiSearchItem }
    </div>
  );
}

export { Search as default };