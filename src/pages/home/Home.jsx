import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import NavBar from "../../components/NavBar/navbar";
// import Logo from "../../utils/assets/logo2.jpg";
import imgPrincipal from "../../utils/assets/fundo.png";
import celular from "../../utils/assets/Group_192_1.png";
import bolas from "../../utils/assets/Group_201.svg";
import agenda from "../../utils/assets/Group_27_1.svg";
import calendario from "../../utils/assets/calendario.png";
// import arrow from "../../utils/assets/Vector.png"
// import Footer from "../../components/Footer/footer";
import odsImage from "../../utils/assets/ods3 2.png";


const Home = () => {
  const navigate = useNavigate();

  const handleConversarClick = () => {
    navigate("/pagina-de-conversa");
  };

  const handleConfira = () => {
    navigate("/confira");
  };

  const handleConfiraProfissionais = () => {
    navigate("/confira");
  };

  return (
    <div className={styles["body"]}>
      <NavBar />
      <section id="sectionHome">
        <div className={styles["container-home"]}>
          <div className={styles["background"]}>

            <img src={imgPrincipal} alt="Imagem de fundo" className={styles.backgroundImage} />

            <div className={styles["home-content"]}>
              <h1 className={styles["title"]}>
                Onde há saúde Mental, <br />Há paz
              </h1>

              <p className={styles["home-text"]}>
                Prepare-se hoje para o amanhã e descubra a tranquilidade de cuidar <br /> da sua mente conosco.
              </p>

              <div className={styles["buttonConv"]}>
                <p onClick={handleConversarClick} className={styles["conversarLink"]}>
                  Confira
                </p>
                {/* <img className={"arrow"} src={arrow} alt="Seta" /> */}
              </div>

            </div>
          </div>
        </div>
      </section>

      <section id="sectionParaVoce">
        <div className={styles["ajudando-pessoas"]}>

          <div className={styles["extraContentInner"]}>
            <p className={styles["extraText"]}>
              Ajudando pessoas a
              <br />
              ajudar pessoas.
            </p>
            <p className={styles["extraText1"]}>
              Queremos diminuir a distância entre profissionais e pacientes,
              desenvolvemos cuidadosamente formas para conectar profissionais de
              saúde mental a pessoas que buscam suporte emocional de uma forma
              acessível e confortável.
            </p>

          </div>
          <img
            src={celular}
            alt="Descrição da imagem"
            className={styles.extraImage}
          />
          <p onClick={handleConfira} className={styles["confiraLink"]}>
            Confira
          </p>
        </div>
      </section>

      <div className={styles["parte3"]} id="sectionEspcialista">
        <div className={styles.parte3Inner}>
          <h2 className={styles.parte3Text}>Profissionais qualificados</h2>
          <p className={styles.parte3Text1}>
            No universo do cuidado mental, a Planejamente emerge como uma
            plataforma que destaca e celebra a presença de profissionais de
            psicologia qualificados. Estes especialistas, dotados de compaixão e
            expertise, trazem consigo a promessa de orientação, apoio e
            transformação na jornada de quem busca equilíbrio emocional.
          </p>

          <p
            onClick={handleConfiraProfissionais}
            className={styles.confiraLinkProfissionais}
          >
            Confira
          </p>
        </div>
        <img
          src={bolas}
          alt="Descrição da imagem"
          className={styles.parte3Image}
        />
      </div>

      <div className={styles.parte31}>
        <div className={styles.parte31Inner}>
          <h1 className={styles.parte31Text}>Mais Soluções Planejamente</h1>

          <h1 className={styles["dashTitle"]}>Dashboard</h1>

          <p className={styles["textoDash"]}>
            Visualize o Sucesso do Seu Atendimento em Tempo Real! Entenda, em um
            piscar de olhos, a qualidade do seu atendimento e seu desempenho com
            dashboards inteligentes.
          </p>
        </div>
        <img
          src={agenda}
          alt="Descrição da imagem"
          className={styles["agenda"]}
        />
      </div>

      <div className={styles.parte31}>
        <img
          src={calendario}
          alt="Descrição da imagem"
          className={styles["calendario"]}
        />
        <div className="agendaSection">
          <h1 className={styles["agendaTitle"]}>Agenda</h1>
          <p className={styles["calenText"]}>
            Chega de cadernos rabiscados, queremos facilitar para você, com a
            integração ao Google Calendar, você terá uma visão organizada com
            direito a lembretes
          </p>
        </div>
      </div>
      <div className={styles["ods-section"]}>
        <div className={styles["ods-text"]}>
          Para nós, cada interação
          é um passo em direção à saúde  mental, alinhada com a ODS 3.
          Conectamos corações e mentes,
          promovendo o  bem-estar e a cura.
          Nosso propósito é claro:
          ajudar pessoas a ajudar  pessoas,
          Uma conversa por vez
        </div>
        <div className={styles["ods-image"]}>
          <a href="https://brasil.un.org/pt-br/sdgs/3" target="_blank" rel="noopener noreferrer">
            <img src={odsImage} alt="Informações da ODS no Link" />
          </a>
          Informações da ODS no Link
        </div>
      </div>
      {/* <Footer /> */}
    </div >
  );
};
export default Home;
