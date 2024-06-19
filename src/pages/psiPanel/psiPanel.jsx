import React from "react";
import styles from "./psiPanel.module.css";

import SideBar from "../../components/SideBar/SideBar";
import {Link} from "react-router-dom";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";


const PsiPanel = () => {
    const [actualPage, setActualPage] = React.useState("perfil");
    return (
        <main className={styles.mainPsiPanel}>
          <SideBar mode="psi" actualPage="perfil" setActualPage={setActualPage} />
            {(() => {
                switch (actualPage) {
                    case "perfil":
                        return(
                    <ProfileEdit mode="psi"/>
                        )
                    case "agenda":
                        return <div>B</div>
                    case "configuracoes":
                        return <div>C</div>
                    default:
                }
            })()}

        </main>
    );
}

export default PsiPanel;