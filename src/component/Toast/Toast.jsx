import toast from 'react-hot-toast';
  

export const LoginSuccess = () => toast.success('Login com Sucesso!',
    {
        duration: 2400,
        position: 'top-center',
    }

);

export const LoginError = () => toast.error('Login com Erro, Tente novamente.')

export const LoginAlreadyExists = () => {
    toast('Parece que você já possui uma conta!')
}

export const LoginNotFound = () => {
    toast.error('Usuário não existe')
    setTimeout(() => {
        toast('Redirecionando para a tela de Registro...')
    }, 1200);
}


