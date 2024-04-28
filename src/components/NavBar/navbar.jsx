import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../../utils/assets/logo2.jpg";

function Componente() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  const goToParaVoce = () => {
    navigate("/para-voce");
  };

  const goToParaEspecialistas = () => {
    navigate("/para-especialistas");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="custom-navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="navbar-menu"></div>
      <div className="navbar-links">
        <span className="navbar-link" onClick={goToHome}>
          Home
        </span>
        <span className="navbar-link" onClick={goToParaVoce}>
          Para você
        </span>
        <span className="navbar-link" onClick={goToParaEspecialistas}>
          Para Especialistas
        </span>
        <div className="navbar-login">
          <div className="login-container" onClick={goToLogin}>
            <div className="login-button">
              <span className="login-text">Login</span>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-extra"></div>
      <div className="navbar-footer"></div>
    </div>
  );
}

export default Componente;
