import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import NavApp from "./components/NavApp";
import FooterApp from "./components/FooterApp";
import { useAuth } from "./context/authContext";

//App css
import "./App.css";

function App() {
  const { user, logout, loading } = useAuth();
  console.log(user);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) return <h1>Loading</h1>;

  return (
    <div>
      <NavApp />
      <h1>Iniciar Sesion</h1>
      <div className="col-4" id="centrado">
        <h2>Bienvenido {user.displayName || user.email}</h2>

        <Link to="/home">
          <center>
            <Button variant="success" id="entry">
              Entrar
            </Button>{" "}
            <Button variant="secondary" id="entrynoid">
              Entrar sin identificarte
            </Button>{" "}
            <Button onClick={handleLogout} id="logout">
              Logout
            </Button>{" "}
          </center>
        </Link>
      </div>

      <div>
        <FooterApp />
      </div>
    </div>
  );
}

export default App;
