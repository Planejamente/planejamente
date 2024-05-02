import {React} from "react";
import styles from "./InputMod.module.css";

const InputMod = ({ type, label, value, name, onChange, padding, margin }) => {

    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate()).toISOString().split('T')[0];
  

  return (
    <>
      <div className={styles.main} style={{ padding: padding, margin: margin }}>
        <label>{label}</label>
        <input 
        type={type} 
        value={value} 
        name={name} 
        onChange={onChange} 
        max={type === "date" ? maxDate : undefined}
        list={name === "Sexo" ? "opcoes" : undefined}
         />
         {name === "Sexo" && (
        <datalist id="opcoes">
          <option value="Masculino" />
          <option value="Feminino" />
          <option value="Outro" />
        </datalist>
      )}
      </div>
    </>
  );
};

export default InputMod;
