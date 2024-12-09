import React from "react";
import styles from "./Footer.module.css";
import triballLeft from "../../asset/triballleft.svg";
import triballRight from "../../asset/triballright.svg";
import logoLight from "../../asset/logo_light.svg";
import instaLogo from "../../asset/insta.svg";
import outLogo from "../../asset/out.svg";
import xLogo from "../../asset/x.svg";

const Footer = () => {
  return (
    <footer>
      <div className={styles.main}>
        <div className={styles.leftBorder}>
          <img src={triballLeft} alt="triballLeft" />
        </div>
        <div className={styles.linksAndLogoSection}>
          <div className={styles.linksAndLogoSubSection}>
            <div className={styles.links}></div>
              <a href="#SecA">Sobre</a>
              <a href="#SecB">Contato</a>
              <a href="#SecD">Carreira</a>
              <a href="#SecE">Termos de uso</a>
              <img src={instaLogo} alt="instaLogo" />
              <img src={outLogo} alt="outLogo" />
              <img src={xLogo} alt="xLogo" />

            </div>
            <div className={styles.divLogo}>
              <img src={logoLight} alt="logoLight" className={styles.logo} />
            </div>
        </div>
        <div className={styles.rightBorder}>
          <img src={triballRight} alt="triballRight" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
