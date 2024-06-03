import React, { useState } from "react";
import Calendario from "../../components/Calendario/calendario";
import TimePicker from "../../components/TimePicker/timepicker";
import Buscar from "../../components/Buscar/buscar";
import Footer from "../../components/Footer/footer";
import styles from "./Agendamento.module.css";
import CardPsico from "../../components/CardPsico/cardPsico";
import NavBar from "../../components/NavBar/navbar";
import api from "../../api";

const Agendamento = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [cardsData, setCardsData] = useState([]);

    const getPsic = () => {
        const horarios = {
            date: selectedDate.toISOString().split('T')[0],
            startTime: startTime + ':00',
            endTime: endTime + ':00'
        };

        // Printar os horários selecionados no console
        console.log("Horário Selecionados:", horarios);

        api.get().then((response) => {
            if (response.data.length === 0) {
                alert("Nenhum psicólogo encontrado");
            } else {
                const psicologosComHorarios = response.data.map(psicologo => ({
                    ...psicologo,
                    horarios: horarios
                }));
                setCardsData(psicologosComHorarios);
            }
        });
    };

    return (
        <div className={styles['body']}>
            <NavBar />
            <h1 className={styles['title']}>Escolha o melhor dia e horário para você</h1>
            <div className={styles['inputs']}>
                <Calendario selectedDate={selectedDate} onDateChange={setSelectedDate} />
                <TimePicker
                    startTime={startTime}
                    endTime={endTime}
                    onStartTimeChange={setStartTime}
                    onEndTimeChange={setEndTime}
                    selectedDate={selectedDate}
                />
            </div>
            <div className={styles['bntBusca']}>
                <Buscar onClick={getPsic}/>
            </div>
            <div className={styles['cards']}>
                {cardsData && cardsData.map((data, index) => (
                    <CardPsico
                        key={index}
                        id={data.id}
                        nome={data.nome}
                        headline={data.headline}
                        crp={data.crp}
                        espec={data.espec}
                        descricao={data.descricao}
                        avaliacao={data.avaliacao}
                        qntAtendimentos={data.qntAtendimentos}
                        imagemUrl={data.imagemUrl}
                        horarios={data.horarios}
                        // horariosPsicologo={data.horarios}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Agendamento;
