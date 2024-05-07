import React from "react";
import Calendario from "../../components/Calendario/calendario";
import Buscar from "../../components/Buscar/buscar";
import styles from "./Agendamento.module.css";
import TimePicker from "../../components/TimePicker/timepicker";
import Footer from "../../components/Footer/footer";

const Agendamento = () => {

    return (
        <div className={styles['body']}>
            <h1 className={styles['title']}>Escolha o melhor dia e horário para você</h1>
            <div className={styles['inputs']}>
                <Calendario />
                <TimePicker />
            </div>
            <div className={styles['bntBusca']}>
                <Buscar />
            </div>
            <Footer />
        </div>
    );
};

export default Agendamento;