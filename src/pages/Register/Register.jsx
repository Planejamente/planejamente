import { React, useState } from "react";
import styles from "./Register.module.css";
import googleIcon from "../../asset/googleBtn.svg";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";
import { LoginAlreadyExists, LoginError } from "../../component/Toast/Toast";
import api from "../../lib/client/api";

import backIcon from "../../asset/backArrow.svg";
import axios from "axios";




const Register = () => {
  const [isPacSide, setIsPacSide] = useState(true);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [googleSub, setGoogleSub] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [crp, setCrp] = useState("");


  const setCpfFormat = (value) => {
    value = value.replace(/\D/g, "");
    if (value.length > 11) {
      value = value.substring(0, 11);
    }
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    setCpf(value);
  };

  const setPhoneFormat = (value) => {
    value = value.replace(/\D/g, "");
    if (value.length > 11) {
      value = value.substring(0, 11);
    }
    if (value.length > 0) {
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    }
    if (value.length > 6) {
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }
    setPhone(value);
  };
  const setCepFormat = (value) => {
    value = value.replace(/\D/g, "");

    if (value.length > 8) {
      value = value.substring(0, 8);
    }
    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }

    setCep(value);
  };

  const setCnpjFormat = (value) => {
    value = value.replace(/\D/g, "");

    if (value.length > 14) {
      value = value.substring(0, 14);
    }
    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    }
    if (value.length > 5) {
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    }
    if (value.length > 8) {
      value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    }
    if (value.length > 12) {
      value = value.replace(/(\d{4})(\d)/, "$1-$2");
    }

    setCnpj(value);
  };
  
  const handleSide = () => {
    setIsPacSide(!isPacSide);
  };
  async function handleGoogleSuccessPac(credentialResponse) {
    console.log(JSON.stringify(credentialResponse));

    Cookies.set("access_token", credentialResponse.access_token);
    await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ` + credentialResponse.access_token,
      },
    })
      .then(async (response) => response.json())
      .then(async (data) => {
        setEmail(data.email);
        setGoogleSub(data.sub);
        await api
          .post("/auth/login", {
            email: data.email,
            googleSub: data.sub,
          })
          .then((res) => {
            LoginAlreadyExists();
            setTimeout(() => {
              window.location.href = "/login";
            }, 2000);
          })
          .catch((err) => {
            if (err.response.status === 401) {
              setStep(2);
            }
          });
      });
  }

  function handleGoogleErrorPac(error) {
    console.log(error);
  }

  const useGoogleLoginPac = useGoogleLogin({
    onSuccess: handleGoogleSuccessPac,
    onError: handleGoogleErrorPac,
    scope: ["openid", "profile", "email"].join(" "),
    ux_mode: "pop-up",
  });

  const registerPac = async () => {
    if (validateRegisterPac()) {
      await api
        .post("/pacientes/register", {
          nome: name,
          dataDeNascimento: birthDate,
          genero: gender,
          cpf: cpf,
          email: email,
          googleSub: googleSub,
          role: "USER",
        })
        .then((res) => {
          toast.success("Cadastro realizado com sucesso!");

        })
        .catch((err) => {
          toast.error("Erro ao se cadastrar!");
        });

        await api.post('/auth/login', {
          email: email,
          googleSub: googleSub
        }).then(res => {
          let jwtData = decodeJwt(res.data.token);
          Cookies.set("JWT", res.data.token);
          Cookies.set("email", JSON.stringify(jwtData.sub));
          Cookies.set("tipoUsuario", JSON.stringify(jwtData.tipoUsuario).replace(/"/g, ''));
          Cookies.set("id", JSON.stringify(jwtData.id).replace(/"/g, ''));
          setTimeout(() => {
            window.location.href = "/meetMark";
          }, 500);
        }).catch(err => {
          console.log(err);
          if (err.response.status === 401) {
            LoginError();
          }
        })
    }
  };

  const validateRegisterPac = () => {
    if (name === "" || birthDate === "" || gender === "" || cpf === "") {
      toast("Por favor, preencha todos os campos, vai ser Rápido!⚡");
      return false;
    } else if (!validateCpf(cpf)) {
      toast.error("Parece que o CPF inserido é inválido!");
      return false;
    }

    return true;
  };

  const validateCpf = (cpf) => {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstVerifier = 11 - (sum % 11);
    if (firstVerifier >= 10) firstVerifier = 0;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondVerifier = 11 - (sum % 11);
    if (secondVerifier >= 10) secondVerifier = 0;

    return (
      firstVerifier === parseInt(cpf.charAt(9)) &&
      secondVerifier === parseInt(cpf.charAt(10))
    );
  };

  const useGoogleLoginPsi = useGoogleLogin({
    onSuccess: handleGoogleSuccessPsi,
    onError: handleGoogleErrorPac,
    scope: [
      "openid",
      "profile",
      "email",
      "https://www.googleapis.com/auth/calendar",
    ].join(" "),
    ux_mode: "pop-up",
  });

  async function handleGoogleSuccessPsi(credentialResponse) {
    await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ` + credentialResponse.access_token,
      },
    })
      .then(async (response) => response.json())
      .then(async (data) => {
        setAccessToken(credentialResponse.access_token);
        setEmail(data.email);
        setGoogleSub(data.sub);

        api.post("/auth/login", {
            email: data.email,
            googleSub: data.sub,
          })
          .then((response) => {
            if (response.status === 200) {
              LoginAlreadyExists();
              setTimeout(() => {
                window.location.href = "/login";
              }, 2000);
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              setStep(2);
            }
          });
      });
  }


  const goStepPsi = () => {
    if (name === "" || birthDate === "" || gender === "" || phone === "" || phone.length !== 15) {
      toast("Por favor, preencha todos os campos, vai ser Rápido!⚡");
      return;
    }
    setStep(3);
  };

  const registerPsi = async () => {
    


    if (validateRegisterPsi()) {
      let endereco = {};
      await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => {
        let data = res.data;
        endereco.cep = data.cep;
        endereco.rua = data.logradouro;
        endereco.estado = data.estado;
        endereco.cidade = data.localidade;
      })
      .catch((err) => {
        toast.error("Esse cep é inválido!");
        return;
      });
      console.log(JSON.stringify(endereco));
      
      await api.post("/psicologos/register", {
        nome: name,
        dataDeNascimento: birthDate,
        genero: gender,
        email: email,
        googleSub: googleSub,
        role: "ADMIN",
        crp: crp,
        cpf: cpf,
        cnpj: cnpj,
        idCalendarioConsulta: "nada",
        idCalendarioDisponivel: "nadatbm",
        accessToken: accessToken,
        endereco: endereco,
      })
      .then((res) => {
        toast.success("Cadastro realizado com sucesso!");
      })
      .catch((err) => {
        toast.error("Erro ao se cadastrar!");
      });

      await api.post('/auth/login', {
        email: email,
        googleSub: googleSub
      }).then(res => {
        let jwtData = decodeJwt(res.data.token);
        Cookies.set("JWT", res.data.token);
        Cookies.set("email", JSON.stringify(jwtData.sub));
        Cookies.set("tipoUsuario", JSON.stringify(jwtData.tipoUsuario).replace(/"/g, ''));
        Cookies.set("id", JSON.stringify(jwtData.id).replace(/"/g, ''));
      setTimeout(() => {
        window.location.href = "/psipanel";
      }, 1200);
      }).catch(err => {
        console.log(err);
        if (err.response.status === 401) {
          LoginError();
        }
      })
    }
  };

  const validateRegisterPsi = () => {
    if (cpf === "" || cep === "" || cnpj === "" || crp === "") {
      toast("Por favor, preencha todos os campos, vai ser Rápido!⚡");
      return false;
    }
    if (!validateCnpj(cnpj)) {
      toast("Parece que o CNPJ inserido é inválido!");
      return false;
    }
    if (!validateCpf(cpf)) {
      toast("Parece que o CPF inserido é inválido!");
      return false;
    }
    return true;
  };

  const validateCnpj = (cnpj) => {
    // Remove tudo que não for dígito
    cnpj = cnpj.replace(/\D/g, "");
  
    // Verifica se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14) return false;
  
    // Verifica se todos os dígitos são iguais (ex: 11111111111111)
    if (/^(\d)\1+$/.test(cnpj)) return false;
  
    // Calcula o primeiro dígito verificador
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;
  
    // Calcula o segundo dígito verificador
    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;
  
    return true;
  };

  const decodeBase64Url = (base64Url) => {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  };
  
  const decodeJwt = (token) => {
    try {
      const [header, payload, signature] = token.split('.');
      if (!payload) throw new Error('Invalid token');
      console.log(header, payload, signature);
      return decodeBase64Url(payload);
    } catch (error) {
      console.error('Token inválido', error);
      return null;
    }
  };



  return (
    <>
      <div className={styles.registerContainer}>
        <div className={styles.main}>
          <div className={styles.pacSide}>
            {sectionRegisterPac({
              isPacSide,
              step,
              setStep,
              handleSide,
              useGoogleLoginPac,
              registerPac,
              useGoogleLoginPsi,
              name,
              setName,
              birthDate,
              setBirthDate,
              gender,
              setGender,
              cpf,
              setCpfFormat,
              phone,
              setPhoneFormat,
              goStepPsi,
              setCepFormat,
              cep,
              setCnpjFormat,
              cnpj,
              setCrp,
              crp,
              registerPsi,
            })}
          </div>
          <div className={styles.psiSide}>
            {sectionRegisterPsi({ isPacSide, step, setStep, handleSide })}
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontFamily: "Fredoka-r",
          },
        }}
      />
    </>
  );
};

const sectionRegisterPac = ({
  isPacSide,
  step,
  setStep,
  handleSide,
  useGoogleLoginPac,
  registerPac,
  useGoogleLoginPsi,
  registerPsi,
  name,
  setName,
  birthDate,
  setBirthDate,
  gender,
  setGender,
  cpf,
  setCpfFormat,
  phone,
  setPhoneFormat,
  cep,
  setCepFormat,
  cnpj,
  setCnpjFormat,
  crp,
  setCrp,
  goStepPsi,
}) => {

  const handleBackStep = () => {
    setStep(step - 1);
  };
  const goToLogin = () => {
    window.location.href = "/login";
  };

  const pacStyle = {
    borderRadius: isPacSide ? "24px 0 0 24px" : "0 24px 24px 0",
    transition: "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
    transform: isPacSide
      ? "translateX(0) rotateY(0deg)"
      : "translateX(100%) rotateY(360deg)",
  };

  switch (isPacSide) {
    case true:
      switch (step) {
        case 1:
          return (
            <div className={styles.mainPacSide} style={pacStyle}>
              <div className={styles.topSideContent}>
                <div className={styles.backBtn}>
                  <img src={backIcon} alt="back" onClick={goToLogin} />
                </div>
                <div className={styles.titlePacSide}>
                  <h1>Sou Paciente!</h1>
                </div>
              </div>
              <div className={styles.btnLogin}>
                <img
                  src={googleIcon}
                  alt="google"
                  onClick={useGoogleLoginPac}
                />
              </div>
            </div>
          );
        case 2:
          return (
            <div className={styles.mainPacSide} style={pacStyle}>
              <div className={styles.topSideContent}>
                <div className={styles.backBtn}>
                  <img src={backIcon} alt="back" onClick={handleBackStep} />
                </div>
                <div className={styles.titlePacSide}>
                  <h1>Cadastro</h1>
                </div>
              </div>
              <div className={styles.fieldsPacSide}>
                <div className={styles.inputPacSide}>
                  <p>Nome*</p>
                  <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.inputPacSide}>
                  <p>Data de Nascimento*</p>
                  <input
                    type="date"
                    placeholder="Data de Nascimento"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>

                <div className={styles.inputPacSide}>
                  <p>Gênero*</p>
                  <select
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                  </select>
                </div>

                <div className={styles.inputPacSide}>
                  <p>CPF*</p>
                  <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpfFormat(e.target.value)}
                  />
                </div>

                <button onClick={registerPac}>Continuar</button>
              </div>
            </div>
          );
        default:
          return <div></div>;
      }
    case false:
      switch (step) {
        case 1:
          return (
            <div className={styles.mainPacSide} style={pacStyle}>
              <div className={styles.topSideContent}>
                <div className={styles.backBtn}>
                  <img src={backIcon} alt="back" onClick={goToLogin} />
                </div>
                <div className={styles.titlePacSide}>
                  <h1>Sou Psicólogo!</h1>
                </div>
              </div>
              <div className={styles.btnLogin}>
                <img
                  src={googleIcon}
                  alt="google"
                  onClick={useGoogleLoginPsi}
                />
              </div>
            </div>
          );
        case 2:
          return (
            <div className={styles.mainPacSide} style={pacStyle}>
              <div className={styles.topSideContent}>
                <div className={styles.backBtn}>
                  <img src={backIcon} alt="back" onClick={handleBackStep} />
                </div>
                <div className={styles.titlePacSide}>
                  <h1>Cadastro</h1>
                </div>
              </div>
              <div className={styles.fieldsPacSide}>
                <div className={styles.inputPacSide}>
                  <p>Nome*</p>
                  <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.inputPacSide}>
                  <p>Data de Nascimento*</p>
                  <input
                    type="date"
                    placeholder="Data de Nascimento"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>

                <div className={styles.inputPacSide}>
                  <p>Gênero*</p>
                  <select
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                  </select>
                </div>

                <div className={styles.inputPacSide}>
                  <p>Telefone*</p>
                  <input
                    type="text"
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => setPhoneFormat(e.target.value)}
                  />
                </div>

                <button onClick={goStepPsi}>Continuar</button>
              </div>
            </div>
          );
          case 3:
            return (
              <div className={styles.mainPacSide} style={pacStyle}>
                <div className={styles.topSideContent}>
                  <div className={styles.backBtn}>
                    <img src={backIcon} alt="back" onClick={handleBackStep} />
                  </div>
                  <div className={styles.titlePacSide}>
                    <h1>Cadastro</h1>
                  </div>
                </div>
                <div className={styles.fieldsPacSide}>
                  <div className={styles.inputPacSide}>
                    <p>CEP*</p>
                    <input
                      type="text"
                      placeholder="XXXXX-XXX"
                      value={cep}
                      onChange={(e) => setCepFormat(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputPacSide}>
                    <p>CPF*</p>
                    <input
                      type="text"
                      placeholder="XXX.XXX.XXX-XX"
                      value={cpf}
                      onChange={(e) => setCpfFormat(e.target.value)}
                    />
                  </div>
  
                  <div className={styles.inputPacSide}>
                    <p>CNPJ*</p>
                    <input
                      type="text"
                      placeholder="XX.XXX.XXX/XXXX-XX"
                      value={cnpj}
                      onChange={(e) => setCnpjFormat(e.target.value)}
                    />
                  </div>
  
                  <div className={styles.inputPacSide}>
                    <p>CRP*</p>
                    <input
                      type="text"
                      placeholder="CRP"
                      value={crp}
                      onChange={(e) => setCrp(e.target.value)}
                    />
                  </div>
  
                  <button onClick={registerPsi}>Continuar</button>
                </div>
              </div>
            );
        default:
          return <div></div>;
      }
    default:
      return <div></div>;
  }
};

const sectionRegisterPsi = ({ isPacSide, step, setStep, handleSide }) => {


  const psiStyle = {
    borderRadius: isPacSide ? "0 24px 24px 0" : "24px 0 0 24px",
    transition: "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
    transform: isPacSide
      ? "translateX(0) rotateY(0deg)"
      : "translateX(-100%) rotateY(360deg)",
  };

  switch (isPacSide) {
    case true:
      switch (step) {
        case 1:
          return (
            <div className={styles.mainPsiSide} style={psiStyle}>
              <div className={styles.topSideContent}>
                <div className={styles.backBtn}></div>
                <div className={styles.titlePacSide}>
                  <h1 className={styles.titlePsiSide}>Sou Psicólogo!</h1>
                </div>
              </div>
              <div className={styles.psiSideFirstStep}>
                <h2>
                  Estou aqui para ajudar pessoas a <br />
                  encontrarem sua melhor versão.
                </h2>
                <button onClick={handleSide}>Seguir como Psicólogo</button>
              </div>
            </div>
          );
        case 2:
          return (
            <div className={styles.mainPsiSide} style={psiStyle}>
              <div className={styles.stepsPsiSide}>
                <div className={styles.stepPsiSide}>
                  <div className={styles.bolaFodase}></div>
                  <p>Informações de Acesso</p>
                </div>
                <div className={styles.stepPsiSideFodase}>
                  <div className={styles.bolaFodaseFodase}></div>
                  <p>Informações Pessoais</p>
                </div>
              </div>
            </div>
          );
        default:
          return <div></div>;
      }
    case false:
      switch (step) {
        case 1:
          return (
            <div className={styles.mainPsiSide} style={psiStyle}>
              <div className={styles.topSideContent}>
                <div className={styles.backBtn}></div>
                <div className={styles.titlePacSide}>
                  <h1 className={styles.titlePsiSide}>Sou Paciente!</h1>
                </div>
              </div>
              <div className={styles.psiSideFirstStep}>
                <h2>
                  Quero cuidar e fortalecer minha <br />
                  mente para um futuro mais sólido.
                </h2>
                <button onClick={handleSide}>Seguir como Paciente</button>
              </div>
            </div>
          );
          case 2:
            return (
              <div className={styles.mainPsiSide} style={psiStyle}>
                <div className={styles.stepsPsiSide}>
                  <div className={styles.stepPsiSide}>
                    <div className={styles.bolaFodase}></div>
                    <p>Informações de Acesso</p>
                  </div>
                  <div className={styles.stepPsiSideFodase}>
                    <div className={styles.bolaFodaseFodase}></div>
                    <p>Informações Pessoais</p>
                  </div>
                  <div className={styles.stepPsiSideFodase}>
                    <div className={styles.bolaFodaseFodaseFodase}></div>
                    <p>Informações Profissionais</p>
                  </div>
                  
                </div>
              </div>
            );
            case 3:
              return (
                <div className={styles.mainPsiSide} style={psiStyle}>
                  <div className={styles.stepsPsiSide}>
                    <div className={styles.stepPsiSide}>
                      <div className={styles.bolaFodase}></div>
                      <p>Informações de Acesso</p>
                    </div>
                    <div className={styles.stepPsiSide}>
                      <div className={styles.bolaFodase}></div>
                      <p>Informações Pessoais</p>
                    </div>
                    <div className={styles.stepPsiSideFodase}>
                      <div className={styles.bolaFodaseFodase}></div>
                      <p>Informações Profissionais</p>
                    </div>
                    
                  </div>
                </div>
              );
        default:
          return <div></div>;
      }
    default:
      return <div></div>;
  }
};
export default Register;
