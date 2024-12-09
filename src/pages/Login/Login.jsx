import { React } from "react";
import styles from "./Login.module.css";
import logoLight from "../../asset/logo_light.svg";
import googleIcon from "../../asset/googleBtn.svg";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import { LoginSuccess, LoginNotFound } from "../../component/Toast/Toast";
import api from "../../lib/client/api";
const Login = () => {
  async function handleGoogleSuccessCommon(credentialResponse) {
    console.log(JSON.stringify(credentialResponse));

    Cookies.set("access_token", credentialResponse.access_token);
    await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ` + credentialResponse.access_token,
      },
    })
      .then(async (response) => response.json())
      .then(async (data) => {
        console.log(data);
        
        await api.post('/auth/login', {
          email: data.email,
          googleSub: data.sub
        }).then(res => {
          LoginSuccess();
          let jwtData = decodeJwt(res.data.token);
          Cookies.set("JWT", res.data.token);
          Cookies.set("email", JSON.stringify(jwtData.sub));
          Cookies.set("tipoUsuario", JSON.stringify(jwtData.tipoUsuario).replace(/"/g, ''));
          Cookies.set("id", JSON.stringify(jwtData.id).replace(/"/g, ''));
          if(Cookies.get("tipoUsuario") === "psicologo"){
            setTimeout(() => {
              window.location.href = "/psipanel";
            }, 1200);
          } else {
            setTimeout(() => {
              window.location.href = "/pacpanel";
            }, 1200);
          }
        }).catch(err => {
          console.log(err);
          if (err.response.status === 401) {
            LoginNotFound();
            setTimeout(() => {
              window.location.href = "/register";
            }, 2400);
          }
        })


      });
  }

  function handleGoogleErrorCommon(error) {
    console.log(error);
  }

  const useGoogleLoginCommon = useGoogleLogin({
    onSuccess: handleGoogleSuccessCommon,
    onError: handleGoogleErrorCommon,
    scope: ["openid", "profile", "email"].join(" "),
    ux_mode: "pop-up",
  });

  const decodeBase64Url = (base64Url) => {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  };
  
  const decodeJwt = (token) => {
    try {
      const [header, payload, signature] = token.split('.');
      if (!payload) throw new Error('Invalid token');
      console.log(header, payload, signature);

      return decodeBase64Url(payload);
    } catch (error) {
      console.error('Token inválido', error);
      return null;
    }
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.main}>
          <div className={styles.subMain}>
            <div className={styles.mainLogo}>
              <a href="/">
                <img src={logoLight} alt="logo" />
              </a>
            </div>
            <div className={styles.welcomeText}>
              <h1>Bem vindo(a) de volta!</h1>
            </div>
            <div className={styles.loginButton}>
              <img
                src={googleIcon}
                alt="google"
                onClick={useGoogleLoginCommon}
              />
            </div>
            <div className={styles.signUpButton}>
              <p>
                Não possui uma conta? <a href="/register">Cadastre-se</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontFamily: "Fredoka-r",
          },
        }}
      />
    </>
  );
};

export default Login;
