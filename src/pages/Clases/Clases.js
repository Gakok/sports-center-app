import React, { useState } from "react";
import "./Clases.css";
import NavApp from "../../components/NavApp";
import FooterApp from "../../components/FooterApp";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../context/authContext";
import { db } from "./../../firebase";
import { collection, addDoc } from "firebase/firestore";

function Clases() {
  const { user, logout, loading } = useAuth();

  const [claseSeleccionada, setClaseSeleccionada] = useState("");

  function inscripcionClase() {
    setClaseSeleccionada("");

    addDoc(collection(db, "clases"), {
      clase: claseSeleccionada,
      usuario: user.email,
    });
  }

  function seleccionarInscripcionClase(e) {
    setClaseSeleccionada(e.target.value);
  }

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

  const LogAlquilerbarra = (
    <a href="./Alquiler">
      <button id="logout">Alquiler de Pistas</button>
    </a>
  );

  const LogSelectClase = (
    <center>
      <div className="form-clases">
        <form>
          <br></br>
          <select
            value={claseSeleccionada}
            onChange={seleccionarInscripcionClase}
          >
            <option value="">Seleccione la clase</option>
            <option value="Yoga">Yoga</option>
            <option value="Pilates">Pilates</option>
            <option value="Ciclo Indoor">Ciclo Indoor</option>
            <option value="Zumba">Zumba</option>
            <option value="Kárate">Kárate</option>
            <option value="Bádminton">Bádminton</option>
            <option value="Tenis">Tenis</option>
            <option value="Pádel">Pádel</option>
          </select>
          <br></br>
          <Button onClick={inscripcionClase} variant="success" id="botonins">
            Inscribirse
          </Button>{" "}
        </form>
      </div>
    </center>
  );

  const MisReservas = (
    <a href="./Usuario">
      <button id="logout">Mi Perfil</button>
    </a>
  );
  return (
    <div className="Clases">
      <NavApp />
      <div className="nav">
        <h4>{user ? user.displayName || user.email : ""}</h4>
        {user ? MisReservas : ""}
        {user ? LogAlquilerbarra : ""}
        <a href="./Matches">
          <button id="logout">Resultados</button>
        </a>
        {user ? LogOut : ""}
      </div>
      <center>
        <div className="col-12" id="titulo">
          <h2>Clases que Impartimos</h2>
        </div>
      </center>
      <div className="variedad-clases">
        <p>Yoga: Lunes y Miércoles: 19:00-20:00</p>
        <p>Pilates: Martes y Jueves: 19:00-20:00</p>
        <p>Ciclo Indoor: Lunes y Miercoles: 20:00-21:00</p>
        <p>Zumba: Martes y Jueves: 19:00-21:00</p>
        <p>Kárate: Martes y Jueves: 20:00-21:00</p>
        <p>Bádminton: Lunes y Miércoles: 18:00-20:00</p>
        <p>Tenis: Lunes, Miércoles y Viernes: 17:00-20:00</p>
        <p>Pádel: Lunes, Miércoles y Viernes: 16:00-21:00</p>
      </div>
      {user ? LogSelectClase : ""}

      <FooterApp />
    </div>
  );
}

export default Clases;
