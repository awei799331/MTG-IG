import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated, config } from "react-spring";
import styled from 'styled-components';
import '../css/App.css';
import '../css/animations.css';

function NavBar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    let navbarClasses = document.getElementsByClassName("navtext");
    navbarClasses = [...navbarClasses];
    navbarClasses.forEach(element => {
      element.addEventListener("mouseover", (e) => {
        element.classList.remove("navbarUnhovered")
        element.classList.add("navbarHovered")
      })
      element.addEventListener("mouseout", (e) => {
        element.classList.add("navbarUnhovered")
        element.classList.remove("navbarHovered")
      })
    });
  });

  const barAnimation = useSpring({
    from: { transform: 'translate3d(0, -10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  });

  const linkAnimation = useSpring({
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
      <animated.nav style={ barAnimation }>
        <Container>
          <Logo />
          <animated.ul style={ linkAnimation } className="navbar">
            <li className="navtext unfocused"><Link to="/login">Profile</Link></li>
            <li className="navtext unfocused"><Link to="/">Login</Link></li>
            <li className="navtext unfocused"><Link to="/">Contact</Link></li>
            <li className="navtext unfocused"><Link to="/">About</Link></li>
            <li className="navtext unfocused"><Link to="/">How it Works</Link></li>
          </animated.ul>
          <NavBurgerWrapper>
            <Burger
              navbarState={ navbarOpen } 
              handleNavbar={ handleNavbar }
            />
          </NavBurgerWrapper>
        </Container>
      </animated.nav>
      <CollapseMenu
        navbarState={ navbarOpen }
        handleNavbar={ handleNavbar }
      />
    </>
  );
}

function Logo() {
  return(
    <div className="navtext unfocused">
      <a href="/">MTG Investor's Grail</a>
    </div>
  );
}

const CollapseMenu = (props) => {
  if (props.navbarState === true) {
    return (
      <CollapseWrapper>
        <CollapseNavLinks>
          <li><Link to="/">MTG Investor's Grail</Link></li>
          <li><Link to="/">Profile</Link></li>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/">Contact</Link></li>
          <li><Link to="/">About</Link></li>
          <li><Link to="/">How it Works</Link></li>
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

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  height: 50px;
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
    transition: all ease-in-out 0.2s;
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

  & li {
    transition: all 300ms linear 0s;
  }

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