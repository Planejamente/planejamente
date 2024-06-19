import React from "react";
import styles from "./footer.module.css";
// import circleLeft from "../../utils/assets/semi-circles-left.svg";
// import circleRight from "../../utils/assets/semi-circles-right.svg";
import Logo from "../../utils/assets/logo-small.svg";
import twitter from "../../utils/assets/twitter.svg";
import gmail from "../../utils/assets/gmail 1.svg";
import instagram from "../../utils/assets/insta.svg"

const Footer = () => {
    return (
        // <footer>
        //     <div className={styles['links']}>
        //         <p>Sobre</p>
        //         <p>Contato</p>
        //         <p>Carreiras</p>
        //         <p>Termos e condições</p>
        //         <div className={styles['linksLogos']}>
        //             <img src={gmail} alt="Gmail logo" />
        //             <img src={twitter} alt="Twitter logo" />
        //             <img src={instagram} alt="Instagram logo" />
        //         </div>
        //     <img className={styles['footer-logo']} src={Logo} alt="Planejamente Logo" />
        //     </div>
        //     <div className={styles['both-circles']}>
        //     <img className={styles['circleLeft']} src={circleLeft} alt="Semi-circles left" />
        //     <img className={styles['circleRight']} src={circleRight} alt="Semi-circles right" />
        //     </div>
        // </footer>
            <div className={styles['footer']}>
                <p>Sobre</p>
                <p>Contato</p>
                <p>Carreiras</p>
                <p>Termos e condições</p>
                <div className={styles['linksLogos']}>
                    <img src={gmail} alt="Gmail logo" />
                    <img src={twitter} alt="Twitter logo" />
                    <img src={instagram} alt="Instagram logo" />
                <img className={styles['footer-logo']} src={Logo} alt="Planejamente Logo" />
                </div>
            </div>
    );
}

export default Footer;