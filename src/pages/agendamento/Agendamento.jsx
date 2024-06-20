import React, { useState } from "react";
import Calendario from "../../components/Calendario/calendario";
import TimePicker from "../../components/TimePicker/timepicker";
import Buscar from "../../components/Buscar/buscar";
import Footer from "../../components/Footer/footer";
import styles from "./Agendamento.module.css";
import CardPsico from "../../components/CardPsico/cardPsico";
import NavBar from "../../components/NavBar/navbar";
import Filter from "../../components/Filter/filter";
import api from "../../api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";

const Agendamento = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [cardsData, setCardsData] = useState([]);
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [age, setAge] = useState("");
    const [ageComparison, setAgeComparison] = useState("");

    const notify = () => toast.error("Nenhum psicólogo encontrado!");
    const notify1 = () => toast.error("A idade mínima para agendar uma consulta é 18 anos.");

    const getPsic = () => {
        //Caso a data selecionada seja anterior a data do dia atual
        if (selectedDate < new Date().setHours(0, 0, 0, 0)) {
            toast.error("Selecione uma data válida.");
            return;
        }

        if (!startTime || !endTime) {
            toast.error("Selecione um horário de início e fim.");
            return;
        }

        if (startTime >= endTime) {
            toast.error("O horário de início deve ser menor que o horário de fim.");
        }

        if (startTime === endTime) {
            toast.error("O horário de início não pode ser igual ao horário de fim.");
            return;
        }

        const start = new Date(`${selectedDate.toISOString().split('T')[0]}T${startTime}`);
        const end = new Date(`${selectedDate.toISOString().split('T')[0]}T${endTime}`);
        const diff = (end - start) / (1000 * 60);

        if (diff < 30) {
            toast.error("O horário de atendimento deve ter no mínimo 30 minutos.");
            return;
        }

        const dataHoraInicio = `${selectedDate.toISOString().split('T')[0]}T${startTime}:00`;
        const dataHoraFim = `${selectedDate.toISOString().split('T')[0]}T${endTime}:00`;

        const horarios = {
            dataHoraInicio: dataHoraInicio,
            dataHoraFim: dataHoraFim,
            token: Cookies.get('token')
        };

        Cookies.set('horarios', JSON.stringify(horarios));

        console.log("Horários Selecionados:", horarios);

        let url = "/psicologos/filtros";
        const params = [];

        if (selectedGender) {
            params.push(`genero=${selectedGender}`);
        }
        if (selectedCity) {
            params.push(`cidade=${selectedCity}`);
        }
        if (dataHoraInicio) {
            const dataHoraInicioFilter = dataHoraInicio.replace(/:/g, '%3A');
            params.push(`dataHoraInicio=${dataHoraInicioFilter}`);
        }
        if (dataHoraFim) {
            const dataHoraFimFilter = dataHoraFim.replace(/:/g, '%3A');
            params.push(`dataHoraFim=${dataHoraFimFilter}`);
        }

        if (params.length > 0) {
            url += `?${params.join("&")}`;
        }

        console.log("Url:", url);

        api.get(url).then((response) => {
            if (response.data.length === 0) {
                notify();
            } else {
                const psicologosComHorarios = response.data.map(psicologo => ({
                    ...psicologo,
                    horarios: horarios
                }));
                setCardsData(psicologosComHorarios);
            }
        });
    };

    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    const handleAgeChange = (e) => {
        const ageValue = e.target.value;
        setAge(ageValue);
        if (ageValue.length > 1 && parseInt(ageValue) < 18) {
            notify1();
        }
    };

    const handleAgeComparisonChange = (e) => {
        setAgeComparison(e.target.value);
    };

    return (
        <div className={styles.body}>
            <NavBar />
            <h1 className={styles.title}>Escolha o melhor dia e horário para você</h1>
            <Filter
                selectedGender={selectedGender}
                handleGenderChange={handleGenderChange}
                selectedCity={selectedCity}
                handleCityChange={handleCityChange}
                age={age}
                handleAgeChange={handleAgeChange}
                ageComparison={ageComparison}
                handleAgeComparisonChange={handleAgeComparisonChange}
            />
            <div className={styles.inputs}>
                <Calendario selectedDate={selectedDate} onDateChange={setSelectedDate} />
            </div>
            <TimePicker
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
                selectedDate={selectedDate}
            />
            <div className={styles.buttons}>
                <div className={styles.bntBusca}>
                    <Buscar onClick={getPsic} />
                </div>
            </div>
            <div className={styles.cards}>
                {cardsData && cardsData.map((data, index) => (
                    <CardPsico
                        key={index}
                        id={data.id}
                        nome={data.nome}
                        headline={data.headline}
                        crp={data.crp}
                        espec={data.especialidade}
                        descricao={data.descricao}
                        avaliacao={data.avaliacao}
                        qntAtendimentos={data.qntAtendimentos}
                        imagemUrl={data.imagemUrl}
                        horarios={data.horarios}
                    />
                ))}
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default Agendamento;
