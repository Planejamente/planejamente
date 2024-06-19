import React from "react";
import styles from "./buscar.module.css";
import SearchIcon from '../../utils/assets/search.png'


const Buscar = ({onClick}) => {

    return (
        <div>
            <button className={styles['bntBuscar']} onClick={onClick}>Buscar
                <img className={styles['searchIcon']} src={SearchIcon} alt="Search Icon" />
            </button>
        </div>
    );
};

export default Buscar;