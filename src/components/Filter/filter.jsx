import React from "react";
import styles from "./filter.module.css";
import 'react-toastify/dist/ReactToastify.css';

const Filter = ({
    selectedGender,
    handleGenderChange,
    selectedCity,
    handleCityChange,
}) => {


    return (
        <div>
            <div className={styles["picklists"]}>
                <label htmlFor="genderSelect" className={styles['labels']}>Gênero: </label>
                <select id="genderSelect" name="gender" value={selectedGender} onChange={handleGenderChange}>
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                </select>

                <label htmlFor="citySelect" className={styles['labels']}>Cidade: </label>
                <select id="citySelect" name="city" value={selectedCity} onChange={handleCityChange}>
                    <option value="">Selecione</option>
                    <option value="sao_paulo">São Paulo</option>
                    <option value="campinas">Campinas</option>
                    <option value="santos">Santos</option>
                    <option value="ribeirao_preto">Ribeirão Preto</option>
                    <option value="Diadema">Diadema</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;
