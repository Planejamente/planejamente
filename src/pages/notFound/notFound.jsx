import React from 'react';
import styles from './notFound.module.css';
import NavBar from '../../components/NavBar/navbar';
import imgNotFound from '../../utils/assets/boneco.svg';


const NotFound = () => {
    return (
        <>
        <NavBar />
        <div className={styles.content}>
        <h1>Página não encontrada</h1>
        <img src={imgNotFound} alt="Erro 404" />
        </div>
        </>
    
    );
};
export default NotFound