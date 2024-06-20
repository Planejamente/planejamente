import {React} from "react";
import styles from "./InputMod.module.css";

const InputMod = ({ type, label, value, name, onChange, padding, margin, req, mode, disabled }) => {

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
          {type !== "textarea" &&
              <input
                    // if disabled cursor cursor: not-allowed;
                  className={`${styles.inpInput} ${mode === "dark" ? styles.inpInputDark : ""} ${disabled ? styles.disabledInp : null} ${type === "textarea" ? styles.textarea : null}`}
                  type={type}
                  value={value}
                  name={name}
                  onChange={onChange}
                  on
                  max={type === "date" ? maxDate : undefined}
                  list={name === "Sexo" ? "opcoes" : undefined}
                  disabled={disabled}
                    
              />
          }
              {type === "textarea" && <textarea className={`${styles.textarea} ${mode === "dark" ? styles.textareaDark : ""} ${styles.inpInput}`} value={value} name={name} onChange={onChange}/>}
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
