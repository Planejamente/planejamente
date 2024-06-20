import React from "react";
import styles from "./Configuracoes.module.css";
import FotoPsicologo from "../../utils/assets/defaultProfilePic.png";
import Anexar from "../../utils/assets/anexar.png";
import DefaultBackgroundImage from "../../utils/assets/planoDeFundoDefault.png";

const Configuracoes = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.containerConfig}>
          <div className={styles.containerLabel}>Informações Pessoais</div>
          <div
            className={styles.containerCards}
          >
            <div className={styles.cardFotoPerfil}>
              <div className={styles.cardLabel}>Sua foto de perfil</div>
              <div className={styles.fotoCard}>
                <div className={styles.molduraFoto}>
                  <img src={FotoPsicologo} alt="Foto Perfil Psicologo" />
                </div>
              </div>
              <div className={styles.btnAnexar}>
                <button>
                  <div>Anexar</div>
                  <div className={styles.imgAnexar}>
                    <img src={Anexar} alt="" />
                  </div>
                </button>
              </div>
            </div>
            <div className={styles.cardAnamnese}>
              <div className={styles.cardLabel}>Sua Anamnese</div>
              <div className={styles.nomeArquivoAnamnese}>nomeArquivo.xlsx</div>
              <div className={styles.btnAnexar}>
                <button>
                  <div>Anexar</div>
                  <div className={styles.imgAnexar}>
                    <img src={Anexar} alt="" />
                  </div>
                </button>
              </div>
            </div>
            <div className={styles.cardPlanoDeFundo}>
              <div className={styles.cardLabel}>Seu plano de fundo</div>
              <div className={styles.containerPlanoDeFundo}>
                <span>Seu Plano de fundo aqui!!!</span>
              </div>
              <div className={styles.btnAnexar}>
                <button>
                  <div>Anexar</div>
                  <div className={styles.imgAnexar}>
                    <img src={Anexar} alt="" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Configuracoes;
