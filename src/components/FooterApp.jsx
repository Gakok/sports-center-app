import React from "react";
import Youtube from "../img/logo-youtube.png";
import Google from "../img/logo-google.png";
import Twitter from "../img/logo-twitter.png";
import Facebook from "../img/logo-facebook.png";

function FooterApp() {
  return (
    <footer>
    <div className="container-fluid" id="fondo">
      <div className="row">
        <div className="col-xs-12 col-md-6 col-lg-4">
          <p>
            <span id="bold">Polideportivo Zaburdón</span>
            <br></br>
            C/ Las Pozas 183, 28200 San Lorenzo de El Escorial (Madrid)
            <br></br>
            Teléfono: 91 896 00 40 - Fax: 91 896 00 72
            <br></br>
            E-mail: &nbsp;
            <a href="mailto:deportes@aytosanlorenzo.es">
              deportes@aytosanlorenzo.es
            </a>
          </p>
        </div>
        <div className="col-xs-12 col-md-6 col-lg-4">
          <p>
            <span id="bold">Ayuntamiento de San Lorenzo de El Escorial</span>
            <br></br>
            Plaza de la Constitución, 3<br></br>
            28200 San Lorenzo de El Escorial (Madrid) España
            <br></br>
            CIF: P-2813100-A
          </p>
        </div>
        <div className="col-xs-12 col-md-12 col-lg-4" id="redessociales">
          <a href="https://www.facebook.com/aytosanlorenzo">
            <img src={Facebook} id="facebook" alt="facebook-sanlorenzo" />
          </a>
          <a href="https://twitter.com/aytosanlorenzo">
            <img src={Twitter} id="twitter" alt="twitter-sanlorenzo" />
          </a>
          <a href="https://plus.google.com/104552869505204114396?prsrc=3">
            <img src={Google} id="google" alt="google-sanlorenzo" />
          </a>
          <a href="http://www.youtube.com/sanlorenzoescorial">
            <img src={Youtube} id="youtube" alt="youtube-sanlorenzo" />
          </a>
        </div>
      </div>
    </div>
  </footer>
  );
}

export default FooterApp;
