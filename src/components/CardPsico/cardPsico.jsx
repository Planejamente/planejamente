import React from "react";
import styles from "./cardPsico.module.css";
// import profilePic from "../../utils/assets/lauraSantos.png"
import star from "../../utils/assets/Star 13.png"
import check from "../../utils/assets/check-icon.png"
import { useNavigate } from "react-router-dom";

// const CardPsico = () => {
//     return (
//         <div className={styles['card']}>
//             <div className={styles['header']}>
//                 <div className={styles['img']}>
//                     <img src={profilePic} alt="Avatar" />
//                 </div>
//                 <div className={styles["header-info"]}>
//                     <h4><b>Laura Santos</b></h4>
//                     <p>Psicólogia | 19 anos de experiência</p>
//                     <p>CRP: 12345/65</p>
//                     <p className={styles['espec']}>Casais</p>
//                 </div>
//             </div>

//             <div className={styles['content']}>
//                 <div className={styles['sobre']}>
//                     <p>Sou uma psicóloga experiente em temas como: bem-estar, equilíbrio emocional, ansiedade, motivação, atenção e humor, bem como em questões relacionadas à carreira: motivação, mentoria, trasição e recolocação.Vamos juntos promover mudanças positivas em sua vida e avançar em sua jornada!? </p>
//                 </div>
//                 <div className={styles['infos']}>
//                     <div className={styles['nota']}>
//                         <img src={star} alt="Estrela" /><p>4.2</p>
//                     </div>
//                     <div className={styles['atendimentos']}>
//                         <img src={check} alt="Ícone de Check"/><p><b>30</b> Atendimentos</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


//Teste do uso de axios para buscar dados da API(MockApi)
const CardPsico = ({nome, headline, crp, espec, descricao, avaliacao, qntAtendimentos, imagemUrl, id, horarios}) => {
    const navigate = useNavigate();
    const maxLenght = 130;

    if (descricao.length > maxLenght) {
        descricao = descricao.substring(0, maxLenght) + '...';
    }

    const handleClick = () =>{
        const horariosPsicologo = {
            id: id,
            horarios: horarios
        };
        console.log(horariosPsicologo);

        // navigate('/PerfilPsic', {state: horariosPsicologo});
        navigate(`/PerfilPsic/${id}`);
    }

    return (
        <div className={styles['card']} onClick={handleClick}>
            <div className={styles['header']}>
                <div className={styles['img-container']}>
                    <img src={imagemUrl} alt="Avatar" className={styles['img']}/>
                </div>
                <div className={styles["header-info"]}>
                    <h4><b>{nome} 
                    </b></h4>
                    <p>{headline}</p>
                    <p>CRP: {crp}</p>
                    <p className={styles['espec']}>{espec}</p>
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
                        <img src={check} alt="Ícone de Check"/><p><b>{qntAtendimentos}</b> Atendimentos</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPsico;