var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//Declaring required variables
var lander = new Image();
var bg = new Image();
var fg = new Image();
var alien = new Image();
var asteroid = new Image();
var mountain = new Image();
var rock = new Image();
var obj = new Image();
var blank = new Image();
var satellite = new Image();
var stars = new Image();
var fuelind=new Image();
var red= new Image();
var redy= new Image();
var yellow = new Image();
var yellowg= new Image();
var green = new Image();
var fire = new Image();
var crashed = new Image();
var win = new Image();
var fuelOver = new Image();
var bomb = new Audio();
var shoot = new Audio();

//Initializing source of image and audio objects with appropriate files
bomb.src = "sound/Bomb.mp3";
shoot.src = "sound/shoot.mp3";
win.src = "images/win.png";
fuelOver.src = "images/fuelover.png";
crashed.src = "images/crashed.png";
lander.src = "images/lander.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
alien.src = "images/alien.png";
asteroid.src = "images/asteroid.png";
mountain.src = "images/mountain.png";
rock .src = "images/rock.png"; 
obj.src = "images/obj.png";
satellite.src = "images/satellite.png";
blank.src = "images/blank.png";
stars.src = "images/stars.png";
fuelind.src= "images/indicator.png";
red.src= "images/red.png";
redy.src="images/redyellow.png";
yellow.src="images/yellow.png";
yellowg.src="images/yellowgreen.png";
green.src="images/green.png";
fire.src="images/fire.png";

//Variables used in the game
var dx = 10;
var dy = 150;
var gravity = 2;
var score = 0;
var constant = 205;
var obstacleSpeed = 3;
var k = 0;
var score = 0;
var j=0;
var indicator=0;
var fireno=0;
var bx=0;
var speedy = 3;

//Used for the fire that the lander shoots to kill aliens
var free = [];
free[0] = {
    x : dx,
    y : dy
};

//To capture the keys pressed and execute appropriate code
document.body.onkeyup = function(e) {
    if(e.keyCode == 32) {
        dy -= 45;   
    }
    else if(e.keyCode == 88) {
        free.push( {
            x : dx,
            y : dy
        }); 
        fireno++;
        shoot.play();
    }
    else if(e.keyCode == 27) {
        location.reload();
    }
}

//Array of the various obstacles in the game
var obstacle = [];
obstacle[0] = {
    x : cvs.width,
    y : constant + 60,
    z : mountain
};

//The main function that enables us to play the game
function draw() {
    
    ctx.drawImage(bg, 0, 0);    
    ctx.drawImage(stars, k%880, 0);
    ctx.drawImage(fuelind,840, 12);  
    ctx.drawImage(red, 820, 25);  
    ctx.drawImage(redy, 805, 25);  
    ctx.drawImage(yellow, 790, 25);  
    ctx.drawImage(yellowg, 775, 25);  
    ctx.drawImage(green, 760, 25);  
    ctx.drawImage(fg, j%880, cvs.height - fg.height);

    for( i = 0; i < obstacle.length; i++) { 
        obstacle[i].x -= obstacleSpeed;
        ctx.drawImage(obstacle[i].z, obstacle[i].x, obstacle[i].y);
        ctx.drawImage(fire, free[fireno].x , free[fireno].y);
        
        if( obstacle[i].x == 550) {
            var r = Math.floor(Math.random()*6);
            if(r == 0) {
                obstacle.push( {
                    x : cvs.width,
                    y : constant+60,
                    z : mountain
                });                
            } 
            else if(r == 1) {
                obstacle.push( {
                    x : cvs.width,
                    y : 200*Math.random(),                    
                    z : asteroid
                });
            }
            else if(r == 2) {
                obstacle.push( {
                    x : cvs.width,
                    y : constant + 50,
                    z : rock 
                });
            }  
            else if(r == 3) {
                obstacle.push( {
                    x : cvs.width,
                    y : 200*Math.random(),
                    z : alien
                });
            }
            else if(r == 4) {  
                obstacle.push( {
                    x : cvs.width,
                    y : 200*Math.random(),                    
                    z : satellite
                });       
            }   
            else if(indicator>150) {
                obstacle.push( {
                    x : cvs.width,
                    y : 200*Math.random(),
                    z : obj 
                });  
            }
            else {
                obstacle.push( {
                    x : cvs.width,
                    y : 200*Math.random(),
                    z : alien
                });
            }
        }
        if(obstacle[i].z == alien) {
            if(obstacle[i].y>=200 || obstacle[i].y<=5)
            speedy = speedy * -1;
            obstacle[i].y += speedy;
        }
        if(indicator>240) {
            ctx.drawImage(fuelOver, 0, 0);
            ctx.font = "40px Verdana";
            ctx.fillText("You scored : " + score, 300, 60);
            return;       
        }
        if(dx + lander.width >= obstacle[i].x + 10 && dx <= obstacle[i].x + obstacle[i].z.width - 10 && ( dy <= obstacle[i].y + obstacle[i].z.height && dy + lander.height >= obstacle[i].y) && ( obstacle[i].z != obj && obstacle[i].z != blank)|| (dy + lander.height >= cvs.height - fg.height || dy <= 0)) {
            ctx.drawImage(crashed, 0, 0);
            ctx.font = "40px Verdana";
            ctx.fillText("You scored : " + score, 300, 60);
            return;    
        } 
        if( obstacle[i].z == obj && dx + lander.width >= obstacle[i].x && dx <= obstacle[i].x + obstacle[i].z.width && ( dy <= obstacle[i].y + obstacle[i].z.height && dy + lander.height >= obstacle[i].y))
            if(dy + lander.height >= obstacle[i].y) {
                obstacle[i].z = blank;
                gravity = 2.5;
                indicator=0;
                red.src= "images/red.png";
                redy.src="images/redyellow.png";
                yellow.src="images/yellow.png";
                yellowg.src="images/yellowgreen.png";
                green.src="images/green.png";
            }
            
        if( obstacle[i].z == satellite && dx + lander.width >= obstacle[i].x && dx <= obstacle[i].x + obstacle[i].z.width) {
            if(dy + lander.height >= obstacle[i].y  ) {
                lander.src = "images/lander.png";
                gravity = 2;
            }
        }  
        if(obstacle[i].x == 10) {
            score++;
            if(score >= 1000) {
                ctx.drawImage(win, 0, 0);
                return;    
            }          
        }
    }
    if(indicator>50){
        green.src="images/blank.png";
    }   
    if(indicator>100){
        yellowg.src="images/blank.png";
    }   
    if(indicator>150){
        yellow.src="images/blank.png";
    }   
    if(indicator>200){
        redy.src="images/blank.png";
    }      
    for(var rohit = 0; rohit<50; rohit++)
    {
        free[fireno].x += 0.25;
        for( i = 0; i<obstacle.length; i++) {
            if(obstacle[i].z == alien && free[fireno].x + fire.width >= obstacle[i].x && free[fireno].x <= obstacle[i].x + obstacle[i].z.width && (free[fireno].y <= obstacle[i].y + obstacle[i].z.height && free[fireno].y + fire.height >= obstacle[i].y)){
                obstacle[i].z = blank;
                score += 25;
                bomb.play();
                if(score>=1000) {
                    ctx.drawImage(win, 0, 0);
                    return; 
                }
            }
        }
    }
    lander.src = "images/lander.png";
    ctx.drawImage(lander, dx, dy);
    k -= 2;
    j-=3;
    dy += gravity;
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Verdana";
    indicator+=0.1;
    ctx.fillText("Score : " + score , 15,35);
    requestAnimationFrame(draw);
}
draw();
