import React from "react";
import styles from "./Cadastro.module.css";
import Navbar from "../../components/NavBar/navbar";
import arrowLeft from "../../utils/assets/arrow_left.svg";
import arrowRight from "../../utils/assets/arrow_right.svg";
import googleButton from "../../utils/assets/google_signup.png";    
import FieldSection from "../../components/FieldSection/FieldSection";
import InputMod from "../../components/InputMod/InputMod";
import ModeSection from "../../components/ModeSection/ModeSection";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Cadastro = () => {

    const [mode, setMode] = React.useState('psi');
    const [step, setStep] = React.useState(3);
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
        <div className={styles.container}>
            <FieldSection mode={mode} step={step} onGoStep={goStep} onBackStep={backStep}  />
            <ModeSection mode={mode} step={step} onGoStep={goStep} onBackStep={backStep} changeMode={changeMode} />
            <ToastContainer />
        </div>
        </>

    );
}

export default Cadastro;