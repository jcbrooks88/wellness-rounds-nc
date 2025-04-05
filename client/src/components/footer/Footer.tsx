import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="Footer">
      <div>
        <p>
          &copy; {new Date().getFullYear()} Get Social, Network. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
