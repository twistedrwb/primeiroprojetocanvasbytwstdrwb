window.onload = function(){
    iniciarJogo();

    document.querySelector("#Up").addEventListener("click", function(){
        moveUp();
    });
    document.querySelector("#Left").addEventListener("click", function(){
        moveLeft();
    });
    document.querySelector("#Right").addEventListener("click", function(){
        moveRight();
    });
    document.querySelector("#Down").addEventListener("click", function(){
        moveDown();
    });

}

var entJogador;

function iniciarJogo(){
    espacoJogo.inicio();
    entJogador = new proprJogador('#000', 50, 50, 50, 200);
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
    }
}

function proprJogador(cor, largura, altura, x, y){
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
}

function updtEspacoJogo(){
    espacoJogo.clearSpace();
    entJogador.newPosition();
    entJogador.updtPosition();
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

