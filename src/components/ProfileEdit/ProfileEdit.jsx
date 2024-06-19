import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ProfileEdit.module.css";
import InputMod from "../InputMod/InputMod";
import BotaoOpenModal from "../../utils/assets/plus.svg";
import Mascara from "../../service/mascaraService";

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

  const mascara = Mascara.instance;

  const handleSave = () => {
    console.log(name, email, birth, sex, phone, cep, cpf, cnpj, crp);
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
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputMod
              type="date"
              label="Data de Nascimento"
              name="Data de Nascimento"
              mode="dark"
              onChange={(e) => setBirth(e.target.value)}
            />
            <InputMod
              mode="dark"
              type="select"
              label="Sexo"
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
              onChange={(e) => setCpf(mascara.formatarCpf(e.target.value))}
            />

            <InputMod
              type="text"
              mode="dark"
              value={cnpj}
              label="CNPJ"
              name="CNPJ"
              onChange={(e) => setCnpj(mascara.formatarCnpj(e.target.value))}
            />
            <InputMod
              type="text"
              value={crp}
              mode="dark"
              label="CRP"
              name="CRP"
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
                <img src={BotaoOpenModal} alt="" />
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
    </>
  );
};

export default ProfileEdit;
