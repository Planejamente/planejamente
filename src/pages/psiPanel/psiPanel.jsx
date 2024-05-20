import React from "react";
import styles from "./psiPanel.module.css";
import SideBar from "../../components/SideBar/SideBar";

const PsiPanel = () => {

    return (
        <main className={styles.mainPsiPanel}>
            <SideBar mode="psi" actualPage="perfil" />
        </main>
    );
}

export default PsiPanel;