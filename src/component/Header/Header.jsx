import React from 'react';
import styles from './Header.module.css';
import logo from '../../asset/logo_light.svg';
import login from '../../asset/login.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.main}>
        <a href="/">
        <div className={styles.logo}>
          <img src={logo} alt="logo" className={styles.logoImg} />
        </div>
        </a>
        <div className={styles.itens}>
          <div className={styles.item}>
            <p>
            <a href="#SecA" className={styles.itemLink}>
              Home
            </a>
              </p>

          </div>
          <div className={styles.item}>
            <a href="#SecB" className={styles.itemLink}>
              <p>Para Você</p>
            </a>
          </div>
          <div className={styles.item}>
            <a href="#SecD" className={styles.itemLink}>
              <p>Para Especialistas</p>
            </a>
          </div>
            <a href="/login" className={styles.itemLink}>
          <div className={`${styles.item} ${styles.itemLogin}`}>
              <p>Login</p>
            <img src={login} alt="login" />
          </div>
            </a>
        </div>
      </div>

    </header>
  );
};

export default Header;