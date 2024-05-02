import React from "react";
import styles from "./Login.module.css";
import Logo from "../../utils/assets/logo-small.svg";
import GoogleButton from "../../utils/assets/google-button.png";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const goToAgendamento = () => {
        navigate('/agendamento');
        console.log("Clicou no botão de login com o google");
    };

    return (
        <div>
            <div className={styles["logo"]}>
                <img src={Logo} alt="Logo" />
            </div>
                <div className={styles["welc"]}>Bem vindo de volta!</div>
            <div className={styles["container"]}>
                <div className={styles["content"]}>
                    <img className={styles["bntGoogle"]} src={GoogleButton} alt="Botão para logar no google" onClick={goToAgendamento}/>
                </div>
            <div className={styles["cadastro"]}>Não possui uma conta? <a className={styles["bntCadastro"]} href="/cadastro">Cadastrar-se</a></div>
            </div>
        </div>
    );
};

export default Login;