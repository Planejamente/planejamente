import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ProfileEdit.module.css";
import InputMod from "../InputMod/InputMod";
import BotaoOpenModal from "../../utils/assets/plus.svg";
import Mascara from "../../service/mascaraService";
import api from "../../api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";


const ProfileEdit = ({ mode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [birth, setBirth] = useState("");
  const [cep, setCep] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [crp, setCrp] = useState("");

  const [cargo, setCargo] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [descricao, setDescricao] = useState("");
  const [exps, setExps] = useState([]); // [ { cargo: '', dataInicio: '', instituicao: '', dataFim: '', descricao: '' }
  
  
  const [reload, setReload] = useState(false);
  
  const [isModalAOpen, setIsModalAOpen] = useState(false);
  const openModalA = () => setIsModalAOpen(true);
const closeModalA = () => setIsModalAOpen(false);

useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetching psychologist data
      const responsePsicologo = await api.get(`/psicologos/${Cookies.get('id')}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      console.log(responsePsicologo.data);
      const { nome, email, telefone, genero, dataNascimento, cep, cpf, cnpj, crp } = responsePsicologo.data;
      setName(nome);
      setEmail(email);
      setPhone(telefone);
      setSex(genero);
      setBirth(dataNascimento);
      setCep(cep);
      setCpf(cpf);
      setCnpj(cnpj);
      setCrp(crp);

      // Fetching experience data
      const responseExp = await api.get(`/experiencias-formacoes/${Cookies.get('id')}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      console.log(responseExp.data);
      // Assuming you have a state setter function for experiences
      setExps(responseExp.data);
      console.log(responseExp.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  if (reload) setReload(false);
  }, [reload]); // Ensure dependencies are correctly listed, if any

  const mascara = Mascara.instance;

  const handleSave = () => {
    api.put(`/psicologos/${Cookies.get('id')}`, {
      nome: name,
      telefone: phone,
      genero: sex,
      dataNascimento: birth,
      cep: cep,
    }, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
    .then(response => {
      // Tratar sucesso da requisição
      console.log('Perfil atualizado com sucesso!', response);
    })
    .catch(error => {
      // Tratar erro da requisição
      console.error('Erro ao atualizar perfil', error);
    });
  };

  const handleSaveExperiencia = () => {
    api.post('/experiencias-formacoes', {
      cargo: cargo,
      dataInicio: dataInicio,
      instituicao: instituicao,
      dataFim: dataFim,
      descricao: descricao,
      tipo:"Experiência",
      titulo: "Null",
      idPsicologo: Cookies.get('id')
    }, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
    .then(response => {
      // Tratar sucesso da requisição
      setExps([...exps, {
        cargo: cargo,
        dataInicio: dataInicio,
        instituicao: instituicao,
        dataFim: dataFim,
        descricao: descricao
      }]);
      setCargo('');
      setDataInicio('');
      setInstituicao('');
      setDataFim('');
      setDescricao('');
      toast.success('Experiência salva com sucesso!');
      setReload(true);
      console.log('Experiência salva com sucesso!', response);
    })
    .catch(error => {
      // Tratar erro da requisição
      console.error('Erro ao salvar experiência', error);
    });
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.formEditProfile}>
          <div className={styles.formLabel}>Informações Pessoais</div>
          <div className={styles.inputProfile}>
            <InputMod
              type="text"
              mode="dark"
              value={name}
              label="Nome"
              name="Nome"
              onChange={(e) => setName(e.target.value)}
            />

            <InputMod
              type="text"
              mode="dark"
              value={email}
              label="Email"
              name="Email"
              disabled={true} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputMod
              type="date"
              label="Data de Nascimento"
              value={birth}
              name="Data de Nascimento"
              mode="dark"
              onChange={(e) => setBirth(e.target.value)}
            />
            <InputMod
              mode="dark"
              type="select"
              label="Sexo"
              value={sex}
              name="Sexo"
              onChange={(e) => setSex(e.target.value)}
            />

            <InputMod
              type="text"
              mode="dark"
              value={phone}
              label="Telefone"
              name="Telefone"
              onChange={(e) =>
                setPhone(mascara.formatarCelular(e.target.value))
              }
            />
            <InputMod
              type="text"
              mode="dark"
              value={cep}
              label="CEP"
              name="CEP"
              onChange={(e) => setCep(mascara.formarCep(e.target.value))}
            />

            <InputMod
              type="text"
              mode="dark"
              label="CPF"
              name="CPF"
              value={cpf}
              disabled={true} 

              onChange={(e) => setCpf(mascara.formatarCpf(e.target.value))}
            />

            <InputMod
              type="text"
              mode="dark"
              value={cnpj}
              label="CNPJ"
              name="CNPJ"
              disabled={true} 

              onChange={(e) => setCnpj(mascara.formatarCnpj(e.target.value))}
            />
            <InputMod
              type="text"
              value={crp}
              mode="dark"
              label="CRP"
              name="CRP"
              disabled={true} 

              onChange={(e) => setCrp(e.target.value)}
            />
          </div>
          <div className={styles.btnSaveProfile}>
            <button onClick={handleSave}>Salvar</button>
          </div>
        </div>
        <div className={styles.containerOutrasInfos}>
          <div className={styles.experiencias}>
            Experiências
            <div>
              <button>
                <img src={BotaoOpenModal} alt="" onClick={openModalA}/>
              </button>
            </div>
          </div>
          <div className={styles.formacoes}>
            Formações
            <div>
              <button>
                <img src={BotaoOpenModal} alt="" />
              </button>
            </div>
          </div>
          <div className={styles.especialidade}>
            Especialidade
            <div>
              <button>
                <img src={BotaoOpenModal} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
{isModalAOpen && (
      <div className={styles.modalProfile} style={{ display: `flex` }} onClick={closeModalA}>
        <div className={styles.mainModal} onClick={(event) => event.stopPropagation()}>
          <div className={styles.leftModal}>
            <div className={styles.headerModal}>
              Suas Experiências
            </div>
            <div className={styles.inputsModal}>
              <div className={styles.sectionInputA}>
                <InputMod onChange={(e) => setCargo(e.target.value)} value={cargo} 
                 type="text" mode="dark" label="Cargo" padding="0px 8px 0px 8px" />
                <InputMod onChange={(e) => setDataInicio(e.target.value)} value={dataInicio} 
                type="date" mode="dark" label="Data de início" padding="0px 8px 0px 8px" />

              </div>
              <div className={styles.sectionInputB}>

                <InputMod onChange={(e) => setInstituicao(e.target.value)} value={instituicao} 
                type="text" mode="dark" label="Instituição" padding="0px 8px 0px 8px" />
                <InputMod onChange={(e) => setDataFim(e.target.value)} value={dataFim}
                 type="date" mode="dark" label="Data de fim" padding="0px 8px 0px 8px" />
              </div>

            </div>
            <div className={styles.sectionInputC}>
            <InputMod onChange={(e) => setDescricao(e.target.value)} value={descricao}
             type="textarea" mode="dark" label="Descrição" padding="0px 8px 0px 8px" />

            </div>
            <div className={styles.btnSaveModal}>
              <button onClick={handleSaveExperiencia}>Salvar</button>
            </div>
          </div>
          <div className={styles.rightModal}>
            <div className={styles.expCards}>
      {/* experiencias ai */}
              {exps.map((exp, index) => (
                <div className={styles.expCard} key={index}>
                  <div className={styles.cargoExp}>Cargo: {exp.cargo}</div>
                  <div className={styles.instExp}>Instituição: {exp.instituicao}</div>
                  <div className={styles.dtInExp}>Início: {exp.dataInicio}</div>
                  <div className={styles.dtOutExp}>Fim: {exp.dataFim}</div>
                  <div className={styles.delExp}>Apagar</div>
                </div>
              ))
            }
            </div>

          </div>
        </div>
      </div>  
)}
    </>
  );
};

export default ProfileEdit;