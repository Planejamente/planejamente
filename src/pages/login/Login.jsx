import React from "react";
import styles from "./Login.module.css";
import logo from "../../utils/assets/logo-light.svg";
import googleButton from "../../utils/assets/google-button.svg";
import {
    useGoogleLogin,
} from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../api";
import Cookies from "js-cookie";



const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [sub, setSub] = React.useState('');

    const handleGoogleSuccess = async (credentialResponse) => {
        Cookies.set('access_token', credentialResponse.access_token, { expires: 1 }); // expires in 1 day
        console.log(Cookies.get('access_token'));
        await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ` + credentialResponse.access_token,
            },
        })
            .then(response => response.json())
            .then(async data => {
                setEmail(data.email);
                setSub(data.sub);
                console.log(data.sub);
                console.log("sub monstro");
                api.post("auth/login",
                    {
                        email: data.email,
                        googleSub: data.sub
                    })
                .then(async response => {

                    const token = response.data.token
                    console.log(token);
                    console.log(response.data);
                    const tokenSplitted = token.split('.');
                    const tokenPayload = JSON.parse(atob(tokenSplitted[1]));
                    console.log(tokenPayload)
                    
                    Cookies.set('id', tokenPayload.id);
                    Cookies.set('token', token);
                    console.log(Cookies.get('id'));
                    console.log(Cookies.get('token'));
                    console.log("CUKI");
                    if(tokenPayload.tipoUsuario === "psicologo"){
                        // cookie token
                        Cookies.set('token', token);
                        console.log(Cookies.get('token'))
                        navigate("/psipanel")
                    } else if(tokenPayload.tipoUsuario === "paciente"){
                        // cookie token
                        Cookies.set('token', token);
                        console.log(Cookies.get('token'))
                        navigate("/pacpanel")
                    }


                })
                .catch(error => {
                    console.log(error);
                    toast.error('Você não possui uma conta, por favor, cadastre-se!')
                    setTimeout(signUp(), 3000);
                })
            })
    };

    const handleGoogleFail = () => {
        toast.error('Falha ao logar com o Google');
    }



    const googleLogin = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: handleGoogleFail,
        ux_mode: 'popup'
    });

    const signUp = () => {
        navigate('/cadastro');
    }

    const goToHomePage = () => {
        navigate("/");
      };

    return (

    <main className={styles.mainLogin}>
        <form className={styles.formLogin}>
            <img src={logo} alt="Logo" className={styles.logoLogin}  onClick={goToHomePage}/>
            <h1 className={styles.titleLogin}>Bem vindo de volta</h1>
            <img src={googleButton} alt="Botão Google" className={styles.googleButtonLogin} onClick={googleLogin} />
            <span className={styles.signUpLogin}>Não possui uma conta? <span onClick={signUp} className={styles.redirectLogin}>Cadastre-se</span></span>
        </form>
    </main>
    );
};

export default Login;