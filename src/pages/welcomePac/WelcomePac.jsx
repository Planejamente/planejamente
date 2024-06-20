import React from "react";
import styles from "./WelcomePac.css";

const WelcomePac = () => {
    return (
        <div className={styles['body']}>
            <h1 className={styles['mensagem']}>Seja bem-vindo futuro paciente</h1>
        </div>

    );
}

export default WelcomePac;