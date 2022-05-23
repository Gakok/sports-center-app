import React, { useState, useEffect } from "react";
import NavApp from "../../components/NavApp";
import FooterApp from "../../components/FooterApp";
import { useAuth } from "../../context/authContext";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./../../firebase";
import "./Matches.css";

function Matches() {
  const { user, logout, loading } = useAuth();

  const [deporteSeleccionado, setDeporteSeleccionado] = useState("futbolSala");
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const jornadasCollection = collection(db, "jornadas");
    const resultadosCollection = collection(db, "resultados");

    async function getResultados() {
      const queryUltimaJornada = query(
        jornadasCollection,
        where("deporte", "==", deporteSeleccionado),
        orderBy("jornada", "desc"),
        limit(1)
      );

      const dataJornadas = await getDocs(queryUltimaJornada);

      const ultimaJornada = dataJornadas.docs[0].data().jornada;

      const queryResultados = query(
        resultadosCollection,
        where("deporte", "==", deporteSeleccionado),
        where("jornada", "==", ultimaJornada),
        orderBy("hora", "asc")
      );

      const consultaResultados = await getDocs(queryResultados);

      const a = consultaResultados.docs.map((doc) => ({ ...doc.data() }));

      setResultados(a);
    }
    getResultados();
  }, [deporteSeleccionado]);

  function seleccionarDeporte(e) {
    setDeporteSeleccionado(e.target.value);
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
  const MisReservas = (
    <a href="./Usuario">
      <button id="logout">Mi Perfil</button>
    </a>
  );

  const ResultadosList = resultados.map((resultado) => {
    return (
      <div key={resultado.hora+"-"+resultado.local} className="encuentro">
        <span className="left">{resultado.local}</span>{" "}
        <span className="medio">
          {resultado.resultadoLocal} &nbsp;{resultado.resultadoVisitante}
        </span>{" "}
        <span className="right">{resultado.visitante} </span>
      </div>
    );
  });

  return (
    <div className="Matches">
      <NavApp />
      <div className="nav">
        <h4>{user ? user.displayName || user.email : ""}</h4>
        {user ? MisReservas : ""}
        {user ? LogAlquilerbarra : ""}
        <a href="./Clases">
          <button id="logout">Clases</button>
        </a>

        {user ? LogOut : ""}
      </div>

      <center>
        <div className="col-12" id="titulo">
          <h2>Últimos Resultados</h2>
        </div>
        <div className="jornada">
          <form>
            <label>Seleccionar deporte: </label>
            <select
              className="optiondep"
              value={deporteSeleccionado}
              onChange={seleccionarDeporte}
            >
              <option value="futbolSala">Fútbol Sala</option>
              <option value="baloncesto">Baloncesto</option>
            </select>
          </form>
        </div>
        <br></br>
        <br></br>
        <div className="equipos">{ResultadosList}</div>
      </center>

      <FooterApp />
    </div>
  );
}

export default Matches;
