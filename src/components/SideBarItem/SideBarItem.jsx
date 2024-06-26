import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SideBarItem.module.css";
import userLogo from "../../utils/assets/user_logo.svg";
import gearLogo from "../../utils/assets/gear_logo.svg";
import logoutLogo from "../../utils/assets/logout.svg";
import calendarLogo from "../../utils/assets/calendar_logo.svg";
const SideBarItem = ({text, active, click}) => {
    switch (text) {
        case "perfil":
            return (
                <div className={`${styles.sideItem} ${active ? styles.sideActive : ''}`} onClick={click}>
                    <img src={userLogo} alt="" />
                    <p>Meu Perfil</p>
                </div>
            );
            case "agenda":
                return (
                    <div className={`${styles.sideItem} ${active ? styles.sideActive : ''}`} onClick={click}>
                        <img src={calendarLogo}
                        alt="" />
                        <p>Agenda</p>
                    </div>
                );
                case "configuracoes":
                    return (
                        <div className={`${styles.sideItem} ${active ? styles.sideActive : ''}`} onClick={click}>
                            <img src={gearLogo} alt="" />
                            <p>Configurações</p>
                        </div>
                    );
    case "sair":
        return (
            <div className={`${styles.sideItem} ${styles.sideActive}`}>
                <img src={logoutLogo}
                alt="" />
                <p>Sair</p>
            </div>
        );
    }

}

export default SideBarItem;