import React, { useEffect, useState } from "react";
import Calendario from "../../components/Calendario/calendario";
import TimePicker from "../../components/TimePicker/timepicker";
import Buscar from "../../components/Buscar/buscar";
import Footer from "../../components/Footer/footer";
import styles from "./Agendamento.module.css";
import CardPsico from "../../components/CardPsico/cardPsico";
import NavBar from "../../components/NavBar/navbar";
import api from "../../api";

const Agendamento = () => {
    // Estados para armazenar a data e os horários
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [cardsData, setCardsData] = useState();

    function getPsic(){
        api.get().then((response) => {
            if(response.data.length === 0){
                alert("Nenhum psicólogo encontrado");
            }
            console.log(response.data);
            setCardsData(response.data);
        });
    }
    
    useEffect(() => {getPsic()}, []);

    return (
        <div className={styles['body']}>
            <NavBar/>
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
                {/* Quando estiver recebendo os cards dinamicamente tem que colocar uma validadção de que se tiver somente um valor é para alinhar com o display flex e não com grid */}
                <div className={styles['cards']}>
                    {cardsData && cardsData.map((data, index)=> (
                        <div key={index}>
                        <CardPsico
                            // id={data.id}
                            nome={data.nome}
                            headline={data.headline}
                            crp={data.crp}
                            espec={data.espec}
                            descricao={data.descricao}
                            avaliacao={data.avaliacao}
                            qntAtendimentos={data.qntAtendimentos}
                            imagemUrl={data.imagemUrl} 
                        />
                        </div>
                    ))}
                </div>
            <Footer />
        </div>
    );
};

export default Agendamento;
