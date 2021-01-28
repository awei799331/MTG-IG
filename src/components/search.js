import React, { useState, useEffect, useMemo } from 'react';
import { Redirect, Link } from 'react-router-dom';
import queryString from 'query-string';
import PuffLoader from "react-spinners/PuffLoader";
import { animated } from 'react-spring';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import '../css/App.css';
import '../css/search.css';
import NavBar from './navbar';
import Footer from './footer';
import BG from './background';
import { fixedEncodeURIComponent, decodeQueryParam } from '../utils/utils';
import { SearchBar } from './searchBar';
import { useSelector, useDispatch } from 'react-redux';
import { requestScryfall, selectUnique } from '../actions/index';

function Search(props) {
  const status = useSelector(state => state.responses.status);
  const errorMessage = useSelector(state => state.responses.errorMessage);
  const response = useSelector(state => state.responses.response);
  const dispatch = useDispatch();

  const query = useMemo(() => {
    const queryTemp = queryString.parse(props.location.search);
    for (let prop in queryTemp) {
      queryTemp[prop] = decodeQueryParam(queryTemp[prop]);
    }
    return {
      q: queryTemp.q,
      page: queryTemp.page ? parseInt(queryTemp.page) : 1,
      unique: queryTemp.unique ? queryTemp.unique: 'card'
    };
  }, [props.location.search]);

  useEffect(() => {
    dispatch(requestScryfall(query.q, query.unique, query.page));
    dispatch(selectUnique(query.unique));
  }, [query]);

  return(
    <>
      <div className="wrapper">
      <BG />
        <div className="content">
          <NavBar />
          { status === 'loading' ?
            <div className="load">
              <div style={{ marginTop: '150px' }}>
                <PuffLoader
                size={150}
                color="#005E3A"
                />
                <h2 style={{ color:'#005E3A', textAlign: 'center' }} >Fetching data</h2>
              </div>
            </div> :

            status === 'multi' ?
            <MultiSearch cards={ response } query={ query } /> :

            status === 'single' ?
            <Redirect to={`/card/${ fixedEncodeURIComponent(response.data[0].id) }`} /> :
            
            status === 'error' ?
            <div className="load">
              {{ errorMessage }}
            </div> :

            status === 'none' ?
            <div className="load">
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
  const query = useState(props.query);
  const response = useSelector(state => state.responses.response);

  const multiSearchItem = response.data.map((card, i) => 
    <animated.div style={ card } className="multiCardItem" key={ response.data[i].id } >
      <LinkWrapper to={`/card/${ fixedEncodeURIComponent(response.data[i].id) }`} >
        { response.data[i].image_uris ?
          <img alt="" className="multiCardImg" src={ response.data[i].image_uris.normal } /> :

          response.data[i].card_faces ?
          <img alt="" className="multiCardImg" src={ response.data[i].card_faces[0].image_uris.normal } /> :

          <img alt="" className="multiCardImg" />
        }
      </LinkWrapper>
      { (response.data[i].tcgplayer_id) ? [
        <>
          { response.data[i].prices.usd &&
            <a
            className="multiCard"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://shop.tcgplayer.com/product/productsearch?id=${response.data[i].tcgplayer_id}&utm_campaign=affiliate&utm_medium=MTGInvestorsGrail&utm_source=MTGInvestorsGrail`}
            ><strong>
              Buy non-foil:&nbsp;
              <span style={{ color: "#00623B"}} >
                ${ response.data[i].prices.usd } USD
              </span>
            </strong></a>
          }
          { response.data[i].prices.usd_foil &&
            <a
            className="multiCard"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://shop.tcgplayer.com/product/productsearch?id=${response.data[i].tcgplayer_id}&utm_campaign=affiliate&utm_medium=MTGInvestorsGrail&utm_source=MTGInvestorsGrail`}
            ><strong>
              Buy foil:&nbsp;
              <span style={{ color: "#00623B"}} >
                ${ response.data[i].prices.usd_foil } USD
              </span>
            </strong></a>
          }
          { !response.data[i].prices.usd && !response.data[i].prices.usd_foil &&
            <p className="multiCard">
              Purchase not available
            </p>
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
    <Wrapper>
      <Info>
          <SearchBar query/>
          <InfoFlex>
            <p>
              Showing results for: <b>{ query[0].q }</b>
            </p>
            { props.cards.has_more ? 
                <p>
                  { 175 * (query[0].page-1) + 1 } - { 175 * (query[0].page-1) + 175 } of { props.cards.total_cards }
                </p> :
                <p>
                  { 175 * (query[0].page-1) + 1 } - { props.cards.total_cards } of { props.cards.total_cards }
                </p>
            }
            
          </InfoFlex>
          <InfoFlex>
            <ButtonsFlex>
              Helo
            </ButtonsFlex>
            <Pagination totalCards={ props.cards.total_cards } query={ query[0] } />
          </InfoFlex>
          
        </Info>
      <div className="multiSearch">
        { multiSearchItem }
      </div>
    </Wrapper>
  );
}

function Pagination(props) {
  const maxPage = Math.ceil(props.totalCards / 175);

  return(
    <PaginationFlex>
      <InfoButton
      to={ `/search?q=${props.query.q}&page=${1}` }>
        &lt;&lt;
      </InfoButton>
      <InfoButton
      to={ `/search?q=${props.query.q}&page=${ Math.max(props.query.page - 1, 1) }` }>
        &lt;
      </InfoButton>
      <p>
        &nbsp;{ props.query.page }&nbsp;
      </p>
      <InfoButton to={ `/search?q=${props.query.q}&page=${ Math.min(props.query.page + 1, maxPage) }` }>
        &gt;
      </InfoButton>
      <InfoButton to={ `/search?q=${props.query.q}&page=${ maxPage }` }>
        &gt;&gt;
      </InfoButton>
    </PaginationFlex>
  );
}

const Wrapper = styled.div`
  background-color: #f2f2fd;
  width: 75%;
  padding-top: 50px;
  margin: 0 12.5%;
  min-height: calc(100vh - 250px);

  @media (max-width: 767px) {
    width: 100%;
    margin: 0;
  }
`;

const LinkWrapper = styled(Link)`
  margin: 10px auto;
  height: 340px;
`;

const InfoFlex = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const ButtonsFlex = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const PaginationFlex = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
`;

const InfoButton = styled(Link)`
  color: #222222;
  text-decoration: none;
  background: none;
  border: 1px solid #222222;
  border-radius: 2px;
  padding: 0 12px;
  margin: 0 3px;
  line-height: 18px;
`;

const Info = styled.div`
  width: 75%;
  margin: 0 12.5%;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start:
  justify-content: flex-start;
`;

MultiSearch.propTypes = {
  query: PropTypes.object.isRequired
}

Pagination.propTypes = {
  query: PropTypes.object.isRequired
}

export { Search as default };