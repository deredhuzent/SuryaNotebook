const canvas = document.querySelector('canvas')
const ctx   = canvas.getContext('2d')

let life = 3;
let obstacles = [];

const images = {
    paper: src='./Art/Background/Background Notebook.jpg',
    sun: src='./Art/Characters/Surya/suryaSprite.png',
    meteor: src='./Art/Characters/Asteroid/asteroidSprite.png'
}

const dinoRex = {
dinoRight: src='./Art/Characters/t-Rex/tRexRight.png',
dinoLeft: src='./Art/Characters/t-Rex/tRexLeft.png',
dinoCorpse: src ='./Art/Characters/t-Rex/tRexDeath.png'
}

class Board {
    constructor(notebook) {
      this.x = 0
      this.y = 0
      this.width = canvas.width
      this.height = canvas.height
      this.img = new Image()
      this.img.src = notebook
      this.img.onload = () => {
       this.draw()
      }
    }
    draw() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
  }

class Surya{
    constructor(x, y, height, width, img) {
        this.x = x
        this.y = y
        this.sx = 0
        this.sy = 0
        this.height = height
        this.width = width
        this.img = new Image()
        this.img.src = img
        this.img.onload = () => {
          this.draw(this.height, this.width)
        }
      }
      draw(){
        if (this.sx > 439) this.sx = 0
        ctx.drawImage(
          this.img, 
          this.sx,
          this.sy,
          225, 
          220,
          this.x,
          this.y, 
          220,
          210
          )
        this.sx+=232
      }
      moveUp(){
        this.y-=20
        if(surya.y <= 0) surya.y=0;
      }
      moveDown(){
        this.y+=20
        if(surya.y >= 320) surya.y=320;
      }
      moveRight(){
        this.x+=10
        if(surya.x >= 800) surya.x=800;
      }
      moveLeft(){
        this.x-=10
        if(surya.x <=40) surya.x=40;
      }
  }

class TRex{
    constructor(x, y, height, width, img) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.life = 3
        this.imgArr = img
        this.img = new Image()
        this.img.src = img.dinoRight
        this.img.onload = () => {
          this.draw(this.height, this.width)
        }
      }
      draw(){
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width)
      }
      moveRight(){
        this.img = new Image()
        this.img.src = this.imgArr.dinoRight
        this.x+=10
        if(tRex.x >= 900) tRex.x=900;
      }
      moveLeft = () => {
        this.img = new Image() 
        this.img.src = this.imgArr.dinoLeft
        this.x-=10
        if(tRex.x <=40) tRex.x=40;
      }
      dinoDie(){
        this.img.src = ''
        this.img.src = this.imgArr.dinoCorpse
        this.height = 145
        this.width = 100 
        this.y =+410
      }
      isTouching(obstacle){
        return  (this.x < obstacle.x + obstacle.width) &&
        (this.x + 15  > obstacle.x) &&
        (this.y < obstacle.y + obstacle.height) &&
        (this.y + 15 > obstacle.y)
      }
    }
    
class GenericMeteorite {
    constructor(){
        this.x =  Math.random() * board.width
        this.y = Math.random() * 10
        this.sx = 0
        this.sy = 0
        this.height = (Math.random() * 100)  + 90
        this.width = this.height
        this.gravity = 1.7
        this.img = new Image()
        this.img.src = images.meteor
        this.img.onload = () => {
            this.draw()
        }
    }
    draw(){ 
            if (this.sx > 438) this.sx = 0
            ctx.drawImage(
              this.img, 
              this.sx,
              this.sy,
              225, 
              230,
              this.x,
              this.y, 
              100,
              100
              )
            this.sx+=234
            this.x-= this.gravity *10
            this.y+= this.gravity *10

            if(this.y === board.height - this.height) this.width = 0
          }

    isTouching
}

class AsteroidBig {
  constructor(x, y, height, width, img) {
    this.x = x
    this.y = y
    this.sx = 0
    this.sy = 0
    this.height = height
    this.width = width
    this.img = new Image()
    this.img.src = img
    this.img.onload = () => {
      this.draw(this.height, this.width)
    }
  }
  draw(){
    //checar animación
        if (this.sx > 438) this.sx = 0
        ctx.drawImage(
          this.img, 
          this.sx,
          this.sy,
          225, 
          230,
          this.x,
          this.y, 
          220,
          220
          )
        this.sx+=234
      }
    gravityBig(gravity){
      this.gravity = gravity
      this.y += gravity / 10
      this.x -= gravity / 10
      if (this.y === 300) this.width = 0 
      /*if(asteroidBig.y++ < 300 + asteroidBig.x--){
        if (asteroidBig.y >= 300) asteroidBig.y=300;*/
      
    }
}

class AsteroidSmall {
    constructor(x, y, height, width, img) {
      this.x = x
      this.y = y
      this.sx = 0
      this.sy = 0
      this.height = height
      this.width = width
      this.img = new Image()
      this.img.src = img
      this.img.onload = () => {
        this.draw(this.height, this.width)
      }
    }
    draw(){
          if (this.sx > 438) this.sx = 0
          ctx.drawImage(
            this.img, 
            this.sx,
            this.sy,
            225, 
            230,
            this.x,
            this.y, 
            150,
            150
            )
          this.sx+=234
          console.log(this.y, this.gravity)
        }
      gravitySmall(gravity){
        this.gravity = gravity
        this.y += gravity / 10
        this.x -= gravity / 10
        if (this.y === 300) return 
        /*if(asteroidBig.y++ < 300 + asteroidBig.x--){
          if (asteroidBig.y >= 300) asteroidBig.y=300;*/
        
      }
  }

class AsteroidXS {
   constructor(x, y, height, width, img) {
    this.x = x
    this.y = y
    this.sx = 0
    this.sy = 0
    this.height = height
    this.width = width
    this.img = new Image()
    this.img.src = img
    this.img.onload = () => {
    this.draw(this.height, this.width)
      }
    }
    draw(){
    if (this.sx > 438) this.sx = 0
       ctx.drawImage(
        this.img, 
        this.sx,
        this.sy,
        225, 
        230,
        this.x,
        this.y, 
        90,
        90
        )
        this.sx+=234
        }
      gravityXS(gravity){
        this.gravity = gravity
        this.y += gravity / 10
        this.x -= gravity / 10
        if (this.y === 450) return 
        if(asteroidXS.y++ < 450 + asteroidXS.x--){
          if (asteroidXS.y >= 450) asteroidXS.y=450;
        }
      }
  }

//creating new instances
// (x,y,h,w,image)
const board = new Board(images.paper)
const surya = new Surya(50, 0, 210, 190, images.sun)
const tRex = new TRex(450, 370, 100, 145, dinoRex)
// const asteroidLg = new AsteroidBig(1000, -100, 280, 260, images.meteor)
// const asteroidSm = new AsteroidSmall(900, -150, 180, 160, images.meteor)
// const asteroidXS = new AsteroidXS (700, -180, 110, 110, images.meteor)


let frames = 0
let interval

function update() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    board.draw()
    surya.draw()
    tRex.draw()
    generateMeteorites()
    drawMeteorites()
    frames++
}

function startGame(){
if(interval) return
interval = setInterval(update, 1000/16)
}

function gameOver(){
    alert("perdiste")
}


function generateMeteorites(){
    if (!(frames % 32 === 0)) return
      let obs = new GenericMeteorite()
      obstacles.push(obs)
  }
  
  function drawMeteorites(){ 
   obstacles.forEach(x => {
    x.draw()
    checkColission(x)
   })
  } 

  function checkColission(item){
      if(tRex.isTouching(item)){
          life--
          console.log(life)
          item.width = 0
          item.height = 0
          if(life == 0) gameOver()
      }
  }

addEventListener('keydown', e => {
    e.preventDefault()
  switch (e.keyCode) {
      case 32: 
        startGame() 
        break; 
      case 68: //d tRex
        return tRex.moveRight()
      case 65: //a tRex
        return tRex.moveLeft()
      case 83: // s death
        return tRex.dinoDie()
      case 38: // flecha arriba
        return surya.moveUp()
      case 40: // flecha abajo
        return surya.moveDown()
      case 37:
        return surya.moveLeft()
      case 39:
        return surya.moveRight()
    }
  })