let pontuacao = document.getElementById('pontos');
pontuacao.innerHTML=0

let velocidade = document.querySelector('input[name="velocidade"]:checked').value;

let canvas  = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake =[];
snake[0] = {
    x:8 * box,
    y:8 * box
}
let direction= "right";
let food ={
    x:Math.floor(Math.random() * 15+1) * box,
    y:Math.floor(Math.random() * 15 + 1)* box
}

function criarBG() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, 16 * box, 16 * box);
}


function criarCobrinha(){
for (i=0; i<snake.length; i++){
    context.fillStyle="gray";
    context.fillRect(snake[i].x, snake[i].y, box-1,box-1);
    }

}

function drawfood(){
    context.fillStyle ='red';
    context.fillRect(food.x, food.y, box, box);
}
document.addEventListener('keydown' , update);

function update (event){
    if(event.keyCode == 37 && direction != "right") direction="left";
    if(event.keyCode == 38 && direction != "down") direction="up";
    if(event.keyCode == 39 && direction != "left") direction="right";
    if(event.keyCode == 40 && direction != "up") direction="down";
  
}

function iniciarJogo(){


    if(snake[0].x >15 * box && direction == "right") snake[0].x =0;
    if(snake[0].x<0 && direction=="left") snake[0].x =16* box;
    if(snake[0].y>15*box & direction =="down") snake[0].y =0;
    if(snake[0].y<0 && direction=="up") snake[0].y=16*box;

    for(i=1;i<snake.length; i++){
        if(snake[0].x ==snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :-(');
        }
    }

    criarBG();
    criarCobrinha();
    drawfood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if( direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else{
       pontuacao.innerHTML++
       food.x = Math.floor(Math.random() * 15+1) * box;
       food.y = Math.floor(Math.random() * 15 + 1)* box;
    }

    let newHead ={
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}


function restartGame(){
    clearInterval(jogo);
    pontuacao.innerHTML=0

    snake=[];
    snake[0]={
        x:8*box,
        y:8*box
    }

    food.x = Math.floor(Math.random() * 15+1) * box;
    food.y = Math.floor(Math.random() * 15 + 1)* box;

    velocidade = document.querySelector('input[name="velocidade"]:checked').value

    jogo= setInterval(iniciarJogo,(160/velocidade));
}
let jogo = setInterval(iniciarJogo, 160);
