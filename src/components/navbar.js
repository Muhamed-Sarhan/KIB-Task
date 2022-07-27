import React from "react";
import kib from "../assets/logo-kib.svg";
import ms14 from "../assets/mylogo.png";
const NavbarComp = () => {
  return (
    <>
      <nav className="navbar-container">
        <img width={50} src={ms14} alt="logo" />
        <p>MS14 KIB Task</p>
        <img width={100} src={kib} alt="kib" />
      </nav>
    </>
  );
};

export default NavbarComp;
