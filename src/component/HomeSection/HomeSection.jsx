import React from 'react';
import styles from './HomeSection.module.css';
import peopleSecA from '../../asset/peopleHome.png';
import phoneMeetSecB from '../../asset/phoneMeet.png';
import circleSecC from '../../asset/circlesImage.svg';
import dashboardHomeSecD from '../../asset/dashboard_home.png';
import scheduleHomeSecD from '../../asset/schedule_home.png';
import odsThreeSecE from '../../asset/ods3.svg';
const HomeSection = ({modeSection}) => {
    switch(modeSection) {
      case 'SecA': return <SecA />;
      case 'SecB': return <SecB />;
      case 'SecC': return <SecC />;
      case 'SecD': return <SecD />;
      case 'SecE': return <SecE />;
      default: return <SecA />;
    }
};

export default HomeSection;

const SecA = () => <>
  <div className={styles.mainSecA} id="SecA">
    <div className={styles.leftSecA}>
      <div className={styles.leftAlignSecA}>
        <div className={styles.headerSecA}>
          <h1>Onde há Saúde Mental, <br />
        Há paz</h1>
      </div>

      <div className={styles.textSecA}>
        <p>Prepare-se hoje para o amanhã e <br />
        descubra a tranquilidade de cuidar da <br />
        sua mente com a gente.</p>
      </div>
      <div className={styles.btnSecA}>
        Conversar
      </div>
      </div>
    </div>
    <div className={styles.rightSecA}>
      <img src={peopleSecA} alt="peopleSecA" />
    </div>
  </div>
</>;

const SecB = () => <>
  <div className={styles.mainSecB} id="SecB">
    <div className={styles.contentSecB}>
      <div className={styles.leftSecB}>
        <div className={styles.leftAlignSecB}>
          <div className={styles.headerSecB}>
            <h1>Ajudando pessoas <br />a ajudar pessoas.</h1>
          </div>
          <div className={styles.textSecB}>
          Queremos diminuir a distância <br />entre profissionais de saúde mental e pacientes, <br />de uma forma acessível e confortável
          </div>
          <div className={styles.btnSecB}>
            Conversar
          </div>
        </div>
      </div>
      <div className={styles.rightSecB}>
        <img src={phoneMeetSecB} alt="phoneMeetSecB" />
      </div>
    </div>
  </div>
</>;
const SecC = () => <>
<div className={styles.mainSecC}>
  <div className={styles.contentSecC}>
    <div className={styles.leftSecC}>
      <div className={styles.leftAlignSecC}>
        <div className={styles.headerSecC}>
          <h1>Profissionais qualificados</h1>
        </div>
        <div className={styles.textSecC}>
        No universo do cuidado mental, a Planejamente <br />emerge como uma plataforma que destaca e <br />celebra a presença de profissionais de psicologia <br />qualificados. Estes especialistas, dotados de <br />compaixão e expertise, trazem consigo a <br />promessa de orientação, apoio e transformação <br />na jornada de quem busca equilíbrio emocional.
        </div>
        <div className={styles.btnSecC}>
          Conversar
        </div>
      </div>
    </div>
    <div className={styles.rightSecC}>
      <img src={circleSecC} alt="circleSecC" />
    </div>
  </div>
</div>
</>;

const SecD = () => <>
  <div className={styles.mainSecD} id="SecD">
    <div className={styles.contentSecD}>
      <div className={styles.headerSecD}>
        <h1>Mais Soluções Planejamente</h1>
      </div>
      <div className={styles.subSecD}>
        <div className={styles.subHeaderD}>
          <h3>Painel de Performance</h3>
        </div>  
        <div className={styles.subContentD}>
        <img src={dashboardHomeSecD} alt="dashboardHomeSecD" />
        <h2>Visualize o Sucesso do Seu <br />Atendimento em Tempo Real!
        <br />Entenda, em um piscar de olhos, <br />a qualidade do seu atendimento <br />e seu desempenho com <br />dashboards inteligentes.
        </h2>
        </div>
        </div>
        <div className={`${styles.subHeaderD} ${styles.subHeaderD2}`}>
          <h3>Agenda</h3>
        </div>  
        <div className={`${styles.subContentD} ${styles.subContentD2}`}>
        <h2>
        Chega de cadernos rabiscados, <br />queremos facilitar para você, <br />com a integração ao Google Calendar, você terá uma visão organizada com <br />direito a lembretes       
        </h2>
        <img src={scheduleHomeSecD} alt="scheduleHomeSecD" />
        </div>
        </div>
  </div>
</>


const SecE = () => <>
  <div className={styles.mainSecE}>
    <div className={styles.contentSecE}>
      <div className={styles.textSecE}>
        <h1>Para nós, cada interação 
<br />é um passo em direção à saúde <br />mental, alinhada com a ODS 3. 
<br />Conectamos corações e mentes, 
<br />promovendo o  bem-estar e a cura. 
<br />Nosso propósito é claro: 
        <br />ajudar pessoas a ajudar  pessoas, 
        <br />Uma conversa por vez</h1>
      </div>
      <div className={styles.rightSecE}>
        <img src={odsThreeSecE} alt="odsThreeSecE" />
        <p>Informações da ODS na Foto</p>
      </div>

    </div>
  </div>
</>