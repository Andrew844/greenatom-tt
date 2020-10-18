import React from "react";
import {NavLinks} from "./NavLinks";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLinks/>
        </div>
      </div>
    </nav>
  );
};