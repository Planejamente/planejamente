import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ProfileEdit.module.css";
import InputMod from "../InputMod/InputMod";


const ProfileEdit = ({mode}) => {


    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [phone, setPhone] = useState("");
    const [sex, setSex] = useState("");
    const [cep, setCep] = useState("");
    const [cpf, setCpf] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [crp, setCrp] = useState("");


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
            setPhone(formattedPhone.slice(0, 15));
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
            setCep(formattedCep.slice(0, 9));
        }

    }

    const handleSave = () => {
        console.log(name, birth, phone, cep, cpf, cnpj, crp);
    };

    return (
        <div className={styles.containerProfile}>
            <span>
                <h1>Informações Pessoais</h1>
            </span>
            <div className={styles.inputProfile}>
                <InputMod
                    type="text"
                    label="Nome"
                    name="Nome"
                    mode="dark"
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={handlePhoneChange}
                />
                <InputMod
                    type="text"
                    mode="dark"
                    value={cep}
                    label="CEP"
                    name="CEP"
                    onChange={handleCepChange}
                />
                <InputMod
                    type="text"
                    mode="dark"
                    value={cpf}
                    label="CPF"
                    name="CPF"
                    onChange={handleCpfChange}
                />
                <InputMod
                    type="text"
                    mode="dark"
                    value={cnpj}
                    label="CNPJ"
                    name="CNPJ"
                    onChange={(e) => setCnpj(e.target.value)}
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
            <div>

                <button onClick={handleSave}>Salvar</button>
            </div>
        </div>
    );
}

export default ProfileEdit;
