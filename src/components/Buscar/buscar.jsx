import React from "react";
import styles from "./buscar.module.css";
import SearchIcon from '../../utils/assets/search.png'

const Buscar = () => {
    return (
        <div>
            <button className={styles['bntBuscar']}>Buscar
                <img className={styles['searchIcon']} src={SearchIcon} alt="Search Icon" />
            </button>
        </div>
    );
};

export default Buscar;