// trim - remove espaços em verificações.
//sessionStorage - funciona igual ao LocalStorage, entretando quando fechar o navegador, as informações guardadas serão apagadas
//localStorage - armazena dados inseridos e lidos pelo javascript na maquina

function validarcadastro() {

    let nome = document.getElementById("txtUsuario").value.trim();
    let email1 = document.getElementById("txtemail").value.trim();
    let date1 = document.getElementById("date").value;
    let telefone = document.getElementById("telefone").value.trim();
    let senha1 = document.getElementById("senha").value;
    let endereco = document.getElementById("endereco").value.trim();
    let popMessage = document.getElementById("popmessage");
    let confirmar = document.getElementById("confirmsenha").value.trim();

    if (nome === "" || email1 == "" || date1 === "" || telefone == "" || senha1 == "" || endereco == "" || confirmar == "") {
        popMessage.textContent = "todos os campos devem ser preenchidos";
        popMessage.style.color = "red";
        return;

    } if (senha1 !== confirmar) {
        popMessage.textContent = "Senhas não coincidem";
        popMessage.style.color = "red";
        return false;

    } else {

    let dateteste = false; 
    let emailteste = false;
    let senhateste = false;
    
    if (validardata(date1)) {
        dateteste = true;
    }
    if (validarEmail(email1)) {
        emailteste = true;
    }
    if (validarSenha(senha1)) {
        senhateste = true;
    }

    if (dateteste == true && emailteste == true && senhateste == true) {

        localStorage.setItem("nomeLogado", nome);
        localStorage.setItem("emailLogado", email1);
        localStorage.setItem("senhaLogada", senha1);

        popMessage.textContent = "Login aprovado";
        popMessage.style.color = "blue";
        window.location.href = "index.html";
        return;
    }

}

}



function validarSenha(senha) {
    let messagePop = document.getElementById("popmessage");
    let carateresNumeros = "0123456789";
    let carateresMaiusculos = "ABCDEFGHIJLMNOPQRSTUVWXYZ";

    let maisc = false;
    let num = false;

    for (let i = 0; i < senha.length; i++) {

        let verificar = senha.charAt(i);

        if (carateresMaiusculos.indexOf(verificar) !== -1) {
            maisc = true;
        } if (carateresNumeros.indexOf(verificar) !== -1) {
            num = true;
        }
    }

    if (!maisc) {
        messagePop.textContent = "A senha deve conter ao menos uma letra maiscula";
        messagePop.style.color = "red";

        return false;
    } else if (!num) {
        messagePop.textContent = "A senha deve conter ao menos um numero";
        messagePop.style.color = "red";

        return false;
    }

    if(maisc == true && num == true){
        return true;
    }
}

//             controle    limite do array
//string.split(separador, limit) []
//split transforma uma frase em array usando algum metodo de controle para separa, como uma virgula: um,dois,tres => split(',', 2) => ["um", "dois"]

function validarEmail(txtemail) {

    let messagePop = document.getElementById("popmessage");
    var webMail1 = ["gmail.com", "hotmail.com", "outlook.com", "icloud.com", "yahoo.com"];
                                    //pegara o segundo elemento após o resultado da divisão da frase, e comparará com o wwebamil para liberar o acesso
                                    // ou seja, se eu defini a variavel controle como '@', a partir do momento que a verificação identificar o '@',
                                    // separará a frase em um vetor de 2 elementos, como: ["lucas", "gmail.com"], e definindo com [1] no split
                                    // ele pegará apenas o 2° elemento: "gmail.com" e vai comparar com a lista webmail
    let dominio = txtemail.split('@')[1];

    if (webMail1.includes(dominio)) {
        return true;
    } else {
        messagePop.textContent = "Tipo de email inválido!";
        messagePop.style.color = "red";
        return false;
    }
}



function validardata(date) {

    let messagePop = document.getElementById("popmessage");
    let dataAtual = new Date();
    let dataNasc = new Date(date);

    if (isNaN(dataNasc.getTime())) {
        messagePop.textContent = "Data de nascimento inválida!";
        messagePop.style.color = "red";
        return false;
    }

    let idade = dataAtual.getFullYear() - dataNasc.getFullYear();
    let mesAtual = dataAtual.getMonth();
    let mesNasc = dataNasc.getMonth();

    if (mesAtual < mesNasc || (mesAtual === mesNasc && dataAtual.getDate() < dataNasc.getDate())) {
        idade--;
    }

    if (idade < 12) {
        messagePop.textContent = "Este site é permitido para pessoas acima de 12 anos!";
        messagePop.style.color = "red";

        return false;
    }

    return true;
}



function verifylogin() {

    let usuariologin = document.getElementById("LoginUsuario").value.trim();
    let senhalogin = document.getElementById("loginSenha").value.trim();
    let messagePop = document.getElementById("popmessage");

    //função para permitir que seja possivel salvar informações de cadastro.
    let usuarioNome = localStorage.getItem("nomeLogado"); //sessionStorage.getItem
    let usuarioEmail = localStorage.getItem("emailLogado"); //sessionStorage.getItem
    let usuarioSenha = localStorage.getItem("senhaLogada"); //sessionStorage.getItem

    if ((usuariologin == usuarioNome || usuariologin == usuarioEmail) && senhalogin == usuarioSenha) {
        messagePop.textContent = "Login realizado com sucesso";
        messagePop.style.color = "blue";
        window.location.href = "index.html";

    } else {
        messagePop.textContent = "Usuario ou senha incorretos";
        messagePop.style.color = "red";
    }

}



function logout() {
    //remover informações salvas
    localStorage.removeItem("nomeLogado");
    localStorage.removeItem("emailLogado");
    localStorage.removeItem("senhaLogada");
    window.location.href = "singinup.html";
}