import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import logo from "../../utils/assets/logo2.jpg";

function Componente() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        behavior: "smooth",
        top: section.offsetTop,
      });
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <div className="custom-navbar">
      <div className="navbar-logo" onClick={goToHomePage}>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="navbar-links">
        {isHomePage && (
          <>
            <span className="navbar-link-home" onClick={() => scrollToSection("sectionHome")}>
              Home
            </span>
            <span className="navbar-link-vc" onClick={() => scrollToSection("sectionParaVoce")}>
              Para você
            </span>
            <span className="navbar-link-espec" onClick={() => scrollToSection("sectionEspcialista")}>
              Para Especialistas
            </span>
          </>
        )}
      </div>
      <div className="login-button">
        <span onClick={goToLogin}>Login</span>
      </div>
    </div>
  );
}

export default Componente;
