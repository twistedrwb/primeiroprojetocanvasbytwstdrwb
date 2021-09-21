window.onload = function(){
    iniciarJogo();
    entidadeJogador = entidadeJogador('#000', 50, 50, 50, 200);
}

function iniciarJogo(){
    espacoJogo.inicio();
}

let espacoJogo = {
    canvas: document.createElement("canvas"),
    inicio: function(){
        this.canvas.width = 1000,
        this.canvas.height = 500,
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function entidadeJogador(cor, largura, altura, x, y){
    this.altura = altura,
    this.largura = largura,
    this.x = x,
    this.y = y,
    contexto = espacoJogo.context;
    contexto.fillStyle = cor;
    contexto.fillRect(this.x, this.y, this.altura, this.largura);
}