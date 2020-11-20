import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Marvel_Universe.png";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="logo">
            <img src={Logo} alt="logo"></img>
            <div className="header_bouton">
              <Link className="no_link" to="/">
                <p>Personnages</p>
              </Link>
              <Link className="no_link" to="/comics">
                <p>Comics</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
