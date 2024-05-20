import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SideBar.module.css";
import logo from "../../utils/assets/logo-dark.svg";
import SideBarItem from "../SideBarItem/SideBarItem";

const SideBar = ({ mode, actualPage, setActualPage}) => {
    const [activeItem, setActiveItem] = useState("");

    const handleClick = (itemText) => {
        setActiveItem(itemText);
        console.log(itemText);
        setActualPage(activeItem);
    };

    switch (mode) {
        case "psi":
            return (
                <nav className={`${styles.sidebarPsi} ${styles.sidebar}`}>
                    <img className={`${styles.logoPsiPanel}`} src={logo} alt="Logo" />
                    <div className={styles.sideItems}>
                        <SideBarItem text="perfil" active={activeItem === "perfil" ? "a" : null} onClick={() => handleClick("perfil")}/>
                        <SideBarItem text="configuracoes" active={activeItem === "configuracoes" ? "a" : null} onClick={() => handleClick("configuracoes")}/>
                        <SideBarItem text="configuracoes" active={activeItem === "configuracoes" ? "a" : null} onClick={() => handleClick("configuracoes")}/>
                        <SideBarItem text="configuracoes" active={activeItem === "configuracoes" ? "a" : null} onClick={() => handleClick("configuracoes")}/>
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