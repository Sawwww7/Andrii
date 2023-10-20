var cvs = document.getElementById("canvas"); // визов области игры
var ctx = cvs.getContext("2d");

var bird = new Image(); // создание обьектов
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png"; //загрузка изображений
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 110; // растояние окна между преградами-блоками

//при нажатии на какую-либо кнопку птичка подымается вверх
document.addEventListener("keydown", moveUp);
function moveUp() {
  yPos -= 25;
  fly.play();
}

//Создание Блоков  начальная позиция
var pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0,
};

var score = 0;
//начальная позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1;

// вывод всех обьектов-изображения в область игры с их координатами:
function draw() {
  ctx.drawImage(bg, 0, 0); // задний фон

  //Цикл для вивода Блоков:
  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap); //нижння Блок на высоте по y + высота верхнего блока + высота окна

    pipe[i].x--; //Блоки движутся

    // условие для создания новых Блоков:
    if (pipe[i].x === 20) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height, //высота блока
      });
    }
    //врезание птички с Блоком
    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos <= pipe[i].x + pipeUp.width &&
        (yPos <= pipe[i].y + pipeUp.height ||
          yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
      yPos + bird.height >= cvs.height - fg.height
    ) {
      location.reload();
    }
    if (pipe[i].x === 5) {
      score++;
      score_audio.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height); //нижний фон
  ctx.drawImage(bird, xPos, yPos); //позиция птички
  yPos += grav; //птичка опускается вниз

  // вывод счета:
  ctx.fillStyle = "#200";
  ctx.font = "70px Verdana";
  ctx.fillText("Счет:" + score, 10, cvs.height - 20);

  requestAnimationFrame(draw); //игравая область постоянно обновляется
}

pipeBottom.onload = draw; // после загрузки всех изображений запускается функция вивода изображений
