import React from "react";
import styles from "./pacPanel.module.css";

import SideBar from "../../components/SideBar/SideBar";
import { Link } from "react-router-dom";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import Agenda from "../../components/Agenda/Agenda";
import Configuracoes from "../../components/Configuracoes/Configuracoes";

const PacPanel = () => {
  const [actualPage, setActualPage] = React.useState("perfil");
  return (
    <main className={styles.mainPsiPanel}>
      <SideBar mode="pac" actualPage="perfil" setActualPage={setActualPage} />
      {(() => {
        switch (actualPage) {
          case "perfil":
            return <ProfileEdit mode="pac" />;
          case "agenda":
            return <Agenda />;
          default:
        }
      })()}
    </main>
  );
};

export default PacPanel;
