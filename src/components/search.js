import React, { useState, useEffect } from 'react';
import { BrowserRouter as Route, Redirect } from 'react-router-dom'; // eslint-disable-line
import axios from 'axios';
import queryString from 'query-string';
import PuffLoader from "react-spinners/PuffLoader";
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
    if (!query.q.trim()) {
      setRedir(true);
    } else {
      axios.get('https://api.scryfall.com/cards/search', {
        params: {
          order: 'name',
          unique: 'cards',
          q: query.q,
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
            <div className="load">
              <div style={{ marginTop: '150px' }}>
                <PuffLoader
                size={150}
                color="#005E3A" 
                />
                <h2 style={{ color:'#005E3A', textAlign: 'center' }} >Fetching data</h2>
              </div>
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

  const multiSearchItem = cardArray[0].map((card, i) => 
    <div className="multiCardItem" key={ card.id } >
      <a href={`/search?q=${ card.name }`} >
        { card.image_uris ?
          <img alt="" href={`/search?q=${ card.name }`} className="multiCardImg" src={ card.image_uris.normal } /> :

          card.card_faces ?
          <img alt="" href={`/search?q=${ card.name }`} className="multiCardImg" src={ card.card_faces[0].image_uris.normal } /> :

          <img alt="" href={`/search?q=${ card.name }`} src="https://cdn.download.ams.birds.cornell.edu/api/v1/asset/59953131/1800" />
        }
      </a>
      { (card.tcgplayer_id) ? [
        <>
          { card.prices.usd &&
            <a
            className="multiCard"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://shop.tcgplayer.com/product/productsearch?id=${card.tcgplayer_id}&utm_campaign=affiliate&utm_medium=MTGInvestorsGrail&utm_source=MTGInvestorsGrail`}
            >
              Buy non-foil: { card.prices.usd }
            </a>
          } { card.prices.usd_foil &&
            <a
            className="multiCard"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://shop.tcgplayer.com/product/productsearch?id=${card.tcgplayer_id}&utm_campaign=affiliate&utm_medium=MTGInvestorsGrail&utm_source=MTGInvestorsGrail`}
            >
              Buy foil: { card.prices.usd_foil }
            </a>
          }
        </>
        ] : 
        <p className="multiCard">
          Purchase not available
        </p>
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