import React from "react";
import styles from "./Login.module.css";
import Logo from "../../utils/assets/logo-small.svg";
import GoogleButton from "../../utils/assets/google-button.png";
import {
    // GoogleLogin,
    useGoogleLogin,
} from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [sub, setSub] = React.useState('');

    //Paciente
    const handleGoogleSuccess = async (credentialResponse) => {
        // console.log("Login bem-sucedido:", credentialResponse); 
        await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ` + credentialResponse.access_token,
            },
            // body: JSON.stringify({authUser})
        })
            .then(response => response.json())
            .then(async data => {
                setEmail(data.email);
                setSub(data.sub);
                await fetch('https://api-61hu.onrender.com/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: data.email, googlesub: data.sub})
                })
                .then(async response => {
                    if(response.status === 200){
                      await fetch('https://api-61hu.onrender.com/auth/user-type', {
                        method: 'GET',
                        parms: {email: data.email}
                      })
                      .then(response = response.json())
                      .then(data => {
                        console.log(data);
                      })     
                    } 
                    // else {
                    //     Touch.console.error('Erro ao logar');
                    // }
                
                })
                
            })
            // const authUser = {
            //     email: email,
            //     googlesub: sub
            // };
            // console.log(authUser);
            // navigate('/BemVindoPaciente');
    };



    const googleLogin = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        // onError: handleGoogleSuccessPac,  
        // ux_mode: 'popup'
    });

    return (
        <div className={styles['body']}>
            <div className={styles["logo"]}>
                <img src={Logo} alt="Logo" />
            </div>
            <div className={styles["welc"]}>Bem vindo de volta!</div>
            <div className={styles["container"]}>
                <div className={styles["content"]}>
                    <img className={styles["bntGoogle"]} src={GoogleButton} alt="Botão para logar no google" onClick={googleLogin} />
                </div>
                <div className={styles["cadastro"]}>Não possui uma conta? <a className={styles["bntCadastro"]} href="/cadastro">Cadastrar-se</a></div>
            </div>
        </div>
    );
};

export default Login;