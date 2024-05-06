import React from "react";
import Calendario from "../../components/Calendario/calendario";
import Footer from "../../components/Footer/footer";
import Buscar from "../../components/Buscar/buscar";
import styles from "./Agendamento.module.css";

const Agendamento = () => {

    return (
        <content>
            <p className={styles['title']}>Escolha o melhor dia e horário para você</p>
            <Calendario />
            <Buscar />
            <Footer />
        </content>
    );
};

export default Agendamento;