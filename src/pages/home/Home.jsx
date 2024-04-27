import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import NavBar from "../../components/NavBar/navbar"; 
import Logo from "../../utils/assets/logo2.jpg";
import imgPrincipal from "../../utils/assets/fundo.svg";
import imgEstrelas1 from "../../utils/assets/v767_27.png";
import imgEstrelas2 from "../../utils/assets/v767_27.png"; 
import celular from "../../utils/assets/Group_192_1.png";

const Home = () => {
    const navigate = useNavigate(); 

    const handleConversarClick = () => {
        navigate("/pagina-de-conversa");
    };

    const handleConfira = () => {
        navigate("/confira");
    };

    return (
        <div>
            <div className={styles.background}>
                <div className={styles.starBackground}>
                    <img src={imgEstrelas1} alt="Estrela 1" className={styles.starImage} />
                    <img src={imgEstrelas2} alt="Estrela 2" className={styles.starImage} />
                </div>
                <img src={imgPrincipal} alt="Imagem de fundo" className={styles.backgroundImage} />
                <NavBar logo={Logo} />
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        Onde há saúde Mental, <span>Há paz</span>
                    </h1>
                    <p className={styles.paragraph}>Prepare-se hoje para o amanhã e descubra a tranquilidade de cuidar da sua mente conosco.</p>
                    
                    <p onClick={handleConversarClick} className={styles.conversarLink}>Conversar</p>
                </div>
            </div>

            <div className={styles.extraContent}>
                <div className={styles.extraContentInner}>
                    <p className={styles.extraText}>Ajudando pessoas a ajudar pessoas.</p>
                    <p className={styles.extraText}>Queremos diminuir a distância entre profissionais e pacientes, desenvolvemos cuidadosamente formas para conectar profissionais de saúde mental a pessoas que buscam suporte emocional de uma forma acessível e confortável.</p>
                   
                    <p onClick={handleConfira}  className={styles.confiraLink}>Confira</p>
                </div>
                <img src={celular} alt="Descrição da imagem" className={styles.extraImage} />
            </div>
        </div>
    );
}

export default Home;
