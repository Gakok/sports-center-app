import React from "react";
import "./Login.css";
import NavApp from "../../components/NavApp";
import LoginComponent from "../../components/Login";
import FooterApp from "../../components/FooterApp";

function Login() {
  return (
    <div className="Login">
      <NavApp />
      <LoginComponent />

      <FooterApp />
    </div>
  );
}

export default Login;
