window.onload = function() {

    var nome;
    var texto_nome;
    var somIntro = new Audio("audio/somIntro.wav.mp4");

    document.getElementById("missaobox").style.display = "block";
    document.getElementById("iniciobox").style.display = "none";
    document.getElementById("instrucaobox").style.display = "none";
    document.getElementById("levelbox").style.display = "none";
    document.getElementById("fimbox").style.display = "none";
    document.getElementById("perdeubox").style.display = "none";

    document.getElementById("btn_validar").onclick = function () {
        somIntro.play()

        nome = document.getElementById('nome').value;
        texto_nome = document.getElementById("pfvr_nome").innerHTML;

        if (nome == "") {
            alert("Você precisa inserir um nome para acessar essa mensagem!");
        }

        else {

            document.getElementById("missaobox").style.display = "none";
            document.getElementById("iniciobox").style.display = "block";

            document.getElementById("nome_agente").innerHTML = nome
        }

    }

    document.getElementById("btn_aceito").onclick = function () {

        document.getElementById("iniciobox").style.display = "none";
        document.getElementById("instrucaobox").style.display = "block";

            document.getElementById("nome_agente").innerHTML = nome
        }

        /*

 NÍVEL 1 / NÍVEL 2 / NÍVEL 3

    document.getElementById("btn_iniciar").onclick = function () {

        document.getElementById("instrucaobox").style.display = "none";
        document.getElementById("levelbox").style.display = "block";

    }

*/

};