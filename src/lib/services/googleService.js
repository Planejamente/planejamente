import {
    GoogleLogin,
    useGoogleLogin,
    hasGrantedAllScopesGoogle,
  } from "@react-oauth/google";

  const useGoogleLoginCommon = () => useGoogleLogin({
    onSuccess: (response) => handleGoogleSuccessCommon(response),
    onError: (error) => console.error('Error:', error),
    scope: [
      "openid",
      "profile",
      "email"
    ].join(" "),
    ux_mode: 'popup'
  });

  async function handleGoogleSuccessCommon(response) {
    await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ` + response.access_token
        }
      })
          .then(async response => response.json())
          .then(async data => {
                console.log(data)
              }
  );
  };


  export default useGoogleLoginCommon;