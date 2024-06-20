import React from "react";
import styles from "./ModeSection.module.css";
import arrowLeft from "../../utils/assets/arrow_left.svg";
import arrowRight from "../../utils/assets/arrow_right.svg";
import Step from "../Step/Step";
const ModeSection = ({ mode, step, changeMode }) => {
  const modeStyle = {
    pac: {
      transition: "transform 0.8s",
      transform: "translate(0vw)",
      borderRadius: "0 16px 16px 0",
    },
    psi: {
      transition: "transform 0.8s",
      transform: "translate(-100%)",

      borderRadius: "16px 0 0 16px",
    },
  };

  switch (mode) {
    case "pac":
      switch (step) {
        case 1:
          return (
            <main style={modeStyle[mode]} className={styles.mode}>
                <div className={styles.hOne}>
                  <h1 className={styles.header}>Sou Psicólogo</h1>
                </div>
                <h3>
                Estou aqui para ajudar pessoas a <br></br> encontrarem sua melhor versão.
                </h3>
                <button className={styles.btnMode} onClick={changeMode}>
                    Seguir como psicólogo
                    <img src={arrowRight} alt="Seta para direita" />
                </button>
            </main>
          );
          case 2:
            return (
                <main style={modeStyle[mode]} className={styles.mode}>
                    <div className={styles.steps}>
                        <Step mode={"ran"} text="Dados de acesso" />
                        <Step mode={"running"} text="Dados pessoais" />

                    </div>
                </main>

            )
          default:
            return (
                null
            )
      }
      case "psi":
        switch (step) {
          case 1:
            return (
              <main style={modeStyle[mode]} className={styles.mode}>
                <div className={styles.hOne}>
                  <h1 className={styles.header}>Sou Paciente</h1>
                </div>
                <h3>
                Estou aqui para encontrar meu <br></br> equilíbrio emocional.
                </h3>
                <button className={styles.btnMode} onClick={changeMode}>
                    Seguir como paciente
                    <img src={arrowRight} alt="Seta para direita" />
                </button>
              </main>
            );
            case 2:
              return (
                <main style={modeStyle[mode]} className={styles.mode}>
                    <div className={styles.steps}>
                        <Step mode={"ran"} text="Dados de acesso" />
                        <Step mode={"running"} text="Dados pessoais" />
                        <Step mode={"run"} text="Dados profissionais" />

                    </div>
                </main>
              )
              case 3:
                return (
                  <main style={modeStyle[mode]} className={styles.mode}>
                      <div className={styles.steps}>
                          <Step mode={"ran"} text="Dados de acesso" />
                          <Step mode={"ran"} text="Dados pessoais" />
                          <Step mode={"running"} text="Dados profissionais" />
  
                      </div>
                  </main>
                )
            default:
              return (
                  null
              )
  }
  default:
    return null;
}
};

export default ModeSection;
