import { canvasCtx } from "../context/canvas.js";
import { field } from "../context/field.js";
import { lastPlayerThatHitedBall } from "../context/lastPlayerThatHitedBall.js";
import { player1, player2 } from "./player.js";
import { random } from "../utils/ramdom.js";

export let playerEffect = false;


window.addEventListener('keydown', event => {
    switch(event.code){
        case 'Space': playerEffect = true;
        break;
        default:
            break;
        }
    });
    
    window.addEventListener('keyup', event => {
        switch(event.code){
        case 'Space': playerEffect = false;
            break;
            default:
                break;
    }
});

export let PCEffect = false;

export const ball = {
    x: field.getWidth() / 2,
    y: field.getHeight() / 2,
    r: 20,
    speed: 7,
    dirX: 1,
    dirY : 1,
    gapX : 15,
    _speedUp(){
        if(this.speed < 40){
            this.speed = this.speed += 1;
            if(this.speed > 40){
                this.speed = 40;
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
    _recenter(){
        this.x = field.getWidth() / 2;
        this.y = field.getHeight() / 2;
        this._reverseX();
    },
    _calcPostion(){

        // ball hits PC field?
        if(this.x > (field.getWidth() - this.r - player2.racket.w - this.gapX)){
            
            if( // PC hits ball?
                ((this.y + this.r) > player2.racket.y) && 
                ((this.y - this.r) < (player2.racket.y + player2.racket.h))
            ){
                this._reverseX();
                this.dirY = this.dirY + random(-1, 1);
                PCEffect && this._reverseY();
                this._speedUp();
                player2.racket.speedUp();
                lastPlayerThatHitedBall.set(player2);
            }else{ // PC misses ball?
                player1.score.increment();
                this._recenter();
                this._speedReset();
                player2.racket.resetSpeed();
            }
        }


        // ball hits player field?
        if(this.x < this.r + player1.racket.w + this.gapX){
            if( // player hits ball?
                this.y + this.r > player1.racket.y &&
                this.y - this.r < player1.racket.y + player1.racket.h
            ){
                this._reverseX();
                this.dirY = this.dirY + random(-1, 1);
                this._speedUp();
                playerEffect && this._reverseY();
                lastPlayerThatHitedBall.set(player1);
            }else{ // player misses ball?
                player2.score.increment();
                this._recenter();
                this._speedReset();
            }
        }

        console.log(this.dirY)

        // invert Y if hits floor or roof
        const onTop = this.y > field.getHeight() - this.r;
        const onBottom = this.y < 0 + this.r; 
        if( onTop || onBottom )
            return this._reverseY();
       
    },
    _move(){
        this.x += this.speed * this.dirX;
        this.y += this.speed * this.dirY;
    },
    draw(){
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, (Math.PI*2), false);
        canvasCtx.fill();

        this._calcPostion();
        this._move();
    },
}
