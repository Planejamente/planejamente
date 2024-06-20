import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import styles from "./Agenda.module.css";
import api from "../../api";

const Agenda = ({mode}) => {
  // Pra conectar essa tela pra deixar com os cards dinamicos
  // 1. Criar um estado para armazenar as consultas
  // 2. Criar um useEffect para buscar as consultas
  // 3. Fazer um map para percorrer as consultas e criar os cards
  const [consultas, setConsultas] = useState([]); // [{}
  useEffect(() => {
    const fetchConsultas = async () => {
      if(mode === "psi"){
        const response = await api.get(`/consultas/psicologo/${Cookies.get("id")}`);
        setConsultas(response.data);
      } else if(mode === "pac"){
        const response = await api.get(`/consultas/paciente/${Cookies.get("id")}`);
        setConsultas(response.data);
      }
    }

  }, []);

  switch (mode) {
  case "psi":
    return (
      <>
        <div className={styles.main}>
          <div className={styles.containerConsultas}>
            <div className={styles.labelContainerConsultas}>
              Próximas Consultas
            </div>
            <div className={styles.listConsultas}>
              <div className={styles.consultas}>
                {/* O map vai ter que vim aqui*/}
                {consultas.map((consulta) => (
                  <div className={styles.cardConsultaBorder}>
                    <div className={styles.cardConsulta}>
                      <div className={styles.nomePaciente}>
                        <div className={styles.cardNomePaciente}>Paciente</div>
                        <div className={styles.cardContent}>{consulta.nome}</div>
                      </div>
                      <div className={styles.horarioAgenda}>
                        <div className={styles.cardNomePaciente}>Horário</div>
                        <div className={styles.cardContent}> {consulta.horario}</div>
                      </div>
                      <div className={styles.dataAgenda}>
                        <div className={styles.cardNomePaciente}>Data</div>
                        <div className={styles.cardContent}>{consulta.data}</div>
                      </div>
                    </div>
                    <div className={styles.btnAcessarAgendamento}>
                      <button className={styles.btnAcessarAgendamento}>
                        Acessar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  case "pac":
    <>
    <div className={styles.main}>
      <div className={styles.containerConsultas}>
        <div className={styles.labelContainerConsultas}>
          Próximas Consultas
        </div>
        <div className={styles.listConsultas}>
          <div className={styles.consultas}>
            {/* O map vai ter que vim aqui*/}
            <div className={styles.cardConsultaBorder}>
              <div className={styles.cardConsulta}>
                <div className={styles.nomePaciente}>
                  <div className={styles.cardNomePaciente}>Psicólogo</div>
                  <div className={styles.cardContent}>João da Silva</div>
                </div>
                <div className={styles.horarioAgenda}>
                  <div className={styles.cardNomePaciente}>Horário</div>
                  <div className={styles.cardContent}> 10:45 - 12:00</div>
                </div>
                <div className={styles.dataAgenda}>
                  <div className={styles.cardNomePaciente}>Data</div>
                  <div className={styles.cardContent}>11/04/2024</div>
                </div>
              </div>
              <div className={styles.btnAcessarAgendamento}>
                <button className={styles.btnAcessarAgendamento}>
                  Acessar
                </button>
              </div>
            </div>
            <div className={styles.cardConsultaBorder}>
              <div className={styles.cardConsulta}>
                <div className={styles.nomePaciente}>
                  <div className={styles.cardNomePaciente}>Psicólogo</div>
                  <div className={styles.cardContent}>João da Silva</div>
                </div>
                <div className={styles.horarioAgenda}>
                  <div className={styles.cardNomePaciente}>Horário</div>
                  <div className={styles.cardContent}> 10:45 - 12:00</div>
                </div>
                <div className={styles.dataAgenda}>
                  <div className={styles.cardNomePaciente}>Data</div>
                  <div className={styles.cardContent}>11/04/2024</div>
                </div>
              </div>
              <div className={styles.btnAcessarAgendamento}>
                <button className={styles.btnAcessarAgendamento}>
                  Acessar
                </button>
              </div>
            </div>
            <div className={styles.cardConsultaBorder}>
              <div className={styles.cardConsulta}>
                <div className={styles.nomePaciente}>
                  <div className={styles.cardNomePaciente}>Psicólogo</div>
                  <div className={styles.cardContent}>João da Silva</div>
                </div>
                <div className={styles.horarioAgenda}>
                  <div className={styles.cardNomePaciente}>Horário</div>
                  <div className={styles.cardContent}> 10:45 - 12:00</div>
                </div>
                <div className={styles.dataAgenda}>
                  <div className={styles.cardNomePaciente}>Data</div>
                  <div className={styles.cardContent}>11/04/2024</div>
                </div>
              </div>
              <div className={styles.btnAcessarAgendamento}>
                <button className={styles.btnAcessarAgendamento}>
                  Acessar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
    }
  }

export default Agenda;