import React, {useRef} from "react";
import styles from "./Configuracoes.module.css";
import FotoPsicologo from "../../utils/assets/defaultProfilePic.png";
import Anexar from "../../utils/assets/anexar.png";
import DefaultBackgroundImage from "../../utils/assets/planoDeFundoDefault.png";
import Cookies from "js-cookie";
import api from "../../api";




const Configuracoes = () => {
  const profileFileInput = useRef(null);
  const anamneseFileInput = useRef(null);
  const backFileInput = useRef(null);

  const handleProfileClick = () => {
    profileFileInput.current.click();
  };

  const handleAnamneseClick = () => {
    anamneseFileInput.current.click();
  };

  const handleBackClick = () => {
    backFileInput.current.click();
  };

  const handleProfileFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`File selected: ${file.name}`);
      // form-data
      const formData = new FormData();
      formData.append('images', file);
      formData.append('id', Cookies.get('id'));
      await api.post('/blob/foto-de-usuario', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      
    }
  };

  const handleAnamneseFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`File selected: ${file.name}`);
      // form-data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('idPsi', Cookies.get('id'));
      await api.post('/drive/subir-arquivo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      
    }
  };


  const handleBackFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`File selected: ${file.name}`);
      // form-data
      const formData = new FormData();
      formData.append('images', file);
      formData.append('id', Cookies.get('id'));
      await api.post('/blob/foto-de-fundo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      
    }
  };

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
              <input type="file" className={styles.inpFile} onChange={handleProfileFileChange}  ref={profileFileInput}/>

              <div className={styles.btnAnexar} onClick={handleProfileClick}>
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
              <div className={styles.nomeArquivoAnamnese}>nomeArquivo.pdf</div>
              <input type="file" className={styles.inpFile} onChange={handleAnamneseFileChange}  ref={anamneseFileInput}/>

              <div className={styles.btnAnexar} onClick={handleAnamneseClick}>
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
              <input type="file" className={styles.inpFile} onChange={handleBackFileChange}  ref={backFileInput}/>

              <div className={styles.btnAnexar} onClick={handleBackClick}>
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
