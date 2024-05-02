import React from "react";
import styles from "./Cadastro.module.css";
import Navbar from "../../components/NavBar/navbar";
import arrowLeft from "../../utils/assets/arrow_left.svg";
import arrowRight from "../../utils/assets/arrow_right.svg";
import googleButton from "../../utils/assets/google_signup.png";    
import FieldSection from "../../components/FieldSection/FieldSection";
import InputMod from "../../components/InputMod/InputMod";

const Cadastro = () => {

    const [mode, setMode] = React.useState('pac');
    const [step, setStep] = React.useState(2);
    const [name, setName] = React.useState('Nome');
    const [birth, setBirth] = React.useState('');
    const changeMode = () => {
        setMode(mode === 'pac' ? 'psi' : 'pac');
    };
    const goStep = () => {
        setStep(step + 1);
    }
    const backStep = () => {
        setStep(step - 1);
    }

    // const infoText = {
    //     infoPac: {
    //         head: 'Sou Paciente',
    //         text: 'Quero cuidar e fortalecer minha\nmente para um futuro mais sólido.',
    //         button: 'Seguir como Paciente',
    //     },
    //     infoPsi: {
    //         head: 'Sou Psicólogo',
    //         text: 'Estou aqui para ajudar pessoas a\nencontrarem sua melhor versão.',
    //         button: 'Seguir como Psicólogo',
    //     },
    // };

    // const infoStyle = {
    //     pac: {
    //         transition: 'transform 0.8s',
    //         transform: 'translate(0vw)',
    //         borderRadius: '0 16px 16px 0',
    //     },
    //     psi: {
    //         transition: 'transform 0.8s',
    //         transform: 'translate(-30vw)',
    //         borderRadius: '16px 0 0 16px',

    //     },
    // };

    // const stepStyle = {
    //     pac: {
    //         transition: 'transform 0.8s',
    //         transform: 'translate(0vw)',
    //         borderRadius: '16px 0 0 16px',

    //     },
    //     psi: {
    //         transition: 'transform 0.8s',
    //         transform: 'translate(30vw)',
    //         borderRadius: '0 16px 16px 0',
    //     },
    // };




    return (
        <>
            <FieldSection mode={mode} step={step} />
        </>
        // <div className={styles.body}>
        //     {/*    navbar*/}
        //     <div className={styles.container}>
        //         <div style={stepStyle[mode]} className={styles.leftStep}>
        //             <div className={styles.backBtn}>
        //             <button > {/*onClick={backPage}*/}
        //                 <img src={arrowLeft} alt="Botão para voltar"/>
        //             </button>
        //             </div>
        //             <div className={styles.headerStep}>
        //                 <h1>Sou Paciente!</h1>
        //             </div>
        //             <div className={styles.googleButton}>
        //                 <button>{/*Google Action Pac*/}
        //                     <img src={googleButton} alt="Botão de cadastro Google"/>
        //                 </button>
        //             </div>

        //         </div>
        //         <div style={infoStyle[mode]} className={styles.infoDiv}>
        //             <h1>{infoText[infoValue].head}</h1>
        //             <h3>{infoText[infoValue].text}</h3>
        //             <button onClick={changeMode}>{infoText[infoValue].button}  <img src={arrowRight} alt="Botão para seguir cadastro de psicólogo"/></button>
        //         </div>

        //     </div>

        // </div>
    );
}

export default Cadastro;