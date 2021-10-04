window.onload = function(){
    iniciarJogo();
    //Movimentação e direção
    document.querySelector("#Up").addEventListener("mousedown", function(){
        moveUp();
    });
    document.querySelector("#Left").addEventListener("mousedown", function(){
        moveLeft();
    });
    document.querySelector("#Right").addEventListener("mousedown", function(){
        moveRight();
    });
    document.querySelector("#Down").addEventListener("mousedown", function(){
        moveDown();
    });

    //Freio na movimentação
    document.querySelector("#Up").addEventListener("mouseup", function(){
        movemntBrake();
    });
    document.querySelector("#Left").addEventListener("mouseup", function(){
        movemntBrake();
    });
    document.querySelector("#Right").addEventListener("mouseup", function(){
        movemntBrake();
    });
    document.querySelector("#Down").addEventListener("mouseup", function(){
        movemntBrake();
    });
}

var entJogador;
var entObstaculo = [];

function iniciarJogo(){
    espacoJogo.inicio();
    entJogador = new proprComponente('#000', 35, 35, 50, 200);
}

let espacoJogo = {
    canvas: document.createElement("canvas"),
    inicio: function(){
        this.canvas.width = 1000,
        this.canvas.height = 500,
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frame = 0;
        this.interval = setInterval(updtEspacoJogo, 20);
    },
    clearSpace: function(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    },
    stopGame: function(){
        clearInterval(this.interval);
    }
}

//Conta intervalos
function countInterval(n){
    if((espacoJogo.frame / n ) % 1 == 0){
        return true;
    }else{
        return false;
    }
}

//Propriedades dos componentes
function proprComponente(cor, largura, altura, x, y){
    this.altura = altura,
    this.largura = largura,
    this.x = x,
    this.y = y,
    this.speedX = 0,
    this.speedY = 0,
    this.updtPosition = function(){
        contexto = espacoJogo.context;
        contexto.fillStyle = cor;
        contexto.fillRect(this.x, this.y, this.altura, this.largura);
    }
    this.newPosition = function(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    //Propriedades das colisões dos componentes
    this.entCollision = function(ent){
        //Posição do personagem
        let leftside = this.x;
        let rightside = this.x + this.largura;
        let topside = this.y;
        let downside = this.y + this.altura;
        //Posição do obstaculo
        let entLeftside = ent.x;
        let entRightside = ent.x + ent.altura;
        let entTopside = ent.y;
        let entDownside = ent.y + ent.largura;
    
        let Collide = true;
    
        //Verifica se NÃO bateu.
        if((downside < entTopside) || (topside > entDownside) || (rightside < entLeftside) || (leftside > entRightside)){
            Collide = false;
        }
    
        return Collide;
    } 
}

//Atualiza a area do jogo para cada ação
function updtEspacoJogo(){

    let x, y;

    for(i = 0; i < entObstaculo.length; i++){
        if(entJogador.entCollision(entObstaculo[i])){
            espacoJogo.stopGame();
        }
    }

    espacoJogo.clearSpace();
    espacoJogo.frame += 1;
    if(espacoJogo.frame == 1 || countInterval(150)){
        x = espacoJogo.canvas.width;
        minAltura = 20;
        maxAltura = 200;
        altura = Math.floor(Math.random()*(maxAltura-minAltura+1)+minAltura);
        minVazio = 50;
        maxVazio = 200;
        vazio = Math.floor(Math.random()*(maxVazio-minVazio+1)+minVazio);
        entObstaculo.push(new proprComponente('#f00', altura, 10, x, 0));
        entObstaculo.push(new proprComponente('#f00', x-altura-vazio, 10, x, altura+vazio));
    }

    for(i = 0; i < entObstaculo.length; i++){
        entObstaculo[i].x -= 1;
        entObstaculo[i].updtPosition();
    }

    entJogador.newPosition();
    entJogador.updtPosition();
}

//Movimentação do jogador
function moveUp(){
    entJogador.speedY -= 3;
}
function moveDown(){
    entJogador.speedY += 3;
}
function moveLeft(){
    entJogador.speedX -= 3;
}
function moveRight(){
    entJogador.speedX += 3;
}
function movemntBrake(){
    entJogador.speedX = 0;
    entJogador.speedY = 0;
}    
