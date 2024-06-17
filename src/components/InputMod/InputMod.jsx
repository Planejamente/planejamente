import {React} from "react";
import styles from "./InputMod.module.css";

const InputMod = ({ type, label, value, name, onChange, padding, margin, req, mode }) => {

    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate()).toISOString().split('T')[0];
  
  return (
      <>
          <div className={`${styles.main} ${mode === "dark" ? styles.labInputDark : ""}`}
               style={{padding: padding, margin: margin}}><label
              className={`${styles.inpLabel} ${mode === "dark" ? styles.labInputDark : ""}`}>
              {label}
              {label && req != null && <span className={styles.req}>*</span>}
          </label>
              <input
                  className={`${styles.inpInput} ${mode === "dark" ? styles.inpInputDark : ""}`}
                  type={type}
                  value={value}
                  name={name}
                  onChange={onChange}
                  on
                  max={type === "date" ? maxDate : undefined}
                  list={name === "Sexo" ? "opcoes" : undefined}
              />
              {name === "Sexo" && (
                  <datalist id="opcoes">
                      <option value="Masculino"/>
                      <option value="Feminino"/>
                      <option value="Outro"/>
                  </datalist>
              )}
          </div>
      </>
  );
};

export default InputMod;
