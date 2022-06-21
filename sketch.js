var PLAY;
var END;
var SERVE;
var gamestate;
var serve;
var backgroundImg1;
var backgroundImg2;
var score;
var canvas;
var power;

var fighter1_gif, fighter2_gif;

var fireball1, fireball1_gif;
var fireball2, fireball2_gif;

var fighter1_life = 5;
var fighter2_life = 5;

var invisibleground;

var fireball1_group, fireball2_group;

var gameoverImg, gameover;

function preload(){
    backgroundImg1 = loadImage("assets/Background serve.png");
    backgroundImg2 = loadImage("assets/Background play.png");
    fighter1_gif = loadImage("assets/lutador1.gif");
    fighter2_gif = loadImage("assets/lutador2.gif");
    fireball1_gif = loadImage("assets/fireball1.gif");
    fireball2_gif = loadImage("assets/fireball2.gif");
    gameoverImg = loadImage("assets/gameover.png");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    //criar sprite para o fundo
    fundo = createSprite(windowWidth/2, windowHeight/2-110);
    fundo.addImage(backgroundImg2);
    fundo.scale = 1.2; //escala para ajudar a dimensionar na tela
    fundo.visible = false;

    //chão invisível
    invisibleground = createSprite(windowWidth/2, windowHeight*0.90,windowWidth, windowHeight*0.02);
    invisibleground.visible = false;

    //vidas
    fighter1Life();  
    fighter2Life();   

    //jogadores
    fighter1 = createSprite(70,windowHeight-130,20,150);
    fighter1.addImage(fighter1_gif);
    fighter1.play();
    fighter1.setCollider("rectangle",0,0,200,320);
    //fighter1.debug = true;
    fighter2 = createSprite(1200,windowHeight-130,20,150);
    fighter2.addImage(fighter2_gif);
    fighter2.setCollider("rectangle",0,0,200,320);
    //fighter2.debug = true;
    fighter1.visible = false;
    fighter2.visible = false;

    fireball1_group = createGroup();
    fireball2_group = createGroup();

    edges = createEdgeSprites();

    gamestate = SERVE;

    //gameover
    gameover = createSprite(windowWidth/2, windowHeight/2);
    gameover.visible = false;
    gameover.addImage(gameoverImg);
    gameover.scale = 0.3;
}

function draw() {
    background(backgroundImg1);    

    if(gamestate == "serve"){
        fundo.addImage(backgroundImg1);  
    }
    else {
        gameplay();
    }


drawSprites();
}


function keyPressed(){
    if(keyCode === 69){ //letra e
    fundo.visible = true;
    fighter1.visible = true;
    fighter2.visible = true;

    fighter1_life_1.visible = true;
    fighter1_life_2.visible = true;
    fighter1_life_3.visible = true;
    fighter1_life_4.visible = true;
    fighter1_life_5.visible = true;
    fighter1_life_background.visible = true;
    fighter1_life_top.visible = true;

    fighter2_life_1.visible = true;
    fighter2_life_2.visible = true;
    fighter2_life_3.visible = true;
    fighter2_life_4.visible = true;
    fighter2_life_5.visible = true;
    fighter2_life_background.visible = true;
    fighter2_life_top.visible = true;

    if(gamestate == "serve"){
      gamestate = "play";
    }
    }
  }

  function gameplay(){

    //jogadores andam
    if(keyIsDown(RIGHT_ARROW)){
        fighter1.x += 4;
    }

    if(keyIsDown(LEFT_ARROW)){
        fighter1.x -= 4;
    }

    if(keyIsDown(68)){ //letra d
        fighter2.x += 4;
    }

    if(keyIsDown(65)){ //letra a
        fighter2.x -= 4;
    }

    //jogadores permanecerem na tela
    fighter1.bounceOff(edges[0]); //borda esquerda
    fighter1.bounceOff(edges[1]); //borda direita
    fighter1.bounceOff(edges[3]); //borda inferior
    fighter2.bounceOff(edges[0]);
    fighter2.bounceOff(edges[1]);
    fighter2.bounceOff(edges[3]);

    //soltar bolas de fogo
    if(keyIsDown(DOWN_ARROW)){
        fireball1 = createSprite(350,windowHeight-300,20,20);
        fireball1.addImage(fireball1_gif);
        fireball1.scale = 0.2;
        fireball1.velocityX = 5;
        fireball1_group.add(fireball1);
    }

    if(keyIsDown(83)){ //letra s
        fireball2 = createSprite(1000,windowHeight-300,20,20);
        fireball2.addImage(fireball2_gif);
        fireball2.scale = 0.2;
        fireball2.velocityX = -5;
        fireball2_group.add(fireball2);
    }

    //jogadores pulam
    if(keyIsDown(UP_ARROW)){
        fighter1.y -= 10;
    }

    fighter1.y = fighter1.y + 5;

    if(keyIsDown(87)){ //letra w
        fighter2.y -= 10;
    }

    fighter2.y = fighter2.y + 5;

    fighter1.collide(invisibleground);
    fighter2.collide(invisibleground);

    //atingir com a bola de fogo
    if(fireball2_group.isTouching(fighter1)){
        fighter1_life -= 1;
        fireball2_group.destroyEach();
        switch(fighter1_life){
            case 4: 
                fighter1_life_1.shapeColor = "red";
                break;
            case 3:
                fighter1_life_2.shapeColor = "red";
                break;
            case 2:
                fighter1_life_3.shapeColor = "red";
                break;    
            case 1:
                fighter1_life_4.shapeColor = "red";
                break;   
            case 0:
                fighter1_life_5.shapeColor = "red";
                break;  
            default: break;            
        }
    }

    if(fireball1_group.isTouching(fighter2)){
        fighter2_life -= 1;
        fireball1_group.destroyEach();
        switch(fighter2_life){
            case 4: 
                fighter2_life_1.shapeColor = "red";
                break;
            case 3:
                fighter2_life_2.shapeColor = "red";
                break;
            case 2:
                fighter2_life_3.shapeColor = "red";
                break;    
            case 1:
                fighter2_life_4.shapeColor = "red";
                break;   
            case 0:
                fighter2_life_5.shapeColor = "red";
                break;  
            default: break;            
        }
    }

    if(fighter1_life == 0 || fighter2_life == 0){
        gameover.visible = true;
    }

  }

  function fighter1Life(){
    //fundo branco
    fighter1_life_background = createSprite(110, windowHeight-500, 120, 60);
    fighter1_life_background.shapeColor = rgb(192,192,192);
    fighter1_life_background.visible = false;
    fighter1_life_top = createSprite(170, windowHeight-500, 20, 30);
    fighter1_life_top.shapeColor = rgb(192,192,192);
    fighter1_life_top.visible = false;

    //vida 1
    fighter1_life_5 = createSprite(70, windowHeight-500, 10, 50);
    fighter1_life_5.shapeColor = "green";
    fighter1_life_5.visible = false;

    //vida 2
    fighter1_life_4 = createSprite(90, windowHeight-500, 10, 50);
    fighter1_life_4.shapeColor = "green";
    fighter1_life_4.visible = false;

    //vida 3
    fighter1_life_3 = createSprite(110, windowHeight-500, 10, 50);
    fighter1_life_3.shapeColor = "green";
    fighter1_life_3.visible = false;   

    //vida 4
    fighter1_life_2 = createSprite(130, windowHeight-500, 10, 50);
    fighter1_life_2.shapeColor = "green";
    fighter1_life_2.visible = false;

    //vida 5
    fighter1_life_1 = createSprite(150, windowHeight-500, 10, 50);
    fighter1_life_1.shapeColor = "green";
    fighter1_life_1.visible = false;  
  }

  function fighter2Life(){
    //fundo branco
    fighter2_life_background = createSprite(1200, windowHeight-500, 120, 60);
    fighter2_life_background.shapeColor = rgb(192,192,192);
    fighter2_life_background.visible = false;
    fighter2_life_top = createSprite(1140, windowHeight-500, 20, 30);
    fighter2_life_top.shapeColor = rgb(192,192,192);
    fighter2_life_top.visible = false;

    //vida 1
    fighter2_life_1 = createSprite(1160, windowHeight-500, 10, 50);
    fighter2_life_1.shapeColor = "green";
    fighter2_life_1.visible = false;

    //vida 2
    fighter2_life_2 = createSprite(1180, windowHeight-500, 10, 50);
    fighter2_life_2.shapeColor = "green";
    fighter2_life_2.visible = false;

    //vida 3
    fighter2_life_3 = createSprite(1200, windowHeight-500, 10, 50);
    fighter2_life_3.shapeColor = "green";
    fighter2_life_3.visible = false;   

    //vida 4
    fighter2_life_4 = createSprite(1220, windowHeight-500, 10, 50);
    fighter2_life_4.shapeColor = "green";
    fighter2_life_4.visible = false;

    //vida 5
    fighter2_life_5 = createSprite(1240, windowHeight-500, 10, 50);
    fighter2_life_5.shapeColor = "green";
    fighter2_life_5.visible = false;  
  }