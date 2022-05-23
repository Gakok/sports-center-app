import React, { useEffect, useState } from "react";
import NavApp from "../../components/NavApp";
import FooterApp from "../../components/FooterApp";
import { db } from "./../../firebase";
import { useAuth } from "./../../context/authContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./Usuario.css";

function Usuario() {
  const { user, logout, loading } = useAuth();

  const [clasesUsuario, setclasesUsuario] = useState([]);
  const [alquileresUsuario, setAlquileresUsuario] = useState([]);

  const monthString = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];


  useEffect(() => {

    const clasesCollection = collection(db, "clases");
    const alquileresCollection = collection(db, "alquileres");

    async function getAlquileresReservas() {
      const todayObject = new Date();
      const qClases = query(
        clasesCollection,
        where("usuario", "==", user.email)
      );

      const qAlquileres = query(
        alquileresCollection,
        where("usuario", "==", user.email)
      );

      const dataClases = await getDocs(qClases);
      const dataReservas = await getDocs(qAlquileres);

      const a = dataClases.docs.map((doc) => ({ ...doc.data() }));
      const b = dataReservas.docs.map((doc) => ({ ...doc.data() }));

      const reservasProximas = b.filter(
        (alquiler) =>
          alquiler.mes > todayObject.getMonth() ||
          (alquiler.dia > todayObject.getDate() &&
            alquiler.mes === todayObject.getMonth())
      );

      setclasesUsuario(a);
      setAlquileresUsuario(reservasProximas);
    }

    getAlquileresReservas();
  }, [user]);

  const clasesList = clasesUsuario.map((clase) => {
    return <li key={clase.clase}>{clase.clase}</li>;
  });

  const AlquileresList = alquileresUsuario.map((alquiler) => {
    return (
      <li key={alquiler.instalacion + "-" + alquiler.hora + "-" + alquiler.dia}>
        Instalacion: {alquiler.instalacion} Dia: {alquiler.dia} Mes:{" "}
        {monthString[alquiler.mes]} Hora: {alquiler.hora}:00
      </li>
    );
  });
  if (loading) return <h1>Loading</h1>;
  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  }
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
  return (
    <div className="Usuario">
      <NavApp />
      <div className="nav">
        <h4>{user ? user.displayName || user.email : ""}</h4>
        {user ? LogAlquilerbarra : ""}
        <a href="./Matches">
          <button id="logout">Resultados</button>
        </a>
        <a href="./Clases">
          <button id="logout">Clases</button>
        </a>
        {user ? LogOut : ""}
      </div>

      <center className="mcenter">
        <h1>Clases</h1>
        <ul>
          {clasesUsuario.length > 0
            ? clasesList
            : "No estás inscrito a ninguna clase"}
        </ul>
        <h1>Alquileres</h1>
        <ul>
          {alquileresUsuario.length > 0
            ? AlquileresList
            : "No tienes ninguna pista alquilada"}
        </ul>
      </center>

      <FooterApp />
    </div>
  );
}

export default Usuario;
