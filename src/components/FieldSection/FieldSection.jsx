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
import api from "../../api";
import axios from "axios";
// var GoogleStrategy = require('passport-google-oauth20').Strategy;
import Cookies from "js-cookie";

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
  const [sub, setSub] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [accessToken, setAccessToken] = React.useState("");
  const navigate = useNavigate();


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

  async function handleGoogleSuccessPsi(credentialResponse) {
        await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ` + credentialResponse.access_token
      }})
      .then(async response => response.json())
      .then(async data => {
        console.log("garantiu essa porra");
        console.log(hasGrantedAllScopesGoogle(
          credentialResponse,
          "openid",
          "profile",
          "email",
          "https://www.googleapis.com/auth/calendar",
          "https://www.googleapis.com/auth/drive",
        ));
        setAccessToken(credentialResponse.access_token);
        setEmail(data.email);
        setSub(data.sub);
        console.log(`agr p api`)

        api.post("/auth/login", {
          email: data.email,
          googleSub: data.sub
        })
      .then(response => {
        if(response.status === 200){
          toast.error("Usuário já cadastrado")
        }
      })
            .catch(error => {
              console.log(error)
              console.log(error.response.status)
              if(error.response.status === 401){
                console.log("foi")
               onGoStep();
              }
            })
    })
  }


  const handleGoogleFailedPsi = () => {
    // Exibir falha de Cadastro
  };

  const googleLoginPsi = useGoogleLogin({
    onSuccess: handleGoogleSuccessPsi,
    onError: handleGoogleFailedPsi,
    scope: [
      "openid",
      "profile",
      "email",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/drive",
    ].join(" "),
  });

  async function handleGoogleSuccessPac(credentialResponse) {

    await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ` + credentialResponse.access_token
      }
    })
        .then(async response => response.json())
        .then(async data => {
              setEmail(data.email);
              setSub(data.sub);
              console.log(`agr p api`)

              api.post("/auth/login", {
                email: data.email,
                googleSub: data.sub
              })
                  .then(response => {
                    if (response.status === 200) {
                      toast.error("Usuário já cadastrado")
                    }
                  })
                  .catch(error => {
                    console.log(error)
                    console.log(error.response.status)
                    if (error.response.status === 401) {
                      console.log("foi")
                      onGoStep();
                    }
                  })
            }
        )
  }


  const googleLoginPac = useGoogleLogin({
    onSuccess: handleGoogleSuccessPac,
    onError: handleGoogleSuccessPac,  
    scope: [
      "openid",
      "profile",
      "email"
    ].join(" "),
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

  async function SignUpPac(){
      if(!verifyValue(name, "Nome") || !verifyValue(birth, "Data de nascimento") || !verifyValue(sex, "Sexo") || !verifyValue(cpf, "CPF") || !verifyCPF(cpf)) {
        return;
      }
      api.post("/pacientes/register",
          {
        nome: name,
        dataDeNascimento: birth,
        telefone: telefone,
        genero: sex,
        email: email,
        googleSub: sub,
        endereco: null,
        role: "USER",
        telefone: "",
        })
        .then(response => {
            if(response.status === 201) {
                toast.success("Cadastro Realizado com Sucesso!");
              api.post("/auth/login",
                  {
                    email: email,
                    googleSub: sub
                  })
                  .then(response => {
                    if(response.status === 200){
                      const token = response.data.token
                      Cookies.set('token', token);
                      navigate("/psipanel")
                    }
                  })
            }
        })
        .catch(error => {
            console.log(error);
        })



  }

  async function SignUpPsi() {
    if(step === 2) {
    if(!verifyValue(name, "Nome") || !verifyValue(birth, "Data de nascimento") || !verifyValue(sex, "Sexo") || !verifyValue(telefone, "Telefone")){
      return;
    }
    onGoStep();
    return;
  }
    if(step === 3) {
      api.post("/psicologos/register", {
        nome: name,
        dataDeNascimento: birth,
        telefone: telefone.replace(/\D/g, ""),
        genero: sex,
        email: email,
        googleSub: sub,
        endereco: null,
        role: "ADMIN",
        crp: CRP,
        cnpj: CNPJ,
        cpf: cpf,
        linkFotoPerfil: null,
        idCalendarioDisponivel: "id_calendario_disp_exemplo",
        idCalendarioConsulta: "id_calendario_cons_exemplo",
        linkAnamnese: "url_exemplo_anamnese",
        idAnamnese: "id_anamnese_exemplo",
        linkFotoDeFundo: null,
        accessToken: accessToken,

      })
        .then(response => {
            if(response.status === 201) {
                toast.success("Cadastro Realizado com Sucesso!");
                api.post("/auth/login",
                {
                    email: email,
                    googleSub: sub
                })
                .then(response => {
                    if(response.status === 200){
                        const token = response.data.token
                      Cookies.set('token', token);
                        navigate("/psipanel")
                    }
                })

            }
        })
    }
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
  
  const backToLogin = () => {
    navigate("/login");
  };

  
  switch (mode) {
    case "pac":
      switch (step) {
        case 1:
          return (
            <main className={styles.mainFieldSection} style={modeStyle[mode]}>
              <div className={styles.backBtn}>
                <button>
                  {/*onClick={backPage}*/}
                  <img onClick={backToLogin} src={arrowLeft} alt="Botão para voltar" />
                </button>
              </div>
              <div className={styles.header}>
                <h1>Sou Paciente!</h1>
              </div>
              <div className={styles.googleButton}>
                <button>
                  {/*Google Action Pac*/}
                  <img onClick={googleLoginPac} src={googleButton} alt="Botão de cadastro Google" />
                </button>
              </div>
            </main>
          );
        case 2:
          return (
            <main className={styles.mainFieldSection} style={modeStyle[mode]}>
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
                  margin={"3%"}
                  type="text"
                  label="Nome"
                  name="Nome"
                  onChange={(e) => setName(e.target.value)}
                />
                <InputMod
                  margin={"3%"}
                  type="date"
                  label="Data de Nascimento"
                  name="Data de Nascimento"
                  onChange={(e) => setBirth(e.target.value)}
                />
                <InputMod
                  margin={"3%"}
                  type="select"
                  label="Sexo"
                  name="Sexo"
                  onChange={(e) => setSex(e.target.value)}
                />
                <InputMod
                  margin={"3%"}
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
            <main className={styles.mainFieldSection} style={modeStyle[mode]}>
              <div className={styles.backBtn}>
                <button>
                  {/*onClick={backPage}*/}
                  <img onClick={backToLogin} src={arrowLeft} alt="Botão para voltar" />
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
            <main className={styles.mainFieldSection} style={modeStyle[mode]}>
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
                    margin={"3%"}
                  type="text"
                  req={"t"}
                  label="Nome"
                  value={name}
                  name="Nome"
                  onChange={(e) => setName(e.target.value)}
                />
                <InputMod
                    margin={"3%"}

                  type="date"
                  req={"t"}

                  label="Data de Nascimento"
                  value={birth}
                  name="Data de Nascimento"
                  onChange={(e) => setBirth(e.target.value)}
                />
                <InputMod
                    margin={"3%"}
                    type="select"
                  label="Sexo"
                  req={"t"}

                  name="Sexo"
                  onChange={(e) => setSex(e.target.value)}
                />
                <InputMod
                    margin={"3%"}
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
            <main className={styles.mainFieldSection} style={modeStyle[mode]}>
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
                margin={"3%"}
                type="text"
                value={CEP}
                label="CEP"
                req={"t"}
                name="CEP"
                onChange={handleCepChange}
              />
              <InputMod
                margin={"3%"}
                type="text"
                value={cpf}
                label="CPF"
                req={"t"}
                name="CPF"
                onChange={handleCpfChange}
              />
              <InputMod
                margin={"3%"}
                type="text"
                value={CNPJ}
                label="CNPJ"
                req={"t"}
                name="CNPJ"
                onChange={(e) => setCNPJ(e.target.value)}
              />
              <InputMod
                margin={"3%"}
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
