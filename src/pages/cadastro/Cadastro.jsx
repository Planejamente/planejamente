import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cadastro.module.css";
import Navbar from "../../components/NavBar/navbar";
import arrowLeft from "../../utils/assets/arrow_left.svg";
import arrowRight from "../../utils/assets/arrow_right.svg";
import googleButton from "../../utils/assets/google_signup.png";

const Cadastro = () => {

    const [mode, setMode] = React.useState('pac');
    const [infoValue, setInfoValue] = React.useState('infoPsi');
    const changeMode = () => {
        setMode(mode === 'pac' ? 'psi' : 'pac');
        setInfoValue(infoValue === 'infoPsi' ? 'infoPac' : 'infoPsi');
    };

    const infoText = {
        infoPac: {
            head: 'Sou Paciente',
            text: 'Quero cuidar e fortalecer minha mente para um futuro mais sólido.',
            button: 'Seguir como Paciente',
        },
        infoPsi: {
            head: 'Sou Psicólogo',
            text: 'Estou aqui para ajudar pessoas a encontrarem sua melhor versão.',
            button: 'Seguir como Psicólogo',
        },
    };

    const infoStyle = {
        pac: {
            transition: 'transform 0.8s',
            transform: 'translate(30vw)',
            borderRadius: '0 16px 16px 0',

        },
        psi: {
            transition: 'transform 0.8s',
            transform: 'translate(0vw)',
            borderRadius: '16px 0 0 16px',

        },
    };



    return (
        <div className={styles.body}>
            {/*    navbar*/}
            <div className={styles.container}>
                <div className={styles.leftStep}>
                    <div className={styles.backBtn}>
                    <button > {/*onClick={backPage}*/}
                        <img src={arrowLeft} alt="Botão para voltar"/>
                    </button>
                    </div>
                    <div className={styles.headerStep}>
                        <h1>Sou Paciente!</h1>
                    </div>
                    <div className={styles.googleButton}>
                        <button>{/*Google Action Pac*/}
                            <img src={googleButton} alt="Botão de cadastro Google"/>
                        </button>
                        <div/>
                    </div>

                </div>
                <div className={styles.rightStep}>
                    <div className={styles.backBtn}>
                        <button> {/*onClick={backPage}*/}
                            <img src={arrowLeft} alt="Botão para voltar"/>
                        </button>
                    </div>
                    <div className={styles.headerStep}>
                        <h1>Sou Psicólogo!</h1>
                    </div>
                    <div className={styles.googleButton}>
                        <button>{/*Google Action Pac*/}
                            <img src={googleButton} alt="Botão de cadastro Google"/>
                        </button>
                        <div/>
                    </div>

                </div>
                <div style={infoStyle[mode]} className={styles.infoDiv}>
                    <h1>{infoText[infoValue].head}</h1>
                    <h3>{infoText[infoValue].text}</h3>
                    <button onClick={changeMode}>{infoText[infoValue].button}  <img src={arrowRight} alt="Botão para seguir cadastro de psicólogo"/></button>
                </div>

            </div>

        </div>
    );
}

export default Cadastro;