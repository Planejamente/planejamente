import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import NavBar from "../../components/NavBar/navbar";
import Logo from "../../utils/assets/logo2.jpg";
import imgPrincipal from "../../utils/assets/fundo.png";
import celular from "../../utils/assets/Group_192_1.png";
import bolas from "../../utils/assets/Group_201.svg";
import agenda from "../../utils/assets/Group_27_1.svg";
import calendar from "../../utils/assets/calender.webp";
import calendario from "../../utils/assets/calendario.png";
import Footer from "../../components/Footer/footer";


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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    window.scrollTo({
      behavior: "smooth",
      top: section.offsetTop
    });
  };  

  return (
    <div className={styles.body}>
      <div className={styles.background}>
        <img
          src={imgPrincipal}
          alt="Imagem de fundo"
          className={styles.backgroundImage}
        />
        <NavBar logo={Logo} />
        <div className={styles.container}>
          <h1 className={styles.title}>
            Onde há saúde Mental, <span>Há paz</span>
          </h1>
          <section id="sectionHome">
          <p className={styles.paragraph}>
            Prepare-se hoje para o amanhã e descubra a tranquilidade de cuidar
            da sua mente conosco.
          </p>
          </section>
          <p onClick={handleConversarClick} className={styles.conversarLink}>
            Conversar
          </p>
        </div>
        
      </div>

      <div className={styles.extraContent}>
      
        <div className={styles.extraContentInner}>
        <section id="sectionParaVoce">
          <p className={styles.extraText}>
            Ajudando pessoas a
            <span>
              <br />
            </span>{" "}
            ajudar pessoas.
          </p>
          </section>
          <p className={styles.extraText1}>
            Queremos diminuir a distância entre profissionais e pacientes,
            desenvolvemos cuidadosamente formas para conectar profissionais de
            saúde mental a pessoas que buscam suporte emocional de uma forma
            acessível e confortável.
          </p>
          
          <p onClick={handleConfira} className={styles.confiraLink}>
            Confira
          </p>
        </div>
        <img
          src={celular}
          alt="Descrição da imagem"
          className={styles.extraImage}
        />
      </div>

      <div className={styles.parte3}>
        <div className={styles.parte3Inner}>
          <p className={styles.parte3Text}>Profissionais qualificados</p>
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
        <section id="sectionEspcialista">
          <p className={styles.parte31Text}>Mais Soluções Planejamente</p>
          
          <p className={styles.parte31Text}>Dashboard</p>
          </section>
          <p className={styles.parte31Text1}>
          Visualize o Sucesso do Seu Atendimento em Tempo Real! Entenda, em um
            piscar de olhos, a qualidade do seu atendimento e seu desempenho com
            dashboards inteligentes.
          </p>

          <p
            onClick={handleConfiraProfissionais}
            className={styles.confiraLinkProfissionais}
          >
            Confira
          </p>
        </div>
        <img
          src={agenda}
          alt="Descrição da imagem"
          className={styles.parte31Image}
        />
      </div>

      <div className={styles.parte31}>
        <div className={styles.parte31Inner}>
          <p className={styles.parte31Text}>Agenda</p>
          <p className={styles.parte31Text1}>
         Chega de cadernos rabiscados, queremos facilitar para você, com a
              integração ao Google Calendar, você terá uma visão organizada com
              direito a lembretes
          </p>

          <p
            onClick={handleConfiraProfissionais}
            className={styles.confiraLinkProfissionais}
          >
            Confira
          </p>
        </div>
        <img
          src={calendario}
          alt="Descrição da imagem"
          className={styles.parte31Image}
        />
      </div>
      <Footer  />
    </div>
  );
};
export default Home;
