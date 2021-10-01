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
var entObstaculo;

function iniciarJogo(){
    espacoJogo.inicio();
    entJogador = new proprComponente('#000', 50, 50, 50, 200);
    entObstaculo = new proprComponente('#f00', 300, 20, 800, 100);
}

let espacoJogo = {
    canvas: document.createElement("canvas"),
    inicio: function(){
        this.canvas.width = 1000,
        this.canvas.height = 500,
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updtEspacoJogo, 20);
    },
    clearSpace: function(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    },
    stopGame: function(){
        clearInterval(this.interval);
    }
}

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

    this.entCollision = function(ent){
        //posição do personagem
        let leftside = this.x;
        let rightside = this.x + this.largura;
        let topside = this.y;
        let downside = this.y + this.altura;
        //posição do obstaculo
        let entLeftside = ent.x;
        let entRightside = ent.x + ent.altura;
        let entTopside = ent.y;
        let entDownside = ent.y + ent.largura;
    
        let Collide = true;
    
        //verifica se NÃO bateu.
        if((downside < entTopside) || (topside > entDownside) || (rightside < entLeftside) || (leftside > entRightside)){
            Collide = false;
        }
    
        return Collide;
    } 
}

function updtEspacoJogo(){
    if(entJogador.entCollision(entObstaculo)){
        espacoJogo.stopGame();
    }else{
    espacoJogo.clearSpace();
    entJogador.newPosition();
    entJogador.updtPosition();
    entObstaculo.updtPosition();
    }
}

function moveUp(){
    entJogador.speedY -= 1;
}

function moveDown(){
    entJogador.speedY += 1;
}

function moveLeft(){
    entJogador.speedX -= 1;
}

function moveRight(){
    entJogador.speedX += 1;
}

function movemntBrake(){
    entJogador.speedX = 0;
    entJogador.speedY = 0;
}    
