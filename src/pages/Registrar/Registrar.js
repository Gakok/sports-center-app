import React from "react";
import "./Registrar.css";
import RegisterComponent from "../../components/Register";
import NavApp from "../../components/NavApp";
import FooterApp from "../../components/FooterApp";

function Registrar() {
  return (
    <div className="Registrar">
      <NavApp />
      <RegisterComponent />
      <FooterApp />
    </div>
  );
}

export default Registrar;
