import React from "react";
import Image from "../img/bannerimg.png";
import Banner from "../img/bannerbueno.png";

import "../index.css";
function NavApp() {
  return (
    <nav>
      <a href="./login">
        <img src={Banner} className="img-fluid" alt="Banner" />

        <img src={Image} className="img-fluid" alt="ImageEscorial" />
      </a>
    </nav>
  );
}

export default NavApp;
