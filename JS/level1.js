var microRecolhidos = 0;
var direcaoDireita = true;
var jogador;
var mainElement;
var tempoRestante;
var tempo;
var somApanhaMicro = new Audio("audio/apanhaMicro.wav");
var somFinal = new Audio("audio/somFinal.wav");
var vida;

window.onload = function () {
    carrega_elementos()
};

window.onkeydown = function (event) {
    processa_tecla(event.key)
};

function carrega_elementos() {
    var vida = 5;

    document.getElementById("vida_txt").value = vida;

    document.getElementById("fimbox").style.display = "none";
    document.getElementById("perdeubox").style.display = "none";

    mainElement = document.getElementById('main');
    mainElement.innerHTML += "<img src='Imagens/fundomar4.png' id='imgFundo1'>";
    //propriedade offsetTop e offSetLeft devolve a posição superior e esquerda (em pixeis) relativo ao elemento offsetParent que neste caso é o body.
    var mainOffSetLeft = mainElement.offsetLeft;//devolve o valor de cada lateral, desde o elemento main até à margem lateral da janela.
    var mainOffSetTop = mainElement.offsetTop;//devolve o valor de cada margem superior, desde o elemento main até à margem superior e inferior da janela.

    var stageWidth = mainElement.offsetWidth;
    var stageHeight = mainElement.offsetHeight;

    addMicroplasticos(mainOffSetLeft, stageWidth, mainOffSetTop, stageHeight);
    addLixo(mainOffSetLeft, stageWidth, mainOffSetTop, stageHeight);

    jogador = document.createElement("IMG");
    jogador.src = 'Imagens/jogador_direita.png';
    jogador.id = 'player';
    jogador.style.left = mainOffSetLeft + 'px';
    jogador.style.top = (mainOffSetTop + stageHeight - 42) + 'px';

    mainElement.append(jogador);
    document.getElementById('btn_jogar').onclick = function () {
        comeca_jogar()
    }
};

function addMicroplasticos(mainOffSetLeft, stageWidth, mainOffSetTop, stageHeight) {
    for (i = 1; i <= 10; i++) {
        var imicroplasticos = document.createElement("IMG");
        imicroplasticos.src = 'Imagens/microplastico.png';
        imicroplasticos.name = 'microplastico';
        imicroplasticos.id = 'micro' + i;
        imicroplasticos.style.left = (mainOffSetLeft + Math.random() * (stageWidth - 20)) + 1 + 'px';
        imicroplasticos.style.top = (mainOffSetTop + Math.random() * (stageHeight - 21)) + 1 + 'px';

        mainElement.append(imicroplasticos);
    }
}

function addLixo(mainOffSetLeft, stageWidth, mainOffSetTop, stageHeight) {
    for (i = 1; i <= 1; i++) {
        var lixo = document.createElement("IMG");
        lixo.src = 'Imagens/lixo_obst2.png';
        lixo.name = 'lixo';
        lixo.id = 'lixo' + i;
        lixo.style.left = (mainOffSetLeft + Math.random() * (stageWidth - 167)) + 1 + 'px';
        lixo.style.top = (mainOffSetTop + Math.random() * (stageHeight - 118)) + 1 + 'px';

        sobreposicaoLixo(lixo);

        mainElement.append(lixo);
    }
}

function sobreposicaoLixo(lixo) {
    mainElement = document.getElementById('main');

    var mainOffSetLeft = mainElement.offsetLeft;
    var mainOffSetTop = mainElement.offsetTop;
    var stageWidth = mainElement.offsetWidth;
    var stageHeight = mainElement.offsetHeight;

    var microplasticosElements = document.getElementsByName("microplastico");

    microplasticosElements.forEach(function (item) {

        if (verificaColisao(item, 42, 57, lixo, 118, 167)) {
            lixo.style.left = (mainOffSetLeft + Math.random() * (stageWidth - 167)) + 1 + 'px';
            lixo.style.top = (mainOffSetTop + Math.random() * (stageHeight - 118)) + 1 + 'px';
            sobreposicaoLixo(lixo);
            //console.log('tentativa de sobreposição')
        }
    });
}

function verificaColisao(elemento1, elemento1Altura, elemento1Largura, elemento2, elemento2Altura, elemento2Largura) {
    return (parseInt(elemento1.style.top) <= parseInt(elemento2.style.top) + elemento2Altura &&
        parseInt(elemento1.style.top) + elemento1Altura >= parseInt(elemento2.style.top) &&
        parseInt(elemento1.style.left) <= parseInt(elemento2.style.left) + elemento2Largura &&
        parseInt(elemento1.style.left) + elemento1Largura >= parseInt(elemento2.style.left));
}

function sobreposicaoMicro(microplastico) {
    mainElement = document.getElementById('main');

    var mainOffSetLeft = mainElement.offsetLeft;
    var mainOffSetTop = mainElement.offsetTop;
    var stageWidth = mainElement.offsetWidth;
    var stageHeight = mainElement.offsetHeight;

    var microplasticosElements = document.getElementsByName("microplastico");

    microplasticosElements.forEach(function (item) {

        if (verificaColisaoMicro(item, 21, 20, microplastico, 21, 20)) {
            microplastico.style.left = 3 + (mainOffSetLeft + Math.random() * (stageWidth - 21)) + 1 + 'px';
            microplastico.style.top = 3 + (mainOffSetTop + Math.random() * (stageHeight - 20)) + 1 + 'px';
            sobreposicaoMicro(lixo);
            //console.log('tentativa de sobreposição')
        }
    });
}

function verificaColisaoMicro(elemento1, elemento1Altura, elemento1Largura, elemento2, elemento2Altura, elemento2Largura) {
    return (parseInt(elemento1.style.top) <= parseInt(elemento2.style.top) + elemento2Altura &&
        parseInt(elemento1.style.top) + elemento1Altura >= parseInt(elemento2.style.top) &&
        parseInt(elemento1.style.left) <= parseInt(elemento2.style.left) + elemento2Largura &&
        parseInt(elemento1.style.left) + elemento1Largura >= parseInt(elemento2.style.left));
}


function comeca_jogar() {
    microRecolhidos = 0;
    tempoRestante = 30;
    document.getElementById('tempo_txt').style.backgroundColor = "#72b445";

    document.getElementById('div_ajuda').style.display = "none";
    document.getElementById('pontos_txt').value = microRecolhidos;

    tempo = setInterval(function () {
        tempoRestante--;
        document.getElementById('tempo_txt').value = tempoRestante;
        if (tempoRestante <= 5) {
            document.getElementById('tempo_txt').style.backgroundColor = "red";
        }
        if (tempoRestante === 0) {
            fim_jogoPer();
        }
    }, 1000)
}


function processa_tecla(tecla) {
    if (document.getElementById('div_ajuda').style.display !== 'block') { //não deixa mexer o jogador quando a div ajuda está ativa
        if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
            switch (tecla) {
                case 'ArrowLeft':
                    move_objeto('player', 10, 'esq');
                    break;
                case 'ArrowRight':
                    move_objeto('player', 10, 'dir');
                    break;
                case 'ArrowUp':
                    move_objeto('player', 10, 'top');
                    break;
                case 'ArrowDown':
                    move_objeto('player', 10, 'bottom');
                    break;
            }
        }

        deteta_colisao();

    }
}

function move_objeto(id, vel, sentido) {

    if (sentido === 'esq') {
        if (direcaoDireita === true) {
            document.getElementById(id).src = "Imagens/jogador_esquerda.png";
            direcaoDireita = false
        }

        var newLeft = parseInt(document.getElementById(id).style.left) - vel;
        newLeft = IsInsideWidthStage(newLeft);
        document.getElementById(id).style.left = newLeft + 'px';

        if (deteta_colisaoLixo()) {
            document.getElementById(id).style.left = (newLeft + vel) + 'px'
        }
    }
    if (sentido === 'dir') {
        if (direcaoDireita === false) {
            document.getElementById(id).src = "Imagens/jogador_direita.png";
            direcaoDireita = true
        }
        var newLeft = parseInt(document.getElementById(id).style.left) + vel;
        newLeft = IsInsideWidthStage(newLeft);

        document.getElementById(id).style.left = newLeft + 'px';

        if (deteta_colisaoLixo()) {
            document.getElementById(id).style.left = (newLeft - vel) + 'px';
        }
    }

    if (sentido === 'top') {
        var newTop = parseInt(document.getElementById(id).style.top) - vel;
        newTop = IsInsideHeightStage(newTop);

        document.getElementById(id).style.top = newTop + 'px';

        if (deteta_colisaoLixo()) {
            document.getElementById(id).style.top = (newTop + vel) + 'px';
        }
    }
    if (sentido === 'bottom') {
        var newTop = parseInt(document.getElementById(id).style.top) + vel;
        newTop = IsInsideHeightStage(newTop);

        document.getElementById(id).style.top = newTop + 'px';

        if (deteta_colisaoLixo()) {
            document.getElementById(id).style.top = (newTop - vel) + 'px'
        }
    }
}

function IsInsideWidthStage(newLeft) {

    var mainOffSetLeft = mainElement.offsetLeft;
    var stageWidth = mainOffSetLeft + mainElement.offsetWidth - 57;

    if (newLeft > mainOffSetLeft && newLeft < stageWidth) {
        return newLeft;
    } else if (newLeft > mainOffSetLeft && newLeft > stageWidth) {
        return stageWidth;
    } else if (newLeft < mainOffSetLeft && newLeft < stageWidth) {
        return mainOffSetLeft;
    }
}

function IsInsideHeightStage(newTop) {
    var mainOffSetTop = mainElement.offsetTop;
    var stageHeight = mainOffSetTop + mainElement.offsetHeight - 42;

    if (newTop > mainOffSetTop && newTop < stageHeight) {
        return newTop;
    } else if (newTop > mainOffSetTop && newTop > stageHeight) {
        return stageHeight;
    } else if (newTop < mainOffSetTop && newTop < stageHeight) {
        return mainOffSetTop;
    }
}

function deteta_colisao() {
    var microplasticosElements = document.getElementsByName("microplastico");

    microplasticosElements.forEach(function (item) {
        let positionLeft = item.offsetLeft;
        let positionRight = item.offsetLeft + 20;
        let positionBottom = item.offsetTop + 21;
        let positionTop = item.offsetTop;

        let positionTopPlayer = jogador.offsetTop;
        let positionBottomPlayer = jogador.offsetTop + 42;
        let positionLeftPlayer = jogador.offsetLeft;

        let positionLeftRight = direcaoDireita ? positionLeftPlayer + 57 : positionLeftPlayer;

        if (positionLeftRight > positionLeft && positionLeftRight < positionRight &&
            ((positionTop > positionTopPlayer && positionTop < positionBottomPlayer) ||
                ((positionBottom > positionTopPlayer && positionBottom < positionBottomPlayer)))) {
            item.remove();
            microRecolhidos += 1;
            somApanhaMicro.play();
            document.getElementById('pontos_txt').value = microRecolhidos;
            return;
        }
    });
    if (microRecolhidos === 10) {
        fim_jogoVit();
        somFinal.play()
    }
}


function deteta_colisaoLixo() {
    var lixoElements = document.getElementsByName("lixo");//criamos uma variável que vai armazenar todos os elementos com o nome lixo.

    var colidiu = false;//partimos do princípio que não temos colisão
    lixoElements.forEach(function (item) {//o método forEach() percorre a variável lixoElements, que neste caso é um conjunto de elementos ou lista e, executa as instruções por cada item.
        let positionLeft = item.offsetLeft;
        let positionRight = item.offsetLeft + 160;
        let positionBottom = item.offsetTop + 110;
        let positionTop = item.offsetTop - 35;

        let positionTopPlayer = jogador.offsetTop;
        let positionBottomPlayer = jogador.offsetTop + 42;
        let positionLeftPlayer = jogador.offsetLeft;
        let positionRightlayer = jogador.offsetLeft + 57;


        if ((positionLeftPlayer > positionLeft && positionLeftPlayer < positionRight && positionTopPlayer > positionTop && positionTopPlayer < positionBottom) ||
            (positionRightlayer > positionLeft && positionRightlayer < positionRight && positionTopPlayer > positionTop && positionTopPlayer < positionBottom)) {


            document.getElementById('pontos_txt').value = microRecolhidos;

            colidiu = true;
        }
    });

    return colidiu;
}


/*function fim_jogo() {
    document.getElementById('fim_jogo').style.display = 'block';
}*/


function fim_jogoVit() {
    clearInterval(tempo);
    document.getElementById('main').style.display = 'none';
    document.getElementById('lateral').style.display = 'none';
    document.getElementById('fimbox').style.display = 'block';
    somFinal.play();

    document.getElementById('btn_reiniciar').onclick = function () {

        document.getElementById("fim_jogoVit").style.display = "none";
        comeca_jogar()
    }
}


function fim_jogoPer() {
    vida--;
    document.getElementById("vida_txt").value = vida;

    carrega_elementos();
    clearInterval(tempo);
    document.getElementById('main').style.display = 'none';
    document.getElementById('lateral').style.display = 'none';
    document.getElementById('perdeubox').style.display = 'block';
    somFinal.play();
    document.getElementById('novo_jogo').onclick = function () {
        document.getElementById("fim_jogoPer").style.display = "none";
        comeca_jogar()
    }
}