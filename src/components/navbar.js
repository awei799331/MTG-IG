import React, { useEffect } from 'react';
import '../css/App.css';
import '../css/animations.css';

function NavBar(props) {
  useEffect(() => {
    if (props.active) {
      document.getElementById(props.active).classList.add('navtext-active');
    }
    let navbarClasses = document.getElementsByClassName("navtext");
    navbarClasses = [...navbarClasses];
    navbarClasses.forEach(element => {
      if (!element.classList.contains("navtext-active")) {
        element.addEventListener("mouseover", (e) => {
          element.classList.remove("navbarUnhovered")
          element.classList.add("navbarHovered")
        })
        element.addEventListener("mouseout", (e) => {
          element.classList.add("navbarUnhovered")
          element.classList.remove("navbarHovered")
        })
      }
    });
  });

  return (
    <>
      <nav>
        <ul className="navbar">
          <li id="navhome" className="navtext navtext-left"><a href="/">MTG Investor's Grail</a></li>
          <li id="navlogout" className="navtext"><a href="/">Log out</a></li>
          <li id="navprofile" className="navtext"><a href="/">Profile</a></li>
          <li id="navregister" className="navtext"><a href="/">Register</a></li>
          <li id="navlogin" className="navtext"><a href="/">Login</a></li>
          <li id="navcontact" className="navtext"><a href="/">Contact</a></li>
          <li id="navabout" className="navtext"><a href="/">About</a></li>
          <li id="navhowitworks" className="navtext"><a href="/">How it Works</a></li>
        </ul>
      </nav>
    </>
  );
}

export { NavBar as default };