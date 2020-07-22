import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated, config } from "react-spring";
import styled from 'styled-components';
import '../css/App.css';

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

  function handleNavbar() {
    setNavbarOpen(!navbarOpen);
  }

  return (
    <>
      <Nav style={ barAnimation }>
        <Container>
          <Logo />
          <animated.ul style={ LinkAnimation } className="navbar">
            <li className="navtext"><NavLink to="/howItWorks">How it Works</NavLink></li>
            <li className="navtext"><NavLink to="/about">About</NavLink></li>
            <li className="navtext"><NavLink to="/contact">Contact</NavLink></li>
            <li className="navtext"><NavLink to="/profile">Profile</NavLink></li>
            <li className="navtext"><NavLink to="/login">Login</NavLink></li>
          </animated.ul>
          <NavBurgerWrapper>
            <Burger
              navbarState={ navbarOpen } 
              handleNavbar={ handleNavbar }
            />
          </NavBurgerWrapper>
        </Container>
      </Nav>
      <CollapseMenu
        navbarState={ navbarOpen }
        handleNavbar={ handleNavbar }
      />
    </>
  );
}

function Logo() {
  return(
    <div className="navtext">
      <a href="/">MTG Investor's Grail</a>
    </div>
  );
}

const CollapseMenu = (props) => {
  if (props.navbarState === true) {
    return (
      <CollapseWrapper>
        <CollapseNavLinks>
          <li><NavLink to="/howItWorks">How it Works</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
        </CollapseNavLinks>
      </CollapseWrapper>
    );
  }
  return null;
};

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

const Nav = styled(animated.div)`
  font-size: 14px;
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

const CollapseWrapper = styled.div`
  background: #333333;
  position: fixed;
  top: 50px;
  left: 0;
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