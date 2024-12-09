import React, { useState } from "react";
import styles from "./Psipanel.module.css";
import userLogo from "../../asset/user.svg";
import plusIcon from "../../asset/plus.svg";
import Cookies from "js-cookie";
import api from "../../lib/client/api";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

const Psipanel = () => {
  const [actualItem, setActualItem] = useState("Agenda");
  const [avatarLink, setAvatarLink] = useState(userLogo);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [crp, setCrp] = useState("");
  const [showModalExp, setShowModalExp] = useState(false);
  const [seeCardConsulta, setSeeCardConsulta] = useState('none');
  const [planoDeAcao, setPlanoDeAcao] = useState({});
  const [planoA, setPlanoA] = useState("")
  const [planoB, setPlanoB] = useState("")
  const [planoC, setPlanoC] = useState("")
  const [showModalPlano, setShowModalPlano] = useState(false);



  useEffect(() => {
    const getPsiData = async () => {
      await api.get(`/psicologos/${Cookies.get("id")}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("JWT")}`,
        },
      }).then((response) => {
        let resData = response.data;
        setNome(resData.nome);
        setEmail(resData.email);
        setDataNascimento(resData.dataNascimento);
        setGenero(resData.genero);
        setTelefone(resData.telefone);
        setCep(resData.cep);
        setCpf(resData.cpf);
        setCnpj(resData.cnpj);
        setCrp(resData.crp);
      });
    };
    getPsiData();
  }, []);

  const psicologoId = 1;
  const METABASE_PUBLIC_URL =
    `https://planejamente.metabaseapp.com/public/dashboard/0d6bd692-60e4-4bbd-be81-ef9994c44026?id=${Cookies.get("id")}#hide_parameters=id`;


  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("email");
    Cookies.remove("JWT");
    Cookies.remove("id");
    Cookies.remove("tipoUsuario");

    window.location.href = "/";
  };

  const handleSavePlano = () => {
    if(planoA === "" || planoB === "" || planoC === "") {
      toast.error("Preencha todos os campos!");
    } else {
      toast.success("Plano salvo com sucesso!");
      setShowModalPlano(false);
    }
  };

  const handleSaveSettings = () => {
    console.log("Salvando configurações...");
  };

  return (
    <div className={styles.psiPanelContainer}>
      {sideBar({
        actualItem,
        setActualItem,
        avatarLink,
        logout,
      })}
      {psiPanelDisplay({
        actualItem,
        METABASE_PUBLIC_URL,
        nome,
        email,
        dataNascimento,
        genero,
        telefone,
        cep,
        cpf,
        cnpj,
        crp,
        setNome,
        setEmail,
        setDataNascimento,
        setGenero,
        setTelefone,
        setCep,
        setCpf,
        setCnpj,
        setCrp,
        handleSaveSettings,
        showModalExp,
        setShowModalExp,
        seeCardConsulta,
        setSeeCardConsulta,
        planoDeAcao,
        setPlanoDeAcao,
        planoA,
        setPlanoA,
        planoB,
        setPlanoB,
        planoC,
        setPlanoC,
        handleSavePlano,
        showModalPlano,
        setShowModalPlano
      })}
      <Toaster />
    </div>
  );
};

const sideBar = ({ actualItem, setActualItem, avatarLink, logout }) => {
  const items = [
    { name: "Agenda" },
    { name: "Dashboard" },
    { name: "Configurações" },
    { name: "Perfil" },
  ];

  return (
    <div className={styles.psiSideBar}>
      <div className={styles.psiSideBarFodase}>
        <div className={styles.psiSideBarUser}>
          <img src={avatarLink} alt="User Avatar" />
        </div>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${
              actualItem === item.name
                ? styles.activeItemNavbar
                : styles.itemNavbar
            }`}
            onClick={() => setActualItem(item.name)}
          >
            <span>{item.name}</span>
          </div>
        ))}
        <div className={styles.psiSideBarLogout} onClick={logout}>
          <span>Sair</span>
        </div>
      </div>
    </div>
  );
};

const psiPanelDisplay = ({ 
  actualItem, 
  METABASE_PUBLIC_URL, 
  nome, 
  email, 
  dataNascimento, 
  genero, 
  telefone, 
  cep, 
  cpf, 
  cnpj, 
  crp, 
  setNome, 
  setEmail, 
  setDataNascimento, 
  setGenero, 
  setTelefone, 
  setCep, 
  setCpf, 
  setCnpj, 
  setCrp, 
  handleSaveSettings, 
  showModalExp, 
  setShowModalExp,
  seeCardConsulta,
  setSeeCardConsulta,
  planoDeAcao,
  setPlanoDeAcao,
  planoA,
  setPlanoA,
  planoB,
  setPlanoB,
  planoC,
  setPlanoC,
  handleSavePlano,
  showModalPlano,
  setShowModalPlano
}) => {




  const mockFuck = () => {
    setSeeCardConsulta('block');
  }

  const meetFuck = () => {
    window.location.href = 'https://meet.google.com/';
  }


  
  
  switch (actualItem) {
    case "Agenda":
      return (
        <div className={styles.psiPanelDisplay}>
          <div className={styles.agendaDisplay}>
            <div className={styles.titleAgendaDisplay}>
              <span onClick={mockFuck}>Próximas Consultas</span>
            </div>
            <div className={styles.consultasDisplay} id='consultasDisplay'>
            
            <div className={styles.cardConsulta} style={{display: seeCardConsulta}} id='cardConsulta'>
                <div className={styles.cardConsultaTop}>
                  <p>Paciente</p>
                  <p className={styles.clientNameCardConsulta}>Vitor Ramos</p>
                  <p>Horário</p>
                  <p className={styles.hourCardConsulta}>20:45 - 21:45</p>
                  <p>Data</p>
                  <p className={styles.dateCardConsulta}>09/12/2024</p>
                </div>
                <div className={styles.cardConsultaBottom} onClick={meetFuck}>
                  <p>Acessar</p>
                </div>
                <div className={styles.cardConsultaBottomm} onClick={() => setShowModalPlano(true)}>
                  <p>Plano de Ação</p>
                </div>
              </div>

            </div>
          </div>
          <div className={styles.modalFodaseFodase}  style={{display: showModalPlano ? 'flex' : 'none'}}>

          <div className={styles.modalFodase}>
            <div className={styles.titleModalFodase}>
              <span>Plano de Ação</span>
            </div>
            <div className={styles.contentModalFodase}>
              
              <div className={styles.planosFodase}>
                  <input type="text" placeholder="Nome da Ação" className={styles.inputPlanoFodase} value={planoA} onChange={(e) => setPlanoA(e.target.value)} />
                  <input type="text" placeholder="Nome da Ação" className={styles.inputPlanoFodase} value={planoB} onChange={(e) => setPlanoB(e.target.value)} />
                  <input type="text" placeholder="Nome da Ação" className={styles.inputPlanoFodase} value={planoC} onChange={(e) => setPlanoC(e.target.value)} />

              </div>
              <div className={styles.btnSalvarPlano}>
                <span onClick={handleSavePlano}>Salvar Plano</span>
              </div>
            </div>
          </div>
          </div>
        </div>

      );
    case "Dashboard":
      return (
        <div className={styles.psiPanelDisplay}>
          <div id="iframeContainer" className={styles.iframeContainer}>
            <iframe
              src={METABASE_PUBLIC_URL}
              width="1200"
              height="800"
              allowFullScreen
              title="Dashboard"
            ></iframe>
          </div>
        </div>
      );
    case "Configurações":
      return (
        <div className={styles.psiPanelDisplay}>
          <div className={styles.settingsDisplay}>
            <div className={styles.profileSettings}>
              <div className={styles.headerProfileSettings}>
                <span>Informações Pessoais</span>
              </div>
              <div className={styles.inputsProfileSettings}>
                <div className={styles.leftInputProfile}>
                  <div className={styles.inputFodase}>
                    <p>Nome</p>
                    <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                  </div>
                  <div className={styles.inputFodase}>
                    <p>Data de Nascimento</p>
                    <input type="date" placeholder="Data de Nascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                  </div>
                  <div className={styles.inputFodase}>
                    <p>Telefone</p>
                    <input type="tel" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                  </div>
                  <div className={styles.inputFodase}>
                    <p>CPF</p>
                    <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                  </div>
                  <div className={styles.inputFodase}>
                    <p>CRP</p>
                    <input type="text" placeholder="CRP" value={crp} onChange={(e) => setCrp(e.target.value)} />
                  </div>
                </div>
                <div className={styles.rightInputProfile}>
                  <div className={styles.inputFodase}>
                    <p>Email</p>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className={styles.inputFodase}>
                    <p>Gênero</p>
                    <input type="text" placeholder="Gênero" value={genero} onChange={(e) => setGenero(e.target.value)} />
                  </div>
                  <div className={styles.inputFodase}>
                    <p>CEP</p>
                    <input type="text" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
                  </div>
                  <div className={styles.inputFodase}>
                    <p>CNPJ</p>
                    <input type="text" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className={styles.buttonsProfileSettings}>
                <button onClick={handleSaveSettings}>Salvar</button>
              </div>
            </div>
            <div className={styles.detailsSettings}>
              <div className={styles.detailAdd}>
                <span>Experiências</span>
                <img src={plusIcon} alt="Adicionar" onClick={() => setShowModalExp(true)} />
              </div>
              <div className={styles.detailAdd}>
                <span>Formações</span>
                <img src={plusIcon} alt="Adicionar" />
              </div>
              <div className={styles.detailAdd}>
                <span>Especialidades</span>
                <img src={plusIcon} alt="Adicionar" />
              </div>
            </div>
          </div>
          {showModalExp && <modalExperiencia showModalExp={showModalExp} setShowModalExp={setShowModalExp} />}
        </div>
      );
    case "Perfil":
      return (
        <>
          <div className={styles.psiPanelDisplay}>
            <div className={styles.profileConfig}>
              <div className={styles.profileConfigHeader}>
                <span>Configurações de Perfil</span>
              </div>
              <div className={styles.profileConfigBody}>
                <div className={styles.profileConfigA}>
                  <p>Sua foto de perfil</p>
                  <img src={userLogo} alt="Avatar" />
                  <button>Anexar</button>
                </div>
                <div className={styles.profileConfigB}>
                  <p>Sua Anamnese</p>
                  <button>Anexar</button>
                </div>
                <div className={styles.profileConfigC}>
                  <p>Seu plano de fundo de Perfil</p>
                  <button>Anexar</button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    default:
      return <div className={styles.psiPanelDisplay}>Default Content</div>;
  }
};

const modalExperiencia = ({showModalExp, setShowModalExp}) => {
  return (
    <div className={styles.modalExperiencia}>
      <span>Experiência</span>
    </div>
  );
};




export default Psipanel;
