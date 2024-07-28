import React from "react";
import styles from "./filter.module.css";
import 'react-toastify/dist/ReactToastify.css';

const Filter = ({
    selectedGender,
    handleGenderChange,
    selectedCity,
    handleCityChange,
    age,
    handleAgeChange,
    ageComparison,
    handleAgeComparisonChange
}) => {


    return (
        <div>
            <div className={styles["picklists"]}>
                <label htmlFor="genderSelect" className={styles['labels']}>Gênero: </label>
                <select id="genderSelect" name="gender" value={selectedGender} onChange={handleGenderChange}>
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                </select>

                <label htmlFor="citySelect" className={styles['labels']}>Cidade: </label>
                <select id="citySelect" name="city" value={selectedCity} onChange={handleCityChange}>
                    <option value="">Selecione</option>
                    <option value="sao_paulo">São Paulo</option>
                    <option value="campinas">Campinas</option>
                    <option value="santos">Santos</option>
                    <option value="ribeirao_preto">Ribeirão Preto</option>
                    {/* Adicione mais cidades conforme necessário */}
                </select>

                <label htmlFor="ageInput" className={styles['labels']}>Idade: </label>
                <input
                    type="number"
                    id="ageInput"
                    name="ageInput"
                    value={age}
                    onChange={handleAgeChange}
                    min={18}
                    max={100}
                />

                <select id="ageComparisonSelect" name="ageComparison" value={ageComparison} onChange={handleAgeComparisonChange} className={styles['labels']}>
                    <option value="">Selecione</option>
                    <option value="menor">Menor que</option>
                    <option value="maior">Maior que</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;
