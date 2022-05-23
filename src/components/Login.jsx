import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { Link } from "react-router-dom";
import "../pages/Login/Login.css";

function LoginComponent() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) return setError("Por favor Ingrese su email");

    try {
      await resetPassword(user.email);
      setError("Hemos enviado un email para restablecer tu contraseña");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="centradito">
      <div className="container">
        {error && <Alert message={error} />}
        <div className="title">Login</div>
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <label className="details" htmlFor="email">
                {" "}
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="tuemail@ejemplo.com"
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <label className="details" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="******"
                onChange={handleChange}
              />
            </div>
          </div>
          <center>
            <div className="gender-details">
              <span className="gender-title">
                <a href="#!" onClick={handleResetPassword}>
                  ¿Olvidaste tu Contraseña?
                </a>
              </span>
              <br></br>
              <br></br>
              <span className="gender-title">
                <a href="./Registrar">¿Aún no te has Registrado?</a>
              </span>
            </div>
          </center>
          <div className="button">
            <input type="submit" value="Login"></input>
            <Link to="/home">
              {" "}
              <input type="submit" value="Entrar sin identificarse"></input>
            </Link>
          </div>

          <div className="button">
            <button onClick={handleGoogleSignin}>Google Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginComponent;
