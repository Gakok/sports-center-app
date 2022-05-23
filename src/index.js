import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Matches from "./pages/Encuentros/Matches";
import Clases from "./pages/Clases/Clases";
import Login from "./pages/Login/Login";
import Registrar from "./pages/Registrar/Registrar";
import Alquiler from "./pages/Alquiler/Alquiler";
import Usuario from "./pages/Usuario/Usuario";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/clases" element={<Clases />} />
          <Route
            path="/usuario"
            element={
              <ProtectedRoute>
                <Usuario />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alquiler"
            element={
              <ProtectedRoute>
                <Alquiler />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
