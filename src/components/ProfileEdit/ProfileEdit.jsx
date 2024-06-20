import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ProfileEdit.module.css";
import InputMod from "../InputMod/InputMod";
import BotaoOpenModal from "../../utils/assets/plus.svg";
import Mascara from "../../service/mascaraService";
import api from "../../api";
import Cookies from "js-cookie";


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
  const [isModalAOpen, setIsModalAOpen] = useState(false);
  const openModalA = () => setIsModalAOpen(true);
const closeModalA = () => setIsModalAOpen(false);

  useEffect(() => {
   api.get(`/psicologos/${Cookies.get('id')}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        .then(response => {
          setName(response.data.nome);
            setEmail(response.data.email);
            setPhone(response.data.telefone);
            setSex(response.data.genero);
            setBirth(response.data.dataNascimento);
            setCep(response.data.cep);
            setCpf(response.data.cpf);
            setCnpj(response.data.cnpj);
            setCrp(response.data.crp);
        })
        .then(data => {
          console.log(data);
            }
        );
}, []);

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
    console.log('Experiência salva!');
  };

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
                <InputMod type="text" mode="dark" label="Cargo" padding="0px 8px 0px 8px" />
                <InputMod type="date" mode="dark" label="Data de início" padding="0px 8px 0px 8px" />

              </div>
              <div className={styles.sectionInputB}>

                <InputMod type="text" mode="dark" label="Instituição" padding="0px 8px 0px 8px" />
                <InputMod type="date" mode="dark" label="Data de fim" padding="0px 8px 0px 8px" />
              </div>

            </div>
            <div className={styles.sectionInputC}>
            <InputMod type="textarea" mode="dark" label="Data de fim" padding="0px 8px 0px 8px" />

            </div>
            <div className={styles.btnSaveModal}>
              <button onClick={handleSaveExperiencia}>Salvar</button>
            </div>
          </div>
          <div className={styles.rightModal}></div>
        </div>
      </div>  
)}
    </>
  );
};

export default ProfileEdit;
