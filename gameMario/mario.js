const platform = './img/platform.png'
const background = './img/background.png'
const hills = './img/hills.png'
const platformSmallTall = './img/platformSmallTall.png'
const spriteRunLeft = './img/spriteRunLeft.png'
const spriteRunRight = './img/spriteRunRight.png'
const spriteStandLeft = './img/spriteStandLeft.png'
const spriteStandRight = './img/spriteStandRight.png'


const canvas = document.querySelector('canvas') //вызов из HTML файла canvas
const c = canvas.getContext ('2d')   //контекст рисования на холсте

canvas.width =1024  //задание размера ширина холста 
canvas.height = 576 //задание размера высота холста
const gravity = 0.5 //глобальная граыитация дополнительно к скорости игрока(указана ниже в классе)
const grav = 1

//создание класса игрока:
class Player {    
  constructor() {
    
    this.speed = 10   // начальная позиция
    this.position = {
    x: 100,
    y: 100
    }     
    this.velocity = {    // скорость:
    x: 0,
    y: 0
    }    
    this.width = 66       // его размер
    this.height = 150

    this.image = createImage(spriteStandRight)
    //this.image = createImage(spriteStandLeft)
    this.frames = 0
    this.sprites = {
      stand: {
      right: createImage(spriteStandRight),
      left: createImage(spriteStandLeft),
      cropWidth: 177,
      width: 66
      },
      run: {
      right: createImage(spriteRunRight),
      left: createImage(spriteRunLeft),
      cropWidth: 341,
      width: 127.875
      }
    }
    this.currentSprite = this.sprites.stand.right
    this.currentCropWidth = 177
  }   
  //рисуем играка
  draw() { 
    c.drawImage(
    this.currentSprite,
    this.currentCropWidth * this.frames,
    0,
    this.currentCropWidth,
    400,
    this.position.x,
    this.position.y,
    this.width,
    this.height
    )
  }
    // рисуем квадрат на холсте
    /*c.fillStyle = 'red' //его цвет
    c.fillRect(this.position.x, this.position.y, this.width, this.height) // заливка*/
  
  // обновление экрана что бы было движение:
  update() {
   this.frames++
    if (this.frames > 59 && (this.currentSprite === this.
      sprites.stand.right || this.currentSprite === this.sprites.stand.left)
      )
      this.frames = 0
    else if (this.frames > 29 && (this.currentSprite === this
      .sprites.run.right || this.currentSprite === this.
      sprites.run.left))
      this.frames = 0
   this.draw()
   this.position.x += this.velocity.x
   this.position.y += this.velocity.y // к позиции по y добавили скорость 
        
   if (this.position.y + this.height 
    + this.velocity.y <= canvas.height) // если квадрат опускается ниже экрана
    this.velocity.y += gravity  
   /*else this.velocity.y = 0*/        // то скорость его равна 0
  }   
}

//создание класса для платформы:
class Platform {
  constructor ({x, y, image}) {
    this.position = {
      x, 
      y
    }
   this.image = image
   this.width = image.width
   this.height = image.height      
  } 
  draw() {    
    c.drawImage(this.image, this.position.x, this.position.y)
      /*c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y,     //Было до того как загрузили картинку
      this.width, this.height)*/
  }
}
 
//создание класса фон, холмы
class GenericObject {
  constructor ({x, y, image}) {
    this.position = {
      x, 
      y
    }
   this.image = image
   this.width = image.width
   this.height = image.height      
  } 
  draw() {    
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}
//футкция для заднего фона
function createImage(imageSrc){
  const image = new Image()
    image.src = imageSrc                           
    return image
}

let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)

//создание персонажа, платформы согласно классу:
let player = new Player()
let platforms = [ ]
let genericObjects = [ ]

let lastKey
//let currentKey
const keys = {
  right: {
    pressed: false
  }, 
  left: {
    pressed: false
  }
}    //ключ для движения
let scrollOffset = 0
//функция которая перезапускает начальные параметры экрана после падения в яму
function init (){
platformImage = createImage(platform)
player = new Player()
platforms = [
new Platform({
  x: platformImage.width *4 + 400 -2 + 
  platformImage.width - platformSmallTallImage.width, 
  y: 270,
  image: createImage(platformSmallTall)}),
new Platform({
  x: -1,
  y: 470,
  image: platformImage}), 
new Platform({
  x: platformImage.width -3, 
  y: 470,
  image: platformImage}),
new Platform({
  x: platformImage.width *2 + 100, 
  y: 470,
  image: platformImage}),
  new Platform({
  x: platformImage.width *3 + 400, 
  y: 470,
  image: platformImage}),
new Platform({
  x: platformImage.width *4 + 400-2, 
  y: 470,
  image: platformImage}),
  new Platform({
  x: platformImage.width *5 + 700 - 2, 
  y: 470,
  image: platformImage})
]
genericObjects = [
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(background)
  }),
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(hills)
  })
]
scrollOffset = 0
}

// анимация экрана
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height) //очистить холст от квадратаб потом поменяли на залить
  
  genericObjects.forEach((genericObject) => {
    genericObject.draw()
  })
  
  
  platforms.forEach((platform) =>{
  platform.draw()
  })
  player.update()
  

  //движение игрока
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed
  } else if ((keys.left.pressed && player.position.x >100) 
  || keys.left.pressed && scrollOffset === 0 && 
  player.position.x > 0) {
    player.velocity.x = -player.speed
  } else { player.velocity.x = 0

    if (keys.right.pressed) {
      scrollOffset += player.speed
      platforms.forEach((platform) =>{
        platform.position.x -= player.speed
        })
      genericObjects.forEach(genericObjects => {
        genericObjects.position.x -= player.speed * .66
      })
       //платформа движится когда плеер дойдет до х = 400
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed

      platforms.forEach((platform) =>{
        platform.position.x += player.speed
      })
      genericObjects.forEach(genericObjects =>{
        genericObjects.position.x += player.speed * .66
      })
    }
  }
  //console.log(scrollOffset)

  //столкновение с платформой
  platforms.forEach((platform) =>{      
   if(
    player.position.y + player.height
     <= platform.position.y && player.
     position.y + player.height +
     player.velocity.y >= platform.position.y && player.position.x
     + player.width>= platform.position.x && player.position.x
     <=platform.position.x + platform.width) {
     player.velocity.y = 0
    }
  })
// описание бега игрока
  if (
    keys.right.pressed &&
    lastKey === 'right' &&
     player.currentSprite !== player.sprites.run.right
  ) {

    player.frames = 1
    player.currentSprite = player.sprites.run.right
    player.currentCropWidth = player.sprites.run.cropWidth
    player.width = player.sprites.run.width
  } else if (
    keys.left.pressed &&
    lastKey === 'left'&& player.currentSprite
  !== player.sprites.run.left) {
    player.currentSprite = player.sprites.run.left
    player.currentCropWidth = player.sprites.run.cropWidth
    player.width = player.sprites.run.width
  } else if (
    !keys.left.pressed &&
    lastKey === 'left'&& player.currentSprite
  !== player.sprites.stand.left) {
    player.currentSprite = player.sprites.stand.left
    player.currentCropWidth = player.sprites.stand.cropWidth
    player.width = player.sprites.stand.width
  } else if (
    !keys.right.pressed &&
    lastKey === 'right'&& player.currentSprite
  !== player.sprites.stand.right) {
    player.currentSprite = player.sprites.stand.right
    player.currentCropWidth = player.sprites.stand.cropWidth
    player.width = player.sprites.stand.width
  }
  
  // Условие победы:
  if (scrollOffset > platformImage.width *5 + 300-2) {
   console.log('you win')
  }

  //Условие проигрыша:
  if (player.position.y > canvas.height) {
   init()
  }
}

init()
animate()

// отслеживание событий на клавиатуре:
addEventListener('keydown', ({ keyCode}) => {
  //console.log(keyCode)
  switch(keyCode) {
    case 65:
      console.log('left')
      keys.left.pressed=true
      lastKey = 'left'
      break

    case 83:
      console.log('down')
      break
          
    case 68:
      console.log('right')
      keys.right.pressed=true
      lastKey = 'right'
      break

    case 87:
      console.log('up')
      player.velocity.y -= 8
      break
  }
})
addEventListener('keyup', ({ keyCode}) => {
  //console.log(keyCode)
  switch(keyCode) {
    case 65:
      console.log('left')
      keys.left.pressed = false
       break
    
    case 83:
      console.log('down')
      break
              
    case 68:
      console.log('right')
      keys.right.pressed = false 
     
      break
    
    case 87:
      console.log('up')
     break
  }
})