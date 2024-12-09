import React, { useState } from "react";
import styles from "./Meetmark.module.css";
import userLogo from "../../asset/user.svg";
import plusIcon from "../../asset/plus.svg";
import Cookies from "js-cookie";
import api from "../../lib/client/api";
import { useEffect } from "react";
import Header from "../../component/Header/Header";
import { DayPicker } from "react-day-picker";
import { pt } from "react-day-picker/locale";
import "react-day-picker/style.css";

import TimePicker from "rc-time-picker";
import ReactDOM from "react-dom";
import "rc-time-picker/assets/index.css";
import toast, { Toaster } from "react-hot-toast";

const Meetmark = () => {
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [psicologos, setPsicologos] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if(validateVals()) {
      const token = Cookies.get("token");
      await api.get(`/psicologos`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setPsicologos(res.data);
        console.log(res.data);
        setSearched(true);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  const validateVals = () => {
    if(!selected) {
      toast("Selecione um dia");
      return false;
    }
    if(selected < new Date()) {
      toast("Data inválida");
      return false;
    }
    if(!time) {
      toast("Selecione um horário");
      return false;
    }
    if(!endTime) {
      toast("Selecione um horário de fim");
      return false;
    }
    return true;
  }



  return (
    <div className={styles.meetMarkContainer}>
      <Header />
      <div className={styles.getParams}>
        <div className={styles.titleMeetMark}>
          <h1>Agende uma consulta agora mesmo!</h1>
        </div>
        <div className={styles.groupPickers}>
          <div className={styles.datePickerFodase}>
            <h2>Selecione o melhor dia</h2>
            <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            locale={pt}
            footer={
              selected
                ? `Selected: ${selected.toLocaleDateString()}`
                : "Pick a day."
            }
            />
          </div>
          <div className={styles.timePickerFodase}>
            <h2>e o melhor horário</h2>
            <h3>Início</h3>
            <TimePicker showSecond={false} value={time} onChange={setTime} />
            <h3>Fim</h3>
            <TimePicker showSecond={false} value={endTime} onChange={setEndTime} />

          </div>
        </div>
        <div className={styles.buttonMeetMark}>
          <button onClick={handleSearch}>Buscar</button>
        </div>
        {/* if searched is true and list is empty */}
        {searched && psicologos.length === 0 && (
          <div className={styles.psiListHeader}>
            <h2>Nenhum psicólogo encontrado</h2>
          </div>
        )}
        {/* if searched is true and list is not empty */}
        {searched && psicologos.length > 0 && (
          <>
            <div className={styles.psiListHeader}>
              <h2>Psicólogos disponíveis</h2>
            </div>
            <div className={styles.psiList}>
              <div className={styles.psiColumns}>
                {psicologos.map(psicologo => {
                  return (
                    <div key={psicologo.id} className={styles.psiCard}>
                      <h2>{psicologo.nome}</h2>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
            
        <div className={styles.trash}>
        </div>

{/* descricao: null
email: "desenvolvedora.icaro@gmail.com"
​​genero: "Masculino"
​​id: "7a533cf3-15c8-4c35-b321-b94c2f6dda41"
​​idCalendarioConsulta: null
​​idCalendarioDisponivel: null
​​nome: "João da Silva"
​​telefone: null */}
      </div>
      <Toaster />
    </div>
  );
};

export default Meetmark;
