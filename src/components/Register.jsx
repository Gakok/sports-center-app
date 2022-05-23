import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import "../pages/Registrar/Registrar.css";

function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="centradito">
      <div className="container">
        {error && <p>{error}</p>}
        <div className="title">Registrarse</div>
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

          <div className="button">
            <button>Registrarse</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
