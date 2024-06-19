class MascaraService {
  static _intansce;

  // Nesse arquivo ele se comporta como se fosse uma classe Java
  // Você pode usar o método instance para acessar a instância da classe
  // e chamar os métodos que você desenvolveu

  static get instance(){
    if(!this._instance){
      this._instance = new MascaraService();
    }
    return this._instance;
  }

  formatarCpf(cpf) {
    let formattedCpf = cpf.replace(/\D/g, "");
      if (formattedCpf.length <= 3) {
        formattedCpf = formattedCpf.replace(/(\d{3})/, "$1");
      } else if (formattedCpf.length <= 6) {
        formattedCpf = formattedCpf.replace(/(\d{3})(\d{1,3})/, "$1.$2");
      } else if (formattedCpf.length <= 9) {
        formattedCpf = formattedCpf.replace(
          /(\d{3})(\d{3})(\d{1,3})/,
          "$1.$2.$3"
        );
      } else {
        formattedCpf = formattedCpf.replace(
          /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
          "$1.$2.$3-$4"
        );
        
      }
       return (formattedCpf.slice(0, 14));
  };

  formatarCelular(celular){
      let formattedPhone = celular.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
      if (formattedPhone.length <= 0) {
        formattedPhone = formattedPhone.replace(/(\d{2})/, "($1)");
      } else if (formattedPhone.length <= 7) {
        formattedPhone = formattedPhone.replace(/(\d{2})(\d{1,5})/, "($1) $2");
      } else {
        formattedPhone = formattedPhone.replace(
          /(\d{2})(\d{1,4})(\d{1,4})/,
          "($1) $2-$3"
        );
      }
        return(formattedPhone.slice(0, 15));
  };

  formarCep(cep){
      let formattedCep = cep.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
      if (formattedCep.length <= 5) {
        formattedCep = formattedCep.replace(/(\d{5})/, "$1");
      } else {
        formattedCep = formattedCep.replace(/(\d{5})(\d{1,3})/, "$1-$2");
      }
        return (formattedCep.slice(0, 9));
  };

  formatarCnpj(cnpj){
    let formattedCnpj = cnpj.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    if (formattedCnpj.length <= 2) {
      formattedCnpj = formattedCnpj.replace(/(\d{2})/, "$1");
    } else if (formattedCnpj.length <= 5) {
      formattedCnpj = formattedCnpj.replace(/(\d{2})(\d{1,3})/, "$1.$2");
    } else if (formattedCnpj.length <= 8) {
      formattedCnpj = formattedCnpj.replace(
        /(\d{2})(\d{3})(\d{1,3})/,
        "$1.$2.$3"
      );
    } else {
      formattedCnpj = formattedCnpj.replace(
        /(\d{2})(\d{3})(\d{3})(\d{1,4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    }
      return (formattedCnpj.slice(0, 18));
  }
} export default MascaraService;