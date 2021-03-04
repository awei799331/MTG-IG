import React, { useState, useEffect } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import PuffLoader from "react-spinners/PuffLoader";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import '../css/App.css';
import '../css/search.css';
import NavBar from './navbar';
import Footer from './footer';
import BG from './background';
import { fixedEncodeURIComponent } from '../utils/utils';
import { SearchBar } from './searchBar';

function Card() {
  const { id } = useParams();
  const [redir, setRedir] = useState(false);
  const [cardSide, setCardSide] = useState(0);
  const [response, setResponse] = useState({});
  const [renderType, setRenderType] = useState('loading');

  const sampleFakeCardData = [
    {date: "Feb 27, 2021", price: 5.00}, {date: "Feb 28, 2021", price: 6.00}, {date: "Mar 1, 2021", price: 10.00}, {date: "Mar 2, 2021", price: 3.00}
  ];

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
        .catch(() => {
          setRenderType('none');
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
              <Redirect to="/" /> :
              renderType === 'loading' ? (
              <div className="load">
                <div style={{ marginTop: '150px' }}>
                  <PuffLoader
                    size={150}
                    color="#005E3A"
                  />
                  <h2 style={{ color: '#005E3A', textAlign: 'center' }} >Fetching data</h2>
                </div>
              </div>
              ) :

                renderType === 'single' ? (
              <div className="singleWrapper">
                <Info>
                  <SearchBar />
                </Info>
                <div className="singleCard">
                  { response.image_uris ? (
                  <ImageWrapper>
                    <FlipImg alt="card" src={response.image_uris.normal} />
                  </ImageWrapper>
                  ) : (
                  <ImageWrapper>
                    <FlipImg alt="card" src={response.card_faces[cardSide].image_uris.normal} />
                    <ButtonWrapper>
                      <FlipButton onClick={flipCard}>
                        <p>Flip</p>
                      </FlipButton>
                    </ButtonWrapper>
                  </ImageWrapper>
                  )}

                  { !response.card_faces ? (
                    <>
                      <div className="cardData">
                        <CardName>
                          { response.name }
                        </CardName>
                        <CardType>
                          { response.type_line }
                        </CardType>
                        { response.oracle_text.split('\n').map((str) => <CardDesc>{ str }</CardDesc>) }
                        <CardFlavor>
                          { response.flavor_text }
                        </CardFlavor>
                        { (response.power && response.toughness) && (
                          <PT>
                            <b>Power / Toughness:&nbsp;</b>
                            <span>{ response.power }</span>
                            &nbsp;/&nbsp;
                            <span>{ response.toughness }</span>
                          </PT>
                        )}
                      </div>
                    </>
                  ) :

                    response.card_faces ? (
                    <>
                      <div className="cardData">
                        <CardName>
                          { response.card_faces[cardSide].name }
                        </CardName>
                        <CardType>
                          { response.card_faces[cardSide].type_line }
                        </CardType>
                        { response.card_faces[cardSide].oracle_text.split('\n').map(str => <CardDesc>{ str }</CardDesc>) }
                        <CardFlavor>
                          { response.card_faces[cardSide].flavor_text }
                        </CardFlavor>
                        { (response.card_faces[cardSide].power && response.card_faces[cardSide].toughness) && (
                          <PT>
                            <b>Power / Toughness:&nbsp;</b>
                            <span>{ response.card_faces[cardSide].power }</span>
                            &nbsp;/&nbsp;
                            <span>{ response.card_faces[cardSide].toughness }</span>
                          </PT>
                        )}
                      </div>
                    </>
                    ) : <div />
                  }
                  <UtilityWrapper>
                    <PricesWrapper>
                      <PricesHeader>Purchase on TCGPlayer</PricesHeader>
                        { response.prices.usd !== null ? (
                          <PriceText>
                            ${response.prices.usd}&nbsp;USD
                          </PriceText>
                        ) :
                          response.prices.usd_foil !== null ? (
                          <PriceText>
                            ${response.prices.usd_foil}&nbsp;USD
                          </PriceText>
                          ) :
                          <PriceText>Price not available</PriceText>}
                        <PriceButtonWrapper>
                        { response.prices.usd !== null && (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://shop.tcgplayer.com/product/productsearch?id=${response.tcgplayer_id}&utm_campaign=affiliate&utm_medium=MTGInvestorsGrail&utm_source=MTGInvestorsGrail`}
                          >
                            <PricesButton><p>Buy</p></PricesButton>
                          </a>
                        )}
                        { response.prices.usd_foil !== null && (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://shop.tcgplayer.com/product/productsearch?id=${response.tcgplayer_id}&utm_campaign=affiliate&utm_medium=MTGInvestorsGrail&utm_source=MTGInvestorsGrail`}
                          >
                            <PricesButton><p>Buy Foil</p></PricesButton>
                          </a>
                        )}
                        </PriceButtonWrapper>
                    </PricesWrapper>
                    <Utility>
                      <PricesHeader>
                        Helpful Links
                      </PricesHeader>
                      <UtilityText to={`/search?q=oracle_id%3A${ fixedEncodeURIComponent(response.oracle_id) }&unique=prints&redirected=true`}>
                        View all printings of this card
                      </UtilityText>
                      <UtilityText to={`/search?q=set%3A${ fixedEncodeURIComponent(response.set) }&unique=prints&redirected=true`}>
                        View all cards in set
                      </UtilityText>
                      <UtilityText to={`/search?q=oracle_id%3A${ fixedEncodeURIComponent(response.oracle_id) }+lang%3Aany&unique=prints&redirected=true`}>
                        View all languages
                      </UtilityText>
                      <UtilityText to={`/search?q=oracle_id%3A${ fixedEncodeURIComponent(response.oracle_id) }+lang%3Aany&unique=prints&redirected=true`}>
                        Report a problem (Currently not working)
                      </UtilityText>
                    </Utility>
                  </UtilityWrapper>
                  <div className="graph">
                    <LineChart width={600} height={300} data={ sampleFakeCardData } margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <Line type="monotone" dataKey="price" stroke="#8884d8" />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                    </LineChart>
                  </div>
                </div>
              </div>
                ) :

                  renderType === 'none' ? (
              <div className="singleCard">
                No card data found
              </div>
                  ) :

              <div />}
          </div>
          <Footer />
      </div>
    </>
  );
}

const Info = styled.div`
  width: 56.25%;
  margin: 0 21.875%;
  padding-top: 50px;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start:
  justify-content: flex-start;

  @media (max-width: 767px) {
    width: 75%;
    margin: 0 12.5%;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 25px 0;
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
  color: #a2a2a2;
  margin: 0 32px;
  line-height: 24px;
  padding: 32px 0;
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
  color: #000000;
  margin: 0;
  padding: 16px 32px 16px;
  border-bottom: 1px solid #d6d6d6;
  
  & strong {
    font-weight: 700;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & > :only-child {
    margin: 16px auto;
  }

  & > a {
    margin: 0;
  }
`;

const FlipButton = styled.div`
  margin: 16px;
  background-color: #00623a;
  border: none;
  text-decoration: none;
  width: 65px;
  height: 39px;
  cursor: pointer;
  line-height: 39px;
  position: relative;
  overflow: hidden;
  z-index: 0;
  user-select: none;

  & > p {
    font-size: 14px;
    font-weight: 700;
    margin: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #fff;
    z-index: 1;
    position: relative;
    transition: all 0.5s ease;
  }

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    background-color: #00c474;
    position: absolute;
    transition: all 0.5s ease;
    top: 0;
    left: -100%;
    z-index: 0;
  }

  &:hover:before {
    left: 0;
  }
`;

const UtilityWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  margin: 0 0 25px 0;
  width: 100%;
  max-width: 366px;
`;

const PricesWrapper = styled.div`
  background-color: #f6f6ff;
  border: 1px solid #d6d6d6;
  border-top: none;
  width: 100%;
`;

const PriceButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-evenly;
  background-color: #f6f6ff;
  border-bottom: 1px solid #d6d6d6;
  border-top: none;
  padding: 0 25px 25px;
  max-width: 400px;
`;

const PricesButton = styled.div`
  background-color: #00623a;
  border: none;
  text-decoration: none;
  width: 100px;
  height: 39px;
  line-height: 39px;
  position: relative;
  overflow: hidden;
  z-index: 0;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    background-color: #00c474;
    position: absolute;
    transition: all 0.35s ease;
    top: 0;
    left: -100%;
    z-index: 0;
  }

  & > p {
    font-size: 14px;
    font-weight: 700;
    margin: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #fff;
    z-index: 1;
    position: relative;
  }

  &:hover:before {
    left: 0;
  }
`;

const PricesHeader = styled.p`
  margin: 0;
  padding: 4px;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  border-top: 4px solid #00623a;
`;

const PriceText = styled.p`
  margin: 0;
  padding: 32px;
  font-size: 40px;
  border-top: 1px solid #d6d6d6;
  font-weight: 700;
  text-align: center;
`;

const Utility = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  background-color: #f6f6ff;
  border: 1px solid #d6d6d6;
  border-top: none;
  width: 100%;
  max-width: 366px;
  margin-top: 25px;
`;

const UtilityText = styled(Link)`
  margin: 0;
  padding: 6px;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  text-decoration: none;
  color: #222222;
  border-top: 1px solid #d6d6d6;

  &:hover {
    background-color: #c4c4c4;
  }
`;

export { Card as default };
