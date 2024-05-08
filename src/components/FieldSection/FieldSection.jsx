import React from "react";
import styles from "./FieldSection.module.css";
import arrowLeft from "../../utils/assets/arrow_left.svg";
import arrowRight from "../../utils/assets/arrow_right.svg";
import arrowRightDark from "../../utils/assets/arrow_right_dark.svg";

import googleButton from "../../utils/assets/google_signup.png";
import InputMod from "../InputMod/InputMod";
import {
  GoogleLogin,
  useGoogleLogin,
  hasGrantedAllScopesGoogle,
} from "@react-oauth/google";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";



const FieldSection = ({ mode, step, onGoStep, onBackStep }) => {
  const [i, setI] = React.useState(1);
  const [name, setName] = React.useState("");
  const [birth, setBirth] = React.useState("");
  const [sex, setSex] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [CEP, setCEP] = React.useState("");
  const [CNPJ, setCNPJ] = React.useState("");
  const [CRP, setCRP] = React.useState("");
  const modeStyle = {
    pac: {
      transition: "transform 0.8s",
      transform: "translate(0vw)", 
      borderRadius: "16px 0 0 16px",
    },
    psi: {
      transition: "transform 0.8s",
      transform: "translate(100%)",
      borderRadius: "0 16px 16px 0",
    },
  };

  const handleCpfChange = (event) => {
    let formattedCpf = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    if (formattedCpf.length <= 3) {
      formattedCpf = formattedCpf.replace(/(\d{3})/, "$1");
    } else if (formattedCpf.length <= 6) {
      formattedCpf = formattedCpf.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    } else if (formattedCpf.length <= 9) {
      formattedCpf = formattedCpf.replace(
        /(\d{3})(\d{3})(\d{1,3})/,
        "$1.$2.$3"
      );
    } else {
      formattedCpf = formattedCpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
        "$1.$2.$3-$4"
      );
    }

    if (formattedCpf.length <= 14) {
      // Limita a 11 caracteres
      setCpf(formattedCpf.slice(0, 14));
    }
  };

  const handleGoogleSuccessPsi = (credentialResponse) => {
    console.log("Login bem-sucedido:", credentialResponse);
    console.log(hasGrantedAllScopesGoogle(credentialResponse,
        "https://www.googleapis.com/auth/calendar"));
    onGoStep();
  };


  const handleGoogleFailedPsi = () => {
    // Exibir falha de Cadastro
  };

  const googleLoginPsi = useGoogleLogin({
    onSuccess: handleGoogleSuccessPsi,
    onError: handleGoogleFailedPsi,
    scope: [
      "openid",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/drive",
    ].join(" "),
    flow: 'auth-code',
  });

  const handleGoogleSuccessPac = (credentialResponse) => {
    console.log("Login bem-sucedido:", credentialResponse);

    onGoStep();
  };



  const googleLoginPac = useGoogleLogin({
    onSuccess: handleGoogleSuccessPac,
    onError: handleGoogleSuccessPac,  
    ux_mode: 'popup'
  });

  const verifyValue = (state, fieldName) => {
    if (state === null || state === undefined || state === '') {
      toast.error(`O campo ${fieldName} é obrigatório`);
      return false;
    } else {
      return true;
    }
  }

  const SignUpPac = () => {
      if(!verifyValue(name, "Nome") && !verifyValue(birth, "Data de nascimento") && !verifyValue(cpf, "CPF") && !verifyCPF(cpf) && !verifyValue(birth, "Data de Nascimento") ) {
        return;
      }
      toast("Cadastro Realizado com Sucesso!");

  }

  async function SignUpPsi() {
    if(step === 2) {
    if(!verifyValue(name, "Nome") || !verifyValue(birth, "Data de nascimento") || !verifyValue(sex, "Sexo") || !verifyValue(telefone, "Telefone")){
      return
    }
  }
    if(step === 3) {
      if(!(await verifyCEP(CEP)) || !verifyValue(cpf, "CPF") || !verifyCPF(cpf) || !verifyValue(CNPJ, "CNPJ") || !verifyValue(CRP, "CRP")) {
        return;
      }
    }
    if(step === 2) {
      onGoStep();
      return;
    }
    toast.success("Cadastro Realizado com Sucesso!");
  }

  // (11) 99999-9999
  const handlePhoneChange = (event) => {
    let formattedPhone = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    if(formattedPhone.length <= 0) {
      formattedPhone = formattedPhone.replace(/(\d{2})/, "($1)");
    }
    else if(formattedPhone.length <= 7) {
      formattedPhone = formattedPhone.replace(/(\d{2})(\d{1,5})/, "($1) $2");
    }
    else {
      formattedPhone = formattedPhone.replace(/(\d{2})(\d{1,4})(\d{1,4})/, "($1) $2-$3");
    }
    if(formattedPhone.length <= 15) {
      setTelefone(formattedPhone.slice(0, 15));
    }
  }

  const handleCepChange = (event) => {
    let formattedCep = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    if(formattedCep.length <= 5) {
      formattedCep = formattedCep.replace(/(\d{5})/, "$1");
    }
    else {
      formattedCep = formattedCep.replace(/(\d{5})(\d{1,3})/, "$1-$2");
    }
    if(formattedCep.length <= 9) {
      setCEP(formattedCep.slice(0, 9));
    }

  }

  async function verifyCEP(cep) {
    let formattedCep = cep.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    
    if (formattedCep.length !== 8) {
      toast.error("CEP Inválido");
      return false;
    }
    await axios.get(`https://brasilapi.com.br/api/cep/v1/{cep}${formattedCep}`)
    .then((response) => {
      if(response.status === 200) {
        return true;
      }
      if(response.status === 404) {
      toast.error("CEP Inválido");
      return false;
      }
    })
    

  }
  
  const verifyCPF = (cpf) => {
    let soma = 0;
    let resto;
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf === "00000000000") {
      toast.error("CPF Inválido");
      return false;
    }
    
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
      toast.error("CPF Inválido");
      return false;
    }
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
      toast.error("CPF Inválido");
      return false;
    }
  
    return true;
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
                <button onClick={googleLoginPac}>
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
                  <img
                    src={arrowLeft}
                    onClick={onBackStep}
                    alt="Botão para voltar"
                  />
                </button>
              </div>
              <div className={styles.header}>
                <h1>Cadastro!</h1>
              </div>
              <div className={styles.inputs}>
                <InputMod
                  margin={"16px"}
                  type="text"
                  label="Nome"
                  name="Nome"
                  onChange={(e) => setName(e.target.value)}
                />
                <InputMod
                  margin={"16px"}
                  type="date"
                  label="Data de Nascimento"
                  name="Data de Nascimento"
                  onChange={(e) => setBirth(e.target.value)}
                />
                <InputMod
                  margin={"16px"}
                  type="select"
                  label="Sexo"
                  name="Sexo"
                  onChange={(e) => setSex(e.target.value)}
                />
                <InputMod
                  margin={"16px"}
                  type="text"
                  value={cpf}
                  label="CPF"
                  name="CPF"
                  onChange={handleCpfChange}
                />
                <button onClick={SignUpPac} className={styles.btnSignUp}>Criar Conta <img src={arrowRightDark} alt="Seta para Criar Conta" /></button>
              </div>
            </main>
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
                <h1>Sou Psicólogo!</h1>
              </div>
              <div className={styles.googleButton}>
                <button onClick={googleLoginPsi}>
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
                  <img
                    src={arrowLeft}
                    onClick={onBackStep}
                    alt="Botão para voltar"
                  />
                </button>
              </div>
              <div className={styles.header}>
                <h1>Cadastro!</h1>
              </div>
              <div className={styles.inputs}>
                <InputMod
                  margin={"16px"}
                  type="text"
                  req={"t"}

                  label="Nome"
                  value={name}
                  name="Nome"
                  onChange={(e) => setName(e.target.value)}
                />
                <InputMod
                  margin={"16px"}
                  type="date"
                  req={"t"}

                  label="Data de Nascimento"
                  value={birth}
                  name="Data de Nascimento"
                  onChange={(e) => setBirth(e.target.value)}
                />
                <InputMod
                  margin={"16px"}
                  type="select"
                  label="Sexo"
                  req={"t"}

                  name="Sexo"
                  onChange={(e) => setSex(e.target.value)}
                />
                <InputMod
                  margin={"16px"}
                  type="text"
                  value={telefone}
                  label="Telefone"
                  name="Telefone"
                req={"t"}

                  onChange={handlePhoneChange}
                />
                <button onClick={SignUpPsi} className={styles.btnSignUp}>Último Passo <img src={arrowRightDark} alt="Seta para Criar Conta" /></button>
              </div>
            </main>
          );
        case 3:
          return (
            <main style={modeStyle[mode]}>
            <div className={styles.backBtn}>
              <button>
                {/*onClick={backPage}*/}
                <img
                  src={arrowLeft}
                  onClick={onBackStep}
                  alt="Botão para voltar"
                />
              </button>
            </div>
            <div className={styles.header}>
              <h1>Cadastro!</h1>
            </div>
            <div className={styles.inputs}>
              <InputMod
                margin={"16px"}
                type="text"
                value={CEP}
                label="CEP"
                req={"t"}
                name="CEP"
                onChange={handleCepChange}
              />
              <InputMod
                margin={"16px"}
                type="text"
                value={cpf}
                label="CPF"
                req={"t"}
                name="CPF"
                onChange={handleCpfChange}
              />
              <InputMod
                margin={"16px"}
                type="text"
                value={CNPJ}
                label="CNPJ"
                req={"t"}
                name="CNPJ"
                onChange={(e) => setCNPJ(e.target.value)}
              />
              <InputMod
                margin={"16px"}
                type="text"
                value={CRP}
                label="CRP"
                req={"t"}
                name="CRP"
                onChange={(e) => setCRP(e.target.value)}
              />
              <button onClick={SignUpPsi} className={styles.btnSignUp}>Último Passo <img src={arrowRightDark} alt="Seta para Criar Conta" /></button>
            </div>
          </main>
          );
        default:
          return null;
      }
    default:
      return null;
  }
};

export default FieldSection;
