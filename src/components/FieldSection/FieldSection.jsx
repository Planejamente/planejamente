import React from "react";
import styles from "./FieldSection.module.css";
import arrowLeft from "../../utils/assets/arrow_left.svg";
import arrowRight from "../../utils/assets/arrow_right.svg";
import googleButton from "../../utils/assets/google_signup.png";
import InputMod from "../InputMod/InputMod";


const FieldSection = ({ mode, step }) => {
    const [name, setName] = React.useState('');
    const [birth, setBirth] = React.useState('');
    const [sex, setSex] = React.useState('');
    const [cpf, setCpf] = React.useState('');

    const modeStyle = {
        pac: {
            transition: 'transform 0.8s',
            borderRadius: '16px 0 0 16px',
        },
        psi: {
            transition: 'transform 0.8s',
            borderRadius: '0 16px 16px 0',
        },
    };

    const handleCpfChange = (event) => {
        let formattedCpf = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    
        if (formattedCpf.length <= 3) {
          formattedCpf = formattedCpf.replace(/(\d{3})/, '$1');
        } else if (formattedCpf.length <= 6) {
          formattedCpf = formattedCpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        } else if (formattedCpf.length <= 9) {
          formattedCpf = formattedCpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        } else {
          formattedCpf = formattedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
        }
    
        if (formattedCpf.length <= 14) { // Limita a 11 caracteres
          setCpf(formattedCpf.slice(0, 14));
        }
      };


  switch (mode) {
    case "pac":
      switch (step) {
        case 1:
          return (
            <main style={modeStyle[mode]}>
              <div className={styles.backBtn}>
                <button>
                  {/*onClick={backPage}*/}
                  <img src={arrowLeft} alt="Botão para voltar" />
                </button>
              </div>
              <div className={styles.header}>
                <h1>Sou Paciente!</h1>
              </div>
              <div className={styles.googleButton}>
                <button>
                  {/*Google Action Pac*/}
                  <img src={googleButton} alt="Botão de cadastro Google" />
                </button>
              </div>
            </main>
          );
        case 2:
          return (
            <main style={modeStyle[mode]}>
              <div className={styles.backBtn}>
                <button>
                  {/*onClick={backPage}*/}
                  <img src={arrowLeft} alt="Botão para voltar" />
                </button>
              </div>
              <div className={styles.header}>
                <h1>Cadastro!</h1>
              </div>
              <div className={styles.inputs}>
                <InputMod margin={"16px"} type="text" label="Nome" name="Nome" onChange={e => setName(e.target.value)}/>
                <InputMod margin={"16px"} type="date" label="Data de Nascimento" name="Data de Nascimento" onChange={e => setBirth(e.target.value)}/>
                <InputMod margin={"16px"} type="select" label="Sexo" name="Sexo" onChange={e => setSex(e.target.value)}/>
                <InputMod margin={"16px"} type="text" value={cpf} label="CPF" name="CPF" onChange={handleCpfChange}/>
                
              </div>
            </main>
          );
        case 3:
          return (
            <div>
              <label>Enter the thickness in inches:</label>
              <input type="number" name="thickness" />
            </div>
          );
        default:
          return null;
      }
    case "psi":
      switch (step) {
        case 1:
          return (
            <main style={modeStyle[mode]}>
              <div className={styles.backBtn}>
                <button>
                  {/*onClick={backPage}*/}
                  <img src={arrowLeft} alt="Botão para voltar" />
                </button>
              </div>
              <div className={styles.header}>
                <h1>Sou Paciente!</h1>
              </div>
              <div className={styles.googleButton}>
                <button>
                  {/*Google Action Pac*/}
                  <img src={googleButton} alt="Botão de cadastro Google" />
                </button>
              </div>
            </main>
          );
        case 2:
          return (
            <div>
              <label>Enter the diameter in meters:</label>
              <input type="number" name="diameter" />
            </div>
          );
        case 3:
          return (
            <div>
              <label>Enter the thickness in meters:</label>
              <input type="number" name="thickness" />
            </div>
          );
        default:
          return null;
      }
    default:
      return null;
  }
};

export default FieldSection;
