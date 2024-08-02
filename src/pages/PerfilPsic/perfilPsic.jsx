import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";
import styles from "./perfilPsic.module.css";
import star from "../../utils/assets/Star 13.png";
import check from "../../utils/assets/check-icon.png"
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profilePic from "../../utils/assets/sem-imagem-avatar.png"
import background from "../../utils/assets/vecteezy_modern-abstract-white-and-gray-gradient-background-with_10405766.jpg"
import api from "../../api";
import Cookies from "js-cookie";

const PerfilPsic = () => {
    const centralize = () => {
        window.scrollTo(0, 0);
    }

    const { id } = useParams();
    const [psicologo, setPsicologo] = useState(null);
    const horarios = Cookies.get('horarios') ? JSON.parse(Cookies.get('horarios')) : null;
    console.log("Cokkie horários:" + horarios);

    const consultaData = {
        dtCriacao: new Date().toISOString(),
        idPsicologo: id,
        //Tem que pegar o id do paciente logado, esse chubado não da
        idPaciente: "6e031bb1-9bf2-417a-aa41-8b9baa6675dd",
        // idPaciente: token,
        linkAnamnese: "linkAnamnese_70b03b99fe87",
        // inicio: horarios.dataHoraInicio,
        // fim: horarios.dataHoraFim,
        inicio: "2024-12-31T16:00:01",
        fim: "2024-12-31T18:00:01",
        idAnamnese: "idAnamnese_b3b31d2103de",
        // accessToken: Cookies.get('access_token'),
        accessToken: "ya29.a0AXooCgtO4jijhZnN83Z0xMsFUsD2hxnK-fLHgsDdBUKmaQcajNkr4kxHNxSPlA4bcI3TbWNwuXnLHROs3C_OLkNybSh6O-avK9uWF52Ho4z7jsQM-3QAQAajmT0WIoBruN-siCWQIojUqRHyTMZMyx_OyGdCEPg7sGjjaCgYKAS0SARASFQHGX2Mi2liW4XI5GyZ-zKN81WDZCA0171",
        //Calendar ta chunbado ainda
        calendarId: "800be934d85c548a2df2bdf97bbaf7d76864a46b1b99753487ede7e89fd9389b@group.calendar.google.com"
    };

    console.log(consultaData);

    const agendarConsulta = async () => {
        api.post('/consultas', consultaData)
            .then(response => {
                console.log(response.data);
                toast.success("Agendamento solicitado com sucesso!");
            })
            .catch(error => {
                toast.error("Falha ao solicitar agendamento!")
                console.error('Erro na requisição:', error);
            });
    };

    useEffect(() => {
        api.get(`psicologos/${id}`).then((response) => {
            setPsicologo(response.data);
        });
    }, [id]);

    console.log(psicologo);

    return (
        <div className={styles['body']} onLoad={centralize}>
            <NavBar />
            <div className={styles['fundo-container']}>
                <img src={psicologo?.fundo || background} alt="Avatar" className={styles['img-fundo']} />
            </div>
            <div className={styles['info-container']}>

                <div className={styles["header"]}>
                    <div className={styles['img-container']}>
                        <img src={psicologo?.fotoPerfil || profilePic} alt="Avatar" className={styles['img']} />
                    </div>

                    <div className={styles["nome"]}>
                        <h2>{psicologo?.nome}</h2>
                        <p>{psicologo?.idade} Anos</p>
                        <div className={styles["notaAtendi"]}>
                            <div className={styles['nota']}>
                                <img src={star} alt="Estrela" /><p><b>{psicologo?.avaliacao}</b></p>
                            </div>

                            <div className={styles['atendimentos']}>
                                <img src={check} alt="Ícone de Check" /><p><b>{psicologo?.qtdAtendimentos}</b> Atendimentos</p>
                            </div>
                        </div>
                        <p className={styles['espec']}>{psicologo?.especialidade || "Atendimento Clínico"}</p>
                    </div>
                    <div className={styles["crpEstado"]}>
                        <p>CRP: {psicologo?.crp}</p>
                        <p>{psicologo?.estado}|SP</p>
                    </div>
                </div>
                <div>
                    {/* <button className={styles['bntAgend']} onClick={notify}>Solicitar Agendamento</button> */}
                    <button className={styles['bntAgend']} onClick={agendarConsulta}>Solicitar Agendamento</button>
                </div>
                {/* <div className={styles['buttonSobre']}> */}
                <div className={styles['sobre']}>
                    <h2>Sobre</h2>
                    <p>{psicologo?.descricao}</p>
                    {/* </div> */}
                </div>
                <div className={styles['espForm']}>
                    <div className={styles['especialidade']}>
                        <h2>Especialidades</h2>
                        <br />
                        <p>{psicologo?.especialidade[1] || "Atendimento Clínico"}</p>
                    </div>
                    <div className={styles['formacao']}>
                        <h2>Formação</h2>
                        <br/>
                        <h3>{psicologo?.experienciasFormacoes[0] || "Faculdade"}</h3>
                        <p>{psicologo?.experienciasFormacoes[1] || "Bacharelado"}</p>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default PerfilPsic;