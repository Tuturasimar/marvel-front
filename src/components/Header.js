import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Marvel_Universe.png";

const Header = () => {
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="logo">
            <img src={Logo} alt="logo"></img>
            <div className="header_bouton">
              <Link className="no_link" to="/">
                <p className="menu_bouton">Personnages</p>
              </Link>
              <Link className="no_link" to="/comics">
                <p className="menu_bouton">Comics</p>
              </Link>
              <Link className="no_link" to="/favoris">
                <p className="menu_bouton">Favoris</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
