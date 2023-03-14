import { canvasCtx } from "../context/canvas.js";
import { field } from "../context/field.js";
import { player1, player2 } from "./player.js";
import { random } from "../utils/ramdom.js";
import { PlayerEffect } from "../input/PlayerEffect.js";

// impporting my own lib to change song pitch
import { load, play } from '/node_modules/master-pitch/index.js';


const scorePlayer = new Audio('../../mp3/scorePlayer.mp3');
const scorePC = new Audio('../../mp3/scorePC.mp3');
const impact = new Audio('../../mp3/impact.mp3');
const success = new Audio('../../mp3/success_1.mp3');

const hit = await load('../../mp3/pong_1.mp3');

let lastPlayerThatHitedBall = 0;

let playerEffect = false;
PlayerEffect( () => playerEffect = true, () => playerEffect = false);

let PCEffect = false;

export const ball = {
    x: field.getWidth() / 2,
    y: field.getHeight() / 2,
    r: 20,
    speed: 7,
    dirX: 1,
    dirY : 1,
    gapX : 15,
    _speedUp(){
        if(this.speed < 20){
            this.speed = this.speed += 1;
            if(this.speed > 20){
                this.speed = 20;
            }
        }
    },
    _speedReset(){
        this.speed = 5;
    },
    _reverseY(){
        this.dirY *= -1;
    },
    _reverseX(){
        this.dirX *= -1;
    },
    _disable(){

    },
    _enable(){

    },
    _recenter(){
        this._reverseX();
        this.x = field.getWidth() / 2;
        this.y = field.getHeight() / 2;                   
    },
    _calcPostion(){

        // ball hits PC field?
        if(this.x > (field.getWidth() - this.r - player2.racket.w - this.gapX)){
            
            if( // PC hits ball?
                ((this.y + this.r) > player2.racket.y) && 
                ((this.y - this.r) < (player2.racket.y + player2.racket.h))
            ){
                play(hit, 60, random(45, 50));
                this._reverseX();
                this.dirY = random(0, 1.5);
                PCEffect && this._reverseY();
                this._speedUp();
                player2.racket.speedUp();
                lastPlayerThatHitedBall = 2;
            }else{ // PC misses ball?
                this._recenter();
                this._speedReset();
                player2.racket.resetSpeed();

                success.play();
                setTimeout(() => {
                    player1.score.increment();
                    scorePlayer.play();
                }, 500);
            }
        }


        // ball hits player field?
        if(this.x < this.r + player1.racket.w + this.gapX){
            if( // player hits ball?
            this.y + this.r > player1.racket.y &&
            this.y - this.r < player1.racket.y + player1.racket.h
            ){
                hit.pitch = .5;
                play(hit, 60, random(55, 60));
                this._reverseX();
                this.dirY = random(0, 1.5);
                this._speedUp();
                playerEffect && this._reverseY();
                lastPlayerThatHitedBall = 1;
            }else{ // player misses ball?
                this._recenter();
                this._speedReset();
                impact.play();
                setTimeout(()=>{
                    player2.score.increment();
                    scorePC.play();
                }, 500)
            }
        }

        // invert Y if hits floor or roof
        const onTop = this.y > field.getHeight() - this.r;
        const onBottom = this.y < 0 + this.r; 
        if( onTop || onBottom ){
            play(hit, 60, random(20, 30));
            this._reverseY();
        }
       
    },
    _move(){
        this.x += this.speed * this.dirX;
        this.y += this.speed * this.dirY;
    },
    draw(){
        canvasCtx.fillStyle = "#ffffff";
        // canvasCtx.shadowColor = lastPlayerThatHitedBall === 1 ? "green" : "red";
        canvasCtx.shadowColor = "#fff";
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, (Math.PI*2), false);
        canvasCtx.fill();


        this._calcPostion();
        this._move();
    },
}
