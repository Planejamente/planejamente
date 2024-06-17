import React from "react";
import styles from "./psiPanel.module.css";

import SideBar from "../../components/SideBar/SideBar";
import { Link } from "react-router-dom";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import Agenda from "../../components/Agenda/Agenda";
import Configuracoes from "../../components/Configuracoes/Configuracoes";

const PsiPanel = () => {
  const [actualPage, setActualPage] = React.useState("perfil");
  return (
    <main className={styles.mainPsiPanel}>
      <SideBar mode="psi" actualPage="perfil" setActualPage={setActualPage} />
      {(() => {
        switch (actualPage) {
          case "perfil":
            return <ProfileEdit mode="psi" />;
          case "agenda":
            return <Agenda />;
          case "configuracoes":
            return <Configuracoes />;
          default:
        }
      })()}
    </main>
  );
};

export default PsiPanel;
