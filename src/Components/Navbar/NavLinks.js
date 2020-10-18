import React from "react";
import {Link} from "react-router-dom";

export const NavLinks = () => {
  return (
    <>
      <Link to="/">
        Главная
      </Link>
      <Link to="/create">
        Создать
      </Link>
    </>
  );
};