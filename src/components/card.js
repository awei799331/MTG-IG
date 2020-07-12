import React, { useState, useEffect } from 'react';
import { Redirect, useParams, BrowserRouter as Route, Link } from 'react-router-dom'; // eslint-disable-line
import axios from 'axios';
import styled from 'styled-components';
import PuffLoader from "react-spinners/PuffLoader";
import '../css/App.css';
import '../css/search.css';
import NavBar from './navbar';
import Footer from './footer';
import BG from './background';
import { fixedEncodeURIComponent } from '../utils/utils';

function Card() {
  let { id } = useParams();
  const [redir, setRedir] = useState(false);
  const [cardSide, setCardSide] = useState(0);
  const [response, setResponse] = useState({});
  const [renderType, setRenderType] = useState('loading');
  useEffect(() => {
    if (id === '') {
      setRedir(true);
    } else {
      axios.get(`https://api.scryfall.com/cards/${ id }`, {
        params: {
          format: 'json'
        }
        })
        .then(res => {
          setResponse(res.data);
          return res.data;
        })
        .then(res => {
          if (res.object === 'card') {
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
  }, [id]);

  function flipCard() {
    setCardSide(cardSide === 0 ? 1 : 0);
  }

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

            renderType === 'single' ?
            <div className="singleCard">
              { response.image_uris ?
                <>
                  <img alt="card" className="cardImg" src={ response.image_uris.normal } />
                  <div className="cardData">
                    <CardName>
                      { response.name }
                    </CardName>
                    <CardType>
                      { response.type_line }
                    </CardType>
                    { response.oracle_text.split('\n').map((str, index) => {
                      return <CardDesc key={index}>{ str }</CardDesc>;
                    }) }
                    <CardFlavor>
                      { response.flavor_text }
                    </CardFlavor>
                    { (response.power && response.toughness) &&
                      <PT>
                        Power / Toughness:&nbsp;
                        <span>{ response.power }</span>&nbsp;/&nbsp;
                        <span>{ response.toughness }</span>
                      </PT>
                    }
                    <Link to={`/search?q=oracle_id%3A${ fixedEncodeURIComponent(response.oracle_id) }&unique=prints`} >
                      <button>
                        <span>Search for all printings</span>
                      </button>
                    </Link>
                  </div>
                </> :

                response.card_faces ?
                <>
                  <ImageWrapper>
                    <FlipImg alt="card" src={ response.card_faces[cardSide].image_uris.normal } />
                    <button onClick={ flipCard }>Flip</button>
                  </ImageWrapper>
                  <div className="cardData">
                    <CardName>
                      { response.card_faces[cardSide].name }
                    </CardName>
                    <CardType>
                      { response.card_faces[cardSide].type_line }
                    </CardType>
                    { response.card_faces[cardSide].oracle_text.split('\n').map((str, index) => {
                      return <CardDesc key={index}>{ str }</CardDesc>;
                    }) }
                    <CardFlavor>
                      { response.card_faces[cardSide].flavor_text }
                    </CardFlavor>
                    { (response.card_faces[cardSide].power && response.card_faces[cardSide].toughness) &&
                      <PT>
                        Power / Toughness:&nbsp;
                        <span>{ response.card_faces[cardSide].power }</span>&nbsp;/&nbsp;
                        <span>{ response.card_faces[cardSide].toughness }</span>
                      </PT>
                    }
                    <Link to={`/search?q=oracle_id%3A${ fixedEncodeURIComponent(response.oracle_id) }&unique=prints`} >
                      <button>
                        <span>Search for all printings</span>
                      </button>
                    </Link>
                  </div>
                </> :

                <img alt="No data" className="cardImg" />
              }
              <div className="graph">
                Graphs under construction
              </div>
            </div> :

            renderType === 'none' ?
            <div className="singleCard">
              No card data found
            </div> :

            <div />
          }

        </div>
        <Footer />
      </div>
    </>
  );
}

const ImageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 25px;
`;

const FlipImg = styled.img`
  width: 100%;
  height: 100%;
  max-width: 366px;
  max-height: 510px;
  border-radius: 4.75% / 3.75%;
  align-self: flex-start;
  box-shadow: 0px 0px 10px 2px rgba(44, 44, 50, 0.3);
`;

const CardName = styled.p`
  font-size: 32px;
  font-weight: 700;
  line-height: 36px;
  margin: 0;
  padding: 32px;
  border-top: 4px solid #00623a;
  border-bottom: 1px solid #d6d6d6;
`;

const CardType = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: #b3b3b3;
  margin: 0 32px;
  line-height: 24px;
  padding: 32px 0;
  border-bottom: 1px solid #d6d6d6;
`;

const CardDesc = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  margin: 0;
  padding: 16px 32px 0;
  white-space: pre-line;
`;

const CardFlavor = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: Noto Serif, serif;
  font-style: italic;
  color: #000000;
  margin: 0;
  padding: 32px;
  border-bottom: 1px solid #d6d6d6;
  white-space: pre-line;
`;

const PT = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  margin: 0;
  padding: 16px 32px 16px;
  white-space: pre-line;
  border-bottom: 1px solid #d6d6d6;
`;

export { Card as default };