import React, { useState } from "react";
import NavApp from "./../../components/NavApp";
import FooterApp from "./../../components/FooterApp";
import { useAuth } from "./../../context/authContext";
import { db } from "./../../firebase";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import "./Alquiler.css";

function Alquiler() {
  const { user, logout, loading } = useAuth();

  const daysString = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

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

  const weekDays = [];

  for (let day = 0; day < 7; day++) {
    const todayObject = new Date();
    const dayUpdated = todayObject.setDate(todayObject.getDate() + day);
    const object = new Date(dayUpdated);
    weekDays.push(object);
  }

  const [diaSeleccionado, setDiaSeleccionado] = useState(weekDays[0].getDay());
  const [instalacionSeleccionada, setInstalacionSeleccionada] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [reservaSelecionada, setReservaSeleccionada] = useState("");
  const [diasSemana] = useState(weekDays);

  const horariosCollection = collection(db, "horarios");
  const alquileresCollection = collection(db, "alquileres");

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  }

  function reservarPista() {
    // Escribir en Firebase
    // idInstalación, Fecha, Hora, Usuario
    console.log("ReservarPista");
    setReservaSeleccionada("");

    const docRef = addDoc(collection(db, "alquileres"), {
      año: weekDays[diaSeleccionado].getFullYear(),
      dia: weekDays[diaSeleccionado].getDate(),
      //numeroDia: todaynumber,
      hora: reservaSelecionada,
      instalacion: instalacionSeleccionada,
      mes: weekDays[diaSeleccionado].getMonth(),
      reservado: true,
      usuario: user.email,
    });

    console.log("Reserva Registrada", docRef);
  }

  function seleccionarReservaPista(value) {
    setReservaSeleccionada(value);
  }

  const consultarHorarios = async (event) => {
    // Traer reservas de Firebasew
    event.preventDefault();

    const qHorarios = query(
      horariosCollection,
      where("instalacion", "==", instalacionSeleccionada)
    );
    const qReservas = query(
      alquileresCollection,
      where("instalacion", "==", instalacionSeleccionada),
      where("dia", "==", diasSemana[diaSeleccionado].getDate()),
      where("mes", "==", monthString[diasSemana[diaSeleccionado].getMonth()]),
      where("año", "==", diasSemana[diaSeleccionado].getFullYear())
    );
    const dataHorarios = await getDocs(qHorarios);
    const dataReservas = await getDocs(qReservas);

    const a = dataHorarios.docs.map((doc) => doc.data().horarios)[0];
    const b = dataReservas.docs.map((doc) => ({ ...doc.data() }));

    const horariosConReservas = a.map((hora) => {
      const found = b.find((element) => element.hora === hora);
      return found ? found : { hora: hora, reservado: false };
    });

    setHorarios(horariosConReservas);
  };

  function seleccionarDia(e) {
    setDiaSeleccionado(e.target.value);
  }

  function seleccionarInstalacion(e) {
    setInstalacionSeleccionada(e.target.value);
  }

  if (loading) return <h1>Loading</h1>;

  const LogOut = (
    <a id="log" href="./login">
      <button onClick={handleLogout} id="logout">
        Cerrar Sesión
      </button>
    </a>
  );

  const listsItem = horarios.map((horariosConReservas) => {
    if (horariosConReservas.reservado) {
      return (
        <div className="horasPista" key={horariosConReservas.toString()}>
          "Reservado"
        </div>
      );
    } else {
      return (
        <div
          className={
            reservaSelecionada === horariosConReservas.hora.toString()
              ? "horasPistaSeleccionada"
              : "horasPista"
          }
          key={horariosConReservas.hora.toString()}
          onClick={() =>
            seleccionarReservaPista(horariosConReservas.hora.toString())
          }
        >
          {horariosConReservas.hora.toString()}
        </div>
      );
    }
  });

  const horasList = (
    <div className="horasPistaContainer">
      {listsItem}
      <div className="btnreserva">
        <button className="botonReservaEstilo" onClick={reservarPista}>
          Reservar Pista
        </button>
      </div>
    </div>
  );

  const weekSelect = diasSemana.map((dia) => {
    return (
      <option key={daysString[dia.getDay()]} value={dia.getDay()}>
        {daysString[dia.getDay()]}
      </option>
    );
  });

  const MisReservas = (
    <a href="./Usuario">
      <button id="logout">Mi Perfil</button>
    </a>
  );
  return (
    <div className="Alquiler">
      <NavApp />
      <div className="nav">
        <h4>{user ? user.displayName || user.email : ""}</h4>
        {user ? MisReservas : ""}
        <a href="./Matches">
          <button id="logout">Resultados</button>
        </a>
        <a href="./Clases">
          <button id="logout">Clases</button>
        </a>
        {user ? LogOut : ""}
      </div>
      <center>
        <div className="col-12" id="titulo">
          <h2>Alquiler de Las pistas</h2>
        </div>
      </center>
      <div className="pistas">
        <form onSubmit={consultarHorarios}>
          <label className="lblpistas">
            Pistas Disponibles: &nbsp;
            <select
              value={instalacionSeleccionada}
              onChange={seleccionarInstalacion}
            >
              <option value="">Seleccione la Pista </option>
              <option value="F7">Campo de Fútbol 7</option>
              <option value="FSalaPrincipal">
                Pista de Fútbol Sala Principal
              </option>
              <option value="FSalaSur">Pista de Fútbol Sala Sur</option>
              <option value="Baloncesto">Pista de Baloncesto</option>
              <option value="Padel">Pista de Pádel</option>
              <option value="Tenis">Pista de Tenis</option>
            </select>
          </label>
          <label className="lblpistas">
            &nbsp;&nbsp; Selecciona día: &nbsp;
            <select value={diaSeleccionado} onChange={seleccionarDia}>
              {weekSelect}
            </select>
          </label>
          <br></br>
          <br></br>
          <input
            type="submit"
            className="btn btn-dark"
            value="Consultar horarios"
          />
        </form>
      </div>

      <center>
        <div>{horarios.length ? horasList : "No hay horarios"}</div>
      </center>
      <br></br>

      <div className="img-fluid banner"></div>

      <FooterApp />
    </div>
  );
}

export default Alquiler;
