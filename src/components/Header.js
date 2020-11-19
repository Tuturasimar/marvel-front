import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="container">
        <Link to="/">
          <button>Personnages</button>
        </Link>
        <Link to="/comics">
          <button>Comics</button>
        </Link>
      </div>
    </>
  );
};

export default Header;
