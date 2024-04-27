import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import NavBar from "../../components/NavBar/navbar"; 
import Logo from "../../utils/assets/logo2.jpg";
import imgPrincipal from "../../utils/assets/fundo.svg";
import imgEstrelas from "../../utils/assets/v767_27.png";


const Home = () => {
    const navigate = useNavigate(); 

    const handleConversarClick = () => {
        navigate("/pagina-de-conversa");
    };

    return (
        <div className={styles.background}>
            <div className={styles.starBackground}>
                <img src={imgEstrelas} alt="Estrelas" className={styles.starImage} />
            </div>
            <img src={imgPrincipal} alt="Imagem de fundo" className={styles.backgroundImage} />
            <NavBar logo={Logo} />
            <div className={styles.container}>
                <h1>
                    Onde há saúde Mental, <span> Há paz</span>
                </h1>
                <p>Prepare-se hoje para o amanhã e descubra a tranquilidade de cuidar da sua mente conosco.</p>
                
                <p onClick={handleConversarClick} className={styles.conversarLink}>Conversar</p>
            </div>
        </div>
    );
}

export default Home;
