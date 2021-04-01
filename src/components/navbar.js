import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated, config } from "react-spring";
import styled from 'styled-components';
import '../css/App.css';
import Logo256 from '../img/logo_256.png';

function NavBar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const barAnimation = useSpring({
    from: { transform: 'translate3d(0, -10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  });

  const LinkAnimation = useSpring({
    from: { transform: 'translate3d(800px, 0, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 800,
    config: config.gentle,
  });

  const mobileTransform = useSpring({
    top: navbarOpen ? '50px' : '-500px',
  });

  function handleNavbar() {
    setNavbarOpen(!navbarOpen);
  }

  return (
    <>
      <Nav style={ barAnimation }>
        <Container>
          <Logo />
          <NavBarWrapper style={ LinkAnimation } className="navbar">
            <li className="navtext"><NavLink to="/how-it-works">How it Works</NavLink></li>
            <li className="navtext"><NavLink to="/about">About</NavLink></li>
            <li className="navtext"><NavLink to="/contact">Contact</NavLink></li>
            <li className="navtext"><NavLink to="/profile">Profile</NavLink></li>
            <li className="navtext"><NavLink to="/login">Login</NavLink></li>
          </NavBarWrapper>
          <NavBurgerWrapper>
            <Burger
              navbarState={ navbarOpen } 
              handleNavbar={ handleNavbar }
            />
          </NavBurgerWrapper>
        </Container>
      </Nav>
      <CollapseWrapper style={ mobileTransform }>
        <CollapseNavLinks>
          <li><NavLink to="/howItWorks">How it Works</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
        </CollapseNavLinks>
      </CollapseWrapper>
    </>
  );
}

function Logo() {
  return(
    <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', paddingLeft: '10px' }}>
      <a href="/">
        <LogoImg alt="logo" src={ Logo256 } />
      </a>
      <div className="navtext navtext-logo">
        <a href="/">MTG Investor's Grail</a>
      </div>
    </div>
  );
}

function Burger(props) {
  return(
    <BurgerWrapper onClick={ props.handleNavbar }>
      <div>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </div>
    </BurgerWrapper>
  );
}

const LogoImg = styled.img`
  width: 32px;
  height: 32px;
`;

const Nav = styled(animated.div)`
  font-size: 14px;
  z-index: 10;
`;

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0;
  height: auto;
  background-color: #222222;
`;

const NavBarWrapper = styled(animated.ul)`
  @media (max-width: 767px) {
    display: none;
  }
`;

const NavBurgerWrapper = styled.div`
  margin: auto 0;
  float: right;
  justify-self: flex-end;
  display: block;
  @media (min-width: 767px) {
    display: none;
  }
`;

const BurgerWrapper = styled.div`
  position: relative;
  padding-top: 10px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  & span {
    background: #ffffff;
    display: block;
    position: relative;
    width: 33px;
    height: 3px;
    margin: 0 20px 10px 20px;
  }
`;

const CollapseWrapper = styled(animated.div)`
  background: #333333;
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 9;
  @media (min-width: 767px) {
    display: none;
  }
`;

const CollapseNavLinks = styled.ul`
  list-style-type: none;
  padding: 28px;
  width: 100vw;

  & a {
    font-size: 14px;
    font-weight: bold;
    line-height: 2;
    color: #ffffff;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #009358;
    }
  }
`;

export { NavBar as default };