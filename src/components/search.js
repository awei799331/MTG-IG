import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom'; // eslint-disable-line
import axios from 'axios';
import queryString from 'query-string';
import PuffLoader from "react-spinners/PuffLoader";
import { animated, useTrail } from 'react-spring';
import styled from 'styled-components';

import '../css/App.css';
import '../css/search.css';
import NavBar from './navbar';
import Footer from './footer';
import BG from './background';
import { fixedEncodeURIComponent, decodeQueryParam } from '../utils/utils';

function Search(props) {
  const [redir, setRedir] = useState(false);
  const [response, setResponse] = useState({});
  const [renderType, setRenderType] = useState('loading');
  useEffect(() => {
    const query = queryString.parse(props.location.search);
    for (let prop in query) {
      query[prop] = decodeQueryParam(query[prop]);
    }
    if (query.q.trim() === '') {
      setRedir(true);
    } else {
      axios.get('https://api.scryfall.com/cards/search', {
        params: {
          order: 'name',
          unique: query.unique ? query.unique: 'card',
          q: query.q ? query.q : '',
          page: query.q ? query.q : 1
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
  }, [props.location.search]);

  return(
    <>
      <div className="wrapper">
      <BG />
        <div className="content">
          <NavBar />

          { redir ?
            <Redirect to='/' /> :
            
            renderType === 'loading' ?
            <div className="load">
              <div style={{ marginTop: '150px' }}>
                <PuffLoader
                size={150}
                color="#005E3A"
                />
                <h2 style={{ color:'#005E3A', textAlign: 'center' }} >Fetching data</h2>
              </div>
            </div> :

            renderType === 'multi' ?
            <MultiSearch data={ response } /> :

            renderType === 'single' ?
            <Redirect to={`/card/${ fixedEncodeURIComponent(response.data[0].id) }`} /> :
            
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

  const trail = useTrail(cardArray[0].length, {
    config: { tension: 2000, friction: 150, delay: 100 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  const multiSearchItem = trail.map((card, i) => 
    <animated.div style={ card } className="multiCardItem" key={ cardArray[0][i].id } >
      <LinkWrapper to={`/card/${ fixedEncodeURIComponent(cardArray[0][i].id) }`} >
        { cardArray[0][i].image_uris ?
          <img alt="" className="multiCardImg" src={ cardArray[0][i].image_uris.normal } /> :

          cardArray[0][i].card_faces ?
          <img alt="" className="multiCardImg" src={ cardArray[0][i].card_faces[0].image_uris.normal } /> :

          <img alt="" className="multiCardImg" />
        }
      </LinkWrapper>
      { (cardArray[0][i].tcgplayer_id) ? [
        <>
          { cardArray[0][i].prices.usd &&
            <a
            className="multiCard"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://shop.tcgplayer.com/product/productsearch?id=${card.tcgplayer_id}&utm_campaign=affiliate&utm_medium=MTGInvestorsGrail&utm_source=MTGInvestorsGrail`}
            ><strong>
              Buy non-foil:&nbsp;
              <span style={{ color: "#00623B"}} >
                ${ cardArray[0][i].prices.usd } USD
              </span>
            </strong></a>
          } 
          { cardArray[0][i].prices.usd_foil &&
            <a
            className="multiCard"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://shop.tcgplayer.com/product/productsearch?id=${card.tcgplayer_id}&utm_campaign=affiliate&utm_medium=MTGInvestorsGrail&utm_source=MTGInvestorsGrail`}
            ><strong>
              Buy foil:&nbsp;
              <span style={{ color: "#00623B"}} >
                ${ cardArray[0][i].prices.usd_foil } USD
              </span>
            </strong></a>
          }
        </>
        ] : 
        <p className="multiCard">
          Purchase not available
        </p>
      }
    </animated.div>
  );

  return(
    <div className="multiSearch">
      { multiSearchItem }
    </div>
  );
}

const LinkWrapper = styled(Link)`
  margin: 10px auto;
  height: 340px;
`;

export { Search as default };