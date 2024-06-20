import React from "react";
import styles from "./cardPsico.module.css";
import profilePic from "../../utils/assets/sem-imagem-avatar.png"
import star from "../../utils/assets/Star 13.png"
import check from "../../utils/assets/check-icon.png"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CardPsico = ({nome, headline, crp, especialidade, descricao, avaliacao, qtdAtendimentos, fotoPerfil, id, horarios}) => {
    const navigate = useNavigate();
    const maxLenght = 130;

    if (descricao === null) {
        descricao = "Descrição não informada.";
    }

    if (descricao.length > maxLenght) {
        descricao = descricao.substring(0, maxLenght) + '...';
    }

    const handleClick = () =>{
        const horariosPsicologo = {
            id: id,
            horarios: horarios
        };
        console.log(horariosPsicologo);
        Cookies.set('idPsicologo', id, { expires: 1 }); 

        navigate(`/PerfilPsic/${id}`);
    }

    return (
        <div className={styles['card']} onClick={handleClick}>
            <div className={styles['header']}>
                <div className={styles['img-container']}>
                    <img src={fotoPerfil || profilePic} alt="Avatar" className={styles['img']}/>
                </div>
                <div className={styles["header-info"]}>
                    <h4><b>{nome} 
                    </b></h4>
                    <p>{headline || "Psicólogo"}</p>
                    <p>CRP: {crp || "Não informado"}</p>
                    <p className={styles['espec']}>{especialidade || "Atendimento Clínico"}</p>
                </div>
            </div>

            <div className={styles['content']}>
                <div className={styles['sobre']}>
                    <p>{descricao}</p>
                </div>
                <div className={styles['infos']}>
                    <div className={styles['nota']}>
                        <img src={star} alt="Estrela" /><p>{avaliacao}</p>
                    </div>
                    <div className={styles['atendimentos']}>
                        <img src={check} alt="Ícone de Check"/><p><b>{qtdAtendimentos}</b> Atendimentos</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CardPsico;