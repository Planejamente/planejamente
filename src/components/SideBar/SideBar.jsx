import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SideBar.module.css";
import logo from "../../utils/assets/logo-dark.svg";
import SideBarItem from "../SideBarItem/SideBarItem";

const SideBar = ({ mode, actualPage, setActualPage}) => {
    const [activeItem, setActiveItem] = useState(actualPage);

    const handleClick = (itemText) => {
        setActiveItem(itemText);
        setActualPage(itemText);
    };

    switch (mode) {
        case "psi":
            return (
                <nav className={`${styles.sidebarPsi} ${styles.sidebar}`}>
                    <img className={`${styles.logoPsiPanel}`} src={logo} alt="Logo" />
                    <div className={styles.sideItems}>
                        <SideBarItem text="perfil" active={activeItem === "perfil" ? "a" : null} click={() => handleClick("perfil")}/>
                        <SideBarItem text="agenda" active={activeItem === "agenda" ? "a" : null} click={() => handleClick("agenda")}/>
                        <SideBarItem text="configuracoes" active={activeItem === "configuracoes" ? "a" : null} click={() => handleClick("configuracoes")}/>
                    </div>
                    <SideBarItem text="sair" />
                </nav>
            );
        case "pac":
            return (
                <nav className={`${styles.sidebarPsi} ${styles.sidebar}`}>
                    <img className={`${styles.logoPsiPanel}`} src={logo} alt="Logo" />
                    <div className={styles.sideItems}>
                        <SideBarItem text="perfil" active={activeItem === "perfil" ? "a" : null} click={() => handleClick("perfil")}/>
                        <SideBarItem text="agenda" active={activeItem === "agenda" ? "a" : null} click={() => handleClick("agenda")}/>
                    </div>
                    <SideBarItem text="sair" />
                </nav>
            );
    }
}

export default SideBar;