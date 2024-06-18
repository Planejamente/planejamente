import React, { useState } from "react";

import styles from "./Agenda.module.css";

const Agenda = () => {
  // Pra conectar essa tela pra deixar com os cards dinamicos
  // 1. Criar um estado para armazenar as consultas
  // 2. Criar um useEffect para buscar as consultas
  // 3. Fazer um map para percorrer as consultas e criar os cards

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
              <div className={styles.cardConsultaBorder}>
                <div className={styles.cardConsulta}>
                  <div className={styles.nomePaciente}>
                    <div className={styles.cardNomePaciente}>Paciente</div>
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
                    <div className={styles.cardNomePaciente}>Paciente</div>
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
                    <div className={styles.cardNomePaciente}>Paciente</div>
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
  );
};

export default Agenda;
