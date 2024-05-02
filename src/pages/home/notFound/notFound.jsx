import React from 'react';
import styles from './notFound.css';
import NavBar from '../../../components/NavBar/navbar';
import imgNotFound from '../../../utils/assets/boneco.svg';
import Logo from "../../../utils/assets/logo2.jpg";

const NotFound = () => {
    return (
        <>
        <NavBar />
        <div className={"content"}>
        <h1>Página não encontrada</h1>
        <img src={imgNotFound} alt="Erro 404" />
        </div>
        </>
    
    );
};
export default NotFound