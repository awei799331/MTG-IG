import React from 'react';
import '../css/App.css';

function Footer() {
  return(
    <footer className="footer">
      <p className="footertext">
        Parts of MTG Investor's Grail are unofficial fan content permitted under the Wizards of the Coast Fan Content Policy.
          <br />
          The literal and graphical content shown on this website about Magic: The Gathering, including card images, oracle text, etc. is
          copyright Wizards of the Coast, LLC, a subsidiary of Hasbro, Inc.
          <br />
          MTG Investor's Grail is not sponsored by, endorsed by, or affiliated with
          Wizards of the Coast.
      </p>
      <p className="footertext">
        Website created by Alexander Wei
      </p>
      <p className="footertext">
        Other content Copyright © 2019 MTG Investor's Grail
      </p>
    </footer>
  );
}

export { Footer as default };
