import React, { useEffect, useState } from 'react';
import '../css/App.css';
import Background1 from '../img/background1.jpg';
import Background2 from '../img/background2.jpg';
import Background3 from '../img/background3.jpg';
import Background4 from '../img/background4.jpg';
import Background5 from '../img/background5.jpg';
import Background6 from '../img/background6.jpg';
import Background7 from '../img/background7.jpg';
import Background8 from '../img/background8.jpg';
import Background9 from '../img/background9.jpg';
import Background10 from '../img/background10.jpg';

function BG() {
  const [backgroundImage, setBackgroundImage] = useState('');
  useEffect(() => {
    const bgArray = [
      Background1,Background2,Background3,Background4,Background5,
      Background6,Background7,Background8,Background9,Background10
    ];
    setBackgroundImage(bgArray[Math.floor(Math.random() * bgArray.length)]);
  }, []);

  return(
    <div className="background" style={{ backgroundImage: `url(${ backgroundImage })` }}>
    </div>
  );
}

export { BG as default };