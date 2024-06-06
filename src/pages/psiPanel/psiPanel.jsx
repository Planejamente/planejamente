import React from "react";
import styles from "./psiPanel.module.css";

import SideBar from "../../components/SideBar/SideBar";
import {Link} from "react-router-dom";


const PsiPanel = () => {

    return (
        <main className={styles.mainPsiPanel}>
          <SideBar mode="psi" />

        </main>
    );
}

export default PsiPanel;