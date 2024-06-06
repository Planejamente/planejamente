import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SideBar.module.css";
import logo from "../../utils/assets/logo-dark.svg";
import SideBarItem from "../SideBarItem/SideBarItem";

const SideBar = ({ mode, actualPage, setActualPage}) => {
    const [activeItem, setActiveItem] = useState("perfil");

    const handleClick = (itemText) => {
        setActiveItem(itemText);
        console.log(itemText);
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
                        <SideBarItem text="configuracoes" active={activeItem === "configuracoes" ? "a" : null} click={() => handleClick("configuracoes")}/>
                    </div>
                    <SideBarItem text="sair" />
                </nav>
            );
        case "pac":
            switch (actualPage) {
                case "perfil" :
                    return (<></>)
                case "agenda" :
                    return (<></>)
            }
    }
}

export default SideBar;