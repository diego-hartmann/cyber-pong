import { canvasCtx } from "../context/canvas.js";
import { mouse } from "../input/mouse.js";
import { field } from "../context/field.js";
import { ball } from "./ball.js";
// import { lastPlayerThatHitedBall } from "../context/lastPlayerThatHitedBall.js";

export const player1 = {
    racket:{
        w:15,
        h:200,
        y: 200,
        draw(){
            canvasCtx.fillStyle = "#ffffff";
            canvasCtx.fillRect( 10, this.y, this.w, this.h );
            this._move();
        },
        _move(){
            this.y = mouse.y - this.h / 2;
        }
    },
    score:{
        value: 0,
        increment(){
            this.value = this.value + 1;
        },
        draw(){
            canvasCtx.font = "bold 72px Arial";
            canvasCtx.textAlign = "center";
            canvasCtx.textBaseline = "top";
            canvasCtx.fillStyle = "#01341D";
            canvasCtx.fillText(this.value.toString(), field.getWidth()/4, 50)
        }
    },
    draw(){
        this.racket.draw();
        this.score.draw();
    } 
}

export const player2 = {
    racket:{
        w:15,
        h:200,
        y: 200,
        speed: 7,
        
        draw(){
            canvasCtx.fillStyle = "#ffffff";
            canvasCtx.fillRect( field.getWidth() - 15 - 10, this.y, this.w, this.h );
            this._move();
        },
        _move(){
            const passedMiddle = ball.x > field.getWidth() / 2;
            if(!passedMiddle) return;
            // if(lastPlayerThatHitedBall.get() === player2) return;
            if(this.y + this.h / 2 < ball.y + ball.r){
                this.y += this.speed;
                return;
            }
            this.y -= this.speed;
        },
        speedUp(){
            if(this.speed < 35){
                this.speed = this.speed += 0.85;
                if(this.speed > 35){
                    this.speed = 35;
                }
            }
        },
        resetSpeed(){
            this.speed = 7;
        }
    },
    score: {
        value: 0,
        increment(){
            this.value = this.value + 1;
        },
        draw(){
            canvasCtx.font = "bold 72px Arial";
            canvasCtx.textAlign = "center";
            canvasCtx.textBaseline = "top";
            canvasCtx.fillStyle = "#01341D";
            canvasCtx.fillText(this.value.toString(), field.getWidth()/4 + field.getWidth()/2, 50)
        }
    },
    draw(){
        this.racket.draw();
        this.score.draw();
    }
}