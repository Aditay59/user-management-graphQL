import React from 'react';
import '../styles/Notfound.css'
import { Link } from 'react-router-dom';

const NotFound:React.FC = () => {
    return (
        <div className="funny-404">
          <h1>404</h1>
          <p>Oops! You seem lost...</p>
          <img
            src="https://i.imgur.com/oCkEbrA.png"
            alt="Confused character"
            className="funny-img"
          />
          <p>
            It's okay, even the best explorers get lost sometimes. Let's get you
            <Link to={"/"} className="home-link"> back home</Link>.
          </p>
        </div>
      );
}

export default NotFound;