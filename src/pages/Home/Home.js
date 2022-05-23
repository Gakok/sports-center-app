import React from "react";
import "./Home.css";
import NavApp from "../../components/NavApp";
import FooterApp from "../../components/FooterApp";
import Resultados from "../../img/resultados1.png";
import Clases from "../../img/clases.png";
import Alquiler from "../../img/alquiler1.png";
import { useAuth } from "../../context/authContext";

function Home() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <h1>Loading</h1>;

  const LogOut = (
    <a id="log" href="./login">
      <button onClick={handleLogout} id="logout">
        Cerrar Sesión
      </button>
    </a>
  );

  const LogAlquiler = (
    <div className="alquiler">
      <a href="./Alquiler">
        <img src={Alquiler} alt="Alquiler"></img>
      </a>
      <h3>Alquiler de Pistas</h3>
    </div>
  );

  const MisReservas = (
    <a href="./Usuario">
      <button id="logout">Mi Perfil</button>
    </a>
  );

  return (
    <div className="Home">
      <NavApp />
      <div className="nav">
        <h4>{user ? user.displayName || user.email : ""}</h4>
        {user ? MisReservas : ""}
        {user ? LogOut : ""}
      </div>
      <div className="container-fluid">
        <div id="opciones">
          <div className="resultados">
            <a href="./Matches">
              <img src={Resultados} alt="Resultados"></img>
            </a>
            <h3>Resultados</h3>
          </div>
          <div className="clases">
            <a href="./Clases">
              <img src={Clases} alt="Clases"></img>
            </a>
            <h3>Clases</h3>
          </div>
          {user ? LogAlquiler : ""}
        </div>
      </div>
      
        <FooterApp />
      
    </div>
  );
}

export default Home;
